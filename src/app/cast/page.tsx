'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PaymentMethod, Booking } from '@/types';
import confetti from 'canvas-confetti';
import { ConfirmationSlip } from '@/components/ConfirmationSlip';
import { 
  ShieldCheck, 
  Car, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  MessageSquare, 
  Download, 
  Info,
  Calendar,
  MapPin,
  Clock,
  Printer,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function CastPaymentPage() {
  const { 
    t, 
    activeBookingDraft, 
    createBooking, 
    formatCurrency,
    slipTemplate 
  } = useApp();
  const router = useRouter();

  // If no draft exists, fallback with default values
  const draft = activeBookingDraft || {
    photographerName: 'Quốc Vinh',
    photographerAvatar: '/images/photographer.jpg',
    serviceType: 'Signature Portraiture',
    date: '2026-11-20',
    timeSlot: '08:00 - 11:30',
    guestCount: 2,
    locationProvince: 'TP. Hồ Chí Minh',
    locationAddress: 'Studio Thảo Điền, TP. Thủ Đức',
    basePrice: 4500000,
    travelFee: 0,
    clientName: 'Khách Hàng',
    clientPhone: '0901234567',
    clientEmail: 'khachhang@example.com',
  };

  // State
  const [isDepositOnly, setIsDepositOnly] = useState<boolean>(true);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('vietqr');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);
  const [copiedMemo, setCopiedMemo] = useState<boolean>(false);
  const [copiedBankNo, setCopiedBankNo] = useState<boolean>(false);

  const basePrice = draft.basePrice || 4500000;
  const travelFee = draft.travelFee || 0;
  const totalAmount = basePrice + travelFee;
  const depositAmount = Math.round(totalAmount * 0.3);
  const payableNow = isDepositOnly ? depositAmount : totalAmount;
  const remainingDue = isDepositOnly ? totalAmount - depositAmount : 0;

  const tempBookingRef = `DINH${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCopyMemo = () => {
    navigator.clipboard.writeText(`${tempBookingRef} ${draft.clientPhone || '0901234567'}`);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2000);
  };

  const handleCopyBankNo = () => {
    navigator.clipboard.writeText('1038889999');
    setCopiedBankNo(true);
    setTimeout(() => setCopiedBankNo(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Create confirmed booking in state with slip number
      const newBooking = createBooking({
        clientName: draft.clientName || 'Quý Khách',
        clientPhone: draft.clientPhone || '0901234567',
        clientEmail: draft.clientEmail || 'client@example.com',
        photographerId: draft.photographerId || 'photo-1',
        photographerName: draft.photographerName || 'Quốc Vinh',
        photographerAvatar: draft.photographerAvatar || '/images/photographer.jpg',
        serviceType: draft.serviceType || 'Signature Portraiture',
        date: draft.date || '2026-11-20',
        timeSlot: draft.timeSlot || '08:00 - 11:30',
        guestCount: draft.guestCount || 2,
        locationProvince: draft.locationProvince || 'TP. Hồ Chí Minh',
        locationAddress: draft.locationAddress || 'Studio Thảo Điền',
        basePrice,
        travelFee,
        isDepositOnly,
        depositAmount,
        totalAmount,
        paymentStatus: isDepositOnly ? 'deposit_paid' : 'fully_paid',
        paymentMethod: selectedMethod,
        bookingStatus: 'confirmed',
        notes: draft.notes || '',
      });

      setIsProcessing(false);
      setCompletedBooking(newBooking);

      // Trigger Confetti celebration
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#B8860B'],
        });
      } catch (e) {
        console.warn(e);
      }
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Breadcrumb / Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Cổng Thanh Toán & Xác Nhận (/cast)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
          Hoàn Tất Đặt Lịch & <span className="text-gradient-gold">Nhận Phiếu Xác Nhận</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Biểu phí dịch vụ và phụ phí di chuyển được hệ thống tính toán minh bạch. Phiếu xác nhận tiêu chuẩn Framevis sẽ được tự động tạo ngay sau khi thanh toán.
        </p>
      </div>

      {!completedBooking ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Payment Options & Method */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Payment Structure Options (Cọc 30% vs Full 100%) */}
            <div className="bg-obsidian-850 p-6 sm:p-7 rounded-3xl border border-white/10 shadow-dark space-y-4">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Chọn Hình Thức Thanh Toán</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option Deposit 30% */}
                <button
                  type="button"
                  onClick={() => setIsDepositOnly(true)}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    isDepositOnly
                      ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                      : 'border-white/5 bg-obsidian-900/60 hover:border-gold-400/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">Đặt Cọc Giữ Lịch (30%)</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-400 text-black uppercase">
                      Khuyên Dùng
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-2">
                    Đặt cọc trước 30% để khóa lịch độc quyền của Photographer và Ekip. Khoản còn lại thanh toán vào ngày chụp.
                  </p>
                  <div className="text-base font-black text-gold-300 font-mono">
                    {formatCurrency(depositAmount)}
                  </div>
                  {isDepositOnly && (
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gold-400 text-black flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>

                {/* Option Full 100% */}
                <button
                  type="button"
                  onClick={() => setIsDepositOnly(false)}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    !isDepositOnly
                      ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                      : 'border-white/5 bg-obsidian-900/60 hover:border-gold-400/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">Thanh Toán Toàn Bộ (100%)</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white uppercase">
                      +05 Ảnh Quà Tặng
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-2">
                    Thanh toán trọn gói 100% để được ưu tiên xử lý hậu kỳ sớm nhất và tặng thêm 05 bản in ép gỗ cao cấp.
                  </p>
                  <div className="text-base font-black text-emerald-400 font-mono">
                    {formatCurrency(totalAmount)}
                  </div>
                  {!isDepositOnly && (
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gold-400 text-black flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-obsidian-850 p-6 sm:p-7 rounded-3xl border border-white/10 shadow-dark space-y-4">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gold-400" />
                <span>Phương Thức Thanh Toán</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'vietqr', label: 'VietQR Chuyển Khoản', sub: 'Tự động 24/7' },
                  { id: 'momo', label: 'Ví MoMo', sub: 'Quét mã siêu tốc' },
                  { id: 'vnpay', label: 'VNPAY-QR', sub: 'Mọi ứng dụng ngân hàng' },
                  { id: 'card', label: 'Thẻ Quốc Tế', sub: 'Visa / Mastercard' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id as PaymentMethod)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedMethod === m.id
                        ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                        : 'border-white/5 bg-obsidian-900/60 hover:border-gold-400/30'
                    }`}
                  >
                    <p className="text-xs font-bold text-white mb-0.5">{m.label}</p>
                    <p className="text-[10px] text-gray-400">{m.sub}</p>
                  </button>
                ))}
              </div>

              {/* VietQR Dynamic Code Display */}
              {selectedMethod === 'vietqr' && (
                <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-400/20 space-y-4 animate-in fade-in">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Dynamic QR Canvas Simulation */}
                    <div className="relative w-44 h-44 rounded-2xl bg-white p-2.5 flex flex-col items-center justify-center shadow-gold shrink-0">
                      <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=2|99|0909888999|DINH%20STUDIO|booking@dinhstudio.vn|0|0|${payableNow}|${tempBookingRef}%20${draft.clientPhone || '0901234567'}|transfer_myqr`}
                        alt="VietQR Mã Thanh Toán"
                        width={160}
                        height={160}
                        className="object-contain"
                        unoptimized
                      />
                      <span className="text-[9px] font-bold text-gray-800 uppercase mt-1">Quét bằng App Ngân Hàng</span>
                    </div>

                    {/* Bank Account Info */}
                    <div className="space-y-2 text-xs flex-1 w-full">
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                        <span className="text-gray-400">Ngân hàng:</span>
                        <strong className="text-white">Vietcombank (VCB)</strong>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                        <span className="text-gray-400">Số tài khoản:</span>
                        <div className="flex items-center gap-2">
                          <strong className="font-mono text-gold-300 text-sm">1038889999</strong>
                          <button
                            type="button"
                            onClick={handleCopyBankNo}
                            className="p-1 rounded bg-obsidian-800 hover:bg-obsidian-750 text-gray-300 hover:text-white"
                            title="Sao chép số tài khoản"
                          >
                            {copiedBankNo ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                        <span className="text-gray-400">Chủ tài khoản:</span>
                        <strong className="text-white uppercase">DINH STUDIO VIETNAM</strong>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                        <span className="text-gray-400">Số tiền:</span>
                        <strong className="font-mono text-emerald-400 text-sm">{formatCurrency(payableNow)}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Nội dung chuyển khoản:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-gold-300 font-bold bg-obsidian-800 px-2 py-0.5 rounded text-[11px]">
                            {tempBookingRef} {draft.clientPhone || '0901234567'}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyMemo}
                            className="p-1 rounded bg-obsidian-800 hover:bg-obsidian-750 text-gray-300 hover:text-white"
                            title="Sao chép nội dung"
                          >
                            {copiedMemo ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MoMo QR Display */}
              {selectedMethod === 'momo' && (
                <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-400/20 text-center space-y-3">
                  <p className="text-xs text-gray-300">
                    Mở ứng dụng <strong>MoMo</strong> và quét mã QR để chuyển số tiền <strong>{formatCurrency(payableNow)}</strong>.
                  </p>
                  <div className="inline-block p-3 rounded-2xl bg-white shadow-gold">
                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=2|99|0909888999|DINH%20STUDIO|booking@dinhstudio.vn|0|0|${payableNow}|${tempBookingRef}|momo_pay`}
                      alt="MoMo QR"
                      width={160}
                      height={160}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">Hệ thống sẽ ghi nhận cọc tức thì sau khi hoàn tất giao dịch.</p>
                </div>
              )}

              {/* VNPAY Display */}
              {selectedMethod === 'vnpay' && (
                <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-400/20 text-center space-y-3">
                  <p className="text-xs text-gray-300">
                    Kết nối trực tiếp cổng thanh toán bảo mật <strong>VNPAY Cổng Quốc Gia</strong>.
                  </p>
                  <div className="p-4 rounded-xl bg-obsidian-850 border border-white/5 text-xs text-gray-400 max-w-sm mx-auto">
                    Hỗ trợ quét qua hơn 40 ứng dụng ngân hàng: Vietcombank, Techcombank, BIDV, VPBank, MBBank, Agribank...
                  </div>
                </div>
              )}

              {/* International Cards Display */}
              {selectedMethod === 'card' && (
                <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-400/20 space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-400">Số Thẻ (16 chữ số):</label>
                    <input
                      type="text"
                      placeholder="4111 •••• •••• ••••"
                      className="w-full px-3 py-2 rounded-xl bg-obsidian-800 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-gray-400">Hạn Sử Dụng:</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-3 py-2 rounded-xl bg-obsidian-800 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-gold-400/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400">Mã CVC/CVV:</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-3 py-2 rounded-xl bg-obsidian-800 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-gold-400/50"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Confirm Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-obsidian-850 p-6 sm:p-7 rounded-3xl border border-white/10 shadow-dark space-y-5">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Chi Tiết Thanh Toán</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-300 font-mono border border-gold-400/20">
                  {tempBookingRef}
                </span>
              </h3>

              {/* Shoot Summary Card */}
              <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/5 space-y-2.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold-400/40 shrink-0">
                    <Image
                      src={draft.photographerAvatar || '/images/photographer.jpg'}
                      alt={draft.photographerName || 'Photographer'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{draft.serviceType}</h4>
                    <p className="text-[11px] text-gold-300">Nhiếp ảnh gia: {draft.photographerName}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1.5 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>Ngày: <strong>{draft.date}</strong> ({draft.timeSlot})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>Điểm chụp: <strong>{draft.locationProvince}</strong> ({draft.locationAddress})</span>
                  </div>
                </div>
              </div>

              {/* Itemized Calculation */}
              <div className="space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Giá gói dịch vụ chụp ảnh:</span>
                  <span className="font-mono text-white font-semibold">{formatCurrency(basePrice)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-400">Phí di chuyển ({draft.locationProvince}):</span>
                    <p className="text-[10px] text-gray-500">Bảo chứng di chuyển & thiết bị ekip</p>
                  </div>
                  <span className="font-mono text-gold-300 font-semibold">
                    {travelFee > 0 ? formatCurrency(travelFee) : '0 ₫ (Nội thành)'}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Tổng Giá Trị Buổi Chụp:</span>
                  <span className="font-black font-mono text-white text-base">{formatCurrency(totalAmount)}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-gold-400/10 border border-gold-400/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold-300">
                      {isDepositOnly ? 'Số Tiền Cần Đặt Cọc Ngay (30%):' : 'Số Tiền Thanh Toán Ngay (100%):'}
                    </span>
                    <span className="text-base font-black font-mono text-gold-300">
                      {formatCurrency(payableNow)}
                    </span>
                  </div>
                  {isDepositOnly && (
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gold-400/20">
                      <span>Còn lại thanh toán tại buổi chụp:</span>
                      <span className="font-mono text-gray-300">{formatCurrency(remainingDue)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: Confirm & Generate Slip */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmPayment}
                className="w-full py-4 rounded-2xl font-bold text-black uppercase tracking-wider text-xs bg-gradient-gold hover:opacity-95 shadow-gold hover:shadow-gold-lg transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Đang Xử Lý & Lập Phiếu Xác Nhận...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác Nhận Đã Thanh Toán & Nhận Phiếu</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-gray-500">
                🔒 Giao dịch được bảo mật bởi chuẩn thanh toán ngân hàng điện tử.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* SUCCESS STATE: Display the Framevis Service Confirmation Slip directly! */
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-400/40 text-center space-y-3 shadow-gold-lg">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white uppercase tracking-tight">
              Đặt Lịch Thành Công! Phiếu Xác Nhận Đã Được Tạo
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Cảm ơn quý khách <strong>{completedBooking.clientName}</strong>. Hệ thống đã khởi tạo thành công 
              <strong> Phiếu Xác Nhận Dịch Vụ</strong> với mã số: <span className="font-mono font-bold text-gold-300 px-2 py-0.5 rounded bg-black/60 border border-gold-400/30">{completedBooking.slipNumber}</span>.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/check-photo"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 bg-obsidian-800 hover:text-white hover:bg-obsidian-750 border border-white/10 transition-colors flex items-center gap-2"
              >
                <span>Cổng Tra Cứu Ảnh (/check-photo)</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              </Link>
              <Link
                href="/chat"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 bg-obsidian-800 hover:text-white hover:bg-obsidian-750 border border-white/10 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
                <span>Nhắn Tin Với Ekip (/chat)</span>
              </Link>
            </div>
          </div>

          {/* Render Full Framevis Confirmation Slip */}
          <div className="pt-4">
            <ConfirmationSlip 
              booking={completedBooking} 
              showActions={true} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
