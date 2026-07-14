"use client";

import { MenuCategory } from "@/lib/menu";
import { MenuItemCard } from "@/components/MenuItemCard";
import Reveal from "@/components/Reveal";

export function MenuSection({ category }: { category: MenuCategory }) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 rounded-full border-4 border-black overflow-hidden flex items-center justify-center shrink-0 bg-brand-cream shadow-[4px_4px_0px_#000]">
              {category.title === "Matcha Specials" ? (
                <img src="/matcha-special.png" alt="Matcha" className="w-full h-full object-cover scale-110" />
              ) : category.title.includes("Sides") ? (
                <img src="/truffle-fries.png" alt="Sides" className="w-full h-full object-cover scale-110" />
              ) : (
                <span className="text-3xl select-none">{category.emoji}</span>
              )}
            </div>
            <h3
              className="text-3xl md:text-4xl font-bold text-brand-black uppercase tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {category.title}
            </h3>
          </div>
        </Reveal>

        <Reveal stagger className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          {category.items.map((item, idx) => (
            <MenuItemCard key={idx} item={item} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
