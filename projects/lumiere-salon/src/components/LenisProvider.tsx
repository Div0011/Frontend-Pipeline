"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Shared scroll progress singleton — CameraRig reads from this
// so 3D camera and DOM text are ALWAYS in sync (no drift)
export const lenisScrollRef = { current: 0, lenis: null as Lenis | null };

const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null });
export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,          // atmospheric, cinematic feel per spec
      smoothWheel: true,
      touchMultiplier: 1.5,
      // Note: syncTouch only in newer Lenis; we use touchMultiplier
    });

    lenisRef.current = lenis;
    lenisScrollRef.lenis = lenis;

    // Single scroll-progress source of truth — GSAP, R3F, DOM all read this
    lenis.on("scroll", ({ progress }: { progress: number }) => {
      lenisScrollRef.current = progress;
      ScrollTrigger.update();
    });

    // Tick Lenis via GSAP ticker (critical for sync)
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisScrollRef.lenis = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
