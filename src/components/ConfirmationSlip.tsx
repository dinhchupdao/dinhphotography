'use client';

import React from 'react';
import Image from 'next/image';
import { Booking, ConfirmationSlipTemplate } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Printer, 
  Download, 
  CheckCircle, 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Clock,
  ShieldCheck,
  Camera
} from 'lucide-react';

interface ConfirmationSlipProps {
  booking: Booking;
  templateOverride?: ConfirmationSlipTemplate;
  onClose?: () => void;
  showActions?: boolean;
}

export const ConfirmationSlip: React.FC<ConfirmationSlipProps> = ({
  booking,
  templateOverride,
  onClose,
  showActions = true,
}) => {
  const { slipTemplate: contextTemplate, formatCurrency } = useApp();
  const template = templateOverride || contextTemplate;

  const handlePrint = () => {
    window.print();
  };

  const remainingDue = booking.isDepositOnly 
    ? booking.totalAmount - booking.depositAmount 
    : 0;

  return (
    <div className="space-y-4">
      {/* Top Action Toolbar (Hidden in print) */}
      {showActions && (
        <div className="flex items-center justify-between bg-obsidian-850 p-4 rounded-2xl border border-gold-400/20 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider">
              Phiếu Xác Nhận Hợp Chuẩn Framevis
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-gradient-gold hover:opacity-95 shadow-gold transition-all duration-200"
            >
              <Printer className="w-4 h-4" />
              <span>In Phiếu / Lưu PDF</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 bg-obsidian-700 hover:bg-obsidian-600 transition-colors"
              >
                Đóng
              </button>
            )}
          </div>
        </div>
      )}

      {/* Printable Framevis A4 Voucher Sheet */}
      <div 
        id="printable-slip"
        className="printable-slip-wrapper bg-white text-gray-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-200 max-w-4xl mx-auto font-sans relative overflow-hidden"
      >
        {/* Luxury Gold Watermark / Seal in Background */}
        <div className="absolute right-12 top-28 opacity-[0.04] pointer-events-none select-none">
          <Camera className="w-96 h-96 text-amber-700" />
        </div>

        {/* 1. Header Section */}
        <div className="border-b-2 border-gray-900 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left: Studio Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center text-amber-400 font-serif font-black text-xl shadow-md border border-amber-500/30">
                  D
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-gray-950 uppercase">
                    {template.studioName}
                  </h1>
                  <p className="text-[11px] font-semibold tracking-wider text-amber-700 uppercase">
                    {template.tagline}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-gray-600 space-y-0.5 pt-1.5 leading-relaxed">
                <p><strong>Địa chỉ:</strong> {template.address}</p>
                <p><strong>Hotline:</strong> {template.phone} &nbsp;|&nbsp; <strong>Email:</strong> {template.email}</p>
                <p><strong>Website:</strong> {template.website} &nbsp;|&nbsp; <strong>Mã số thuế:</strong> {template.taxCode}</p>
              </div>
            </div>

            {/* Right: Slip Meta & Badge */}
            <div className="text-left sm:text-right space-y-1 sm:self-start">
              <div className="inline-block bg-gray-950 text-amber-400 font-mono font-bold text-xs px-3 py-1.5 rounded-lg border border-amber-500/40 shadow-sm">
                SỐ PHIẾU: {booking.slipNumber || `${template.slipPrefix}${booking.code}`}
              </div>
              <p className="text-[11px] text-gray-500 pt-1">
                <strong>Ngày lập:</strong> {new Date(booking.createdAt || Date.now()).toLocaleDateString('vi-VN')}
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle className="w-3 h-3" />
                <span>{booking.paymentStatus === 'fully_paid' ? 'ĐÃ THANH TOÁN 100%' : 'ĐÃ ĐẶT CỌC GIỮ LỊCH'}</span>
              </div>
            </div>
          </div>

          {/* Title Header */}
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 font-serif uppercase">
              PHIẾU XÁC NHẬN DỊCH VỤ
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-0.5">
              SERVICE CONFIRMATION ORDER & DEPOSIT VOUCHER
            </p>
          </div>
        </div>

        {/* 2. Customer & Shoot Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6 text-xs">
          {/* Customer info */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] pb-1 border-b border-gray-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-700" />
              <span>Thông Tin Khách Hàng</span>
            </h3>
            <div className="space-y-1 text-gray-700">
              <p><span className="text-gray-500 inline-block w-24">Họ và tên:</span> <strong className="text-gray-900 text-sm">{booking.clientName}</strong></p>
              <p><span className="text-gray-500 inline-block w-24">Điện thoại:</span> <strong className="font-mono text-gray-900">{booking.clientPhone}</strong></p>
              <p><span className="text-gray-500 inline-block w-24">Email:</span> {booking.clientEmail || 'Chưa cung cấp'}</p>
              <p><span className="text-gray-500 inline-block w-24">Số lượng khách:</span> {booking.guestCount || 1} người</p>
            </div>
          </div>

          {/* Shoot info */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] pb-1 border-b border-gray-200 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-amber-700" />
              <span>Chi Tiết Buổi Chụp</span>
            </h3>
            <div className="space-y-1 text-gray-700">
              <p><span className="text-gray-500 inline-block w-24">Nhiếp ảnh gia:</span> <strong className="text-amber-800">{booking.photographerName}</strong></p>
              <p><span className="text-gray-500 inline-block w-24">Ngày chụp:</span> <strong className="text-gray-900">{booking.date}</strong></p>
              <p><span className="text-gray-500 inline-block w-24">Khung giờ:</span> <strong className="text-gray-900">{booking.timeSlot}</strong></p>
              <p><span className="text-gray-500 inline-block w-24">Địa điểm:</span> {booking.locationAddress}, {booking.locationProvince}</p>
            </div>
          </div>
        </div>

        {/* 3. Service Table */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-950 text-white font-semibold">
                <th className="py-2.5 px-3 w-12 text-center">STT</th>
                <th className="py-2.5 px-3">Mô Tả Dịch Vụ & Hạng Mục</th>
                <th className="py-2.5 px-3 w-16 text-center">Số Lượng</th>
                <th className="py-2.5 px-3 w-28 text-right">Đơn Giá</th>
                <th className="py-2.5 px-3 w-32 text-right">Thành Tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {/* Main Service */}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3 px-3 text-center font-mono">01</td>
                <td className="py-3 px-3">
                  <p className="font-bold text-gray-900">{booking.serviceType}</p>
                  <p className="text-[11px] text-gray-500">
                    Gói chụp bản quyền thực hiện bởi {booking.photographerName}. Bàn giao toàn bộ ảnh gốc JPEG độ phân giải cao + Ảnh Retouch chuyên sâu theo quy chuẩn DINH. STUDIO.
                  </p>
                </td>
                <td className="py-3 px-3 text-center font-mono">01 Buổi</td>
                <td className="py-3 px-3 text-right font-mono">{formatCurrency(booking.basePrice)}</td>
                <td className="py-3 px-3 text-right font-mono font-bold">{formatCurrency(booking.basePrice)}</td>
              </tr>

              {/* Travel Surcharge */}
              <tr className="hover:bg-gray-50/50 bg-amber-50/30">
                <td className="py-3 px-3 text-center font-mono">02</td>
                <td className="py-3 px-3">
                  <p className="font-bold text-gray-900">Phụ phí di chuyển & hậu cần thiết bị</p>
                  <p className="text-[11px] text-gray-500">
                    Áp dụng cho điểm chụp tại: <strong>{booking.locationProvince}</strong> (Bao gồm chi phí vận chuyển thiết bị chuyên dụng & đi lại của ekip).
                  </p>
                </td>
                <td className="py-3 px-3 text-center font-mono">01 Lượt</td>
                <td className="py-3 px-3 text-right font-mono">
                  {booking.travelFee > 0 ? formatCurrency(booking.travelFee) : '0 ₫ (Nội thành)'}
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold">
                  {booking.travelFee > 0 ? formatCurrency(booking.travelFee) : '0 ₫'}
                </td>
              </tr>
            </tbody>
            {/* Summary Totals */}
            <tfoot className="border-t-2 border-gray-900 bg-gray-50">
              <tr>
                <td colSpan={3} rowSpan={3} className="p-4 align-top border-r border-gray-200">
                  <p className="text-[11px] font-bold uppercase text-gray-700 tracking-wider mb-1">
                    Hình thức thanh toán:
                  </p>
                  <p className="text-xs text-gray-600">
                    • Phương thức: <strong className="text-gray-900 uppercase">{booking.paymentMethod || 'Chuyển khoản VietQR'}</strong>
                  </p>
                  <p className="text-xs text-gray-600">
                    • Trạng thái cọc: <strong className="text-emerald-700 font-bold">{booking.isDepositOnly ? 'Đã cọc 30% giữ lịch' : 'Đã thanh toán 100%'}</strong>
                  </p>
                  <p className="text-[11px] text-gray-500 mt-2 italic">
                    * Khoản còn lại sẽ được tất toán trực tiếp vào ngày chụp hoặc trước khi nhận bàn giao link ảnh hoàn thiện.
                  </p>
                </td>
                <td className="py-2 px-3 text-right font-semibold text-gray-600">TỔNG PHIẾU:</td>
                <td className="py-2 px-3 text-right font-mono font-bold text-gray-900 text-sm">
                  {formatCurrency(booking.totalAmount)}
                </td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="py-2 px-3 text-right font-semibold text-emerald-800">SỐ TIỀN ĐÃ CỌC:</td>
                <td className="py-2 px-3 text-right font-mono font-black text-emerald-700 text-sm">
                  {formatCurrency(booking.depositAmount)}
                </td>
              </tr>
              <tr className="bg-amber-50/60">
                <td className="py-2.5 px-3 text-right font-bold text-amber-950">CÒN LẠI PHẢI TRẢ:</td>
                <td className="py-2.5 px-3 text-right font-mono font-black text-amber-900 text-base">
                  {formatCurrency(remainingDue)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* 4. Terms & Conditions */}
        <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-gray-600 space-y-1.5 leading-relaxed">
          <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] pb-1 border-b border-gray-200">
            Điều Khoản Dịch Vụ & Cam Kết Chất Lượng
          </h4>
          <ol className="list-decimal pl-4 space-y-1">
            {template.defaultTerms.map((term, idx) => (
              <li key={idx}>{term}</li>
            ))}
          </ol>
        </div>

        {/* 5. Signatures Section */}
        <div className="grid grid-cols-2 gap-8 pt-4 pb-2 text-center text-xs">
          {/* Client signature */}
          <div className="space-y-16">
            <div>
              <p className="font-bold text-gray-900 uppercase tracking-wider">ĐẠI DIỆN KHÁCH HÀNG</p>
              <p className="text-[11px] text-gray-500 italic">(Ký và ghi rõ họ tên)</p>
            </div>
            <div className="pt-2">
              <p className="font-bold text-gray-900 text-sm">{booking.clientName}</p>
            </div>
          </div>

          {/* Studio signature */}
          <div className="space-y-12 relative">
            <div>
              <p className="font-bold text-gray-900 uppercase tracking-wider">ĐẠI DIỆN {template.studioName}</p>
              <p className="text-[11px] text-gray-500 italic">({template.signerTitle})</p>
            </div>

            {/* Official Studio Digital Seal / Stamp */}
            <div className="absolute right-1/2 translate-x-1/2 top-10 pointer-events-none select-none">
              <div className="w-24 h-24 rounded-full border-2 border-red-600/80 p-1 rotate-[-12deg] flex items-center justify-center text-center opacity-85 shadow-sm">
                <div className="w-full h-full rounded-full border border-dashed border-red-600/80 flex flex-col items-center justify-center p-1">
                  <span className="text-[8px] font-black text-red-600 uppercase tracking-tighter">DINH. STUDIO</span>
                  <span className="text-[10px] font-black text-red-700 uppercase">ĐÃ XÁC NHẬN</span>
                  <span className="text-[7px] text-red-600 font-mono">BOOKING OK</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="font-bold text-gray-900 text-sm font-serif">{template.signerName}</p>
              <p className="text-[10px] text-amber-800 font-medium">{template.signerTitle}</p>
            </div>
          </div>
        </div>

        {/* 6. Footer Note */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400">
          <p>{template.footerNotes}</p>
          <p className="mt-0.5 font-mono">Phiếu xác nhận dịch vụ điện tử có giá trị pháp lý tương đương bản in trực tiếp.</p>
        </div>
      </div>
    </div>
  );
};
