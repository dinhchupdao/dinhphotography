'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Photographer } from '@/types';
import { useApp } from '@/context/AppContext';
import { Star, MapPin, Camera, Sparkles, X, ChevronRight, Award } from 'lucide-react';

interface PhotographerCardProps {
  photographer: Photographer;
}

export const PhotographerCard: React.FC<PhotographerCardProps> = ({ photographer }) => {
  const { t, formatCurrency, setActiveBookingDraft } = useApp();
  const router = useRouter();
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const handleSelectForBooking = () => {
    setActiveBookingDraft(prev => ({
      ...prev,
      photographerId: photographer.id,
      photographerName: photographer.name,
      photographerAvatar: photographer.avatar,
      basePrice: photographer.startingPrice,
    }));
    router.push('/booking');
  };

  const handleDirectDetail = () => {
    router.push(`/photographers/${photographer.id}`);
  };

  return (
    <>
      <div className="group relative bg-obsidian-850 rounded-3xl overflow-hidden border border-white/10 hover:border-gold-400/50 shadow-dark hover:shadow-gold transition-all duration-300 flex flex-col hover:-translate-y-1.5">
        {/* Cover Photo */}
        <div 
          onClick={handleDirectDetail}
          className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-900 cursor-pointer"
        >
          <Image
            src={photographer.coverImage}
            alt={photographer.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian-900/90 backdrop-blur-md text-xs font-bold text-white border border-gold-400/30 shadow-md">
            <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
            <span>{photographer.rating.toFixed(1)}</span>
            <span className="text-[10px] text-gray-400 font-normal">({photographer.reviewsCount})</span>
          </div>

          {/* Location Badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-obsidian-950/70 backdrop-blur-md text-xs text-gray-200 border border-white/10">
            <MapPin className="w-3 h-3 text-gold-400" />
            <span>{photographer.city}</span>
          </div>

          {/* Avatar and Name Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400 shadow-gold shrink-0">
              <Image
                src={photographer.avatar}
                alt={photographer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-lg text-white truncate drop-shadow-sm group-hover:text-gold-300 transition-colors">
                {photographer.name}
              </h3>
              <p className="text-xs text-gold-300/80 truncate">
                {photographer.title}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {photographer.bio}
          </p>

          {/* Style Tags */}
          <div className="flex flex-wrap gap-1.5">
            {photographer.styles.map((style) => (
              <span
                key={style}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gold-400/10 text-gold-300 border border-gold-400/20"
              >
                {style}
              </span>
            ))}
          </div>

          {/* Camera Gear Preview */}
          <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-obsidian-900 p-2.5 rounded-xl border border-white/5">
            <Camera className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">{photographer.cameraGear.join(' • ')}</span>
          </div>

          {/* Price & Actions */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-semibold">
                {t.find.priceFrom}
              </span>
              <span className="text-base font-extrabold text-gold-300 font-mono">
                {formatCurrency(photographer.startingPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPortfolioModal(true)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-obsidian-800 hover:bg-obsidian-750 hover:text-white border border-white/10 transition-colors"
              >
                {t.find.viewProfile}
              </button>
              <button
                type="button"
                onClick={handleSelectForBooking}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-gold hover:opacity-95 shadow-gold transition-all active:scale-95 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>{t.find.bookWith}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase Modal */}
      {showPortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-obsidian-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-gold-400/30">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-obsidian-950">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400 shadow-gold">
                  <Image src={photographer.avatar} alt={photographer.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{photographer.name}</h3>
                  <p className="text-xs text-gold-300 font-medium">
                    {photographer.title} • {photographer.experienceYears} năm kinh nghiệm
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPortfolioModal(false)}
                className="p-2 rounded-full hover:bg-obsidian-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Active Photo & Thumbnails */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {photographer.portfolio.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-obsidian-950 border border-white/10">
                    <Image
                      src={photographer.portfolio[activePhotoIndex].url}
                      alt={photographer.portfolio[activePhotoIndex].title}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400 text-black uppercase tracking-wider">
                          {photographer.portfolio[activePhotoIndex].category}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">
                          {photographer.portfolio[activePhotoIndex].title}
                        </h4>
                      </div>
                      {photographer.portfolio[activePhotoIndex].exif && (
                        <span className="text-xs font-mono text-gray-300 hidden sm:block bg-black/60 px-2 py-1 rounded-md border border-white/10">
                          {photographer.portfolio[activePhotoIndex].exif}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="flex gap-2.5 overflow-x-auto pb-2">
                    {photographer.portfolio.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          activePhotoIndex === idx
                            ? 'border-gold-400 scale-105 shadow-gold'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={item.url} alt={item.title} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bio & Philosophy */}
              <div className="p-4 rounded-2xl bg-obsidian-850 border border-white/5 space-y-2">
                <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider">Triết Lý Sáng Tác</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{photographer.bio}</p>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-5 border-t border-white/10 bg-obsidian-950 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Chi Phí Bắt Đầu</span>
                <span className="text-lg font-black text-gold-300 font-mono">
                  {formatCurrency(photographer.startingPrice)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPortfolioModal(false);
                    handleDirectDetail();
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white bg-obsidian-800 border border-white/10"
                >
                  Xem Trang Riêng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPortfolioModal(false);
                    handleSelectForBooking();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.find.bookWith}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
