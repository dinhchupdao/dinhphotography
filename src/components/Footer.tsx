'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Camera, MapPin, Phone, Mail, Instagram, Sparkles, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, formatCurrency } = useApp();

  return (
    <footer className="bg-obsidian-950 text-white pt-16 pb-12 border-t border-gold-400/20 relative overflow-hidden">
      {/* Decorative luxury gold ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-obsidian-900 border border-gold-400/40 flex items-center justify-center shadow-gold">
                <Camera className="w-5 h-5 text-gold-300" />
              </div>
              <div className="flex items-center gap-1.5 font-serif font-black text-xl tracking-tight text-white">
                <span>DINH</span>
                <span className="text-gold-400 text-2xl leading-none">.</span>
                <span className="text-[10px] font-sans uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-gold-400/10 text-gold-300 border border-gold-400/30">
                  STUDIO
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Nghệ thuật nhiếp ảnh Editorial, Chân dung nghệ thuật đỉnh cao & Ký sự cưới điện ảnh. DINH. STUDIO kiến tạo những khung hình bất hủ với ngôn ngữ ánh sáng độc bản.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-obsidian-850 hover:bg-gold-400/20 border border-white/10 hover:border-gold-400/40 flex items-center justify-center transition-all duration-200 hover:scale-110 text-gold-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="tel:0909888999" 
                className="w-9 h-9 rounded-full bg-obsidian-850 hover:bg-gold-400/20 border border-white/10 hover:border-gold-400/40 flex items-center justify-center transition-all duration-200 hover:scale-110 text-gold-300"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:booking@dinhstudio.vn" 
                className="w-9 h-9 rounded-full bg-obsidian-850 hover:bg-gold-400/20 border border-white/10 hover:border-gold-400/40 flex items-center justify-center transition-all duration-200 hover:scale-110 text-gold-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-gold-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-gold" />
              Tác Phẩm & Dịch Vụ
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/photographers" className="hover:text-gold-300 transition-colors">
                  Đội Ngũ Nhiếp Ảnh Gia
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gold-300 transition-colors">
                  Đặt Lịch Chụp Trực Tuyến
                </Link>
              </li>
              <li>
                <Link href="/cast" className="hover:text-gold-300 transition-colors">
                  Thanh Toán & Đặt Cọc (/cast)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold-300 transition-colors">
                  Bảng Giá Gói Chụp & Biểu Phí
                </Link>
              </li>
              <li>
                <Link href="/check-photo" className="hover:text-gold-300 transition-colors">
                  Cổng Tra Cứu & Tải Album Ảnh
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Locations */}
          <div>
            <h4 className="text-xs font-bold text-gold-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-gold" />
              Địa Chỉ Studio
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Trụ sở Sài Gòn (Flagship):</p>
                  <p>28 Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Atelier Hà Nội:</p>
                  <p>12 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-gold-300/80">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Nhận dự án chụp toàn cầu (Tokyo • Paris • Milan)</span>
              </div>
            </div>
          </div>

          {/* Concierge & Working hours */}
          <div>
            <h4 className="text-xs font-bold text-gold-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-gold" />
              Dịch Vụ Concierge 24/7
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Bộ phận Chăm sóc Khách hàng VIP luôn túc trực để hỗ trợ tư vấn moodboard, concept và lịch trình chụp ảnh theo yêu cầu riêng.
            </p>
            <div className="p-3.5 rounded-2xl bg-obsidian-900 border border-gold-400/20 text-xs">
              <p className="text-gray-400">Hotline Đặt Lịch VIP:</p>
              <p className="text-base font-black font-mono text-gold-300 mt-0.5">(+84) 909 888 999</p>
              <p className="text-[10px] text-gray-500 mt-1">Giờ mở cửa: 08:30 – 21:00 hàng ngày</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} DINH. STUDIO. Toàn bộ bản quyền hình ảnh được bảo hộ.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <span>Chính Sách Bảo Mật</span>
            <span>•</span>
            <span>Điều Khoản Dịch Vụ</span>
            <span>•</span>
            <span className="text-gold-300/70">Haute Photography Vietnam</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
