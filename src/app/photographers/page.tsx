'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PhotographerCard } from '@/components/PhotographerCard';
import { PhotographyStyle } from '@/types';
import { Search, Filter, SlidersHorizontal, Camera, RotateCcw, Sparkles } from 'lucide-react';

function PhotographersContent() {
  const { t, photographers } = useApp();
  const searchParams = useSearchParams();

  // URL Query defaults
  const initialStyle = searchParams.get('style') || 'all';
  const initialProvince = searchParams.get('province') || '';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle);
  const [selectedCity, setSelectedCity] = useState<string>(initialProvince);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');

  const allStyles: (PhotographyStyle | 'all')[] = [
    'all',
    'Fashion & Editorial',
    'Chân Dung Nghệ Thuật',
    'Ký Sự Cưới',
    'Concept & Nàng Thơ',
    'Đường Phố & Film',
    'Lookbook Thương Hiệu',
  ];

  // Filtering & Sorting
  const filteredPhotographers = useMemo(() => {
    return photographers
      .filter((photo) => {
        // Query match
        const matchesQuery = 
          !searchQuery.trim() ||
          photo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.cameraGear.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));

        // Style match
        const matchesStyle =
          selectedStyle === 'all' ||
          photo.styles.includes(selectedStyle as PhotographyStyle);

        // City match
        const matchesCity =
          !selectedCity ||
          photo.city.toLowerCase().includes(selectedCity.toLowerCase()) ||
          selectedCity.toLowerCase().includes(photo.city.toLowerCase());

        return matchesQuery && matchesStyle && matchesCity;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        return b.rating - a.rating;
      });
  }, [photographers, searchQuery, selectedStyle, selectedCity, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStyle('all');
    setSelectedCity('');
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Artists & Directors</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
          Tuyển Chọn <span className="text-gradient-gold">Nhiếp Ảnh Gia</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Khám phá những nghệ sĩ hình ảnh hàng đầu với phong cách thị giác độc bản, từ Haute Couture Editorial đến Ký sự cưới điện ảnh vượt thời gian.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-obsidian-850 p-5 sm:p-6 rounded-3xl border border-white/10 shadow-dark space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên photo, phong cách, thiết bị (Leica, Sony...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-obsidian-900 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-gold-400/50 transition-colors"
            />
          </div>

          {/* City / Province Filter */}
          <div className="sm:col-span-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50 transition-colors"
            >
              <option value="">Tất Cả Địa Điểm (Toàn Quốc & Quốc Tế)</option>
              <option value="Hồ Chí Minh">TP. Hồ Chí Minh (Sài Gòn)</option>
              <option value="Hà Nội">Thủ Đô Hà Nội</option>
              <option value="Đà Lạt">Đà Lạt (Lâm Đồng)</option>
              <option value="Đà Nẵng">Đà Nẵng & Hội An</option>
              <option value="Nha Trang">Nha Trang (Khánh Hòa)</option>
              <option value="Phú Quốc">Đảo Ngọc Phú Quốc</option>
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-obsidian-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50 transition-colors"
            >
              <option value="rating">Đánh Giá Cao Nhất (5.0 ★)</option>
              <option value="price-asc">Chi Phí: Tăng Dần</option>
              <option value="price-desc">Chi Phí: Giảm Dần</option>
            </select>
          </div>
        </div>

        {/* Style Chips Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1">
              Phong Cách:
            </span>
            {allStyles.map((style) => {
              const isSelected = selectedStyle === style;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-gradient-gold text-black font-bold shadow-gold'
                      : 'bg-obsidian-900 text-gray-400 hover:text-white hover:bg-obsidian-750 border border-white/5'
                  }`}
                >
                  {style === 'all' ? 'Tất Cả Phong Cách' : style}
                </button>
              );
            })}
          </div>

          {(searchQuery || selectedStyle !== 'all' || selectedCity) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors px-2 py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa Bộ Lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1">
        <span>Tìm thấy <strong>{filteredPhotographers.length}</strong> nhiếp ảnh gia phù hợp tiêu chí</span>
        <span className="text-gold-300 font-medium">Bảo chứng chất lượng bởi DINH. STUDIO</span>
      </div>

      {/* Photographers Grid */}
      {filteredPhotographers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotographers.map((photo) => (
            <PhotographerCard key={photo.id} photographer={photo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-obsidian-850 rounded-3xl border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 flex items-center justify-center mx-auto">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Chưa Tìm Thấy Nhiếp Ảnh Gia Phù Hợp</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Vui lòng thử điều chỉnh bộ lọc tìm kiếm hoặc liên hệ trực tiếp với Studio Concierge để được gợi ý nghệ sĩ độc quyền.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold"
          >
            Đặt Lại Bộ Lọc
          </button>
        </div>
      )}
    </div>
  );
}

export default function PhotographersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
      </div>
    }>
      <PhotographersContent />
    </Suspense>
  );
}
