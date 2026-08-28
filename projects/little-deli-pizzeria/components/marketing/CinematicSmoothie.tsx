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
          <span className="text-[#166534] font-bold">DELI DESSERTS &amp; BEVERAGES</span>
          <span className="text-ember">BLACK &amp; WHITE COOKIES &amp; DR. BROWN&apos;S</span>
        </div>

        <div className="my-auto max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-char-mute/80 backdrop-blur-md rounded-full text-[#166534] font-mono text-[10px] tracking-wider uppercase border border-[#166534]/30 inline-block">
            AUTHENTIC NYC BAKERY FAVORITE
          </span>
          <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-bone leading-none">
            NYC BLACK &amp; WHITE <br />
            <span className="text-[#166534]">SHORTBREAD COOKIES</span>
          </h2>
          <p className="text-stone font-body text-base max-w-lg leading-relaxed">
            Baked in-house daily with soft cake-like shortbread, iced half Dutch dark chocolate fudge and half vanilla royal glaze.
          </p>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>THE TRUE DELI TRADITION</span>
          <span className="text-[#166534]">CRESTVIEW &amp; WINDSOR PARK</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
