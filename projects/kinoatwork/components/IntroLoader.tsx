"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import GlitchText from "@/components/kokonutui/glitch-text";
import { soundEngine } from "@/lib/audio";

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Progress counter animation
    const duration = 2200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // Animate exit
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.96,
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => onCompleteRef.current(),
          });
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleEnter = () => {
    soundEngine.init();
    soundEngine.resume();
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => onCompleteRef.current(),
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#F8F6F3] overflow-hidden select-none"
    >
      {/* Background vignette & subtle gradient pulse */}
      <div className="absolute inset-0 bg-radial from-[#181614] via-[#080808] to-[#030303] opacity-80" />
      <div className="vignette-anamorphic" />

      {/* Centerpiece Branding */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <GlitchText
          text="SFUMATO"
          color="gradient-orange"
          glitchIntensity="light"
          size="2xl"
          letterSpacing={12}
        />

        <p className="mt-2 text-xs font-mono tracking-[0.35em] text-[#d4a84b] uppercase opacity-80">
          Kinoatwork Cinema Production Studio
        </p>

        {/* Progress & Countdown */}
        <div className="mt-12 flex flex-col items-center">
          <p className="font-mono text-3xl font-light tracking-[0.2em] text-white/40 tabular-nums">
            {String(progress).padStart(3, "0")} <span className="text-xs text-[#d4a84b]">%</span>
          </p>

          <div className="mt-4 w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#d4a84b] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Skip / Enter Action */}
      <button
        onClick={handleEnter}
        className="absolute bottom-10 text-[10px] font-mono tracking-[0.3em] text-white/50 hover:text-[#d4a84b] border border-white/10 hover:border-[#d4a84b] px-6 py-2.5 rounded-full transition-all duration-300 pointer-events-auto z-20 uppercase backdrop-blur-md"
      >
        [ ENTER EXPERIENCE ]
      </button>
    </div>
  );
}
