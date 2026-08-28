"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
        { x: 62, y: 38, label: "Dual Prime Coarse Grind" },
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
        { label: "Spin Viscosity", value: "100% Velvet", progress: 96 },
        { label: "Reduction Density", value: "Double Puree", progress: 94 },
        { label: "Gelato Base", value: "Madagascar Vanilla", progress: 90 },
      ],
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        { x: 50, y: 20, label: "Caramelized Cookie Dust" },
        { x: 50, y: 55, label: "Double Cream Reduction" }
      ]
    }
  ];

  const current = pillars[activePillar];

  return (
    <section
      id="manifesto-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10 select-none font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-white [html.light_&]:text-stone-950 font-black leading-tight tracking-tight">
              THE 450°F STEEL SMASH STANDARD.
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 [html.light_&]:bg-black/5 border border-white/15 [html.light_&]:border-black/10 backdrop-blur-xl self-start md:self-end shadow-xl">
            <button
              type="button"
              onClick={() => setViewMode("spec")}
              className="px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              style={{
                backgroundColor: viewMode === "spec" ? "#E67E22" : "transparent",
                color: viewMode === "spec" ? "#000000" : undefined,
              }}
            >
              Specimen
            </button>
            <button
              type="button"
              onClick={() => setViewMode("compare")}
              className="px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              style={{
                backgroundColor: viewMode === "compare" ? "#E67E22" : "transparent",
                color: viewMode === "compare" ? "#000000" : undefined,
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
                    className={`p-5 rounded-2xl cursor-pointer transition-all backdrop-blur-xl border flex items-center justify-between shadow-xl ${
                      isSelected
                        ? "border-[#E67E22] bg-white/[0.08] [html.light_&]:bg-white [html.light_&]:border-[#E67E22]"
                        : "border-white/10 [html.light_&]:border-black/10 bg-white/[0.03] [html.light_&]:bg-white/60"
                    }`}
                  >
                    <span
                      className={`font-sans text-xs font-extrabold tracking-wider ${
                        isSelected
                          ? "text-[#E67E22] [html.light_&]:text-stone-950"
                          : "text-[#FAF8F2] [html.light_&]:text-stone-700"
                      }`}
                    >
                      {p.number}. {p.title}
                    </span>
                    <span
                      className="text-[10px] font-sans px-2.5 py-0.5 rounded-full border font-semibold"
                      style={{
                        backgroundColor: isSelected ? "#E67E2220" : "rgba(255,255,255,0.05)",
                        color: isSelected ? "#E67E22" : undefined,
                        borderColor: isSelected ? "#E67E2240" : "rgba(255,255,255,0.1)",
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
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-white/[0.03] [html.light_&]:bg-white/80 backdrop-blur-2xl border border-white/15 [html.light_&]:border-black/10 shadow-2xl items-center"
              >
                {/* Left: Image with Hotspots */}
                <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-white/15 bg-black/60 group shadow-2xl dark-frame">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border text-xs font-sans font-bold hover:scale-110 transition-transform shadow-2xl"
                        style={{ borderColor: "#E67E22", color: "#E67E22" }}
                      >
                        {hIdx + 1}
                      </button>
                    </div>
                  ))}

                  {activeHotspot !== null && current.hotspots[activeHotspot] && (
                    <div
                      className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/90 backdrop-blur-md border font-sans text-xs font-bold uppercase tracking-wider shadow-xl"
                      style={{ borderColor: "#E67E2240", color: "#E67E22" }}
                    >
                      Layer {activeHotspot + 1}: {current.hotspots[activeHotspot].label}
                    </div>
                  )}
                </div>

                {/* Right: Metrics & Sear Test */}
                <div className="lg:col-span-5 space-y-6">
                  <h3 className="type-display text-3xl text-white [html.light_&]:text-stone-950 font-extrabold">
                    {current.title}
                  </h3>

                  <div className="space-y-3 font-sans">
                    {current.stats.map((st, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-stone-400 [html.light_&]:text-stone-600">{st.label}</span>
                          <span className="font-bold [html.light_&]:text-stone-950" style={{ color: "#E67E22" }}>{st.value}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 [html.light_&]:bg-black/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${st.progress}%`, backgroundColor: "#E67E22" }}
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
                    className="w-full py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 hover:brightness-110 hover:scale-[1.02] text-black"
                    style={{ backgroundColor: "#E67E22" }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white/[0.04] [html.light_&]:bg-white/80 border border-white/15 [html.light_&]:border-black/10 backdrop-blur-xl shadow-2xl space-y-4">
              <span className="text-xs uppercase font-extrabold [html.light_&]:text-stone-950 block" style={{ color: "#E67E22" }}>
                OUR CAST-IRON SMASH
              </span>
              <h3 className="type-display text-2xl text-white [html.light_&]:text-stone-950 font-bold">
                450°F STEEL HIGH-HEAT PRESS
              </h3>
              <p className="text-xs text-stone-300 [html.light_&]:text-[#2A2A2A] leading-relaxed font-body">
                Smashed ultra-thin on screaming hot steel for complete Maillard caramelization and crunchy lace edges.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] [html.light_&]:bg-stone-100 border border-white/5 [html.light_&]:border-black/5 opacity-75 space-y-4">
              <span className="text-xs uppercase font-extrabold text-stone-500 block">
                STANDARD THICK BURGER
              </span>
              <h3 className="type-display text-2xl text-stone-400 [html.light_&]:text-[#2A2A2A] font-bold">
                MILD-HEAT STEAM COOK
              </h3>
              <p className="text-xs text-stone-400 [html.light_&]:text-stone-600 leading-relaxed font-body">
                Thick dense patty with minimal surface caramelization and soft steamed exterior.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
