'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PhotographerCard } from '@/components/PhotographerCard';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Camera, 
  Zap,
  CreditCard,
  Download,
  Star,
  Award,
  Sliders,
  FileCheck,
  Check
} from 'lucide-react';

export default function HomePage() {
  const { t, photographers, travelFees, formatCurrency } = useApp();
  const router = useRouter();

  // Quick Hero Search state
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPhotographers = photographers.filter(p => p.featured).slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/photographers?style=${encodeURIComponent(selectedStyle)}&province=${encodeURIComponent(selectedProvince)}&q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* ==========================================================================
           1. HERO SECTION (Obsidian Luxury & Metallic Gold)
           ========================================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Cinematic Backdrop with Vignette */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/images/hero.jpg"
            alt="DINH. STUDIO Haute Photography Hero"
            fill
            className="object-cover opacity-25 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-950/80 to-obsidian-950" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 shadow-gold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-xs font-bold text-gold-300 tracking-widest uppercase">
                Sẵn sàng cho các dự án toàn cầu • Sài Gòn • Tokyo • Paris
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight leading-[1.1]">
              Nơi Cảm Xúc Hóa <br />
              <span className="text-gradient-gold">Thi Ca Thị Giác</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-sans font-light leading-relaxed">
              DINH. STUDIO quy tụ những nghệ sĩ nhiếp ảnh hàng đầu, kiến tạo những khung hình thời trang cao cấp, chân dung nghệ thuật và ký sự cưới bất hủ với ngôn ngữ ánh sáng điện ảnh độc bản.
            </p>

            {/* Quick Hero Search Box */}
            <div className="pt-4 max-w-3xl mx-auto">
              <form
                onSubmit={handleHeroSearch}
                className="p-3 sm:p-4 rounded-3xl bg-obsidian-850/90 border border-gold-400/30 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-12 gap-3"
              >
                {/* Style selector */}
                <div className="sm:col-span-4">
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-2xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  >
                    <option value="all">Mọi Phong Cách Sáng Tác</option>
                    <option value="Fashion & Editorial">Fashion & Editorial</option>
                    <option value="Chân Dung Nghệ Thuật">Chân Dung Nghệ Thuật</option>
                    <option value="Ký Sự Cưới">Ký Sự Cưới Điện Ảnh</option>
                    <option value="Lookbook Thương Hiệu">Lookbook Thương Hiệu</option>
                    <option value="Concept & Nàng Thơ">Concept & Nàng Thơ</option>
                  </select>
                </div>

                {/* City selector */}
                <div className="sm:col-span-4">
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-2xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  >
                    <option value="">Mọi Điểm Chụp (Toàn Quốc)</option>
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh (Sài Gòn)</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Lạt">Đà Lạt</option>
                    <option value="Đà Nẵng">Đà Nẵng / Hội An</option>
                    <option value="Phú Quốc">Phú Quốc</option>
                    <option value="Nha Trang">Nha Trang</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="sm:col-span-4">
                  <button
                    type="submit"
                    className="w-full h-full py-3 px-5 rounded-2xl text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold hover:opacity-95 shadow-gold hover:shadow-gold-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Tìm Nghệ Sĩ Phù Hợp</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Hero Stats Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black font-serif text-gold-300">8+</div>
                <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Năm Di Sản Nghệ Thuật</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black font-serif text-white">1,500+</div>
                <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Bộ Ảnh Hoàn Hảo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black font-serif text-gold-300">5.0 ★</div>
                <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Điểm Đánh Giá VIP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black font-serif text-white">100%</div>
                <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Bảo Chứng Phiếu Dịch Vụ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           2. PHOTOGRAPHY PHILOSOPHY & PILLARS
           ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Nghệ Thuật Độc Bản</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight uppercase">
            Các Trụ Cột Thị Giác Cốt Lõi
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Mỗi thể loại là một công trình ánh sáng và cảm xúc được kiến tạo tỉ mỉ đến từng điểm ảnh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Haute Fashion & Editorial',
              tag: 'Vogue & Harper’s Bazaar Tone',
              desc: 'Ngôn ngữ ánh sáng thời trang quốc tế, kỹ thuật tôn vinh chất liệu và đường nét Haute Couture đỉnh cao.',
              image: '/images/hero.jpg',
            },
            {
              title: 'Signature Visual Portrait',
              tag: 'Ánh Sáng Điện Ảnh',
              desc: 'Khắc họa khí chất độc bản của nhân vật qua từng mảng sáng tối chiaroscuro đầy chiều sâu và cảm xúc.',
              image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Cinematic Wedding Romance',
              tag: 'Vượt Thời Gian',
              desc: 'Ghi lại ngày trọng đại như một thước phim điện ảnh kinh điển. Cảm xúc chân thực, nguyên bản và bất biến.',
              image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden bg-obsidian-850 border border-white/10 hover:border-gold-400/50 shadow-dark hover:shadow-gold transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-obsidian-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-obsidian-900/80 backdrop-blur-md text-[10px] font-bold text-gold-300 uppercase tracking-wider border border-gold-400/20">
                  {item.tag}
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
           3. FEATURED PHOTOGRAPHERS SHOWCASE
           ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Nghệ Sĩ Đại Diện</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight uppercase">
              Đội Ngũ Nhiếp Ảnh Gia Nổi Bật
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Tuyển chọn các nghệ sĩ hình ảnh có kinh nghiệm thực hiện các chiến dịch lớn trong và ngoài nước.
            </p>
          </div>

          <Link
            href="/photographers"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-gold-300 hover:text-black hover:bg-gold-400 border border-gold-400/30 transition-all flex items-center gap-2"
          >
            <span>Xem Tất Cả Nhiếp Ảnh Gia</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPhotographers.map((photo) => (
            <PhotographerCard key={photo.id} photographer={photo} />
          ))}
        </div>
      </section>

      {/* ==========================================================================
           4. 4-STEP BOOKING WORKFLOW (TRANSPARENT SYSTEM)
           ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-obsidian-850 p-8 sm:p-12 rounded-3xl border border-white/10 shadow-dark space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hệ Thống Booking Chuẩn Mực</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight uppercase">
              Quy Trình Đặt Lịch & Nhận Phiếu Xác Nhận
            </h2>
            <p className="text-xs text-gray-400">
              Minh bạch, bảo mật và chuẩn xác trong từng thao tác đặt lịch và giao nhận tác phẩm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Chọn Nghệ Sĩ & Gói',
                desc: 'Khám phá portfolio độc bản, thiết bị máy ảnh và lựa chọn phong cách sáng tác phù hợp nhất.',
              },
              {
                step: '02',
                title: 'Tự Động Tính Phụ Phí',
                desc: 'Chọn tỉnh thành (63 tỉnh thành & quốc tế), hệ thống tự động tính chi phí di chuyển chuẩn xác.',
              },
              {
                step: '03',
                title: 'Thanh Toán Tại /cast',
                desc: 'Trang thanh toán riêng biệt /cast hỗ trợ VietQR tự động, MoMo, VNPAY, Thẻ và tùy chọn cọc 30%.',
              },
              {
                step: '04',
                title: 'Phiếu Xác Nhận Framevis',
                desc: 'Tự động tạo Phiếu xác nhận dịch vụ đầy đủ pháp lý, in ấn trực tiếp và tra cứu ảnh tại /check-photo.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-obsidian-900 border border-white/5 space-y-3 relative group hover:border-gold-400/30 transition-colors"
              >
                <div className="text-3xl font-black font-serif text-gold-400/40 group-hover:text-gold-300 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold hover:opacity-95 shadow-gold hover:shadow-gold-lg transition-all"
            >
              <span>Bắt Đầu Khởi Tạo Buổi Chụp Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           5. RETOUCH STUDIO & QUALITY STANDARDS
           ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-obsidian-900 border border-gold-400/30 shadow-2xl">
            <Image
              src="/images/editorial_cover.jpg"
              alt="DINH STUDIO Retouch Mastery"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-obsidian-950/80 backdrop-blur-md border border-white/10 text-xs text-gray-300">
              <span className="font-bold text-gold-300 block mb-0.5 uppercase tracking-wide">Quy Chuẩn Master Retouch</span>
              Kỹ thuật Dodge & Burn giữ nguyên khối cơ và cấu trúc bề mặt da tự nhiên, không làm bệt hạt phấn.
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Tiêu Chuẩn Phòng Hậu Kỳ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight uppercase">
              Bảo Chứng Nghệ Thuật Trong Từng Điểm Ảnh
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Tại DINH. STUDIO, mỗi bức ảnh sau buổi chụp đều trải qua phòng hậu kỳ cân màu màn hình chuẩn EIZO ColorEdge, áp dụng hệ thống màu điện ảnh độc quyền và kỹ thuật tinh chỉnh thủ công.
            </p>

            <div className="space-y-3 text-xs text-gray-300">
              {[
                'Hệ thống máy ảnh độ phân giải cao Leica M11 & Sony Alpha GM',
                'Quản lý không gian màu AdobeRGB / ProPhoto chuẩn in ấn quốc tế',
                'Bàn giao link ảnh tra cứu riêng tư mật khẩu 2 lớp tại /check-photo',
                'Phiếu xác nhận dịch vụ tiêu chuẩn Framevis minh bạch điều khoản',
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/pricing"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-gold-300 hover:text-black hover:bg-gold-400 border border-gold-400/30 transition-all"
              >
                Xem Chi Tiết Bảng Giá
              </Link>
              <Link
                href="/chat"
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white bg-obsidian-800 border border-white/10 transition-colors"
              >
                Nhắn Tin Tư Vấn Moodboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
