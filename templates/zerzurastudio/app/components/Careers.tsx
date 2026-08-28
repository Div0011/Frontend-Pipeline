"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const JOBS = [
  { title: "Content Creator (Video)", location: "Remote", url: "https://www.zerzurastudio.com/jobs/content-creator-(video)" },
  { title: "Operations Head", location: "Remote", url: "https://www.zerzurastudio.com/jobs/operations-head" },
  { title: "Full Stack Developer (Android)", location: "Remote", url: "https://www.zerzurastudio.com/jobs/full-stack-developer-(android)" },
];

export default function Careers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".job-card");
      if (items && items.length) {
        gsap.fromTo(
          items,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.15,
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
    <section id="careers" ref={sectionRef} className="relative py-32 md:py-48 px-6 bg-cinema-dark text-cinema-cream overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(rgba(201, 169, 110, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 110, 0.15) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cinema-gold/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-cinema-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
            [
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-cinema-gold/80" style={{ fontFamily: "var(--font-body)" }}>
            Careers
          </span>
          <span className="text-cinema-gold text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
            ]
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.85]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              JOIN<br />
              <span className="text-cinema-gold">US</span>
            </h2>
          </div>
          <p className="text-sm text-cinema-cream/30 max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            We&apos;re always looking for talented individuals to join our community of wishgranters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {JOBS.map((job, i) => (
            <a
              key={i}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="job-card group relative p-8 rounded-2xl border border-cinema-cream/[0.06] bg-cinema-cream/[0.01] hover:border-cinema-gold/20 hover:bg-cinema-cream/[0.03] transition-all duration-700 block overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cinema-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-cinema-gold/40 text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
                    [
                  </span>
                  <span className="text-cinema-cream/10 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-cinema-gold/40 text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>
                    ]
                  </span>
                </div>
                <h3 className="text-lg font-bold text-cinema-cream mb-2 group-hover:text-cinema-gold transition-colors duration-500" style={{ fontFamily: "var(--font-display)" }}>
                  {job.title.toUpperCase()}
                </h3>
                <p className="text-xs text-cinema-cream/25 mb-6 tracking-[0.15em]" style={{ fontFamily: "var(--font-body)" }}>
                  {job.location}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-cinema-cream/[0.06]">
                  <span className="text-[10px] text-cinema-cream/20 tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    View Position
                  </span>
                  <span className="text-cinema-gold text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-8px] group-hover:translate-x-0" style={{ fontFamily: "var(--font-display)" }}>
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
