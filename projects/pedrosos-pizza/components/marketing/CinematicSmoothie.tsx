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
        {/* Top Tag */}
        <div className="flex justify-between text-[11px] font-mono tracking-widest text-smoke uppercase">
          <span className="text-[#B91C1C] font-bold">DESSERT &amp; BEVERAGES</span>
          <span className="text-ember">SWEET RICOTTA &amp; SPARKLING ARANCIATA</span>
        </div>

        {/* Center Display */}
        <div className="my-auto max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-char-mute/80 backdrop-blur-md rounded-full text-[#B91C1C] font-mono text-[10px] tracking-wider uppercase border border-[#B91C1C]/30 inline-block">
            MADE FRESH TO ORDER
          </span>
          <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-bone leading-none">
            HOUSE-FILLED <br />
            <span className="text-ember">SICILIAN CANNOLI</span>
          </h2>
          <p className="text-stone font-body text-base max-w-lg leading-relaxed">
            Imported crispy pastry tubes piped fresh at time of order with sweet sheep&apos;s milk ricotta, dark chocolate curls, and Sicilian pistachios.
          </p>
        </div>

        {/* Bottom meta */}
        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>THE PERFECT SLICE FINALE</span>
          <span className="text-[#B91C1C]">ORDER DIRECT ONLINE</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
