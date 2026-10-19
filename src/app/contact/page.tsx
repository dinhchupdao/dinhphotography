'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  Send, 
  Check, 
  MessageSquare,
  ShieldCheck,
  Instagram,
  Award
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Fashion & Editorial');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5" />
          <span>Haute Concierge Service</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
          Liên Hệ & <span className="text-gradient-gold">Đặt Hẹn Atelier</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Hãy chia sẻ ý tưởng và concept nghệ thuật của bạn cùng chúng tôi. Bộ phận Chăm sóc Khách hàng VIP của DINH. STUDIO sẽ liên hệ trao đổi chi tiết trong vòng 2 giờ.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7 bg-obsidian-850 p-6 sm:p-10 rounded-3xl border border-white/10 shadow-dark space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-white uppercase tracking-tight">
              Gửi Thông Tin Yêu Cầu Tư Vấn
            </h2>
            <p className="text-xs text-gray-400">
              Điền các thông tin cơ bản để chuyên viên liên hệ lên kế hoạch buổi chụp độc bản.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-400 text-black flex items-center justify-center mx-auto font-bold">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-base font-bold text-white">Yêu Cầu Đã Được Gửi Thành Công!</h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto">
                Cảm ơn bạn đã tin tưởng DINH. STUDIO. Chuyên viên tư vấn và Giám đốc Nghệ thuật sẽ liên hệ lại với bạn ngay qua số điện thoại đã cung cấp.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-3 px-5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold"
              >
                Gửi Thêm Yêu Cầu Khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="font-semibold text-gray-300">Họ và Tên Khách Hàng:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nguyễn Hoàng Yến"
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    required
                  />
                </div>
                <div className="space-y-1.5 text-xs">
                  <label className="font-semibold text-gray-300">Số Điện Thoại:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0987 654 321"
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="font-semibold text-gray-300">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="VD: hoangyen@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    required
                  />
                </div>
                <div className="space-y-1.5 text-xs">
                  <label className="font-semibold text-gray-300">Gói Chụp Quan Tâm:</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  >
                    <option value="Fashion & Editorial">Haute Fashion & Editorial</option>
                    <option value="Signature Portraiture">Signature Visual Portraiture</option>
                    <option value="Cinematic Wedding">Cinematic Wedding Tale</option>
                    <option value="Lookbook Thương Hiệu">Lookbook Thương Hiệu & Catalogue</option>
                    <option value="Khác">Tư Vấn Concept Riêng</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-gray-300">Mô Tả Ý Tưởng / Ngày Dự Kiến / Địa Điểm:</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Chia sẻ thời gian dự kiến, địa điểm chụp (Sài Gòn, Đà Lạt, Hà Nội...) và phong cách bạn muốn thể hiện..."
                  className="w-full p-4 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold hover:opacity-95 shadow-gold hover:shadow-gold-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Yêu Cầu Tư Vấn</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Atelier Saigon */}
          <div className="bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Trụ Sở Sài Gòn (Flagship)
                </h3>
                <p className="text-xs text-gold-300/90 font-medium">Atelier & Retouch Lab</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  28 Thảo Điền, P. Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2 text-xs text-gray-300">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Hotline VIP: <strong>(+84) 909 888 999</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>Email: booking@dinhstudio.vn</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Giờ làm việc: 08:30 – 21:00 (Thứ 2 – Chủ Nhật)</span>
              </p>
            </div>
          </div>

          {/* Atelier Hanoi */}
          <div className="bg-obsidian-850 p-6 rounded-3xl border border-white/10 shadow-dark space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Atelier Hà Nội
                </h3>
                <p className="text-xs text-gold-300/90 font-medium">Boutique Studio & Exhibition</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  12 Tràng Tiền, Quận Hoàn Kiếm, TP. Hà Nội
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2 text-xs text-gray-300">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Hotline Hà Nội: <strong>(+84) 909 666 888</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>Hỗ trợ đón tiếp khách hẹn lịch riêng</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
