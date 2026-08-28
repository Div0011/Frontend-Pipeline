"use client";

import React from "react";
import MorphSlider, { MorphSliderItem } from "@/components/ui/MorphSlider";

const morphSlides: MorphSliderItem[] = [
  {
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
    "title": "Lucien Portobello Brioche",
    "tag": "EUROPEAN GOURMET",
    "caption": "Whole roasted Portobello mushroom filled with sun-dried tomatoes, gouda melt, and truffle butter."
  },
  {
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    "title": "Dynamit Beef Smasher",
    "tag": "SIGNATURES",
    "caption": "Grass-fed smashed beef, dynamit spicy glaze, crispy shallots, and Swiss Emmental cheese."
  },
  {
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
    "title": "Traiteur Truffle Parmesan Fries",
    "tag": "LUXURY SIDES",
    "caption": "Thin-cut Belgian frites infused with Alba white truffle essence and aged Reggiano."
  },
  {
    "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop",
    "title": "Madagascar Vanilla Bean Float",
    "tag": "ARTISANAL DRINKS",
    "caption": "Single-origin Madagascar vanilla gelato drowned in sparkling botanical root beer."
  },
  {
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    "title": "Roquefort Blue Steak Burger",
    "tag": "CHEF RESERVE",
    "caption": "Dry-aged beef tenderloin patty topped with cave-aged French blue cheese and onion compote."
  }
];

export default function AtelierAssembly() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C8A96E" }} />
              <span className="font-sans text-xs tracking-widest uppercase font-bold" style={{ color: "#C8A96E" }}>
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
