"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuItems, MenuItem } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  { id: "all", label: "All Specimen" },
  { id: "burgers", label: "Smash Burgers" },
  { id: "sides", label: "Gourmet Sides" },
  { id: "shakes", label: "Artisan Drinks" },
];

export default function CinematicMenuReveal() {
  // Plain wrapper div for GSAP to pin — NOT a React section element
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item: MenuItem) => item.category === activeCategory);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const pinWrap = pinWrapRef.current;
    if (!pinWrap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrap,   // pin the wrapper div, NOT a React element
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      tl.to(glassRef.current, {
        opacity: 0,
        scale: 1.04,
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power2.inOut",
      }, 0.1);

      tl.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.2
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    // wrapper div — GSAP's pin-spacer wraps this, not a React section
    <div ref={pinWrapRef} className="relative w-full overflow-hidden bg-cream" style={{ height: "100svh" }}>

      {/* Glassmorphism overlay that GSAP dissolves */}
      <div
        ref={glassRef}
        className="absolute inset-0 z-20 bg-ink/50 backdrop-blur-2xl pointer-events-none"
      />

      {/* Header label visible through glass before dissolve */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <p className="type-caption text-gold font-mono tracking-widest">THE SPECIMEN SHEET</p>
      </div>

      {/* Content revealed below glass */}
      <div
        ref={contentRef}
        className="relative z-10 h-full overflow-y-auto flex flex-col justify-center max-w-[88rem] mx-auto px-6 lg:px-8 py-20 opacity-0"
      >
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="type-display text-4xl sm:text-6xl lg:text-7xl leading-[0.9] text-ink mb-8">
            Curated <span className="text-gold">Compositions</span>
          </h2>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 font-mono text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 tracking-wider uppercase border ${
                  activeCategory === cat.id
                    ? "bg-ink text-cream border-ink shadow-lg"
                    : "bg-transparent text-stone border-ink/10 hover:border-gold/40 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Specimen Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {filteredItems.slice(0, 4).map((item: MenuItem) => (
            <Link
              key={item.id}
              href="/menu"
              className="group block space-y-4 bg-cream-warm/60 p-4 rounded-sm border border-ink/5 hover:border-gold/25 transition-all duration-500"
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3 bg-ink text-cream text-[9px] font-mono tracking-widest px-2 py-1 uppercase rounded-sm z-10">
                  {item.tags[0] ?? "SPECIMEN"}
                </div>
                {/* Hover shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="type-display text-xl group-hover:text-gold transition-colors duration-500 text-ink">
                    {item.name}
                  </h3>
                  <span className="type-caption text-gold font-mono text-sm">₹{item.price}</span>
                </div>
                <p className="type-body text-stone text-xs leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 border border-ink/20 text-ink px-8 py-4 type-caption text-xs hover:border-gold hover:text-gold transition-all duration-500"
          >
            Explore Complete Menu Sheet →
          </Link>
        </div>
      </div>
    </div>
  );
}
