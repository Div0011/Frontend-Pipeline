"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import FullscreenMenu from "@/components/layout/FullscreenMenu";
import LoadingScreen from "@/components/sections/LoadingScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisProvider from "@/components/providers/LenisProvider";
import HeroSection from "@/components/sections/HeroSection";
import DumbbellSection from "@/components/sections/DumbbellSection";
import KettlebellSection from "@/components/sections/KettlebellSection";
import BrandStorySection from "@/components/sections/BrandStorySection";
import InteractiveFooter from "@/components/sections/InteractiveFooter";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <LenisProvider>
        <Header onToggleMenu={() => setMenuOpen(!menuOpen)} />
        <FullscreenMenu menuOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="relative">
          <HeroSection />
          <DumbbellSection />
          <KettlebellSection />
          <BrandStorySection />
          <InteractiveFooter />
        </main>
      </LenisProvider>
    </>
  );
}
