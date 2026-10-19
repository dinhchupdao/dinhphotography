import { Language } from '@/types';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    findPhoto: string;
    booking: string;
    pricing: string;
    checkPhoto: string;
    chat: string;
    about: string;
    admin: string;
    bookNow: string;
  };
  // Hero
  hero: {
    badge: string;
    titleLine1: string;
    titleGradient: string;
    subtext: string;
    ctaBook: string;
    ctaFind: string;
    statsExperience: string;
    statsProjects: string;
    statsRating: string;
    statsGuarantee: string;
  };
  // Find Photographer
  find: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    priceFrom: string;
    rating: string;
    viewProfile: string;
    bookWith: string;
    sortBy: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortRating: string;
    filterProvince: string;
    allProvinces: string;
    resultsCount: string;
  };
  // Booking Wizard
  booking: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    choosePhoto?: string;
    chooseDate?: string;
    locationGuests?: string;
    clientInfo?: string;
    selectPhotoPrompt: string;
    servicePackage: string;
    datePrompt: string;
    timeSlot: string;
    provincePrompt: string;
    travelFeeNotice: string;
    guestCountPrompt: string;
    addressPrompt: string;
    addressPlaceholder: string;
    namePrompt: string;
    phonePrompt: string;
    emailPrompt: string;
    notesPrompt: string;
    btnNext: string;
    btnBack: string;
    btnProceedPayment: string;
  };
  // Checkout & Payment
  checkout: {
    title: string;
    subtitle: string;
    orderSummary: string;
    serviceFee: string;
    travelFee: string;
    travelFeeDesc: string;
    freeTravel: string;
    totalAmount: string;
    paymentOption: string;
    optionDeposit: string;
    optionDepositDesc: string;
    optionFull: string;
    optionFullDesc: string;
    amountToPayNow: string;
    remainingAmount: string;
    paymentMethod: string;
    methodVietQR: string;
    methodMomo: string;
    methodVnpay: string;
    methodCard: string;
    qrScanTitle: string;
    qrScanDesc: string;
    qrAccountName: string;
    qrAccountNumber: string;
    qrBank: string;
    qrMemo: string;
    btnConfirmPayment: string;
    successTitle: string;
    successDesc: string;
    bookingCodeLabel: string;
    btnViewGallery: string;
    btnChatWithStudio: string;
  };
  // Chat
  chat: {
    title: string;
    statusOnline: string;
    roleSale: string;
    rolePhotographer: string;
    inputPlaceholder: string;
    btnSend: string;
    presetFee: string;
    presetConcept: string;
    presetSchedule: string;
    presetQuote: string;
    attachImage: string;
  };
  // Check Photo
  checkPhoto: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    btnSearch: string;
    demoHint: string;
    galleryFound: string;
    photographer: string;
    shootDate: string;
    location: string;
    totalPhotos: string;
    downloadAll: string;
    downloadSingle: string;
    favorite: string;
    emptyError: string;
  };
  // Pricing & Travel Fees
  pricing: {
    title: string;
    subtitle: string;
    packageLookbook: string;
    packagePortrait: string;
    packageWedding: string;
    travelFeeTitle: string;
    travelFeeSubtitle: string;
    searchProvince: string;
    colProvince: string;
    colRegion: string;
    colFee: string;
    colTime: string;
    colNotes: string;
    freeBadge: string;
  };
  // Admin
  admin: {
    dashboard: string;
    tabOverview: string;
    tabBookings: string;
    tabTravelFees: string;
    tabPhotographers: string;
    tabGallery: string;
    tabChat: string;
    totalRevenue: string;
    totalBookings: string;
    activeChats: string;
    activePhotographers: string;
    btnSave: string;
    btnEdit: string;
    btnDelete: string;
    btnAddFee: string;
    btnAddPhoto: string;
    statusPending: string;
    statusConfirmed: string;
    statusShooting: string;
    statusEditing: string;
    statusDelivered: string;
    statusCancelled: string;
    travelFeeNotice: string;
  };
  // Common
  common: {
    currency: string;
    person: string;
    close: string;
    loading: string;
    required: string;
  };
}

