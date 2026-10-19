export type Language = 
  | 'vi' 
  | 'en' 
  | 'fr' 
  | 'ja' 
  | 'zh' 
  | 'ko' 
  | 'de' 
  | 'it' 
  | 'es';

export interface LanguageItem {
  code: Language;
  name: string;
  native: string;
  flag: string;
  continent: 'Asia' | 'Americas' | 'Europe' | 'Oceania';
}

export type PhotographyStyle = 
  | 'Fashion & Editorial'
  | 'Chân Dung Nghệ Thuật'
  | 'Ký Sự Cưới'
  | 'Concept & Nàng Thơ'
  | 'Đường Phố & Film'
  | 'Lookbook Thương Hiệu'
  | 'Gia Đình & Em Bé';

export interface Photographer {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  title: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  experienceYears: number;
  city: string;
  styles: PhotographyStyle[];
  cameraGear: string[];
  featured: boolean;
  portfolio: {
    id: string;
    url: string;
    title: string;
    category: string;
    exif?: string;
  }[];
}

export interface TravelFee {
  id: string;
  province: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam';
  fee: number;
  estimatedHours: string;
  notes?: string;
}

export type PaymentMethod = 'vietqr' | 'momo' | 'vnpay' | 'card';

export type PaymentStatus = 'unpaid' | 'deposit_paid' | 'fully_paid';

export type BookingStatus = 'pending' | 'confirmed' | 'shooting' | 'editing' | 'delivered' | 'cancelled';

export interface Booking {
  id: string;
  code: string;
  slipNumber?: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  photographerId: string;
  photographerName: string;
  photographerAvatar: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  locationProvince: string;
  locationAddress: string;
  basePrice: number;
  travelFee: number;
  isDepositOnly: boolean;
  depositAmount: number;
  totalAmount: number;
  remainingAmount?: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  bookingStatus: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface ConfirmationSlipTemplate {
  studioName: string;
  tagline: string;
  logoUrl: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  taxCode: string;
  slipPrefix: string;
  accentColor: string;
  signerName: string;
  signerTitle: string;
  defaultTerms: string[];
  footerNotes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'admin' | 'photographer';
  senderName: string;
  avatar: string;
  text: string;
  imageUrl?: string;
  timestamp: string;
  isRead: boolean;
}

export interface DeliveredGallery {
  bookingCode: string;
  clientName: string;
  photographerName: string;
  shootDate: string;
  location: string;
  totalPhotos: number;
  coverUrl: string;
  photos: {
    id: string;
    url: string;
    title: string;
    category: string;
    highResUrl: string;
    isFavorite?: boolean;
  }[];
}
