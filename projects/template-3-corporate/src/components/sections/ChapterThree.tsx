"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PRACTICES = [
  { num: "01", title: "Institutional Asset Management", tag: "EQUITY & FIXED INCOME", desc: "Allocation across public and private markets." },
  { num: "02", title: "Strategic M&A Advisory", tag: "CORPORATE FINANCE", desc: "Mergers and succession planning." },
  { num: "03", title: "Risk & Compliance", tag: "FIDUCIARY GOVERNANCE", desc: "Fiduciary-grade risk frameworks." },
  { num: "04", title: "Alternative Investments", tag: "REAL ASSETS", desc: "Private equity and infrastructure access." },
];

const PLACEHOLDER_COLORS = [
  "from-accent/5 to-accent/20",
  "from-accent/10 to-accent/25",
  "from-accent/5 to-accent/15",
  "from-accent/10 to-accent/30",
];

export default function ChapterThree() {
  const s = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = s.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Heading split-word reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll<HTMLElement>(".split-word > span");
        if (words.length) {
          gsap.set(words, { y: 40, opacity: 0 });
          gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          });
        }
      }

      // Chapter label reveal
      gsap.from(el.querySelectorAll(".ch3h > *:not(h2)"), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      // Cards stagger with slide-up + clip-path reveal on image
      gsap.from(el.querySelectorAll(".pc"), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 50%", once: true },
      });

      // Number badges reveal
      gsap.from(el.querySelectorAll(".practice-num"), {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-03"
      ref={s}
      className="relative py-32 md:py-48 bg-chapter-3 overflow-hidden"
    >
      <div className="atmosphere-glow top-[-10vw] right-[-15vw] bg-teal-800" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="ch3h mb-20 md:mb-24">
          <div className="chapter-number mb-4">03</div>
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.35em] text-accent uppercase mb-6">
            <span className="h-px w-8 bg-accent/60" />
            CRAFT
          </div>
          <h2
            ref={headingRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            dangerouslySetInnerHTML={{
              __html: splitWords("Practice Areas"),
            }}
          />
        </div>
        <div className="space-y-16 md:space-y-24">
          {PRACTICES.map((p, i) => (
            <div
              key={p.num}
              className={
                "pc zigzag-grid " + (i % 2 === 1 ? "flip" : "")
              }
            >
              <div className="aspect-[4/3] bg-card border border-border/40 overflow-hidden editorial-shadow relative">
                <div
                  className={`w-full h-full bg-gradient-to-br ${PLACEHOLDER_COLORS[i]} flex items-center justify-center`}
                >
                  <span className="practice-num font-mono text-6xl font-black text-accent/30">
                    {p.num}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 font-mono text-xs">
                  <span className="text-accent font-bold">{p.num}</span>
                  <span className="text-muted text-[10px] uppercase tracking-widest">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

