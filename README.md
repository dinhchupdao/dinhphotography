# 📷 DINH. STUDIO | Luxury Photography & Booking Platform (Next.js 14)

> **Nền Tảng Tuyển Chọn, Đặt Lịch Chụp Ảnh & Quản Trị Studio Tự Động**  
> Xây dựng với **Next.js 14 (App Router)** + **Tailwind CSS** + **Framer Motion** + **Đa ngôn ngữ i18n (6 thứ tiếng)**.

![DINH STUDIO Hero Preview](public/images/hero.jpg)

---

## 🌟 Tổng Quan Tính Năng Dự Án

### 1. TRANG KHÁCH HÀNG (Public Website)
- **Trang chủ (`/`)**: Hero gradient tím - hồng (`#7B2CBF` đến `#E91E63`), thanh tìm kiếm nhanh, thống kê uy tín, gương mặt photographer tiêu biểu, banner minh bạch phụ phí di chuyển, quy trình 4 bước, đánh giá khách hàng.
- **Tra cứu Photo (`/photographers`)**: Danh sách card nhiếp ảnh gia với ảnh bìa, avatar, rating sao, giá khởi điểm, phong cách, thiết bị, bộ lọc theo phong cách, tỉnh thành, sắp xếp giá/đánh giá, và Modal xem chi tiết Portfolio kèm thông số EXIF ống kính.
- **Đặt lịch chụp (`/booking`)**: Form đặt lịch trực quan 4 bước: Chọn Photo & gói chụp, ngày & giờ, số lượng người, địa điểm (tự động tính phụ phí di chuyển theo tỉnh thành), thông tin khách hàng.
- **Thanh toán & Đặt cọc (`/checkout`)**:
  - Chi tiết dự toán minh bạch: Giá dịch vụ + Phụ phí di chuyển ekíp.
  - Tùy chọn linh hoạt: **Đặt cọc 30%** (giữ lịch) hoặc **Thanh toán toàn bộ 100%** (nhận thêm quà tặng).
  - Cổng thanh toán: Chuyển khoản VietQR (tự sinh mã QR chuẩn kèm thông tin chuyển khoản), MoMo, VNPAY, Thẻ quốc tế.
  - Màn hình biên nhận thành công kèm hiệu ứng Confetti và mã Booking riêng biệt.
- **Chat riêng 1-1 (`/chat`)**: Hệ thống trò chuyện thời gian thực giữa khách với Sale hoặc Photographer, hỗ trợ gửi tin nhắn, ảnh mẫu đính kèm, các nút câu hỏi gợi ý nhanh và phản hồi tự động.
- **Check ảnh (`/check-photo`)**: Khách hàng nhập mã booking (ví dụ: `DINH-8821` hoặc `DINH-9043`) để mở khóa phòng ảnh độ phân giải cao, xem Lightbox, bấm yêu thích (★) và tải xuống toàn bộ (ZIP) hoặc từng ảnh gốc.
- **Bảng giá & Phụ phí (`/pricing`)**: Bảng gói dịch vụ chi tiết kèm danh mục tra cứu phụ phí di chuyển 63 tỉnh thành toàn quốc.
- **About & Liên hệ (`/about`)**: Câu chuyện thương hiệu, triết lý nghệ thuật, giải đáp thắc mắc FAQ và form gửi yêu cầu trực tiếp.

### 2. TRANG ADMIN CMS (`/admin`)
- **Đăng nhập quản trị**: Bảo mật thông tin studio.
- **Tổng quan (Overview Analytics)**: Thống kê doanh thu, số đơn booking, cuộc chat đang chờ, số photographer hoạt động.
- **Quản lý Booking**: Xem danh sách đơn, cập nhật trạng thái đơn (*Chờ duyệt, Đã cọc/Xác nhận, Đang chụp, Đang hậu kỳ, Đã giao ảnh, Đã hủy*).
- **Quản lý Phí di chuyển (Travel Fee Manager)**: Admin có thể sửa, thêm mới mức phí cho từng tỉnh thành; hệ thống **tự động đồng bộ và áp dụng ngay lập tức vào trang thanh toán của khách hàng**.
- **Quản lý Photographer**: Quản lý hồ sơ, phong cách, thiết bị và giá khởi điểm của các nghệ sĩ.
- **Upload Gallery Giao Ảnh**: Nhập mã booking của khách để thêm ảnh hoàn thiện; khách tra cứu tại trang "Check ảnh" sẽ thấy ngay.
- **Hộp thư Live Chat**: Xem toàn bộ tin nhắn khách gửi và trả lời trực tiếp dưới danh nghĩa Tư Vấn Viên hoặc Photographer.

