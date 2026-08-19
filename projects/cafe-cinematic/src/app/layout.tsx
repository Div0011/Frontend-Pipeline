import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { Preloader } from '@/components/ui/Preloader';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { LenisProvider } from '@/components/ui/LenisProvider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#2A1A12',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'CAFE COFFEE — Artisanal Roastery & Hearth Bakery',
  description:
    'A peaceful 2D aesthetic café in Soho, NYC. Hand-poured single origins, warm morning bakes, and slow rituals.',
  keywords: [
    'CAFE COFFEE',
    'Soho NYC Cafe',
    'Artisanal Coffee & Bakery',
    'Basque Cheesecake NYC',
    'Specialty Coffee Roastery',
    '2D Animated Cafe Experience',
  ],
  openGraph: {
    title: 'CAFE COFFEE — Artisanal Roastery & Bakery',
    description:
      'Where Every Cup Tells a Story. Single-origin hand pours and dawn oven bakes in a cozy 2D aesthetic salon.',
    type: 'website',
    locale: 'en_US',
    siteName: 'CAFE COFFEE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-cafe-bg text-cafe-text antialiased selection:bg-cafe-accent selection:text-cafe-dark">
        <LenisProvider>
          <Preloader />
          <CustomCursor />
          <ScrollReveal>
            {children}
          </ScrollReveal>
        </LenisProvider>
      </body>
    </html>
  );
}
