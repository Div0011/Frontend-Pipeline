"use client";

import React from "react";
import MorphSlider, { MorphSliderItem } from "@/components/ui/MorphSlider";

const morphSlides: MorphSliderItem[] = [
  {
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    "title": "The O.T. Special (Original Texas)",
    "tag": "UT DRAG LEGEND 1926",
    "caption": "Cast-iron griddled beef patty with mustard, pickles, and grilled onions on a toasted bun."
  },
  {
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
    "title": "Kum-Bak Chili Cheeseburger",
    "tag": "HOUSE CHILI SPECIALS",
    "caption": "Smothered in 100-year recipe Texas all-meat chili and shredded sharp cheddar cheese."
  },
  {
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
    "title": "Centennial Chili Cheese Tots",
    "tag": "HISTORIC SIDES",
    "caption": "Golden crunchy potato tots buried under house chili, cheese sauce, and diced onions."
  },
  {
    "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop",
    "title": "Hand-Spun Longhorn Shake",
    "tag": "FOUNTAIN SHAKES",
    "caption": "Vanilla bean ice cream spun with salted caramel and chocolate malt swirl."
  },
  {
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    "title": "DH Double Bacon Cheeseburger",
    "tag": "SIGNATURE DOUBLES",
    "caption": "Double meat, double cheese, and double thick-cut hardwood smoked bacon."
  }
];

export default function AtelierAssembly() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-black border-b border-[#C68A14]/25 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C68A14" }} />
              <span className="font-sans text-xs tracking-widest uppercase font-bold" style={{ color: "#C68A14" }}>
                THE CRAFT
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-bone">
              THE CULINARY CRAFT MORPHER
            </h2>
          </div>
          
        </div>

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
