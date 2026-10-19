'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Check, 
  Search, 
  MapPin, 
  Car, 
  ArrowRight, 
  Clock, 
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';

export default function PricingPage() {
  const { t, travelFees, formatCurrency, setActiveBookingDraft } = useApp();
  const [searchProvince, setSearchProvince] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'Miền Nam' | 'Miền Trung' | 'Miền Bắc'>('all');

  const filteredTravelFees = travelFees.filter((item) => {
    const matchesSearch = 
      !searchProvince.trim() ||
      item.province.toLowerCase().includes(searchProvince.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchProvince.toLowerCase()));

    const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const packages = [
    {
      id: 'lookbook',
      name: 'Haute Editorial & Lookbook',
      price: 15000000,
      period: 'dự án',
      popular: false,
      desc: 'Dành cho các thương hiệu thời trang cao cấp, tạp chí & nhà thiết kế thời trang.',
      features: [
        'Thời lượng chụp: 5 - 6 giờ tại Studio/Ngoại cảnh',
        'Toàn bộ file ảnh gốc JPEG độ phân giải cực cao (không giới hạn)',
        '30 ảnh Master Retouch chuẩn Vogue & Harper’s Bazaar',
        'Ekip Art Director & Lighting Specialist chuyên trách',
        'Bàn giao sau 3-5 ngày làm việc qua cổng tra cứu riêng',
      ],
      serviceType: 'Fashion & Lookbook',
    },
    {
      id: 'portrait',
      name: 'Signature Visual Portrait',
      price: 8500000,
      period: 'buổi chụp',
      popular: true,
      desc: 'Dành cho nghệ sĩ, doanh nhân và cá nhân muốn ghi dấu bản sắc độc bản.',
      features: [
        'Thời lượng: 3 giờ sáng tác ánh sáng chuyên sâu',
        '03 Concept bối cảnh & layout phong cách điện ảnh',
        'Toàn bộ file gốc độ nét cao + 15 ảnh Fine-Art Retouch',
        'Tặng 01 ảnh ép pha lê kích thước 60x90cm cao cấp',
        'Bàn giao link ảnh trong vòng 48 giờ',
      ],
      serviceType: 'Signature Portraiture',
    },
    {
      id: 'wedding',
      name: 'Cinematic Wedding Tale',
      price: 28000000,
      period: 'trọn gói ngày cưới',
      popular: false,
      desc: 'Phóng sự cưới điện ảnh, bắt trọn từng giọt nước mắt và nụ cười hạnh phúc.',
      features: [
        'Ekip 2 Photographer tác nghiệp liên tục suốt lễ & tiệc',
        'Ghi lại toàn bộ diễn biến cảm xúc chân thật, không gượng gạo',
        'Bàn giao toàn bộ 800 - 1500 file gốc màu điện ảnh',
        '60 ảnh hoàn thiện in Photobook bìa da cao cấp nhập khẩu',
        'Tự động cộng phí di chuyển ngoại tỉnh ưu đãi theo bảng giá',
      ],
      serviceType: 'Cinematic Wedding',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Haute Service Packages</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
          Bảng Giá Dịch Vụ & <span className="text-gradient-gold">Biểu Phí Minh Bạch</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Mỗi gói chụp tại DINH. STUDIO là một cam kết về chất lượng nghệ thuật, ngôn ngữ ánh sáng và quy chuẩn hậu kỳ khắt khe nhất.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
              pkg.popular
                ? 'bg-gradient-to-b from-obsidian-850 to-obsidian-900 border-2 border-gold-400 shadow-gold hover:shadow-gold-lg -translate-y-2'
                : 'bg-obsidian-850 border border-white/10 shadow-dark hover:border-gold-400/40'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-gold text-black font-black text-[10px] uppercase tracking-widest shadow-gold">
                Gói Được Ưa Chuộng Nhất
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">{pkg.name}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{pkg.desc}</p>
              </div>

              <div className="pt-2 pb-4 border-b border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-gold-300">
                    {formatCurrency(pkg.price)}
                  </span>
                  <span className="text-xs text-gray-500">/ {pkg.period}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 text-xs text-gray-300">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/booking"
                onClick={() => {
                  setActiveBookingDraft(prev => ({
                    ...prev,
                    serviceType: pkg.serviceType,
                    basePrice: pkg.price,
                  }));
                }}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-gradient-gold text-black shadow-gold hover:opacity-95'
                    : 'bg-obsidian-800 text-white hover:bg-gold-400 hover:text-black border border-white/10'
                }`}
              >
                <span>Đặt Lịch Gói Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Travel Fees Section (Phí Di Chuyển 63 Tỉnh Thành) */}
      <div className="bg-obsidian-850 p-6 sm:p-10 rounded-3xl border border-white/10 shadow-dark space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight flex items-center gap-2">
              <Car className="w-5 h-5 text-gold-400" />
              <span>Biểu Phí Di Chuyển Ngoại Tỉnh & Quốc Tế</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Phí di chuyển được Admin cấu hình chuẩn xác và tự động tích hợp vào hóa đơn tại trang thanh toán <strong>/cast</strong>.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {(['all', 'Miền Nam', 'Miền Trung', 'Miền Bắc'] as const).map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedRegion === region
                    ? 'bg-gradient-gold text-black shadow-gold'
                    : 'bg-obsidian-900 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {region === 'all' ? 'Tất Cả Vùng Miền' : region}
              </button>
            ))}
          </div>
        </div>

        {/* Search province bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchProvince}
            onChange={(e) => setSearchProvince(e.target.value)}
            placeholder="Tìm theo tên tỉnh/thành phố (VD: Đà Lạt, Nha Trang, Phú Quốc...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-obsidian-900 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50"
          />
        </div>

        {/* Travel Fee Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-obsidian-950 text-gold-300 font-bold uppercase tracking-wider text-[11px] border-b border-white/10">
                <th className="py-3 px-4">Tỉnh / Thành Phố</th>
                <th className="py-3 px-4">Khu Vực</th>
                <th className="py-3 px-4 text-right">Phụ Phí Di Chuyển</th>
                <th className="py-3 px-4">Thời Gian Di Chuyển Dự Kiến</th>
                <th className="py-3 px-4">Chính Sách & Hậu Cần</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredTravelFees.map((tf) => (
                <tr key={tf.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>{tf.province}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-obsidian-900 text-gray-400 border border-white/5">
                      {tf.region}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-gold-300 text-sm">
                    {tf.fee === 0 ? '0 ₫ (Miễn Phí)' : formatCurrency(tf.fee)}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-gold-400" />
                      {tf.estimatedHours}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 text-[11px]">
                    {tf.notes || 'Bao gồm vé xe/máy bay và vận chuyển thiết bị của ekip.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
