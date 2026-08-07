"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import BackgroundCanvas from "@/components/BackgroundCanvas";

const LenisProvider = dynamic(() => import("@/components/LenisProvider"), { ssr: false });
const AgencyPortfolio = dynamic(() => import("@/components/AgencyPortfolio"), { ssr: false });
const TransitionOverlay = dynamic(() => import("@/components/TransitionOverlay"), { ssr: false });

export default function Home() {
  return (
    <LenisProvider>
      <main className="relative bg-[#060609] text-white antialiased selection:bg-[#d4ff00] selection:text-black h-[500vh] overflow-x-hidden">
        {/* Persistent Video Showreel Background */}
        <div className="fixed inset-0 z-0">
          <video
            id="bg-showreel-video"
            className="h-full w-full object-cover opacity-60 filter brightness-[0.8] contrast-[1.05]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#060609]/85 via-black/25 to-[#060609]/85 pointer-events-none" />
        </div>

        <CustomCursor />
        <BackgroundCanvas />
        <Navigation />
        <AgencyPortfolio />
        <TransitionOverlay />
      </main>
    </LenisProvider>
  );
}

