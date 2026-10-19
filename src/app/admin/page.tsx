'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { BookingStatus, TravelFee, Photographer, DeliveredGallery, Booking, ConfirmationSlipTemplate } from '@/types';
import { SlipPreviewModal } from '@/components/SlipPreviewModal';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  Car, 
  ImageIcon, 
  MessageSquare, 
  BarChart3, 
  DollarSign, 
  Edit2, 
  Trash2, 
  Plus, 
  Check, 
  Lock, 
  Search, 
  Eye, 
  Sparkles,
  ArrowRight,
  LogOut,
  AlertCircle,
  FileText,
  Printer,
  Sliders,
  Settings,
  Send,
  Camera,
  ExternalLink
} from 'lucide-react';

export default function AdminPage() {
  const { 
    bookings, 
    updateBookingStatus, 
    updateBookingPayment,
    travelFees, 
    updateTravelFee, 
    addTravelFee, 
    deleteTravelFee, 
    photographers, 
    addPhotographer, 
    deletePhotographer, 
    galleries, 
    saveDeliveredGallery, 
    chatMessages, 
    adminReplyMessage, 
    slipTemplate,
    updateSlipTemplate,
    formatCurrency,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin
  } = useApp();

  // Login Form State
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'slip-template' | 'travel-fees' | 'photographers' | 'gallery' | 'chat'>('overview');

  // Preview Modal for Confirmation Slip
  const [previewBooking, setPreviewBooking] = useState<Booking | null>(null);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);

  // Travel Fee Editing State
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [editFeeAmount, setEditFeeAmount] = useState<number>(0);
  const [editFeeNotes, setEditFeeNotes] = useState<string>('');
  const [searchFeeText, setSearchFeeText] = useState<string>('');
  const [showAddFeeModal, setShowAddFeeModal] = useState<boolean>(false);
  const [newProvinceName, setNewProvinceName] = useState<string>('');
  const [newProvinceFee, setNewProvinceFee] = useState<number>(1000000);
  const [newProvinceRegion, setNewProvinceRegion] = useState<'Miền Nam' | 'Miền Trung' | 'Miền Bắc'>('Miền Nam');
  const [feeSaveSuccessToast, setFeeSaveSuccessToast] = useState<string | null>(null);

  // Slip Template Editing State
  const [editTemplate, setEditTemplate] = useState<ConfirmationSlipTemplate>(slipTemplate);
  const [templateSaveToast, setTemplateSaveToast] = useState<string | null>(null);

  // Photographer Creation State
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [newPhotoName, setNewPhotoName] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoAvatar, setNewPhotoAvatar] = useState('/images/photographer.jpg');
  const [newPhotoCover, setNewPhotoCover] = useState('/images/hero.jpg');
  const [newPhotoBio, setNewPhotoBio] = useState('');
  const [newPhotoPrice, setNewPhotoPrice] = useState(5000000);
  const [newPhotoCity, setNewPhotoCity] = useState('TP. Hồ Chí Minh');
  const [newPhotoStyles, setNewPhotoStyles] = useState('Fashion & Editorial, Chân Dung Nghệ Thuật');
  const [newPhotoGear, setNewPhotoGear] = useState('Sony A1, Leica M11, 50mm f/1.2 GM');

  // Gallery Upload State
  const [galleryBookingCode, setGalleryBookingCode] = useState('DINH-8821');
  const [galleryClientName, setGalleryClientName] = useState('Trần Thảo Linh');
  const [galleryPhotoTitle, setGalleryPhotoTitle] = useState('Bình Minh Hoàng Hôn Mới');
  const [galleryPhotoUrl, setGalleryPhotoUrl] = useState('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80');
  const [galleryCategory, setGalleryCategory] = useState('Highlights');
  const [gallerySuccessToast, setGallerySuccessToast] = useState<string | null>(null);

  // Chat Reply State
  const [replyText, setReplyText] = useState('');
  const [replyAsRole, setReplyAsRole] = useState<'admin' | 'photographer'>('admin');

  // Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'deposit_paid' ? b.depositAmount : b.totalAmount), 0);
  const totalDepositedCount = bookings.filter(b => b.paymentStatus === 'deposit_paid' || b.paymentStatus === 'fully_paid').length;
  const activeBookingsCount = bookings.filter(b => b.bookingStatus !== 'cancelled').length;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(adminPasswordInput);
    if (!success) {
      setLoginError('Mật khẩu bảo mật không chính xác. (Mật khẩu demo: admin123 hoặc dinh2026)');
    } else {
      setLoginError('');
      setAdminPasswordInput('');
    }
  };

  // Handle Travel Fee Edit Save
  const handleSaveTravelFee = (id: string) => {
    updateTravelFee(id, Number(editFeeAmount), editFeeNotes);
    setEditingFeeId(null);
    setFeeSaveSuccessToast('Đã cập nhật phụ phí thành công! Mức phí mới đã được áp dụng trực tiếp vào trang thanh toán /cast của khách.');
    setTimeout(() => setFeeSaveSuccessToast(null), 4000);
  };

  // Handle Add New Destination Fee
  const handleAddNewFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvinceName.trim()) return;

    addTravelFee({
      id: `tf-${Date.now()}`,
      province: newProvinceName.trim(),
      region: newProvinceRegion,
      fee: Number(newProvinceFee),
      estimatedHours: 'Linh hoạt',
      notes: 'Đã cập nhật từ Admin CMS',
    });

    setNewProvinceName('');
    setShowAddFeeModal(false);
    setFeeSaveSuccessToast(`Đã thêm mới điểm đến "${newProvinceName.trim()}" vào biểu phí!`);
    setTimeout(() => setFeeSaveSuccessToast(null), 4000);
  };

  // Handle Save Slip Template
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    updateSlipTemplate(editTemplate);
    setTemplateSaveToast('Đã lưu mẫu Phiếu xác nhận Framevis thành công! Toàn bộ phiếu tạo mới và in ấn sẽ mang giao diện cập nhật này.');
    setTimeout(() => setTemplateSaveToast(null), 4000);
  };

  // Handle Add Photographer
  const handleAddPhotographerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoName.trim()) return;

    const stylesArray = newPhotoStyles.split(',').map(s => s.trim()) as any;
    const gearArray = newPhotoGear.split(',').map(g => g.trim());

    addPhotographer({
      id: `photo-${Date.now()}`,
      name: newPhotoName,
      title: newPhotoTitle || 'Visual Artist',
      avatar: newPhotoAvatar || '/images/photographer.jpg',
      coverImage: newPhotoCover || '/images/hero.jpg',
      bio: newPhotoBio || 'Nhiếp ảnh gia chuyên nghiệp tại DINH STUDIO.',
      rating: 5.0,
      reviewsCount: 1,
      startingPrice: Number(newPhotoPrice),
      experienceYears: 5,
      city: newPhotoCity,
      styles: stylesArray,
      cameraGear: gearArray,
      featured: true,
      portfolio: [
        {
          id: `p-${Date.now()}-1`,
          url: newPhotoCover || '/images/hero.jpg',
          title: 'Haute Editorial Key Visual',
          category: 'Editorial',
          exif: 'Leica M11 • 50mm f/1.2',
        }
      ],
    });

    setShowAddPhotoModal(false);
    setNewPhotoName('');
  };

  // Handle Gallery Photo Upload
  const handleAddPhotoToGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryPhotoUrl.trim() || !galleryBookingCode.trim()) return;

    const code = galleryBookingCode.trim().toUpperCase();
    const existing = galleries[code];

    const newPhoto = {
      id: `photo-${Date.now()}`,
      url: galleryPhotoUrl,
      title: galleryPhotoTitle || 'Hình Ảnh Trả Khách',
      category: galleryCategory,
      highResUrl: galleryPhotoUrl,
      isFavorite: false,
    };

    if (existing) {
      saveDeliveredGallery({
        ...existing,
        totalPhotos: existing.photos.length + 1,
        photos: [newPhoto, ...existing.photos],
      });
    } else {
      saveDeliveredGallery({
        bookingCode: code,
        clientName: galleryClientName || 'Khách Hàng',
        photographerName: 'Quốc Vinh',
        shootDate: new Date().toLocaleDateString('vi-VN'),
        location: 'Studio Thảo Điền',
        totalPhotos: 1,
        coverUrl: galleryPhotoUrl,
        photos: [newPhoto],
      });
    }

    setGallerySuccessToast(`Đã xuất bản ảnh mới vào album [${code}]! Khách hàng có thể vào /check-photo tra cứu ngay.`);
    setTimeout(() => setGallerySuccessToast(null), 4000);
  };

  // Handle Chat Reply
  const handleAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    adminReplyMessage(replyText.trim(), replyAsRole);
    setReplyText('');
  };

  const handleOpenSlipPreview = (booking: Booking) => {
    setPreviewBooking(booking);
    setIsSlipModalOpen(true);
  };

  // ==========================================
  // LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-obsidian-850 p-8 rounded-3xl border border-gold-400/30 shadow-gold space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-300 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black font-serif text-white tracking-tight uppercase">
              Cổng Quản Trị Hệ Thống DINH. STUDIO
            </h1>
            <p className="text-xs text-gray-400">
              Khu vực dành riêng cho Quản trị viên và Ban điều hành Studio.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-xs">
              <label className="text-gray-300 font-semibold">Mật Khẩu Quản Trị Viên:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Nhập mật khẩu quản trị (demo: admin123)..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-bold text-black uppercase tracking-wider text-xs bg-gradient-gold hover:opacity-95 shadow-gold transition-all"
            >
              Mở Khóa Quản Trị
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-obsidian-900 border border-white/5 text-[11px] text-gray-400 space-y-1">
            <p className="font-semibold text-gold-300">Thông tin đăng nhập thử nghiệm:</p>
            <p>• Mật khẩu quản trị demo: <strong className="text-white font-mono">admin123</strong> hoặc <strong className="text-white font-mono">dinh2026</strong></p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Navigation & Header */}
      <div className="bg-obsidian-850 p-6 rounded-3xl border border-gold-400/20 shadow-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-300 shadow-gold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black font-serif text-white tracking-tight uppercase">
                DINH. STUDIO — Hệ Thống Quản Trị Trung Tâm
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase border border-emerald-500/30">
                Live CMS
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Quản lý Booking, Mẫu Phiếu Framevis, Phí di chuyển 63 tỉnh, Photographer và Gallery trả khách.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white bg-obsidian-800 border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <span>Xem Trang Public</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
          </Link>

          <button
            onClick={logoutAdmin}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Khóa Admin</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {[
          { id: 'overview', label: 'Tổng Quan & Thống Kê', icon: BarChart3 },
          { id: 'bookings', label: `Quản Lý Booking (${bookings.length})`, icon: Calendar },
          { id: 'slip-template', label: 'Mẫu Phiếu Xác Nhận Framevis', icon: FileText, highlight: true },
          { id: 'travel-fees', label: `Biểu Phí Di Chuyển (${travelFees.length})`, icon: Car },
          { id: 'photographers', label: `Nhiếp Ảnh Gia (${photographers.length})`, icon: Users },
          { id: 'gallery', label: 'Xuất Bản Album Trả Khách', icon: ImageIcon },
          { id: 'chat', label: `Hộp Thư Chat (${chatMessages.length})`, icon: MessageSquare },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-gold text-black shadow-gold'
                  : 'bg-obsidian-850 text-gray-400 hover:text-white hover:bg-obsidian-800 border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.highlight && !isActive && (
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: TỔNG QUAN & THỐNG KÊ (OVERVIEW)
          ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Doanh Thu Thu Được</span>
              <div className="text-2xl font-black font-mono text-gold-300">{formatCurrency(totalRevenue)}</div>
              <p className="text-[10px] text-gray-500">Đã bao gồm tiền cọc 30% và thanh toán toàn bộ 100%</p>
            </div>

            <div className="bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tổng Đơn Đặt Lịch</span>
              <div className="text-2xl font-black font-mono text-white">{bookings.length}</div>
              <p className="text-[10px] text-emerald-400 font-semibold">{totalDepositedCount} đơn đã đặt cọc giữ lịch</p>
            </div>

            <div className="bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tỉnh Thành Đã Phủ Sóng</span>
              <div className="text-2xl font-black font-mono text-gold-300">{travelFees.length}</div>
              <p className="text-[10px] text-gray-500">Biểu phí tự động đồng bộ sang trang /cast</p>
            </div>

            <div className="bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Đội Ngũ Nhiếp Ảnh Gia</span>
              <div className="text-2xl font-black font-mono text-white">{photographers.length}</div>
              <p className="text-[10px] text-gray-500">Nghệ sĩ độc quyền & đối tác sáng tạo</p>
            </div>
          </div>

          {/* Quick Actions & Recent Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-obsidian-850 p-6 sm:p-7 rounded-3xl border border-white/10 shadow-dark space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Đơn Đặt Lịch Gần Nhất
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-gold-300 hover:underline"
                >
                  Xem toàn bộ ({bookings.length})
                </button>
              </div>

              <div className="space-y-3">
                {bookings.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-obsidian-900 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{b.clientName}</span>
                        <span className="font-mono text-gold-300 px-2 py-0.5 rounded bg-black/60 border border-gold-400/20 text-[10px]">
                          {b.slipNumber || b.code}
                        </span>
                      </div>
                      <p className="text-gray-400 text-[11px] mt-0.5">
                        {b.serviceType} • {b.date} ({b.timeSlot}) • {b.locationProvince}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="font-mono font-bold text-gold-300">{formatCurrency(b.totalAmount)}</span>
                      <button
                        onClick={() => handleOpenSlipPreview(b)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-black bg-gradient-gold shadow-gold flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Xem Phiếu</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Template Status */}
            <div className="lg:col-span-4 bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
                Cấu Hình Mẫu Phiếu Framevis
              </h3>
              <div className="space-y-2.5 text-xs text-gray-300">
                <p><span className="text-gray-500">Tên Studio:</span> <strong className="text-white">{slipTemplate.studioName}</strong></p>
                <p><span className="text-gray-500">Tiền tố số phiếu:</span> <strong className="text-gold-300 font-mono">{slipTemplate.slipPrefix}</strong></p>
                <p><span className="text-gray-500">Người ký mặc định:</span> <strong className="text-white">{slipTemplate.signerName}</strong> ({slipTemplate.signerTitle})</p>
                <p><span className="text-gray-500">Mã số thuế:</span> <strong className="text-white font-mono">{slipTemplate.taxCode}</strong></p>
              </div>

              <button
                onClick={() => setActiveTab('slip-template')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-gold-300 bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 transition-colors flex items-center justify-center gap-2"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Chỉnh Sửa Mẫu Phiếu Xác Nhận</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: QUẢN LÝ BOOKING (BOOKINGS CMS)
          ========================================================================= */}
      {activeTab === 'bookings' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-white tracking-tight uppercase">
                Danh Sách Đơn Đặt Lịch & Phiếu Xác Nhận
              </h2>
              <p className="text-xs text-gray-400">
                Tra cứu, cập nhật trạng thái cọc và mở xem/in Phiếu xác nhận tiêu chuẩn Framevis.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-obsidian-850 shadow-dark">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-obsidian-950 text-gold-300 font-bold uppercase tracking-wider text-[11px] border-b border-white/10">
                  <th className="py-3.5 px-4">Số Phiếu / Mã</th>
                  <th className="py-3.5 px-4">Khách Hàng</th>
                  <th className="py-3.5 px-4">Nhiếp Ảnh Gia</th>
                  <th className="py-3.5 px-4">Lịch Chụp</th>
                  <th className="py-3.5 px-4">Địa Điểm</th>
                  <th className="py-3.5 px-4 text-right">Tổng Tiền</th>
                  <th className="py-3.5 px-4 text-center">Trạng Thái Cọc</th>
                  <th className="py-3.5 px-4 text-center">Tiến Độ</th>
                  <th className="py-3.5 px-4 text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gold-300">
                      {b.slipNumber || b.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-white">{b.clientName}</p>
                      <p className="text-[11px] text-gray-400 font-mono">{b.clientPhone}</p>
                    </td>
                    <td className="py-3.5 px-4 text-white">
                      {b.photographerName}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-white">{b.date}</p>
                      <p className="text-[10px] text-gray-400">{b.timeSlot}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-white font-medium">{b.locationProvince}</p>
                      <p className="text-[10px] text-gray-400 truncate max-w-[140px]">{b.locationAddress}</p>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                      {formatCurrency(b.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={b.paymentStatus}
                        onChange={(e) => updateBookingPayment(b.id, e.target.value as any)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg bg-obsidian-900 border focus:outline-none ${
                          b.paymentStatus === 'fully_paid'
                            ? 'text-emerald-400 border-emerald-500/40'
                            : b.paymentStatus === 'deposit_paid'
                            ? 'text-gold-300 border-gold-400/40'
                            : 'text-gray-400 border-white/10'
                        }`}
                      >
                        <option value="unpaid">Chưa Thanh Toán</option>
                        <option value="deposit_paid">Đã Cọc 30%</option>
                        <option value="fully_paid">Đã Thanh Toán 100%</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                        className="text-[10px] font-bold px-2 py-1 rounded-lg bg-obsidian-900 border border-white/10 text-gray-200 focus:outline-none"
                      >
                        <option value="pending">Chờ Xác Nhận</option>
                        <option value="confirmed">Đã Xác Nhận</option>
                        <option value="shooting">Đang Chụp</option>
                        <option value="editing">Đang Retouch</option>
                        <option value="delivered">Đã Giao Ảnh</option>
                        <option value="cancelled">Đã Hủy</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleOpenSlipPreview(b)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-black bg-gradient-gold shadow-gold hover:opacity-95 transition-all inline-flex items-center gap-1.5"
                        title="Xem và In Phiếu Xác Nhận Framevis"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Xem Phiếu</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: QUẢN LÝ MẪU PHIẾU XÁC NHẬN FRAMEVIS (TEMPLATE EDITOR)
          ========================================================================= */}
      {activeTab === 'slip-template' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-white tracking-tight uppercase flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold-400" />
                <span>Quản Lý Mẫu Phiếu Xác Nhận Dịch Vụ (Framevis Standard)</span>
              </h2>
              <p className="text-xs text-gray-400">
                Tùy chỉnh thông tin studio, tiền tố mã phiếu, điều khoản mặc định, người ký & chức danh. Mọi chỉnh sửa áp dụng ngay cho toàn bộ phiếu xác nhận trên hệ thống.
              </p>
            </div>
          </div>

          {templateSaveToast && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-3">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{templateSaveToast}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Editor Form */}
            <div className="lg:col-span-7 bg-obsidian-850 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-dark space-y-6">
              <form onSubmit={handleSaveTemplate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Tên Studio:</label>
                    <input
                      type="text"
                      value={editTemplate.studioName}
                      onChange={(e) => setEditTemplate({ ...editTemplate, studioName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Khẩu Hiệu / Tagline:</label>
                    <input
                      type="text"
                      value={editTemplate.tagline}
                      onChange={(e) => setEditTemplate({ ...editTemplate, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-gray-300 font-semibold">Địa Chỉ Studio Trụ Sở:</label>
                  <input
                    type="text"
                    value={editTemplate.address}
                    onChange={(e) => setEditTemplate({ ...editTemplate, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Số Điện Thoại:</label>
                    <input
                      type="text"
                      value={editTemplate.phone}
                      onChange={(e) => setEditTemplate({ ...editTemplate, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Email:</label>
                    <input
                      type="email"
                      value={editTemplate.email}
                      onChange={(e) => setEditTemplate({ ...editTemplate, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Mã Số Thuế (MST):</label>
                    <input
                      type="text"
                      value={editTemplate.taxCode}
                      onChange={(e) => setEditTemplate({ ...editTemplate, taxCode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Tiền Tố Mã Phiếu:</label>
                    <input
                      type="text"
                      value={editTemplate.slipPrefix}
                      onChange={(e) => setEditTemplate({ ...editTemplate, slipPrefix: e.target.value })}
                      placeholder="VD: DP-YYYYMMDD- hoặc DP-"
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-gold-300 font-mono text-xs focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Người Ký Đại Diện:</label>
                    <input
                      type="text"
                      value={editTemplate.signerName}
                      onChange={(e) => setEditTemplate({ ...editTemplate, signerName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Chức Danh Người Ký:</label>
                    <input
                      type="text"
                      value={editTemplate.signerTitle}
                      onChange={(e) => setEditTemplate({ ...editTemplate, signerTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-gray-300 font-semibold">Ghi Chú Chân Trang:</label>
                  <input
                    type="text"
                    value={editTemplate.footerNotes}
                    onChange={(e) => setEditTemplate({ ...editTemplate, footerNotes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold hover:opacity-95 shadow-gold transition-all"
                >
                  Lưu & Áp Dụng Mẫu Phiếu Mới
                </button>
              </form>
            </div>

            {/* Quick Preview Card */}
            <div className="lg:col-span-5 bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
                Xem Thử Phiếu Mẫu Với Đơn Mẫu
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nhấn vào nút bên dưới để mở cửa sổ xem trước Phiếu xác nhận chuẩn A4 với các thông số bạn vừa thiết lập.
              </p>
              {bookings.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleOpenSlipPreview(bookings[0])}
                  className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-obsidian-800 hover:bg-obsidian-750 border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-gold-400" />
                  <span>Xem Thử Phiếu Mẫu (A4 Preview)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: QUẢN LÝ BIỂU PHÍ DI CHUYỂN (TRAVEL FEES CMS)
          ========================================================================= */}
      {activeTab === 'travel-fees' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-white tracking-tight uppercase flex items-center gap-2">
                <Car className="w-5 h-5 text-gold-400" />
                <span>Quản Lý Bảng Phí Di Chuyển Theo Tỉnh / Thành</span>
              </h2>
              <p className="text-xs text-gray-400">
                Mọi thay đổi mức phí tại đây sẽ lập tức có hiệu lực tại bước đặt lịch và trang thanh toán <strong>/cast</strong> của khách.
              </p>
            </div>

            <button
              onClick={() => setShowAddFeeModal(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Tỉnh / Thành Phố Mới</span>
            </button>
          </div>

          {feeSaveSuccessToast && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-3">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{feeSaveSuccessToast}</span>
            </div>
          )}

          {/* Add Fee Modal */}
          {showAddFeeModal && (
            <div className="p-6 rounded-3xl bg-obsidian-900 border border-gold-400/40 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Thêm Tỉnh / Thành Phố Vào Bảng Phí
              </h3>
              <form onSubmit={handleAddNewFee} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Tên Tỉnh/Thành (VD: Quy Nhơn)"
                  value={newProvinceName}
                  onChange={(e) => setNewProvinceName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  required
                />
                <select
                  value={newProvinceRegion}
                  onChange={(e) => setNewProvinceRegion(e.target.value as any)}
                  className="px-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                >
                  <option value="Miền Nam">Miền Nam</option>
                  <option value="Miền Trung">Miền Trung</option>
                  <option value="Miền Bắc">Miền Bắc</option>
                </select>
                <input
                  type="number"
                  step={50000}
                  placeholder="Phụ phí di chuyển (VNĐ)"
                  value={newProvinceFee}
                  onChange={(e) => setNewProvinceFee(Number(e.target.value))}
                  className="px-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-gold-400/50"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold"
                  >
                    Thêm Ngay
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddFeeModal(false)}
                    className="px-3 py-2.5 rounded-xl text-xs text-gray-400 hover:text-white bg-obsidian-800"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Travel Fees Table */}
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-obsidian-850 shadow-dark">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-obsidian-950 text-gold-300 font-bold uppercase tracking-wider text-[11px] border-b border-white/10">
                  <th className="py-3.5 px-4">Tỉnh / Thành Phố</th>
                  <th className="py-3.5 px-4">Khu Vực</th>
                  <th className="py-3.5 px-4 text-right">Mức Phụ Phí (VNĐ)</th>
                  <th className="py-3.5 px-4">Ghi Chú Hậu Cần</th>
                  <th className="py-3.5 px-4 text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {travelFees.map((item) => {
                  const isEditing = editingFeeId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {item.province}
                      </td>
                      <td className="py-3.5 px-4 text-gray-400">
                        {item.region}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-sm">
                        {isEditing ? (
                          <input
                            type="number"
                            step={50000}
                            value={editFeeAmount}
                            onChange={(e) => setEditFeeAmount(Number(e.target.value))}
                            className="w-32 px-2 py-1 rounded bg-obsidian-900 border border-gold-400/50 text-right text-gold-300 font-mono text-xs focus:outline-none"
                          />
                        ) : (
                          <span className="text-gold-300">
                            {item.fee === 0 ? '0 ₫ (Nội thành)' : formatCurrency(item.fee)}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-400">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editFeeNotes}
                            onChange={(e) => setEditFeeNotes(e.target.value)}
                            className="w-full px-2 py-1 rounded bg-obsidian-900 border border-gold-400/50 text-xs text-white focus:outline-none"
                          />
                        ) : (
                          item.notes || 'Hậu cần ekip chuẩn'
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleSaveTravelFee(item.id)}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-black bg-gradient-gold shadow-gold"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => setEditingFeeId(null)}
                              className="px-2.5 py-1 rounded-lg text-xs text-gray-400 hover:text-white bg-obsidian-800"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setEditingFeeId(item.id);
                                setEditFeeAmount(item.fee);
                                setEditFeeNotes(item.notes || '');
                              }}
                              className="p-1.5 rounded-lg bg-obsidian-800 hover:bg-gold-400 hover:text-black text-gray-300 transition-colors"
                              title="Sửa mức phí"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteTravelFee(item.id)}
                              className="p-1.5 rounded-lg bg-obsidian-800 hover:bg-rose-500 hover:text-white text-gray-300 transition-colors"
                              title="Xóa tỉnh này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: QUẢN LÝ PHOTOGRAPHER (CMS)
          ========================================================================= */}
      {activeTab === 'photographers' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-white tracking-tight uppercase flex items-center gap-2">
                <Users className="w-5 h-5 text-gold-400" />
                <span>Quản Lý Danh Sách Nhiếp Ảnh Gia & Nghệ Sĩ</span>
              </h2>
              <p className="text-xs text-gray-400">
                Thêm mới, chỉnh sửa thông tin, giá khởi điểm và quản lý danh mục tác phẩm portfolio.
              </p>
            </div>

            <button
              onClick={() => setShowAddPhotoModal(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Photographer Mới</span>
            </button>
          </div>

          {/* Add Photographer Modal */}
          {showAddPhotoModal && (
            <div className="p-6 rounded-3xl bg-obsidian-900 border border-gold-400/40 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Thêm Nhiếp Ảnh Gia Mới
              </h3>
              <form onSubmit={handleAddPhotographerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Tên Nghệ Sĩ (VD: Hoàng Lâm)"
                    value={newPhotoName}
                    onChange={(e) => setNewPhotoName(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Chức Danh (VD: Fashion Director)"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  />
                  <input
                    type="number"
                    step={500000}
                    placeholder="Giá Bắt Đầu (VNĐ)"
                    value={newPhotoPrice}
                    onChange={(e) => setNewPhotoPrice(Number(e.target.value))}
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Phong cách (cách nhau bằng dấu phẩy)"
                    value={newPhotoStyles}
                    onChange={(e) => setNewPhotoStyles(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  />
                  <input
                    type="text"
                    placeholder="Thiết bị máy ảnh (cách nhau bằng dấu phẩy)"
                    value={newPhotoGear}
                    onChange={(e) => setNewPhotoGear(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Tiểu sử nghệ thuật & triết lý..."
                  value={newPhotoBio}
                  onChange={(e) => setNewPhotoBio(e.target.value)}
                  className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPhotoModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white bg-obsidian-800"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold"
                  >
                    Lưu Nghệ Sĩ
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Photographers Grid List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographers.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-obsidian-850 border border-white/10 shadow-dark space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-gold-400/40 shrink-0">
                    <Image src={p.avatar} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm truncate">{p.name}</h3>
                    <p className="text-[11px] text-gold-300 truncate">{p.title}</p>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      Khởi điểm: {formatCurrency(p.startingPrice)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {p.styles.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-[10px] bg-obsidian-900 text-gray-300 border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-gray-400">{p.portfolio.length} tác phẩm</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/photographers/${p.id}`}
                      className="px-3 py-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 text-gray-300 hover:text-white"
                    >
                      Xem Trang
                    </Link>
                    <button
                      onClick={() => deletePhotographer(p.id)}
                      className="p-1.5 rounded-lg bg-obsidian-800 hover:bg-rose-500 hover:text-white text-gray-400"
                      title="Xóa photographer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: XUẤT BẢN ALBUM ẢNH TRẢ KHÁCH (GALLERY UPLOADER)
          ========================================================================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-xl font-bold font-serif text-white tracking-tight uppercase flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gold-400" />
              <span>Xuất Bản Album Ảnh Trả Khách (/check-photo)</span>
            </h2>
            <p className="text-xs text-gray-400">
              Gắn ảnh gốc & ảnh retouch vào mã booking để khách hàng tra cứu và tải trọn bộ album.
            </p>
          </div>

          {gallerySuccessToast && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-3">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{gallerySuccessToast}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-obsidian-850 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-dark space-y-5">
              <form onSubmit={handleAddPhotoToGallery} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Mã Booking / Số Phiếu:</label>
                    <input
                      type="text"
                      value={galleryBookingCode}
                      onChange={(e) => setGalleryBookingCode(e.target.value)}
                      placeholder="VD: DINH-8821 hoặc DP-20261019-XXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-gold-300 font-mono text-xs focus:outline-none focus:border-gold-400/50"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Tên Khách Hàng:</label>
                    <input
                      type="text"
                      value={galleryClientName}
                      onChange={(e) => setGalleryClientName(e.target.value)}
                      placeholder="VD: Trần Thảo Linh"
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Tiêu Đề Bức Ảnh:</label>
                    <input
                      type="text"
                      value={galleryPhotoTitle}
                      onChange={(e) => setGalleryPhotoTitle(e.target.value)}
                      placeholder="VD: Hoàng Hôn Thảo Điền"
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="text-gray-300 font-semibold">Phân Loại Hạng Mục:</label>
                    <select
                      value={galleryCategory}
                      onChange={(e) => setGalleryCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    >
                      <option value="Highlights">Highlights (Điểm Nhấn)</option>
                      <option value="Portrait">Portrait (Chân Dung)</option>
                      <option value="Editorial">Editorial (Thời Trang)</option>
                      <option value="Candid">Candid (Khoảnh Khắc Tự Nhiên)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-gray-300 font-semibold">Đường Dẫn URL Ảnh High-Res:</label>
                  <input
                    type="url"
                    value={galleryPhotoUrl}
                    onChange={(e) => setGalleryPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... hoặc link Supabase Storage"
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold hover:opacity-95 shadow-gold transition-all"
                >
                  Đăng Tải Ảnh Vào Album Trả Khách
                </button>
              </form>
            </div>

            {/* Currently Published Galleries */}
            <div className="lg:col-span-5 bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
                Các Album Đang Sẵn Sàng Bàn Giao
              </h3>
              <div className="space-y-3">
                {Object.keys(galleries).map((code) => {
                  const g = galleries[code];
                  return (
                    <div
                      key={code}
                      className="p-3.5 rounded-2xl bg-obsidian-900 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-gold-300 text-xs">{code}</span>
                        <p className="text-white font-semibold mt-0.5">{g.clientName}</p>
                        <p className="text-[10px] text-gray-400">{g.photos.length} hình ảnh</p>
                      </div>
                      <Link
                        href={`/check-photo`}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-obsidian-800"
                      >
                        Mở Xem Khách
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: HỘP THƯ CHAT (REALTIME CHAT DESK)
          ========================================================================= */}
      {activeTab === 'chat' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-xl font-bold font-serif text-white tracking-tight uppercase flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold-400" />
              <span>Hộp Thư Tư Vấn Trực Tuyến & Phản Hồi Khách Hàng</span>
            </h2>
            <p className="text-xs text-gray-400">
              Xem toàn bộ tin nhắn từ khách hàng tại trang /chat và gửi phản hồi với tư cách Admin hoặc Photographer.
            </p>
          </div>

          <div className="bg-obsidian-850 rounded-3xl border border-white/10 shadow-dark overflow-hidden flex flex-col h-[600px]">
            {/* Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-obsidian-900/60">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl text-xs ${
                    msg.sender === 'client'
                      ? 'bg-obsidian-800/90 border border-white/5'
                      : 'bg-gold-400/10 border border-gold-400/20'
                  }`}
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold-400/30 shrink-0">
                    <Image src={msg.avatar} alt={msg.senderName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{msg.senderName}</span>
                      <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{msg.text}</p>
                    {msg.imageUrl && (
                      <div className="relative aspect-[16/10] w-64 rounded-xl overflow-hidden mt-2 border border-white/10">
                        <Image src={msg.imageUrl} alt="Đính kèm" fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Admin Reply Form */}
            <form onSubmit={handleAdminReply} className="p-4 border-t border-white/10 bg-obsidian-950 flex flex-col sm:flex-row gap-3">
              <div className="sm:w-48">
                <select
                  value={replyAsRole}
                  onChange={(e) => setReplyAsRole(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none"
                >
                  <option value="admin">Tư Vấn Viên (Admin)</option>
                  <option value="photographer">Nhiếp Ảnh Gia Phụ Trách</option>
                </select>
              </div>

              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Nhập nội dung phản hồi khách hàng..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold shadow-gold hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Phản Hồi</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Interactive Slip Preview Modal */}
      <SlipPreviewModal
        booking={previewBooking}
        isOpen={isSlipModalOpen}
        onClose={() => setIsSlipModalOpen(false)}
      />
    </div>
  );
}
