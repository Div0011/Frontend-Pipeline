"use client";

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
