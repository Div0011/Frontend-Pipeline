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
    "category": "Signature Burgers",
    "badge": "\ud83c\udf54 SIGNATURE",
    "items": [
      {
        "name": "The House Classic Double",
        "price": "9.99",
        "desc": "Double seared patties, melted cheese, pickles, and house sauce",
        "tags": [
          "House Favorite \u2b50"
        ]
      },
      {
        "name": "Spicy Bacon Smash",
        "price": "10.49",
        "desc": "Smoked bacon, melted pepper jack, pickled jalape\u00f1os, and chipotle mayo",
        "tags": [
          "Spicy \ud83c\udf36\ufe0f"
        ]
      }
    ]
  },
  {
    "category": "Sides & Fries",
    "badge": "\ud83c\udf5f SIDES",
    "items": [
      {
        "name": "Seasoned French Fries",
        "price": "4.49",
        "desc": "Golden fried potatoes with house seasoning",
        "tags": [
          "Classic"
        ]
      },
      {
        "name": "Crispy Onion Rings",
        "price": "4.99",
        "desc": "Beer-battered onion rings with dipping sauce",
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
                backgroundColor: "#C68A1415",
                borderColor: "#C68A1440",
                color: "#C68A14",
              }}
            >
              Handcrafted Culinary Discipline
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight text-black dark:text-white"
            >
              GOOD FLIPPIN BURGERS <br />
              <span style={{ color: "#C68A14" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed">
              Fresh premium smash burgers, loaded sides, and fountain drinks.
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
                      backgroundColor: isActive ? "#C68A14" : undefined,
                      color: isActive ? "#FFFFFF" : undefined,
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
                      backgroundColor: "#C68A1415",
                      borderColor: "#C68A1435",
                      color: "#C68A14",
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
                              backgroundColor: "#C68A14",
                              color: "#FFFFFF",
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
                            backgroundColor: "#C68A14",
                            color: "#FFFFFF",
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
