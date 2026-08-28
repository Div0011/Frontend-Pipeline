"use client";

import React from "react";
import MorphSlider, { MorphSliderItem } from "@/components/ui/MorphSlider";

const morphSlides: MorphSliderItem[] = [
  {
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    "title": "Backyard Smokehouse Double",
    "tag": "SIGNATURE SMOKE",
    "caption": "Hickory-smoked smashed patties with aged cheddar, caramelized bacon jam, and pitmaster BBQ sauce."
  },
  {
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
    "title": "Crispy Pork Belly Slider",
    "tag": "PITMASTER SPECIAL",
    "caption": "Slow-braised crispy pork belly with apple cider mustard slaw on a brioche slider."
  },
  {
    "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1200&auto=format&fit=crop",
    "title": "Nashville Cayenne Tender",
    "tag": "FRIED CHICKEN",
    "caption": "Buttermilk-soaked chicken breast tenders dusted with ghost pepper rub and honey glaze."
  },
  {
    "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop",
    "title": "Smoked Pecan Thickshake",
    "tag": "CRAFT SHAKES",
    "caption": "Roasted Texas pecans blended with vanilla bean cream, brown butter, and caramel crisp."
  },
  {
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
    "title": "Loaded Pitmaster Fries",
    "tag": "CRISPY SIDES",
    "caption": "Hand-cut skin-on fries topped with pulled beef bits, melted queso, and pickled jalapenos."
  }
];

export default function AtelierAssembly() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E67E22" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#E67E22" }}>
                LIQUID MORPH SCROLLYTELLING
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-bone">
              THE CULINARY CRAFT MORPHER
            </h2>
          </div>
          <p className="text-smoke text-xs sm:text-sm font-mono max-w-sm leading-relaxed">
            Step through the anatomical engineering and signature craft creations with chromatic liquid melt transitions.
          </p>
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
