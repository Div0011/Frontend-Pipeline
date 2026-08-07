"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "webgl-scrollytelling",
    num: "01",
    title: "WEBGL & SCROLLYTELLING",
    subtitle: "High-Performance 3D Universes",
    description: "We engineer interactive 3D web experiences using R3F, custom GLSL shaders, and Lenis smooth scroll physics that convert passive readers into active explorers.",
    deliverables: ["Custom 3D Shaders", "Camera Rig Choreography", "Canvas Scrubber Mechanics", "60 FPS Optimization"],
  },
  {
    id: "brand-architecture",
    num: "02",
    title: "KINETIC BRAND IDENTITY",
    subtitle: "Living Visual Systems",
    description: "Brand design engineered for digital movement. We build dynamic typography, kinetic logomarks, and modular design systems that adapt across every viewport.",
    deliverables: ["Bespoke Typography", "Kinetic Wordmarks", "UI Design System", "Brand Playbooks"],
  },
  {
    id: "ai-motion-production",
    num: "03",
    title: "AI MOTION PRODUCTION",
    subtitle: "Cinematic Reel Generation",
    description: "We harness AI generative video pipelines (Kling, Luma, Runway) combined with 3D compositing to create showreels and hero brand films at atelier craft speed.",
    deliverables: ["3D Object Explode Renders", "Cinematic Reel Edits", "AI Video Generation", "WebP Sequence Slicing"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const main = gsap.utils.toArray<HTMLElement>(".services-main > *");
      gsap.from(main, {
        opacity: 0,
        yPercent: 14,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        clearProps: "transform",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full flex flex-col justify-center px-12 md:px-20"
    >
      <div className="w-full services-main">
        <div className="border-b border-white/10 pb-6">
          <span
                        className="font-mono text-xs font-bold tracking-[0.3em] text-[#d4ff00] uppercase"
          >
            CAPABILITIES // OUR SERVICE ATELIER
          </span>
          <h2
                        className="mt-2 font-mono text-3xl font-black uppercase text-white tracking-tight md:text-5xl"
          >
            ENGINEERED FOR IMPACT.
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:h-[350px]">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
                            className="relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-700 lg:flex-1 border-white/10 bg-white/[0.02] hover:border-white/30"
              style={{ transitionDelay: `${parseInt(srv.num) * 0.05}s` }}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold text-[#d4ff00]">
                    <span>{srv.num}</span>
                    <span className="uppercase tracking-widest text-white/40">{srv.subtitle}</span>
                  </div>

                  <h3 className="mt-4 font-mono text-xl font-black uppercase text-white">
                    {srv.title}
                  </h3>

                  <p className="mt-3 font-mono text-xs leading-relaxed text-white/70">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#d4ff00] mb-2">
                    DELIVERABLES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {srv.deliverables.map((del) => (
                      <span
                        key={del}
                        className="rounded-md border border-[#d4ff00]/20 bg-[#d4ff00]/5 px-2 py-0.5 font-mono text-[10px] text-white"
                      >
                        ✓ {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
