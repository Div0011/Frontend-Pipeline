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
      title: "72-HR FERMENTED DOUGH",
      badge: "900°F WOOD FIRE",
      stats: [
        { label: "Deck Temp", value: "900°F", progress: 95 },
        { label: "Fermentation", value: "72 Hours", progress: 98 },
        { label: "Hydration", value: "78% Double Zero", progress: 90 },
      ],
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 35, y: 48, label: "Lacy Caramelized Crust" },
        { x: 62, y: 38, label: "Fresh Premium Grind" },
        { x: 48, y: 72, label: "Rendered Pan Jus" }
      ]
    },
    {
      id: "pillar-2",
      number: "02",
      title: "SAN MARZANO D.O.P.",
      badge: "RAW CRUSH",
      stats: [
        { label: "Origin", value: "Campania D.O.P.", progress: 85 },
        { label: "Sweetness", value: "Natural 14.2°", progress: 99 },
        { label: "Purity", value: "100% Uncooked", progress: 92 },
      ],
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 50, y: 25, label: "Golden Butter Toast" },
        { x: 50, y: 80, label: "Cloud Soft Crumb" }
      ]
    },
    {
      id: "pillar-3",
      number: "03",
      title: "FIOR DI LATTE",
      badge: "ARTISANAL",
      stats: [
        { label: "Viscosity", value: "Liquid Cream", progress: 90 },
        { label: "Melt Index", value: "Zero Soggy Base", progress: 96 },
        { label: "Char Score", value: "99.1%", progress: 88 },
      ],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
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
              <ShinyText text="WOOD-FIRED PIZZA CRAFT." speed={3} shimmerColor="#B91C1C" className="font-black" />
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode("spec")}
              className="px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
              style={{
                backgroundColor: viewMode === "spec" ? "#B91C1C" : "transparent",
                color: viewMode === "spec" ? "#FFFFFF" : "#FAF8F2",
              }}
            >
              Specimen
            </button>
            <button
              type="button"
              onClick={() => setViewMode("compare")}
              className="px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
              style={{
                backgroundColor: viewMode === "compare" ? "#B91C1C" : "transparent",
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
                      borderColor: isSelected ? "#B91C1C" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <span
                      className="font-sans text-xs font-extrabold tracking-wider"
                      style={{ color: isSelected ? "#B91C1C" : "#FAF8F2" }}
                    >
                      {p.number} // {p.title}
                    </span>
                    <span
                      className="text-[10px] font-sans px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: isSelected ? "#B91C1C20" : "rgba(255,255,255,0.05)",
                        color: isSelected ? "#B91C1C" : "#A8A29E",
                        borderColor: isSelected ? "#B91C1C40" : "rgba(255,255,255,0.1)",
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
                        className="flex items-center justify-center w-7 h-7 rounded-full bg-black/80 border text-xs font-sans font-bold hover:scale-110 transition-transform shadow-2xl"
                        style={{ borderColor: "#B91C1C", color: "#B91C1C" }}
                      >
                        {hIdx + 1}
                      </button>
                    </div>
                  ))}

                  {activeHotspot !== null && current.hotspots[activeHotspot] && (
                    <div
                      className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/90 backdrop-blur-md border font-sans text-xs font-bold uppercase tracking-wider"
                      style={{ borderColor: "#B91C1C40", color: "#B91C1C" }}
                    >
                      Layer {activeHotspot + 1}: {current.hotspots[activeHotspot].label}
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
                        <div className="flex justify-between text-xs font-sans">
                          <span className="text-stone-400">{st.label}</span>
                          <span className="font-bold" style={{ color: "#B91C1C" }}>{st.value}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${st.progress}%`, backgroundColor: "#B91C1C" }}
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
                    className="w-full py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 hover:brightness-110"
                    style={{ backgroundColor: "#B91C1C", color: "#FFFFFF" }}
                  >
                    {isSizzling ? "FIRING 900°F..." : "TEST 900°F FIRE"}
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
              <span className="font-sans text-xs font-bold text-red-400 uppercase tracking-wider block">
                MASS PRODUCTION
              </span>
              <ul className="space-y-2 font-sans text-xs text-stone-300">
                • Dense, under-proofed heavy dough
                • Canned sugary tomato paste
                • Artificial rubbery cheese
              </ul>
            </div>

            <div
              className="p-6 rounded-2xl bg-white/[0.04] border backdrop-blur-xl space-y-4"
              style={{ borderColor: "#B91C1C40" }}
            >
              <span className="font-sans text-xs font-bold uppercase tracking-wider block" style={{ color: "#B91C1C" }}>
                OUR CRAFT SPEC
              </span>
              <ul className="space-y-2 font-sans text-xs text-stone-200">
                • 72-hour naturally leavened dough
                • 100% raw San Marzano D.O.P. tomatoes
                • Artisan Fior di Latte on 900°F deck
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
