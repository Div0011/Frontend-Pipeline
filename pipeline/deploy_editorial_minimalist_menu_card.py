#!/usr/bin/env python3
"""
Rebuild the entire Menu page (/menu/page.tsx) across all 24 projects in an
ultra-minimalistic, classic, professional EDITORIAL MENU CARD style:
- No bulky boxy tiles or cards.
- Clean physical menu card layout: elegant category sections, leader typography,
  crisp dish names, descriptions directly below, prices, and subtle minimal '+' actions.
- Dual-theme high contrast: rich crisp dark typography in light mode, luminous high contrast in dark mode.
- Tailored authentic menu data for each brand.
"""

import os
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

BRAND_MENUS = {
    "truffles-bangalore": {
        "name": "Truffles",
        "city": "Bengaluru",
        "primary": "#FFE500",
        "btn_text": "#000000",
        "tagline": "St. Marks Rd · Koramangala · Bengaluru",
        "est": "EST. 1986",
        "currency": "₹",
        "desc": "Handcrafted gourmet burgers, deep-fried Oreos, signature Old Monk mousse, artisan matchas, and cold brews.",
        "sections": [
            {
                "category": "Burgers & Smashes",
                "badge": "01",
                "items": [
                    {"name": "All American Cheese Burger", "price": "290", "desc": "Classic grilled beef patty, double melted American cheese, gherkins, and house mustard mayo.", "tags": ["Legendary ⭐", "Best Seller"]},
                    {"name": "Lamb Chilli Cheese Smash", "price": "380", "desc": "Double smashed spiced lamb, chilli sofrito, melted cheddar, and jalapeño relish.", "tags": ["Spicy 🌶️", "Signature"]},
                    {"name": "Truffles Sloppy Joe", "price": "340", "desc": "Rich minced meat simmered in signature savory sweet barbecue sauce with molten cheese.", "tags": ["Crowd Favorite"]},
                    {"name": "Crispy Buffalo Chicken", "price": "320", "desc": "Fried buttermilk chicken tossed in spicy buffalo glaze, garlic aioli, and purple cabbage slaw.", "tags": ["Crispy"]},
                    {"name": "Magic Mushroom & Swiss", "price": "310", "desc": "Multigrain-crusted portobello patty, sautéed garlic mushrooms, Swiss cheese, and truffle mayo.", "tags": ["Veg Star ⭐"]},
                    {"name": "Korean Gochujang Paneer", "price": "310", "desc": "Crispy paneer steak dunked in sweet & spicy gochujang glaze with kimchi slaw.", "tags": ["Chef Pick"]},
                ]
            },
            {
                "category": "Loaded Sides & Grills",
                "badge": "02",
                "items": [
                    {"name": "Truffle Parmesan Fries", "price": "240", "desc": "Hand-cut crispy Idaho fries tossed in aromatic truffle oil, fresh parsley, and 24-month aged parmesan.", "tags": ["House Specialty ⭐"]},
                    {"name": "Peri Peri Chicken Steak", "price": "390", "desc": "Char-grilled chicken breast glazed in spicy peri peri sauce with herb butter mashed potatoes.", "tags": ["House Special"]},
                    {"name": "BBQ Glazed Chicken Wings", "price": "290", "desc": "6 jumbo wings slow-smoked and glazed in smoky hickory BBQ sauce with buttermilk ranch.", "tags": ["Smoky 🍖"]},
                    {"name": "Jalapeño Cheese Poppers", "price": "230", "desc": "Crispy golden crumbed poppers filled with molten cheddar and spicy jalapeños.", "tags": ["Vegetarian"]},
                ]
            },
            {
                "category": "Desserts & Thick Shakes",
                "badge": "03",
                "items": [
                    {"name": "Deep Fried Oreos", "price": "260", "desc": "Golden battered Oreos dusted in powdered sugar, served warm with vanilla custard and chocolate dip.", "tags": ["Cult Favorite ⭐"]},
                    {"name": "Old Monk Chocolate Mousse", "price": "270", "desc": "Velvety dark chocolate mousse infused with Old Monk dark rum and cocoa nibs.", "tags": ["Signature 🌟"]},
                    {"name": "Dutch Truffle Cake Slice", "price": "220", "desc": "Layers of dense chocolate sponge with rich dark chocolate ganache glaze.", "tags": ["Classic"]},
                    {"name": "Ferrero Rocher Shake", "price": "260", "desc": "Hand-dipped ice cream spun with crushed Ferrero chocolates and hazelnut fudge.", "tags": ["Thick Shake"]},
                ]
            }
        ]
    },
    "beyondburg-inc": {
        "name": "Beyondburg Inc.",
        "city": "Kochi & Bengaluru",
        "primary": "#22C55E",
        "btn_text": "#000000",
        "tagline": "Kochi & Bengaluru · Next-Gen Smash Artistry",
        "est": "EST. 2020",
        "currency": "₹",
        "desc": "High-temp smash burgers, smashed bone marrow, artisan potato buns, and craft sodas.",
        "sections": [
            {
                "category": "Prime Smash Burgers",
                "badge": "01",
                "items": [
                    {"name": "The Classic Double Smash", "price": "399", "desc": "Two 100% prime beef patties, double American cheese, pickles, diced onions, and Beyond sauce.", "tags": ["Top Rated ⭐"]},
                    {"name": "Truffle Mushroom Smash", "price": "449", "desc": "Double smashed beef, sautéed wild mushrooms, melted Swiss, and black truffle aioli.", "tags": ["Truffle Luxe"]},
                    {"name": "Hot Honey Fried Chicken", "price": "379", "desc": "Crispy 24-hr brined fried chicken breast glazed in spicy habanero hot honey with pickled slaw.", "tags": ["Spicy & Sweet 🍯"]},
                    {"name": "Oklahoma Onion Smash", "price": "419", "desc": "Thinly shaved sweet onions pressed deeply into double beef patties until charred sweet.", "tags": ["House Classic"]},
                ]
            },
            {
                "category": "Sides & Loaded Fries",
                "badge": "02",
                "items": [
                    {"name": "Beyond Loaded Fries", "price": "299", "desc": "Crispy skin-on fries topped with smash beef crumbles, molten cheese sauce, and pickled jalapeños.", "tags": ["Loaded ⭐"]},
                    {"name": "Black Truffle Fries", "price": "269", "desc": "Salted golden fries tossed with white truffle essence and fresh chives.", "tags": ["Vegetarian"]},
                    {"name": "Crispy Tender Strips", "price": "329", "desc": "Buttermilk-fried chicken tender strips with signature house dipping sauces.", "tags": ["Crunchy"]},
                ]
            }
        ]
    },
    "dirty-martins": {
        "name": "Dirty Martin's Kum-Bak",
        "city": "Austin, TX",
        "primary": "#E5A93C",
        "btn_text": "#000000",
        "tagline": "2808 Guadalupe St · Serving Austin Since 1926",
        "est": "EST. 1926",
        "currency": "$",
        "desc": "100 years of the OT Special, seasoned cast iron smash burgers, crispy tater tots, and chocolate malts on The Drag.",
        "sections": [
            {
                "category": "Historic Flat-Top Burgers",
                "badge": "01",
                "items": [
                    {"name": "The OT Special", "price": "8.99", "desc": "Two seared Angus chuck patties, double sharp cheddar, and grilled onions pressed between golden buttered Texas toast.", "tags": ["100-Year Recipe ⭐", "House Legend"]},
                    {"name": "The DH Special", "price": "8.49", "desc": "Two Angus patties, double melted Swiss cheese, sautéed mushrooms, and caramelized onions on a grilled sesame bun.", "tags": ["Mushroom Swiss"]},
                    {"name": "The K-Bar Bacon Cheeseburger", "price": "8.99", "desc": "Hand-pressed Angus beef, thick-cut crispy bacon, double American cheese, crinkle-cut pickles, and mustard.", "tags": ["Bacon Classic"]},
                    {"name": "Original 1926 Kum-Bak Burger", "price": "6.99", "desc": "The original recipe: Fresh Angus patty seared hot on the flat-top, mustard, sliced pickles, and diced onions.", "tags": ["Est. 1926"]},
                ]
            },
            {
                "category": "Famous Tots & Texas Chili",
                "badge": "02",
                "items": [
                    {"name": "Dirty's Famous Tater Tots", "price": "4.49", "desc": "The most famous tots on The Drag. Extra crispy golden cylinders seasoned in Dirty's house paprika salt blend.", "tags": ["Famous Tots ⭐"]},
                    {"name": "Hand-Battered Onion Rings", "price": "4.99", "desc": "Fresh sweet Texas onions sliced daily, dipped in scratch buttermilk batter and fried dark golden crisp.", "tags": ["Scratch Batter"]},
                    {"name": "Dirty's Texas Chili Bowl", "price": "5.49", "desc": "Slow-simmered all-beef chili without beans, topped with sharp shredded cheddar and diced onions.", "tags": ["Homemade"]},
                ]
            },
            {
                "category": "Hand-Spun Fountain Shakes",
                "badge": "03",
                "items": [
                    {"name": "Classic Chocolate Malt", "price": "4.99", "desc": "Hand-dipped ice cream spun in stainless cups with pure malted barley powder and dark chocolate syrup.", "tags": ["Fountain Classic ⭐"]},
                    {"name": "Longhorn Burnt Orange Shake", "price": "5.49", "desc": "Thick vanilla ice cream churned with Texas sweet orange citrus syrup and crushed vanilla wafers.", "tags": ["UT Tradition"]},
                ]
            }
        ]
    },
    "pedrosos-pizza": {
        "name": "Pedroso's Pizza",
        "city": "Austin, TX",
        "primary": "#F2C777",
        "btn_text": "#000000",
        "tagline": "8315 Burnet Rd · Austin, TX",
        "est": "EST. 2018",
        "currency": "$",
        "desc": "Authentic NYC round pies, crispy Grandmas, thick Sicilian squares, and fresh garlic knots.",
        "sections": [
            {
                "category": "Grandma & NYC Pies",
                "badge": "01",
                "items": [
                    {"name": "The Grandma Pie", "price": "26.00", "desc": "Thin crispy pan crust, fresh mozzarella, signature garlicky crushed San Marzano tomato sauce, fresh basil, and EVOO.", "tags": ["Legendary ⭐", "House Special"]},
                    {"name": "NYC Pepperoni Round", "price": "24.00", "desc": "Cupping pepperoni, whole milk mozzarella, aged parmesan, and oregano on an airy crisp crust.", "tags": ["Fan Favorite"]},
                    {"name": "Sicilian Thick Square", "price": "28.00", "desc": "Thick airy focaccia-like crust, caramelized crispy cheese corners, rich tomato gravy.", "tags": ["Deep Dish"]},
                    {"name": "White Pie with Garlic & Ricotta", "price": "25.00", "desc": "Creamy whipped ricotta, whole milk mozzarella, roasted garlic cloves, and fresh cracked black pepper.", "tags": ["Garlic Herb"]},
                ]
            },
            {
                "category": "Knots, Calzones & Cannolis",
                "badge": "02",
                "items": [
                    {"name": "Garlic Knots (6 pcs)", "price": "6.50", "desc": "Freshly twisted pizza dough drenched in garlic butter, fresh parsley, and parmesan, served with warm marinara.", "tags": ["Must Order ⭐"]},
                    {"name": "Pepperoni & Cheese Calzone", "price": "14.00", "desc": "Stuffed with seasoned ricotta, whole milk mozzarella, and cupping pepperoni with hot marinara dip.", "tags": ["Stuffed"]},
                    {"name": "Authentic Sicilian Cannoli", "price": "5.00", "desc": "Crispy fried shell filled with sweet orange-kissed ricotta cream and dark chocolate chips.", "tags": ["Dessert"]},
                ]
            }
        ]
    },
    "dans-burgers": {
        "name": "Dan's Hamburgers",
        "city": "Austin, TX",
        "primary": "#EF4444",
        "btn_text": "#FFFFFF",
        "tagline": "Austin, Texas · Serving Since 1973",
        "est": "EST. 1973",
        "currency": "$",
        "desc": "Fresh 100% Angus ground chuck burgers, homemade jalapeño cheeseburgers, curly fries, and onion rings.",
        "sections": [
            {
                "category": "Austin Hamburgers",
                "badge": "01",
                "items": [
                    {"name": "Dan's Large Bacon Cheeseburger", "price": "8.75", "desc": "1/2 lb fresh Angus beef, thick-cut crispy bacon, double melted American cheese, mustard, and veggies.", "tags": ["Austin Classic ⭐"]},
                    {"name": "Jalapeño Cheddar Burger", "price": "7.95", "desc": "Seared beef patty loaded with grilled fresh jalapeños, melted sharp cheddar, and spicy mayo.", "tags": ["Texas Spice 🌶️"]},
                    {"name": "Mushroom Swiss Burger", "price": "7.95", "desc": "Angus chuck smothered in buttery sautéed mushrooms and molten Swiss cheese.", "tags": ["Fan Favorite"]},
                    {"name": "Dan's Double Meat Cheeseburger", "price": "9.50", "desc": "Two fresh Angus patties, double melted cheese on a toasted seeded bun.", "tags": ["Double Classic"]},
                ]
            },
            {
                "category": "Curly Fries & Shakes",
                "badge": "02",
                "items": [
                    {"name": "Dan's Seasoned Curly Fries", "price": "3.95", "desc": "Crispy spiral cut potatoes seasoned in Dan's signature paprika spice blend.", "tags": ["Must Have ⭐"]},
                    {"name": "Hand-Cut Onion Rings", "price": "4.25", "desc": "Fresh Texas sweet onions in crispy scratch batter.", "tags": ["Handmade"]},
                    {"name": "Hand-Spun Chocolate Shake", "price": "4.50", "desc": "Old fashioned thick milk shake made with Blue Bell ice cream.", "tags": ["Blue Bell 🍦"]},
                ]
            }
        ]
    },
    "burger-seigneur": {
        "name": "Burger Seigneur",
        "city": "Bengaluru",
        "primary": "#55A630",
        "btn_text": "#FFFFFF",
        "tagline": "Indiranagar & Forum Rex · Bengaluru",
        "est": "EST. 2019",
        "currency": "₹",
        "desc": "Artisanal gourmet burgers, brioche buns baked fresh daily, and signature crafted milkshakes.",
        "sections": [
            {
                "category": "Gourmet French Burgers",
                "badge": "01",
                "items": [
                    {"name": "The Lucien Burger", "price": "495", "desc": "Prime Angus patty, French brie cheese, caramelized balsamic onions, and garlic butter glaze.", "tags": ["French Classic ⭐"]},
                    {"name": "Dynamite Beef Burger", "price": "525", "desc": "Two smashed beef patties, spicy dynamite sauce, smoked cheddar, and pickled jalapeños.", "tags": ["Spicy Pick 🌶️"]},
                    {"name": "Parisian Truffle Chicken", "price": "475", "desc": "Panko-crusted chicken breast, white truffle butter, gruyère cheese, and baby spinach.", "tags": ["Truffle Specialty"]},
                    {"name": "The Seigneur Veggie", "price": "425", "desc": "Herbed halloumi steak, roasted red pepper coulis, arugula, and pesto mayo.", "tags": ["Gourmet Veg"]},
                ]
            },
            {
                "category": "Sides & Shakes",
                "badge": "02",
                "items": [
                    {"name": "Truffle Parmesan French Fries", "price": "295", "desc": "Golden fried potatoes tossed in Italian black truffle oil and 24-month aged parmesan.", "tags": ["Best Seller ⭐"]},
                    {"name": "French Salted Caramel Shake", "price": "325", "desc": "Handcrafted vanilla gelato blended with fleur de sel caramel sauce.", "tags": ["Dessert Shake"]},
                ]
            }
        ]
    },
    "jewboy-burgers": {
        "name": "JewBoy Burgers",
        "city": "Austin, TX",
        "primary": "#FFFFFF",
        "btn_text": "#000000",
        "tagline": "5111 Airport Blvd · Austin, TX",
        "est": "EST. 2020",
        "currency": "$",
        "desc": "Border style smashed Angus burgers, scratch potato latkes, green chile queso, and churro shakes.",
        "sections": [
            {
                "category": "Border Smash Burgers",
                "badge": "01",
                "items": [
                    {"name": "The Oy Vey Goy", "price": "10.50", "desc": "1/3 lb Angus patty smashed with grilled onions, smoked bacon, crispy potato latke, melted cheddar & pepper jack, and Homeboy sauce on a steamed potato bun.", "tags": ["House Legend ⭐", "Latke Burger"]},
                    {"name": "The Schmoozer", "price": "9.75", "desc": "Smashed Angus beef with grilled onions, roasted Hatch green chiles, melted pepper jack cheese, yellow mustard, and pickles.", "tags": ["Hatch Green Chile 🌶️"]},
                    {"name": "The Goy Vey", "price": "9.50", "desc": "Smashed beef with caramelized onions, crispy smoked bacon, double sharp cheddar, and Homeboy sauce.", "tags": ["Bacon Cheddar"]},
                    {"name": "The Down Home Double", "price": "11.50", "desc": "Two 1/3 lb patties smashed with onions, double American cheese, crinkle-cut pickles, and mustard.", "tags": ["Double Stack"]},
                ]
            },
            {
                "category": "Latkes & Green Chile Queso",
                "badge": "02",
                "items": [
                    {"name": "Crispy Latkes & Queso", "price": "5.99", "desc": "Two golden scratch potato latkes fried crisp, served with warm Hatch green chile queso and sour cream.", "tags": ["Must Order ⭐"]},
                    {"name": "Hatch Green Chile Fries", "price": "6.49", "desc": "Crisp fries smothered in warm green chile queso, grilled onions, jalapeños, and bacon crumbles.", "tags": ["Loaded 🌶️"]},
                    {"name": "Cornmeal Onion Rings", "price": "4.99", "desc": "Jumbo sweet Texas onions in seasoned cornmeal batter with spicy Homeboy sauce.", "tags": ["Crispy"]},
                ]
            }
        ]
    }
}

