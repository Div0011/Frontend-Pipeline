"use client";

import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Scene from "@/components/three/Scene";
import { useHeroEntrance } from "@/lib/motion";

const HERO_SELECTORS = [".hero-brand", ".hero-headline", ".hero-support", ".hero-cta"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0.15);

  useHeroEntrance(sectionRef, HERO_SELECTORS);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background text-foreground flex items-end md:items-center"
    >
      {/* Full-bleed 3D backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 atmosphere" />
        <div className="absolute inset-0 opacity-40 md:opacity-70">
          <Scene isExploded={false} progressRef={progressRef} immersive />
        </div>
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent md:via-background/30" />
        <div className="absolute bottom-0 left-0 right-0 h-px edge-hairline opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-2xl">
          <p className="hero-brand font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground opacity-0">
            NexaFlow
          </p>

          <h1 className="hero-headline mt-5 font-display text-[clamp(2.75rem,6vw,5.25rem)] font-extrabold tracking-[-0.03em] leading-[0.95] text-foreground opacity-0">
            Edge that holds
            <br />
            under pressure.
          </h1>

          <p className="hero-support mt-6 max-w-md text-base md:text-lg text-foreground/55 leading-relaxed font-light opacity-0">
            Deploy to 284 points of presence. Observe every transaction. Zero cold starts — infrastructure built for stakes that matter.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap gap-3 opacity-0">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] rounded-none px-8 h-12"
            >
              Deploy Edge Mesh
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-foreground/15 bg-foreground/[0.03] hover:bg-foreground/[0.07] text-foreground font-mono text-xs uppercase tracking-[0.18em] rounded-none px-6 h-12"
            >
              <Play className="mr-2 h-3.5 w-3.5 fill-current" />
              Watch demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
