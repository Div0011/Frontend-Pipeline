"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "press",
    num: "01",
    title: "THE PRESS",
    subtitle: "Weight & Heat",
    body: "A 90g hand-formed ball of 80/20 beef hits 230°C bare cast-iron. A heavy press flattens it in one decisive motion within the first 30 seconds — the Maillard window.",
    stat: "230°C",
    statLabel: "Cast Iron Temp",
    detail: "Preserves fat dispersion while locking in a rich outer skin."
  },
  {
    id: "sear",
    num: "02",
    title: "THE SEAR",
    subtitle: "Crust Formation",
    body: "No parchment, no steam. Dry contact with raw iron creates the signature lacquered crust — deeply caramelized, packed with umami, and never greasy.",
    stat: "30 sec",
    statLabel: "Smash Window",
    detail: "Ensures the Maillard browning occurs before the meat dries out."
  },
  {
    id: "build",
    num: "03",
    title: "THE BUILD",
    subtitle: "Stack & Serve",
    body: "American cheese melted between two patties while still on the griddle. House sauce, dill pickles, brioche — assembled in a precise order that keeps every bite balanced.",
    stat: "2×90g",
    statLabel: "Double Stack",
    detail: "Maintains optimal cheese-to-meat ratio for maximum juiciness."
  },
];

export default function HowWeSmash() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".smash-step",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-yolk section-cinematic overflow-hidden border-b border-char/10">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="type-caption text-char/60 mb-3">The Science</p>
          <h2 className="type-display text-6xl sm:text-8xl lg:text-[8rem] text-char leading-[0.9]">
            HOW WE<br />SMASH
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-char/15 bg-yolk">
          {STEPS.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={step.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`smash-step opacity-0 p-8 lg:p-10 flex flex-col justify-between gap-10 cursor-pointer transition-all duration-300 ${
                  idx < STEPS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-char/15" : ""
                } ${isHovered ? "bg-char text-yolk-light" : "text-char"}`}
              >
                <div>
                  {/* Large step number */}
                  <div className={`type-display text-8xl leading-none mb-6 select-none transition-colors duration-300 ${
                    isHovered ? "text-yolk/10" : "text-char/10"
                  }`}>
                    {step.num}
                  </div>
                  <h3 className={`type-display text-4xl lg:text-5xl mb-1 leading-[0.9] transition-colors duration-300 ${
                    isHovered ? "text-yolk" : "text-char"
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`type-caption mb-6 transition-colors duration-300 ${
                    isHovered ? "text-yolk/60" : "text-char/50"
                  }`}>{step.subtitle}</p>
                  
                  <p className={`type-serif text-lg leading-relaxed transition-colors duration-300 ${
                    isHovered ? "text-ink/95" : "text-char/80"
                  }`}>
                    {step.body}
                  </p>

                  <div className="overflow-hidden mt-4">
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: isHovered ? 0.9 : 0,
                        height: isHovered ? "auto" : 0
                      }}
                      transition={{ duration: 0.25 }}
                      className="type-body text-xs text-yolk/80 pt-2 italic"
                    >
                      {step.detail}
                    </motion.p>
                  </div>
                </div>

                {/* Stat */}
                <div className={`border-t pt-6 flex items-end gap-3 transition-colors duration-300 ${
                  isHovered ? "border-yolk/20" : "border-char/15"
                }`}>
                  <span className={`type-display text-5xl transition-colors duration-300 ${
                    isHovered ? "text-yolk" : "text-char"
                  }`}>{step.stat}</span>
                  <span className={`type-caption mb-1.5 text-[9px] transition-colors duration-300 ${
                    isHovered ? "text-yolk/55" : "text-char/50"
                  }`}>{step.statLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="type-label text-char/50 text-[10px]">
            Smash Guys · Bangalore · Est. 2024
          </p>
          <p className="type-serif italic text-char/60 max-w-sm text-right hidden md:block">
            &quot;The smash is not a technique. It is a philosophy.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
