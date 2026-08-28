"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HowWeSmash() {
  const [searPressure, setSearPressure] = useState<number>(200);

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h2 className="type-display text-4xl sm:text-6xl text-white font-black tracking-tight">
            ARTISANAL LUXURY BURGER CRAFT
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-stone-300">Sear Temperature & Pressure</span>
                <span style={{ color: "#D4AF37" }}>{searPressure} lbs / 450°F</span>
              </div>
              <input
                type="range"
                min="100"
                max="300"
                value={searPressure}
                onChange={(e) => setSearPressure(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: "#D4AF37" }}
              />
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest block" style={{ color: "#D4AF37" }}>
              GOLD LEAF & TRUFFLE AIOLI
            </span>
            <h3 className="type-display text-2xl sm:text-3xl text-white font-extrabold">
              MAXIMUM CARAMELIZED MAILLARD REACTION
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
