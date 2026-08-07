"use client";

import { useState } from "react";
import Image from "next/image";

const HOTSPOTS = [
  {
    id: "camera",
    x: "28%",
    y: "32%",
    title: "108MP Periscope Triad",
    desc: "Three eyes suspended in laser-etched titanium rings, seeing what the human eye cannot perceive.",
  },
  {
    id: "chip",
    x: "56%",
    y: "24%",
    title: "2-Nanometer Neural Core",
    desc: "A city of 15 billion transistors, each one a billion decisions per second. Yours.",
  },
  {
    id: "battery",
    x: "54%",
    y: "50%",
    title: "Solid-State Graphene Matrix",
    desc: "Energy drawn from the lattice of carbon itself. Never sleeps. Never weakens.",
  },
  {
    id: "frame",
    x: "72%",
    y: "72%",
    title: "Monolithic Titanium Chassis",
    desc: "One piece, CNC-milled from a single billet. The skeleton that outlives its owner.",
  },
];

export default function HotspotExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="bg-white text-[#1d1d1f] bg-elemental-grid py-28 px-6 border-t border-black/5 relative z-30 bg-noise">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 max-w-xl select-none">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-[#f5f5f7] px-3.5 py-1 shadow-sm">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#d4a574]">
              04 / CHAMBER INSPECTION
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#1d1d1f] md:text-6xl uppercase leading-none">
            The <br />
            <span className="text-black/25">Anatomy</span> <br />
            of Obsession.
          </h2>
          <p className="mt-6 text-xs sm:text-sm text-[#1d1d1f]/75 leading-relaxed font-mono font-light">
            Every chamber holds a secret. Touch the nodes to unlock the machine&apos;s inner sanctum.
          </p>

          <div className="mt-12 min-h-[170px] border border-black/5 bg-[#f5f5f7] shadow-md p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#d4a574]" />
            {activeId ? (
              (() => {
                const active = HOTSPOTS.find((h) => h.id === activeId);
                return (
                  <div key={active?.id}>
                    <span className="font-mono text-[9px] uppercase text-[#d4a574] font-extrabold tracking-widest block mb-1">
                      Module Specification
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#1d1d1f] uppercase">{active?.title}</h3>
                    <p className="mt-2 text-xs text-[#1d1d1f]/70 leading-relaxed font-mono font-light">{active?.desc}</p>
                  </div>
                );
              })()
            ) : (
              <div className="text-center py-4 text-[10px] text-[#1d1d1f]/45 font-mono tracking-widest uppercase font-bold">
                [ SELECT A NODE TO INITIALIZE INSPECTION ]
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 w-full max-w-2xl relative aspect-square border border-black/5 bg-[#f5f5f7] p-6 shadow-md flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/images/exploded-elemental.png"
              alt="Exploded product chassis schematic"
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 800px"
              priority
            />

            {HOTSPOTS.map((h) => {
              const isActive = activeId === h.id;

              return (
                <button
                  key={h.id}
                  onClick={() => setActiveId(isActive ? null : h.id)}
                  onMouseEnter={() => setActiveId(h.id)}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ top: h.y, left: h.x }}
                  data-cursor="hover"
                  data-cursor-label="INSPECT"
                >
                  <span className={`absolute inset-0 rounded-full bg-[#d4a574]/20 transition-transform duration-500 ${isActive ? "scale-150 opacity-100" : "scale-100 opacity-65 group-hover:scale-125"}`} />
                  <span className={`block w-3.5 h-3.5 rounded-full border-2 border-[#d4a574] transition-all duration-300 ${isActive ? "bg-[#d4a574] scale-110" : "bg-black/35 group-hover:bg-[#d4a574]"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
