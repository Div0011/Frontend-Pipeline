"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PRACTICES = [
  {
    num: "01",
    title: "Institutional Asset Management",
    tag: "Equity & Fixed Income",
    desc: "Allocation across public and private markets with fiduciary precision.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
  },
  {
    num: "02",
    title: "Strategic M&A Advisory",
    tag: "Corporate Finance",
    desc: "Mergers, succession, and structural transitions for enduring enterprises.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80",
  },
  {
    num: "03",
    title: "Risk & Compliance",
    tag: "Fiduciary Governance",
    desc: "Institutional-grade risk frameworks calibrated for multi-jurisdiction mandates.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
  },
  {
    num: "04",
    title: "Alternative Investments",
    tag: "Real Assets",
    desc: "Private equity, infrastructure, and tangible assets across cycles.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1000&q=80",
  },
];

export default function ChapterThree() {
  const s = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = s.current;
    if (!el) return;
    const ctx = gsap.context(() => {
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
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 72%", once: true },
          });
        }
      }

      gsap.from(el.querySelectorAll(".ch3-meta"), {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      el.querySelectorAll(".pc").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 78%", once: true },
        });

        const media = card.querySelector(".pc-media");
        if (media) {
          gsap.from(media, {
            clipPath: "inset(12% 12% 12% 12%)",
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: card, start: "top 75%", once: true },
          });
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-03"
      ref={s}
      className="relative py-32 md:py-44 bg-chapter-3 overflow-hidden"
    >
      <div className="atmosphere-glow top-[-12vw] right-[-10vw] bg-[#2a3340]" />
      <div className="absolute inset-0 bg-architectural-plane pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="mb-20 md:mb-28">
          <div className="ch3-meta chapter-number mb-2">03</div>
          <div className="ch3-meta flex items-center gap-4 mb-7">
            <span className="chapter-rule" />
            <span className="chapter-label">Practice</span>
          </div>
          <h2
            ref={headingRef}
            className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-semibold tracking-tight leading-[0.95]"
            dangerouslySetInnerHTML={{
              __html: splitWords("Disciplines of capital."),
            }}
          />
        </div>

        <div className="space-y-20 md:space-y-28">
          {PRACTICES.map((p, i) => (
            <div
              key={p.num}
              className={
                "pc grid lg:grid-cols-12 gap-8 lg:gap-14 items-center " +
                (i % 2 === 1 ? "" : "")
              }
            >
              <div
                className={
                  "lg:col-span-7 media-frame aspect-[16/10] pc-media " +
                  (i % 2 === 1 ? "lg:order-2" : "")
                }
              >
                <img
                  src={p.image}
                  alt=""
                  className="w-full h-full object-cover opacity-80 saturate-[0.8] brightness-[0.9]"
                />
                <div className="absolute bottom-5 left-5 font-serif text-5xl text-accent/25 font-semibold pointer-events-none">
                  {p.num}
                </div>
              </div>
              <div
                className={
                  "lg:col-span-5 space-y-4 " + (i % 2 === 1 ? "lg:order-1" : "")
                }
              >
                <div className="flex items-center gap-4 font-mono text-[10px]">
                  <span className="text-accent tracking-[0.2em]">{p.num}</span>
                  <span className="text-muted uppercase tracking-[0.3em]">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                  {p.title}
                </h3>
                <div className="metal-line w-full max-w-[12rem] my-2" />
                <p className="text-sm md:text-[15px] text-muted-foreground font-light leading-relaxed max-w-md">
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
