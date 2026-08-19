"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HOTSPOTS = [
  {
    id: "camera",
    x: "28%",
    y: "32%",
    index: "01",
    title: "108MP Periscope Triad",
    desc: "Three eyes suspended in laser-etched titanium rings, seeing what the human eye cannot perceive.",
  },
  {
    id: "chip",
    x: "56%",
    y: "24%",
    index: "02",
    title: "2-Nanometer Neural Core",
    desc: "A city of 15 billion transistors, each one a billion decisions per second. Yours.",
  },
  {
    id: "battery",
    x: "54%",
    y: "50%",
    index: "03",
    title: "Solid-State Graphene Matrix",
    desc: "Energy drawn from the lattice of carbon itself. Never sleeps. Never weakens.",
  },
  {
    id: "frame",
    x: "72%",
    y: "72%",
    index: "04",
    title: "Monolithic Titanium Chassis",
    desc: "One piece, CNC-milled from a single billet. The skeleton that outlives its owner.",
  },
];

export default function HotspotExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [panelRef.current, stageRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = HOTSPOTS.find((h) => h.id === activeId);

  return (
    <section
      id="anatomy"
      ref={sectionRef}
      className="relative z-30 border-t border-white/5 bg-[#08080a] px-6 py-32 text-[#f3f1ec] bg-noise"
    >
      <div className="absolute inset-0 bg-elemental-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(90,110,130,0.12)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
        <div ref={panelRef} className="max-w-xl flex-1 select-none opacity-0">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#c9a66b]">
            04 / Chamber Inspection
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#f3f1ec] md:text-6xl">
            The
            <br />
            <span className="text-[#f3f1ec]/28">Anatomy</span>
            <br />
            of Obsession.
          </h2>
          <p className="mt-6 font-mono text-xs font-light leading-relaxed text-[#f3f1ec]/55 sm:text-sm">
            Every chamber holds a secret. Touch the nodes to unlock the
            machine&apos;s inner sanctum.
          </p>

          <div className="relative mt-12 flex min-h-[180px] flex-col justify-center overflow-hidden border border-white/10 bg-black/40 p-6 backdrop-blur-md">
            <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-[#c9a66b] to-transparent" />
            {active ? (
              <div key={active.id} className="reveal-in">
                <span className="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#c9a66b]">
                  Module {active.index} · Specification
                </span>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[#f3f1ec]">
                  {active.title}
                </h3>
                <p className="mt-2 font-mono text-xs font-light leading-relaxed text-[#f3f1ec]/55">
                  {active.desc}
                </p>
              </div>
            ) : (
              <div className="py-4 text-center font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#f3f1ec]/30">
                Select a node to initialize inspection
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveId(activeId === h.id ? null : h.id)}
                className={`border px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  activeId === h.id
                    ? "border-[#c9a66b] bg-[#c9a66b]/15 text-[#c9a66b]"
                    : "border-white/10 text-[#f3f1ec]/40 hover:border-white/25 hover:text-[#f3f1ec]/70"
                }`}
                data-cursor="hover"
                data-cursor-label="NODE"
              >
                {h.index}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={stageRef}
          className="relative flex aspect-square w-full max-w-2xl flex-1 items-center justify-center overflow-hidden border border-white/10 bg-[#0a0a0c] p-6 opacity-0 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,32,40,0.6)_0%,transparent_70%)]" />
          <div className="relative h-full w-full">
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
                  type="button"
                  onClick={() => setActiveId(isActive ? null : h.id)}
                  onMouseEnter={() => setActiveId(h.id)}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: h.y, left: h.x }}
                  data-cursor="hover"
                  data-cursor-label="INSPECT"
                  aria-label={h.title}
                >
                  <span
                    className={`absolute inset-0 rounded-full bg-[#c9a66b]/25 ${
                      isActive ? "animate-pulse-ring" : ""
                    }`}
                  />
                  <span
                    className={`block h-3.5 w-3.5 rounded-full border-2 border-[#c9a66b] shadow-[0_0_16px_rgba(201,166,107,0.45)] transition-all duration-300 ${
                      isActive
                        ? "scale-125 bg-[#c9a66b]"
                        : "bg-[#f3f1ec]/20 group-hover:bg-[#c9a66b]/80"
                    }`}
                  />
                  {isActive && (
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap border border-white/10 bg-black/70 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#c9a66b] backdrop-blur-sm">
                      {h.index}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
