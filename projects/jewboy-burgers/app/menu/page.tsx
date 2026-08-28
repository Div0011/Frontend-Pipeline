"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  tags?: string[];
}

interface MenuSection {
  category: string;
  badge: string;
  items: MenuItem[];
}

const MENU_DATA: MenuSection[] = [
  {
    "category": "Border Smash Burgers",
    "badge": "\ud83c\udf54 CAST IRON SMASH",
    "items": [
      {
        "name": "The Oy Vey Goy",
        "price": "10.50",
        "desc": "1/3 lb Angus patty smashed with grilled onions, smoked bacon, crispy potato latke, melted cheddar & pepper jack, and Homeboy sauce on a steamed Martin's potato bun",
        "tags": [
          "House Legend \u2b50",
          "Latke Burger"
        ]
      },
      {
        "name": "The Schmoozer",
        "price": "9.75",
        "desc": "Smashed Angus beef with grilled onions, roasted Hatch green chiles, melted pepper jack cheese, yellow mustard, and pickles",
        "tags": [
          "Hatch Green Chile \ud83c\udf36\ufe0f"
        ]
      },
      {
        "name": "The Goy Vey",
        "price": "9.50",
        "desc": "Smashed beef with caramelized onions, crispy smoked bacon, double sharp cheddar, and Homeboy sauce",
        "tags": [
          "Bacon Cheddar"
        ]
      },
      {
        "name": "The Down Home Double",
        "price": "11.50",
        "desc": "Two 1/3 lb patties smashed with onions, double American cheese, crinkle-cut pickles, and mustard",
        "tags": [
          "Double Stack"
        ]
      }
    ]
  },
  {
    "category": "Latkes & Green Chile Queso",
    "badge": "\ud83e\udd54 SCRATCH LATKES",
    "items": [
      {
        "name": "Crispy Latkes & Queso",
        "price": "5.99",
        "desc": "Two golden scratch potato latkes fried crisp, served with warm Hatch green chile queso and sour cream",
        "tags": [
          "Must Order \u2b50"
        ]
      },
      {
        "name": "Hatch Green Chile Fries",
        "price": "6.49",
        "desc": "Crisp fries smothered in warm green chile queso, grilled onions, jalape\u00f1os, and bacon crumbles",
        "tags": [
          "Loaded \ud83c\udf36\ufe0f"
        ]
      },
      {
        "name": "Cornmeal Onion Rings",
        "price": "4.99",
        "desc": "Jumbo sweet Texas onions in seasoned cornmeal batter with spicy Homeboy sauce",
        "tags": [
          "Crispy"
        ]
      }
    ]
  }
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(MENU_DATA.map((sec) => sec.category)))];

  const visibleSections =
    selectedCategory === "All"
      ? MENU_DATA
      : MENU_DATA.filter((sec) => sec.category === selectedCategory);

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen relative z-10 select-none pb-20">
        {/* Banner Section */}
        <section className="py-16 lg:py-24 border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-extrabold inline-block px-3.5 py-1.5 rounded-full border shadow-sm"
              style={{
                backgroundColor: "#FFFFFF15",
                borderColor: "#FFFFFF40",
                color: "#FFFFFF",
              }}
            >
              5111 Airport Blvd · Austin, TX
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight text-black dark:text-white"
            >
              JEWBOY BURGERS <br />
              <span style={{ color: "#FFFFFF" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed">
              Border style smashed Angus burgers, scratch potato latkes, green chile queso, and churro shakes.
            </p>
          </div>
        </section>

        {/* Category Tabs Sticky Filter Bar */}
        <section className="sticky top-18 lg:top-20 z-30 py-4 backdrop-blur-xl bg-white/90 dark:bg-[#0A0A0A]/90 border-b border-black/10 dark:border-white/10 shadow-lg">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setSelectedCategory(cat);
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "shadow-xl scale-105"
                        : "bg-black/5 dark:bg-white/5 text-stone-700 dark:text-stone-300 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#FFFFFF" : undefined,
                      color: isActive ? "#000000" : undefined,
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Menu Slabs Container - Fully Visible & Hydrated */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
            {visibleSections.map((section) => (
              <div key={section.category} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
                  <h2 className="type-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white">
                    {section.category}
                  </h2>
                  <span
                    className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border"
                    style={{
                      backgroundColor: "#FFFFFF15",
                      borderColor: "#FFFFFF35",
                      color: "#FFFFFF",
                    }}
                  >
                    {section.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border-2 border-black/10 dark:border-white/15 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="type-display text-2xl sm:text-3xl font-black text-black dark:text-white leading-tight">
                            {item.name}
                          </h3>
                          <span
                            className="font-mono font-extrabold text-sm sm:text-base px-3.5 py-1.5 rounded-full flex-shrink-0 shadow"
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#000000",
                            }}
                          >
                            ${item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-3 border-t border-black/5 dark:border-white/10">
                        {item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/15 text-stone-800 dark:text-stone-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div />
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                            alert(`Added ${item.name} to your order!`);
                          }}
                          className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 flex-shrink-0"
                          style={{
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                          }}
                        >
                          Order +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
