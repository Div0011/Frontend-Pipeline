"use client";

import { motion } from "framer-motion";
import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  { length: 240 },
  (_, i) => `/frames/smoothie/frame_${String(i).padStart(6, "0")}.webp`
);

export default function CinematicSmoothie() {
  return (
    <CanvasScrubber frames={frames} scrollDistance="+=200%">
      <div className="h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-20 relative pointer-events-none">
        <div className="flex justify-between text-[11px] font-mono tracking-widest text-smoke uppercase">
          <span className="text-yolk font-bold">SMASHED BURGER COMPANIONS</span>
          <span className="text-ember font-bold">LOTUS BISCOFF &amp; ANIMAL FRIES</span>
        </div>

        <div className="my-auto max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-char-soft/80 backdrop-blur-md rounded-full text-yolk font-mono text-[10px] tracking-wider uppercase border border-yolk/30 inline-block">
            CULT MALTS &amp; SHAKES
          </span>
          <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-bone leading-none">
            LOTUS BISCOFF <br />
            <span className="text-yolk">SPECULOOS MALT</span>
          </h2>
          <p className="text-stone font-body text-base max-w-lg leading-relaxed">
            Spun with caramelized Belgian Speculoos cookies, golden butter malt cream, and vanilla bean gelato, topped with crushed crunchy cookie dust.
          </p>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>THE SWEET SMASH COUNTERPART</span>
          <span className="text-yolk">SPUN FRESH PER ORDER</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
