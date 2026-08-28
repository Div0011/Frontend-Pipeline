"use client";

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
    { id: "orange", label: "Burnt Orange Citrus", desc: "Texas sweet citrus syrup blended with creamy vanilla custard.", top: "35%", left: "55%" },
    { id: "wafers", label: "Crushed Vanilla Wafers", desc: "Crispy cookies folded into the shake for rich pie-crust texture.", top: "58%", left: "45%" },
    { id: "shiner", label: "Shiner Bock Draft", desc: "Cold draft beer poured in frosted mugs for the ultimate burger combo.", top: "72%", left: "62%" }
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

        {/* Hotspots */}
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
                      <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-ember opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-ember border border-char"></span>

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-char p-4 border border-char-mute shadow-2xl z-40 pointer-events-none"
                          >
                            <p className="type-caption text-[#BF5700] text-[10px] mb-1">{spot.label}</p>
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

        {/* Stage 1 */}
        <div
          className="absolute inset-0 flex items-center px-6 lg:px-8 transition-all duration-700 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(-40px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="space-y-6 max-w-3xl">
            <p className="type-caption text-[#BF5700] font-mono tracking-widest">
              Fountain &amp; Taproom Classics · Est. 1926
            </p>
            <h2 className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.88] tracking-tight text-ink">
              Burnt Orange
              <br />
              <span className="text-[#BF5700]">Shakes &amp; Cold Pints</span>
            </h2>
            <p className="type-serif text-lg sm:text-xl md:text-2xl text-stone max-w-lg leading-relaxed">
              Hand-spun Longhorn shakes with Texas orange syrup, classic chocolate malts, and ice-cold drafts on tap.
            </p>
          </div>
        </div>

        {/* Stage 2 */}
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
            <p className="type-caption text-[#BF5700] font-mono tracking-widest">
              Phase 02 / The Longhorn Pour
            </p>
            <h3 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Hand-Spun in<br />Stainless Steel
            </h3>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Real Texas creamery ice cream, whole milk, pure barley malt, and cold drafts — served the exact same way for 100 years.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-stone">
              <span className="text-[#BF5700] font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-ink/20" />
              <span>{pct}% SPUN FRESH</span>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
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
            <p className="type-caption text-[#BF5700] font-mono tracking-widest">
              Phase 03 / The Victory Pairing
            </p>
            <h3 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Pair with Tots &amp;<br />OT Special
            </h3>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Nothing tops an OT Special with a frosty Shiner Bock or Longhorn Burnt Orange shake after a game day on The Drag.
            </p>
            <div className="flex justify-start lg:justify-end w-full">
              <Link
                href="/menu"
                className="btn-red text-xs font-bold shadow-xl"
              >
                View Shakes &amp; Drinks →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
