"use client";

import { motion } from "framer-motion";
import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  { length: 240 },
  (_, i) => `/frames/burger/frame_${String(i).padStart(6, "0")}.webp`
);

export default function CinematicHero() {
  return (
    <CanvasScrubber frames={frames} scrollDistance="+=250%">
      <div className="h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-20 relative pointer-events-none">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-between items-start text-[11px] font-mono tracking-widest text-smoke uppercase"
        >
          <div className="space-y-1">
            <span className="text-[#B91C1C] font-bold">AUTHENTIC NY SLICES</span>
            <p className="text-[10px] text-bone/60">AUSTIN, TEXAS · EST. 2021</p>
          </div>
          <div className="text-right space-y-1">
            <span className="text-ember font-bold">72-HR SOURDOUGH CRUST</span>
            <p className="text-[10px] text-bone/60">2207 JUSTIN LN &amp; 3850 AIRPORT</p>
          </div>
        </motion.div>

        {/* Center Display Hero */}
        <div className="my-auto max-w-4xl space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-char-mute/80 backdrop-blur-md rounded-full border border-[#B91C1C]/30 text-[#B91C1C] font-mono text-[10px] tracking-wider uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            VOTED AUSTIN&apos;S BEST NY &amp; GRANDMA STYLE PIZZA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-bone tracking-tight leading-[0.9]"
          >
            CRUST. CHEESE. <br />
            <span className="text-ember">PERFECTION.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-stone font-body text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Long-fermented artisan sourdough dough, hand-pulled mozzarella, and San Marzano sweet marinara baked on blistering stone deck ovens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-4 flex flex-wrap gap-4 pointer-events-auto"
          >
            <a
              href="/menu"
              className="px-8 py-3.5 bg-ember text-bone font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#B91C1C] hover:text-char transition-all shadow-2xl"
            >
              Explore Slices &amp; Pies
            </a>
            <a
              href="/locations"
              className="px-8 py-3.5 bg-char/80 backdrop-blur-md border border-char-mute text-bone font-mono text-xs uppercase tracking-wider rounded-sm hover:border-[#B91C1C] transition-all"
            >
              Visit Justin Lane
            </a>
          </motion.div>
        </div>

        {/* Bottom Metas */}
        <div className="flex justify-between items-end text-[10px] font-mono tracking-widest text-smoke uppercase">
          <span>SCROLL TO DECONSTRUCT DOUGH &amp; CRUST</span>
          <span className="text-[#B91C1C]">STONE OVEN BAKED DAILY</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
