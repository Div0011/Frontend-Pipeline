"use client";


import React, { useState } from "react";

export default function ArchetypeShowcase() {
  const [heatLevel, setHeatLevel] = useState(2);

  const heatStages = [
    { name: "MILD BUTTER", desc: "Creamy, smooth sweet-cream butter glaze with zero heat." },
    { name: "MEDIUM SIGNATURE", desc: "Balanced smoked paprika, black pepper, and garlic herb crunch." },
    { name: "PERI-PERI BLAZE", desc: "Fiery African bird's eye chili oil with citrus zest." },
    { name: "NASHVILLE INFERNO", desc: "Extreme ghost pepper and habanero dipped crispy coating." }
  ];

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#08080b] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-sans text-xs tracking-widest uppercase font-bold" style={{ color: "#2563EB" }}>
              INTERACTIVE SPICE HEAT METER
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold mt-1">
              CHOOSE YOUR HEAT LEVEL
            </h2>
          </div>
          
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {heatStages.map((stage, idx) => (
            <button
              key={idx}
              onClick={() => setHeatLevel(idx)}
              className={`p-5 rounded-xl border text-left transition-all duration-300 ${
                heatLevel === idx ? "bg-white/10 border-white/40" : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <span className="font-sans text-xs font-bold block mb-1" style={{ color: heatLevel === idx ? "#2563EB" : "#888" }}>
                STAGE 0{idx + 1}
              </span>
              <h4 className="font-sans font-bold text-sm uppercase text-white">
                {stage.name}
              </h4>
              <p className="text-xs text-stone-400 mt-2 line-clamp-2">
                {stage.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
