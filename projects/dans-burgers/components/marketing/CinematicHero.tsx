"use client";

import { useState } from "react";
import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 248;
const BURGER_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/burger/frame_${String(i).padStart(6, "0")}.webp`
);

function getStage(progress: number): 1 | 2 | 3 {
  if (progress < 0.3) return 1;
  if (progress < 0.65) return 2;
  return 3;
}

export default function CinematicHero() {
  const [progress, setProgress] = useState(0);
  const stage = getStage(progress);
  const pct = Math.round(progress * 100);

  return (
    <CanvasScrubber
      frames={BURGER_FRAMES}
      scrollDistance="+=300%"
      onProgress={setProgress}
      overlayGradient
      preloadCount={60}
    >
      <div className="h-full max-w-[88rem] mx-auto px-6 lg:px-8">

        {/* ── Stage 1: Hero Reveal (0–30%) ── */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8 transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : stage < 1 ? "translateY(40px)" : "translateY(-40px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
              <p className="type-caption text-[#D97706] font-mono tracking-widest">
                Austin&apos;s Original Diner · Est. 1973
              </p>
            </div>
            <h1 className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.88] tracking-tight text-ink">
              The Art of
              <br />
              <span className="text-[#D97706]">the Burger</span>
            </h1>
            <p className="type-serif text-lg sm:text-xl md:text-2xl text-stone max-w-xl leading-relaxed">
              100% Certified Angus chuck, made to order on screaming-hot cast iron.
              Honoring 50+ years of Dan &amp; Frances Junk&apos;s timeless Texas tradition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-3 bg-ember text-bone px-8 py-4 type-caption text-xs hover:bg-ember-light transition-colors duration-500 shadow-xl"
              >
                Explore Austin Menu
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-3 border border-ink/30 text-ink px-8 py-4 type-caption text-xs hover:border-[#D97706] hover:bg-char-soft hover:text-[#D97706] transition-all duration-500"
              >
                Find 4 Austin Locations
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stage 2: Griddle Kinetics (30–65%) ── */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8"
          style={{
            opacity: stage === 2 ? 1 : 0,
            transform: stage === 2 ? "translateY(0)" : stage < 2 ? "translateY(40px)" : "translateY(-40px)",
            pointerEvents: stage === 2 ? "auto" : "none",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="space-y-6 max-w-2xl">
            <p className="type-caption text-[#D97706] font-mono tracking-widest">
              Phase 01 / Griddle Kinetics
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Searing Fresh<br />Angus Chuck
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Never frozen, never pre-cooked. Fresh Certified Angus beef pressed onto hot seasoned griddles
              to seal in juices with a crispy diner edge.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-stone">
              <span className="text-[#D97706] font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-ink/20" />
              <span>MADE TO ORDER SINCE 1973</span>
            </div>
          </div>
        </div>

        {/* ── Stage 3: The Masterpiece (65–100%) ── */}
        <div
          className="absolute inset-0 flex items-center justify-start lg:justify-end px-6 lg:px-8"
          style={{
            opacity: stage === 3 ? 1 : 0,
            transform: stage === 3 ? "translateY(0)" : "translateY(40px)",
            pointerEvents: stage === 3 ? "auto" : "none",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="space-y-6 max-w-xl text-left lg:text-right flex flex-col items-start lg:items-end w-full">
            <p className="type-caption text-[#D97706] font-mono tracking-widest">
              Phase 02 / The Austin Legend
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Dan&apos;s Special<br />Cheeseburger
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Melted American cheese, crinkle-cut pickles, fresh sliced onions, and Dan&apos;s famous sauce
              on a toasted butter bun. Served with world-famous $50 onion rings.
            </p>
            <div className="flex justify-start lg:justify-end w-full">
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 bg-[#D97706] text-char px-8 py-4 type-caption text-xs font-bold hover:bg-[#D97706]-light transition-colors duration-500 shadow-xl"
              >
                Order This Classic →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Sidebar Metadata ── */}
        <div
          className="absolute left-6 bottom-8 hidden xl:flex flex-col gap-1 font-mono text-[9px] text-stone tracking-widest leading-relaxed z-30 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
        >
          <p><span className="text-mist">SPECIMEN:</span> DAN&apos;S SPECIAL CHEESEBURGER</p>
          <p><span className="text-mist">RECIPE:</span> DAN &amp; FRANCES JUNK · 1973</p>
          <p><span className="text-mist">BEEF:</span> 100% CERTIFIED ANGUS CHUCK</p>
        </div>

        <div
          className="absolute right-6 bottom-8 hidden xl:flex flex-col gap-1 font-mono text-[9px] text-stone tracking-widest text-right leading-relaxed z-30 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
        >
          <p><span className="text-mist">COORDINATES:</span> 30.2672° N, 97.7431° W</p>
          <p><span className="text-mist">LOCATIONS:</span> 4 STORES IN AUSTIN &amp; BUDA</p>
          <p><span className="text-mist">PROGRESS:</span> {pct}%</p>
        </div>

      </div>
    </CanvasScrubber>
  );
}
