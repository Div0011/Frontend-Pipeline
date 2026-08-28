"use client";

import React from "react";
import AccordionGallery, { AccordionGalleryItem } from "@/components/ui/AccordionGallery";

const galleryItems: AccordionGalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    label: "Grandma Hot Pepperoni",
    category: "Roman Crisp Crust",
    price: "$22",
    caption: "Slow-fermented rectangular crust topped with spicy pepperoni cups, whole milk mozzarella, and hot honey drizzle.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
    label: "Margherita San Marzano",
    category: "Wood-Fired Classic",
    price: "$18",
    caption: "Crushed Italian San Marzano D.O.P. tomatoes, fresh fior di latte mozzarella, and torn organic sweet basil.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1200&auto=format&fit=crop",
    label: "House Pastrami Hero",
    category: "NJ Deli Cut",
    price: "$16",
    caption: "House-cured smoked brisket pastrami piled high on a stone-baked roll with spicy brown mustard and melted Swiss.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
    label: "Crispy Garlic Knots",
    category: "Artisan Starter",
    price: "$9",
    caption: "Fresh dough knots tossed in extra virgin olive oil, minced roasted garlic, fresh parsley, and aged Pecorino Romano.",
    link: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    label: "Classic Sicilian Square",
    category: "Deep Pan Thick Cut",
    price: "$20",
    caption: "Olive oil pan-baked thick airy dough with crispy caramelized cheese edges and sweet marinara.",
    link: "/menu",
  }
];

export default function CulinaryAccordionGallery() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-char text-bone border-b border-char-mute overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: "#B91C1C" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "#B91C1C" }}>
                INTERACTIVE SPECIMEN ACCORDION
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-bone tracking-tight font-bold">
              THE SENSORY GALLERY
            </h2>
          </div>
          <p className="text-smoke text-xs sm:text-sm font-mono max-w-md leading-relaxed">
            Hover or click to expand each culinary specimen. Experience fluid parallax depth, tilt physics, and ingredient breakdowns.
          </p>
        </div>

        {/* Accordion Gallery Component */}
        <AccordionGallery
          items={galleryItems}
          defaultIndex={0}
          expandRatio={0.48}
          trigger="hover"
          accentColor="#B91C1C"
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
