"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { locations, Location } from "@/lib/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Custom static location stats to add high-fidelity interactivity
const LOCATION_METRICS: Record<string, { busy: string; pct: number; wait: string; quadrant: string; cx: string; cy: string }> = {
  indiranagar: { busy: "Moderate", pct: 60, wait: "10 mins", quadrant: "East Bangalore", cx: "65%", cy: "50%" },
  bellandur:   { busy: "Very Busy", pct: 90, wait: "25 mins", quadrant: "South-East", cx: "75%", cy: "75%" },
  rmv:         { busy: "Quiet", pct: 25, wait: "0 mins", quadrant: "North Bangalore", cx: "35%", cy: "25%" },
  whitefield:  { busy: "Moderate", pct: 55, wait: "5 mins", quadrant: "Far East", cx: "90%", cy: "45%" },
};

export default function RestaurantLocations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hoveredLocId, setHoveredLocId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".loc-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
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

  const handleCopyInfo = (e: React.MouseEvent, loc: Location) => {
    e.preventDefault();
    e.stopPropagation();
    const text = `${loc.name}: ${loc.address}, Tel: ${loc.phone}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(loc.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section ref={sectionRef} className="bg-char section-cinematic border-b border-char-mute/30">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <div>
            <p className="type-caption text-yolk mb-3">Find Us</p>
            <h2 className="type-display text-6xl sm:text-8xl lg:text-[7rem] text-ink leading-[0.9]">
              OUR<br />ATELIERS
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="type-serif text-stone text-lg leading-relaxed">
              Four locations across Bangalore. Walk in anytime between 11am–11pm.
            </p>
            <Link href="/locations" className="inline-block mt-4 type-caption text-yolk text-xs hover:text-yolk-light transition-colors duration-300">
              All Locations →
            </Link>
          </div>
        </div>

        {/* Location grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc: Location) => {
            const metrics = LOCATION_METRICS[loc.id] ?? { busy: "Quiet", pct: 30, wait: "0 mins", quadrant: "Central", cx: "50%", cy: "50%" };
            const isHovered = hoveredLocId === loc.id;

            return (
              <div
                key={loc.id}
                onMouseEnter={() => setHoveredLocId(loc.id)}
                onMouseLeave={() => setHoveredLocId(null)}
                className="loc-card group relative block opacity-0 border border-char-mute hover:border-yolk/40 transition-all duration-400 overflow-hidden bg-char-soft"
              >
                {/* Image */}
                <div className="aspect-[3/2] relative overflow-hidden">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover brightness-50 group-hover:brightness-60 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  
                  {/* Flagship Badge */}
                  {loc.featured && (
                    <div className="absolute top-3 left-3 bg-yolk text-char type-caption text-[8px] px-2.5 py-1 z-10">
                      FLAGSHIP
                    </div>
                  )}

                  {/* Interactive Mini Bangalore Map Radar (Revealed on hover) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 bg-char/80 backdrop-blur-sm z-10 flex flex-col justify-between p-4"
                      >
                        <div className="flex justify-between items-center border-b border-char-mute pb-2">
                          <span className="type-caption text-yolk text-[8px]">RADAR SEARCH</span>
                          <span className="type-label text-ink text-[7px]">{metrics.quadrant}</span>
                        </div>

                        {/* Interactive Radar SVG Grid */}
                        <div className="w-full h-24 relative flex items-center justify-center">
                          <svg className="w-20 h-20 text-smoke/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                            <circle cx="50" cy="50" r="45" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="50" cy="50" r="28" strokeWidth="1" />
                            <line x1="50" y1="5" x2="50" y2="95" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="5" y1="50" x2="95" y2="50" strokeWidth="1" strokeDasharray="2 2" />
                            {/* Blinking hotspot dot */}
                            <circle cx={metrics.cx} cy={metrics.cy} r="4" fill="#F5C418" className="animate-ping" style={{ transformOrigin: "center" }} />
                            <circle cx={metrics.cx} cy={metrics.cy} r="3" fill="#F5C418" />
                          </svg>
                        </div>

                        <div className="text-center">
                          <p className="type-label text-smoke text-[8px]">WAIT TIME</p>
                          <p className="type-display text-2xl text-yolk">{metrics.wait}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3 relative">
                  <div className="flex items-start justify-between">
                    <h3 className="type-display text-2xl text-ink group-hover:text-yolk transition-colors duration-300">
                      {loc.name.toUpperCase()}
                    </h3>
                    <button
                      onClick={(e) => handleCopyInfo(e, loc)}
                      className="text-smoke hover:text-yolk transition-colors duration-300 text-xs font-mono uppercase tracking-wider"
                      title="Copy details to clipboard"
                    >
                      {copiedId === loc.id ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                  
                  <p className="type-body text-smoke text-sm">{loc.address}</p>
                  
                  {/* Dynamic wait/busy details visible on non-hover */}
                  <div className="flex items-center justify-between border-t border-char-mute/30 pt-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        metrics.busy === "Very Busy" ? "bg-ember" : metrics.busy === "Moderate" ? "bg-yolk" : "bg-green-500"
                      }`} />
                      <span className="type-label text-smoke text-[9px]">
                        {metrics.busy}
                      </span>
                    </div>
                    <span className="type-label text-smoke text-[8px]">
                      {metrics.wait} WAIT
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <svg className="w-3 h-3 text-smoke flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
