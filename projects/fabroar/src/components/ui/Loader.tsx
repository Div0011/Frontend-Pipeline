"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ALL_DOODLE_COMPONENTS } from "./DoodleIcons";

export default function Loader() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Animate counter from 0 to 100
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Eased progress (cubic out)
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(eased * 100);
      setCounter(currentVal);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCounter(100);
        setTimeout(() => setPhase("reveal"), 150);
        setTimeout(() => setPhase("done"), 900);
      }
    };

    const handleLoad = () => {
      requestAnimationFrame(tick);
    };

    if (document.readyState === "complete") {
      setTimeout(handleLoad, 50);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (phase === "done") return null;

  // Select 8 watermark doodles for loader animation
  const loaderDoodles = ALL_DOODLE_COMPONENTS.slice(0, 8);

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: phase === "reveal" ? "transparent" : "#0F0F0F",
        pointerEvents: phase === "reveal" ? "none" : "auto",
      }}
    >
      {/* Top curtain panel — slides up */}
      <div
        className="absolute inset-x-0 top-0 bg-[#0F0F0F] border-b border-[#D4654A]/30 transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          height: "50%",
          transform: phase === "reveal" ? "translateY(-100%)" : "translateY(0)",
          transitionDuration: phase === "reveal" ? "0.75s" : "0s",
        }}
      />

      {/* Bottom curtain panel — slides down */}
      <div
        className="absolute inset-x-0 bottom-0 bg-[#0F0F0F] border-t border-[#D4654A]/30 transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          height: "50%",
          transform: phase === "reveal" ? "translateY(100%)" : "translateY(0)",
          transitionDuration: phase === "reveal" ? "0.75s" : "0s",
          transitionDelay: phase === "reveal" ? "0.04s" : "0s",
        }}
      />

      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(212,101,74,0.25) 0%, transparent 70%)",
          opacity: phase === "reveal" ? 0 : 1,
        }}
      />

      {/* Floating doodle watermark icons */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300"
        style={{ opacity: phase === "reveal" ? 0 : 0.35 }}
      >
        {loaderDoodles.map((DoodleComp, idx) => {
          const top = 12 + (idx * 11) % 75;
          const left = 8 + (idx * 23) % 84;
          const size = 48 + (idx * 7) % 36;
          const rot = (idx * 37) % 70 - 35;
          const colors = ["#F5F0E8", "#C4A77D", "#E07A60", "#D4654A"];
          return (
            <div
              key={idx}
              className="absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                transform: `rotate(${rot}deg)`,
                color: colors[idx % colors.length],
              }}
            >
              <DoodleComp size={size} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      {/* Center Loader Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        style={{
          opacity: phase === "reveal" ? 0 : 1,
          transform: phase === "reveal" ? "scale(0.95)" : "scale(1)",
          transition: "all 0.3s ease-out",
        }}
      >
        {/* Brand Name Text (Logo image removed) */}
        <span className="font-display text-4xl sm:text-6xl font-bold tracking-wider text-[#F5F0E8] uppercase">
          FABROAR
        </span>

        {/* Horizontal progress bar + counter */}
        <div className="flex items-center gap-4 w-64 sm:w-72 mt-2">
          {/* Progress track */}
          <div className="flex-1 h-1 bg-[#D4654A]/25 rounded-full overflow-hidden relative">
            <div
              className="absolute inset-y-0 left-0 bg-[#D4654A] shadow-sm rounded-full"
              style={{ width: `${counter}%`, transition: "width 16ms linear" }}
            />
          </div>
          {/* Digital Counter */}
          <span className="font-mono text-xs font-bold text-[#D4654A] tabular-nums w-9 text-right">
            {counter}%
          </span>
        </div>

        {/* Tagline */}
        <p className="font-ui text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C4A77D] font-medium mt-1">
          FABROAR • GRAPHIC TEES
        </p>
      </div>
    </div>
  );
}
