"use client";

import React, { useState } from "react";
import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 248;
const BURGER_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/burger/frame_${String(i).padStart(6, "0")}.webp`
);

function getStage(progress: number): 1 | 2 | 3 {
  if (progress < 0.32) return 1;
  if (progress < 0.68) return 2;
  return 3;
}

export default function CinematicHero() {
  const [progress, setProgress] = useState(0);
  const stage = getStage(progress);
  const currentFrame = Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1);

  return (
    <CanvasScrubber
      frames={BURGER_FRAMES}
      scrollDistance="+=350%"
      onProgress={setProgress}
      overlayGradient={false}
      preloadCount={60}
    >
      <div data-image-overlay className="h-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 relative select-none">
        
        {/* ── Stage 1: Hero Reveal (0–32% Scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(-30px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="max-w-4xl space-y-6">
            {/* Live Status Pill */}
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#C68A14]/30 backdrop-blur-xl w-fit shadow-md">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#C68A14]" />
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-black">
                1926 Texas Kum-Bak Burger Legend · Austin, TX
              </span>
            </div>

            <h1 className="type-display text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] text-[#C68A14] leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              DIRTY MARTIN&apos;S
            </h1>

            <div className="pt-2 flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
              <Link
                href="/menu"
                className="px-8 py-4 rounded-full bg-[#C68A14] text-white hover:bg-[#B37B0F] shadow-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <span>Explore Menu</span>
                <span>→</span>
              </Link>
              <Link
                href="/locations"
                className="px-8 py-4 rounded-full bg-white text-black border border-[#C68A14]/40 hover:bg-[#FAF8F2] shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                Outposts
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stage 2: Sizzle Kinetics (32–68% Scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: stage === 2 ? 1 : 0,
            transform: stage === 2 ? "translateY(0)" : stage < 2 ? "translateY(30px)" : "translateY(-30px)",
            pointerEvents: stage === 2 ? "auto" : "none",
          }}
        >
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#C68A14]/30 inline-block font-extrabold text-[#C68A14] shadow-sm">
              PHASE 01 / CRAFT KINETICS
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl text-[#C68A14] leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              CENTURY-OLD GRIDDLE SEAR
            </h2>

            <p className="type-serif text-base sm:text-xl text-white max-w-xl leading-relaxed font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              ORIGINAL 1926 CAST IRON TECHNIQUE
            </p>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="font-bold px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#C68A14]/30 text-[#C68A14] shadow-sm">
                FRAME {currentFrame.toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                PRECISION SIZZLE SEQUENCE
              </span>
            </div>
          </div>
        </div>

        {/* ── Stage 3: Masterpiece (68–100% Scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: stage === 3 ? 1 : 0,
            transform: stage === 3 ? "translateY(0)" : "translateY(30px)",
            pointerEvents: stage === 3 ? "auto" : "none",
          }}
        >
          <div className="max-w-2xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#C68A14]/30 inline-block font-extrabold text-[#C68A14] shadow-sm">
              PHASE 02 / CULINARY SIGNATURE
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl text-[#C68A14] leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              THE 1926 DH SPECIAL
            </h2>

            <p className="type-serif text-base sm:text-xl text-white max-w-xl leading-relaxed font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Fresh daily Texas beef seared to perfection with house mustard and grilled onions on a toasted bun.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
              <Link
                href="/menu"
                className="px-8 py-4 rounded-full bg-[#C68A14] text-white hover:bg-[#B37B0F] shadow-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <span>Order Signature Dish</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
