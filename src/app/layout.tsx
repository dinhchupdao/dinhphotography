import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "DINH. STUDIO | Nền Tảng Đặt Lịch & Tuyển Chọn Photographer Số 1",
  description: "Đặt lịch chụp ảnh cùng các nhiếp ảnh gia hàng đầu Việt Nam. Tự động tính phí di chuyển 63 tỉnh thành, đặt cọc linh hoạt và nhận ảnh online chuẩn nét.",
  keywords: ["Photographer", "Đặt lịch chụp ảnh", "Ký sự cưới", "Lookbook", "Chân dung", "Phí di chuyển", "Check ảnh online"],
  openGraph: {
    title: "DINH. STUDIO | Luxury Photography & Booking Platform",
    description: "Capturing visual poetry with top-tier Vietnamese photographers. Transparent travel fee calculation & online gallery delivery.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-brand-purple-500 selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
