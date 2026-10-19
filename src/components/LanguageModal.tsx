'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Language } from '@/types';
import { Globe, X, Search, Check, Sparkles } from 'lucide-react';

interface CountryLang {
  code: Language;
  country: string;
  languageName: string;
  native: string;
  flag: string;
  continent: 'Asia' | 'Americas' | 'Europe' | 'Oceania';
}

const worldLanguages: CountryLang[] = [
  // Châu Á
  { code: 'vi', country: 'Việt Nam', languageName: 'Tiếng Việt', native: 'Tiếng Việt', flag: '🇻🇳', continent: 'Asia' },
  { code: 'ja', country: 'Nhật Bản (Japan)', languageName: 'Japanese', native: '日本語', flag: '🇯🇵', continent: 'Asia' },
  { code: 'ko', country: 'Hàn Quốc (Korea)', languageName: 'Korean', native: '한국어', flag: '🇰🇷', continent: 'Asia' },
  { code: 'zh', country: 'Trung Quốc (China)', languageName: 'Simplified Chinese', native: '简体中文', flag: '🇨🇳', continent: 'Asia' },
  { code: 'en', country: 'Singapore', languageName: 'English (Singapore)', native: 'English', flag: '🇸🇬', continent: 'Asia' },
  { code: 'en', country: 'Thái Lan (Thailand)', languageName: 'English / Thai', native: 'ภาษาไทย', flag: '🇹🇭', continent: 'Asia' },

  // Châu Mỹ
  { code: 'en', country: 'Hoa Kỳ (United States)', languageName: 'English (US)', native: 'English (US)', flag: '🇺🇸', continent: 'Americas' },
  { code: 'en', country: 'Canada', languageName: 'English / Français', native: 'English (CA)', flag: '🇨🇦', continent: 'Americas' },
  { code: 'es', country: 'Mexico', languageName: 'Spanish (Mexico)', native: 'Español (MX)', flag: '🇲🇽', continent: 'Americas' },
  { code: 'es', country: 'Brazil', languageName: 'Português / Español', native: 'Português', flag: '🇧🇷', continent: 'Americas' },

  // Châu Âu
  { code: 'fr', country: 'Pháp (France)', languageName: 'French', native: 'Français', flag: '🇫🇷', continent: 'Europe' },
  { code: 'en', country: 'Vương quốc Anh (United Kingdom)', languageName: 'English (UK)', native: 'English (UK)', flag: '🇬🇧', continent: 'Europe' },
  { code: 'de', country: 'Đức (Germany)', languageName: 'German', native: 'Deutsch', flag: '🇩🇪', continent: 'Europe' },
  { code: 'it', country: 'Ý (Italy)', languageName: 'Italian', native: 'Italiano', flag: '🇮🇹', continent: 'Europe' },
  { code: 'es', country: 'Tây Ban Nha (Spain)', languageName: 'Spanish', native: 'Español', flag: '🇪🇸', continent: 'Europe' },

  // Châu Úc
  { code: 'en', country: 'Úc (Australia)', languageName: 'English (AU)', native: 'English (AU)', flag: '🇦🇺', continent: 'Oceania' },
  { code: 'en', country: 'New Zealand', languageName: 'English (NZ)', native: 'English (NZ)', flag: '🇳🇿', continent: 'Oceania' },
];

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');

  if (!isOpen) return null;

  const continentLabels: Record<string, string> = {
    all: 'Tất Cả Châu Lục',
    Asia: 'Châu Á (Asia)',
    Americas: 'Châu Mỹ (Americas)',
    Europe: 'Châu Âu (Europe)',
    Oceania: 'Châu Úc (Oceania)',
  };

  const filtered = worldLanguages.filter(item => {
    const matchesContinent = selectedContinent === 'all' || item.continent === selectedContinent;
    const matchesSearch = 
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.languageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.native.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesContinent && matchesSearch;
  });

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl bg-obsidian-900 border border-gold-400/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Chọn Khu Vực & Ngôn Ngữ Toàn Cầu</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 font-semibold uppercase">
                  Global Concierge
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Lựa chọn quốc gia và ngôn ngữ phù hợp để trải nghiệm dịch vụ DINH. STUDIO
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-obsidian-800 text-gray-400 hover:text-white hover:bg-obsidian-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar & Search */}
        <div className="p-6 pb-2 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên quốc gia, ngôn ngữ (VD: Mỹ, Canada, Úc, Pháp, 日本語...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-gold-400/60 transition-colors"
            />
          </div>

          {/* Continent Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(continentLabels).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedContinent(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedContinent === key
                    ? 'bg-gradient-gold text-black font-semibold shadow-gold'
                    : 'bg-obsidian-800 text-gray-400 hover:text-white hover:bg-obsidian-700 border border-white/5'
                }`}
              >
                {continentLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Countries & Languages Grid */}
        <div className="flex-1 overflow-y-auto p-6 pt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((item, index) => {
              const isCurrent = item.code === language;
              return (
                <button
                  key={`${item.country}-${index}`}
                  onClick={() => handleSelectLanguage(item.code)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                    isCurrent
                      ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                      : 'border-white/5 bg-obsidian-850/80 hover:bg-obsidian-800 hover:border-gold-400/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl flex-shrink-0">{item.flag}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.country}</p>
                      <p className="text-[11px] text-gold-300/80 truncate">{item.native}</p>
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="w-5 h-5 rounded-full bg-gold-400 text-black flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-xs">
              Không tìm thấy quốc gia hoặc ngôn ngữ phù hợp với từ khóa &ldquo;{searchTerm}&rdquo;
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-obsidian-950 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
          <span>Hệ thống tự động lưu lựa chọn ngôn ngữ cho lần truy cập tiếp theo.</span>
          <button
            onClick={onClose}
            className="text-gold-300 hover:underline"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
