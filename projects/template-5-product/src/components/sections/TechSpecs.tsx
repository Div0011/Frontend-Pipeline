"use client";

import { useState } from "react";

const FINISHES = [
  { id: "titanium", name: "Void Polished", hex: "#ffffff", price: "$1,299" },
  { id: "obsidian", name: "Mirror Eclipsed", hex: "#27272a", price: "$1,349" },
  { id: "silver", name: "Ghost Mercury", hex: "#d4d4d8", price: "$1,399" },
];

const SPECS_GRID = [
  { label: "Structural Constitution", value: "Grade-5 Titanium & Pure Ceramic Glass" },
  { label: "Neural Conscience", value: "4nm Quantum Octa-Core (45 TOPs AI Engine)" },
  { label: "Tactile Vocabulary", value: "< 0.4ms Ultralow Latency Resonant Motor" },
  { label: "Energy Reservoir", value: "Solid-State Graphene Pack (4,500 mAh)" },
  { label: "Environmental Resistance", value: "IP68 Submersible (10 meters depth)" },
  { label: "Thermal Intelligence", value: "Vapor Chamber Dual Liquid Loop" },
];

export default function TechSpecs() {
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [preorderSuccess, setPreorderSuccess] = useState(false);

  return (
    <section className="bg-[#f5f5f7] text-[#1d1d1f] px-6 py-28 md:px-16 border-t border-black/5 relative z-30 font-mono bg-noise">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 border border-black/5 bg-white p-8 md:p-12 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d4a574] font-extrabold">
                05 / THE FINAL FORM
              </span>
              <h3 className="mt-2 font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1d1d1f]">
                Forge Your Instrument
              </h3>
              <p className="mt-2 text-xs text-[#1d1d1f]/70 font-mono">
                Each finish is not a surface. It is a mood. A decision about how the world sees you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {FINISHES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinish(f)}
                    className={`group flex items-center gap-3 border px-4 py-3 font-mono text-xs uppercase font-bold transition-all duration-300 cursor-pointer ${
                      selectedFinish.id === f.id
                        ? "border-[#d4a574] bg-[#d4a574] text-white shadow-md"
                        : "border-black/5 bg-[#f5f5f7] text-[#1d1d1f]/75 hover:border-[#d4a574] hover:text-[#1d1d1f]"
                    }`}
                    data-cursor="hover"
                    data-cursor-label="SELECT"
                  >
                    <span
                      className="h-4 w-4 border border-black/10 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: f.hex }}
                    />
                    <span>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-black/5 bg-[#f5f5f7] text-[#1d1d1f] p-6 text-right min-w-[280px] shadow-sm">
              <div className="font-mono text-[10px] text-[#1d1d1f]/50 uppercase tracking-widest">Configuration Price</div>
              <div className="mt-1 font-display text-4xl font-extrabold text-[#d4a574]">{selectedFinish.price}</div>
              <p className="mt-1 font-mono text-[9px] text-[#1d1d1f]/70 uppercase">Includes 2-Year Apex Care+</p>

              <button
                onClick={() => setPreorderSuccess(true)}
                className="mt-6 w-full bg-[#d4a574] hover:bg-[#e0b98a] text-white font-mono text-xs font-bold uppercase tracking-widest py-3.5 transition-all cursor-pointer active:scale-95 shadow-sm shadow-[#d4a574]/15"
                data-cursor="hover"
                data-cursor-label="INITIATE"
              >
                {preorderSuccess ? "✓ Covenant Sealed" : "Initiate Covenant →"}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3.5 py-1 shadow-sm mb-4">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#d4a574]">
              06 / CORE ARCHITECTURE
            </span>
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight md:text-5xl text-[#1d1d1f]">
            Raw Architecture
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SPECS_GRID.map((spec, i) => (
              <div
                key={i}
                className="border border-black/5 bg-white p-6 transition-all duration-300 hover:border-[#d4a574]/40 shadow-sm"
              >
                <div className="font-mono text-[10px] uppercase text-[#1d1d1f]/50 font-bold">{spec.label}</div>
                <div className="mt-2 font-display text-base font-bold text-[#1d1d1f]">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
