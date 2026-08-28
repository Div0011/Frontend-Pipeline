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
      <main className="relative h-[500vh] overflow-x-hidden bg-[#060609] text-white antialiased selection:bg-[#d4ff00] selection:text-black">
        {/* Full-bleed showreel — dominant cinematic plane */}
        <div className="fixed inset-0 z-0 film-grain">
          <video
            id="bg-showreel-video"
            className="h-full w-full scale-[1.02] object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>
          <div className="cinematic-vignette absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 bg-[#060609]/25 pointer-events-none mix-blend-multiply" />
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
