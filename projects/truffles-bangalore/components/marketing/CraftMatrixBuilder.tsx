"use client";

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
