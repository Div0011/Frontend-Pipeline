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

        {/* Sidebar Metadata */}
        <div className="absolute left-6 bottom-12 hidden xl:block space-y-2 font-mono text-[9px] text-stone tracking-widest leading-relaxed z-20 pointer-events-none">
          <p><span className="text-stone">SPECIMEN:</span> THE OY VEY GOY</p>
          <p><span className="text-stone">CREATOR:</span> MO PITTLE</p>
          <p><span className="text-stone">BUN:</span> STEAMED MARTIN&apos;S POTATO</p>
        </div>

        <div className="absolute right-6 bottom-12 hidden xl:block space-y-2 font-mono text-[9px] text-stone tracking-widest text-right leading-relaxed z-20 pointer-events-none">
          <p><span className="text-stone">ORIGIN:</span> EL PASO MEETS AUSTIN</p>
          <p><span className="text-stone">LOCATION:</span> 5111 AIRPORT BLVD</p>
          <p><span className="text-stone">GREETING:</span> SHALOM Y&apos;ALL!</p>
        </div>

        {/* Stage 1 */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8 transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(-40px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="space-y-6 max-w-3xl">
            <p className="type-caption text-[#06B6D4] font-mono tracking-widest font-bold">
              Border Soul · Airport Blvd · Austin, TX
            </p>
            <h1 className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.88] tracking-tight text-ink">
              SHALOM Y&apos;ALL!
              <br />
              <span className="text-[#06B6D4]">THE OY VEY GOY</span>
            </h1>
            <p className="type-serif text-lg sm:text-xl md:text-2xl text-stone max-w-lg leading-relaxed">
              Angus chuck smashed with grilled onions, crispy potato latkes, Hatch green chiles, and queso on steamed Martin&apos;s potato buns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/menu"
                className="btn-yolk text-xs shadow-2xl font-bold"
              >
                Border Menu →
              </Link>
              <Link
                href="/about"
                className="btn-outline text-xs font-bold"
              >
                Mo&apos;s Story
              </Link>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
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
            <p className="type-caption text-[#06B6D4] font-mono tracking-widest">
              Stage 02 / The Onion Smash
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Smashed With<br />Diced Onions
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Every Angus chuck ball is pressed directly into a pile of diced Texas onions on screaming hot cast iron. The sweet onion steam infuses the crispy lace crust.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-stone">
              <span className="text-[#06B6D4] font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-char-mute" />
              <span>{pct}% ONION SMASH</span>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
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
            <p className="type-caption text-[#06B6D4] font-mono tracking-widest">
              Stage 03 / The Latke Crown
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Crispy Latkes &amp;<br />Hatch Chile Queso
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Border Mexican comfort meets Jewish culinary love. Grab a seat on the Airport Blvd patio or call ahead for pickup!
            </p>
            <div className="flex justify-start lg:justify-end w-full">
              <Link
                href="/locations"
                className="btn-yolk text-xs shadow-2xl font-bold"
              >
                Visit 5111 Airport Blvd →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
