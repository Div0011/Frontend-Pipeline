"use client";


import React from "react";

export default function ArchetypeShowcase() {
  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#0a0a0d] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-emerald-400">
                LIVE GARAGE STATUS · ACTIVE NOW
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold">
              THE UNDERGROUND CULT KITCHEN
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-400">
            OPEN UNTIL 2:30 AM · Kammanahalli
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-mono text-[10px] uppercase text-stone-500">CAST-IRON TEMPERATURE</span>
            <p className="type-display text-3xl font-bold" style={{ color: "#DC2626" }}>485°F HIGH SEAR</p>
            <p className="text-xs text-stone-400">Continuous sizzling cast-iron surface for instant Maillard crust.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-mono text-[10px] uppercase text-stone-500">LATE-NIGHT SERVICE</span>
            <p className="type-display text-3xl font-bold" style={{ color: "#DC2626" }}>TILL 2:30 AM</p>
            <p className="text-xs text-stone-400">Serving midnight cravings across Kammanahalli every night.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-mono text-[10px] uppercase text-stone-500">MONSTER PATTY WEIGHT</span>
            <p className="type-display text-3xl font-bold" style={{ color: "#DC2626" }}>100% PRIME CUTS</p>
            <p className="text-xs text-stone-400">Double thick patties layered with melted cheese and monster sauce.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
