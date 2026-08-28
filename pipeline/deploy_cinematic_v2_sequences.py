#!/usr/bin/env python3
"""
Cinematic Website Architecture v2 - Implementation Script
Integrates the 3 Signature Sequences without touching:
1. Footer.tsx (100% UNCHANGED)
2. Frame Scroll / CanvasScrubber.tsx (100% UNCHANGED)

Sequences:
- Sequence A: SignatureDeconstruct.tsx (Beyondburg Inc, Dirty Martin's, Pedroso's Pizza, Burger Seigneur)
- Sequence B: OriginTimeSlip.tsx (Dan's Hamburgers, Casino El Camino, Pool Burger, Sour Duck Market)
- Sequence C: CraftMatrixBuilder.tsx (Truffles Bangalore, JewBoy Burgers, Good Flippin' Burgers, NADC Burger, Burger Elite, Biggies Burger)
"""

import os
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

# ─────────────────────────────────────────────────────────────────────────────
# 1. SEQUENCE A: DECONSTRUCTION & REVEAL (SignatureDeconstruct.tsx)
# ─────────────────────────────────────────────────────────────────────────────
DECONSTRUCT_CODE = '''"use client";

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
'''

# ─────────────────────────────────────────────────────────────────────────────
# 2. SEQUENCE B: TEMPORAL / HERITAGE TIME-SLIP (OriginTimeSlip.tsx)
# ─────────────────────────────────────────────────────────────────────────────
TIMESLIP_CODE = '''"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Era {
  year: string;
  label: string;
  priceNote: string;
  story: string;
  image: string;
  sepiaLevel: number;
  grainLevel: number;
}

interface OriginTimeSlipProps {
  brandName?: string;
  primaryColor?: string;
  foundingYear?: string;
  eras?: Era[];
}

const DEFAULT_ERAS: Era[] = [
  {
    year: "1973",
    label: "THE ORIGINAL FLAT-TOP",
    priceNote: "BURGERS WERE $0.45",
    story: "Dan began grinding fresh Angus chuck every morning at 5:00 AM on South Lamar. Seasoned cast iron, hand-sliced onions, and paper wraps.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    sepiaLevel: 100,
    grainLevel: 80,
  },
  {
    year: "1998",
    label: "THE JALAPEÑO DISCIPLINE",
    priceNote: "BURGERS WERE $2.25",
    story: "Introducing fresh grilled Texas jalapeños and signature curly paprika fries. The Austin secret spread through word-of-mouth.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    sepiaLevel: 45,
    grainLevel: 40,
  },
  {
    year: "2026",
    label: "PRESENT DAY ATELIER",
    priceNote: "THE 50-YEAR LEGEND",
    story: "Over five decades later, the exact same grind ratio, seasoned griddles, and commitment to uncompromised Texas burger craft.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80",
    sepiaLevel: 0,
    grainLevel: 0,
  },
];

export default function OriginTimeSlip({
  brandName = "Dan's Hamburgers",
  primaryColor = "#EF4444",
  foundingYear = "1973",
  eras = DEFAULT_ERAS,
}: OriginTimeSlipProps) {
  const [selectedEra, setSelectedEra] = useState<number>(0);
  const current = eras[selectedEra];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 border-b border-black/10 dark:border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Beat 1: Establish */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-500">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <span>ORIGIN ACT 01 · CHRONOLOGICAL TIME-SLIP</span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl md:text-7xl font-black text-black dark:text-white leading-none tracking-tight">
              THE HERITAGE ARCHIVE
            </h2>
            <p className="type-serif text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              Scrub backwards through time to explore five decades of cast-iron history and unchanged recipes.
            </p>
          </div>

          {/* Time Dial Pills */}
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/10 p-1.5 rounded-full border border-black/10 dark:border-white/15">
            {eras.map((era, idx) => {
              const isSelected = selectedEra === idx;
              return (
                <button
                  key={era.year}
                  onClick={() => {
                    if ((window as any).playPopSound) (window as any).playPopSound();
                    setSelectedEra(idx);
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-mono font-black tracking-widest transition-all ${
                    isSelected
                      ? "shadow-md scale-105"
                      : "text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
                  }`}
                  style={{
                    backgroundColor: isSelected ? primaryColor : "transparent",
                    color: isSelected ? "#FFFFFF" : undefined,
                  }}
                >
                  {era.year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Beat 2: Interrogate (Time-Slip Canvas + Film Grain Shift) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Archival Story Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full border border-black/15 dark:border-white/20 font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
              {current.priceNote}
            </div>

            <h3 className="type-display text-3xl sm:text-5xl font-black text-black dark:text-white leading-tight">
              {current.label}
            </h3>

            <p className="type-serif text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
              {current.story}
            </p>

            <div className="flex items-center gap-6 pt-2 font-mono text-xs text-stone-400">
              <span>FILM GRADE: {current.sepiaLevel}% SEPIA</span>
              <span>·</span>
              <span>AUTHENTIC CAST IRON</span>
            </div>
          </div>

          {/* Time-Slip Graded Visual */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-black/15 dark:border-white/20 shadow-2xl">
            <motion.div
              key={current.year}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
              style={{
                filter: `sepia(${current.sepiaLevel}%) contrast(${100 + current.grainLevel * 0.2}%)`,
              }}
            >
              <Image
                src={current.image}
                alt={current.label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white font-mono text-xs">
                <span className="font-bold tracking-widest">ARCHIVAL RECORD · {current.year}</span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                  {current.priceNote}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Beat 3: Invite */}
        <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-8">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
            TASTE 50 YEARS OF UNCHANGED TEXAS DISCIPLINE
          </span>
          <Link
            href="/menu"
            className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
            style={{ backgroundColor: primaryColor, color: "#FFFFFF" }}
          >
            <span>Order The Classic</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
'''

