"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, BarChart3 } from "lucide-react";
import Scene from "../three/Scene";
import { useScrollScrub } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: "deployments",
    num: "01",
    title: "Instant Edge Deployments",
    description:
      "Push code to production in sub-seconds. Replicate workloads globally to 284 edge nodes with zero cold starts.",
    icon: Zap,
    stat: "99.999% UPTIME GUARANTEE",
  },
  {
    id: "security",
    num: "02",
    title: "End-to-End Encryption",
    description:
      "Enterprise-grade protection with automatic TLS certificates, active DDoS shielding, isolated sandboxing, and SOC 2 Type II compliance.",
    icon: Shield,
    stat: "AES-256 ENCRYPTION STATE",
  },
  {
    id: "analytics",
    num: "03",
    title: "Real-Time Telemetry",
    description:
      "Query billions of execution logs in real time. Beautiful dashboards updating faster than the eye can trace with click-to-explore metrics.",
    icon: BarChart3,
    stat: "SUB-MILLISECOND QUERIES",
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=250%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setIsExploded(self.progress > 0.5);
      },
    });
    return () => st.kill();
  }, []);

  useScrollScrub(titleRef, { y: -40, opacity: 0.2 }, "top bottom", "center center");
  useScrollScrub(listRef, { x: -40 }, "top bottom", "bottom top", 1);
  useScrollScrub(sceneWrapRef, { scale: 0.96, opacity: 0.6 }, "top bottom", "center center");

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background text-foreground"
    >
      <div className="absolute inset-0 z-0">
        <div className="grid-pattern absolute inset-0 opacity-10" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 h-full w-full max-w-7xl mx-auto px-6 items-center">
        <div className="lg:col-span-5 flex flex-col justify-center h-full">
          <div>
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-primary uppercase">
              Architecture
            </span>
            <h2
              ref={titleRef}
              className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl leading-none"
            >
              Engineered for
              <br />
              <span className="text-primary">max velocity</span>
            </h2>
          </div>

          <div ref={listRef} className="mt-12 space-y-4 relative">
            {FEATURES.map((feat, i) => {
              const active = isExploded ? i === 2 : i === 0;
              return (
                <div
                  key={feat.id}
                  className={`transition-all duration-500 border p-6 rounded-sm ${
                    active
                      ? "border-primary/30 bg-primary/[0.03] text-foreground scale-[1.01]"
                      : "border-foreground/5 bg-transparent text-foreground/30"
                  }`}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors ${
                        active ? "border-primary/30 bg-primary/10 text-primary" : "border-foreground/10 bg-foreground/5 text-foreground/40"
                      }`}
                    >
                      <feat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-primary">{feat.num}</span>
                      <h3 className="font-mono text-lg font-bold uppercase">{feat.title}</h3>
                    </div>
                  </div>
                  <p
                    className={`mt-4 text-sm font-light leading-relaxed transition-colors ${
                      active ? "text-foreground/80" : "text-foreground/30"
                    }`}
                  >
                    {feat.description}
                  </p>
                  <div
                    className={`mt-4 font-mono text-[9px] tracking-wider uppercase transition-colors ${
                      active ? "text-primary" : "text-foreground/20"
                    }`}
                  >
                    {feat.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 h-[70vh] flex items-center justify-center relative">
          <div
            ref={sceneWrapRef}
            className="w-full h-full rounded-sm border border-foreground/5 bg-foreground/[0.01] backdrop-blur-sm overflow-hidden relative"
          >
            <Scene isExploded={isExploded} progressRef={progressRef} />
            <div className="absolute top-4 left-4 font-mono text-[10px] text-foreground/30">
              Edge Node / Active
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-primary/60">
              DISASSEMBLY: {Math.round((progressRef.current || 0) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
