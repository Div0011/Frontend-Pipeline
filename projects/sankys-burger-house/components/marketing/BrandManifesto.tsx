"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import DecryptedText from "@/components/ui/DecryptedText";

interface PillarSpec {
  id: string;
  number: string;
  title: string;
  badge: string;
  summary: string;
  details: string;
  stats: { label: string; value: string; progress: number }[];
  image: string;
  hotspots: { x: number; y: number; label: string; note: string }[];
}

export default function BrandManifesto() {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"spec" | "compare">("spec");
  const [isSizzling, setIsSizzling] = useState(false);

  const pillars: PillarSpec[] = [
    {
      id: "pillar-1",
      number: "01",
      title: "HEAVY STEEL SMASH",
      badge: "450°F CAST IRON",
      summary: "200 lbs of steel press weight flattening coarse beef against searing cast iron.",
      details: "By applying immense downward pressure with a precision cast-iron smash tool, we maximize contact surface area with the 450°F steel, triggering immediate Maillard protein caramelization to produce ultra-crisp, savory lace edges.",
      stats: [
        { label: "Sear Heat", value: "450°F", progress: 95 },
        { label: "Maillard Crust Density", value: "98.6%", progress: 98 },
        { label: "Lace Edge Thickness", value: "1.2 mm", progress: 90 },
      ],
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 35, y: 48, label: "Lacy Caramelized Crust", note: "Razor-thin crispy outer perimeter created on red-hot searing iron." },
        { x: 62, y: 38, label: "Fresh Premium Grind", note: "Coarse prime cuts for maximum juicy fat rendering." },
        { x: 48, y: 72, label: "Rendered Pan Jus", note: "Seared in its natural juices for peak savory intensity." }
      ]
    },
    {
      id: "pillar-2",
      number: "02",
      title: "SQUISHY POTATO ROLLS",
      badge: "CULTURED BUTTER",
      summary: "Plush Pennsylvania potato rolls toasted in cultured sweet cream butter.",
      details: "We toast authentic plush potato brioche rolls on a dedicated 380°F butter plate until an impenetrable golden crust forms, engineered to catch savory meat drippings without ever getting soggy.",
      stats: [
        { label: "Toasting Surface Temp", value: "380°F", progress: 85 },
        { label: "Pillow Softness Score", value: "99.4%", progress: 99 },
        { label: "Butter Lamination", value: "Pure Sweet Cream", progress: 92 },
      ],
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 50, y: 25, label: "Golden Butter Toast", note: "Caramelized with sweet cream butter on flat-top steel." },
        { x: 50, y: 80, label: "Cloud Soft Crumb", note: "Engineered to absorb savory juices while staying feather-light." }
      ]
    },
    {
      id: "pillar-3",
      number: "03",
      title: "CRAFT DIPS & SHAKES",
      badge: "HAND-SPUN",
      summary: "Hand-spun gelato malts, molten animal fries, and house relish emulsions.",
      details: "From slow-churned Madagascar vanilla bean gelato whipped with rich ingredients to triple-cooked Idaho crinkle fries tossed in molten American cheddar and secret sauce, every side is designed to hit with maximum flavor impact.",
      stats: [
        { label: "Gelato Churn Rate", value: "Slow Batch", progress: 90 },
        { label: "Cheese Sauce Viscosity", value: "Liquid Velvet", progress: 96 },
        { label: "House Sauce Complexity", value: "14 Ingredients", progress: 88 },
      ],
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 42, y: 35, label: "Artisanal Emulsion", note: "Handcrafted in small batches daily." },
        { x: 55, y: 65, label: "Rich Dairy Foundation", note: "Slow-churned premium cream." }
      ]
    }
  ];

  const current = pillars[activePillar];

  return (
    <section className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* 1. Header & Decrypted Typewriter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10" style={{ backgroundColor: "#FFE500" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#FFE500" }}>
                <DecryptedText
                  text="THE LATE-NIGHT CULT BURGER GARAGE · HENNUR"
                  speed={35}
                  maxIterations={10}
                  animateOn="view"
                />
              </span>
            </div>
            <h2 className="type-display text-3xl sm:text-5xl md:text-6xl text-white font-extrabold leading-tight">
              THICK FLUFFY PATTIES ARE BORING. <br />
              WE BELIEVE IN THE 
              <ShinyText
                text="UNDERGROUND MONSTER SMASH CRUST"
                speed={3}
                shimmerColor="#FFE500"
                className="font-extrabold"
              /> 
              <br className="hidden sm:inline" />
              OF DUAL THIN PATTIES SMASHED WITH STEEL.
            </h2>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode("spec")}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: viewMode === "spec" ? "#FFE500" : "transparent",
                color: viewMode === "spec" ? "#000000" : "#FAF8F2",
              }}
            >
              🔬 Specimen Lab
            </button>
            <button
              type="button"
              onClick={() => setViewMode("compare")}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: viewMode === "compare" ? "#FFE500" : "transparent",
                color: viewMode === "compare" ? "#000000" : "#FAF8F2",
              }}
            >
              ⚡ Craft vs Mass Duel
            </button>
          </div>
        </div>

        {/* 2. Interactive Specimen Lab Mode */}
        {viewMode === "spec" && (
          <div className="space-y-10">
            {/* 3 Pillar Selectable Interactive Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((p, idx) => {
                const isSelected = activePillar === idx;
                return (
                  <motion.div
                    key={p.id}
                    onClick={() => {
                      setActivePillar(idx);
                      setActiveHotspot(0);
                    }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-md border flex flex-col justify-between space-y-4 shadow-xl"
                    style={{
                      backgroundColor: isSelected ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                      borderColor: isSelected ? "#FFE500" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-xs font-extrabold tracking-widest"
                        style={{ color: isSelected ? "#FFE500" : "#A8A29E" }}
                      >
                        {p.number} // {p.title}
                      </span>
                      <span
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: isSelected ? "#FFE50020" : "rgba(255,255,255,0.05)",
                          color: isSelected ? "#FFE500" : "#D6D3D1",
                          borderColor: isSelected ? "#FFE50040" : "rgba(255,255,255,0.1)",
                        }}
                      >
                        {p.badge}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 font-body leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono">
                      <span className="font-mono text-xs" style={{ color: isSelected ? "#FFE500" : "#78716C", fontWeight: isSelected ? 700 : 400 }}>
                        {isSelected ? "● ACTIVE SPECIMEN" : "○ CLICK TO INSPECT"}
                      </span>
                      <span className="text-stone-400">→</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Live Interactive Specimen Stage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-2xl items-center"
              >
                {/* Left: Interactive Image with Interactive Hotspot Radar */}
                <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/60 group">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Hotspots */}
                  {current.hotspots.map((h, hIdx) => {
                    const isActive = activeHotspot === hIdx;
                    return (
                      <div
                        key={hIdx}
                        style={{ left: `${h.x}%`, top: `${h.y}%` }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(hIdx)}
                          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border text-xs font-mono font-bold transition-transform hover:scale-125 shadow-2xl cursor-pointer"
                          style={{
                            borderColor: "#FFE500",
                            color: "#FFE500",
                          }}
                        >
                          <span className="w-2.5 h-2.5 rounded-full animate-ping absolute inset-0 m-auto opacity-75" style={{ backgroundColor: "#FFE500" }} />
                          <span>{hIdx + 1}</span>
                        </button>
                      </div>
                    );
                  })}

                  {/* Active Hotspot Preview Toast Overlay */}
                  {activeHotspot !== null && current.hotspots[activeHotspot] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 backdrop-blur-xl border shadow-2xl space-y-1 z-30"
                      style={{ borderColor: "#FFE50060" }}
                    >
                      <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider" style={{ color: "#FFE500" }}>
                        <span>[PIN {activeHotspot + 1}]</span>
                        <span>{current.hotspots[activeHotspot].label}</span>
                      </div>
                      <p className="text-xs text-stone-200 font-mono">
                        {current.hotspots[activeHotspot].note}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Right: Technical Specifications & Telemetry */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FFE500" }} />
                      <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#FFE500" }}>
                        ENGINEERING SPECIFICATION // {current.number}
                      </span>
                    </div>
                    <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                      {current.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 font-body leading-relaxed">
                      {current.details}
                    </p>
                  </div>

                  {/* Telemetry Progress Bars */}
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    <span className="font-mono text-[10px] text-stone-400 tracking-wider uppercase block">
                      CULINARY QUALITY INDICES
                    </span>
                    {current.stats.map((st, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-300">{st.label}</span>
                          <span className="font-bold" style={{ color: "#FFE500" }}>{st.value}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${st.progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: "#FFE500" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Micro-Interaction: Sizzle Test */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs font-bold text-white block">
                        HEAT &amp; SEAR SIMULATOR
                      </span>
                      <span className="font-mono text-[10px] text-stone-400 block">
                        {isSizzling ? "🔥 High-heat contact engaged..." : "Tap to simulate flat-top sear contact"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSizzling(true);
                        setTimeout(() => setIsSizzling(false), 2000);
                      }}
                      className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 hover:brightness-110"
                      style={{
                        backgroundColor: "#FFE500",
                        color: "#000000",
                      }}
                    >
                      {isSizzling ? "ENGAGED!" : "TEST SEAR"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* 3. Interactive Comparison Duel */}
        {viewMode === "compare" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* The Generic / Mass Produced (Flawed) */}
            <div className="p-8 rounded-3xl bg-red-500/[0.04] border border-red-500/20 backdrop-blur-xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
                  ❌ BLAND & UNEVEN
                </span>
                <span className="font-mono text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                  BLAND &amp; UNEVEN
                </span>
              </div>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                THICK 200g GREY PATTY
              </h3>
              <ul className="space-y-3 font-mono text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Steamed interior with zero Maillard crust.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Dry, dense sesame bun that disintegrates under sauce.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Cold, unmelted processed cheese slice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Unpleasant meat-to-bun ratio that falls apart.</span>
                </li>
              </ul>
            </div>

            {/* Our Signature (Superior) */}
            <div
              className="p-8 rounded-3xl bg-white/[0.05] border backdrop-blur-xl space-y-6 shadow-2xl ring-1"
              style={{
                borderColor: "#FFE50060",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "#FFE500" }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#FFE500" }} />
                  ✅ SANKY'S BURGER HOUSE STANDARD
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "#FFE500", color: "#000000" }}>
                  CRAFT SPEC
                </span>
              </div>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                DUAL LACY SANKY'S BURGER HOUSE SMASH
              </h3>
              <ul className="space-y-3 font-mono text-xs text-stone-200">
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{ color: "#FFE500" }}>✓</span>
                  <span>200 lbs steel press produces paper-thin crunchy lace edges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{ color: "#FFE500" }}>✓</span>
                  <span>Sweet cream butter griddled Martin's potato rolls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{ color: "#FFE500" }}>✓</span>
                  <span>Steam dome bath for instantaneous liquid cheese melt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{ color: "#FFE500" }}>✓</span>
                  <span>Perfect golden ratio of crust, fat, sauce, and bun in every bite.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
