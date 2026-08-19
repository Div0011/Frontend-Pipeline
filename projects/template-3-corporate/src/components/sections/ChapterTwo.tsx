"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const MS = [
  {
    year: "1987",
    title: "Founded in New York",
    desc: "Established as a boutique family office with a generational mandate.",
  },
  {
    year: "1995",
    title: "European Expansion",
    desc: "Opened London and Zurich — bridging Atlantic and Alpine capital.",
  },
  {
    year: "2005",
    title: "Institutional Threshold",
    desc: "Surpassed $10B in assets under advisory stewardship.",
  },
  {
    year: "2016",
    title: "Next Generation",
    desc: "Second-generation leadership formalized fiduciary governance.",
  },
];

export default function ChapterTwo() {
  const s = useRef<HTMLElement>(null);
  const tl = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = s.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelector(".chapter-veil"), {
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll<HTMLElement>(
          ".split-word > span"
        );
        if (words.length) {
          gsap.set(words, { y: 48, opacity: 0 });
          gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 72%", once: true },
          });
        }
      }

      if (tl.current) {
        gsap.from(tl.current, {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector(".timeline-block"),
            start: "top 65%",
            end: "bottom 75%",
            scrub: 1.2,
          },
        });
      }

      gsap.from(el.querySelectorAll(".mc"), {
        opacity: 0,
        y: 36,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector(".timeline-block"), start: "top 55%", once: true },
      });

      gsap.from(el.querySelectorAll(".reveal-image"), {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.5,
        stagger: 0.22,
        ease: "power4.inOut",
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });

      if (pinRef.current) {
        gsap.fromTo(
          pinRef.current,
          { y: 40, opacity: 0.4 },
          {
            y: -20,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-02"
      ref={s}
      className="relative py-32 md:py-44 bg-chapter-2 overflow-hidden"
    >
      <div className="chapter-veil atmosphere-glow bottom-[-18vw] left-[-8vw] bg-[#3d3428]" />
      <div className="absolute inset-0 bg-architectural-plane pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div ref={pinRef} className="mb-20 md:mb-28">
          <div className="chapter-number mb-2">02</div>
          <div className="flex items-center gap-4 mb-7">
            <span className="chapter-rule" />
            <span className="chapter-label">Origins</span>
          </div>
          <h2
            ref={headingRef}
            className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-semibold tracking-tight leading-[0.95] max-w-4xl"
            dangerouslySetInnerHTML={{
              __html: splitWords("The architecture of endurance."),
            }}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28 md:mb-36">
          <div className="lg:col-span-7 media-frame aspect-[16/10] reveal-image">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80"
              alt="Architectural tower facade"
              className="w-full h-full object-cover opacity-85 saturate-[0.85]"
            />
          </div>
          <div className="lg:col-span-5 space-y-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
              Founding Note
            </span>
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              Apex was founded on a single conviction: capital preserved across
              generations creates more enduring value than capital merely grown.
            </p>
          </div>
        </div>

        <div className="timeline-block relative pt-8 md:pt-12">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/70">
            <div
              ref={tl}
              className="w-full h-full bg-gradient-to-b from-accent via-accent/50 to-accent/10 origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
          <div className="space-y-20 md:space-y-28">
            {MS.map((m, i) => (
              <div
                key={m.year}
                className={
                  "mc relative flex flex-col md:flex-row items-start gap-6 md:gap-12 " +
                  (i % 2 === 0 ? "" : "md:flex-row-reverse")
                }
              >
                <div
                  className={
                    "flex-1 pl-8 md:pl-0 " +
                    (i % 2 === 0 ? "md:text-right md:pr-14" : "md:pl-14")
                  }
                >
                  <div className="font-serif text-4xl md:text-5xl font-semibold text-accent">
                    {m.year}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mt-2 font-medium">
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light max-w-md md:inline-block">
                    {m.desc}
                  </p>
                </div>
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-3 h-3 border border-accent bg-chapter-2 z-10" />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-28 md:mt-36">
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
              Threshold
            </span>
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              In 2005, Apex crossed into institutional scale — without
              abandoning the discipline of a private atelier.
            </p>
          </div>
          <div className="lg:col-span-7 media-frame aspect-[16/10] reveal-image order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80"
              alt="Global network visualization"
              className="w-full h-full object-cover opacity-80 saturate-[0.8]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
