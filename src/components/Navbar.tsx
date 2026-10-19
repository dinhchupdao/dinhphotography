'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  Camera, 
  Search, 
  Calendar, 
  Image as ImageIcon, 
  MessageSquare, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t } = useApp();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // PUBLIC NAVIGATION: Strictly NO "Admin" text or link on public menu/taskbar!
  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/photographers', label: t.nav.findPhoto, icon: Search },
    { href: '/booking', label: t.nav.booking, icon: Calendar },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/check-photo', label: t.nav.checkPhoto, icon: ImageIcon },
    { href: '/chat', label: t.nav.chat, icon: MessageSquare, badge: 'Live' },
    { href: '/contact', label: t.nav.about || 'Liên Hệ', icon: PhoneCall },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-obsidian-950/90 backdrop-blur-2xl shadow-dark border-b border-gold-400/20 py-3'
          : 'bg-obsidian-950/60 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Luxury Gold Monogram */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-obsidian-900 border border-gold-400/40 flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform duration-200">
              <Camera className="w-5 h-5 text-gold-300 group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-serif font-black text-xl tracking-tight text-white">
                <span>DINH</span>
                <span className="text-gold-400 text-2xl leading-none">.</span>
                <span className="text-[10px] font-sans uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-md bg-gold-400/10 text-gold-300 border border-gold-400/30">
                  STUDIO
                </span>
              </div>
              <span className="text-[9px] text-gray-400 font-sans tracking-widest uppercase -mt-0.5 hidden sm:block">
                Haute Visual Poetry & Booking
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
                    isActive
                      ? 'text-gold-300 bg-gold-400/10 font-bold border border-gold-400/30 shadow-gold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-400' : 'text-gray-400'}`} />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-gradient-gold text-black animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Multi-language Switcher */}
            <LanguageSwitcher />

            {/* CTA Button */}
            <Link
              href="/booking"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-gold hover:opacity-95 shadow-gold hover:shadow-gold-lg transition-all duration-200 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.bookNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-obsidian-800 border border-gold-400/20 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gold-300" /> : <Menu className="w-6 h-6 text-gold-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-obsidian-950/95 backdrop-blur-2xl border-b border-gold-400/20 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-3">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-gold-400/15 text-gold-300 border border-gold-400/30'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-4 h-4 text-gold-400" />}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-gold text-black">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-gold shadow-gold"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.nav.bookNow}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
