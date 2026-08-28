"use client";

import { motion } from "framer-motion";

const tickerItems = [
  "THE OG DOUBLE SMASH",
  "NASHVILLE HOT FRIED CHICKEN",
  "SMASHED TRUFFLE SHROOM",
  "ANIMAL STYLE CRINKLE FRIES",
  "LOTUS BISCOFF MALT SHAKE",
  "ST. MARKS ROAD · BANGALORE"
];

export default function ScrollytellingText() {
  return (
    <section className="py-12 select-none overflow-hidden border-b border-char-mute shadow-2xl" style={{ backgroundColor: "#1B4D36" }}>
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 items-center"
        >
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span
                className="type-display text-3xl sm:text-5xl font-black tracking-tight uppercase"
                style={{ color: "#000000" }}
              >
                {item}
              </span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#000000", opacity: 0.5 }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
