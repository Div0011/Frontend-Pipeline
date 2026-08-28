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
          <span className="text-[#DC2626] font-bold">KAMMANAHALLI'S LATE-NIGHT BURGER SPOT</span>
          <span className="text-ember font-bold">MONSTER DOUBLE & CRISPY CHICKEN ZINGER</span>
        </div>

        <div className="my-auto max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-char-mute/80 backdrop-blur-md rounded-full text-[#DC2626] font-mono text-[10px] tracking-wider uppercase border border-[#DC2626]/30 inline-block">
            3RD CROSS KAMMANAHALLI · OPEN TILL 12:30 AM
          </span>
          <h1 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-bone leading-none">
            KAMMANAHALLI'S <br />
            <span className="text-[#DC2626]">LATE-NIGHT SMASHES</span>
          </h1>
          <p className="text-stone font-body text-base sm:text-lg max-w-xl leading-relaxed">
            Freshly grilled beef and crispy fried chicken burgers served hot till late night in Kammanahalli.
          </p>
          <div className="pt-4 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-4 bg-[#DC2626] text-char font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors shadow-2xl"
            >
              Explore Full Menu
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-char/80 backdrop-blur-md border border-char-mute text-bone font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-[#DC2626] transition-colors"
            >
              Find Outlets
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>3RD CROSS · VIVEKANANDA SWAMY · KAMMANAHALLI</span>
          <span className="text-[#DC2626]">SCROLL TO INSPECT PATTIES</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
