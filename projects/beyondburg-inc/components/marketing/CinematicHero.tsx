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
          <span className="text-yolk font-bold">SMASH BURGER REVOLUTION</span>
          <span className="text-ember font-bold">CRISPY LACE EDGES &amp; MARTIN&apos;S POTATO BUNS</span>
        </div>

        <div className="my-auto max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-char-soft/80 backdrop-blur-md rounded-full text-yolk font-mono text-[10px] tracking-wider uppercase border border-yolk/30 inline-block">
            ST. MARK&apos;S ROAD &amp; INDIRANAGAR · BENGALURU
          </span>
          <h1 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-bone leading-none">
            UNAPOLOGETIC <br />
            <span className="text-yolk">SMASH BURGERS</span>
          </h1>
          <p className="text-stone font-body text-base sm:text-lg max-w-xl leading-relaxed">
            Coarsely ground fresh beef and chicken smashed with 200 lbs of steel pressure on a screaming-hot griddle for maximum Maillard reaction and paper-thin crispy edges.
          </p>
          <div className="pt-4 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-4 bg-yolk text-char font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-bone transition-colors shadow-2xl"
            >
              Order Smash Burgers
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-char/80 backdrop-blur-md border border-char-mute text-bone font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-yolk transition-colors"
            >
              Our Locations
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>ST. MARKS ROAD · INDIRANAGAR</span>
          <span className="text-yolk">SCROLL TO INSPECT THE SMASH</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