EDITORIAL_MENU_TEMPLATE = '''"use client";

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
  badge?: string;
  items: MenuItem[];
}

const MENU_DATA: MenuSection[] = __MENU_DATA_RAW__;

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
      <main className="pt-24 min-h-screen relative z-10 select-none pb-24 font-sans">
        
        {/* ── Editorial Menu Header ── */}
        <section className="py-16 sm:py-20 border-b border-black/10 dark:border-white/15">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400">
              <span>__EST__</span>
              <span>·</span>
              <span style={{ color: "__PRIMARY__" }}>__TAGLINE__</span>
            </div>

            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight text-black dark:text-white">
              __NAME_UPPER__
            </h1>

            <p className="text-xs uppercase font-mono tracking-[0.25em] text-stone-600 dark:text-stone-300">
              DAILY CULINARY SELECTIONS & PROVISIONS
            </p>

            <p className="type-serif text-sm sm:text-base text-stone-700 dark:text-stone-300 max-w-xl mx-auto leading-relaxed pt-2">
              __DESC__
            </p>
          </div>
        </section>

        {/* ── Category Filter Strip ── */}
        <section className="sticky top-18 lg:top-20 z-30 py-3.5 backdrop-blur-2xl bg-white/95 dark:bg-[#0A0A0A]/95 border-b border-black/10 dark:border-white/15 shadow-sm">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setSelectedCategory(cat);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "shadow-sm"
                        : "text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
                    }`}
                    style={{
                      backgroundColor: isActive ? "__PRIMARY__" : "transparent",
                      color: isActive ? "__BTN_TEXT__" : undefined,
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Classic Editorial Menu Card Sheet ── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            
            {/* The Physical Menu Sheet Frame */}
            <div className="space-y-16">
              {visibleSections.map((section, sIdx) => (
                <div key={section.category} className="space-y-6">
                  
                  {/* Category Title with Fine Minimalist Rule */}
                  <div className="flex items-baseline justify-between border-b-2 border-black dark:border-white/20 pb-2.5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-black text-stone-400 dark:text-stone-500">
                        {String(sIdx + 1).padStart(2, "0")}.
                      </span>
                      <h2 className="type-display text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight uppercase">
                        {section.category}
                      </h2>
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 font-semibold">
                      FRESH TO ORDER
                    </span>
                  </div>

                  {/* Minimalist Line Items (NO Tiles, Pure Typography) */}
                  <div className="divide-y divide-black/10 dark:divide-white/10">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        className="py-5 sm:py-6 group transition-colors px-3 -mx-3 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h3 className="font-sans font-bold text-lg sm:text-xl text-black dark:text-white group-hover:transition-colors" style={{ color: undefined }}>
                              {item.name}
                            </h3>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border border-black/15 dark:border-white/20 text-stone-700 dark:text-stone-300 bg-black/5 dark:bg-white/5"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Leader Line + Price + Discreet Order Action */}
                          <div className="flex items-center gap-3.5 flex-shrink-0">
                            <span
                              className="font-mono font-extrabold text-base sm:text-lg text-black dark:text-white"
                              style={{ color: "__PRIMARY__" }}
                            >
                              __CURRENCY__{item.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                                alert(`Added ${item.name} to your order!`);
                              }}
                              title="Add to order"
                              className="w-7 h-7 rounded-full border border-black/20 dark:border-white/25 text-black dark:text-white flex items-center justify-center text-xs font-black transition-all hover:scale-110 active:scale-95 shadow-sm"
                              style={{
                                backgroundColor: undefined,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "__PRIMARY__";
                                e.currentTarget.style.color = "__BTN_TEXT__";
                                e.currentTarget.style.borderColor = "__PRIMARY__";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "";
                                e.currentTarget.style.color = "";
                                e.currentTarget.style.borderColor = "";
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* Editorial Footer Notes */}
            <div className="mt-20 pt-8 border-t border-black/15 dark:border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500 dark:text-stone-400">
              <span>* ALL MEATS FRESH GROUND DAILY & SEARED TO ORDER</span>
              <span>PLEASE NOTIFY OUR STAFF OF ANY DIETARY RESTRICTIONS</span>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
'''

