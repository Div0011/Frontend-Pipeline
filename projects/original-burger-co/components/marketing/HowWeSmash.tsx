"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HowWeSmash() {
  const [tempValue, setTempValue] = useState(450);
  const crustPercent = Math.min(100, Math.max(10, Math.round(((tempValue - 200) / 300) * 100)));

  return (
    <section className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest uppercase block font-bold" style={{ color: "#2563EB" }}>
              ORIGINAL BURGER CO. // CRAFT LAB &amp; SCIENCE
            </span>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              THE ARTISANAL SIZZLE CRAFT
            </h2>
          </div>
          <span
            className="font-mono text-xs uppercase font-bold px-4 py-1.5 rounded-full border shadow"
            style={{
              backgroundColor: "#2563EB15",
              color: "#2563EB",
              borderColor: "#2563EB40",
            }}
          >
            100% MASTER CRAFT
          </span>
        </div>

        {/* Interactive Temperature & Sear Simulator Card */}
        <div className="p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold" style={{ color: "#2563EB" }}>
                INTERACTIVE FLAT-TOP SIMULATOR
              </span>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                FLAT-TOP TEMPERATURE &amp; MAILLARD CRUST GAUGE
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl font-black" style={{ color: "#2563EB" }}>
                {tempValue}°F
              </span>
              <span
                className="font-mono text-xs px-2.5 py-1 rounded border uppercase font-bold"
                style={{
                  backgroundColor: "#2563EB20",
                  color: "#2563EB",
                  borderColor: "#2563EB40",
                }}
              >
                {tempValue >= 450 ? "⚡ Optimal Crisp" : tempValue >= 350 ? "Standard Sear" : "Slow Temp"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min={250}
              max={500}
              step={10}
              value={tempValue}
              onChange={(e) => setTempValue(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg cursor-pointer"
              style={{ accentColor: "#2563EB" }}
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>250°F (Slow Steam)</span>
              <span className="font-bold" style={{ color: "#2563EB" }}>450°F (Optimal Crisp Sear)</span>
              <span>500°F (Maximum Char)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5 p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-stone-300">Crispy Caramelized Sear</span>
                <span className="font-bold" style={{ color: "#2563EB" }}>{crustPercent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ width: `${crustPercent}%`, backgroundColor: "#2563EB" }}
                />
              </div>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-stone-300">Flavor &amp; Juice Retention</span>
                <span className="font-bold" style={{ color: "#2563EB" }}>
                  {tempValue >= 440 ? "98% (Sealed In)" : "75% (Slow Cook)"}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ width: `${tempValue >= 440 ? 98 : 75}%`, backgroundColor: "#2563EB" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
