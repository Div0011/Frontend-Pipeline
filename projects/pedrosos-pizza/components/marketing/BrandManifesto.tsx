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
      title: "72-HR FERMENTED DOUGH",
      badge: "900°F WOOD FIRE",
      summary: "Double zero Italian flour naturally leavened for 72 hours for airy leopard-spotted cornicione.",
      details: "Our sourdough starter undergoes slow cold-temperature fermentation, yielding complex lactic notes and micro-air pockets that flash-expand in our 900°F stone oven in under 90 seconds.",
      stats: [
        { label: "Oven Deck Temp", value: "900°F", progress: 95 },
        { label: "Fermentation Time", value: "72 Hours", progress: 98 },
        { label: "Hydration Index", value: "78% Double Zero", progress: 90 },
      ],
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 35, y: 48, label: "Lacy Caramelized Crust", note: "Razor-thin crispy outer perimeter created on red-hot searing iron." },
        { x: 62, y: 38, label: "Fresh Premium Grind", note: "Coarse prime cuts for maximum juicy fat rendering." },
        { x: 48, y: 72, label: "Rendered Pan Jus", note: "Seared in its natural juices for peak savory intensity." }
      ]
    },
    {
      id: "pillar-2",
      number: "02",
      title: "SAN MARZANO D.O.P.",
      badge: "MT. VESUVIUS VOLCANIC SOIL",
      summary: "Sun-ripened certified San Marzano plum tomatoes crushed with sea salt and fresh basil.",
      details: "Grown in nutrient-rich volcanic soil in Campania, hand-crushed raw to preserve bright acidity and natural sweetness without artificial paste or added sugar.",
      stats: [
        { label: "Tomato Origin", value: "Campania D.O.P.", progress: 85 },
        { label: "Brix Sweetness", value: "14.2° Natural", progress: 99 },
        { label: "Raw Crush Ratio", value: "100% Uncooked", progress: 92 },
      ],
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 50, y: 25, label: "Golden Butter Toast", note: "Caramelized with sweet cream butter on flat-top steel." },
        { x: 50, y: 80, label: "Cloud Soft Crumb", note: "Engineered to absorb savory juices while staying feather-light." }
      ]
    },
    {
      id: "pillar-3",
      number: "03",
      title: "FIOR DI LATTE & STRACCIATELLA",
      badge: "FRESH WATER BUFFALO",
      summary: "Artisanal pulled mozzarella and creamy stracciatella melted to stringy perfection.",
      details: "Crafted daily from fresh morning milk, delivering clean milky richness that caramelizes into golden blisters over wood embers.",
      stats: [
        { label: "Melt Viscosity", value: "Liquid Cream", progress: 90 },
        { label: "Moisture Balance", value: "Zero Base Sog", progress: 96 },
        { label: "Char Blister Score", value: "99.1%", progress: 88 },
      ],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
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
              <span className="h-[2px] w-10" style={{ backgroundColor: "#B91C1C" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#B91C1C" }}>
                <DecryptedText
                  text="GRANDMA SQUARES & ROMAN STYLE PIZZA · AUSTIN"
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
                text="SLOW-FERMENTED ROMAN CRISP CRUST"
                speed={3}
                shimmerColor="#B91C1C"
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
                backgroundColor: viewMode === "spec" ? "#B91C1C" : "transparent",
                color: viewMode === "spec" ? "#FFFFFF" : "#FAF8F2",
              }}
            >
              🔬 Specimen Lab
            </button>
            <button
              type="button"
              onClick={() => setViewMode("compare")}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: viewMode === "compare" ? "#B91C1C" : "transparent",
                color: viewMode === "compare" ? "#FFFFFF" : "#FAF8F2",
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
                      borderColor: isSelected ? "#B91C1C" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-xs font-extrabold tracking-widest"
                        style={{ color: isSelected ? "#B91C1C" : "#A8A29E" }}
                      >
                        {p.number} // {p.title}
                      </span>
                      <span
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: isSelected ? "#B91C1C20" : "rgba(255,255,255,0.05)",
                          color: isSelected ? "#B91C1C" : "#D6D3D1",
                          borderColor: isSelected ? "#B91C1C40" : "rgba(255,255,255,0.1)",
                        }}
                      >
                        {p.badge}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 font-body leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono">
                      <span className="font-mono text-xs" style={{ color: isSelected ? "#B91C1C" : "#78716C", fontWeight: isSelected ? 700 : 400 }}>
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
                            borderColor: "#B91C1C",
                            color: "#B91C1C",
                          }}
                        >
                          <span className="w-2.5 h-2.5 rounded-full animate-ping absolute inset-0 m-auto opacity-75" style={{ backgroundColor: "#B91C1C" }} />
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
                      style={{ borderColor: "#B91C1C60" }}
                    >
                      <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider" style={{ color: "#B91C1C" }}>
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
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#B91C1C" }} />
                      <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#B91C1C" }}>
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
                          <span className="font-bold" style={{ color: "#B91C1C" }}>{st.value}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${st.progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: "#B91C1C" }}
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
                        backgroundColor: "#B91C1C",
                        color: "#FFFFFF",
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
                  ❌ MASS COMMERCIAL SLICES
                </span>
                <span className="font-mono text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                  BLAND &amp; UNEVEN
                </span>
              </div>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                THICK HEAVY CARDBOARD PIZZA
              </h3>
              <ul className="space-y-3 font-mono text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Dense, under-proofed heavy dough that sits like a brick.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Canned sugary tomato paste loaded with preservatives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Artificial powdered cheese that turns oily and rubbery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Soggy center with zero crust blisters or airy structure.</span>
                </li>
              </ul>
            </div>

            {/* Our Signature (Superior) */}
            <div
              className="p-8 rounded-3xl bg-white/[0.05] border backdrop-blur-xl space-y-6 shadow-2xl ring-1"
              style={{
                borderColor: "#B91C1C60",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "#B91C1C" }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#B91C1C" }} />
                  ✅ PEDROSO'S PIZZA STANDARD
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "#B91C1C", color: "#FFFFFF" }}>
                  CRAFT SPEC
                </span>
              </div>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                PEDROSO'S PIZZA WOOD-FIRED CRAFT
              </h3>
              <ul className="space-y-3 font-mono text-xs text-stone-200">
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{ color: "#B91C1C" }}>✓</span>
                  <span>72-hour naturally leavened dough with airy leopard blisters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{ color: "#B91C1C" }}>✓</span>
                  <span>100% raw crushed San Marzano D.O.P. plum tomatoes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{ color: "#B91C1C" }}>✓</span>
                  <span>Fresh artisan Fior di Latte melted on 900°F stone deck.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold" style={{ color: "#B91C1C" }}>✓</span>
                  <span>Perfect balance of crisp charred bite and chewy crumb.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
