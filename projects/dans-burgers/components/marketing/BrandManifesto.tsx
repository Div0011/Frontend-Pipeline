"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

interface PillarSpec {
  id: string;
  number: string;
  title: string;
  badge: string;
  stats: { label: string; value: string; progress: number }[];
  image: string;
  hotspots: { x: number; y: number; label: string }[];
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
      stats: [
        { label: "Sear Heat", value: "450°F", progress: 95 },
        { label: "Maillard Crust Index", value: "98.6%", progress: 98 },
        { label: "Lace Thickness", value: "1.2 mm", progress: 90 },
      ],
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 35, y: 48, label: "Lacy Caramelized Crust" },
        { x: 62, y: 38, label: "Fresh Premium Grind" },
        { x: 48, y: 72, label: "Rendered Pan Jus" }
      ]
    },
    {
      id: "pillar-2",
      number: "02",
      title: "SQUISHY POTATO ROLLS",
      badge: "CULTURED BUTTER",
      stats: [
        { label: "Toasting Temp", value: "380°F", progress: 85 },
        { label: "Pillow Softness", value: "99.4%", progress: 99 },
        { label: "Lamination", value: "Sweet Cream Butter", progress: 92 },
      ],
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 50, y: 25, label: "Golden Butter Toast" },
        { x: 50, y: 80, label: "Cloud Soft Crumb" }
      ]
    },
    {
      id: "pillar-3",
      number: "03",
      title: "CRAFT MALTS & SIDES",
      badge: "HAND-SPUN",
      stats: [
        { label: "Gelato Churn", value: "Slow Batch", progress: 90 },
        { label: "Melt Viscosity", value: "Liquid Velvet", progress: 96 },
        { label: "Animal Sauce", value: "House Emulsion", progress: 88 },
      ],
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 42, y: 35, label: "Artisanal Emulsion" },
        { x: 55, y: 65, label: "Rich Dairy Base" }
      ]
    }
  ];

  const current = pillars[activePillar];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-white font-black leading-tight tracking-tight">
              <ShinyText text="THE 450°F STEEL SMASH STANDARD." speed={3} shimmerColor="#D97706" className="font-black" />
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode("spec")}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
              style={{
                backgroundColor: viewMode === "spec" ? "#D97706" : "transparent",
                color: viewMode === "spec" ? "#FFFFFF" : "#FAF8F2",
              }}
            >
              Specimen
            </button>
            <button
              type="button"
              onClick={() => setViewMode("compare")}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
              style={{
                backgroundColor: viewMode === "compare" ? "#D97706" : "transparent",
                color: viewMode === "compare" ? "#FFFFFF" : "#FAF8F2",
              }}
            >
              Duel
            </button>
          </div>
        </div>

        {/* Specimen View */}
        {viewMode === "spec" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pillars.map((p, idx) => {
                const isSelected = activePillar === idx;
                return (
                  <motion.div
                    key={p.id}
                    onClick={() => {
                      setActivePillar(idx);
                      setActiveHotspot(0);
                    }}
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl cursor-pointer transition-all backdrop-blur-md border flex items-center justify-between shadow-xl"
                    style={{
                      backgroundColor: isSelected ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                      borderColor: isSelected ? "#D97706" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <span
                      className="font-mono text-xs font-extrabold tracking-wider"
                      style={{ color: isSelected ? "#D97706" : "#FAF8F2" }}
                    >
                      {p.number} // {p.title}
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: isSelected ? "#D9770620" : "rgba(255,255,255,0.05)",
                        color: isSelected ? "#D97706" : "#A8A29E",
                        borderColor: isSelected ? "#D9770640" : "rgba(255,255,255,0.1)",
                      }}
                    >
                      {p.badge}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Specimen Stage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/15 shadow-2xl items-center"
              >
                {/* Left: Image with Hotspots */}
                <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-white/15 bg-black/60 group">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {current.hotspots.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveHotspot(hIdx)}
                        className="flex items-center justify-center w-7 h-7 rounded-full bg-black/80 border text-xs font-mono font-bold hover:scale-110 transition-transform shadow-2xl"
                        style={{ borderColor: "#D97706", color: "#D97706" }}
                      >
                        {hIdx + 1}
                      </button>
                    </div>
                  ))}

                  {activeHotspot !== null && current.hotspots[activeHotspot] && (
                    <div
                      className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/90 backdrop-blur-md border font-mono text-xs font-bold uppercase tracking-wider"
                      style={{ borderColor: "#D9770640", color: "#D97706" }}
                    >
                      [LAYER {activeHotspot + 1}] {current.hotspots[activeHotspot].label}
                    </div>
                  )}
                </div>

                {/* Right: Metrics & Sear Test */}
                <div className="lg:col-span-5 space-y-6">
                  <h3 className="type-display text-3xl text-white font-extrabold">
                    {current.title}
                  </h3>

                  <div className="space-y-3">
                    {current.stats.map((st, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-400">{st.label}</span>
                          <span className="font-bold" style={{ color: "#D97706" }}>{st.value}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${st.progress}%`, backgroundColor: "#D97706" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSizzling(true);
                      setTimeout(() => setIsSizzling(false), 1500);
                    }}
                    className="w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 hover:brightness-110"
                    style={{ backgroundColor: "#D97706", color: "#FFFFFF" }}
                  >
                    {isSizzling ? "SEARING 450°F..." : "TEST FLAT-TOP SEAR"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Duel View */}
        {viewMode === "compare" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-red-500/[0.04] border border-red-500/20 backdrop-blur-xl space-y-4">
              <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider block">
                MASS PRODUCTION
              </span>
              <ul className="space-y-2 font-mono text-xs text-stone-300">
                • Steamed interior, zero Maillard crust
                • Dense dry bun, collapses under sauce
                • Cold unmelted cheese slice
              </ul>
            </div>

            <div
              className="p-6 rounded-2xl bg-white/[0.04] border backdrop-blur-xl space-y-4"
              style={{ borderColor: "#D9770640" }}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider block" style={{ color: "#D97706" }}>
                OUR CRAFT SPEC
              </span>
              <ul className="space-y-2 font-mono text-xs text-stone-200">
                • 450°F cast iron crispy lace edges
                • Sweet cream butter toasted potato roll
                • Steam dome molten cheese melt
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
