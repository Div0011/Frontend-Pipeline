"use client";

import React, { useState } from "react";
import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 240;
const SMOOTHIE_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/smoothie/frame_${String(i).padStart(6, "0")}.webp`
);

function getStage(progress: number): 1 | 2 {
  if (progress < 0.45) return 1;
  return 2;
}

export default function CinematicSmoothie() {
  const [progress, setProgress] = useState(0);
  const stage = getStage(progress);
  const currentFrame = Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1);

  return (
    <CanvasScrubber
      frames={SMOOTHIE_FRAMES}
      scrollDistance="+=250%"
      onProgress={setProgress}
      overlayGradient={false}
      preloadCount={60}
    >
      <div data-image-overlay className="h-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 relative select-none">
        
        {/* ── Stage 1: Signature Craving Reveal (0–45% Scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(-30px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#C68A14]/30 inline-block font-extrabold text-[#C68A14] shadow-sm">
              HOUSE SIGNATURE CRAVING
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#C68A14] leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              1926 SPECIAL <br />
              <span style={{ color: "#C68A14" }}>TEXAS CHOCOLATE SHAKE</span>
            </h2>

            <p className="type-serif text-base sm:text-xl text-white max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Hand-spun gelato, pure cream infusions, and real malt crumbles.
            </p>
          </div>
        </div>

        {/* ── Stage 2: Velvet Texture & Balance (45–100% Scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: stage === 2 ? 1 : 0,
            transform: stage === 2 ? "translateY(0)" : "translateY(30px)",
            pointerEvents: stage === 2 ? "auto" : "none",
          }}
        >
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#C68A14]/30 inline-block font-extrabold text-[#C68A14] shadow-sm">
              VELVET MALT BALANCE
            </span>

            <h2 className="type-display text-5xl sm:text-7xl md:text-8xl text-[#C68A14] leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              PERFECT THICK DENSITY
            </h2>

            <p className="type-serif text-base sm:text-xl text-white max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Rich velvety texture crafted daily with farm-fresh dairy and Belgian cocoa.
            </p>

            <div className="pt-2">
              <Link
                href="/menu"
                className="px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider bg-[#C68A14] text-white hover:bg-[#B37B0F] transition-all shadow-xl inline-block"
              >
                Order Shake →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
