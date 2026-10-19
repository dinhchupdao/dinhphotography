'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Camera, 
  MapPin, 
  Star, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Award, 
  ShieldCheck, 
  Sliders,
  X,
  Maximize2
} from 'lucide-react';

interface Props {
  id: string;
}

export default function PhotographerDetailClient({ id }: Props) {
  const router = useRouter();
  const { photographers, formatCurrency, setActiveBookingDraft } = useApp();
  
  const photographer = photographers.find(p => p.id === id) || photographers[0];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string; exif?: string; category: string } | null>(null);

  const categories = ['all', ...Array.from(new Set(photographer.portfolio.map(p => p.category)))];

  const filteredPortfolio = photographer.portfolio.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleBookNow = () => {
    setActiveBookingDraft(prev => ({
      ...prev,
      photographerId: photographer.id,
      photographerName: photographer.name,
      photographerAvatar: photographer.avatar,
      basePrice: photographer.startingPrice,
    }));
    router.push('/booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <div>
        <Link 
          href="/photographers" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gold-300 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Danh Sách Photographer</span>
        </Link>
      </div>

      {/* Hero Profile Header */}
      <div className="relative rounded-3xl overflow-hidden bg-obsidian-850 border border-white/10 shadow-2xl">
        {/* Cover backdrop */}
        <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-obsidian-950">
          <Image
            src={photographer.coverImage}
            alt={photographer.name}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
        </div>

        {/* Profile Info Bar */}
        <div className="relative p-6 sm:p-10 -mt-20 sm:-mt-24 z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-obsidian-900 shadow-gold shrink-0">
              <Image
                src={photographer.avatar}
                alt={photographer.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
                  {photographer.name}
                </h1>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>{photographer.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-gold-300">
                {photographer.title}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  {photographer.city}
                </span>
                <span>•</span>
                <span>{photographer.experienceYears} năm kinh nghiệm thực chiến</span>
                <span>•</span>
                <span>{photographer.reviewsCount} dự án & đánh giá 5 sao</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/chat"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-xs font-semibold text-white bg-obsidian-800 hover:bg-obsidian-750 border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-gold-400" />
              <span>Nhắn Tin Trực Tiếp</span>
            </Link>

            <button
              onClick={handleBookNow}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold hover:opacity-95 shadow-gold hover:shadow-gold-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Đặt Lịch Ngay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Photographer Philosophy & Equipment Rack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-850 border border-white/10 shadow-dark space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Triết Lý Nghệ Thuật & Kinh Nghiệm</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {photographer.bio}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {photographer.styles.map((style) => (
                <span
                  key={style}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gold-400/10 text-gold-300 border border-gold-400/20"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment & Starting Price */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-obsidian-850 border border-white/10 shadow-dark space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-gold-400" />
              <span>Hệ Thống Thiết Bị Chuyên Nghiệp</span>
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {photographer.cameraGear.map((gear, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-obsidian-900 border border-white/5">
                  <Check className="w-3.5 h-3.5 text-gold-400" />
                  <span>{gear}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase block">Chi Phí Bắt Đầu</span>
                <span className="text-lg font-black font-mono text-gold-300">
                  {formatCurrency(photographer.startingPrice)}
                </span>
              </div>
              <button
                onClick={handleBookNow}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold"
              >
                Đặt Lịch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase Grid with Filter */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight uppercase">
              Bộ Sưu Tập Tác Phẩm Nổi Bật (Portfolio)
            </h2>
            <p className="text-xs text-gray-400">
              Những khung hình tuyển chọn ghi dấu ấn phong cách của {photographer.name}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-gold text-black shadow-gold'
                    : 'bg-obsidian-850 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {cat === 'all' ? 'Tất Cả Tác Phẩm' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-obsidian-900 border border-white/10 hover:border-gold-400/50 shadow-dark hover:shadow-gold transition-all duration-300 cursor-pointer"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-900/80 backdrop-blur-md text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity shadow-gold">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gold-400/20 text-gold-300 border border-gold-400/30 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-gold-200 transition-colors">
                  {item.title}
                </h3>
                {item.exif && (
                  <p className="text-[10px] text-gray-400 font-mono">
                    {item.exif}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-obsidian-800 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-full max-h-[75vh] w-[900px] h-[600px] rounded-2xl overflow-hidden bg-black shadow-2xl border border-gold-400/30">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center space-y-1">
              <h4 className="text-base font-bold text-white">{selectedPhoto.title}</h4>
              <p className="text-xs text-gold-300">{selectedPhoto.category}</p>
              {selectedPhoto.exif && (
                <p className="text-[11px] font-mono text-gray-400">{selectedPhoto.exif}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
