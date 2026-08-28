"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HowWeSmash() {
  const [tempValue, setTempValue] = useState(450);
  const crustPercent = Math.min(100, Math.max(10, Math.round(((tempValue - 200) / 300) * 100)));

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              THE ARTISANAL SIZZLE CRAFT
            </h2>
          </div>
          <span
            className="text-xs uppercase font-bold px-4 py-1.5 rounded-full border shadow"
            style={{
              backgroundColor: "#BF570015",
              color: "#BF5700",
              borderColor: "#BF570040",
            }}
          >
            100% MASTER CRAFT
          </span>
        </div>

        {/* Interactive Temperature & Sear Simulator Card */}
        <div className="p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                FLAT-TOP TEMPERATURE & MAILLARD CRUST GAUGE
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black font-sans" style={{ color: "#BF5700" }}>
                {tempValue}°F
              </span>
              <span
                className="text-xs px-2.5 py-1 rounded border uppercase font-bold"
                style={{
                  backgroundColor: "#BF570020",
                  color: "#BF5700",
                  borderColor: "#BF570040",
                }}
              >
                {tempValue >= 450 ? "Optimal Crisp" : tempValue >= 350 ? "Standard Sear" : "Slow Temp"}
              </span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-2 pt-2">
            <input
              type="range"
              min={200}
              max={500}
              step={5}
              value={tempValue}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTempValue(val);
                if (val >= 440 && (window as any).playSizzleSound) {
                  (window as any).playSizzleSound();
                }
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/20"
              style={{ accentColor: "#BF5700" }}
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-sans font-medium">
              <span>200°F (Slow Steam)</span>
              <span style={{ color: "#BF5700" }} className="font-bold">450°F (Optimal Crisp Sear)</span>
              <span>500°F (Maximum Char)</span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs text-stone-300 font-sans">
                <span>Crispy Caramelized Sear</span>
                <span className="text-white font-bold">{crustPercent}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#BF5700" }}
                  animate={{ width: `${crustPercent}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs text-stone-300 font-sans">
                <span>Flavor &amp; Juice Retention</span>
                <span className="text-white font-bold">
                  {tempValue >= 420 && tempValue <= 480 ? "98% (Sealed In)" : "72%"}
                </span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#BF5700" }}
                  animate={{ width: tempValue >= 420 && tempValue <= 480 ? "98%" : "72%" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