# ─────────────────────────────────────────────────────────────────────────────
# 3. SEQUENCE C: CRAFT MATRIX BUILDER (CraftMatrixBuilder.tsx)
# ─────────────────────────────────────────────────────────────────────────────
BUILDER_CODE = '''"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Option {
  name: string;
  price: number;
  cals: number;
  tag: string;
}

interface Step {
  stepName: string;
  options: Option[];
}

interface CraftMatrixBuilderProps {
  brandName?: string;
  primaryColor?: string;
  currency?: string;
}

const BUILDER_STEPS: Step[] = [
  {
    stepName: "01. CHOOSE YOUR BUN FOUNDATION",
    options: [
      { name: "Toasted Butter Brioche", price: 0, cals: 180, tag: "Signature" },
      { name: "Steamed Martin's Potato Bun", price: 20, cals: 150, tag: "Ultra Soft" },
      { name: "Crisp Butter Lettuce Wrap", price: 0, cals: 25, tag: "Keto / Low-Carb" },
    ],
  },
  {
    stepName: "02. SELECT PATTY ARCHITECTURE",
    options: [
      { name: "Double Angus Beef Smash (450°F)", price: 240, cals: 420, tag: "Prime Sear" },
      { name: "Triple Spiced Lamb Smash", price: 310, cals: 490, tag: "House Blend" },
      { name: "Buttermilk Fried Crispy Chicken", price: 220, cals: 380, tag: "24-Hr Brined" },
      { name: "Crusted Portobello & Herb Paneer", price: 200, cals: 310, tag: "Vegetarian" },
    ],
  },
  {
    stepName: "03. MOLTEN CHEESE EMULSION",
    options: [
      { name: "Double Melted American Cheese", price: 50, cals: 120, tag: "Classic" },
      { name: "Aged Sharp Cheddar & Pepper Jack", price: 60, cals: 140, tag: "Bold Spice" },
      { name: "French Truffle Brie Melt", price: 80, cals: 160, tag: "Gourmet Luxe" },
    ],
  },
  {
    stepName: "04. ARTISANAL SAUCE EMULSION",
    options: [
      { name: "House Truffle Mustard Mayo", price: 30, cals: 90, tag: "Chef Secret" },
      { name: "Habanero Hot Honey Glaze", price: 30, cals: 70, tag: "Sweet Heat" },
      { name: "Smoky Hickory BBQ Relish", price: 25, cals: 60, tag: "Smoked" },
    ],
  },
];

export default function CraftMatrixBuilder({
  brandName = "Truffles",
  primaryColor = "#FFE500",
  currency = "₹",
}: CraftMatrixBuilderProps) {
  const [selections, setSelections] = useState<number[]>([0, 0, 0, 0]);

  const totalPrice = selections.reduce((acc, optIdx, stepIdx) => {
    return acc + BUILDER_STEPS[stepIdx].options[optIdx].price;
  }, 0);

  const totalCals = selections.reduce((acc, optIdx, stepIdx) => {
    return acc + BUILDER_STEPS[stepIdx].options[optIdx].cals;
  }, 0);

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 border-b border-black/10 dark:border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Beat 1: Establish */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-stone-500">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <span>CRAFT ACT 03 · THE INTERACTIVE BUILD MATRIX</span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl md:text-7xl font-black text-black dark:text-white leading-none tracking-tight">
              CUSTOM CRAFT STATION
            </h2>
            <p className="type-serif text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              Assemble your bespoke smash configuration with live nutritional telemetry and precision pricing.
            </p>
          </div>

          {/* Running Macro Telemetry */}
          <div className="flex items-center gap-4 bg-black/5 dark:bg-white/10 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/15">
            <div className="text-xs font-mono">
              <span className="text-stone-400">CALORIES: </span>
              <span className="font-bold text-black dark:text-white">{totalCals} kcal</span>
            </div>
            <span className="text-stone-400">·</span>
            <div className="text-xs font-mono">
              <span className="text-stone-400">ESTIMATED TOTAL: </span>
              <span className="font-bold font-mono text-sm" style={{ color: primaryColor }}>
                {currency}{totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Beat 2: Interrogate (Matrix Steps + Live Receipt Breakdown) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 4-Step Builder */}
          <div className="lg:col-span-8 space-y-8">
            {BUILDER_STEPS.map((step, stepIdx) => (
              <div key={step.stepName} className="space-y-3">
                <h3 className="font-mono text-xs font-black uppercase tracking-wider text-stone-400">
                  {step.stepName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.options.map((opt, optIdx) => {
                    const isSelected = selections[stepIdx] === optIdx;
                    return (
                      <div
                        key={opt.name}
                        onClick={() => {
                          if ((window as any).playPopSound) (window as any).playPopSound();
                          const next = [...selections];
                          next[stepIdx] = optIdx;
                          setSelections(next);
                        }}
                        className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                          isSelected
                            ? "bg-black/5 dark:bg-white/10 border-black/30 dark:border-white/40 shadow-md scale-[1.01]"
                            : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-stone-600 dark:text-stone-400"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-sans font-bold text-sm text-black dark:text-white">
                            {opt.name}
                          </span>
                          <span
                            className="font-mono text-xs font-bold"
                            style={{ color: isSelected ? primaryColor : undefined }}
                          >
                            {opt.price === 0 ? "INCLUDED" : `+${currency}${opt.price}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mt-2">
                          <span>{opt.tag}</span>
                          <span>{opt.cals} kcal</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Live Order Receipt Ticket */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#121212] border-2 border-white/15 shadow-2xl text-white space-y-6 sticky top-24">
            <div className="border-b border-white/15 pb-4 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400">
                ATELIER SPEC TICKET
              </span>
              <h4 className="type-display text-2xl font-black" style={{ color: primaryColor }}>
                CUSTOM BUILD #042
              </h4>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {BUILDER_STEPS.map((step, idx) => {
                const opt = step.options[selections[idx]];
                return (
                  <div key={step.stepName} className="flex justify-between items-start gap-2">
                    <span className="text-stone-400 leading-tight">{opt.name}</span>
                    <span className="font-bold flex-shrink-0">
                      {opt.price === 0 ? "—" : `${currency}${opt.price}`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-dashed border-white/20 pt-4 flex justify-between items-baseline font-mono">
              <span className="text-xs uppercase font-bold text-stone-300">TOTAL ESTIMATE</span>
              <span className="text-2xl font-black" style={{ color: primaryColor }}>
                {currency}{totalPrice}
              </span>
            </div>

            <button
              onClick={() => {
                if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                alert(`Custom burger configuration sent to kitchen! Total: ${currency}${totalPrice}`);
              }}
              className="w-full py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-xl hover:brightness-110 active:scale-95 text-black"
              style={{ backgroundColor: primaryColor }}
            >
              Order Custom Build →
            </button>
          </div>
        </div>

        {/* Beat 3: Invite */}
        <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-8">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
            OR EXPLORE OUR CURATED CHEF SPECIALTIES ON THE MENU
          </span>
          <Link
            href="/menu"
            className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 border border-black/20 dark:border-white/20"
          >
            <span>View Full Menu</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
'''

