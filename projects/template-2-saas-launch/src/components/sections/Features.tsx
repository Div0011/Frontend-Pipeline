"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, BarChart3 } from "lucide-react";
import Scene from "../three/Scene";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: "deployments",
    num: "01",
    title: "Instant edge deployments",
    description:
      "Push to production in sub-seconds. Replicate workloads across 284 edge nodes with zero cold starts.",
    icon: Zap,
    stat: "99.999% uptime guarantee",
  },
  {
    id: "security",
    num: "02",
    title: "End-to-end encryption",
    description:
      "Automatic TLS, active DDoS shielding, isolated sandboxing, and SOC 2 Type II — without slowing the path.",
    icon: Shield,
    stat: "AES-256 encryption state",
  },
  {
    id: "analytics",
    num: "03",
    title: "Real-time telemetry",
    description:
      "Query billions of execution logs live. Dashboards that update faster than the eye can track.",
    icon: BarChart3,
    stat: "Sub-millisecond queries",
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const [isExploded, setIsExploded] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=220%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setDisplayProgress(self.progress);
        setIsExploded(self.progress > 0.45);
        setActiveIndex(Math.min(2, Math.floor(self.progress * 3)));
      },
    });

    return () => st.kill();
  }, [reducedMotion]);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background text-foreground"
    >
      <div className="absolute inset-0 z-0">
        <div className="atmosphere absolute inset-0 opacity-60" />
        <div className="grid-pattern absolute inset-0 opacity-[0.35]" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 h-full min-h-screen w-full max-w-7xl mx-auto px-6 py-24 lg:py-0 items-center">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="font-mono text-[10px] font-medium tracking-[0.3em] text-primary uppercase">
            Architecture
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.05]">
            Engineered for
            <br />
            <span className="text-primary">max velocity</span>
          </h2>
          <p className="mt-4 text-sm text-foreground/45 max-w-sm leading-relaxed">
            Scroll to disassemble the mesh. Each layer is a contract — deploy, protect, observe.
          </p>

          <div className="mt-10 space-y-3">
            {FEATURES.map((feat, i) => {
              const active = reducedMotion ? i === 0 : activeIndex === i;
              return (
                <div
                  key={feat.id}
                  className={`transition-all duration-500 border p-5 ${
                    active
                      ? "border-primary/25 bg-primary/[0.04] text-foreground"
                      : "border-border bg-transparent text-foreground/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 border transition-colors ${
                        active
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-foreground/10 bg-foreground/[0.03] text-foreground/35"
                      }`}
                    >
                      <feat.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-widest text-primary/70">
                        {feat.num}
                      </span>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {feat.title}
                      </h3>
                    </div>
                  </div>
                  <p
                    className={`mt-3 text-sm font-light leading-relaxed transition-colors ${
                      active ? "text-foreground/70" : "text-foreground/25"
                    }`}
                  >
                    {feat.description}
                  </p>
                  <div
                    className={`mt-3 font-mono text-[9px] tracking-[0.18em] uppercase transition-colors ${
                      active ? "text-primary/80" : "text-foreground/15"
                    }`}
                  >
                    {feat.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 h-[42vh] lg:h-[70vh] flex items-center justify-center relative">
          <div className="w-full h-full border border-border bg-foreground/[0.015] overflow-hidden relative">
            <Scene isExploded={isExploded} progressRef={progressRef} />
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/30">
              Edge node / active
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.18em] text-primary/55">
              Disassembly {Math.round(displayProgress * 100)}%
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px edge-hairline" />
          </div>
        </div>
      </div>
    </section>
  );
}
