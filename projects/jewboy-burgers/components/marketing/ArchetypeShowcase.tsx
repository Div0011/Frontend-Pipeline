"use client";


import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ArchetypeShowcase() {
  const [activeReceipt, setActiveReceipt] = useState(false);

  const milestones = [
    { year: "2016", event: "Founding Flat-Top Seasoned", desc: "First burger served with the original family spice formula." },
    { year: "1995", event: "Austin Iconic Landmark Status", desc: "Recognized as a premier city culinary institution." },
    { year: "2024", event: "Centennial Craft Mastery", desc: "Over a million legendary burgers griddled on cast iron." }
  ];

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#0a0a0c] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#06B6D4" }}>
              ARCHIVAL RETRO MILESTONES
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold mt-1">
              HERITAGE &amp; TIMELESS CRAFT
            </h2>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <span className="type-display text-3xl font-black" style={{ color: "#06B6D4" }}>
                {m.year}
              </span>
              <h4 className="font-mono font-bold text-sm uppercase text-white">
                {m.event}
              </h4>
              <p className="text-xs text-stone-400 font-body leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
