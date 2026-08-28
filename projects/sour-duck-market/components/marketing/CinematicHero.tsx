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
      <div className="h-full w-full flex flex-col justify-center p-8 sm:p-12 md:p-20 relative pointer-events-none">
        <div className="max-w-4xl space-y-6">
          <h1 className="type-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white leading-none font-black tracking-tight">
            SOUR DUCK MARKET
          </h1>

          <div className="pt-2 pointer-events-auto flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
            <Link
              href="/menu"
              className="px-8 py-4 rounded-xl transition-all shadow-2xl hover:brightness-110 active:scale-95 flex items-center gap-2"
              style={{ backgroundColor: "#EA580C", color: "#FFFFFF" }}
            >
              <span>Explore Menu</span>
              <span>→</span>
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-xl hover:border-white/40 active:scale-95 transition-all"
            >
              Outposts
            </Link>
          </div>
        </div>
      </div>
    </CanvasScrubber>
  );
}
