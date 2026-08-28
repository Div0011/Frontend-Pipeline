"use client";

import React from "react";
import MorphSlider, { MorphSliderItem } from "@/components/ui/MorphSlider";

const morphSlides: MorphSliderItem[] = [
  {
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    "title": "Signature Double Smasher",
    "tag": "HOUSE SIGNATURE",
    "caption": "Fresh ground patties smashed ultra-thin on cast iron with melted cheese, grilled onions, and house sauce."
  },
  {
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
    "title": "Gourmet Truffle Melt",
    "tag": "CHEF SPECIAL",
    "caption": "Wild sauteed mushrooms, Swiss Gruyere melt, and black truffle aioli on toasted brioche."
  },
  {
    "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1200&auto=format&fit=crop",
    "title": "Crispy Buttermilk Poultry",
    "tag": "CRISPY FRIED",
    "caption": "24-hr brined fried chicken thigh tossed in spice glaze with vinegar slaw and dill pickles."
  },
  {
    "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop",
    "title": "Artisanal Gelato Shake",
    "tag": "HAND-SPUN SHAKES",
    "caption": "Slow-churned Madagascar vanilla gelato whipped with salted caramel crunch and whole cream."
  },
  {
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
    "title": "Seasoned Crinkle Cut Fries",
    "tag": "GOLDEN SIDES",
    "caption": "Crispy Idaho crinkle fries dusted with house rosemary sea salt and served with garlic dip."
  }
];

export default function AtelierAssembly() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#F5C418" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#F5C418" }}>
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
