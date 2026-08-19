'use client';

import React, { useEffect, useState } from 'react';
import { Cormorant_Garamond, DM_Mono, Outfit } from 'next/font/google';
import '../styles/globals.css';
import { CartProvider } from '../lib/cart-context';
import { CustomCursor } from '../components/shared/CustomCursor';
import { FilmGrain } from '../components/shared/FilmGrain';
import { SkipToContent } from '../components/shared/SkipToContent';
import { ChapterAnnouncer } from '../components/shared/ChapterAnnouncer';
import { WebVitalsReporter } from '../components/shared/WebVitalsReporter';
import { CartDrawer } from '../components/shared/CartDrawer';
import { QuickViewModal } from '../components/shared/QuickViewModal';
import { ComparisonModal } from '../components/shared/ComparisonModal';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  preload: true,
});

const ui = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-ui',
  preload: true,
});

const body = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-body',
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lenis: any = null;
    let rafId: number;

    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      setScrollProgress(Math.min(progress, 1));
    };

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');

        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });

        lenis.on('scroll', () => {
          ScrollTrigger.update();
          onScroll();
        });

        rafId = requestAnimationFrame(function loop(time) {
          if (lenis) lenis.raf(time);
          requestAnimationFrame(loop);
        });
      } catch {
        window.addEventListener('scroll', onScroll);
      }
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <html lang="en" className={`${display.variable} ${ui.variable} ${body.variable}`}>
      <head>
        <title>Superfan — Cinematic BLDC Ceiling Fan Redesign</title>
        <meta name="description" content="India's First BLDC Ceiling Fan — Architectural luxury, 35W energy efficiency, and offline voice intelligence." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CartProvider>
          <SkipToContent />
          <ErrorBoundary><CustomCursor /></ErrorBoundary>
          <ErrorBoundary><WebVitalsReporter /></ErrorBoundary>
          <ErrorBoundary><FilmGrain /></ErrorBoundary>
          <ErrorBoundary><ChapterAnnouncer /></ErrorBoundary>
          {/* Interactive scroll progress bar */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '2px',
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, rgba(0,212,255,0.8), rgba(0,82,204,0.8))',
              zIndex: 99999,
              transition: 'width 0.05s ease-out',
            }}
            aria-hidden="true"
          />
          <Navigation />
          {children}
          <CartDrawer />
          <QuickViewModal />
          <ComparisonModal />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
