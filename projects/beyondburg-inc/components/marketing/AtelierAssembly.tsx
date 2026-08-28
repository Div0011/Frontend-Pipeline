"use client";

import React, { useState } from "react";
import MorphSlider, { MorphSliderItem } from "@/components/ui/MorphSlider";

const morphSlides: MorphSliderItem[] = [
  {
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600&auto=format&fit=crop",
    title: "01. Butter-Griddled Potato Roll",
    tag: "TOASTED GOLDEN · 400°F",
    caption: "Plush, cloud-soft Pennsylvania potato roll toasted in cultured sweet cream butter on a searing flat-top until caramel crust forms.",
  },
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop",
    title: "02. Dual Smashed Beef Patties",
    tag: "MAILLARD CRUST · 450°F CAST IRON",
    caption: "Two 90g fresh coarse-ground beef balls smashed paper-thin with extreme downward pressure to create maximum lacy caramelized edges.",
  },
  {
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1600&auto=format&fit=crop",
    title: "03. Molten American Cheese Melt",
    tag: "STEAM DOME · DOUBLE MELT",
    caption: "Classic high-viscosity American cheese draped over sizzling patties, trapped under a stainless steel dome with ice steam for liquid melt.",
  },
  {
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1600&auto=format&fit=crop",
    title: "04. Griddled Onions & Dill Chips",
    tag: "SWEET & TANGY CRUNCH",
    caption: "Sweet diced onions seared directly into the beef juices paired with thick crinkle-cut sour dill chips for acidic balance.",
  },
  {
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1600&auto=format&fit=crop",
    title: "05. Secret Animal Sauce Infusion",
    tag: "HOUSE EMULSION · PAPRIKA & RELISH",
    caption: "Generous smear of our velvety house smash sauce loaded with slow-cooked allium confit, coarse mustard, and smoked paprika.",
  },
];

export default function AtelierAssembly() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-yolk" />
              <span className="text-yolk font-mono text-xs tracking-widest uppercase font-bold">
                ANATOMICAL BUILD
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-bone">
              THE SMASH CRAFT MORPHER
            </h2>
          </div>
          <p className="text-smoke text-xs sm:text-sm font-mono max-w-sm leading-relaxed">
            Five-layer craft build anatomy.
          </p>
        </div>

        {/* MorphSlider Component Container */}
        <div className="w-full relative shadow-2xl" style={{ height: "540px" }}>
          <MorphSlider
            items={morphSlides}
            transition="melt"
            intensity={0.6}
            aberration={0.4}
            drift={0.35}
            autoplay={false}
            overlayColor="#05060a"
            duration={1.2}
            ease="power2.inOut"
            scale={2.2}
            loop={true}
            radius={18}
            showCaptions={true}
            showControls={true}
            showIndicators={true}
          />
        </div>
      </div>
    </section>
  );
}
