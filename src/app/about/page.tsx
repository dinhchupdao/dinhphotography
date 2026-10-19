'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Award, 
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  const faqs = [
    {
      q: 'Phụ phí di chuyển được tính như thế nào khi chụp ngoài TP. Hồ Chí Minh?',
      a: 'Hệ thống của DINH. STUDIO tự động tính toán phụ phí theo biểu phí niêm yết chuẩn cho từng tỉnh thành (bao gồm chi phí đi lại, vé máy bay/xe đưa đón và vận chuyển thiết bị của ekip). Chi phí này được hiển thị minh bạch 100% tại bước thanh toán /cast và cam kết không phát sinh bất kỳ khoản phí ngoài nào.',
    },
    {
      q: 'Chính sách đặt cọc và thanh toán ra sao?',
      a: 'Khách hàng có thể lựa chọn đặt cọc 30% để giữ lịch chắc chắn với photographer (70% còn lại thanh toán vào ngày chụp), hoặc thanh toán toàn bộ 100% để nhận thêm ưu đãi 05 ảnh Master Retouch và khung ảnh pha lê cao cấp.',
    },
    {
      q: 'Sau bao lâu thì tôi nhận được ảnh chụp hoàn thiện?',
      a: 'Toàn bộ file gốc sẽ được cập nhật lên hệ thống trong vòng 24 - 48 giờ sau buổi chụp. Các ảnh chọn Retouch kỹ thuật số chuyên sâu sẽ được bàn giao đầy đủ trong vòng 3 - 5 ngày làm việc qua cổng tra cứu riêng /check-photo.',
    },
    {
      q: 'Phiếu xác nhận dịch vụ có giá trị pháp lý không?',
      a: 'Có. Ngay sau khi đặt cọc thành công tại /cast, hệ thống sẽ tự động xuất Phiếu xác nhận dịch vụ chuẩn Framevis với đầy đủ Mã số thuế, Logo, Tiền tố phiếu, Chữ ký giám đốc nghệ thuật và Con dấu điện tử được lưu trữ bảo mật.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Về DINH. STUDIO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight uppercase">
          Nghệ Thuật Kể Chuyện Bằng <span className="text-gradient-gold">Ánh Sáng & Cảm Xúc</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Được thành lập từ năm 2018 bởi Giám đốc Nghệ thuật Quốc Vinh, DINH. STUDIO đã trở thành biểu tượng thị giác của nhiều bộ sưu tập thời trang, chân dung nghệ sĩ và đám cưới thượng lưu.
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-black font-serif text-white tracking-tight uppercase">
            Sứ Mệnh Kiến Tạo Di Sản Hình Ảnh
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Chúng tôi không chỉ đơn thuần bấm máy; chúng tôi kiến tạo một trải nghiệm thị giác nơi mỗi nhân vật đều trở thành nguồn cảm hứng độc bản. Với sự tỉ mỉ từ khâu chọn góc máy, điều phối ánh sáng đến công nghệ hậu kỳ quốc tế, mỗi bức ảnh là một tác phẩm trường tồn.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-obsidian-850 border border-white/10">
              <span className="text-2xl font-black font-serif text-gold-300">100%</span>
              <p className="text-xs text-gray-400 mt-1">Minh bạch biểu phí & hợp đồng</p>
            </div>
            <div className="p-4 rounded-2xl bg-obsidian-850 border border-white/10">
              <span className="text-2xl font-black font-serif text-gold-300">48H</span>
              <p className="text-xs text-gray-400 mt-1">Bàn giao file gốc độ phân giải cao</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-obsidian-900 border border-gold-400/30 shadow-2xl">
          <Image
            src="/images/hero.jpg"
            alt="Studio Atelier"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black font-serif text-white tracking-tight uppercase">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-xs text-gray-400">
            Giải đáp những thắc mắc phổ biến về quy trình đặt lịch, thanh toán và bàn giao ảnh.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-obsidian-850 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-gold-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gold-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-400/30 text-center space-y-4 shadow-gold">
        <h3 className="text-2xl sm:text-3xl font-black font-serif text-white uppercase tracking-tight">
          Sẵn Sàng Cho Khung Hình Độc Bản Của Bạn?
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
          Liên hệ ngay với bộ phận Concierge hoặc chọn nghệ sĩ đại diện để khởi tạo lịch chụp chuẩn mực.
        </p>
        <div className="pt-2">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold shadow-gold hover:opacity-95 transition-all"
          >
            <span>Đặt Lịch Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
