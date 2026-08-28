"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "beef",
    num: "01",
    title: "100% ANGUS CHUCK",
    subtitle: "Never Frozen · Fresh Daily",
    body: "Every morning, fresh Certified Angus chuck is hand-portioned into 2oz, 4oz, and 6oz patties. No fillers, no additives — just pure, high-grade Texas beef.",
    stat: "100%",
    statLabel: "Certified Angus",
    detail: "Guarantees optimal marbling, tenderness, and rich savory flavor in every bite."
  },
  {
    id: "sear",
    num: "02",
    title: "CAST IRON SEAR",
    subtitle: "Hot Griddle Sizzle",
    body: "Patties hit the hot seasoned griddle made-to-order. The intense surface heat locks in natural juices, creating the crispy caramelized diner edge Austin loves.",
    stat: "1973",
    statLabel: "Original Recipe",
    detail: "The timeless griddling technique perfected by Dan Junk over 50 years ago."
  },
  {
    id: "build",
    num: "03",
    title: "MADE TO ORDER",
    subtitle: "Your Way · Stack & Serve",
    body: "Melted cheddar, crinkle-cut pickles, fresh Texas onions, and Dan's signature dressing on a butter-toasted sesame bun. Served piping hot alongside our famous $50 onion rings.",
    stat: "50+ Yrs",
    statLabel: "Austin Tradition",
    detail: "Every order prepared fresh when you ask for it — never sitting under a heat lamp."
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
    <section ref={sectionRef} className="bg-ember section-cinematic overflow-hidden border-b border-char/10 text-bone">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="type-caption text-bone/70 mb-3">The Dan&apos;s Hamburgers Way</p>
          <h2 className="type-display text-6xl sm:text-8xl lg:text-[8rem] text-bone leading-[0.9]">
            HOW WE<br />MAKE IT
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-bone/20 bg-ember">
          {STEPS.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={step.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`smash-step opacity-0 p-8 lg:p-10 flex flex-col justify-between gap-10 cursor-pointer transition-all duration-300 ${
                  idx < STEPS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-bone/20" : ""
                } ${isHovered ? "bg-char text-bone" : "text-bone"}`}
              >
                <div>
                  <div className={`type-display text-8xl leading-none mb-6 select-none transition-colors duration-300 ${
                    isHovered ? "text-yolk/20" : "text-bone/20"
                  }`}>
                    {step.num}
                  </div>
                  <h3 className={`type-display text-4xl lg:text-5xl mb-1 leading-[0.9] transition-colors duration-300 ${
                    isHovered ? "text-yolk" : "text-bone"
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`type-caption mb-6 transition-colors duration-300 ${
                    isHovered ? "text-yolk/70" : "text-bone/70"
                  }`}>{step.subtitle}</p>
                  
                  <p className={`type-serif text-lg leading-relaxed transition-colors duration-300 ${
                    isHovered ? "text-ink/95" : "text-bone/90"
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

                <div className={`border-t pt-6 flex items-end gap-3 transition-colors duration-300 ${
                  isHovered ? "border-yolk/20" : "border-bone/20"
                }`}>
                  <span className={`type-display text-5xl transition-colors duration-300 ${
                    isHovered ? "text-yolk" : "text-bone"
                  }`}>{step.stat}</span>
                  <span className={`type-caption mb-1.5 text-[9px] transition-colors duration-300 ${
                    isHovered ? "text-yolk/70" : "text-bone/70"
                  }`}>{step.statLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="type-label text-bone/60 text-[10px]">
            Dan&apos;s Hamburgers · Austin, Texas · Est. 1973
          </p>
          <p className="type-serif italic text-bone/80 max-w-sm text-right hidden md:block">
            &quot;We don&apos;t rush quality. We make every burger to order.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
