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
          <span className="text-[#C8A96E] font-bold">ARTISANAL BOTANICAL ELIXIRS</span>
          <span className="text-ember font-bold">DAMASK ROSE &amp; VALRHONA CHOCOLATE</span>
        </div>

        <div className="my-auto max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-char-soft/80 backdrop-blur-md rounded-full text-[#C8A96E] font-mono text-[10px] tracking-wider uppercase border border-[#C8A96E]/30 inline-block">
            SIGNATURE COCKTAIL BOTANIQUE
          </span>
          <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-bone leading-none">
            ROSE &amp; CARDAMOM <br />
            <span className="text-[#C8A96E]">PARISIEN ELIXIR</span>
          </h2>
          <p className="text-stone font-body text-base max-w-lg leading-relaxed">
            Distilled Damask rose petals, green cardamom pods, crushed Sicilian pistachios, and sparkling botanical soda finished with velvet Turkish delight foam.
          </p>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>PARISIAN COCKTAIL CULTURE</span>
          <span className="text-[#C8A96E]">INDIRANAGAR BOUTIQUE</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
