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
        <div className="flex justify-between text-[11px] font-mono tracking-widest text-smoke uppercase">
          <span className="text-[#E67E22] font-bold">INDIRANAGAR'S OPEN-AIR AMERICAN GRILL</span>
          <span className="text-ember font-bold">CHARBROILED BEEF & SMOKED BRISKET</span>
        </div>

        <div className="my-auto max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-char-mute/80 backdrop-blur-md rounded-full text-[#E67E22] font-mono text-[10px] tracking-wider uppercase border border-[#E67E22]/30 inline-block">
            SINCE 2018 · 100FT ROAD INDIRANAGAR
          </span>
          <h1 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-bone leading-none">
            OPEN-AIR FLAME <br />
            <span className="text-[#E67E22]">SMOKED SMASHES</span>
          </h1>
          <p className="text-stone font-body text-base sm:text-lg max-w-xl leading-relaxed">
            Prime charbroiled beef, 12-hour smoked brisket, grilled jalapeños, and house bourbon barbecue glaze on Indiranagar 100 Feet Road.
          </p>
          <div className="pt-4 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-4 bg-[#E67E22] text-char font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors shadow-2xl"
            >
              Explore Full Menu
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-char/80 backdrop-blur-md border border-char-mute text-bone font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-[#E67E22] transition-colors"
            >
              Find Outlets
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>DEFENCE COLONY · 100FT ROAD · INDIRANAGAR</span>
          <span className="text-[#E67E22]">SCROLL TO INSPECT PATTIES</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
