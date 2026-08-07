import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'ShiftEase by Sheetal — Packers & Movers Directory',
  description: 'Find verified packers and movers in your city. Get instant quotes, compare services, and book with confidence.',
  keywords: ['packers and movers', 'shiftEase', 'Sheetal', 'moving company', 'packing service', 'India relocation'],
  openGraph: {
    title: 'ShiftEase by Sheetal — Packers & Movers Directory',
    description: 'Find verified packers and movers in your city. Get instant quotes, compare services, and book with confidence.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'ShiftEase by Sheetal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShiftEase by Sheetal — Packers & Movers Directory',
    description: 'Find verified packers and movers in your city. Get instant quotes, compare services, and book with confidence.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
