"use client";

/**
 * CinematicHero — Genre 2 (Restrained Centerpiece) food-cinema hero.
 *
 * Reference mash: Hubtown (single monolith + mouse-reveal) +
 * Imagina Studio (video-morph transitions) + Canals Amsterdam (atmospheric grading).
 *
 * This is NOT Genre 1. There is no scroll-camera 3D kitchen tour.
 * The hero is a single confident visual moment (scroll-scrubbed frame sequence)
 * with GSAP-choreographed DOM text stages. Everything below is conventional
 * sections with cinematic motion language.
 *
 * Performance: 248 WebP frames preloaded in tiers, canvas render via
 * requestAnimationFrame, DPR-aware sizing, object-cover drawImage math.
 */
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
      {/* All inner content is pure React — no GSAP DOM touching */}
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
            <p className="type-caption text-[#D4AF37] font-mono tracking-widest">
              Gourmet Luxury Burger Studio · by Zorawar Kalra
            </p>
            <h1 className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.88] tracking-tight text-ink">
              The Alchemy of
              <br />
              <span className="text-[#D4AF37]">Truffle &amp; Brioche</span>
            </h1>
            <p className="type-serif text-lg sm:text-xl md:text-2xl text-stone max-w-xl leading-relaxed">
              Shaved European black winter truffles, prime hand-smashed patties,
              aged English cheddar, and French butter brioche crafted without compromise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-3 bg-black text-[#D4AF37] border border-[#D4AF37]/40 px-8 py-4 type-caption text-xs hover:bg-[#D4AF37] hover:text-black transition-colors duration-500 shadow-2xl"
              >
                Explore Gourmet Menu
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-3 border border-ink/30 text-ink px-8 py-4 type-caption text-xs hover:border-[#D4AF37] hover:bg-black hover:text-[#D4AF37] transition-all duration-500"
              >
                Indiranagar Studio
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
            <p className="type-caption text-[#D4AF37] font-mono tracking-widest">
              Phase 01 / Black Truffle Infusion
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Shaved European<br />Black Truffles
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Simmered with wild shiitake and shimeji mushrooms, creating an earthy
              ragout that melts over sizzling prime buffalo smash patties.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-stone">
              <span className="text-[#D4AF37] font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-ink/20" />
              <span>HAUTE CULINARY SEQUENCE</span>
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
            <p className="type-caption text-[#D4AF37] font-mono tracking-widest">
              Phase 02 / The Truffle Takeover
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              The Truffle<br />Takeover
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Prime seared patty, shaved truffle carpaccio, aged gouda melt,
              and house truffle emulsion inside golden French brioche.
            </p>
            <div className="flex justify-start lg:justify-end w-full">
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 bg-gold text-cream-dark px-8 py-4 type-caption text-xs hover:bg-ink hover:text-cream transition-colors duration-500 shadow-xl"
              >
                Order This Specimen →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Sidebar Metadata ── */}
        <div
          className="absolute left-6 bottom-8 hidden xl:flex flex-col gap-1 font-mono text-[9px] text-stone tracking-widest leading-relaxed z-30 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
        >
          <p><span className="text-mist">SPECIMEN:</span> SMASH DISPLAY v2.0</p>
          <p><span className="text-mist">DESIGNER:</span> ATELIER GUYS</p>
          <p><span className="text-mist">CLASSIFICATION:</span> GEOMETRIC SERIF</p>
        </div>

        <div
          className="absolute right-6 bottom-8 hidden xl:flex flex-col gap-1 font-mono text-[9px] text-stone tracking-widest text-right leading-relaxed z-30 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
        >
          <p><span className="text-mist">COORDINATES:</span> 12.97° N, 77.59° E</p>
          <p><span className="text-mist">LAB:</span> BANGALORE KINETICS</p>
          <p><span className="text-mist">PROGRESS:</span> {pct}%</p>
        </div>

      </div>
    </CanvasScrubber>
  );
}
