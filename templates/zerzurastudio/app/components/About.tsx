"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".about-item");
      if (items && items.length) {
        gsap.fromTo(
          items,
          { y: -120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-48 px-6 text-cinema-cream overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-cinema-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-6 about-item">
          <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
            [
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-cinema-gold/80" style={{ fontFamily: "var(--font-body)" }}>
            About
          </span>
          <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
            ]
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.85] mb-8 about-item"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CREATIVE<br />
              <span className="text-cinema-gold">INCUBATOR</span>
            </h2>
            <p className="text-base text-cinema-cream/50 max-w-lg leading-relaxed mb-6 about-item" style={{ fontFamily: "var(--font-body)" }}>
              Building projects across all digital segments. We&apos;re not just building products — we&apos;re crafting experiences that resonate, engage, and inspire.
            </p>
            <p className="text-sm text-cinema-cream/30 leading-relaxed mb-10 about-item" style={{ fontFamily: "var(--font-body)" }}>
              From entertainment apps that rethink existing genres to AI tools that simplify work processes, Zerzura Studio is where imagination meets execution.
            </p>
            <div className="flex items-center gap-6 text-[10px] font-mono text-cinema-cream/20 about-item tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)" }}>
              <span>EST. 2025</span>
              <span className="w-1 h-1 rounded-full bg-cinema-gold/40" />
              <span>GLOBAL</span>
              <span className="w-1 h-1 rounded-full bg-cinema-gold/40" />
              <span>REMOTE</span>
            </div>
          </div>
          <div className="lg:col-span-7 about-item">
            <div className="grid grid-cols-2 gap-5">
              <div className="group relative p-8 md:p-10 rounded-3xl border border-cinema-cream/[0.08] bg-cinema-cream/[0.02] hover:border-cinema-gold/20 transition-all duration-700 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-cinema-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="text-5xl font-bold text-cinema-gold/20 mb-4" style={{ fontFamily: "var(--font-display)" }}>01</div>
                  <h3 className="text-xl font-bold text-cinema-cream mb-3" style={{ fontFamily: "var(--font-display)" }}>ENTERTAINMENT</h3>
                  <p className="text-sm text-cinema-cream/30 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>Apps that rethink existing genres and create immersive digital experiences.</p>
                </div>
              </div>
              <div className="group relative p-8 md:p-10 rounded-3xl border border-cinema-cream/[0.08] bg-cinema-cream/[0.02] hover:border-cinema-gold/20 transition-all duration-700 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-cinema-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="text-5xl font-bold text-cinema-gold/20 mb-4" style={{ fontFamily: "var(--font-display)" }}>02</div>
                  <h3 className="text-xl font-bold text-cinema-cream mb-3" style={{ fontFamily: "var(--font-display)" }}>AI TOOLS</h3>
                  <p className="text-sm text-cinema-cream/30 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>Intelligent solutions designed to simplify work processes and boost productivity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
