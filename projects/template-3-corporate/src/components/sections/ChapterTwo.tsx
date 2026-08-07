"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "@/lib/motion";

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
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = s.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Timeline line animation (scrub)
      if (tl.current) {
        gsap.from(tl.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1.5,
          },
        });
      }

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
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              once: true,
            },
          });
        }
      }

      // Timeline cards stagger
      gsap.from(el.querySelectorAll(".mc"), {
        opacity: 0,
        x: -40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 50%", once: true },
      });

      // Image reveals with clip-path
      gsap.from(el.querySelectorAll(".reveal-image"), {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        stagger: 0.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          once: true,
        },
      });
    }, el);
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
          <h2
            ref={headingRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            dangerouslySetInnerHTML={{
              __html: splitWords("The Architecture of Endurance"),
            }}
          />
        </div>

        <div className="zigzag-grid mb-24 md:mb-40 items-center">
          <div className="aspect-[4/3] bg-card border border-border/40 overflow-hidden editorial-shadow reveal-image">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
              alt=""
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
              Editorial Note
            </span>
            <p className="drop-cap text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-lg">
              Apex Group was founded on a simple conviction: that capital
              preserved across generations creates more enduring value.
            </p>
          </div>
        </div>

        <div className="relative pt-16 md:pt-24">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/60">
            <div
              ref={tl}
              className="w-full h-full bg-accent/40 origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
          <div className="space-y-20 md:space-y-32">
            {MS.map((m, i) => (
              <div
                key={m.year}
                className={
                  "mc relative flex flex-col md:flex-row items-start gap-6 md:gap-12 " +
                  (i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")
                }
              >
                <div
                  className={
                    "flex-1 pl-8 md:pl-0 " +
                    (i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12")
                  }
                >
                  <div className="font-serif text-4xl md:text-5xl font-bold text-accent">
                    {m.year}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mt-1 font-semibold">
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light max-w-md mx-auto">
                    {m.desc}
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-accent bg-chapter-2 rounded-full z-10" />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        <div className="zigzag-grid flip mt-24 md:mt-40 items-center">
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
              Whitepaper Excerpt
            </span>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-lg">
              In 2005, Apex crossed a critical threshold in institutional asset
              management.
            </p>
          </div>
          <div className="aspect-[4/3] bg-card border border-border/40 overflow-hidden editorial-shadow reveal-image">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
              alt=""
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

