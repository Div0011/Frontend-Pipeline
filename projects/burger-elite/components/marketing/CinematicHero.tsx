"use client";

import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  { length: 248 },
  (_, i) => `/frames/burger/frame_${String(i).padStart(6, "0")}.webp`
);

export default function CinematicHero() {
  return (
    <CanvasScrubber frames={frames} scrollDistance="+=350%">
      <div className="h-full w-full flex flex-col justify-center p-8 sm:p-12 md:p-20 relative pointer-events-none select-none">
        <div className="max-w-4xl space-y-6">
          {/* Live Status Pill */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl w-fit shadow-lg">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#7C3AED" }} />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-stone-200">
              Craft Smash Atelier · Bengaluru
            </span>
          </div>

          <h1 className="type-display text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] text-white leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            BURGER ELITE
          </h1>

          <div className="pt-2 pointer-events-auto flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
            <Link
              href="/menu"
              className="px-8 py-4 rounded-full transition-all shadow-2xl hover:brightness-110 hover:scale-105 active:scale-95 flex items-center gap-2"
              style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }}
            >
              <span>Explore Menu</span>
              <span>→</span>
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-full hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Outposts
            </Link>
          </div>
        </div>
      </div>
    </CanvasScrubber>
  );
}
