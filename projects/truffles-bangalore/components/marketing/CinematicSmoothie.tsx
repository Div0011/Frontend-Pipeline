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
          <span className="text-yolk font-bold">LEGENDARY BANGALORE BEVERAGES</span>
          <span className="text-ember">FERRERO ROCHER &amp; DEVIL&apos;S OWN</span>
        </div>

        <div className="my-auto max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-char-mute/80 backdrop-blur-md rounded-full text-yolk font-mono text-[10px] tracking-wider uppercase border border-yolk/30 inline-block">
            BANGALORE&apos;S #1 THICKSHAKE
          </span>
          <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-bone leading-none">
            FERRERO ROCHER <br />
            <span className="text-yolk">SUPER THICKSHAKE</span>
          </h2>
          <p className="text-stone font-body text-base max-w-lg leading-relaxed">
            Whole imported Ferrero Rocher hazelnut pralines blended into thick artisanal chocolate gelato, topped with roasted hazelnut crumble and rich Nutella fudge.
          </p>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>THE ULTIMATE DESSERT INDULGENCE</span>
          <span className="text-yolk">SERVED ICE COLD DAILY</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