### 3. ĐA NGÔN NGỮ (i18n)
- Hỗ trợ đầy đủ 6 ngôn ngữ:
  - 🇻🇳 **Tiếng Việt** (Mặc định)
  - 🇺🇸 **English**
  - 🇨🇳 **简体中文** (Chinese)
  - 🇰🇷 **한국어** (Korean)
  - 🇯🇵 **日本語** (Japanese)
  - 🇫🇷 **Français** (French)
- Trình chuyển đổi ngôn ngữ thông minh trên thanh Header chuyển đổi tức thì toàn bộ nội dung website.

---

## 🛠️ Cấu Trúc Thư Mục (Next.js 14 App Router)

```text
DinhTeam/
├── public/
│   └── images/                     # Ảnh chất lượng cao (hero, photographer, editorial)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout kèm AppProvider, Navbar, Footer
│   │   ├── globals.css             # Tailwind directives, fonts, gradients, scrollbar
│   │   ├── page.tsx                # Trang chủ (Public Landing Page)
│   │   ├── photographers/page.tsx  # Trang Tra cứu Photo
│   │   ├── booking/page.tsx        # Trang Form Đặt Lịch Chụp
│   │   ├── checkout/page.tsx       # Trang Thanh toán / Đặt cọc có phí di chuyển & VietQR
│   │   ├── chat/page.tsx           # Trang Chat 1-1 Realtime
│   │   ├── check-photo/page.tsx    # Trang Check & Tải ảnh bằng mã Booking
│   │   ├── pricing/page.tsx        # Bảng giá & Biểu phí di chuyển 63 tỉnh thành
│   │   ├── about/page.tsx          # Giới thiệu studio & FAQ & Liên hệ
│   │   └── admin/page.tsx          # Trang Admin Dashboard (CMS toàn diện)
│   ├── components/
│   │   ├── Navbar.tsx              # Thanh điều hướng với LanguageSwitcher & CTA
│   │   ├── Footer.tsx              # Chân trang với thông tin liên hệ & điểm chụp
│   │   ├── LanguageSwitcher.tsx    # Nút chuyển 6 ngôn ngữ với cờ quốc gia
│   │   └── PhotographerCard.tsx    # Card nghệ sĩ kèm modal xem Portfolio & EXIF
│   ├── context/
│   │   └── AppContext.tsx          # Quản lý state toàn cục (i18n, booking, fees, chat)
│   ├── lib/
│   │   ├── i18n.ts                 # Từ điển phiên dịch đầy đủ 6 ngôn ngữ
│   │   └── mockData.ts             # Dữ liệu mẫu (6 Photo, 63 tỉnh thành, gallery, chat)
│   └── types/
│       └── index.ts                # Định nghĩa TypeScript chặt chẽ
├── tailwind.config.ts              # Thiết lập tone màu gradient tím-hồng (#7B2CBF - #E91E63)
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Khởi Chạy Ứng Dụng Tại Local

```bash
# Cài đặt các gói phụ thuộc
npm install

# Khởi chạy môi trường phát triển
npm run dev

# Hoặc chạy bản build tối ưu hóa
npm run build
npm run start
```

Mở trình duyệt tại: **[http://localhost:3000](http://localhost:3000)**

---

## 🌐 Triển Khai Lên GitHub & Vercel

```bash
# 1. Đẩy code lên GitHub
git add .
git commit -m "feat: complete Next.js 14 photography booking platform"
git push -u origin main

# 2. Triển khai miễn phí trên Vercel:
# - Truy cập vercel.com, liên kết tài khoản GitHub
# - Chọn repository "DinhTeam" và bấm "Deploy"
```

*© 2026 DINH STUDIO. Crafted with Precision & Artistry.*
