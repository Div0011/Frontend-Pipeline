"use client";

import { useRef } from "react";
import { useCinematicReveal } from "@/lib/motion";

const QUOTES = [
  {
    quote:
      "We cut P50 cold starts from 2.1s to under half a second across three continents. The mesh just holds.",
    name: "Maya Chen",
    role: "VP Infrastructure, Lattice",
  },
  {
    quote:
      "Telemetry that actually keeps up with the traffic. We stopped guessing and started deciding.",
    name: "Jonah Reeves",
    role: "Staff SRE, Meridian Pay",
  },
  {
    quote:
      "Sovereign Cloud gave us the isolation finance required without giving up edge density.",
    name: "Amira Okonkwo",
    role: "CTO, Northline Capital",
  },
];

const METRICS = [
  { label: "Cold start P50", value: "0.43s", delta: "−12%" },
  { label: "Global cache hit", value: "98.7%", delta: "+0.4%" },
  { label: "Requests / min", value: "1.24M", delta: "+8.2%" },
  { label: "Error rate", value: "0.001%", delta: "−0.0004%" },
];

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useCinematicReveal(headerRef, { y: 32 });
  useCinematicReveal(quotesRef, {
    childSelector: "[data-quote]",
    y: 40,
    stagger: 0.12,
  });
  useCinematicReveal(metricsRef, {
    childSelector: "[data-metric]",
    y: 28,
    stagger: 0.08,
    start: "top 90%",
  });

  return (
    <section id="observability" className="relative py-28 md:py-36 bg-background overflow-hidden">
      <div className="absolute inset-0 atmosphere opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px edge-hairline opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="mb-16 md:mb-20 max-w-xl opacity-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Observability
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.05]">
            Trusted when the stakes are live.
          </h2>
          <p className="mt-4 text-base text-foreground/50 font-light leading-relaxed">
            Operators who run on the edge — and the telemetry that backs them up.
          </p>
        </div>

        <div ref={quotesRef} className="grid md:grid-cols-3 gap-5 mb-20">
          {QUOTES.map((item) => (
            <blockquote
              key={item.name}
              data-quote
              className="flex flex-col border border-border bg-card/30 p-7 opacity-0"
            >
              <p className="font-display text-lg md:text-xl font-medium tracking-tight text-foreground/90 leading-snug text-balance">
                “{item.quote}”
              </p>
              <footer className="mt-8 pt-5 border-t border-border">
                <div className="font-mono text-xs text-foreground tracking-wide">{item.name}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                  {item.role}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <div ref={metricsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              data-metric
              className="p-5 border border-border bg-foreground/[0.015] opacity-0"
            >
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-foreground/40 mb-3">
                {m.label}
              </div>
              <div className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                {m.value}
              </div>
              <div className="mt-2 font-mono text-[10px] text-primary/80">{m.delta} vs last hour</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
