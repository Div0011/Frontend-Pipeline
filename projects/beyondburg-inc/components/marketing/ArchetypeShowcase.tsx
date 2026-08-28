"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ArchetypeShowcase() {
  const [selectedPairing, setSelectedPairing] = useState(0);

  const pairings = [
    {
      title: "French Black Truffle Glaze",
      tag: "HAUTE FOREST MUSHROOM",
      note: "Simmered 4 hours with Porcini mushrooms & cultured Normandy butter over 80/20 double smashed patties.",
      stats: "Black Truffle D.O.P. · 4-Hour Simmer",
      icon: "01",
    },
    {
      title: "24K Gold Wagyu Lamination",
      tag: "AKAUSHI RESERVE",
      note: "Artisanal Martin's potato brioche toasted in sweet cream butter with ultra-marbled Akaushi prime cuts.",
      stats: "24K Edible Gold · Akaushi Prime",
      icon: "02",
    },
    {
      title: "Aged Belgian Speculoos Malt",
      tag: "SIGNATURE BISCOFF REDUCTION",
      note: "Handcrafted dairy cream thickshake blended with spiced caramelized Biscoff biscuit puree and sea salt.",
      stats: "Belgian Speculoos · Double Spun Malt",
      icon: "03",
    },
  ];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-[#F5C418]">
              PAIRINGS
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-extrabold mt-1">
              THE PAIRING SELECTOR
            </h2>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pairings.map((p, idx) => {
            const isSelected = selectedPairing === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setSelectedPairing(idx)}
                whileHover={{ scale: 1.02 }}
                className={`p-7 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl ${
                  isSelected
                    ? "bg-white/[0.08] border-[#F5C418] shadow-2xl scale-102"
                    : "bg-white/[0.03] border-white/10 hover:border-white/25"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{p.icon}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: isSelected ? "#F5C418" : "#444" }}
                    />
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#F5C418] font-bold block">
                    {p.tag}
                  </span>

                  <h4 className="font-mono font-bold text-base uppercase text-white">
                    {p.title}
                  </h4>

                  <p className="text-xs text-stone-300 font-body leading-relaxed">
                    {p.note}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 font-mono text-[10px] uppercase text-[#F5C418] font-bold flex justify-between items-center">
                  <span>{p.stats}</span>
                  <span>{isSelected ? "● SELECTED" : "○ SELECT"}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
