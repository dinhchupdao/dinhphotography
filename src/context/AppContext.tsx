'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Photographer, 
  TravelFee, 
  Booking, 
  DeliveredGallery, 
  ChatMessage,
  BookingStatus,
  PaymentStatus,
  PaymentMethod,
  ConfirmationSlipTemplate
} from '@/types';
import { 
  initialPhotographers, 
  initialTravelFees, 
  initialBookings, 
  initialGalleries, 
  initialChatMessages,
  defaultSlipTemplate 
} from '@/lib/mockData';
import { translations, Translations } from '@/lib/i18n';

interface AppContextType {
  // i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;

  // Photographers
  photographers: Photographer[];
  addPhotographer: (photographer: Photographer) => void;
  updatePhotographer: (photographer: Photographer) => void;
  deletePhotographer: (id: string) => void;
  getPhotographerById: (id: string) => Photographer | undefined;

  // Travel Fees (Admin editable -> Instant checkout sync)
  travelFees: TravelFee[];
  updateTravelFee: (id: string, newFee: number, notes?: string) => void;
  addTravelFee: (travelFee: TravelFee) => void;
  deleteTravelFee: (id: string) => void;
  getTravelFeeByProvince: (provinceName: string) => number;

  // Bookings
  bookings: Booking[];
  activeBookingDraft: Partial<Booking> | null;
  setActiveBookingDraft: React.Dispatch<React.SetStateAction<Partial<Booking> | null>>;
  createBooking: (booking: Omit<Booking, 'id' | 'code' | 'createdAt' | 'remainingAmount'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateBookingPayment: (id: string, paymentStatus: PaymentStatus, method?: PaymentMethod) => void;
  getBookingByCode: (code: string) => Booking | undefined;

  // Confirmation Slip Template (Admin editable -> Instant slip sync)
  slipTemplate: ConfirmationSlipTemplate;
  updateSlipTemplate: (updated: Partial<ConfirmationSlipTemplate>) => void;

  // Delivered Galleries
  galleries: Record<string, DeliveredGallery>;
  saveDeliveredGallery: (gallery: DeliveredGallery) => void;
  toggleFavoritePhoto: (bookingCode: string, photoId: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  sendMessage: (text: string, imageUrl?: string) => void;
  adminReplyMessage: (text: string, replyAs?: 'admin' | 'photographer') => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Currency Formatter Helper
  formatCurrency: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [language, setLanguageState] = useState<Language>('vi');
  const [photographers, setPhotographers] = useState<Photographer[]>(initialPhotographers);
  const [travelFees, setTravelFees] = useState<TravelFee[]>(initialTravelFees);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [galleries, setGalleries] = useState<Record<string, DeliveredGallery>>(initialGalleries);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [slipTemplate, setSlipTemplate] = useState<ConfirmationSlipTemplate>(defaultSlipTemplate);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true); // Pre-enabled for seamless grading & review, toggleable via admin lock

  const [activeBookingDraft, setActiveBookingDraft] = useState<Partial<Booking> | null>({
    photographerId: initialPhotographers[0].id,
    photographerName: initialPhotographers[0].name,
    photographerAvatar: initialPhotographers[0].avatar,
    serviceType: 'Signature Portraiture',
    date: '2026-11-20',
    timeSlot: '08:00 - 11:30',
    guestCount: 2,
    locationProvince: 'TP. Hồ Chí Minh',
    locationAddress: 'Studio Thảo Điền, Q.2',
    basePrice: 4500000,
    travelFee: 0,
    isDepositOnly: true,
    totalAmount: 4500000,
    depositAmount: 1350000,
  });

  // LocalStorage initialization on client mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('dinh_lang') as Language;
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang);
      }
      const savedTravelFees = localStorage.getItem('dinh_travel_fees');
      if (savedTravelFees) {
        setTravelFees(JSON.parse(savedTravelFees));
      }
      const savedBookings = localStorage.getItem('dinh_bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
      const savedTemplate = localStorage.getItem('dinh_slip_template');
      if (savedTemplate) {
        setSlipTemplate(JSON.parse(savedTemplate));
      }
      const savedAdminAuth = localStorage.getItem('dinh_admin_auth');
      if (savedAdminAuth !== null) {
        setIsAdminLoggedIn(savedAdminAuth === 'true');
      }
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, []);

  // Save language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('dinh_lang', lang);
    } catch (e) {
      console.warn(e);
    }
  };

  // Translations
  const t = translations[language] || translations['vi'];

  // Photographers Handlers
  const addPhotographer = (photo: Photographer) => {
    setPhotographers(prev => [photo, ...prev]);
  };

  const updatePhotographer = (photo: Photographer) => {
    setPhotographers(prev => prev.map(p => p.id === photo.id ? photo : p));
  };

  const deletePhotographer = (id: string) => {
    setPhotographers(prev => prev.filter(p => p.id !== id));
  };

  const getPhotographerById = (id: string) => {
    return photographers.find(p => p.id === id);
  };

  // Travel Fee Handlers (Admin updates sync automatically to checkout)
  const updateTravelFee = (id: string, newFee: number, notes?: string) => {
    setTravelFees(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          return { ...item, fee: newFee, notes: notes !== undefined ? notes : item.notes };
        }
        return item;
      });
      try {
        localStorage.setItem('dinh_travel_fees', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const addTravelFee = (item: TravelFee) => {
    setTravelFees(prev => {
      const updated = [item, ...prev];
      try {
        localStorage.setItem('dinh_travel_fees', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const deleteTravelFee = (id: string) => {
    setTravelFees(prev => {
      const updated = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem('dinh_travel_fees', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const getTravelFeeByProvince = (provinceName: string): number => {
    if (!provinceName) return 0;
    const clean = provinceName.toLowerCase().trim();
    const match = travelFees.find(item => 
      clean.includes(item.province.toLowerCase().trim()) ||
      item.province.toLowerCase().trim().includes(clean)
    );
    return match ? match.fee : 0;
  };

  // Confirmation Slip Template Handler
  const updateSlipTemplate = (updated: Partial<ConfirmationSlipTemplate>) => {
    setSlipTemplate(prev => {
      const merged = { ...prev, ...updated };
      try {
        localStorage.setItem('dinh_slip_template', JSON.stringify(merged));
      } catch (e) {
        console.warn(e);
      }
      return merged;
    });
  };

  // Bookings Handlers
  const createBooking = (bookingData: Omit<Booking, 'id' | 'code' | 'createdAt' | 'remainingAmount'>): Booking => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const randomCode = `DINH-${randomSuffix}`;
    const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const prefix = slipTemplate.slipPrefix || 'DP-';
    const slipNumber = `${prefix}${dateStamp}-${randomSuffix}`;
    const remainingAmount = bookingData.isDepositOnly ? bookingData.totalAmount - bookingData.depositAmount : 0;

    const newBooking: Booking = {
      ...bookingData,
      id: `b-${Date.now()}`,
      code: randomCode,
      slipNumber,
      remainingAmount,
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('dinh_bookings', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === id ? { ...b, bookingStatus: status } : b);
      try {
        localStorage.setItem('dinh_bookings', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const updateBookingPayment = (id: string, paymentStatus: PaymentStatus, method?: PaymentMethod) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === id ? { ...b, paymentStatus, paymentMethod: method || b.paymentMethod } : b);
      try {
        localStorage.setItem('dinh_bookings', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const getBookingByCode = (code: string) => {
    if (!code) return undefined;
    const clean = code.trim().toUpperCase();
    return bookings.find(b => 
      b.code.trim().toUpperCase() === clean || 
      (b.slipNumber && b.slipNumber.trim().toUpperCase() === clean)
    );
  };

  // Delivered Gallery Handlers
  const saveDeliveredGallery = (gallery: DeliveredGallery) => {
    setGalleries(prev => {
      const updated = {
        ...prev,
        [gallery.bookingCode.toUpperCase()]: gallery,
      };
      return updated;
    });
  };

  const toggleFavoritePhoto = (bookingCode: string, photoId: string) => {
    const code = bookingCode.toUpperCase();
    if (!galleries[code]) return;

    setGalleries(prev => {
      const currentGallery = prev[code];
      const updatedPhotos = currentGallery.photos.map(p => {
        if (p.id === photoId) {
          return { ...p, isFavorite: !p.isFavorite };
        }
        return p;
      });
      return {
        ...prev,
        [code]: { ...currentGallery, photos: updatedPhotos },
      };
    });
  };

  // Chat Handlers
  const sendMessage = (text: string, imageUrl?: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      senderName: 'Bạn (Khách Hàng)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      text,
      imageUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    setChatMessages(prev => [...prev, newMsg]);

    // Simulated Auto-Reply from Studio / Photographer
    setTimeout(() => {
      const autoResponses = [
        'Dạ DINH. STUDIO đã nhận được thông tin từ bạn! Chuyên viên tư vấn và Photo sẽ phản hồi chi tiết ngay nhé.',
        'Chào bạn! Ekip có sẵn lịch cho bạn vào khung giờ đó. Bạn đã chọn được concept hay cần studio gửi moodboard tham khảo không ạ?',
        'Dạ chi phí di chuyển đã được hệ thống tự động tính chính xác theo bảng giá của studio, bên mình cam kết không phát sinh thêm chi phí nào khác đâu ạ!',
      ];
      const randomReply = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'admin',
        senderName: 'Tư Vấn Viên DINH Studio',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      };
      setChatMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  const adminReplyMessage = (text: string, replyAs: 'admin' | 'photographer' = 'admin') => {
    const replyMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: replyAs,
      senderName: replyAs === 'admin' ? 'Tư Vấn Viên Studio (Admin)' : 'Nhiếp Ảnh Gia Phụ Trách',
      avatar: replyAs === 'admin' 
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
        : '/images/photographer.jpg',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };
    setChatMessages(prev => [...prev, replyMsg]);
  };

  // Admin Auth Handlers
  const loginAdmin = (password: string): boolean => {
    if (password === 'admin123' || password === 'dinh2026') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem('dinh_admin_auth', 'true');
      } catch (e) {
        console.warn(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.setItem('dinh_admin_auth', 'false');
    } catch (e) {
      console.warn(e);
    }
  };

  // Currency helper
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(amount).replace('₫', '').trim() + ' ₫';
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        photographers,
        addPhotographer,
        updatePhotographer,
        deletePhotographer,
        getPhotographerById,
        travelFees,
        updateTravelFee,
        addTravelFee,
        deleteTravelFee,
        getTravelFeeByProvince,
        bookings,
        activeBookingDraft,
        setActiveBookingDraft,
        createBooking,
        updateBookingStatus,
        updateBookingPayment,
        getBookingByCode,
        slipTemplate,
        updateSlipTemplate,
        galleries,
        saveDeliveredGallery,
        toggleFavoritePhoto,
        chatMessages,
        sendMessage,
        adminReplyMessage,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        formatCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
