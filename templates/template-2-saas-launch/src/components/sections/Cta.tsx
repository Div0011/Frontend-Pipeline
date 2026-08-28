"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCinematicReveal } from "@/lib/motion";

export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  useCinematicReveal(sectionRef, { y: 48, duration: 1.2, childSelector: "[data-cta]" });

  return (
    <section
      id="cta-section"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <div className="atmosphere absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-25" />
        <div className="absolute inset-0 vignette opacity-80" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div data-cta className="opacity-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Begin
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">
            Ready when the
            <br />
            <span className="text-primary">pressure is on.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-foreground/50 mb-10 max-w-lg mx-auto font-light leading-relaxed">
            Deploy in minutes. Scale to millions without touching the metal underneath.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="default"
              size="lg"
              className="group rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase tracking-[0.18em] h-12 px-8"
            >
              Get started free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-none text-foreground border-border hover:bg-foreground/[0.05] font-mono text-xs uppercase tracking-[0.18em] h-12 px-6"
            >
              Schedule demo
            </Button>
          </div>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/35">
            No credit card · 14-day trial on all plans
          </p>
        </div>
      </div>
    </section>
  );
}
