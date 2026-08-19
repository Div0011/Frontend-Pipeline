"use client";

import { useRef } from "react";
import { Server, Shield, Cpu } from "lucide-react";
import { useCinematicReveal } from "@/lib/motion";

const STATS = [
  { label: "Edge uptime", value: "99.999%", icon: Server },
  { label: "Security", value: "SOC 2 Type II", icon: Shield },
  { label: "P50 latency", value: "0.4 ms", icon: Cpu },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  useCinematicReveal(ref, { childSelector: "[data-stat]", y: 32, stagger: 0.12 });

  return (
    <section
      ref={ref}
      className="relative border-y border-border bg-secondary/40 py-14 md:py-16"
      aria-label="Key infrastructure metrics"
    >
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} data-stat className="flex flex-col gap-2 opacity-0">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
              <stat.icon className="h-3.5 w-3.5" />
              {stat.label}
            </div>
            <div className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
