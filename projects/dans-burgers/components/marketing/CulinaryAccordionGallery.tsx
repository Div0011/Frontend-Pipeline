"use client";

import React from "react";
import AccordionGallery, { AccordionGalleryItem } from "@/components/ui/AccordionGallery";

const galleryItems: AccordionGalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    label: "OG Double Smash",
    category: "Signature Beef",
    price: "$14",
    caption: "Dual fresh beef patties smashed razor-thin on searing cast iron to develop caramelized crispy lace crusts with molten cheese.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
    label: "Truffle Shroom Melt",
    category: "Gourmet Atelier",
    price: "$16",
    caption: "Sauteed wild cremini mushrooms, Swiss melt, roasted garlic black truffle aioli, and baby arugula on a buttered bun.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1200&auto=format&fit=crop",
    label: "Nashville Hot Cluck",
    category: "Buttermilk Fried",
    price: "$15",
    caption: "24-hr buttermilk brined whole chicken thigh drenched in cayenne spiced oil, vinegar dill slaw, and house comeback sauce.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
    label: "Hand-Spun Thick Shake",
    category: "Artisan Gelato",
    price: "$9",
    caption: "Slow-churned Madagascar vanilla bean gelato whipped with rich dark chocolate, Belgian malt crumble, and sweet cream.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
    label: "Loaded Animal Crinkle Fries",
    category: "Craft Sides",
    price: "$7",
    caption: "Triple-cooked Idaho crinkle fries tossed in molten American cheddar sauce, grilled sweet onions, and secret sauce.",
    link: "/menu",
  }
];

export default function CulinaryAccordionGallery() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: "#D97706" }} />
              <span className="font-sans text-xs tracking-widest uppercase font-bold" style={{ color: "#D97706" }}>
                GALLERY
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-bone tracking-tight font-bold">
              THE SENSORY GALLERY
            </h2>
          </div>
          
        </div>

        {/* Accordion Gallery Component */}
        <AccordionGallery
          items={galleryItems}
          defaultIndex={0}
          expandRatio={0.48}
          trigger="hover"
          accentColor="#D97706"
          textColor="#ffffff"
          grayscale={false}
          showLabels={true}
          duration={0.5}
          tilt={5}
          parallax={0.3}
          height={500}
          gap={12}
          radius={16}
          orientation="horizontal"
        />
      </div>
    </section>
  );
}
