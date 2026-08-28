import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';

export const metadata: Metadata = {
  title: 'FORMA — Architecture Studio',
  description: 'A minimal, scroll-driven architecture experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-ink antialiased overflow-x-hidden font-sans">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
