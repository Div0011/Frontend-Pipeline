#!/usr/bin/env python3
"""Fix Template 3 missing/empty chapter files - with correct JSX nesting."""
import os

BASE = "/Users/divyansh/Documents/GitHub/Frontend Pipeline/artifacts/projects/template-3-corporate/src/components/sections"

# ChapterTwo.tsx - fixed JSX nesting
ch2 = '''"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MS = [
  { year: "1987", title: "Founded in New York", desc: "Established as a boutique family office." },
  { year: "1995", title: "European Expansion", desc: "Opened London and Zurich offices." },
  { year: "2005", title: "Institutional Threshold", desc: "Surpassed $10B in assets under advisory." },
  { year: "2016", title: "Next Generation", desc: "Second-generation leadership formalized governance." },
];

export default function ChapterTwo() {
  const s = useRef<HTMLElement>(null);
  const tl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!s.current) return;
    const ctx = gsap.context(() => {
      if (tl.current) gsap.from(tl.current, { scaleY: 0, transformOrigin: "top center", duration: 1.8, ease: "power3.inOut", scrollTrigger: { trigger: s.current, start: "top 60%", end: "bottom 80%", scrub: 1.5 } });
      gsap.from(s.current.querySelectorAll(".mc"), { opacity: 0, x: -40, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: s.current, start: "top 50%", once: true } });
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section id="chapter-02" ref={s} className="relative py-32 md:py-48 bg-chapter-2 overflow-hidden">
      <div className="atmosphere-glow bottom-[-20vw] left-[-10vw] bg-amber-700" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-20 md:mb-32">
          <div className="chapter-number mb-4">02</div>
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.35em] text-accent uppercase mb-6">
            <span className="h-px w-8 bg-accent/60" />ORIGINS
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            The Architecture of<br /><span className="text-accent italic font-light">Endurance.</span>
          </h2>
        </div>
        <div className="zigzag-grid mb-24 md:mb-40 items-center">
          <div className="aspect-[4/3] bg-card border border-border/40 overflow-hidden editorial-shadow">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">Editorial Note</span>
            <p className="drop-cap text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-lg">
              Apex Group was founded on a simple conviction: that capital preserved across generations creates more enduring value.
            </p>
          </div>
        <div className="relative pt-16 md:pt-24">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/60">
            <div ref={tl} className="w-full h-full bg-accent/40 origin-top" style={{ transform: "scaleY(0)" }} />
          </div>
          <div className="space-y-20 md:space-y-32">
            {MS.map((m, i) => (
              <div key={m.year} className={`mc relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 pl-8 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className="font-serif text-4xl md:text-5xl font-bold text-accent">{m.year}</div>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mt-1 font-semibold">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light max-w-md mx-auto">{m.desc}</p>
                </div>
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-accent bg-chapter-2 rounded-full z-10" />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        <div className="zigzag-grid flip mt-24 md:mt-40 items-center">
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">Whitepaper Excerpt</span>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-lg">
              In 2005, Apex crossed a critical threshold in institutional asset management.
            </p>
          </div>
          <div className="aspect-[4/3] bg-card border border-border/40 overflow-hidden editorial-shadow">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-80" />
          </div>
      </div>
    </section>
  );
}
'''

# ChapterThree.tsx - fixed
ch3 = '''"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRACTICES = [
  { num: "01", title: "Institutional Asset Management", tag: "EQUITY & FIXED INCOME", desc: "Allocation across public and private markets." },
  { num: "02", title: "Strategic M&A Advisory", tag: "CORPORATE FINANCE", desc: "Mergers and succession planning." },
  { num: "03", title: "Risk & Compliance", tag: "FIDUCIARY GOVERNANCE", desc: "Fiduciary-grade risk frameworks." },
  { num: "04", title: "Alternative Investments", tag: "REAL ASSETS", desc: "Private equity and infrastructure." },
];

export default function ChapterThree() {
  const s = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!s.current) return;
    const ctx = gsap.context(() => {
      gsap.from(s.current.querySelectorAll(".ch3h > *"), { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: s.current, start: "top 70%", once: true } });
      gsap.from(s.current.querySelectorAll(".pc"), { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: s.current, start: "top 50%", once: true } });
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section id="chapter-03" ref={s} className="relative py-32 md:py-48 bg-chapter-3 overflow-hidden">
      <div className="atmosphere-glow top-[-10vw] right-[-15vw] bg-teal-800" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="ch3h mb-20 md:mb-24">
          <div className="chapter-number mb-4">03</div>
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.35em] text-accent uppercase mb-6">
            <span className="h-px w-8 bg-accent/60" />CRAFT
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            Practice<br /><span className="text-accent italic font-light">Areas.</span>
          </h2>
        </div>
        <div className="space-y-16 md:space-y-24">
          {PRACTICES.map((p, i) => (
            <div key={p.num} className={`pc zigzag-grid ${i % 2 === 1 ? "flip" : ""} items-center gap-8 md:gap-16`}>
              <div className="aspect-[4/3] bg-card border border-border/40 overflow-hidden editorial-shadow">
                <div className="w-full h-full bg-gradient-to-br from-accent/5 to-accent/20 flex items-center justify-center">
                  <span className="font-mono text-6xl font-black text-accent/30">{p.num}</span>
                </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 font-mono text-xs">
                  <span className="text-accent font-bold">{p.num}</span>
                  <span className="text-muted text-[10px] uppercase tracking-widest">{p.tag}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{p.desc}</p>
              </div>
          ))}
        </div>
    </section>
  );
}
'''

# ChapterFour.tsx - fixed
ch4 = '''"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChapterFour() {
  const s = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!s.current) return;
    const ctx = gsap.context(() => {
      gsap.from(s.current.querySelectorAll(".ch4h > *"), { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: s.current, start: "top 70%", once: true } });
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section id="chapter-04" ref={s} className="relative py-32 md:py-48 bg-chapter-4 overflow-hidden">
      <div className="atmosphere-glow bottom-[-15vw] right-[-10vw] bg-violet-800" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="ch4h mb-20 md:mb-24">
          <div className="chapter-number mb-4">04</div>
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.35em] text-accent uppercase mb-6">
            <span className="h-px w-8 bg-accent/60" />FUTURE
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            Forward<br /><span className="text-accent italic font-light">Vision.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mt-16">
          <div className="aspect-[5/4] bg-card border border-border/40 overflow-hidden editorial-shadow">
            <div className="w-full h-full bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center">
              <span className="font-serif text-8xl font-bold text-accent/20">04</span>
            </div>
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">Strategic Outlook</span>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              As we enter our fourth decade, Apex Group remains committed to disciplined capital stewardship.
            </p>
          </div>
      </div>
    </section>
  );
}
'''

# Write all files
files = {"ChapterTwo.tsx": ch2, "ChapterThree.tsx": ch3, "ChapterFour.tsx": ch4}
for name, content in files.items():
    path = os.path.join(BASE, name)
    with open(path, 'w') as f:
        f.write(content)
    size = os.path.getsize(path)
    print(f"{name}: {size} bytes written")

print("\nDone!")
