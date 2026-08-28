"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { History, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "1987",
    title: "The Lagoon Discovery",
    desc: "Oceanographer Dr. Elena Vance mapped the pristine, untouched coral reef ecosystem.",
  },
  {
    year: "1998",
    title: "Eco Marine Sanctuary",
    desc: "Chartered as a strict marine conservation zone with 100% zero-impact commitments.",
  },
  {
    year: "2012",
    title: "Overwater Architectural Haven",
    desc: "Unveiled 24 handcrafted overwater residences floating on crystal lagoons.",
  },
  {
    year: "2024",
    title: "Global Landmark",
    desc: "Awarded World's Premier Oceanfront Sanctuary for sustainable luxury.",
  },
];

export default function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current && sectionRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="history-section"
      className="relative w-full py-24 md:py-32 px-6 md:px-16 bg-gradient-to-b from-[#094067] via-[#1e6091] to-[#00a896]/90 text-[#f5f0e6] z-10"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1 rounded-full mb-3 border-[#48d1cc]/40">
            <History className="w-3.5 h-3.5 text-[#48d1cc]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#48d1cc]">
              OUR HERITAGE
            </span>
          </div>

          <h2
            ref={titleRef}
            className="font-display text-4xl md:text-5xl text-[#f5f0e6] leading-tight font-normal"
          >
            BORN FROM THE SEA, <br />
            <span className="italic text-[#48d1cc]">CRAFTED FOR ETERNITY</span>
          </h2>
        </div>

        {/* Minimalist Founder Statement */}
        <div className="glass-card rounded-2xl p-8 md:p-10 border-[#48d1cc]/30 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <Quote className="w-10 h-10 text-[#48d1cc] shrink-0 opacity-80" />
          <div className="space-y-3 text-left">
            <p className="font-display text-xl md:text-2xl text-[#f5f0e6] italic leading-relaxed">
              “Azure Shore was created so that luxury and ocean conservation could exist in perfect, breathtaking harmony.”
            </p>
            <p className="font-mono text-xs text-[#48d1cc] uppercase tracking-wider font-semibold">
              DR. ELENA VANCE — FOUNDER & MARINE BIOLOGIST
            </p>
          </div>
        </div>

        {/* Minimal Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {MILESTONES.map((item) => (
            <div key={item.year} className="glass-card rounded-2xl p-6 border-[#48d1cc]/20 space-y-3">
              <span className="font-display text-3xl font-semibold text-[#48d1cc] block">
                {item.year}
              </span>
              <h3 className="font-display text-lg text-[#f5f0e6]">
                {item.title}
              </h3>
              <p className="font-body text-xs text-[#f5f0e6]/70 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
