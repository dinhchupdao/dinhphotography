'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Language } from '@/types';
import { Globe, ChevronDown, MoreHorizontal } from 'lucide-react';
import { LanguageModal } from './LanguageModal';

interface QuickLangOption {
  code: Language;
  label: string;
  native: string;
  flag: string;
}

const topPopularLanguages: QuickLangOption[] = [
  { code: 'vi', label: 'Tiếng Việt', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', native: 'Français', flag: '🇫🇷' },
  { code: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find flag for current language
  const currentLang = topPopularLanguages.find(l => l.code === language) || {
    code: language,
    label: language.toUpperCase(),
    native: language === 'zh' ? '中文' : language === 'ko' ? '한국어' : language === 'de' ? 'Deutsch' : language === 'it' ? 'Italiano' : language === 'es' ? 'Español' : 'English',
    flag: language === 'zh' ? '🇨🇳' : language === 'ko' ? '🇰🇷' : language === 'de' ? '🇩🇪' : language === 'it' ? '🇮🇹' : language === 'es' ? '🇪🇸' : '🌐',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const handleOpenContinentModal = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-gray-200 bg-obsidian-800/80 hover:bg-obsidian-700/80 border border-gold-400/20 hover:border-gold-400/50 shadow-sm transition-all duration-200 backdrop-blur-md"
          aria-expanded={isOpen}
          title="Chọn ngôn ngữ"
        >
          <Globe className="w-3.5 h-3.5 text-gold-300" />
          <span className="text-sm">{currentLang.flag}</span>
          <span className="font-semibold text-white hidden sm:inline">{currentLang.native}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-gold-300/80 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl bg-obsidian-900/95 backdrop-blur-2xl shadow-2xl border border-gold-400/30 p-2 focus:outline-none transition-all animate-in fade-in zoom-in-95">
            <div className="text-[10px] font-semibold tracking-wider text-gold-400/80 uppercase px-3 py-1.5 border-b border-white/5">
              Ngôn Ngữ Phổ Biến
            </div>

            <div className="py-1 space-y-1">
              {topPopularLanguages.map((item) => {
                const isSelected = item.code === language;
                return (
                  <button
                    key={item.code}
                    onClick={() => handleSelect(item.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all duration-150 ${
                      isSelected
                        ? 'bg-gradient-gold text-black font-bold shadow-gold'
                        : 'text-gray-300 hover:text-white hover:bg-obsidian-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.flag}</span>
                      <span>{item.native}</span>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* "Other" / Continent Modal Trigger */}
            <div className="pt-1.5 border-t border-white/10 mt-1">
              <button
                type="button"
                onClick={handleOpenContinentModal}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gold-300 hover:text-gold-200 hover:bg-gold-400/10 border border-gold-400/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                  <span>Other / Xem thêm...</span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-tight text-gray-400">Toàn cầu</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Continent Language Modal */}
      <LanguageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
