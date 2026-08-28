"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Pairing {
  id: string;
  number: string;
  title: string;
  tag: string;
  category: string;
  price: number;
  image: string;
  companionImage: string;
  companionName: string;
  companionPrice: number;
  flavorProfile: { label: string; value: number }[];
}

export default function ArchetypeShowcase() {
  const [selectedPairing, setSelectedPairing] = useState<number>(0);
  const [isMatched, setIsMatched] = useState(false);

  const pairings: Pairing[] = [
    {
      id: "pair-1",
      number: "01",
      title: "French Black Truffle Glaze",
      tag: "HAUTE FOREST MUSHROOM",
      category: "Double Smash & Shake",
      price: 340,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      companionImage: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
      companionName: "Lotus Biscoff Speculoos Malt",
      companionPrice: 220,
      flavorProfile: [
        { label: "Savory Umami", value: 96 },
        { label: "Caramelized Crisp", value: 92 },
        { label: "Velvet Sweet Finish", value: 88 },
      ],
    },
    {
      id: "pair-2",
      number: "02",
      title: "24K Gold Wagyu Lamination",
      tag: "AKAUSHI RESERVE",
      category: "Prime Wagyu & Animal Fries",
      price: 490,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
      companionImage: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
      companionName: "Loaded Animal Crinkle Fries",
      companionPrice: 210,
      flavorProfile: [
        { label: "Prime Marble Density", value: 98 },
        { label: "Butter Lamination", value: 94 },
        { label: "Cheese Viscosity", value: 90 },
      ],
    },
    {
      id: "pair-3",
      number: "03",
      title: "Aged Belgian Speculoos Malt",
      tag: "SIGNATURE BISCOFF",
      category: "Artisanal Dessert Malt & Smash",
      price: 240,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
      companionImage: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
      companionName: "OG Double Smash",
      companionPrice: 280,
      flavorProfile: [
        { label: "Gelato Churn Density", value: 95 },
        { label: "Caramel Biscuit Crunch", value: 91 },
        { label: "Sweet Cream Richness", value: 89 },
      ],
    },
  ];

  const current = pairings[selectedPairing];

  const handleMatch = () => {
    setIsMatched(true);
    setTimeout(() => setIsMatched(false), 2000);
  };

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10 select-none overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-sans text-xs uppercase font-bold tracking-widest block" style={{ color: "#F26522" }}>
              CURATED PAIRINGS
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-extrabold mt-1 tracking-tight">
              THE PAIRING SELECTOR
            </h2>
          </div>
        </div>

        {/* Interactive Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
          {pairings.map((p, idx) => {
            const isSelected = selectedPairing === idx;
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setSelectedPairing(idx)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="p-5 rounded-2xl border text-left transition-all backdrop-blur-xl flex flex-col justify-between space-y-2 shadow-xl"
                style={{
                  backgroundColor: isSelected ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  borderColor: isSelected ? "#F26522" : "rgba(255,255,255,0.1)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{ color: isSelected ? "#F26522" : "#FAF8F2" }}
                  >
                    {p.number}. {p.title}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: isSelected ? "#F26522" : "rgba(255,255,255,0.2)" }}
                  />
                </div>
                <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                  {p.tag}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Pairing Studio Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans"
          >
            {/* Visual Side-by-Side Dual Imagery */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl group">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 font-sans">
                  <p className="text-white font-bold text-xs leading-tight">{current.title}</p>
                  <p className="font-bold text-[11px]" style={{ color: "#F26522" }}>₹{current.price}</p>
                </div>
              </div>

              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl group">
                <Image
                  src={current.companionImage}
                  alt={current.companionName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 font-sans">
                  <p className="text-white font-bold text-xs leading-tight">{current.companionName}</p>
                  <p className="font-bold text-[11px]" style={{ color: "#F26522" }}>₹{current.companionPrice}</p>
                </div>
              </div>
            </div>

            {/* Flavor Metrics & Match Action */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: "#F26522" }}>
                  {current.category}
                </span>
                <h3 className="type-display text-3xl text-white font-black leading-tight mt-1">
                  {current.title}
                </h3>
              </div>

              <div className="space-y-3 font-sans">
                {current.flavorProfile.map((fp, fIdx) => (
                  <div key={fIdx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-300">{fp.label}</span>
                      <span className="font-bold" style={{ color: "#F26522" }}>{fp.value}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${fp.value}%`, backgroundColor: "#F26522" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleMatch}
                className="w-full py-4 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 hover:brightness-110 hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ backgroundColor: "#F26522", color: "#FFFFFF" }}
              >
                <span>{isMatched ? "✓ Pairing Matched & Saved" : `Match Pairing (₹${current.price + current.companionPrice})`}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
