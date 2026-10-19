'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  Download, 
  Heart, 
  Calendar, 
  MapPin, 
  User, 
  Camera, 
  Sparkles, 
  AlertCircle, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileCheck
} from 'lucide-react';

export default function CheckPhotoPage() {
  const { t, galleries, toggleFavoritePhoto } = useApp();

  const [searchCode, setSearchCode] = useState('DINH-8821');
  const [activeGalleryCode, setActiveGalleryCode] = useState<string>('DINH-8821');
  const [searchError, setSearchError] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const currentGallery = galleries[activeGalleryCode.trim().toUpperCase()];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = searchCode.trim().toUpperCase();
    if (!formatted) return;

    if (galleries[formatted]) {
      setActiveGalleryCode(formatted);
      setSearchError('');
      setCategoryFilter('all');
    } else {
      setSearchError('Không tìm thấy album tương ứng với mã booking này. Vui lòng kiểm tra lại mã trên Phiếu xác nhận dịch vụ.');
    }
  };

  const handleQuickCode = (code: string) => {
    setSearchCode(code);
    setActiveGalleryCode(code);
    setSearchError('');
    setCategoryFilter('all');
  };

  const filteredPhotos = currentGallery?.photos.filter((p) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'favorite') return p.isFavorite;
    return p.category === categoryFilter;
  }) || [];

  const favoriteCount = currentGallery?.photos.filter(p => p.isFavorite).length || 0;

  const handleDownloadSingle = (photoTitle: string) => {
    setDownloadSuccessToast(`Đang tải ảnh chất lượng gốc: "${photoTitle}" (Full Resolution 48MP)`);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  const handleDownloadAll = () => {
    setDownloadSuccessToast(`Đang tạo tệp nén ZIP cho toàn bộ ${currentGallery?.totalPhotos || 0} ảnh chuẩn Print Color của bạn...`);
    setTimeout(() => setDownloadSuccessToast(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Client Gallery Concierge</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
          Cổng Tra Cứu & <span className="text-gradient-gold">Tải Album Ảnh</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Nhập mã booking hoặc số phiếu xác nhận để xem trước toàn bộ file ảnh gốc và file Retouch độ phân giải cao độc bản.
        </p>
      </div>

      {/* Booking Code Search Form */}
      <div className="max-w-2xl mx-auto bg-obsidian-850 p-6 sm:p-7 rounded-3xl border border-white/10 shadow-dark space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gold-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Nhập mã booking (VD: DINH-8821, DINH-9043...)"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-obsidian-900 border border-white/10 text-white font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-gold-400/50"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold hover:opacity-95 shadow-gold transition-all shrink-0"
          >
            Tra Cứu Album
          </button>
        </form>

        {/* Demo Quick Codes */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-400">
          <span>Mã mẫu kiểm tra nhanh:</span>
          {['DINH-8821', 'DINH-9043'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => handleQuickCode(code)}
              className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-white/10 hover:border-gold-400/30 font-mono text-gold-300 text-[11px]"
            >
              {code}
            </button>
          ))}
        </div>

        {searchError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* Download Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-obsidian-900 border border-gold-400/50 shadow-gold text-white text-xs flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-gold-400 text-black flex items-center justify-center font-bold">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <p className="font-medium">{downloadSuccessToast}</p>
        </div>
      )}

      {/* Current Gallery Display */}
      {currentGallery ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Gallery Info Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-850 border border-white/10 shadow-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Đã Hoàn Thiện & Sẵn Sàng Bàn Giao</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                Bộ Ảnh: {currentGallery.clientName}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  Photographer: <strong className="text-white">{currentGallery.photographerName}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  Ngày chụp: {currentGallery.shootDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  {currentGallery.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDownloadAll}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold text-black uppercase tracking-wider bg-gradient-gold hover:opacity-95 shadow-gold transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Tải Trọn Bộ Album ({currentGallery.totalPhotos} Ảnh)</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs & Favorites Counter */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', label: `Tất Cả (${currentGallery.photos.length})` },
                { id: 'favorite', label: `Yêu Thích (${favoriteCount})`, icon: Heart },
                { id: 'Highlights', label: 'Điểm Nhấn (Highlights)' },
                { id: 'Portrait', label: 'Chân Dung (Portrait)' },
                { id: 'Editorial', label: 'Editorial Retouch' },
              ].map((tab) => {
                const isSelected = categoryFilter === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategoryFilter(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-gold text-black shadow-gold'
                        : 'bg-obsidian-850 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {Icon && <Icon className={`w-3.5 h-3.5 ${isSelected ? 'fill-black' : 'text-gold-400'}`} />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs text-gray-400">
              Nhấp vào biểu tượng trái tim để đánh dấu những bức ảnh ưng ý nhất gửi về Studio retouch thêm.
            </span>
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-obsidian-900 border border-white/10 hover:border-gold-400/50 shadow-dark hover:shadow-gold transition-all duration-300"
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
                  onClick={() => setLightboxPhotoIndex(index)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-70 group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* Top Actions: Favorite Heart & Lightbox Trigger */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleFavoritePhoto(currentGallery.bookingCode, photo.id)}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                      photo.isFavorite
                        ? 'bg-rose-500 text-white'
                        : 'bg-black/50 text-white hover:text-rose-400'
                    }`}
                    title="Đánh dấu yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${photo.isFavorite ? 'fill-white' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setLightboxPhotoIndex(index)}
                    className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
                    title="Phóng to xem nét"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Details & Download Button */}
                <div className="absolute bottom-4 inset-x-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gold-400/20 text-gold-300 uppercase">
                      {photo.category}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate mt-1">
                      {photo.title}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(photo.title)}
                    className="p-2.5 rounded-xl bg-obsidian-800 hover:bg-gold-400 hover:text-black text-gray-300 transition-colors shadow-sm shrink-0"
                    title="Tải ảnh gốc 48MP"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-obsidian-850 rounded-3xl border border-white/10 space-y-3">
          <AlertCircle className="w-10 h-10 text-gold-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Chưa Chọn Hoặc Không Tìm Thấy Album</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Vui lòng nhập đúng mã booking trên Phiếu xác nhận của bạn hoặc bấm vào mã mẫu ở trên.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxPhotoIndex !== null && filteredPhotos[lightboxPhotoIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in">
          <button
            onClick={() => setLightboxPhotoIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-obsidian-800 text-gray-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Photo */}
          {lightboxPhotoIndex > 0 && (
            <button
              onClick={() => setLightboxPhotoIndex(lightboxPhotoIndex - 1)}
              className="absolute left-6 p-3 rounded-full bg-obsidian-800/80 text-white hover:bg-gold-400 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Photo */}
          {lightboxPhotoIndex < filteredPhotos.length - 1 && (
            <button
              onClick={() => setLightboxPhotoIndex(lightboxPhotoIndex + 1)}
              className="absolute right-6 p-3 rounded-full bg-obsidian-800/80 text-white hover:bg-gold-400 hover:text-black transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center">
            <div className="relative w-[900px] max-w-full h-[600px] max-h-[70vh] rounded-2xl overflow-hidden bg-black border border-gold-400/30 shadow-2xl">
              <Image
                src={filteredPhotos[lightboxPhotoIndex].highResUrl || filteredPhotos[lightboxPhotoIndex].url}
                alt={filteredPhotos[lightboxPhotoIndex].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 flex items-center justify-between w-full text-xs">
              <div>
                <h4 className="font-bold text-white text-sm">
                  {filteredPhotos[lightboxPhotoIndex].title}
                </h4>
                <p className="text-gold-300">
                  {filteredPhotos[lightboxPhotoIndex].category} • {lightboxPhotoIndex + 1}/{filteredPhotos.length}
                </p>
              </div>
              <button
                onClick={() => handleDownloadSingle(filteredPhotos[lightboxPhotoIndex].title)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-gold shadow-gold flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Ảnh Gốc Này</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
