"use client";

import { useState } from "react";
import RoyalPreloader from "@/components/ui/RoyalPreloader";
import MarqueeDivider from "@/components/ui/MarqueeDivider";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import AudioToggle from "@/components/ui/AudioToggle";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import EntranceVideoSection from "@/components/sections/EntranceVideoSection";
import SuitesShowcase from "@/components/sections/SuitesShowcase";
import PalaceExperience from "@/components/sections/PalaceExperience";
import Footer from "@/components/sections/Footer";
import BookingDrawer from "@/components/sections/BookingDrawer";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  return (
    <>
      {/* Royal Heritage Preloader Loading Screen */}
      <RoyalPreloader onComplete={() => setPreloaderFinished(true)} />

      {/* Custom Gold Ring Cursor */}
      <CustomCursor />

      {/* Film Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Royal Sitar Ambient Sound Toggle */}
      <AudioToggle />

      {/* Main Page Layout (Reveals after preloader) */}
      <LenisProvider>
        <div
          className={`relative bg-[#160306] text-[#faf0ca] min-h-screen transition-opacity duration-1000 ${
            preloaderFinished ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header Navigation */}
          <Nav onOpenBooking={() => setBookingOpen(true)} />

          <main>
            {/* Chapter 1: Hero Section — Pattern Video Background */}
            <Hero onOpenBooking={() => setBookingOpen(true)} />

            {/* Marquee Divider 1 */}
            <MarqueeDivider text="RAAJMAHAL PALACE · JAIPUR · ROYAL HERITAGE SANCTUARY · EST. 1592" />

            {/* Chapter 2: Entrance Section — Grand Double Doors Video Background */}
            <EntranceVideoSection />

            {/* Marquee Divider 2 */}
            <MarqueeDivider text="THE ROYAL SUITE COLLECTION · MAHARAJA PRESIDENTIAL SUITE · HAVELI COURTYARD" reverse />

            {/* Chapter 3: Royal Suites Showcase — Room Features */}
            <SuitesShowcase onOpenBooking={() => setBookingOpen(true)} />

            {/* Chapter 4: Palace Experience — Grand Lobby, Infinity Pool, Dusk Exterior */}
            <PalaceExperience />

            {/* Marquee Divider 3 */}
            <MarqueeDivider text="RESERVE YOUR SANCTUARY · 24/7 ROYAL BUTLER · PRIVATE HELIPAD · AMBER FORT ESTATE" />

            {/* Chapter 5: Footer Section — Pattern Video Background Returns */}
            <Footer onOpenBooking={() => setBookingOpen(true)} />
          </main>

          {/* Interactive VIP Booking Modal Drawer */}
          <BookingDrawer isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
        </div>
      </LenisProvider>
    </>
  );
}
