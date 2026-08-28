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
    "category": "Burgers & Smashes",
    "badge": "\ud83c\udf54 GOURMET SMASH",
    "items": [
      {
        "name": "All American Cheese Burger",
        "price": "290",
        "desc": "Classic grilled beef patty, double melted American cheese, gherkins, and house mustard mayo",
        "tags": [
          "Legendary \u2b50",
          "Best Seller"
        ]
      },
      {
        "name": "Lamb Chilli Cheese Smash",
        "price": "380",
        "desc": "Double smashed spiced lamb, chilli sofrito, melted cheddar, and jalape\u00f1o relish",
        "tags": [
          "Spicy \ud83c\udf36\ufe0f",
          "Signature"
        ]
      },
      {
        "name": "Truffles Sloppy Joe",
        "price": "340",
        "desc": "Rich minced meat simmered in signature savory sweet barbecue sauce with molten cheese",
        "tags": [
          "Crowd Favorite"
        ]
      },
      {
        "name": "Crispy Buffalo Chicken",
        "price": "320",
        "desc": "Fried buttermilk chicken tossed in spicy buffalo glaze, garlic aioli, and crispy slaw",
        "tags": [
          "Crispy Favorite"
        ]
      },
      {
        "name": "Magic Mushroom & Swiss",
        "price": "310",
        "desc": "Multigrain-crusted portobello patty, saut\u00e9ed garlic mushrooms, Swiss cheese, and truffle mayo",
        "tags": [
          "Veg Star \u2b50"
        ]
      },
      {
        "name": "Korean Gochujang Paneer",
        "price": "310",
        "desc": "Crispy paneer steak dunked in sweet & spicy gochujang glaze with kimchi slaw",
        "tags": [
          "Chef Pick"
        ]
      }
    ]
  },
  {
    "category": "Loaded Sides & Grills",
    "badge": "\ud83c\udf5f SIDES & CRISP",
    "items": [
      {
        "name": "Truffle Parmesan Fries",
        "price": "240",
        "desc": "Hand-cut crispy Idaho fries tossed in aromatic truffle oil, fresh parsley, and grated parmesan",
        "tags": [
          "House Specialty \u2b50"
        ]
      },
      {
        "name": "Peri Peri Chicken Steak",
        "price": "390",
        "desc": "Char-grilled chicken breast glazed in spicy peri peri sauce with mashed potato and herb butter",
        "tags": [
          "House Special"
        ]
      },
      {
        "name": "BBQ Glazed Chicken Wings",
        "price": "290",
        "desc": "6 jumbo wings slow-smoked and glazed in smoky hickory BBQ sauce with ranch dip",
        "tags": [
          "Smoky \ud83c\udf56"
        ]
      },
      {
        "name": "Jalape\u00f1o Cheese Poppers",
        "price": "230",
        "desc": "Crispy golden crumbed poppers filled with molten cheddar and spicy jalape\u00f1os",
        "tags": [
          "Vegetarian"
        ]
      }
    ]
  },
  {
    "category": "Desserts & Shakes",
    "badge": "\ud83e\udd64 SWEET & FOUNTAIN",
    "items": [
      {
        "name": "Deep Fried Oreos",
        "price": "260",
        "desc": "Golden battered Oreos dusted in powdered sugar, served warm with vanilla custard and chocolate dip",
        "tags": [
          "Cult Favorite \u2b50"
        ]
      },
      {
        "name": "Old Monk Chocolate Mousse",
        "price": "270",
        "desc": "Velvety dark chocolate mousse infused with Old Monk dark rum and cocoa nibs",
        "tags": [
          "Signature \ud83c\udf1f"
        ]
      },
      {
        "name": "Dutch Truffle Cake Slice",
        "price": "220",
        "desc": "Layers of dense chocolate sponge with rich dark chocolate ganache",
        "tags": [
          "Classic"
        ]
      },
      {
        "name": "Ferrero Rocher Shake",
        "price": "260",
        "desc": "Hand-dipped ice cream spun with crushed Ferrero chocolates and hazelnut fudge",
        "tags": [
          "Thick Shake"
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
              St. Marks Rd & Koramangala · Bengaluru
            </span>

            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight text-black dark:text-white">
              TRUFFLES <br />
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
              Handcrafted gourmet burgers, deep-fried Oreos, signature Old Monk mousse, artisan matchas, and cold brews.
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
                            ₹{item.price}
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
