"use client";


import React, { useState } from "react";

export default function ArchetypeShowcase() {
  const [activeCrust, setActiveCrust] = useState("roman");

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#09090b] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#B91C1C" }}>
              NATURAL FERMENTATION &amp; DECK SCIENCE
            </span>
            <h2 className="type-display text-4xl sm:text-5xl text-white font-bold mt-1">
              THE ARTISANAL CRUST LAB
            </h2>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <span className="type-display text-4xl font-black" style={{ color: "#B91C1C" }}>72 Hours</span>
            <h4 className="font-mono font-bold text-sm uppercase text-white">COLD DOUGH FERMENTATION</h4>
            <p className="text-xs text-stone-400">Breaks down complex gluten structures for an ultra-light, airy, crisp crumb.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <span className="type-display text-4xl font-black" style={{ color: "#B91C1C" }}>650°F</span>
            <h4 className="font-mono font-bold text-sm uppercase text-white">REFRACTORY STONE DECK</h4>
            <p className="text-xs text-stone-400">Direct contact heat baking that produces intense bottom crunch &amp; leopard spots.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <span className="type-display text-4xl font-black" style={{ color: "#B91C1C" }}>100% D.O.P.</span>
            <h4 className="font-mono font-bold text-sm uppercase text-white">AUTHENTIC SAN MARZANO</h4>
            <p className="text-xs text-stone-400">Hand-crushed Campania tomatoes paired with whole milk mozzarella.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
