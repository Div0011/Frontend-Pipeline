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
  { id: "all", label: "All Items" },
  { id: "burgers", label: "Angus Burgers" },
  { id: "sides", label: "Homemade Sides" },
  { id: "shakes", label: "Malts & Shakes" },
];

export default function CinematicMenuReveal() {
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
          trigger: pinWrap,
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
    <div ref={pinWrapRef} className="relative w-full overflow-hidden bg-bone" style={{ height: "100svh" }}>

      <div
        ref={glassRef}
        className="absolute inset-0 z-20 bg-char/50 backdrop-blur-2xl pointer-events-none"
      />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <p className="type-caption text-ember font-sans tracking-widest font-bold">DAN&apos;S KITCHEN BOARD</p>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 h-full overflow-y-auto flex flex-col justify-center max-w-[88rem] mx-auto px-6 lg:px-8 py-20 opacity-0"
      >
        <div className="text-center mb-10">
          <h2 className="type-display text-4xl sm:text-6xl lg:text-7xl leading-[0.9] text-char mb-8">
            Austin <span className="text-ember">Favorites</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 font-sans text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 tracking-wider uppercase border font-bold ${
                  activeCategory === cat.id
                    ? "bg-ember text-bone border-ember shadow-lg"
                    : "bg-transparent text-stone border-char/10 hover:border-ember/40 hover:text-char"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {filteredItems.slice(0, 4).map((item: MenuItem) => (
            <Link
              key={item.id}
              href="/menu"
              className="group block space-y-4 bg-bone-warm p-4 rounded-sm border border-bone-dark hover:border-ember transition-all duration-500 shadow-sm"
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3 bg-char text-[#D97706] text-[9px] font-sans tracking-widest px-2 py-1 uppercase rounded-sm z-10 font-bold">
                  {item.tags[0] ?? "FAVORITE"}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-char/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="type-display text-xl group-hover:text-ember transition-colors duration-500 text-char">
                    {item.name}
                  </h3>
                  <span className="type-caption text-ember font-sans text-sm font-bold">${item.price.toFixed(2)}</span>
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
            className="inline-flex items-center gap-3 border border-char/20 text-char px-8 py-4 type-caption text-xs hover:border-ember hover:text-ember transition-all duration-500 font-bold"
          >
            Explore Complete Menu Board →
          </Link>
        </div>
      </div>
    </div>
  );
}
