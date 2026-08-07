"use client";

import { useEffect, useRef, useState } from "react";

export default function CinematicReveal({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"curtain" | "gap" | "brand" | "hold" | "exit">("curtain");
  const [showContent, setShowContent] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("gap"), 400);
    const t2 = setTimeout(() => setPhase("brand"), 1200);
    const t3 = setTimeout(() => setPhase("hold"), 2800);
    const t4 = setTimeout(() => setPhase("exit"), 4000);
    const t5 = setTimeout(() => {
      setShowContent(true);
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase === "gap" && leftRef.current && rightRef.current) {
      leftRef.current.style.transform = "translateX(-100%)";
      rightRef.current.style.transform = "translateX(100%)";
    }
    if (phase === "exit" && leftRef.current && rightRef.current) {
      leftRef.current.style.transform = "translateY(-100%)";
      rightRef.current.style.transform = "translateY(-100%)";
    }
  }, [phase]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-cinema-black transition-all duration-[1500ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Curtain panels */}
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-cinema-black border-r border-cinema-gold/20 transition-transform duration-[1800ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      />
      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-cinema-black border-l border-cinema-gold/20 transition-transform duration-[1800ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      />

      {/* Brand content */}
      <div
        ref={brandRef}
        className={`relative z-10 flex flex-col items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === "brand" || phase === "hold"
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-12 scale-95"
        }`}
      >
        <div className="relative">
          <h1
            className="text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-cinema-cream text-center leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ZERZURA
          </h1>
          <div className="absolute -inset-8 bg-cinema-gold/5 blur-[60px] rounded-full" />
        </div>

        <div className="flex items-center gap-4 mt-6">
          <span className="w-8 h-[1px] bg-cinema-gold" />
          <span className="text-cinema-gold text-xs font-bold tracking-[0.4em]" style={{ fontFamily: "var(--font-display)" }}>
            [
          </span>
          <p className="text-[10px] uppercase tracking-[0.5em] text-cinema-gold/80" style={{ fontFamily: "var(--font-body)" }}>
            Studio
          </p>
          <span className="text-cinema-gold text-xs font-bold tracking-[0.4em]" style={{ fontFamily: "var(--font-display)" }}>
            ]
          </span>
          <span className="w-8 h-[1px] bg-cinema-gold" />
        </div>

        {phase === "hold" && (
          <div className="mt-10 flex items-center gap-3">
            <div className="w-12 h-[1px] bg-cinema-gold/40 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-cinema-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              Loading Experience
            </span>
            <div className="w-12 h-[1px] bg-cinema-gold/40 animate-pulse" />
          </div>
        )}
      </div>

      {/* Ambient glow behind brand */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-[2000ms] ease-out ${
          phase === "brand" || phase === "hold" ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div className="w-[500px] h-[500px] bg-cinema-gold/10 rounded-full blur-[120px]" />
        <div className="absolute w-[300px] h-[300px] bg-cinema-gold/5 rounded-full blur-[80px]" />
      </div>
    </div>
  );
}
