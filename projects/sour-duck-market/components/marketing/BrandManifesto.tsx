"use client";

import React from "react";
import SplitText from "@/components/ui/SplitText";
import ShinyText from "@/components/ui/ShinyText";
import DecryptedText from "@/components/ui/DecryptedText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import FadeContent from "@/components/ui/FadeContent";

export default function BrandManifesto() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-char text-bone border-b border-char-mute relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-12" style={{ backgroundColor: "#EA580C" }} />
          <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#EA580C" }}>
            <DecryptedText
              text="THE SOUR DUCK STANDARD // EAST AUSTIN SPEC"
              speed={40}
              maxIterations={12}
              animateOn="view"
            />
          </span>
        </div>

        <FadeContent blur={false} duration={0.9}>
          <div className="space-y-4">
            <h2 className="type-display text-3xl sm:text-5xl md:text-6xl text-bone leading-tight">
              THICK FLUFFY PATTIES ARE BORING. WE BELIEVE IN THE{" "}
              <ShinyText
                text="NATURALLY FERMENTED SOURDOUGH BAKE"
                speed={3}
                shimmerColor="#EA580C"
                className="font-extrabold"
              />{" "}
              OF DUAL THIN PATTIES SMASHED WITH STEEL ON A RED-HOT FLAT TOP.
            </h2>
          </div>
        </FadeContent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <SpotlightCard
            spotlightColor="#EA580C25"
            className="hover:border-white/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold" style={{ color: "#EA580C" }}>01 // HEAVY STEEL SMASH</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: "#EA580C15", color: "#EA580C", borderColor: "#EA580C30" }}>
                  450°F
                </span>
              </div>
              <p className="text-smoke text-xs leading-relaxed font-body">
                We apply custom cast-iron press weight to flatten each patty against searing steel, caramelizing surface proteins instantly into crunchy lace edges.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="#EA580C25"
            className="hover:border-white/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold" style={{ color: "#EA580C" }}>02 // SQUISHY POTATO BUNS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: "#EA580C15", color: "#EA580C", borderColor: "#EA580C30" }}>
                  GOLDEN
                </span>
              </div>
              <p className="text-smoke text-xs leading-relaxed font-body">
                Plush Pennsylvania potato rolls griddled in pure sweet cream butter until golden, perfectly engineered to cushion molten cheese and savory dripping.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="#EA580C25"
            className="hover:border-white/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold" style={{ color: "#EA580C" }}>03 // CRAFT DIPS &amp; SHAKES</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: "#EA580C15", color: "#EA580C", borderColor: "#EA580C30" }}>
                  HAND-SPUN
                </span>
              </div>
              <p className="text-smoke text-xs leading-relaxed font-body">
                From hand-spun malt thickshakes to house animal-style loaded crinkle fries, every single side is designed to hit with maximum flavor impact.
              </p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
