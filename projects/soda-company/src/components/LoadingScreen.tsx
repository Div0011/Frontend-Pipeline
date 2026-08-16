"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import BlurText from "@/components/reactbits/BlurText";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const leftShutterRef = useRef<HTMLDivElement>(null);
  const rightShutterRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const hasTriggered = useRef(false);

  const triggerReveal = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    const tl = gsap.timeline({ onComplete: () => onComplete() });

    tl.to(centerCardRef.current, {
      scale: 0.85,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    })
      .to(
        leftShutterRef.current,
        { xPercent: -102, duration: 0.65, ease: "power4.inOut" },
        "-=0.2"
      )
      .to(
        rightShutterRef.current,
        { xPercent: 102, duration: 0.65, ease: "power4.inOut" },
        "<"
      );
  }, [onComplete]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Accelerate to ~85% quickly, then slow down to simulate waiting for assets
      const increment = current < 70 ? Math.random() * 5 + 2 : Math.random() * 1.5 + 0.3;
      current += increment;

      if (current >= 90) {
        current = 90;
        clearInterval(interval);
        setProgress(90);

        // Hold at 90% for 500ms, then snap to 100 and reveal
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => triggerReveal(), 350);
        }, 500);
        return;
      }
      setProgress(current);
    }, 55);

    return () => clearInterval(interval);
  }, [triggerReveal]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden">
      {/* Left Shutter */}
      <div
        ref={leftShutterRef}
        className="absolute top-0 left-0 w-1/2 h-full z-20 bg-gradient-to-br from-[#1b0a2a] via-[#0e0417] to-[#050508]"
      />
      {/* Right Shutter */}
      <div
        ref={rightShutterRef}
        className="absolute top-0 right-0 w-1/2 h-full z-20 bg-gradient-to-bl from-[#1b0a2a] via-[#0e0417] to-[#050508]"
      />

      {/* Glowing backdrop */}
      <div
        className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-orange-500/25 blur-3xl animate-pulse" />
      </div>

      {/* Central HUD */}
      <div
        ref={centerCardRef}
        className="relative z-40 flex flex-col items-center text-center px-8 max-w-lg w-full"
      >
        <BlurText
          text="AURA"
          delay={200}
          animateBy="letters"
          direction="bottom"
          className="font-display text-[clamp(4.5rem,14vw,10rem)] font-extrabold uppercase leading-[0.85] tracking-[0.2em] text-white flex-nowrap whitespace-nowrap"
        />

        {/* Progress Bar */}
        <div className="w-64 md:w-80 h-[2px] bg-white/10 mt-12 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: "white",
              boxShadow: "0 0 12px 2px rgba(255,255,255,0.7)",
            }}
          />
        </div>

        <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
