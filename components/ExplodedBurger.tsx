"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    id: "top-bun",
    emoji: "🍔",
    label: "Sesame Top Bun",
    color: "#FFA500",
    desc: "Golden-brown brioche bun, glazed and sprinkled with toasted sesame seeds.",
  },
  {
    id: "mustard",
    emoji: "🟡",
    label: "Scribbled Mustard",
    color: "#FFD700",
    desc: "A sharp, tangy yellow mustard drizzle for that classic diner bite.",
  },
  {
    id: "pickles",
    emoji: "🥒",
    label: "Dill Pickles",
    color: "#228B22",
    desc: "Thick-cut, crunchy house dill pickles providing a refreshing acidity.",
  },
  {
    id: "onions",
    emoji: "🧅",
    label: "Grilled Onions",
    color: "#DDA0DD",
    desc: "Caramelized flat-top onions, sweet and seasoned with beef juices.",
  },
  {
    id: "cheese",
    emoji: "🧀",
    label: "Aged Cheddar Melt",
    color: "#FF8C00",
    desc: "Sharp yellow cheddar cheese, melted into every crevice of the hot patty.",
  },
  {
    id: "patty1",
    emoji: "🥩",
    label: "Lacy Beef Patty",
    color: "#8B4513",
    desc: "80/20 premium beef blend, smashed thin for maximum lacy, crispy edges.",
  },
  {
    id: "patty2",
    emoji: "🥩",
    label: "Second Beef Patty",
    color: "#8B4513",
    desc: "A second lacy-edged smash patty, double stacked for double the flavor.",
  },
  {
    id: "bottom-bun",
    emoji: "🍞",
    label: "Buttered Bottom Bun",
    color: "#DEB887",
    desc: "Toasted on the griddle with butter to secure all the juices and toppings.",
  },
];

export default function ExplodedBurger() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const totalLayers = layers.length;
    const ctx = gsap.context(() => {
      // Create ScrollTrigger Timeline to pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500", // Length of the scroll-scrubbed interaction
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update active index based on scroll progress
            const prog = self.progress;
            const index = Math.min(
              Math.floor(prog * totalLayers),
              totalLayers - 1
            );
            setActiveIndex(index);
          },
        },
      });

      // Animate burger layers separating vertically
      layers.forEach((_, i) => {
        const el = layerRefs.current[i];
        if (!el) return;

        // Tightly packed spacing is 14px center-to-center
        const startY = (i - 3.5) * 14;
        // Expanded spacing is 70px center-to-center
        const endY = (i - 3.5) * 70;

        // Set initial packed position
        gsap.set(el, { y: startY });

        // Animate to expanded position
        tl.to(
          el,
          {
            y: endY,
            ease: "power1.inOut",
          },
          0
        );

        // Animate left side text highlighting
        const item = itemRefs.current[i];
        if (item) {
          // Keep item dim initially, then light up when its progress range is active
          tl.fromTo(
            item,
            { opacity: 0.35, scale: 0.95, borderColor: "rgba(0,0,0,0.08)" },
            {
              opacity: 1,
              scale: 1.03,
              borderColor: "#FFC72C",
              backgroundColor: "rgba(255,199,44,0.08)",
              duration: 0.25,
              ease: "power2.out",
            },
            (i / totalLayers) * 0.8 // stagger start times along the timeline
          );

          // Return it to normal when moving past
          if (i < totalLayers - 1) {
            tl.to(
              item,
              {
                opacity: 0.5,
                scale: 0.98,
                borderColor: "rgba(0,0,0,0.08)",
                backgroundColor: "transparent",
                duration: 0.2,
                ease: "power2.in",
              },
              ((i + 0.85) / totalLayers) * 0.8
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 bg-brand-warm texture-grain overflow-hidden border-b-4 border-black"
    >
      {/* Background stars details */}
      <div className="absolute top-10 left-10 text-3xl opacity-10 select-none">★</div>
      <div className="absolute bottom-10 right-10 text-3xl opacity-10 select-none">★</div>
      <div className="absolute top-1/3 right-1/4 text-xl opacity-15 select-none">★</div>

      <div ref={containerRef} className="mx-auto w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Text & Steps */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p
              className="text-xs uppercase tracking-[0.3em] text-brand-yellow-dark mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Obsession
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none mb-6 text-brand-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EXPLODED <span className="font-script normal-case text-brand-yellow-dark block mt-2">burger</span>
            </h2>
            <p
              className="text-md text-brand-text-muted leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Scroll down to dissect our signature smash burger. Watch it expand 
              and inspect the craft behind each individual layer.
            </p>

            {/* Scrollable list items */}
            <div className="relative border-l-2 border-black/10 pl-6 space-y-3">
              {layers.map((layer, i) => {
                const isActive = activeIndex === i;
                return (
                  <div
                    key={layer.id}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                      isActive
                        ? "border-brand-yellow bg-white/40 shadow-sm"
                        : "border-transparent opacity-40"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_#000]"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.emoji}
                    </div>
                    <div>
                      <h4
                        className="font-bold text-brand-black text-lg tracking-tight uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {layer.label}
                      </h4>
                      <p
                        className="text-sm text-brand-text-muted mt-1 leading-snug"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Exploded burger visualization */}
          <div className="lg:col-span-6 relative h-[650px] flex items-center justify-center">
            {/* Visual background circle base */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-brand-yellow/5 border-4 border-dashed border-brand-yellow/15 flex items-center justify-center animate-spin-slow pointer-events-none" />

            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {layers.map((layer, i) => (
                <div
                  key={layer.id}
                  ref={(el) => {
                    layerRefs.current[i] = el;
                  }}
                  className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-black bg-brand-cream flex items-center justify-center text-4xl sm:text-5xl shadow-[6px_6px_0px_#000] cursor-pointer hover:scale-110 hover:-translate-y-1 hover:rotate-6 transition-all duration-300"
                  style={{
                    zIndex: layers.length - i,
                  }}
                >
                  <span className="select-none">{layer.emoji}</span>
                  {/* Miniature text tag for hover */}
                  <span
                    className="absolute -bottom-2 bg-black text-white px-2 py-0.5 rounded border border-black text-[9px] font-bold uppercase tracking-wider scale-0 hover:scale-100 transition-transform pointer-events-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {layer.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
