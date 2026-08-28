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
          <span className="text-yolk font-bold">LATE-NIGHT CULT BURGER GARAGE</span>
          <span className="text-ember font-bold">THE MONSTER DOUBLE BEAST</span>
        </div>

        <div className="my-auto max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-char-soft/80 backdrop-blur-md rounded-full text-yolk font-mono text-[10px] tracking-wider uppercase border border-yolk/30 inline-block">
            50 HENNUR MAIN ROAD · OPEN TILL 1:30 AM
          </span>
          <h1 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-bone leading-none">
            BANGALORE&apos;S <br />
            <span className="text-yolk">CULT BURGER HOUSE</span>
          </h1>
          <p className="text-stone font-body text-base sm:text-lg max-w-xl leading-relaxed">
            No fancy reservations. Just sizzling cast-iron griddles, giant double patties dripping with melted cheddar and fried egg, and thick Nutella brownie shakes under the night sky.
          </p>
          <div className="pt-4 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-4 bg-yolk text-char font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors shadow-2xl"
            >
              See Monster Burgers
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-char/80 backdrop-blur-md border border-char-mute text-bone font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-yolk transition-colors"
            >
              Hennur Garage Location
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>HENNUR · ST. THOMAS TOWN · FRAZER TOWN</span>
          <span className="text-yolk">SCROLL TO INSPECT THE BEAST</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
