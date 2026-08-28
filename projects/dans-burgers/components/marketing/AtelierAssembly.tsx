"use client";

import React from "react";
import MorphSlider, { MorphSliderItem } from "@/components/ui/MorphSlider";

const morphSlides: MorphSliderItem[] = [
  {
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    "title": "Dan's Special Cheeseburger",
    "tag": "AUSTIN CLASSIC 1973",
    "caption": "Fresh Texas beef on flat-top griddle with American cheese, shredded lettuce, tomato, and mayo on toasted sesame bun."
  },
  {
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
    "title": "Texas Toast Patty Melt",
    "tag": "GRIDDLED MELTS",
    "caption": "Caramelized sweet yellow onions and Swiss cheese pressed between thick buttered Texas toast."
  },
  {
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
    "title": "Dan-Air Onion Rings",
    "tag": "HAND-BATTERED",
    "caption": "Colossal sweet Texas onions hand-dunked in seasoned cornmeal batter and fried extra crisp."
  },
  {
    "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop",
    "title": "Malted Chocolate Shake",
    "tag": "OLD-FASHIONED SHAKES",
    "caption": "Real malted milk powder and Blue Bell chocolate ice cream spun in stainless steel malt cup."
  },
  {
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    "title": "Jalapeno Bacon Double",
    "tag": "HILL COUNTRY SMASHES",
    "caption": "Two seasoned beef patties layered with crispy hickory bacon and grilled Texas jalapenos."
  }
];

export default function AtelierAssembly() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#D97706" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#D97706" }}>
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
