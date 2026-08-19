"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion";

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
    title: "WebGL & Scrollytelling",
    subtitle: "High-performance 3D universes",
    description:
      "Interactive 3D experiences with custom GLSL, camera choreography, and Lenis-driven physics that turn readers into explorers.",
    deliverables: ["Custom shaders", "Camera rigs", "Canvas scrubbers", "60fps optimization"],
  },
  {
    id: "brand-architecture",
    num: "02",
    title: "Kinetic Brand Identity",
    subtitle: "Living visual systems",
    description:
      "Brand design engineered for movement — dynamic type, kinetic marks, and modular systems that adapt across every viewport.",
    deliverables: ["Bespoke type", "Kinetic wordmarks", "UI systems", "Brand playbooks"],
  },
  {
    id: "ai-motion-production",
    num: "03",
    title: "AI Motion Production",
    subtitle: "Cinematic reel generation",
    description:
      "Generative video pipelines composited with 3D craft — showreels and hero films at atelier speed without losing precision.",
    deliverables: ["Object explode", "Reel edits", "AI generation", "Sequence slicing"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".services-reveal", {
        opacity: 0,
        y: 36,
        duration: 1.1,
        ease: EASE.cinematic,
        stagger: 0.08,
        scrollTrigger: {
          trigger: document.body,
          start: () => `${ScrollTrigger.maxScroll(window) * 0.35}px`,
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative flex h-full w-full flex-col justify-center px-[var(--gutter)]"
    >
      <div className="w-full max-w-6xl">
        <div className="services-reveal stagger-item border-b border-white/10 pb-8">
          <p className="font-mono text-[11px] font-medium tracking-[0.35em] text-[#d4ff00] uppercase">
            Capabilities
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,4rem)] font-extrabold tracking-[-0.035em] text-white">
            Engineered for impact.
          </h2>
        </div>

        <div className="mt-2">
          {SERVICES.map((srv, index) => {
            const isOpen = active === index;
            return (
              <div
                key={srv.id}
                className="services-reveal stagger-item border-b border-white/10"
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className="group flex w-full items-baseline justify-between gap-6 py-6 text-left md:py-7"
                  data-cursor="OPEN"
                  aria-expanded={isOpen}
                >
                  <div className="flex min-w-0 flex-1 items-baseline gap-5 md:gap-8">
                    <span className="font-mono text-xs text-[#d4ff00]/80">{srv.num}</span>
                    <div className="min-w-0">
                      <h3
                        className={`font-display text-xl font-bold tracking-tight transition-colors duration-400 md:text-3xl ${
                          isOpen ? "text-[#d4ff00]" : "text-white group-hover:text-white/90"
                        }`}
                      >
                        {srv.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
                        {srv.subtitle}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-display text-2xl text-white/30 transition-transform duration-500 ${
                      isOpen ? "rotate-45 text-[#d4ff00]" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-5 pb-8 pl-10 md:flex-row md:items-end md:justify-between md:pl-16">
                      <p className="max-w-lg text-sm font-light leading-relaxed text-white/60 md:text-[15px]">
                        {srv.description}
                      </p>
                      <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {srv.deliverables.map((item) => (
                          <li
                            key={item}
                            className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
