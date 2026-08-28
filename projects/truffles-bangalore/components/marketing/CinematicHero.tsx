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
          <span className="text-yolk font-bold">BANGALORE&apos;S BURGER CAPITAL</span>
          <span className="text-ember font-bold">ALL AMERICAN CHEESE BURGER</span>
        </div>

        <div className="my-auto max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-char-mute/80 backdrop-blur-md rounded-full text-yolk font-mono text-[10px] tracking-wider uppercase border border-yolk/30 inline-block">
            SINCE 2004 · 20+ YEARS OF PERFECTION
          </span>
          <h1 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-bone leading-none">
            THE ORIGINAL <br />
            <span className="text-yolk">BANGALORE DINER</span>
          </h1>
          <p className="text-stone font-body text-base sm:text-lg max-w-xl leading-relaxed">
            The legendary All American Cheese Burger, slow-cooked Sloppy Joes, and super thick Ferrero Rocher shakes that defined a generation in Koramangala and St. Mark&apos;s Road.
          </p>
          <div className="pt-4 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-4 bg-yolk text-char font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors shadow-2xl"
            >
              Explore Full Menu
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-char/80 backdrop-blur-md border border-char-mute text-bone font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-yolk transition-colors"
            >
              Find Nearest Outlet
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>KORAMANGALA · ST. MARKS · INDIRANAGAR · NEW BEL RD</span>
          <span className="text-yolk">SCROLL TO INSPECT PATTIES</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
