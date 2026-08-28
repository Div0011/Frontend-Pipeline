"use client";


import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ArchetypeShowcase() {
  const [selectedPairing, setSelectedPairing] = useState(0);

  const pairings = [
    { title: "French Black Truffle Glaze", note: "Simmered 4 hours with Porcini mushrooms & cultured Normandy butter." },
    { title: "24K Gold Wagyu Lamination", note: "Artisanal brioche toasted in sweet cream butter with Akaushi beef." },
    { title: "Aged Belgian Speculoos Malt", note: "Handcrafted dairy cream thickshake with spiced Biscoff reduction." }
  ];

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#08080a] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#FFFFFF" }}>
              HAUTE ATELIER GASTRONOMY
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold mt-1">
              THE PAIRING SELECTOR
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-400">
            100% Texas Akaushi Wagyu & Duck Fat Tallow
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pairings.map((p, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPairing(idx)}
              className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                selectedPairing === idx ? "bg-white/10 border-white/30" : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full mb-4" style={{ backgroundColor: selectedPairing === idx ? "#FFFFFF" : "#555" }} />
              <h4 className="font-mono font-bold text-sm uppercase text-white">
                {p.title}
              </h4>
              <p className="text-xs text-stone-400 font-body leading-relaxed mt-2">
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