SEQUENCE_ASSIGNMENTS = {
    # Sequence A: Deconstruction & Reveal
    "beyondburg-inc": {"seq": "A", "dish": "THE PRIME TRUFFLE DOUBLE SMASH", "color": "#22C55E"},
    "dirty-martins": {"seq": "A", "dish": "THE 1926 OT SPECIAL SMASH", "color": "#E5A93C"},
    "pedrosos-pizza": {"seq": "A", "dish": "THE CRISPY GRANDMA CRUST DECK", "color": "#F2C777"},
    "burger-seigneur": {"seq": "A", "dish": "THE LUCIEN FRENCH BRIE BURGER", "color": "#55A630"},

    # Sequence B: Origin Time-Slip
    "dans-burgers": {"seq": "B", "year": "1973", "color": "#EF4444"},
    "casino-el-camino": {"seq": "B", "year": "1994", "color": "#EF4444"},
    "pool-burger": {"seq": "B", "year": "2017", "color": "#38BDF8"},
    "sour-duck-market": {"seq": "B", "year": "2018", "color": "#E5A93C"},

    # Sequence C: Craft Matrix Builder
    "truffles-bangalore": {"seq": "C", "color": "#FFE500", "curr": "₹"},
    "jewboy-burgers": {"seq": "C", "color": "#FFFFFF", "curr": "$"},
    "good-flippin-burgers": {"seq": "C", "color": "#F59E0B", "curr": "₹"},
    "nadc-burger": {"seq": "C", "color": "#EF4444", "curr": "$"},
    "burger-elite": {"seq": "C", "color": "#22C55E", "curr": "₹"},
    "biggies-burger": {"seq": "C", "color": "#FFE500", "curr": "₹"},
}

