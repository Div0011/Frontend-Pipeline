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
      <div className="h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-20 relative pointer-events-none">
        <div className="flex justify-between text-[11px] font-mono tracking-widest text-stone-400 uppercase">
          <span className="font-bold" style={{ color: "#FFFFFF" }}>STEEL SMASH CRAFT</span>
          <span className="font-bold text-stone-300">450°F CAST IRON CARAMELIZATION</span>
        </div>

        <div className="my-auto max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-white/[0.06] backdrop-blur-md rounded-full font-mono text-[10px] tracking-wider uppercase border border-white/15 inline-block" style={{ color: "#FFFFFF" }}>
            AUSTIN OUTPOSTS
          </span>
          <h1 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none font-black tracking-tight">
            NADC BURGER
          </h1>
          <p className="text-stone-300 font-body text-base sm:text-lg max-w-lg leading-relaxed">
            Dual fresh patties smashed paper-thin on 450°F cast iron for crispy lace edges.
          </p>
          <div className="pt-4 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-2xl hover:brightness-110 active:scale-95 flex items-center gap-2"
              style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
            >
              <span>Explore Menu</span>
              <span>→</span>
            </Link>
            <Link
              href="/locations"
              className="px-8 py-3.5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:border-white/40 active:scale-95 transition-all"
            >
              Outposts
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-stone-400 uppercase">
          <span>AUSTIN</span>
          <span style={{ color: "#FFFFFF" }}>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
