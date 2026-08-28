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
          <p><span className="text-stone">SPECIMEN:</span> THE AMARILLO BURGER</p>
          <p><span className="text-stone">WEIGHT:</span> 3/4 LB ANGUS CHUCK</p>
          <p><span className="text-stone">CHILE:</span> ROASTED SERRANOS</p>
        </div>

        <div className="absolute right-6 bottom-12 hidden xl:block space-y-2 font-mono text-[9px] text-stone tracking-widest text-right leading-relaxed z-20 pointer-events-none">
          <p><span className="text-stone">ORIGIN:</span> 6TH STREET NOIR</p>
          <p><span className="text-stone">LOCATION:</span> 517 E 6TH ST</p>
          <p><span className="text-stone">SINCE:</span> 1994 AUSTIN, TX</p>
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
            <p className="type-caption text-ember font-mono tracking-widest font-bold">
              6th Street Dive Bar &amp; Grill · Est. 1994
            </p>
            <h1 className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.88] tracking-tight text-ink">
              3/4 LB MONSTER
              <br />
              <span className="text-ember">CHARGRILLED BURGERS</span>
            </h1>
            <p className="type-serif text-lg sm:text-xl md:text-2xl text-stone max-w-lg leading-relaxed">
              Featured on Diners, Drive-Ins &amp; Dives. Massive flame-grilled Angus burgers, fire-roasted serranos, and world-famous loaded Bloody Marys on 6th Street.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/menu"
                className="btn-red text-xs shadow-2xl font-bold"
              >
                Monster Menu →
              </Link>
              <Link
                href="/about"
                className="btn-outline text-xs font-bold"
              >
                Paul&apos;s Story
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
            <p className="type-caption text-ember font-mono tracking-widest">
              Stage 02 / The Live Flame Grill
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Grilled Over<br />Live Flames
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Every 3/4 lb patty is hand-formed and chargrilled over raging open fire for deep smoke flavor, caramelized sear marks, and unrivaled juiciness.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-stone">
              <span className="text-ember font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-char-mute" />
              <span>{pct}% CHARGRILLED</span>
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
            <p className="type-caption text-ember font-mono tracking-widest">
              Stage 03 / The 6th Street Sanctuary
            </p>
            <h2 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Verde Fries &amp;<br />Loaded Bloody Marys
            </h2>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Pork chile verde fries, cold pints, horror films on retro TVs, and the greatest dive bar atmosphere in Texas.
            </p>
            <div className="flex justify-start lg:justify-end w-full">
              <Link
                href="/locations"
                className="btn-red text-xs shadow-2xl font-bold"
              >
                Visit 517 E 6th St →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
