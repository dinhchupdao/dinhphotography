'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clock, 
  Car,
  AlertCircle
} from 'lucide-react';

export default function BookingPage() {
  const { 
    t, 
    photographers, 
    travelFees, 
    activeBookingDraft, 
    setActiveBookingDraft, 
    getTravelFeeByProvince, 
    formatCurrency 
  } = useApp();
  
  const router = useRouter();

  // Selected State
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>(
    activeBookingDraft?.photographerId || photographers[0].id
  );
  const [servicePackage, setServicePackage] = useState<string>(
    activeBookingDraft?.serviceType || 'Signature Portraiture'
  );
  const [date, setDate] = useState<string>(activeBookingDraft?.date || '2026-11-20');
  const [timeSlot, setTimeSlot] = useState<string>(activeBookingDraft?.timeSlot || '08:00 - 11:30');
  const [guestCount, setGuestCount] = useState<number>(activeBookingDraft?.guestCount || 2);
  const [province, setProvince] = useState<string>(activeBookingDraft?.locationProvince || 'TP. Hồ Chí Minh');
  const [detailedAddress, setDetailedAddress] = useState<string>(
    activeBookingDraft?.locationAddress || 'Studio Thảo Điền, TP. Thủ Đức'
  );
  const [clientName, setClientName] = useState<string>(activeBookingDraft?.clientName || '');
  const [clientPhone, setClientPhone] = useState<string>(activeBookingDraft?.clientPhone || '');
  const [clientEmail, setClientEmail] = useState<string>(activeBookingDraft?.clientEmail || '');
  const [notes, setNotes] = useState<string>(activeBookingDraft?.notes || '');

  const [formError, setFormError] = useState<string>('');

  const selectedPhotographer = photographers.find(p => p.id === selectedPhotoId) || photographers[0];

  // Base price multiplier by service package
  const packagePriceMultiplier: Record<string, number> = {
    'Signature Portraiture': 1,
    'Fashion & Lookbook': 1.6,
    'Cinematic Wedding': 2.8,
    'Concept & Nàng Thơ': 1.1,
    'Kiến Trúc & Không Gian': 1.8,
  };

  const basePrice = Math.round(selectedPhotographer.startingPrice * (packagePriceMultiplier[servicePackage] || 1));
  const currentTravelFee = getTravelFeeByProvince(province);
  const totalAmount = basePrice + currentTravelFee;
  const depositAmount = Math.round(totalAmount * 0.3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !clientEmail.trim()) {
      setFormError('Vui lòng điền đầy đủ Họ Tên, Số Điện Thoại và Email để tiếp tục thanh toán.');
      return;
    }

    // Save to context draft
    setActiveBookingDraft({
      photographerId: selectedPhotographer.id,
      photographerName: selectedPhotographer.name,
      photographerAvatar: selectedPhotographer.avatar,
      serviceType: servicePackage,
      date,
      timeSlot,
      guestCount,
      locationProvince: province,
      locationAddress: detailedAddress,
      basePrice,
      travelFee: currentTravelFee,
      isDepositOnly: true,
      depositAmount,
      totalAmount,
      clientName,
      clientPhone,
      clientEmail,
      notes,
    });

    // MANDATORY: Redirect directly to /cast
    router.push('/cast');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quy Trình Đặt Lịch Chuẩn Mực</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
          Khởi Tạo <span className="text-gradient-gold">Tác Phẩm Nghệ Thuật</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Chọn nghệ sĩ đại diện, thời gian và địa điểm chụp. Hệ thống sẽ tự động đối soát lịch trống và tính toán phụ phí di chuyển theo biểu phí chính thức.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column (Steps) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Chọn Photographer & Gói */}
          <div className="bg-obsidian-850 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-dark space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl bg-gradient-gold text-black flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Chọn Nghệ Sĩ & Phong Cách Sáng Tác
              </h2>
            </div>

            {/* Photographer Selector Grid */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                Nhiếp Ảnh Gia Phụ Trách:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {photographers.map((p) => {
                  const isSelected = p.id === selectedPhotoId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPhotoId(p.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                          : 'border-white/5 bg-obsidian-900/60 hover:border-gold-400/30'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gold-400/30">
                        <Image src={p.avatar} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-gold-300 truncate">{p.title}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                          từ {formatCurrency(p.startingPrice)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service Package Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                Hạng Mục Dịch Vụ:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Signature Portraiture', title: 'Signature Portraiture', desc: 'Chân dung nghệ thuật đơn sắc & Haute Couture cá nhân.' },
                  { id: 'Fashion & Lookbook', title: 'Fashion & Lookbook', desc: 'Bộ sưu tập thời trang thương hiệu, catalogue & editorial.' },
                  { id: 'Cinematic Wedding', title: 'Cinematic Wedding', desc: 'Phóng sự cưới điện ảnh, ghi lại khoảnh khắc trọng đại.' },
                  { id: 'Concept & Nàng Thơ', title: 'Concept & Nàng Thơ', desc: 'Ý tưởng thơ mộng, ánh sáng tự nhiên và bối cảnh lãng mạn.' },
                ].map((pkg) => {
                  const isSelected = servicePackage === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setServicePackage(pkg.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                          : 'border-white/5 bg-obsidian-900/60 hover:border-gold-400/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">{pkg.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-gold-400" />}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{pkg.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Thời Gian & Số Lượng */}
          <div className="bg-obsidian-850 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-dark space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl bg-gradient-gold text-black flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Thời Gian & Quy Mô Buổi Chụp
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-gold-400" />
                  <span>Ngày Chụp:</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  <span>Khung Giờ:</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                >
                  <option value="06:00 - 09:30">06:00 - 09:30 (Bình Minh Vàng)</option>
                  <option value="08:00 - 11:30">08:00 - 11:30 (Sáng Tiêu Chuẩn)</option>
                  <option value="14:00 - 17:30">14:00 - 17:30 (Ánh Chiều & Hoàng Hôn)</option>
                  <option value="18:30 - 21:30">18:30 - 21:30 (Night Editorial Flash)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold-400" />
                  <span>Số Lượng Khách:</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Địa Điểm & Phí Di Chuyển Tự Động */}
          <div className="bg-obsidian-850 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-dark space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl bg-gradient-gold text-black flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Địa Điểm Chụp & Tra Cứu Phí Di Chuyển
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>Tỉnh / Thành Phố Điểm Chụp:</span>
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  >
                    {travelFees.map((tf) => (
                      <option key={tf.id} value={tf.province}>
                        {tf.province} ({tf.region}) — {tf.fee === 0 ? 'Miễn phí di chuyển' : `+${formatCurrency(tf.fee)}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-gold-400" />
                    <span>Địa Chỉ Cụ Thể (Studio / Khách Sạn / Ngoại Cảnh):</span>
                  </label>
                  <input
                    type="text"
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                    placeholder="VD: Khách sạn Park Hyatt / Đồi Chè Cầu Đất..."
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                    required
                  />
                </div>
              </div>

              {/* Dynamic Travel Fee Notice */}
              <div className="p-4 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-gold-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Phụ Phí Di Chuyển Ngoại Tỉnh ({province}):</p>
                    <p className="text-[11px] text-gray-400">
                      Bao gồm toàn bộ chi phí vận chuyển thiết bị chuyên dụng và vé di chuyển của ekip.
                    </p>
                  </div>
                </div>
                <div className="font-mono font-bold text-gold-300 text-sm shrink-0">
                  {currentTravelFee > 0 ? formatCurrency(currentTravelFee) : '0 ₫ (Miễn Phí)'}
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Thông Tin Khách Hàng */}
          <div className="bg-obsidian-850 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-dark space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl bg-gradient-gold text-black flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Thông Tin Khách Hàng Lập Phiếu Xác Nhận
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  <span>Họ và Tên Khách Hàng:</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="VD: Trần Thị Mai Anh"
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Số Điện Thoại Liên Hệ:</span>
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="VD: 0901234567"
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  <span>Email Nhận Phiếu Xác Nhận:</span>
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="VD: maianh@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300">Yêu cầu đặc biệt & Ghi chú concept:</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="VD: Cần thuê thêm makeup artist tại studio, concept váy cưới dạ hội phong cách vintage..."
                className="w-full p-4 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
              />
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Summary Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-obsidian-850 p-6 sm:p-7 rounded-3xl border border-white/10 shadow-dark space-y-5">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider pb-2 border-b border-white/10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Tóm Tắt Đặt Lịch</span>
            </h3>

            {/* Selected Photo mini preview */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-obsidian-900 border border-white/5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold-400/40 shrink-0">
                <Image src={selectedPhotographer.avatar} alt={selectedPhotographer.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{selectedPhotographer.name}</p>
                <p className="text-[10px] text-gold-300">{selectedPhotographer.title}</p>
                <p className="text-[10px] text-gray-400">{servicePackage}</p>
              </div>
            </div>

            {/* Calculation */}
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-center justify-between">
                <span>Giá gói chụp:</span>
                <span className="font-mono text-white font-semibold">{formatCurrency(basePrice)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Phí di chuyển ({province}):</span>
                <span className="font-mono text-gold-300 font-semibold">
                  {currentTravelFee > 0 ? formatCurrency(currentTravelFee) : '0 ₫'}
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="font-bold text-white">Tổng cộng:</span>
                <span className="font-black font-mono text-white text-base">{formatCurrency(totalAmount)}</span>
              </div>

              <div className="p-3 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-between">
                <span className="text-xs font-bold text-gold-300">Cọc 30% giữ lịch:</span>
                <span className="font-mono font-bold text-gold-300">{formatCurrency(depositAmount)}</span>
              </div>
            </div>

            {/* CTA Button -> Routes to /cast */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-black uppercase tracking-wider text-xs bg-gradient-gold hover:opacity-95 shadow-gold hover:shadow-gold-lg transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Tiếp Tục Đến Trang Thanh Toán (/cast)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-gray-500 text-center">
              Sau bước này, bạn sẽ được chuyển đến trang riêng <strong>/cast</strong> để lựa chọn phương thức thanh toán và nhận Phiếu xác nhận.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
