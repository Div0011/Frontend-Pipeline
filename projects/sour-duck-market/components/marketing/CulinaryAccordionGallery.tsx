"use client";

import React from "react";
import AccordionGallery, { AccordionGalleryItem } from "@/components/ui/AccordionGallery";

const galleryItems: AccordionGalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
    label: "Country Sourdough Loaf",
    category: "Natural Ferment",
    price: "$10",
    caption: "36-hour slow fermented wild yeast loaf with an ultra-crisp blistered dark crust and soft open crumb.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    label: "Smoked Brisket Sandwich",
    category: "Oak Wood Smoked",
    price: "$16",
    caption: "Central Texas oak-smoked brisket on griddled sourdough with fermented pickles and mustard barbecue sauce.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
    label: "Cardamom Morning Bun",
    category: "Laminated Pastry",
    price: "$6",
    caption: "Buttery flaky laminated brioche rolled in organic cane sugar, freshly ground cardamom, and orange zest.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
    label: "House Hand-Spun Shake",
    category: "Local Dairy",
    price: "$8",
    caption: "Creamy organic Texas vanilla soft serve spun with seasonal stone fruit preserve and sweet cream.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
    label: "Crispy Rosemary Potatoes",
    category: "Cast-Iron Crisp",
    price: "$7",
    caption: "Heritage potatoes fried in smoked tallow, finished with fresh chopped rosemary and flaky sea salt.",
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
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: "#EA580C" }} />
              <span className="font-sans text-xs tracking-widest uppercase font-bold" style={{ color: "#EA580C" }}>
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
          accentColor="#EA580C"
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
