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
          <span className="text-[#C8A96E] font-bold">HAUTE GASTRONOMIE</span>
          <span className="text-ember font-bold">FRENCH BRIOCHE &amp; WINTER TRUFFLE</span>
        </div>

        <div className="my-auto max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-char-soft/80 backdrop-blur-md rounded-full text-[#C8A96E] font-mono text-[10px] tracking-wider uppercase border border-[#C8A96E]/30 inline-block">
            INDIRANAGAR 80 FEET ROAD · BENGALURU
          </span>
          <h1 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-bone leading-none">
            REDEFINING <br />
            <span className="text-[#C8A96E]">GOURMET BURGERS</span>
          </h1>
          <p className="text-stone font-body text-base sm:text-lg max-w-xl leading-relaxed">
            Whole roasted Portobello caps, New Zealand lamb, aged Parmigiano-Reggiano, and handcrafted French brioche buns curated with European culinary precision.
          </p>
          <div className="pt-4 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-4 bg-[#C8A96E] text-char font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-bone transition-colors shadow-2xl"
            >
              Explore La Carte
            </Link>
            <Link
              href="/reservations"
              className="px-8 py-4 bg-char/80 backdrop-blur-md border border-char-mute text-bone font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-[#C8A96E] transition-colors"
            >
              Reserve Salon
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>80 FEET RD · INDIRANAGAR</span>
          <span className="text-[#C8A96E]">SCROLL TO INSPECT CULINARY ANATOMY</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