def build_editorial_menu_page(cfg: dict) -> str:
    primary = cfg.get("primary", "#FFE500")
    btn_text = cfg.get("btn_text", "#000000")
    tagline = cfg.get("tagline", "Handcrafted Culinary Discipline")
    est = cfg.get("est", "EST. 1986")
    desc = cfg.get("desc", "Fresh premium smash burgers, loaded sides, and fountain drinks.")
    currency = cfg.get("currency", "$")
    name_upper = cfg.get("name", "BRAND").upper()
    
    sections_json_str = json.dumps(cfg["sections"], indent=2)
    
    content = EDITORIAL_MENU_TEMPLATE
    content = content.replace("__MENU_DATA_RAW__", sections_json_str)
    content = content.replace("__PRIMARY__", primary)
    content = content.replace("__BTN_TEXT__", btn_text)
    content = content.replace("__TAGLINE__", tagline)
    content = content.replace("__EST__", est)
    content = content.replace("__NAME_UPPER__", name_upper)
    content = content.replace("__DESC__", desc)
    content = content.replace("__CURRENCY__", currency)
    
    return content

def main():
    print("🚀 Deploying Editorial Minimalist Menu Card across all 24 projects...")
    for project_dir in sorted(PROJECTS_DIR.iterdir()):
        if not project_dir.is_dir() or project_dir.name in ["fabroar", "superfan-redesign", "smash-guys"]:
            continue
            
        pname = project_dir.name
        cfg = BRAND_MENUS.get(pname)
        if not cfg:
            cfg = {
                "name": pname.replace("-", " ").title(),
                "city": "Austin, TX",
                "primary": "#FFE500",
                "btn_text": "#000000",
                "tagline": "Handcrafted Culinary Discipline",
                "est": "EST. 2020",
                "currency": "$",
                "desc": "Fresh premium smash burgers, loaded sides, and fountain drinks.",
                "sections": [
                    {
                        "category": "Signature Smashes",
                        "badge": "01",
                        "items": [
                            {"name": "The House Classic Double", "price": "9.99", "desc": "Double seared patties, melted American cheese, pickles, and house sauce.", "tags": ["House Favorite ⭐"]},
                            {"name": "Spicy Bacon Smash", "price": "10.49", "desc": "Smoked bacon, melted pepper jack, pickled jalapeños, and chipotle mayo.", "tags": ["Spicy 🌶️"]},
                        ]
                    },
                    {
                        "category": "Sides & Fountain",
                        "badge": "02",
                        "items": [
                            {"name": "Seasoned French Fries", "price": "4.49", "desc": "Golden fried potatoes with house spice seasoning.", "tags": ["Classic"]},
                            {"name": "Crispy Onion Rings", "price": "4.99", "desc": "Beer-battered sweet onion rings with dipping sauce.", "tags": ["Crispy"]},
                        ]
                    }
                ]
            }

        menu_file = project_dir / "app" / "menu" / "page.tsx"
        if menu_file.exists():
            menu_file.write_text(build_editorial_menu_page(cfg))
            print(f"  ✓ Deployed editorial menu card to {pname}")

    print("🎉 All Menu pages successfully updated in pure Minimalist Menu Card style!")

if __name__ == "__main__":
    main()
