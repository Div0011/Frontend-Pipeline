"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Layer {
  name: string;
  role: string;
  metric: string;
  desc: string;
  image: string;
}

interface SignatureDeconstructProps {
  brandName?: string;
  dishName?: string;
  primaryColor?: string;
  layers?: Layer[];
}

const DEFAULT_LAYERS: Layer[] = [
  {
    name: "Golden Brioche Crown",
    role: "AERATION & TEXTURE",
    metric: "0.85 SPECIFIC DENSITY",
    desc: "Butter-rich French brioche toasted on clarified ghee until a caramelized crunch barrier forms.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
  },
  {
    name: "Molten Aged Cheddar & Pickles",
    role: "ACIDITY & EMULSION",
    metric: "165°F MELT POINT",
    desc: "Aged sharp Wisconsin cheddar draped over crinkle-cut lacto-fermented dill gherkins.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  },
  {
    name: "Cast-Iron Smashed Patty",
    role: "MAILLARD CRUST",
    metric: "450°F SEAR · 60 SEC",
    desc: "Coarse ground prime Angus pressed paper-thin into seasoned cast iron for maximum lace perimeter.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80",
  },
  {
    name: "House Secret Sauce & Relish",
    role: "SAVORY UMAMI BASE",
    metric: "12-HR CURED INFUSION",
    desc: "Smoked paprika, roasted garlic confit, and fermented chili paste emulsion.",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&q=80",
  },
  {
    name: "Steamed Potato Heel Bun",
    role: "STRUCTURAL FOUNDATION",
    metric: "HEATED TO 140°F",
    desc: "Soft absorbent heel bun designed to capture rendered jus without compromising structural integrity.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
  },
];

export default function SignatureDeconstruct({
  brandName = "ATELIER",
  dishName = "THE SIGNATURE DOUBLE SMASH",
  primaryColor = "#22C55E",
  layers = DEFAULT_LAYERS,
}: SignatureDeconstructProps) {
  const [activeLayer, setActiveLayer] = useState<number>(2);
  const [isExploded, setIsExploded] = useState<boolean>(true);

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 border-b border-black/10 dark:border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Beat 1: Establish */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-500">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <span>CRAFT ACT 02 · ARCHITECTURAL DECONSTRUCTION</span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl md:text-7xl font-black text-black dark:text-white leading-none tracking-tight">
              {dishName}
            </h2>
            <p className="type-serif text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              Every layer calibrated for thermal transfer, savory balance, and crunch acoustics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExploded(!isExploded)}
              className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white"
              style={{
                backgroundColor: isExploded ? primaryColor : "transparent",
                color: isExploded ? "#000000" : undefined,
              }}
            >
              {isExploded ? "Exploded Layer View [ON]" : "Exploded Layer View [OFF]"}
            </button>
          </div>
        </div>

        {/* Beat 2: Interrogate (Exploded Stack + HUD Telemetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Layer Selector & Details */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block font-bold">
              SELECT LAYER TO INSPECT TELEMETRY:
            </span>
            <div className="space-y-2">
              {layers.map((layer, idx) => {
                const isSelected = activeLayer === idx;
                return (
                  <div
                    key={layer.name}
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setActiveLayer(idx);
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                      isSelected
                        ? "bg-black/5 dark:bg-white/10 border-black/30 dark:border-white/30 shadow-md scale-[1.01]"
                        : "border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.03] text-stone-600 dark:text-stone-400"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="font-mono text-xs font-black w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: isSelected ? primaryColor : "rgba(128,128,128,0.2)",
                            color: isSelected ? "#000000" : undefined,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <h3 className="font-sans font-bold text-sm sm:text-base text-black dark:text-white">
                          {layer.name}
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-stone-400">
                        {layer.metric}
                      </span>
                    </div>
                    {isSelected && (
                      <p className="type-serif text-xs text-stone-600 dark:text-stone-300 mt-2 pl-7 leading-relaxed">
                        {layer.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3D Visual Exploded Stack Display */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[540px] rounded-3xl bg-black/5 dark:bg-[#121212] border border-black/10 dark:border-white/15 overflow-hidden flex flex-col justify-center items-center p-8">
            <div className="relative w-full max-w-sm h-full flex flex-col justify-between py-6">
              {layers.map((layer, idx) => {
                const isSelected = activeLayer === idx;
                const offset = isExploded ? (idx - 2) * 28 : 0;
                return (
                  <motion.div
                    key={layer.name}
                    animate={{
                      y: offset,
                      scale: isSelected ? 1.08 : 1,
                      filter: activeLayer !== null && !isSelected ? "blur(1px) opacity(60%)" : "blur(0px) opacity(100%)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={() => setActiveLayer(idx)}
                    className="relative cursor-pointer group"
                  >
                    <div
                      className={`p-3 rounded-2xl flex items-center justify-between gap-4 border transition-all ${
                        isSelected
                          ? "bg-white dark:bg-[#1C1C1C] border-black/30 dark:border-white/40 shadow-xl"
                          : "bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-black/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden relative flex-shrink-0 bg-stone-800">
                          <Image src={layer.image} alt={layer.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                            {layer.role}
                          </span>
                          <span className="font-sans font-bold text-xs sm:text-sm text-black dark:text-white">
                            {layer.name}
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-1 rounded border"
                        style={{
                          borderColor: isSelected ? primaryColor : "rgba(128,128,128,0.2)",
                          color: isSelected ? primaryColor : undefined,
                        }}
                      >
                        {layer.metric}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Beat 3: Invite */}
        <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-8">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
            EXPLORE THE FULL SPECIFICATION ON OUR MENU SHEET
          </span>
          <Link
            href="/menu"
            className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
            style={{ backgroundColor: primaryColor, color: "#000000" }}
          >
            <span>View Full Menu</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
