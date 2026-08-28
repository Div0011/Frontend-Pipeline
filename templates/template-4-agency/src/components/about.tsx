"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "14+", label: "Awwwards & FWA" },
  { value: "60", label: "FPS WebGL targets" },
  { value: "$500M+", label: "Client capital raised" },
  { value: "100%", label: "Bespoke builds" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.15,
        ease: EASE.cinematic,
        stagger: 0.1,
        scrollTrigger: {
          trigger: document.body,
          start: () => `${ScrollTrigger.maxScroll(window) * 0.12}px`,
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="about"
      className="relative flex h-full w-full flex-col justify-center px-[var(--gutter)]"
    >
      <div className="w-full max-w-6xl">
        <p className="about-reveal stagger-item font-mono text-[11px] font-medium tracking-[0.35em] text-[#d4ff00] uppercase">
          Manifesto
        </p>

        <div className="mt-8 grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2 className="about-reveal stagger-item font-display text-[clamp(2rem,4.5vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white">
              We reject templates, dull motion, and default SaaS palettes.
            </h2>
            <p className="about-reveal stagger-item mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/65 md:text-base">
              VOID is a digital craft & motion studio. We pair high-fps scrollytelling with kinetic
              typography and bespoke color systems — turning the scroll into a cinematic journey.
            </p>
            <blockquote className="about-reveal stagger-item mt-10 max-w-md border-l border-[#d4ff00]/60 pl-5 font-display text-lg font-medium leading-snug tracking-tight text-white/90 md:text-xl">
              Motion is direction, not decoration. Every pixel paces the story.
            </blockquote>
          </div>

          <div className="about-reveal stagger-item relative lg:col-span-4">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden lg:ml-auto">
              <video
                src="/videos/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover opacity-90 saturate-[0.85] contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.28em] text-[#d4ff00] uppercase">
                Atmospheric cinema
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="about-reveal stagger-item">
              <p className="font-display text-3xl font-extrabold tracking-tight text-[#d4ff00] md:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
