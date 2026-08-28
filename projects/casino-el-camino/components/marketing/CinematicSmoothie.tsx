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
    { id: "slider", label: "Mini Burger Slider Skewer", desc: "A full mini chargrilled cheeseburger slider crowning the cocktail glass.", top: "35%", left: "55%" },
    { id: "bacon", label: "Thick Smoked Bacon Strip", desc: "Crisp hickory bacon providing smoky crunch.", top: "58%", left: "45%" },
    { id: "spicy-mix", label: "Scratch Horseradish Mary Mix", desc: "Fiery house tomato mix with fresh grated horseradish and hot sauce.", top: "72%", left: "62%" }
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
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-char p-4 border border-ember shadow-[0_0_20px_rgba(0,230,118,0.3)] z-40 pointer-events-none"
                          >
                            <p className="type-caption text-ember text-[10px] mb-1">{spot.label}</p>
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
            <p className="type-caption text-ember font-mono tracking-widest font-bold">
              6th Street Cocktail Institution
            </p>
            <h2 className="type-display text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.88] tracking-tight text-ink">
              World-Famous
              <br />
              <span className="text-ember">Loaded Bloody Marys</span>
            </h2>
            <p className="type-serif text-lg sm:text-xl md:text-2xl text-stone max-w-lg leading-relaxed">
              Austin&apos;s most celebrated hangover cure — loaded with a slider skewer, crispy bacon, pickled okra, and fiery horseradish mix.
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
            <p className="type-caption text-ember font-mono tracking-widest">
              Phase 02 / The Garnish Architecture
            </p>
            <h3 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              A Full Meal in<br />a Pint Glass
            </h3>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Texas premium vodka, hand-mixed horseradish tomato blend, hot peppers, and crowned with an entire appetizer spread.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-stone">
              <span className="text-ember font-bold">
                FRAME {Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT) + 1).toString().padStart(3, "0")} / {FRAME_COUNT}
              </span>
              <span className="h-3 w-px bg-ink/20" />
              <span>{pct}% POURED COLD</span>
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
            <p className="type-caption text-ember font-mono tracking-widest">
              Phase 03 / The 6th Street Pairing
            </p>
            <h3 className="type-display text-4xl sm:text-6xl text-ink leading-tight">
              Boilermakers &amp;<br />Austin Drafts
            </h3>
            <p className="type-serif text-lg sm:text-xl text-stone leading-relaxed">
              Pair your 3/4 lb Amarillo Burger with a tallboy Lone Star and well shot, or cold local IPAs on tap until 2 AM.
            </p>
            <div className="flex justify-start lg:justify-end w-full">
              <Link
                href="/menu"
                className="btn-red text-xs font-bold shadow-xl"
              >
                View Drinks &amp; Cocktails →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </CanvasScrubber>
  );
}
