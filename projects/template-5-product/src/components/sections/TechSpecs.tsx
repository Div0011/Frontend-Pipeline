"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FINISHES = [
  { id: "titanium", name: "Void Polished", hex: "#e8e6e1", price: "$1,299" },
  { id: "obsidian", name: "Mirror Eclipsed", hex: "#1a1a1c", price: "$1,349" },
  { id: "silver", name: "Ghost Mercury", hex: "#9ca3af", price: "$1,399" },
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
  const sectionRef = useRef<HTMLElement>(null);
  const forgeRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (forgeRef.current) {
        gsap.fromTo(
          forgeRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: forgeRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      }

      if (specsRef.current) {
        gsap.fromTo(
          specsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: specsRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="covenant"
      ref={sectionRef}
      className="relative z-30 border-t border-white/5 bg-[#050506] px-6 py-32 font-mono text-[#f3f1ec] md:px-16 bg-noise"
    >
      <div className="absolute inset-0 bg-elemental-grid opacity-35" aria-hidden="true" />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,166,107,0.1)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          ref={forgeRef}
          className="relative mb-24 overflow-hidden border border-white/10 bg-[#0c0c0e]/90 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-12 opacity-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(201,166,107,0.08),transparent_50%)]" />
          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
            <div>
              <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.3em] text-[#c9a66b]">
                05 / The Final Form
              </span>
              <h3 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-[#f3f1ec] md:text-5xl">
                Forge Your Instrument
              </h3>
              <p className="mt-3 max-w-lg font-mono text-xs font-light text-[#f3f1ec]/50">
                Each finish is not a surface. It is a mood — a decision about how
                the world sees you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {FINISHES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setSelectedFinish(f);
                      setPreorderSuccess(false);
                    }}
                    className={`group flex items-center gap-3 border px-4 py-3 font-mono text-xs font-bold uppercase transition-all duration-300 ${
                      selectedFinish.id === f.id
                        ? "border-[#c9a66b] bg-[#c9a66b] text-[#0a0a0b]"
                        : "border-white/10 bg-white/[0.03] text-[#f3f1ec]/65 hover:border-[#c9a66b]/40 hover:text-[#f3f1ec]"
                    }`}
                    data-cursor="hover"
                    data-cursor-label="SELECT"
                  >
                    <span
                      className="h-4 w-4 border border-white/20 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: f.hex }}
                    />
                    <span>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="min-w-[280px] border border-white/10 bg-black/50 p-6 text-right backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f3f1ec]/40">
                Configuration Price
              </div>
              <div className="mt-1 font-display text-4xl font-extrabold text-[#c9a66b] transition-all duration-300">
                {selectedFinish.price}
              </div>
              <p className="mt-1 font-mono text-[9px] uppercase text-[#f3f1ec]/45">
                Includes 2-Year Apex Care+
              </p>

              <button
                type="button"
                onClick={() => setPreorderSuccess(true)}
                className="mt-6 w-full bg-[#c9a66b] py-3.5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#0a0a0b] transition-all hover:bg-[#d4b57e] active:scale-[0.98]"
                data-cursor="hover"
                data-cursor-label="INITIATE"
              >
                {preorderSuccess ? "Covenant Sealed" : "Initiate Covenant →"}
              </button>
            </div>
          </div>
        </div>

        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#c9a66b]">
            06 / Core Architecture
          </span>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-[#f3f1ec] md:text-5xl">
            Raw Architecture
          </h2>

          <div ref={specsRef} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SPECS_GRID.map((spec) => (
              <div
                key={spec.label}
                className="border border-white/8 bg-white/[0.03] p-6 opacity-0 transition-colors duration-300 hover:border-[#c9a66b]/30 hover:bg-white/[0.05]"
              >
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#f3f1ec]/40">
                  {spec.label}
                </div>
                <div className="mt-2 font-display text-base font-bold text-[#f3f1ec]">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
