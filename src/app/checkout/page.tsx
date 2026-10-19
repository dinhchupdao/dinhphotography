'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Forward /checkout to mandatory payment route /cast
    router.replace('/cast');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-center p-8">
      <div className="space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-gold-400 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-gray-400 font-mono">Đang chuyển tiếp đến trang thanh toán chính thức /cast...</p>
      </div>
    </div>
  );
}