def deploy_sequence(project_dir: Path):
    pname = project_dir.name
    cfg = SEQUENCE_ASSIGNMENTS.get(pname, {"seq": "C", "color": "#FFE500", "curr": "$"})
    seq_type = cfg["seq"]

    comp_dir = project_dir / "components" / "marketing"
    comp_dir.mkdir(parents=True, exist_ok=True)

    if seq_type == "A":
        comp_file = comp_dir / "SignatureDeconstruct.tsx"
        comp_file.write_text(DECONSTRUCT_CODE)
        print(f"  ✓ Deployed SignatureDeconstruct.tsx to {pname}")
    elif seq_type == "B":
        comp_file = comp_dir / "OriginTimeSlip.tsx"
        comp_file.write_text(TIMESLIP_CODE)
        print(f"  ✓ Deployed OriginTimeSlip.tsx to {pname}")
    elif seq_type == "C":
        comp_file = comp_dir / "CraftMatrixBuilder.tsx"
        comp_file.write_text(BUILDER_CODE)
        print(f"  ✓ Deployed CraftMatrixBuilder.tsx to {pname}")

    # Inject component into app/page.tsx without altering Footer or FrameScrubber
    page_file = project_dir / "app" / "page.tsx"
    if page_file.exists():
        txt = page_file.read_text()
        
        if seq_type == "A" and "SignatureDeconstruct" not in txt:
            txt = txt.replace('import SignatureMenu from "@/components/marketing/SignatureMenu";',
                              'import SignatureMenu from "@/components/marketing/SignatureMenu";\nimport SignatureDeconstruct from "@/components/marketing/SignatureDeconstruct";')
            txt = txt.replace('<SignatureMenu />',
                              f'<SignatureDeconstruct primaryColor="{cfg.get("color", "#22C55E")}" />\n        <SignatureMenu />')
            page_file.write_text(txt)
            print(f"  ✓ Injected SignatureDeconstruct into {pname} page.tsx")
            
        elif seq_type == "B" and "OriginTimeSlip" not in txt:
            txt = txt.replace('import SignatureMenu from "@/components/marketing/SignatureMenu";',
                              'import SignatureMenu from "@/components/marketing/SignatureMenu";\nimport OriginTimeSlip from "@/components/marketing/OriginTimeSlip";')
            txt = txt.replace('<SignatureMenu />',
                              f'<OriginTimeSlip primaryColor="{cfg.get("color", "#EF4444")}" foundingYear="{cfg.get("year", "1973")}" />\n        <SignatureMenu />')
            page_file.write_text(txt)
            print(f"  ✓ Injected OriginTimeSlip into {pname} page.tsx")
            
        elif seq_type == "C" and "CraftMatrixBuilder" not in txt:
            txt = txt.replace('import SignatureMenu from "@/components/marketing/SignatureMenu";',
                              'import SignatureMenu from "@/components/marketing/SignatureMenu";\nimport CraftMatrixBuilder from "@/components/marketing/CraftMatrixBuilder";')
            txt = txt.replace('<SignatureMenu />',
                              f'<CraftMatrixBuilder primaryColor="{cfg.get("color", "#FFE500")}" currency="{cfg.get("curr", "$")}" />\n        <SignatureMenu />')
            page_file.write_text(txt)
            print(f"  ✓ Injected CraftMatrixBuilder into {pname} page.tsx")

def main():
    print("🚀 Deploying Cinematic v2 Sequences across all projects (Preserving Footer & Frame Scroll)...")
    for project_dir in sorted(PROJECTS_DIR.iterdir()):
        if not project_dir.is_dir() or project_dir.name in ["fabroar", "superfan-redesign", "smash-guys"]:
            continue
        deploy_sequence(project_dir)
    print("🎉 All Cinematic v2 Sequences deployed successfully!")

if __name__ == "__main__":
    main()
