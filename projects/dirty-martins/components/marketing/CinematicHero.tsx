"use client";

import { useState } from "react";
import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 240;
const HERO_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/hero/frame_${String(i).padStart(6, "0")}.webp`
);

function getStage(progress: number): 1 | 2 | 3 {
  if (progress < 0.33) return 1;
  if (progress < 0.66) return 2;
  return 3;
}

export default function CinematicHero() {
  const [progress, setProgress] = useState(0);
  const stage = getStage(progress);
  const pct = Math.round(progress * 100);

  return (
    <CanvasScrubber
      frames={HERO_FRAMES}
      scrollDistance="+=350%"
      onProgress={setProgress}
      overlayGradient
      preloadCount={80}
    >
      <div className="h-full max-w-[88rem] mx-auto px-6 lg:px-8 relative">

        {/* Font Specimen Metadata Sidebars */}
        <div className="absolute left-6 bottom-12 hidden xl:block space-y-2 font-mono text-[9px] text-stone tracking-widest leading-relaxed z-20 pointer-events-none">
          <p><span className="text-stone">SPECIMEN:</span> THE OT SPECIAL v1926</p>
          <p><span className="text-stone">ORIGIN:</span> 2808 GUADALUPE ST</p>
          <p><span className="text-stone">GRIDDLE:</span> 100-YEAR SEASONED FLAT-TOP</p>
        </div>

        <div className="absolute right-6 bottom-12 hidden xl:block space-y-2 font-mono text-[9px] text-stone tracking-widest text-right leading-relaxed z-20 pointer-events-none">
          <p><span className="text-stone">COORDINATES:</span> 30.2936° N, 97.7416° W</p>
          <p><span className="text-stone">CAMPUS:</span> UT AUSTIN / THE DRAG</p>
          <p><span className="text-stone">CENTENNIAL:</span> 1926 – 2026</p>
        </div>

        {/* Stage 1: 0% – 33% */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8 transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(-40px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="space-y-6 max-w-3xl">
            <p className="type-caption text-[#BF5700] font-mono tracking-widest">
              Austin&apos;s Oldest Diner · Est. 1926
            </p>
            <h1 className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.88] tracking-tight text-ink">
              100 YEARS OF
              <br />
              <span className="text-ember">THE OT SPECIAL</span>
            </h1>
            <p className="type-serif text-lg sm:text-xl md:text-2xl text-stone max-w-lg leading-relaxed">
              Sizzling flat-top smash burgers, famous crispy tater tots, and ice-cold beers on The Drag for nearly a century.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/menu"
                className="btn-red text-xs shadow-2xl font-bold"
              >
                Centennial Menu →
              </Link>
              <Link
                href="/about"
                className="btn-outline text-xs font-bold"
              >
                The 1926 Legacy
              </Link>
            </div>
          </div>
        </div>

        {/* Stage 2: 33% – 66% */}
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
            <p className="type-caption text-[#BF5700] font-mono tracking-widest">
              Stage 02 / The Flat-Top Sear
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              100-Year<br />Seasoned Cast Iron
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Every patty hits our century-old flat-top griddle. Caramelized edges, sizzling Angus beef, and melted sharp cheddar pressed onto buttered Texas toast.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-stone">
              <span className="text-[#BF5700] font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-char-mute" />
              <span>{pct}% FLAT-TOP SEAR</span>
            </div>
          </div>
        </div>

        {/* Stage 3: 66% – 100% */}
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
            <p className="type-caption text-[#BF5700] font-mono tracking-widest">
              Stage 03 / The Living Legend
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Kum-Bak to<br />Real Austin Flavor
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              From Martin Kermich to Mark Nemir, generations of UT students and Austin families know: there is only one Dirty&apos;s.
            </p>
            <div className="flex justify-start lg:justify-end w-full">
              <Link
                href="/locations"
                className="btn-red text-xs shadow-2xl font-bold"
              >
                Visit 2808 Guadalupe →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
