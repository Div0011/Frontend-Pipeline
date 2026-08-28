"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HowWeSmash() {
  const [tempValue, setTempValue] = useState(450);
  const crustPercent = Math.min(100, Math.max(10, Math.round(((tempValue - 250) / (250)) * 100)));

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-white/10 pb-6">
          <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
            MAILLARD SCIENCE
          </h2>
          <span
            className="font-sans text-xs uppercase font-bold px-4 py-1.5 rounded-full border shadow"
            style={{
              backgroundColor: "#15803D15",
              color: "#15803D",
              borderColor: "#15803D40",
            }}
          >
            Craft Standard
          </span>
        </div>

        {/* Interactive Temperature Simulator Card */}
        <div className="p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-wider font-bold" style={{ color: "#15803D" }}>
                Interactive Heat Control
              </span>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                FLAT-TOP TEMPERATURE & CARAMELIZATION GAUGE
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-sans text-3xl font-black" style={{ color: "#15803D" }}>
                {tempValue}°F
              </span>
            </div>
          </div>

          {/* Custom Range Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="250"
              max="500"
              step="5"
              value={tempValue}
              onChange={(e) => setTempValue(Number(e.target.value))}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-white transition-all"
            />
            <div className="flex justify-between text-xs font-sans text-stone-400 font-semibold">
              <span>250°F (Low)</span>
              <span style={{ color: "#15803D" }}>450°F (Optimal Craft)</span>
              <span>500°F (Max)</span>
            </div>
          </div>

          {/* Telemetry Gauges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-sans">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-stone-300">Crust Caramelization</span>
                <span className="font-bold" style={{ color: "#15803D" }}>{crustPercent}%</span>
              </div>
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${crustPercent}%`, backgroundColor: "#15803D" }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-stone-300">Juice Retention</span>
                <span className="font-bold" style={{ color: "#15803D" }}>
                  {Math.max(60, 100 - Math.round(crustPercent * 0.25))}%
                </span>
              </div>
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.max(60, 100 - Math.round(crustPercent * 0.25))}%`,
                    backgroundColor: "#15803D",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Clean Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider block" style={{ color: "#15803D" }}>
              01. Stage
            </span>
            <h4 className="type-display text-xl text-white font-bold">
              Steel Press Weight
            </h4>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider block" style={{ color: "#15803D" }}>
              02. Stage
            </span>
            <h4 className="type-display text-xl text-white font-bold">
              450°F Sear Surface
            </h4>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider block" style={{ color: "#15803D" }}>
              03. Stage
            </span>
            <h4 className="type-display text-xl text-white font-bold">
              Butter Toasted Roll
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
