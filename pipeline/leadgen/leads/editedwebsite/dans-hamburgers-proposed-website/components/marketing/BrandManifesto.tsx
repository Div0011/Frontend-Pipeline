"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  { text: "WE DON'T", color: "text-ink" },
  { text: "PRE-COOK.", color: "text-ember" },
  { text: "MADE TO ORDER.", color: "text-yolk" },
];

const TAGS = [
  "100% CERTIFIED ANGUS",
  "EST. 1973 AUSTIN",
  "FAMOUS $50 ONION RINGS",
  "HOMEMADE TEXAS BREAKFAST",
  "FAMILY OWNED & RUN",
  "HAND-DIPPED MALTS",
  "4 AUSTIN & BUDA LOCATIONS",
];

const COMIC_WORDS = ["DAN'S!", "EST. 1973", "ANGUS!", "ONION RINGS!", "TEXAS!", "AUSTIN!", "★"];

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  text: string;
  rotation: number;
  scale: number;
}

export default function BrandManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const tickerTweenRef = useRef<gsap.core.Tween | null>(null);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);

  // Griddle Thermostat Controller
  const [heatLevel, setHeatLevel] = useState(215);

  // Click particles state
  const [particles, setParticles] = useState<ClickParticle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Stagger the big words in
      gsap.fromTo(".manifesto-word",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Scroll-driven parallax background pattern
      gsap.fromTo(patternRef.current,
        { backgroundPositionY: "0%" },
        {
          backgroundPositionY: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Tags ticker scroll
      tickerTweenRef.current = gsap.fromTo(".manifesto-tags",
        { x: 0 },
        {
          x: "-50%",
          duration: 22,
          repeat: -1,
          ease: "none",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTickerEnter = () => {
    if (tickerTweenRef.current) {
      gsap.to(tickerTweenRef.current, { timeScale: 0.15, duration: 0.8, ease: "power2.out" });
    }
  };

  const handleTickerLeave = () => {
    if (tickerTweenRef.current) {
      gsap.to(tickerTweenRef.current, { timeScale: 1.0, duration: 0.8, ease: "power2.out" });
    }
  };

  // Click handler to spawn retro diner badges
  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input") || target.closest("a")) return;

    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const text = COMIC_WORDS[Math.floor(Math.random() * COMIC_WORDS.length)];
    const rotation = Math.random() * 40 - 20;
    const scale = Math.random() * 0.4 + 0.8;

    const newParticle: ClickParticle = {
      id: particleIdRef.current++,
      x,
      y,
      text,
      rotation,
      scale,
    };

    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleSectionClick}
      className="bg-char overflow-hidden relative border-b border-char-mute/30 min-h-[80vh] flex flex-col justify-between cursor-crosshair select-none"
    >
      {/* Griddle Heat Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 bg-ember"
        style={{
          opacity: Math.max(0, (heatLevel - 150) / 450),
          mixBlendMode: "screen",
        }}
      />

      {/* Pattern overlay */}
      <div
        ref={patternRef}
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(245,166,35,0.15) 1.5px, transparent 1.5px),
            radial-gradient(circle, rgba(196,43,28,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 20px 20px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />

      {/* Floating Click Badges */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, p.scale, p.scale, p.scale * 0.8],
              y: p.y - 60,
              rotate: p.rotation,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 bg-ember text-bone font-bold px-3 py-1.5 border-2 border-yolk text-xs type-display shadow-2xl skew-x-2"
            style={{
              boxShadow: "4px 4px 0px #181514",
            }}
          >
            {p.text}
          </motion.div>
        ))}
      </div>

      {/* Main manifesto content */}
      <div className="relative z-10 max-w-[88rem] mx-auto px-6 lg:px-8 pt-28 md:py-36 w-full">
        
        {/* Top bar with thermostat slider */}
        <div className="flex justify-between items-center mb-10">
          <p className="type-caption text-yolk">The Austin Tradition</p>
          
          {/* Griddle Thermostat Controller */}
          <div className="flex items-center gap-3 bg-char-soft/80 border border-char-mute/60 px-4 py-2 rounded-sm pointer-events-auto">
            <span className="type-label text-smoke text-[8px]">GRIDDLE HEAT:</span>
            <input
              type="range"
              min="100"
              max="250"
              value={heatLevel}
              onChange={(e) => setHeatLevel(parseInt(e.target.value))}
              className="accent-ember w-24 cursor-ew-resize h-1 bg-char-mute rounded-lg appearance-none"
            />
            <span className={`type-display text-sm ${heatLevel > 200 ? "text-yolk" : "text-ink"}`}>
              {heatLevel}°C
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {WORDS.map((w, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredWord(i)}
              onMouseLeave={() => setHoveredWord(null)}
              animate={{
                scale: hoveredWord === i ? 1.015 : 1,
                x: hoveredWord === i ? 8 : 0,
                textShadow: heatLevel > 210 && w.text.includes("PRE-COOK") ? "0 0 20px rgba(196,43,28,0.6)" : "none"
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`manifesto-word type-display text-6xl sm:text-8xl lg:text-[9.5rem] xl:text-[11.5rem] leading-[0.88] ${w.color} opacity-0 cursor-default select-none`}
            >
              {w.text}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <p className="type-serif text-xl sm:text-2xl text-stone leading-relaxed">
            In January 1973, Dan &amp; Frances Junk opened their first store on South Congress.
            50 years later, we still cut our onions fresh daily, hand-batter our onion rings, and griddle every single burger{" "}
            <span className="text-yolk hover:underline font-bold">
              fresh to order
            </span>.
          </p>
          <p className="type-body text-smoke text-base leading-relaxed flex flex-col justify-between">
            <span>
              We use 100% Certified Angus chuck, griddled hot with melted cheddar, crinkle-cut pickles, and house sauce.
              Carrying forward the family legacy under daughter{" "}
              <span className="text-yolk font-bold">
                Katie Congdon
              </span>, Dan&apos;s remains Austin&apos;s beloved home for honest burgers.
            </span>
            <span className="type-label text-[10px] text-yolk/70 mt-6 block font-mono">
              EST. 1973 · SOUTH CONGRESS · AUSTIN, TEXAS
            </span>
          </p>
        </div>
      </div>

      {/* Scrolling tag ticker */}
      <div 
        onMouseEnter={handleTickerEnter}
        onMouseLeave={handleTickerLeave}
        className="relative z-10 border-t border-char-mute py-5 overflow-hidden cursor-pointer bg-char-soft hover:bg-char-soft/80 transition-colors duration-300 pointer-events-auto"
      >
        <div className="flex" ref={tagsRef}>
          <div className="manifesto-tags flex gap-0 flex-shrink-0">
            {[...TAGS, ...TAGS].map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 px-8 type-caption text-smoke hover:text-yolk transition-colors duration-300 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 bg-ember rounded-full flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
          <div className="manifesto-tags flex gap-0 flex-shrink-0" aria-hidden>
            {[...TAGS, ...TAGS].map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 px-8 type-caption text-smoke hover:text-yolk transition-colors duration-300 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 bg-ember rounded-full flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
