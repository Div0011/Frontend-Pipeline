import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUMIÈRE — Haute Coiffure & Atelier Paris',
  description:
    'Where artistry meets intention. Paris-trained stylists, bespoke hair transformations, and a cinematic salon space in Paris 8e.',
  openGraph: {
    title: 'LUMIÈRE — Haute Coiffure Paris',
    description: 'A cinematic hair experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}


