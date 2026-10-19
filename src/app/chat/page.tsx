'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { 
  Send, 
  Image as ImageIcon, 
  Camera, 
  User, 
  Sparkles, 
  CheckCheck, 
  Paperclip, 
  MessageSquare,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export default function ChatPage() {
  const { chatMessages, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [targetContact, setTargetContact] = useState<'admin' | 'photographer'>('admin');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleSendSampleImage = () => {
    sendMessage(
      'Mình gửi tham khảo moodboard ảnh phong cách Editorial này nhé studio:', 
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Realtime Direct Concierge</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
          Hộp Thư Trực Tuyến <span className="text-gradient-gold">1-1</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Trò chuyện trực tiếp cùng Bộ phận Tư Vấn Khách Hàng VIP hoặc Nhiếp ảnh gia thực hiện để chuẩn bị concept chu đáo nhất.
        </p>
      </div>

      {/* Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden bg-obsidian-850 border border-white/10 shadow-dark min-h-[620px]">
        {/* Left Sidebar: Select Recipient */}
        <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-white/10 bg-obsidian-900/60 space-y-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
            Kênh Liên Lạc Trực Tiếp
          </div>

          <div className="space-y-2">
            {/* Option 1: Tư vấn viên Studio */}
            <button
              type="button"
              onClick={() => setTargetContact('admin')}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                targetContact === 'admin'
                  ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                  : 'border-white/5 bg-obsidian-850 hover:bg-obsidian-800'
              }`}
            >
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-gold-400/30 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Tư Vấn Viên"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-obsidian-900" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Tư Vấn Viên DINH Studio</p>
                <p className="text-[11px] text-gold-300 truncate">Hỗ trợ lịch trình, gói chụp & hợp đồng</p>
                <span className="text-[9px] text-emerald-400 font-semibold uppercase">Đang Trực Tuyến</span>
              </div>
            </button>

            {/* Option 2: Photographer Phụ Trách */}
            <button
              type="button"
              onClick={() => setTargetContact('photographer')}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                targetContact === 'photographer'
                  ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                  : 'border-white/5 bg-obsidian-850 hover:bg-obsidian-800'
              }`}
            >
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-gold-400/30 shrink-0">
                <Image
                  src="/images/photographer.jpg"
                  alt="Photo Phụ Trách"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-obsidian-900" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Nhiếp Ảnh Gia Phụ Trách</p>
                <p className="text-[11px] text-gold-300 truncate">Tư vấn ánh sáng, trang phục & moodboard</p>
                <span className="text-[9px] text-emerald-400 font-semibold uppercase">Sẵn Sàng Trao Đổi</span>
              </div>
            </button>
          </div>

          {/* Quick FAQ / Helper */}
          <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/5 space-y-2 text-xs text-gray-400">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Gợi Ý Nội Dung Hỏi:
            </p>
            <ul className="space-y-1 text-[11px] text-gray-400">
              <li>• &ldquo;Bên mình có hỗ trợ stylist trang phục không?&rdquo;</li>
              <li>• &ldquo;Phí di chuyển đi Đà Lạt bao gồm những gì?&rdquo;</li>
              <li>• &ldquo;Thời gian nhận ảnh hoàn thiện là bao lâu?&rdquo;</li>
            </ul>
          </div>
        </div>

        {/* Right Chat Pane */}
        <div className="lg:col-span-8 flex flex-col justify-between h-[620px]">
          {/* Chat Pane Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-obsidian-900">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gold-400/40">
                <Image
                  src={
                    targetContact === 'admin'
                      ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
                      : '/images/photographer.jpg'
                  }
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  {targetContact === 'admin' ? 'Tư Vấn Viên DINH. STUDIO' : 'Nhiếp Ảnh Gia Phụ Trách'}
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sẵn sàng phản hồi trong vài phút
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:0909888999"
                className="p-2 rounded-xl bg-obsidian-800 hover:bg-gold-400 hover:text-black text-gray-300 transition-colors"
                title="Gọi hotline"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-obsidian-950/40">
            {chatMessages.map((msg) => {
              const isClient = msg.sender === 'client';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isClient ? 'justify-end' : 'justify-start'}`}
                >
                  {!isClient && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold-400/40 shrink-0">
                      <Image src={msg.avatar} alt={msg.senderName} fill className="object-cover" />
                    </div>
                  )}

                  <div className={`max-w-[78%] space-y-1.5 ${isClient ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] text-gray-500 px-1">{msg.senderName}</span>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isClient
                          ? 'bg-gradient-gold text-black font-medium shadow-gold rounded-br-none'
                          : 'bg-obsidian-800 text-gray-200 border border-white/5 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.imageUrl && (
                        <div className="relative aspect-[4/3] w-56 rounded-xl overflow-hidden mt-2 border border-black/20 shadow-sm">
                          <Image src={msg.imageUrl} alt="Đính kèm" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-gray-500 px-1 justify-end">
                      <span>{msg.timestamp}</span>
                      {isClient && <CheckCheck className="w-3 h-3 text-gold-400" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-white/10 bg-obsidian-900 space-y-2">
            {/* Quick Moodboard Preset Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSendSampleImage}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-800 hover:bg-obsidian-750 text-[10px] text-gold-300 border border-white/5 transition-colors"
              >
                <ImageIcon className="w-3 h-3" />
                <span>Gửi ảnh Moodboard mẫu</span>
              </button>
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập nội dung cần tư vấn cho buổi chụp..."
                className="flex-1 px-4 py-3 rounded-2xl bg-obsidian-850 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-400/50"
              />
              <button
                type="submit"
                className="p-3 rounded-2xl bg-gradient-gold text-black hover:opacity-95 shadow-gold transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
