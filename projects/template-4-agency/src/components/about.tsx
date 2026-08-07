"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "14+", label: "AWWWARDS & FWA HONORS" },
  { value: "60 FPS", label: "WEBGL & CANVAS PERFORMANCE" },
  { value: "$500M+", label: "CLIENT CAPITAL RAISED" },
  { value: "100%", label: "BESPOKE ENGINEERING" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const main = gsap.utils.toArray<HTMLElement>(".about-main > *");
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

      const stats = gsap.utils.toArray<HTMLElement>(".about-stat");
      gsap.from(stats, {
        opacity: 0,
        yPercent: 14,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
        clearProps: "transform",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-full w-full flex flex-col justify-center px-12 md:px-20"
    >
      <div className="about-main max-w-6xl w-full">
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#d4ff00] uppercase">
          MANIFESTO // WHO WE ARE
        </span>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-mono text-3xl font-black leading-tight uppercase text-white md:text-5xl lg:text-6xl">
              WE REJECT TEMPLATES, BORING ANIMATION & STANDARD SAAS PALETTES.
            </h2>
            <p className="font-mono text-sm font-light text-white/70 md:text-base leading-relaxed">
              VOID is an elite digital craft & motion studio. We build websites for brands that refuse to look like everyone else. By pairing high-fps canvas scrollytelling with kinetic typography and bespoke color systems, we turn passive scrolling into an unforgettable cinematic journey.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-[16/10] w-full rounded-2xl border border-[#d4ff00]/20 overflow-hidden shadow-2xl bg-black">
              <video
                src="/videos/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80 filter saturate-75 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060609] to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-[9px] text-[#d4ff00] uppercase tracking-wider block mb-0.5">
                  BG AMBIENCE // 35MM FOG
                </span>
                <span className="font-mono text-[11px] font-bold text-white uppercase">
                  ATMOSPHERIC CINEMA SYSTEM
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-xl">
              <div className="font-mono text-xs text-[#d4ff00] uppercase mb-2">FOUNDING PHILOSOPHY</div>
              <p className="font-mono text-xs text-white/80 leading-relaxed">
                "Motion is direction, not decoration. Every pixel must pace the story and reward user attention."
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 md:grid-cols-4">
          {STATS.map((st, i) => (
            <div
              key={st.label}
                            className="about-stat p-2"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="font-mono text-3xl font-black text-[#d4ff00] md:text-5xl">
                {st.value}
              </div>
              <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white/50">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
