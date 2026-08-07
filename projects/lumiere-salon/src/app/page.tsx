"use client";

import Scene from "@/components/three/Scene";
import ChapterOverlay from "@/components/sections/ChapterOverlay";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Loader from "@/components/Loader";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AudioToggle from "@/components/ui/AudioToggle";
import { useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Cursor always rendered (hidden before load by opacity) */}
      <CustomCursor />

      {/* Grain film overlay — always present */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Cinematic loader */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Main experience — only mounted after load so Lenis + GSAP have real DOM */}
      {loaded && (
        <LenisProvider>
          <main className="relative text-white" style={{ backgroundColor: "var(--bg-color, #0a0a0a)" }}>
            {/* Fixed 3D canvas — behind everything */}
            <Scene />

            {/* Fixed UI chrome */}
            <Nav />
            <ScrollProgress />
            <AudioToggle />

            {/* Scrollable content layer */}
            <ChapterOverlay />
            <Footer />
          </main>
        </LenisProvider>
      )}
    </>
  );
}
