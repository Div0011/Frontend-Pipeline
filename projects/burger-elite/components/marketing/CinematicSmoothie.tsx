"use client";

/**
 * CinematicSmoothie — Genre 2 (Restrained Centerpiece) scroll-scrubbed frame sequence.
 *
 * Mirrors CinematicHero's food-cinema pattern: single scroll-scrubbed visual moment
 * with GSAP-choreographed DOM text stages. Not Genre 1.
 */
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CanvasScrubber from "./CanvasScrubber";

const FRAME_COUNT = 248;
const SMOOTHIE_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/smoothie/frame_${String(i).padStart(6, "0")}.webp`
);

function getStage(progress: number): 1 | 2 | 3 {
  if (progress < 0.3) return 1;
  if (progress < 0.65) return 2;
  return 3;
}

export default function CinematicSmoothie() {
  const [progress, setProgress] = useState(0);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const stage = getStage(progress);
  const pct = Math.round(progress * 100);

  const HOTSPOTS = [
    { id: "matcha", label: "Organic Uji Matcha", desc: "Stone-ground green tea sourced from Kyoto, rich in L-theanine and clean energy.", top: "35%", left: "55%" },
    { id: "fruit", label: "Passionfruit Pulp", desc: "100% fresh passionfruit, cold pressed for a bright, tropical acidity.", top: "58%", left: "45%" },
    { id: "nectar", label: "Coconut Nectar", desc: "Low-glycemic natural sweetener derived from organic coconut palm blossoms.", top: "72%", left: "62%" }
  ];

  return (
    <CanvasScrubber
      frames={SMOOTHIE_FRAMES}
      scrollDistance="+=300%"
      onProgress={setProgress}
      overlayGradient
      preloadCount={60}
    >
      <div className="h-full max-w-[88rem] mx-auto px-6 lg:px-8 relative">

        {/* ── Interactive Recipe Hotspots (Visible during middle stages) ── */}
        <AnimatePresence>
          {stage === 2 && (
            <div className="absolute inset-0 z-30 pointer-events-none">
              {HOTSPOTS.map((spot) => {
                const isHovered = hoveredHotspot === spot.id;
                return (
                  <div
                    key={spot.id}
                    className="absolute pointer-events-auto"
                    style={{ top: spot.top, left: spot.left }}
                  >
                    <div
                      onMouseEnter={() => setHoveredHotspot(spot.id)}
                      onMouseLeave={() => setHoveredHotspot(null)}
                      className="relative flex items-center justify-center cursor-help w-8 h-8"
                    >
                      {/* Pulse Ring */}
                      <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#7C3AED] opacity-75"></span>
                      
                      {/* Core Dot */}
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7C3AED] border border-char"></span>

                      {/* Tooltip Overlay */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-char p-4 border border-char-mute shadow-2xl z-40 pointer-events-none"
                          >
                            <p className="type-caption text-[#7C3AED] text-[10px] mb-1">{spot.label}</p>
                            <p className="type-serif text-ink text-xs leading-relaxed">{spot.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* ── Stage 1: Liquid Craft Intro (0–30%) ── */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8 transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : stage < 1 ? "translateY(40px)" : "translateY(-40px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="space-y-6 max-w-3xl">
            <p className="type-caption text-gold font-mono tracking-widest">
              Fresh Pressed Atelier
            </p>
            <h2 className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.88] tracking-tight text-ink">
              Liquid
              <br />
              <span className="text-gold hover:text-gold-light transition-colors duration-300">Craft</span>
            </h2>
            <p className="type-serif text-lg sm:text-xl md:text-2xl text-stone max-w-lg leading-relaxed">
              From fresh fruit to glass — watch the smoothie drop, splash,
              and settle into cold perfection.
            </p>
          </div>
        </div>

        {/* ── Stage 2: Botanical Pour (30–65%) ── */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8"
          style={{
            opacity: stage === 2 ? 1 : 0,
            transform: stage === 2 ? "translateY(0)" : stage < 2 ? "translateY(40px)" : "translateY(-40px)",
            pointerEvents: stage === 2 ? "auto" : "none",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="space-y-6 max-w-2xl">
            <p className="type-caption text-gold font-mono tracking-widest">
              Phase 02 / Botanical Splashes
            </p>
            <h3 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Pure Natural<br />Viscosity
            </h3>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Real whole ingredients cold-blended into rich silkiness —
              no artificial additives or dilution. Ever.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-stone">
              <span className="text-gold font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-ink/20" />
              <span>{pct}% POURED</span>
            </div>
          </div>
        </div>

        {/* ── Stage 3: Final Drink Reveal (65–100%) ── */}
        <div
          className="absolute inset-0 flex items-center justify-start lg:justify-end px-6 lg:px-8"
          style={{
            opacity: stage === 3 ? 1 : 0,
            transform: stage === 3 ? "translateY(0)" : "translateY(40px)",
            pointerEvents: stage === 3 ? "auto" : "none",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="space-y-6 max-w-xl text-left lg:text-right flex flex-col items-start lg:items-end w-full">
            <p className="type-caption text-gold font-mono tracking-widest">
              Phase 03 / The Refreshment
            </p>
            <h3 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Matcha &amp; Passionfruit<br />Blend
            </h3>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Signature artisan elixirs prepared fresh daily to complement
              the rich crispness of our smash burgers.
            </p>
            <div className="flex justify-start lg:justify-end w-full">
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 bg-gold text-cream-dark px-8 py-4 type-caption text-xs hover:bg-ink hover:text-cream transition-colors duration-500 shadow-xl"
              >
                View Artisan Drinks →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