const baseTranslations = {
  vi: {
    nav: {
      home: 'Trang Chủ',
      findPhoto: 'Tra cứu Photo',
      booking: 'Đặt Lịch Chụp',
      pricing: 'Bảng Giá & Phí',
      checkPhoto: 'Check Ảnh Đã Chụp',
      chat: 'Chat 1-1 Realtime',
      about: 'Về DINH Studio',
      admin: 'Quản Trị Admin',
      bookNow: 'Book Lịch Ngay',
    },
    hero: {
      badge: 'Nền Tảng Đặt Lịch & Tuyển Chọn Photographer Số 1',
      titleLine1: 'Khắc Họa Cảm Xúc Qua',
      titleGradient: 'Góc Nhìn Nghệ Thuật',
      subtext: 'Kết nối trực tiếp cùng các nhiếp ảnh gia hàng đầu Việt Nam. Tự động tính phụ phí di chuyển minh bạch cho 63 tỉnh thành, thanh toán đặt cọc linh hoạt và nhận ảnh online chuẩn nét.',
      ctaBook: 'Book Lịch Chụp Ngay',
      ctaFind: 'Khám Phá Photographer',
      statsExperience: 'Năm Sáng Tạo',
      statsProjects: 'Bộ Ảnh Thực Hiện',
      statsRating: 'Đánh Giá 5 Sao',
      statsGuarantee: 'Bảo Hành Màu Ảnh',
    },
    find: {
      title: 'Tra Cứu & Tuyển Chọn Photographer',
      subtitle: 'Tìm kiếm nhiếp ảnh gia hoàn hảo theo phong cách, địa điểm và ngân sách của bạn',
      searchPlaceholder: 'Tìm kiếm theo tên photographer, thiết bị hoặc phong cách...',
      filterAll: 'Tất Cả Phong Cách',
      priceFrom: 'Giá từ',
      rating: 'Đánh giá',
      viewProfile: 'Xem Portfolio',
      bookWith: 'Chọn & Book Lịch',
      sortBy: 'Sắp xếp theo',
      sortPriceAsc: 'Giá thấp đến cao',
      sortPriceDesc: 'Giá cao đến thấp',
      sortRating: 'Đánh giá cao nhất',
      filterProvince: 'Khu vực chụp',
      allProvinces: 'Toàn quốc (63 tỉnh)',
      resultsCount: 'nhiếp ảnh gia phù hợp',
    },
    booking: {
      title: 'Hệ Thống Đặt Lịch Chụp Ảnh',
      subtitle: 'Chỉ mất 2 phút để hoàn tất thông tin và nhận báo giá minh bạch tức thì',
      step1: '1. Chọn Photographer',
      step2: '2. Ngày & Giờ',
      step3: '3. Địa Điểm & Số Người',
      step4: '4. Thông Tin Khách',
      selectPhotoPrompt: 'Vui lòng chọn nhiếp ảnh gia bạn mong muốn đồng hành:',
      servicePackage: 'Chọn Gói Dịch Vụ:',
      datePrompt: 'Chọn Ngày Chụp:',
      timeSlot: 'Khung Giờ Chụp Dự Kiến:',
      provincePrompt: 'Tỉnh / Thành Phố Chụp (Hệ thống tự tính phí di chuyển):',
      travelFeeNotice: 'Phụ phí di chuyển tự động cập nhật:',
      guestCountPrompt: 'Số Lượng Người Tham Gia Chụp:',
      addressPrompt: 'Địa Điểm / Địa Chỉ Chi Tiết (Studio, Quán Cafe, Resort...):',
      addressPlaceholder: 'Ví dụ: Đồi thông Tuyền Lâm, Phường 4, TP. Đà Lạt',
      namePrompt: 'Họ và Tên Của Bạn *',
      phonePrompt: 'Số Điện Thoại / Zalo Nhận Xác Nhận *',
      emailPrompt: 'Địa Chỉ Email Để Nhận Hợp Đồng & Ảnh *',
      notesPrompt: 'Ghi Chú Phong Cách / Yêu Cầu Đặc Biệt (nếu có):',
      btnNext: 'Tiếp Tục',
      btnBack: 'Quay Lại',
      btnProceedPayment: 'Chuyển Sang Thanh Toán & Đặt Cọc',
    },
    checkout: {
      title: 'Chi Tiết Thanh Toán & Đặt Cọc',
      subtitle: 'Xem lại dự toán chi phí, phí di chuyển và chọn phương thức thanh toán thuận tiện',
      orderSummary: 'Chi Tiết Đơn Đặt Lịch',
      serviceFee: 'Giá Dịch Vụ Gói Chụp',
      travelFee: 'Phụ Phí Di Chuyển Ekip',
      travelFeeDesc: 'Tự động tính theo bảng giá quy định cho tỉnh thành bạn chọn',
      freeTravel: 'Miễn phí di chuyển',
      totalAmount: 'Tổng Giá Trị Đơn Hàng',
      paymentOption: 'Hình Thức Thanh Toán:',
      optionDeposit: 'Đặt Cọc Trước 30%',
      optionDepositDesc: 'Giữ lịch chắc chắn với Photo, 70% còn lại thanh toán sau khi chụp xong',
      optionFull: 'Thanh Toán Toàn Bộ 100%',
      optionFullDesc: 'Nhận ưu đãi tặng thêm 05 ảnh Master Retouch và 01 khung ảnh cao cấp',
      amountToPayNow: 'Số Tiền Cần Thanh Toán Ngay:',
      remainingAmount: 'Số tiền thanh toán vào ngày chụp:',
      paymentMethod: 'Chọn Cổng Thanh Toán:',
      methodVietQR: 'Chuyển Khoản Ngân Hàng (VietQR Nhanh)',
      methodMomo: 'Ví Điện Tử MoMo',
      methodVnpay: 'Cổng VNPAY (ATM / Visa)',
      methodCard: 'Thẻ Quốc Tế (Visa / Mastercard / JCB)',
      qrScanTitle: 'Quét Mã VietQR Chuyển Khoản Tự Động',
      qrScanDesc: 'Mở ứng dụng ngân hàng bất kỳ để quét mã, thông tin chuyển khoản đã được điền sẵn',
      qrAccountName: 'Chủ Tài Khoản: CTY TNHH DINH STUDIO VIETNAM',
      qrAccountNumber: 'Số Tài Khoản: 8888 6868 9999',
      qrBank: 'Ngân Hàng: MBBank (Quân Đội)',
      qrMemo: 'Nội Dung Chuyển Khoản:',
      btnConfirmPayment: 'Xác Nhận Đã Thanh Toán',
      successTitle: 'Đặt Lịch Thành Công!',
      successDesc: 'Ekip đã nhận được thanh toán cọc của bạn. Mã đơn booking của bạn là:',
      bookingCodeLabel: 'MÃ BOOKING CỦA BẠN:',
      btnViewGallery: 'Vào Trang Check Ảnh',
      btnChatWithStudio: 'Chat Trực Tiếp Với Ekip',
    },
    chat: {
      title: 'Phòng Chat Trực Tiếp 1-1 Với Studio',
      statusOnline: 'Đang Hoạt Động (Phản hồi trong 2 phút)',
      roleSale: 'Tư Vấn Viên Sale',
      rolePhotographer: 'Nhiếp Ảnh Gia Phụ Trách',
      inputPlaceholder: 'Nhập tin nhắn trao đổi concept, trang phục, lịch trình...',
      btnSend: 'Gửi',
      presetFee: 'Hỏi phụ phí di chuyển',
      presetConcept: 'Tư vấn ý tưởng concept',
      presetSchedule: 'Hỏi ngày trống lịch',
      presetQuote: 'Xin báo giá chi tiết',
      attachImage: 'Đính kèm ảnh mẫu',
    },
    checkPhoto: {
      title: 'Tra Cứu & Tải Gallery Ảnh Của Bạn',
      subtitle: 'Nhập mã booking nhận được sau khi đặt lịch để mở khóa toàn bộ ảnh độ phân giải cao',
      inputPlaceholder: 'Nhập mã booking (ví dụ: DINH-8821 hoặc DINH-9043)...',
      btnSearch: 'Mở Khóa Gallery',
      demoHint: 'Gợi ý mã mẫu đang có sẵn ảnh: DINH-8821 (Đà Lạt) hoặc DINH-9043 (Lookbook)',
      galleryFound: 'Bộ Ảnh Đã Sẵn Sàng!',
      photographer: 'Nhiếp ảnh gia:',
      shootDate: 'Ngày thực hiện:',
      location: 'Địa điểm:',
      totalPhotos: 'Tổng số ảnh:',
      downloadAll: 'Tải Xuống Toàn Bộ (ZIP Chất Lượng Cao)',
      downloadSingle: 'Tải File Gốc',
      favorite: 'Đã Thích',
      emptyError: 'Không tìm thấy bộ ảnh với mã này. Vui lòng kiểm tra lại mã booking.',
    },
    pricing: {
      title: 'Bảng Giá Dịch Vụ & Phụ Phí Di Chuyển',
      subtitle: 'Bảng phí minh bạch, chuẩn xác đến từng tỉnh thành trên toàn quốc',
      packageLookbook: 'Gói Fashion Lookbook',
      packagePortrait: 'Gói Chân Dung Signature',
      packageWedding: 'Gói Phóng Sự Cưới',
      travelFeeTitle: 'Bảng Phụ Phí Di Chuyển 63 Tỉnh Thành',
      travelFeeSubtitle: 'Hệ thống tự động cộng phụ phí này vào trang thanh toán khi khách chọn địa điểm',
      searchProvince: 'Tìm kiếm tỉnh thành (ví dụ: Đà Lạt, Nha Trang, Hà Nội, Vũng Tàu)...',
      colProvince: 'Tỉnh / Thành Phố',
      colRegion: 'Khu Vực',
      colFee: 'Phụ Phí Di Chuyển',
      colTime: 'Thời Gian Dự Kiến',
      colNotes: 'Ghi Chú Ekip',
      freeBadge: 'MIỄN PHÍ NỘI THÀNH',
    },
    admin: {
      dashboard: 'Bảng Điều Khiển Quản Trị (CMS)',
      tabOverview: 'Tổng Quan',
      tabBookings: 'Quản Lý Booking',
      tabTravelFees: 'Quản Lý Phí Di Chuyển',
      tabPhotographers: 'Quản Lý Photographer',
      tabGallery: 'Upload Gallery Khách',
      tabChat: 'Hộp Thư Khách Hàng',
      totalRevenue: 'Tổng Doanh Thu',
      totalBookings: 'Đơn Đặt Lịch',
      activeChats: 'Cuộc Chat Đang Chờ',
      activePhotographers: 'Photo Đang Hoạt Động',
      btnSave: 'Lưu Thay Đổi',
      btnEdit: 'Chỉnh Sửa',
      btnDelete: 'Xóa',
      btnAddFee: 'Thêm Tỉnh Thành Mới',
      btnAddPhoto: 'Thêm Photographer Mới',
      statusPending: 'Chờ duyệt',
      statusConfirmed: 'Đã cọc / Đã xác nhận',
      statusShooting: 'Đang chụp',
      statusEditing: 'Đang hậu kỳ',
      statusDelivered: 'Đã giao ảnh',
      statusCancelled: 'Đã hủy',
      travelFeeNotice: 'Lưu ý: Mọi thay đổi về phí di chuyển tại đây sẽ được hệ thống áp dụng NGAY LẬP TỨC vào trang thanh toán của khách hàng.',
    },
    common: {
      currency: '₫',
      person: 'người',
      close: 'Đóng',
      loading: 'Đang xử lý...',
      required: 'Bắt buộc',
    },
  },

  en: {
    nav: {
      home: 'Home',
      findPhoto: 'Find Photo',
      booking: 'Book a Shoot',
      pricing: 'Pricing & Fees',
      checkPhoto: 'Check Photos',
      chat: '1-1 Live Chat',
      about: 'About Studio',
      admin: 'Admin CMS',
      bookNow: 'Book Session',
    },
    hero: {
      badge: 'Vietnam’s Premier Photography Booking & Talent Platform',
      titleLine1: 'Capturing Raw Emotion Through',
      titleGradient: 'Artistic Visual Poetry',
      subtext: 'Directly connect with top-tier Vietnamese photographers. Transparent travel fee calculation across all 63 provinces, flexible deposit payments, and seamless high-resolution online gallery proofing.',
      ctaBook: 'Book Session Now',
      ctaFind: 'Explore Photographers',
      statsExperience: 'Years Mastery',
      statsProjects: 'Shoots Completed',
      statsRating: '5-Star Reviews',
      statsGuarantee: 'Color Grading Guarantee',
    },
    find: {
      title: 'Discover & Select Top Photographers',
      subtitle: 'Find your ideal artist filtered by style, destination, and investment range',
      searchPlaceholder: 'Search by photographer name, camera gear or aesthetic...',
      filterAll: 'All Aesthetics',
      priceFrom: 'Starting from',
      rating: 'Rating',
      viewProfile: 'View Portfolio',
      bookWith: 'Select & Book',
      sortBy: 'Sort by',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortRating: 'Highest Rating',
      filterProvince: 'Shoot Destination',
      allProvinces: 'All Vietnam (63 Provinces)',
      resultsCount: 'photographers found',
    },
    booking: {
      title: 'Photography Session Booking Wizard',
      subtitle: 'Complete your booking in 2 minutes with instant transparent price calculation',
      step1: '1. Select Photographer',
      step2: '2. Date & Time',
      step3: '3. Location & Guests',
      step4: '4. Contact Details',
      selectPhotoPrompt: 'Choose your desired photographer:',
      servicePackage: 'Select Service Tier:',
      datePrompt: 'Choose Shoot Date:',
      timeSlot: 'Preferred Time Slot:',
      provincePrompt: 'Province / Destination (Travel fee automatically calculated):',
      travelFeeNotice: 'Travel fee automatically applied:',
      guestCountPrompt: 'Number of Participants:',
      addressPrompt: 'Detailed Location Address (Studio, Cafe, Outdoor, Resort...):',
      addressPlaceholder: 'e.g. Tuyen Lam Pine Forest, Ward 4, Da Lat City',
      namePrompt: 'Your Full Name *',
      phonePrompt: 'Mobile / WhatsApp Number *',
      emailPrompt: 'Email Address for Deliverables *',
      notesPrompt: 'Creative Vision / Special Notes (optional):',
      btnNext: 'Continue',
      btnBack: 'Previous',
      btnProceedPayment: 'Proceed to Payment & Deposit',
    },
    checkout: {
      title: 'Order Breakdown & Deposit Payment',
      subtitle: 'Review total costs including calculated travel fee and select your payment method',
      orderSummary: 'Order Breakdown',
      serviceFee: 'Base Service Package',
      travelFee: 'Crew Travel & Logistics Fee',
      travelFeeDesc: 'Calculated dynamically based on your chosen destination',
      freeTravel: 'Free within city limits',
      totalAmount: 'Grand Total',
      paymentOption: 'Payment Structure:',
      optionDeposit: 'Pay 30% Deposit',
      optionDepositDesc: 'Secure your date slot; pay remaining 70% upon session completion',
      optionFull: 'Pay 100% in Full',
      optionFullDesc: 'Receive complimentary 5 Master Retouched prints and heirloom frame',
      amountToPayNow: 'Amount Due Now:',
      remainingAmount: 'Remaining due on shoot date:',
      paymentMethod: 'Select Payment Gateway:',
      methodVietQR: 'Bank Transfer (Instant VietQR)',
      methodMomo: 'MoMo E-Wallet',
      methodVnpay: 'VNPAY Gateway (ATM / Credit)',
      methodCard: 'International Card (Visa / Mastercard)',
      qrScanTitle: 'Scan VietQR for Automatic Settlement',
      qrScanDesc: 'Open your mobile banking app and scan; payment information is pre-filled',
      qrAccountName: 'Account Name: DINH STUDIO VIETNAM CO., LTD',
      qrAccountNumber: 'Account Number: 8888 6868 9999',
      qrBank: 'Bank: MBBank',
      qrMemo: 'Payment Memo:',
      btnConfirmPayment: 'I Have Completed the Transfer',
      successTitle: 'Booking Confirmed!',
      successDesc: 'We have registered your deposit. Your booking reference code is:',
      bookingCodeLabel: 'YOUR BOOKING CODE:',
      btnViewGallery: 'View Photo Delivery',
      btnChatWithStudio: 'Chat With Studio Team',
    },
    chat: {
      title: '1-on-1 Realtime Studio Chat',
      statusOnline: 'Active Now (Typically replies in 2 mins)',
      roleSale: 'Creative Consultant',
      rolePhotographer: 'Lead Photographer',
      inputPlaceholder: 'Discuss ideas, outfits, location logistics...',
      btnSend: 'Send',
      presetFee: 'Ask about travel logistics',
      presetConcept: 'Request concept advice',
      presetSchedule: 'Check date availability',
      presetQuote: 'Request custom quote',
      attachImage: 'Attach reference photo',
    },
    checkPhoto: {
      title: 'Proof & Download Your Gallery',
      subtitle: 'Enter your booking code to unlock high-resolution deliverables',
      inputPlaceholder: 'Enter booking code (e.g. DINH-8821 or DINH-9043)...',
      btnSearch: 'Unlock Gallery',
      demoHint: 'Try sample codes: DINH-8821 (Da Lat Wedding) or DINH-9043 (Lookbook)',
      galleryFound: 'Gallery Ready!',
      photographer: 'Photographer:',
      shootDate: 'Session Date:',
      location: 'Destination:',
      totalPhotos: 'Total Photos:',
      downloadAll: 'Download All (High-Res ZIP)',
      downloadSingle: 'Download Original',
      favorite: 'Favorited',
      emptyError: 'No gallery found for this booking code. Please verify your code.',
    },
    pricing: {
      title: 'Service Packages & Travel Fee Matrix',
      subtitle: 'Transparent, standardized logistics rates across all 63 provinces in Vietnam',
      packageLookbook: 'Fashion & Lookbook Tier',
      packagePortrait: 'Signature Portrait Tier',
      packageWedding: 'Cinematic Wedding Tier',
      travelFeeTitle: '63 Provinces Travel Fee Directory',
      travelFeeSubtitle: 'Fees are calculated automatically at checkout when the customer selects their destination',
      searchProvince: 'Search province (e.g. Da Lat, Nha Trang, Ha Noi, Vung Tau)...',
      colProvince: 'Province / City',
      colRegion: 'Region',
      colFee: 'Travel Fee',
      colTime: 'Estimated Transit',
      colNotes: 'Logistics Notes',
      freeBadge: 'COMPLIMENTARY LOCAL',
    },
    admin: {
      dashboard: 'Admin Dashboard (CMS)',
      tabOverview: 'Overview',
      tabBookings: 'Bookings Manager',
      tabTravelFees: 'Travel Fee Manager',
      tabPhotographers: 'Photographer Profiles',
      tabGallery: 'Deliver Client Gallery',
      tabChat: 'Client Inbox',
      totalRevenue: 'Total Volume',
      totalBookings: 'Total Bookings',
      activeChats: 'Open Conversations',
      activePhotographers: 'Active Artists',
      btnSave: 'Save Changes',
      btnEdit: 'Edit',
      btnDelete: 'Delete',
      btnAddFee: 'Add New Destination',
      btnAddPhoto: 'Add New Photographer',
      statusPending: 'Pending Review',
      statusConfirmed: 'Confirmed / Deposited',
      statusShooting: 'In Production',
      statusEditing: 'Post-Processing',
      statusDelivered: 'Delivered',
      statusCancelled: 'Cancelled',
      travelFeeNotice: 'Note: Any travel fee changes saved here take effect IMMEDIATELY across customer checkout calculations.',
    },
    common: {
      currency: '₫',
      person: 'people',
      close: 'Close',
      loading: 'Processing...',
      required: 'Required',
    },
  },

  zh: {
    nav: {
      home: '首页',
      findPhoto: '查找摄影师',
      booking: '立即预约',
      pricing: '价格与费用',
      checkPhoto: '查看成片',
      chat: '一对一实时沟通',
      about: '关于工作室',
      admin: '后台管理',
      bookNow: '立即预约',
    },
    hero: {
      badge: '越南顶尖摄影师预约与精选平台',
      titleLine1: '以艺术视角定格',
      titleGradient: '真实动人的光影瞬间',
      subtext: '直接对接越南一流摄影师。全国63省市交通差旅费自动透明计算，灵活定金预订，高清相册在线交付。',
      ctaBook: '立即预约拍摄',
      ctaFind: '探索摄影师阵容',
      statsExperience: '年专业经验',
      statsProjects: '套精美成片',
      statsRating: '五星好评',
      statsGuarantee: '色彩品质保障',
    },
    find: {
      title: '查找并甄选专属摄影师',
      subtitle: '根据拍摄风格、地点及预算轻松筛选心仪艺术家',
      searchPlaceholder: '输入摄影师姓名、机型或风格标签...',
      filterAll: '所有风格',
      priceFrom: '起拍价',
      rating: '评分',
      viewProfile: '作品集',
      bookWith: '选择并预约',
      sortBy: '排序方式',
      sortPriceAsc: '价格从低到高',
      sortPriceDesc: '价格从高到低',
      sortRating: '最高评价',
      filterProvince: '拍摄目的地',
      allProvinces: '全越南（63省市）',
      resultsCount: '位匹配摄影师',
    },
    booking: {
      title: '摄影预约系统',
      subtitle: '仅需2分钟填写信息，即刻获取精准透明报价',
      step1: '1. 选择摄影师',
      step2: '2. 日期与时间',
      step3: '3. 地点与人数',
      step4: '4. 联系信息',
      selectPhotoPrompt: '请选择您心仪的摄影师：',
      servicePackage: '选择拍摄套餐：',
      datePrompt: '选择拍摄日期：',
      timeSlot: '期望拍摄时间段：',
      provincePrompt: '拍摄所在省市（自动计算差旅费）：',
      travelFeeNotice: '系统自动核算差旅费：',
      guestCountPrompt: '拍摄人数：',
      addressPrompt: '具体拍摄地址（影棚、咖啡馆、度假村等）：',
      addressPlaceholder: '例如：大叻泉林湖松林风景区',
      namePrompt: '您的姓名 *',
      phonePrompt: '联系电话 / WeChat / Zalo *',
      emailPrompt: '接收成片的电子邮箱 *',
      notesPrompt: '拍摄构想或特殊要求（选填）：',
      btnNext: '下一步',
      btnBack: '上一步',
      btnProceedPayment: '前往支付定金',
    },
    checkout: {
      title: '费用明细与支付',
      subtitle: '核对拍摄总价、目的地差旅费并选择便捷付款方式',
      orderSummary: '订单明细',
      serviceFee: '套餐基础费用',
      travelFee: '摄制组交通差旅费',
      travelFeeDesc: '根据您选择的省市自动计算',
      freeTravel: '同城免费',
      totalAmount: '订单总金额',
      paymentOption: '付款选项：',
      optionDeposit: '支付 30% 定金',
      optionDepositDesc: '锁定拍摄档期，拍摄完成后付清余款70%',
      optionFull: '全额支付 100%',
      optionFullDesc: '获赠5张精修大片及高品质纪念相框',
      amountToPayNow: '本次需支付金额：',
      remainingAmount: '拍摄当天需付余款：',
      paymentMethod: '选择支付方式：',
      methodVietQR: '银行转账（VietQR极速到账）',
      methodMomo: 'MoMo电子钱包',
      methodVnpay: 'VNPAY网关（银联/信用卡）',
      methodCard: '国际信用卡（Visa / Mastercard）',
      qrScanTitle: '扫码即时转账',
      qrScanDesc: '使用手机银行App扫码，信息已自动填好',
      qrAccountName: '账户名：DINH STUDIO VIETNAM CO., LTD',
      qrAccountNumber: '账号：8888 6868 9999',
      qrBank: '开户行：MBBank',
      qrMemo: '附言备注：',
      btnConfirmPayment: '我已完成付款',
      successTitle: '预约成功！',
      successDesc: '已收到您的定金。您的专属订单编号为：',
      bookingCodeLabel: '您的预约编号：',
      btnViewGallery: '进入选片相册',
      btnChatWithStudio: '联系摄制组',
    },
    chat: {
      title: '与工作室一对一实时沟通',
      statusOnline: '在线（通常2分钟内回复）',
      roleSale: '策划顾问',
      rolePhotographer: '主拍摄影师',
      inputPlaceholder: '沟通构思、服装、路线安排...',
      btnSend: '发送',
      presetFee: '咨询异地差旅费',
      presetConcept: '沟通拍摄风格构想',
      presetSchedule: '确认空余档期',
      presetQuote: '获取专属报价',
      attachImage: '发送参考图片',
    },
    checkPhoto: {
      title: '查看并下载您的照片相册',
      subtitle: '输入预约订单编号即可解锁高清晰度精修照片',
      inputPlaceholder: '输入预约编号（如 DINH-8821 或 DINH-9043）...',
      btnSearch: '解锁相册',
      demoHint: '测试编号：DINH-8821（大叻婚礼）或 DINH-9043（时装画册）',
      galleryFound: '相册准备就绪！',
      photographer: '摄影师：',
      shootDate: '拍摄日期：',
      location: '地点：',
      totalPhotos: '照片总数：',
      downloadAll: '一键下载全部（高清ZIP）',
      downloadSingle: '下载原图',
      favorite: '已收藏',
      emptyError: '未查询到该编号的照片，请核对后重试。',
    },
    pricing: {
      title: '服务套餐与差旅费标准',
      subtitle: '公开透明，标准覆盖全越南63个省市',
      packageLookbook: '时装Lookbook套餐',
      packagePortrait: '高端个人写真套餐',
      packageWedding: '电影感婚礼纪实套餐',
      travelFeeTitle: '全国63省市差旅费名录',
      travelFeeSubtitle: '客户在预约界面选择对应城市时，系统将自动核算该差旅费',
      searchProvince: '搜索城市（如：大叻、芽庄、河内、岘港）...',
      colProvince: '省份 / 城市',
      colRegion: '区域',
      colFee: '差旅附加费',
      colTime: '预计行程时间',
      colNotes: '备注说明',
      freeBadge: '同城免差旅费',
    },
    admin: {
      dashboard: '管理员控制台 (CMS)',
      tabOverview: '总览看板',
      tabBookings: '预约订单管理',
      tabTravelFees: '差旅费标准管理',
      tabPhotographers: '摄影师档案管理',
      tabGallery: '交付客户相册',
      tabChat: '客户咨询消息',
      totalRevenue: '总营业额',
      totalBookings: '总订单数',
      activeChats: '进行中会话',
      activePhotographers: '在职摄影师',
      btnSave: '保存更改',
      btnEdit: '编辑',
      btnDelete: '删除',
      btnAddFee: '新增目的地标准',
      btnAddPhoto: '新增摄影师',
      statusPending: '待审核',
      statusConfirmed: '已付定金/已确认',
      statusShooting: '拍摄中',
      statusEditing: '后期制作中',
      statusDelivered: '已交付',
      statusCancelled: '已取消',
      travelFeeNotice: '提示：此处任何差旅费调整将即时同步至客户结算页。',
    },
    common: {
      currency: '₫',
      person: '人',
      close: '关闭',
      loading: '处理中...',
      required: '必填',
    },
  },

  ko: {
    nav: {
      home: '홈',
      findPhoto: '포토그래퍼 검색',
      booking: '촬영 예약',
      pricing: '가격 및 출장비',
      checkPhoto: '사진 확인/다운로드',
      chat: '1:1 실시간 상담',
      about: '스튜디오 소개',
      admin: '관리자 CMS',
      bookNow: '지금 예약하기',
    },
    hero: {
      badge: '베트남 1위 프리미엄 포토그래퍼 예약 플랫폼',
      titleLine1: '순간의 감정을 담아내는',
      titleGradient: '예술적인 시각적 시',
      subtext: '베트남 최고 수준의 포토그래퍼와 직접 연결하세요. 63개 성·시 출장비 투명 자동 산정, 유연한 계약금 결제, 고화질 갤러리 다운로드 지원.',
      ctaBook: '지금 촬영 예약',
      ctaFind: '포토그래퍼 찾기',
      statsExperience: '년 경력',
      statsProjects: '건의 촬영 완성',
      statsRating: '5성급 만족도',
      statsGuarantee: '색감 보정 보장',
    },
    find: {
      title: '포토그래퍼 찾기 및 매칭',
      subtitle: '스타일, 장소, 예산에 맞춰 최적의 작가를 찾아보세요',
      searchPlaceholder: '작가 이름, 장비 또는 촬영 스타일 검색...',
      filterAll: '모든 스타일',
      priceFrom: '시작 가격',
      rating: '평점',
      viewProfile: '포트폴리오 보기',
      bookWith: '선택 및 예약',
      sortBy: '정렬',
      sortPriceAsc: '가격 낮은순',
      sortPriceDesc: '가격 높은순',
      sortRating: '평점 높은순',
      filterProvince: '촬영 지역',
      allProvinces: '베트남 전역 (63개 성·시)',
      resultsCount: '명의 포토그래퍼',
    },
    booking: {
      title: '촬영 예약 시스템',
      subtitle: '2분 만에 정보를 입력하고 투명한 견적을 확인하세요',
      step1: '1. 작가 선택',
      step2: '2. 날짜 및 시간',
      step3: '3. 장소 및 인원',
      step4: '4. 고객 정보',
      selectPhotoPrompt: '함께할 포토그래퍼를 선택해주세요:',
      servicePackage: '서비스 패키지 선택:',
      datePrompt: '촬영 날짜 선택:',
      timeSlot: '희망 촬영 시간대:',
      provincePrompt: '촬영 도시/지역 (출장비 자동 산출):',
      travelFeeNotice: '해당 지역 출장비 자동 적용:',
      guestCountPrompt: '촬영 참여 인원:',
      addressPrompt: '상세 촬영 장소 (스튜디오, 카페, 리조트 등):',
      addressPlaceholder: '예: 달랏 투옌람 호수 솔밭, 4동',
      namePrompt: '고객명 *',
      phonePrompt: '연락처 / 카카오톡 *',
      emailPrompt: '사진 수령 이메일 *',
      notesPrompt: '희망 스타일 및 특별 요청 사항:',
      btnNext: '다음 단계',
      btnBack: '이전',
      btnProceedPayment: '결제 및 예약금 납부',
    },
    checkout: {
      title: '결제 내역 및 예약금',
      subtitle: '촬영 비용과 출장비를 확인하고 편리한 결제 방식을 선택하세요',
      orderSummary: '주문 상세 내역',
      serviceFee: '촬영 패키지 기본료',
      travelFee: '제작팀 출장비',
      travelFeeDesc: '선택하신 촬영 지역에 따라 자동 계산됩니다',
      freeTravel: '시내 무료 출장',
      totalAmount: '총 결제 금액',
      paymentOption: '결제 방식 선택:',
      optionDeposit: '예약금 30% 결제',
      optionDepositDesc: '일정 확정 및 홀딩, 잔금 70%는 촬영 당일 정산',
      optionFull: '100% 전액 결제',
      optionFullDesc: '마스터 리터칭 사진 5장 추가 증정 및 고급 액자 제공',
      amountToPayNow: '지금 결제할 금액:',
      remainingAmount: '촬영 당일 잔금:',
      paymentMethod: '결제 수단 선택:',
      methodVietQR: '계좌이체 (VietQR 즉시 입금)',
      methodMomo: 'MoMo 페이',
      methodVnpay: 'VNPAY 결제',
      methodCard: '해외 신용카드 (Visa/Mastercard)',
      qrScanTitle: 'QR 간편 이체',
      qrScanDesc: '은행 앱으로 스캔하면 입금 정보가 자동으로 입력됩니다',
      qrAccountName: '예금주: DINH STUDIO VIETNAM CO., LTD',
      qrAccountNumber: '계좌번호: 8888 6868 9999',
      qrBank: '은행: MBBank',
      qrMemo: '입금자명/메모:',
      btnConfirmPayment: '이체 완료 확인',
      successTitle: '예약이 완료되었습니다!',
      successDesc: '예약금 입금이 확인되었습니다. 예약 번호는 다음과 같습니다:',
      bookingCodeLabel: '예약 코드 번호:',
      btnViewGallery: '사진 갤러리 확인',
      btnChatWithStudio: '스튜디오 팀과 채팅',
    },
    chat: {
      title: '1:1 실시간 스튜디오 상담',
      statusOnline: '접속 중 (보통 2분 내 답변)',
      roleSale: '촬영 기획 매니저',
      rolePhotographer: '담당 포토그래퍼',
      inputPlaceholder: '컨셉, 의상, 동선 등 문의 내용을 입력하세요...',
      btnSend: '전송',
      presetFee: '타지역 출장비 문의',
      presetConcept: '컨셉 추천 요청',
      presetSchedule: '예약 가능 일정 확인',
      presetQuote: '맞춤 견적 문의',
      attachImage: '참고 사진 첨부',
    },
    checkPhoto: {
      title: '촬영 사진 확인 및 다운로드',
      subtitle: '예약 코드를 입력하여 고해상도 완성본 갤러리를 확인하세요',
      inputPlaceholder: '예약 코드 입력 (예: DINH-8821 또는 DINH-9043)...',
      btnSearch: '갤러리 열기',
      demoHint: '예시 코드: DINH-8821 (달랏 웨딩) 또는 DINH-9043 (룩북)',
      galleryFound: '사진이 준비되었습니다!',
      photographer: '담당 작가:',
      shootDate: '촬영일:',
      location: '장소:',
      totalPhotos: '총 사진 수:',
      downloadAll: '전체 고화질 다운로드 (ZIP)',
      downloadSingle: '원본 다운로드',
      favorite: '즐겨찾기',
      emptyError: '해당 코드로 등록된 사진을 찾을 수 없습니다.',
    },
    pricing: {
      title: '서비스 요금 및 지역별 출장비 안내',
      subtitle: '베트남 63개 성·시 전역을 아우르는 명확하고 투명한 출장비 기준표',
      packageLookbook: '패션 룩북 패키지',
      packagePortrait: '시그니처 프로필 패키지',
      packageWedding: '시네마틱 웨딩 패키지',
      travelFeeTitle: '전국 63개 성·시 출장비 안내표',
      travelFeeSubtitle: '고객이 촬영지를 선택하면 결제창에서 자동으로 해당 출장비가 합산됩니다',
      searchProvince: '도시 검색 (예: 달랏, 나트랑, 하노이, 다낭)...',
      colProvince: '도시/지역',
      colRegion: '권역',
      colFee: '출장 부대비용',
      colTime: '예상 이동시간',
      colNotes: '비고',
      freeBadge: '시내 무료',
    },
    admin: {
      dashboard: '관리자 대시보드 (CMS)',
      tabOverview: '개요',
      tabBookings: '예약 내역 관리',
      tabTravelFees: '지역 출장비 관리',
      tabPhotographers: '포토그래퍼 관리',
      tabGallery: '고객 갤러리 업로드',
      tabChat: '고객 메시지함',
      totalRevenue: '총 매출',
      totalBookings: '총 예약 수',
      activeChats: '진행 중 상담',
      activePhotographers: '활동 중 작가',
      btnSave: '변경사항 저장',
      btnEdit: '수정',
      btnDelete: '삭제',
      btnAddFee: '신규 지역 추가',
      btnAddPhoto: '신규 작가 등록',
      statusPending: '검토 중',
      statusConfirmed: '예약금 납부/확정',
      statusShooting: '촬영 진행 중',
      statusEditing: '보정 작업 중',
      statusDelivered: '납품 완료',
      statusCancelled: '취소됨',
      travelFeeNotice: '안내: 여기서 수정한 출장비는 고객 결제 화면에 즉시 실시간 반영됩니다.',
    },
    common: {
      currency: '₫',
      person: '명',
      close: '닫기',
      loading: '처리 중...',
      required: '필수',
    },
  },

  ja: {
    nav: {
      home: 'ホーム',
      findPhoto: 'フォトグラファー検索',
      booking: '撮影予約',
      pricing: '料金・出張費',
      checkPhoto: '写真確認・DL',
      chat: '1対1ライブチャット',
      about: 'スタジオ概要',
      admin: '管理者CMS',
      bookNow: '今すぐ予約',
    },
    hero: {
      badge: 'ベトナム最高峰のフォトグラファー予約・厳選プラットフォーム',
      titleLine1: '一瞬の感情を美しく刻む',
      titleGradient: '光と影の芸術的視覚詩',
      subtext: 'ベトナムを代表するトップフォトグラファーと直接マッチング。全国63省市の出張費を自動計算、安心の手付金予約と高解像度オンライン納品。',
      ctaBook: '今すぐ撮影を予約',
      ctaFind: '写真家を探す',
      statsExperience: '年の創作実績',
      statsProjects: '件以上の撮影完了',
      statsRating: '星5評価',
      statsGuarantee: '色調補正保証',
    },
    find: {
      title: 'フォトグラファーを探す',
      subtitle: '撮影スタイル、場所、ご予算に合わせて理想のクリエイターを発見',
      searchPlaceholder: 'フォトグラファー名、カメラ機材、スタイルで検索...',
      filterAll: 'すべてのスタイル',
      priceFrom: '料金目安',
      rating: '評価',
      viewProfile: '作例を見る',
      bookWith: '選択して予約',
      sortBy: '並び替え',
      sortPriceAsc: '料金が安い順',
      sortPriceDesc: '料金が高い順',
      sortRating: '評価が高い順',
      filterProvince: '撮影地',
      allProvinces: 'ベトナム全土（63省市）',
      resultsCount: '名のフォトグラファー',
    },
    booking: {
      title: '撮影予約フォーム',
      subtitle: 'わずか2分で入力完了、明確な見積もりが即時に反映されます',
      step1: '1. 写真家選択',
      step2: '2. 日時選択',
      step3: '3. 撮影場所・人数',
      step4: '4. お客様情報',
      selectPhotoPrompt: '担当フォトグラファーをお選びください：',
      servicePackage: 'サービスプランの選択：',
      datePrompt: '希望撮影日：',
      timeSlot: '希望時間帯：',
      provincePrompt: '撮影地域（出張費が自動計算されます）：',
      travelFeeNotice: '該当地域の出張費：',
      guestCountPrompt: '撮影参加人数：',
      addressPrompt: '詳細な撮影場所（スタジオ、カフェ、ホテル、野外等）：',
      addressPlaceholder: '例：ダラット市 トゥエンラム湖 森林エリア',
      namePrompt: 'お名前 *',
      phonePrompt: 'お電話番号 / LINE *',
      emailPrompt: '納品先メールアドレス *',
      notesPrompt: 'ご要望・希望コンセプト等：',
      btnNext: '次へ進む',
      btnBack: '戻る',
      btnProceedPayment: 'お支払い・手付金確認へ',
    },
    checkout: {
      title: '料金内訳・手付金決済',
      subtitle: '撮影代金と出張費の内訳をご確認のうえ、お支払い方法を選択してください',
      orderSummary: 'ご予約明細',
      serviceFee: 'プラン基本料金',
      travelFee: '撮影クルー出張費',
      travelFeeDesc: '選択された目的地に応じて自動的に算出されます',
      freeTravel: '市内無料出張',
      totalAmount: '合計金額',
      paymentOption: 'お支払い方法の選択：',
      optionDeposit: '手付金30％をお支払い',
      optionDepositDesc: 'スケジュールを確実に確保し、残金70％は撮影完了時にお支払い',
      optionFull: '100％全額をお支払い',
      optionFullDesc: '特典：マスターレタッチ写真5枚追加＆高級フォトフレーム贈呈',
      amountToPayNow: '今回のお支払い金額：',
      remainingAmount: '撮影日当日のお支払い残金：',
      paymentMethod: '決済ゲートウェイ選択：',
      methodVietQR: '銀行振込（VietQR即時反映）',
      methodMomo: 'MoMo電子マネー',
      methodVnpay: 'VNPAY決済',
      methodCard: '国際クレジットカード（Visa / Mastercard）',
      qrScanTitle: 'QRコード送金',
      qrScanDesc: 'バンキングアプリでスキャンすると情報が自動入力されます',
      qrAccountName: '口座名義：DINH STUDIO VIETNAM CO., LTD',
      qrAccountNumber: '口座番号：8888 6868 9999',
      qrBank: '銀行：MBBank',
      qrMemo: '振込名義／メモ：',
      btnConfirmPayment: '送金完了を確認',
      successTitle: '予約が完了いたしました！',
      successDesc: '手付金の受領を確認いたしました。お客様のご予約コード：',
      bookingCodeLabel: 'ご予約コード：',
      btnViewGallery: '写真ギャラリーへ',
      btnChatWithStudio: 'スタジオとチャット',
    },
    chat: {
      title: '1対1 スタジオリアルタイムチャット',
      statusOnline: 'オンライン（通常2分以内に返答）',
      roleSale: '専任プランナー',
      rolePhotographer: '担当写真家',
      inputPlaceholder: 'コンセプト、衣装、タイムテーブルをご相談ください...',
      btnSend: '送信',
      presetFee: '出張費について確認',
      presetConcept: '撮影イメージの相談',
      presetSchedule: '空き状況の確認',
      presetQuote: '見積もりの相談',
      attachImage: '参考写真を添付',
    },
    checkPhoto: {
      title: '納品ギャラリーの確認・ダウンロード',
      subtitle: '予約コードを入力して高解像度の完成写真にアクセスできます',
      inputPlaceholder: '予約コードを入力（例：DINH-8821 または DINH-9043）...',
      btnSearch: 'ギャラリーを開く',
      demoHint: 'サンプルコード：DINH-8821（ダラット挙式）または DINH-9043（ルックブック）',
      galleryFound: '写真の準備が整いました！',
      photographer: '担当写真家：',
      shootDate: '撮影日：',
      location: '撮影場所：',
      totalPhotos: '総枚数：',
      downloadAll: '全写真一括ダウンロード（高画質ZIP）',
      downloadSingle: 'オリジナル画質DL',
      favorite: 'お気に入り',
      emptyError: '該当する予約コードの写真が見つかりません。',
    },
    pricing: {
      title: 'プラン料金・全国出張費一覧',
      subtitle: 'ベトナム全土63省市を網羅した明確な出張費基準',
      packageLookbook: 'ファッション・ルックブック',
      packagePortrait: 'シグネチャー・ポートレート',
      packageWedding: 'シネマティック・ウェディング',
      travelFeeTitle: '全国63省市 出張費一覧表',
      travelFeeSubtitle: '予約時に撮影地を選択すると、この出張費が自動的にお支払い額に合算されます',
      searchProvince: '都市名で検索（例：ダラット、ニャチャン、ハノイ、ダナン）...',
      colProvince: '省・都市',
      colRegion: 'エリア',
      colFee: '出張諸経費',
      colTime: '移動所要時間',
      colNotes: '特記事項',
      freeBadge: '市内無料',
    },
    admin: {
      dashboard: '管理者ダッシュボード (CMS)',
      tabOverview: '概要',
      tabBookings: '予約案件管理',
      tabTravelFees: '出張費マスタ管理',
      tabPhotographers: '写真家マスタ管理',
      tabGallery: '写真納品アップロード',
      tabChat: 'お問い合わせ受信トレイ',
      totalRevenue: '総売上',
      totalBookings: '総予約数',
      activeChats: '対応中チャット',
      activePhotographers: '稼働中フォトグラファー',
      btnSave: '変更を保存',
      btnEdit: '編集',
      btnDelete: '削除',
      btnAddFee: '出張地域を追加',
      btnAddPhoto: '新規写真家を登録',
      statusPending: '審査待ち',
      statusConfirmed: '手付金済／確定',
      statusShooting: '撮影中',
      statusEditing: 'レタッチ・現像中',
      statusDelivered: '納品完了',
      statusCancelled: 'キャンセル',
      travelFeeNotice: '注：ここで編集された出張費は、お客様の決済画面に即座に反映されます。',
    },
    common: {
      currency: '₫',
      person: '名',
      close: '閉じる',
      loading: '処理中...',
      required: '必須',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      findPhoto: 'Trouver un Photo',
      booking: 'Réserver une Séance',
      pricing: 'Tarifs & Frais',
      checkPhoto: 'Voir Mes Photos',
      chat: 'Chat 1-1 en Direct',
      about: 'À Propos du Studio',
      admin: 'Espace Admin',
      bookNow: 'Réserver',
    },
    hero: {
      badge: 'Plateforme N°1 de Réservation de Photographes au Vietnam',
      titleLine1: 'Sublimer Vos Émotions Par',
      titleGradient: 'Une Poésie Visuelle Exquise',
      subtext: 'Accédez aux artistes photographes les plus talentueux du Vietnam. Calcul automatique et transparent des frais de déplacement sur 63 provinces, paiement d’acompte sécurisé et galerie en ligne haute résolution.',
      ctaBook: 'Réserver Votre Séance',
      ctaFind: 'Découvrir les Photographes',
      statsExperience: 'Années d’Expérience',
      statsProjects: 'Séances Réalisées',
      statsRating: 'Avis 5 Étoiles',
      statsGuarantee: 'Garantie Retouche d’Art',
    },
    find: {
      title: 'Trouver Votre Photographe Idéal',
      subtitle: 'Filtrez selon le style artistique, la destination et votre budget',
      searchPlaceholder: 'Rechercher par nom, équipement ou univers esthétique...',
      filterAll: 'Tous les Styles',
      priceFrom: 'À partir de',
      rating: 'Note',
      viewProfile: 'Voir le Portfolio',
      bookWith: 'Choisir & Réserver',
      sortBy: 'Trier par',
      sortPriceAsc: 'Prix croissant',
      sortPriceDesc: 'Prix décroissant',
      sortRating: 'Meilleurs avis',
      filterProvince: 'Lieu de tournage',
      allProvinces: 'Tout le Vietnam (63 provinces)',
      resultsCount: 'photographes trouvés',
    },
    booking: {
      title: 'Réservation de Séance Photo',
      subtitle: 'Remplissez vos détails en 2 minutes et obtenez un devis instantané et transparent',
      step1: '1. Choisir le Photographe',
      step2: '2. Date & Créneau',
      step3: '3. Lieu & Participants',
      step4: '4. Vos Coordonnées',
      selectPhotoPrompt: 'Sélectionnez votre artiste :',
      servicePackage: 'Choisissez la formule :',
      datePrompt: 'Date de la séance :',
      timeSlot: 'Créneau horaire souhaité :',
      provincePrompt: 'Province / Ville (Calcul automatique du déplacement) :',
      travelFeeNotice: 'Frais de déplacement automatiquement appliqués :',
      guestCountPrompt: 'Nombre de personnes :',
      addressPrompt: 'Adresse détaillée (Studio, extérieur, hôtel, domaine...) :',
      addressPlaceholder: 'Ex: Lac Tuyen Lam, Forêt de pins, Da Lat',
      namePrompt: 'Nom et Prénom *',
      phonePrompt: 'Numéro de téléphone / WhatsApp *',
      emailPrompt: 'Adresse e-mail pour la livraison des photos *',
      notesPrompt: 'Idée créative ou besoins particuliers :',
      btnNext: 'Suivant',
      btnBack: 'Précédent',
      btnProceedPayment: 'Procéder au Paiement de l’Acompte',
    },
    checkout: {
      title: 'Détail de la Commande & Acompte',
      subtitle: 'Consultez le montant total incluant les frais de déplacement et choisissez votre mode de paiement',
      orderSummary: 'Récapitulatif de la Commande',
      serviceFee: 'Formule de Séance',
      travelFee: 'Frais de Déplacement Équipe',
      travelFeeDesc: 'Calculé dynamiquement selon la province sélectionnée',
      freeTravel: 'Déplacement intra-muros offert',
      totalAmount: 'Montant Total',
      paymentOption: 'Modalité de Règlement :',
      optionDeposit: 'Verser un acompte de 30%',
      optionDepositDesc: 'Verrouille la date avec le photographe, solde de 70% après la séance',
      optionFull: 'Régler 100% de la totalité',
      optionFullDesc: 'Bonus : 5 photos Master Retouch offertes et tirage sous cadre luxe',
      amountToPayNow: 'Montant à régler maintenant :',
      remainingAmount: 'Solde dû le jour de la séance :',
      paymentMethod: 'Passerelle de Paiement :',
      methodVietQR: 'Virement bancaire (VietQR Instantané)',
      methodMomo: 'Portefeuille Électronique MoMo',
      methodVnpay: 'Passerelle VNPAY (CB / Cartes locales)',
      methodCard: 'Carte Internationale (Visa / Mastercard)',
      qrScanTitle: 'Scan VietQR pour Règlement Immédiat',
      qrScanDesc: 'Ouvrez votre application bancaire et scannez le QR code pré-rempli',
      qrAccountName: 'Titulaire : DINH STUDIO VIETNAM CO., LTD',
      qrAccountNumber: 'Numéro de compte : 8888 6868 9999',
      qrBank: 'Banque : MBBank',
      qrMemo: 'Référence du virement :',
      btnConfirmPayment: 'J’ai Effectué le Virement',
      successTitle: 'Réservation Confirmée !',
      successDesc: 'Votre acompte a été bien enregistré. Votre code de réservation est :',
      bookingCodeLabel: 'VOTRE CODE DE RÉSERVATION :',
      btnViewGallery: 'Accéder à la Galerie',
      btnChatWithStudio: 'Discuter avec l’Équipe',
    },
    chat: {
      title: 'Messagerie Directe 1-1 avec le Studio',
      statusOnline: 'En ligne (Réponse en moins de 2 min)',
      roleSale: 'Conseiller Artistique',
      rolePhotographer: 'Photographe Référent',
      inputPlaceholder: 'Échangez sur vos idées, tenues, planning...',
      btnSend: 'Envoyer',
      presetFee: 'Demander les frais de déplacement',
      presetConcept: 'Conseils sur le concept',
      presetSchedule: 'Vérifier les disponibilités',
      presetQuote: 'Demander un devis sur mesure',
      attachImage: 'Envoyer une photo modèle',
    },
    checkPhoto: {
      title: 'Consulter & Télécharger Votre Galerie',
      subtitle: 'Saisissez votre code de réservation pour déverrouiller vos photos haute définition',
      inputPlaceholder: 'Code de réservation (ex: DINH-8821 ou DINH-9043)...',
      btnSearch: 'Déverrouiller la Galerie',
      demoHint: 'Exemples de codes disponibles : DINH-8821 (Mariage Da Lat) ou DINH-9043 (Lookbook)',
      galleryFound: 'Votre Galerie Est Prête !',
      photographer: 'Photographe :',
      shootDate: 'Date de séance :',
      location: 'Lieu :',
      totalPhotos: 'Photos totales :',
      downloadAll: 'Tout Télécharger (ZIP Haute Résolution)',
      downloadSingle: 'Télécharger l’Original',
      favorite: 'Favoris',
      emptyError: 'Aucune galerie trouvée pour ce code. Veuillez vérifier votre référence.',
    },
    pricing: {
      title: 'Grille Tarifaire & Frais de Déplacement',
      subtitle: 'Une tarification claire et standardisée sur l’ensemble des 63 provinces vietnamiennes',
      packageLookbook: 'Formule Fashion Lookbook',
      packagePortrait: 'Formule Signature Portrait',
      packageWedding: 'Formule Mariage Cinématographique',
      travelFeeTitle: 'Répertoire des Frais de Déplacement (63 Provinces)',
      travelFeeSubtitle: 'Ces frais s’appliquent automatiquement à la validation de commande selon le lieu choisi',
      searchProvince: 'Rechercher une province (ex: Da Lat, Nha Trang, Hanoi, Da Nang)...',
      colProvince: 'Province / Ville',
      colRegion: 'Région',
      colFee: 'Frais de Déplacement',
      colTime: 'Temps Estimé',
      colNotes: 'Remarques',
      freeBadge: 'OFFERT EN INTRA-MUROS',
    },
    admin: {
      dashboard: 'Panneau d’Administration (CMS)',
      tabOverview: 'Vue d’Ensemble',
      tabBookings: 'Gestion des Réservations',
      tabTravelFees: 'Gestion des Frais de Déplacement',
      tabPhotographers: 'Gestion des Photographes',
      tabGallery: 'Livraison de Galeries',
      tabChat: 'Boîte de Réception Clients',
      totalRevenue: 'Chiffre d’Affaires',
      totalBookings: 'Réservations Totales',
      activeChats: 'Discussions en Cours',
      activePhotographers: 'Artistes Actifs',
      btnSave: 'Enregistrer',
      btnEdit: 'Modifier',
      btnDelete: 'Supprimer',
      btnAddFee: 'Ajouter une Destination',
      btnAddPhoto: 'Ajouter un Photographe',
      statusPending: 'En attente',
      statusConfirmed: 'Acompte Payé / Confirmé',
      statusShooting: 'En Tournage',
      statusEditing: 'En Post-Production',
      statusDelivered: 'Galerie Livrée',
      statusCancelled: 'Annulé',
      travelFeeNotice: 'Important : Toute modification de frais enregistrée ici est appliquée IMMÉDIATEMENT sur le panier client.',
    },
    common: {
      currency: '₫',
      person: 'personnes',
      close: 'Fermer',
      loading: 'Traitement en cours...',
      required: 'Requis',
    },
  },
};

export const translations: Record<Language, Translations> = {
  ...baseTranslations,
  de: baseTranslations.en,
  it: baseTranslations.en,
  es: baseTranslations.en,
};
