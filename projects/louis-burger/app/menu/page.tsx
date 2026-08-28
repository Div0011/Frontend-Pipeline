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
        <section className="py-16 lg:py-20 border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-black inline-block px-4 py-1.5 rounded-full shadow-md"
              style={{
                backgroundColor: "#FFE500",
                color: "#000000",
              }}
            >
              Handcrafted Culinary Discipline
            </span>

            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight text-black dark:text-white">
              LOUIS BURGER <br />
              <span
                style={{
                  color: "#FFE500",
                  textShadow: "0 0 20px #FFE50040",
                }}
              >
                CULINARY MENU
              </span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-stone-800 dark:text-stone-200 max-w-2xl leading-relaxed font-medium">
              Fresh premium smash burgers, loaded sides, and fountain drinks.
            </p>
          </div>
        </section>

        {/* Sticky Filter Bar */}
        <section className="sticky top-18 lg:top-20 z-30 py-4 backdrop-blur-2xl bg-white/95 dark:bg-[#0A0A0A]/95 border-b border-black/10 dark:border-white/10 shadow-xl">
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
                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap shadow-sm ${
                      isActive
                        ? "shadow-xl scale-105 ring-2 ring-offset-2 ring-black dark:ring-white"
                        : "bg-black/5 dark:bg-white/10 text-stone-800 dark:text-stone-100 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/20"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#FFE500" : undefined,
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

        {/* High-Contrast Menu Slabs */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
            {visibleSections.map((section) => (
              <div key={section.category} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
                  <h2
                    className="type-display text-3xl sm:text-4xl font-black text-black dark:text-white"
                  >
                    {section.category}
                  </h2>
                  <span
                    className="text-xs font-mono font-extrabold uppercase px-3 py-1 rounded-full shadow"
                    style={{
                      backgroundColor: "#FFE500",
                      color: "#000000",
                    }}
                  >
                    {section.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-6 sm:p-8 rounded-3xl bg-[#121212] border-2 border-white/15 hover:border-white/40 shadow-2xl hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between space-y-5 group"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3
                            className="type-display text-2xl sm:text-3xl font-black leading-tight group-hover:scale-[1.01] transition-transform"
                            style={{
                              color: "#FFE500",
                              textShadow: "0 0 15px #FFE50050",
                            }}
                          >
                            {item.name}
                          </h3>
                          <span
                            className="font-mono font-black text-sm sm:text-base px-3.5 py-1.5 rounded-full flex-shrink-0 shadow-lg"
                            style={{
                              backgroundColor: "#FFE500",
                              color: "#000000",
                            }}
                          >
                            ${item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/15">
                        {item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-mono uppercase font-bold px-3 py-1 rounded-full bg-white/10 text-stone-100 border border-white/20 shadow-sm"
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
                          className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 flex-shrink-0"
                          style={{
                            backgroundColor: "#FFE500",
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
