'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { CookieReel } from '@/components/sections/CookieReel';
import { CoffeeSpillSection } from '@/components/sections/CoffeeSpillSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CakeReel } from '@/components/sections/CakeReel';
import { MenuSection } from '@/components/sections/MenuSection';
import { BookingFooter } from '@/components/sections/BookingFooter';
import { CookieMenuOverlay } from '@/components/sections/CookieMenuOverlay';
import { ReservationModal } from '@/components/ui/ReservationModal';

export default function Home() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCookieMenuOpen, setIsCookieMenuOpen] = useState(false);

  // After all sections mount and create their ScrollTriggers, do one final
  // refresh so GSAP recalculates every pin spacer with the full DOM in place.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <main className="relative bg-cafe-dark min-h-screen">
      {/* Fixed nav */}
      <Navigation
        onOpenCookieMenu={() => setIsCookieMenuOpen(true)}
      />

      {/* 1. Hero — coffee pour frame animation */}
      <Hero />

      {/* 2. Cookie Reel — cafe timeline / cookie cracking frames */}
      <CookieReel />

      {/* 3. Coffee Spill — scroll-scrubbed video */}
      <CoffeeSpillSection />

      {/* 4. About Us — long scroll reveal narrative */}
      <AboutSection />

      {/* 5. Cake Reel — cake baking frame animation */}
      <CakeReel />

      {/* 6. Menu — curated offerings preview */}
      <MenuSection />

      {/* 7 + 8. Booking → Footer (pinned video bg, left-aligned, scroll transition) */}
      <BookingFooter
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Overlay: Cookie Menu */}
      <CookieMenuOverlay
        isOpen={isCookieMenuOpen}
        onClose={() => setIsCookieMenuOpen(false)}
        onOpenReservation={() => {
          setIsCookieMenuOpen(false);
          setIsReservationOpen(true);
        }}
      />

      {/* Modal: Reservation */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </main>
  );
}
