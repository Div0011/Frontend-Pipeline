"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "Entertainment",
    subtitle: "Apps that rethink existing genres",
    description: "We create immersive entertainment experiences that push boundaries and redefine how audiences engage with content across all platforms.",
    color: "from-amber-500/15 to-orange-600/10",
    accent: "#F59E0B",
  },
  {
    id: "02",
    title: "AI Tools",
    subtitle: "Simplify work processes",
    description: "Intelligent tools designed to streamline workflows, boost productivity, and make complex tasks effortless through innovative AI solutions.",
    color: "from-emerald-500/15 to-teal-600/10",
    accent: "#10B981",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".project-card");
      if (items && items.length) {
        gsap.fromTo(
          items,
          { y: -100, opacity: 0, rotateY: -8 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.6,
            stagger: 0.2,
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
    <section id="projects" ref={sectionRef} className="relative py-32 md:py-48 px-6 text-cinema-cream overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cinema-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
            [
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-cinema-gold/80" style={{ fontFamily: "var(--font-body)" }}>
            Projects
          </span>
          <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
            ]
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-8">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.85]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHAT WE<br />
              <span className="text-cinema-gold">BUILD</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-cinema-cream/30 max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Every project is a scene. Every feature, a plot twist in our ongoing story of innovation.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className="project-card group relative p-8 md:p-12 rounded-[2rem] border border-cinema-cream/[0.06] bg-cinema-cream/[0.02] hover:border-cinema-gold/20 transition-all duration-700 overflow-hidden backdrop-blur-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: project.accent, transform: 'translate(30%, -30%)' }} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-10">
                  <span className="text-cinema-gold/40 text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
                    [
                  </span>
                  <span className="text-cinema-cream/10 text-6xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {project.id}
                  </span>
                  <span className="text-cinema-gold/40 text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
                    ]
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-cinema-cream mb-3 group-hover:text-cinema-gold transition-colors duration-500" style={{ fontFamily: "var(--font-display)" }}>
                  {project.title.toUpperCase()}
                </h3>
                <p className="text-xs text-cinema-gold/70 mb-6 uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-body)" }}>
                  {project.subtitle}
                </p>
                <p className="text-sm text-cinema-cream/30 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {project.description}
                </p>

                <div className="mt-10 pt-6 border-t border-cinema-cream/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-cinema-cream/20 tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    Explore
                  </span>
                  <span className="text-cinema-gold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0" style={{ fontFamily: "var(--font-display)" }}>
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
