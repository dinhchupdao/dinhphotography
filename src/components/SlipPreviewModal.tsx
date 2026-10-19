'use client';

import React from 'react';
import { Booking } from '@/types';
import { ConfirmationSlip } from './ConfirmationSlip';
import { X } from 'lucide-react';

interface SlipPreviewModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SlipPreviewModal: React.FC<SlipPreviewModalProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-obsidian-900 border border-gold-400/30 p-4 sm:p-6 shadow-2xl">
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-obsidian-700/80 text-gray-300 hover:text-white hover:bg-obsidian-600 border border-white/10 transition-colors"
          aria-label="Đóng xem phiếu"
        >
          <X className="w-5 h-5" />
        </button>

        <ConfirmationSlip 
          booking={booking} 
          onClose={onClose}
          showActions={true}
        />
      </div>
    </div>
  );
};
