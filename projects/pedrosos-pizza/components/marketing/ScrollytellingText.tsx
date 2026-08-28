"use client";

import { motion } from "framer-motion";

const tickerItems = [
  "GRANDMA HOT HONEY PEPPERONI SQUARE",
  "72-HR SLOW FERMENTED DOUGH",
  "CRISPY BOTTOM ROMAN CRUST",
  "SAN MARZANO D.O.P. PIZZA PIES",
  "AIRPORT BLVD & JUSTIN LN · AUSTIN",
  "ARTISANAL ITALIAN SLICES"
];

export default function ScrollytellingText() {
  return (
    <section className="py-12 select-none overflow-hidden border-b border-char-mute shadow-2xl" style={{ backgroundColor: "#B91C1C" }}>
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
                style={{ color: "#FFFFFF" }}
              >
                {item}
              </span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FFFFFF", opacity: 0.5 }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
