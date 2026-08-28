"use client";

import { useState } from "react";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import AudioToggle from "@/components/ui/AudioToggle";
import BookingModal from "@/components/ui/BookingModal";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import HistorySection from "@/components/sections/HistorySection";
import VillasSection from "@/components/sections/VillasSection";
import VisualFinale from "@/components/sections/VisualFinale";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      <AudioToggle />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      <LenisProvider>
        <div className="relative bg-[#094067] text-[#f5f0e6] min-h-screen">
          <Nav onOpenBooking={() => setBookingOpen(true)} />

          <main>
            <Hero onOpenBooking={() => setBookingOpen(true)} />
            <HistorySection />
            <VillasSection onOpenBooking={() => setBookingOpen(true)} />
            <VisualFinale onOpenBooking={() => setBookingOpen(true)} />
          </main>

          <Footer />
        </div>
      </LenisProvider>
    </>
  );
}
