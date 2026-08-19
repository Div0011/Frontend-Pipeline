"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import AudioController from "@/components/AudioController";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import IntroLoader from "@/components/IntroLoader";

import InteractiveTextureBackground from "@/components/cinematic/InteractiveTextureBackground";
import AuthorHeroSection from "@/components/sections/AuthorHeroSection";
import AuthorJourneySection from "@/components/sections/AuthorJourneySection";
import PublishedWorksSection from "@/components/sections/PublishedWorksSection";
import CraftPillarsSection from "@/components/sections/CraftPillarsSection";
import AudioNarrationsSection from "@/components/sections/AudioNarrationsSection";
import AuthorContactSection from "@/components/sections/AuthorContactSection";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <LenisProvider>
      {/* ── Fixed Intro splash overlay ── */}
      {!introComplete && (
        <IntroLoader onComplete={() => setIntroComplete(true)} />
      )}

      {/* Interactive GPU Textured Noise Background (Responsive to Cursor) */}
      <InteractiveTextureBackground />

      <div
        className={
          introComplete
            ? "relative z-10 opacity-100 transition-opacity duration-1000 text-[#F8F6F3]"
            : "relative z-10 opacity-0 pointer-events-none max-h-screen overflow-hidden"
        }
      >
        {/* Global cinematic overlays */}
        <FilmGrain />
        {introComplete && <CustomCursor />}
        <AudioController />

        {/* Navigation */}
        <Nav />

        {/* Storytelling Portfolio Sections */}
        <AuthorHeroSection />

        <div id="journey">
          <AuthorJourneySection />
        </div>

        <div id="works">
          <PublishedWorksSection />
        </div>

        <div id="craft">
          <CraftPillarsSection />
        </div>

        <div id="audio">
          <AudioNarrationsSection />
        </div>

        <div id="contact">
          <AuthorContactSection />
        </div>

        <Footer />
      </div>
    </LenisProvider>
  );
}
