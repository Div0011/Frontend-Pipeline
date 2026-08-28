#!/usr/bin/env python3
"""
Deploy high-contrast, visually prominent menu slabs across all 24 projects:
- Solid rich card backgrounds (Deep Charcoal #121212 with border border-white/20 & shadow-2xl)
- Item Name in crisp White (#FFFFFF) or High-Contrast Brand Color
- Price in prominent Brand-Colored Pill with high-contrast text
- Descriptions in crisp readable text (rgba(255,255,255,0.85))
- Tag Badges in distinct pill tags
- Quick "Add to Order +" button on each slab
"""

import os
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

ALL_BRAND_MENUS = {
    "truffles-bangalore": {
        "primary": "#FFE500",
        "btn_text": "#000000",
        "tagline": "St. Marks Rd & Koramangala · Bengaluru",
        "name": "Truffles",
        "desc": "Handcrafted gourmet burgers, deep-fried Oreos, signature Old Monk mousse, artisan matchas, and cold brews.",
        "currency": "₹",
        "sections": [
            {
                "title": "🍔 Burgers & Smashes",
                "subtitle": "Fresh griddled patties with homemade sauces and soft brioche buns",
                "items": [
                    {"name": "All American Cheese Burger", "price": "290", "desc": "Classic grilled beef patty, double melted American cheese, gherkins, and house mustard mayo", "tags": ["Legendary ⭐", "Best Seller"]},
                    {"name": "Lamb Chilli Cheese Smash", "price": "380", "desc": "Double smashed spiced lamb, chilli sofrito, melted cheddar, and jalapeño relish", "tags": ["Spicy 🌶️", "Signature"]},
                    {"name": "Crispy Buffalo Chicken", "price": "320", "desc": "Fried buttermilk chicken tossed in spicy buffalo glaze, garlic aioli, and crispy slaw", "tags": ["Crispy Favorite"]},
                    {"name": "Magic Mushroom & Swiss", "price": "310", "desc": "Multigrain-crusted portobello patty, sautéed garlic mushrooms, Swiss cheese, and truffle mayo", "tags": ["Veg Star ⭐"]},
                    {"name": "Korean Gochujang Paneer", "price": "310", "desc": "Crispy paneer steak dunked in sweet & spicy gochujang glaze with kimchi slaw", "tags": ["Chef Pick"]},
                ]
            },
            {
                "title": "🍟 Loaded Sides & Starters",
                "subtitle": "Golden fries, truffle crunches, and spicy wings",
                "items": [
                    {"name": "Truffle Parmesan Fries", "price": "240", "desc": "Hand-cut crispy Idaho fries tossed in aromatic truffle oil, fresh parsley, and grated parmesan", "tags": ["House Specialty"]},
                    {"name": "BBQ Glazed Chicken Wings", "price": "290", "desc": "6 jumbo wings slow-smoked and glazed in smoky hickory BBQ sauce with ranch dip", "tags": ["Smoky 🍖"]},
                    {"name": "Jalapeño Cheese Poppers", "price": "230", "desc": "Crispy golden crumbed poppers filled with molten cheddar and spicy jalapeños", "tags": ["Vegetarian"]},
                    {"name": "Crispy Onion Rings", "price": "190", "desc": "Beer-battered sweet onion rings served with spicy chipotle mayo", "tags": ["Classic"]},
                ]
            },
            {
                "title": "🥤 Hand-Spun Shakes & Desserts",
                "subtitle": "Classic ice cream shakes and iconic dessert jars",
                "items": [
                    {"name": "Deep Fried Oreos", "price": "260", "desc": "Golden battered Oreos dusted in powdered sugar, served warm with vanilla custard and chocolate dip", "tags": ["Cult Favorite ⭐"]},
                    {"name": "Old Monk Chocolate Mousse", "price": "270", "desc": "Velvety dark chocolate mousse infused with Old Monk dark rum and cocoa nibs", "tags": ["Signature 🌟"]},
                    {"name": "French Vanilla Biscuit Shake", "price": "240", "desc": "Hand-dipped vanilla ice cream churned with rich butter biscuits and salted caramel", "tags": ["Thick Shake"]},
                    {"name": "Belgian Dark Chocolate Shake", "price": "250", "desc": "Pure Belgian dark chocolate ganache blended with premium cream", "tags": ["Indulgent"]},
                ]
            }
        ]
    },
    "beyondburg-inc": {
        "primary": "#4ADE80",
        "btn_text": "#000000",
        "tagline": "Kochi & Bengaluru · Next-Gen Smash Artistry",
        "name": "Beyondburg Inc.",
        "desc": "High-temp smash burgers, smashed bone marrow, potato buns, and craft sodas.",
        "currency": "₹",
        "sections": [
            {
                "title": "🍔 Smashed Beef & Chicken",
                "subtitle": "Precision seared on 500°F flat-tops for lacy caramelized edges",
                "items": [
                    {"name": "The Classic Double Smash", "price": "399", "desc": "Two 100% prime beef patties, double American cheese, pickles, diced onions, and Beyond sauce", "tags": ["Top Rated ⭐"]},
                    {"name": "Truffle Mushroom Smash", "price": "449", "desc": "Double smashed beef, sautéed wild mushrooms, melted Swiss, and black truffle aioli", "tags": ["Truffle Luxe"]},
                    {"name": "Hot Honey Fried Chicken", "price": "379", "desc": "Crispy 24-hr brined fried chicken breast glazed in spicy habanero hot honey with pickled slaw", "tags": ["Spicy & Sweet 🍯"]},
                    {"name": "Oklahoma Onion Smash", "price": "419", "desc": "Thinly shaved sweet onions pressed deeply into double beef patties until charred sweet", "tags": ["House Classic"]},
                ]
            },
            {
                "title": "🍟 Truffle Fries & Sides",
                "subtitle": "Crispy accompaniments and dipping pots",
                "items": [
                    {"name": "Beyond Loaded Fries", "price": "299", "desc": "Crispy skin-on fries topped with smash beef crumbles, molten cheese sauce, and pickled jalapeños", "tags": ["Loaded ⭐"]},
                    {"name": "Black Truffle Fries", "price": "269", "desc": "Salted golden fries tossed with white truffle essence and fresh chives", "tags": ["Vegetarian"]},
                    {"name": "Crispy Tender Strips", "price": "329", "desc": "Buttermilk-fried chicken tender strips with signature dipping sauces", "tags": ["Crunchy"]},
                ]
            }
        ]
    },
    "dirty-martins": {
        "primary": "#E5A93C",
        "btn_text": "#000000",
        "tagline": "2808 Guadalupe St · Since 1926",
        "name": "Dirty Martin's Kum-Bak",
        "desc": "100 years of the OT Special, seasoned cast iron smash burgers, crispy tater tots, and chocolate malts on The Drag.",
        "currency": "$",
        "sections": [
            {
                "title": "🍔 Centennial Flat-Top Burgers",
                "subtitle": "Seared on our 100-year seasoned flat-top cast iron",
                "items": [
                    {"name": "The OT Special", "price": "8.99", "desc": "Two seared Angus chuck patties, double sharp cheddar, and grilled onions pressed between golden buttered Texas toast", "tags": ["100-Year Recipe ⭐", "House Legend"]},
                    {"name": "The DH Special", "price": "8.49", "desc": "Two Angus patties, double melted Swiss cheese, sautéed mushrooms, and caramelized onions on a grilled sesame bun", "tags": ["Mushroom Swiss"]},
                    {"name": "The K-Bar Bacon Cheeseburger", "price": "8.99", "desc": "Hand-pressed Angus beef, thick-cut crispy bacon, double American cheese, crinkle-cut pickles, and mustard", "tags": ["Bacon Classic"]},
                    {"name": "Original 1926 Kum-Bak Burger", "price": "6.99", "desc": "The original recipe: Fresh Angus patty seared hot on the flat-top, mustard, sliced pickles, and diced onions", "tags": ["Est. 1926"]},
                ]
            },
            {
                "title": "🍟 Famous Tots & Texas Chili",
                "subtitle": "Golden crispy tots and scratch buttermilk onion rings",
                "items": [
                    {"name": "Dirty's Famous Tater Tots", "price": "4.49", "desc": "The most famous tots on The Drag. Extra crispy golden cylinders seasoned in Dirty's house paprika salt blend", "tags": ["Famous Tots ⭐"]},
                    {"name": "Hand-Battered Onion Rings", "price": "4.99", "desc": "Fresh sweet Texas onions sliced daily, dipped in scratch buttermilk batter and fried dark golden crisp", "tags": ["Scratch Batter"]},
                    {"name": "Dirty's Texas Chili Bowl", "price": "5.49", "desc": "Slow-simmered all-beef chili without beans, topped with sharp shredded cheddar and diced onions", "tags": ["Homemade"]},
                ]
            }
        ]
    },
    "pedrosos-pizza": {
        "primary": "#F2C777",
        "btn_text": "#000000",
        "tagline": "8315 Burnet Rd · Austin, TX",
        "name": "Pedroso's Pizza",
        "desc": "Authentic NYC round pies, crispy Grandmas, thick Sicilian squares, and fresh garlic knots.",
        "currency": "$",
        "sections": [
            {
                "title": "🍕 Authentic NYC & Grandma Pies",
                "subtitle": "Cold-fermented 72-hour dough baked on deck ovens",
                "items": [
                    {"name": "The Grandma Pie", "price": "26.00", "desc": "Thin crispy pan crust, fresh mozzarella, signature garlicky crushed San Marzano tomato sauce, fresh basil, and extra virgin olive oil", "tags": ["Legendary ⭐", "House Special"]},
                    {"name": "NYC Pepperoni Round", "price": "24.00", "desc": "Cupping pepperoni, whole milk mozzarella, aged parmesan, and oregano on an airy crisp crust", "tags": ["Fan Favorite"]},
                    {"name": "Sicilian Thick Square", "price": "28.00", "desc": "Thick airy focaccia-like crust, caramelized crispy cheese corners, rich tomato gravy", "tags": ["Deep Dish"]},
                ]
            },
            {
                "title": "🥖 Knots, Calzones & Cannolis",
                "subtitle": "Scratch garlic knots and classic Italian desserts",
                "items": [
                    {"name": "Garlic Knots (6 pcs)", "price": "6.50", "desc": "Freshly twisted pizza dough drenched in garlic butter, fresh parsley, and parmesan, served with marinara", "tags": ["Must Order ⭐"]},
                    {"name": "Pepperoni & Cheese Calzone", "price": "14.00", "desc": "Stuffed with seasoned ricotta, mozzarella, and cupping pepperoni with hot marinara dip", "tags": ["Stuffed"]},
                ]
            }
        ]
    },
    "dans-burgers": {
        "primary": "#EF4444",
        "btn_text": "#FFFFFF",
        "tagline": "Austin, Texas · Serving Since 1973",
        "name": "Dan's Hamburgers",
        "desc": "Fresh 100% Angus ground chuck burgers, homemade jalapeño cheeseburgers, curly fries, and onion rings.",
        "currency": "$",
        "sections": [
            {
                "title": "🍔 Austin's Best Hamburgers",
                "subtitle": "Fresh daily Angus beef dressed with mustard, lettuce, tomato, pickles & onion",
                "items": [
                    {"name": "Dan's Large Bacon Cheeseburger", "price": "8.75", "desc": "1/2 lb fresh Angus beef, thick-cut crispy bacon, double melted American cheese, mustard, and veggies", "tags": ["Austin Classic ⭐"]},
                    {"name": "Jalapeño Cheddar Burger", "price": "7.95", "desc": "Seared beef patty loaded with grilled fresh jalapeños, melted sharp cheddar, and spicy mayo", "tags": ["Texas Spice 🌶️"]},
                    {"name": "Dan's Double Meat Cheeseburger", "price": "9.50", "desc": "Two fresh Angus patties, double melted cheese on a toasted seeded bun", "tags": ["Double Classic"]},
                ]
            },
            {
                "title": "🍟 Curly Fries & Homestyle Sides",
                "subtitle": "Fresh fried sides and handmade shakes",
                "items": [
                    {"name": "Dan's Seasoned Curly Fries", "price": "3.95", "desc": "Crispy spiral cut potatoes seasoned in Dan's signature paprika spice blend", "tags": ["Must Have ⭐"]},
                    {"name": "Hand-Cut Onion Rings", "price": "4.25", "desc": "Fresh Texas sweet onions in crispy scratch batter", "tags": ["Handmade"]},
                ]
            }
        ]
    },
    "jewboy-burgers": {
        "primary": "#FFFFFF",
        "btn_text": "#000000",
        "tagline": "5111 Airport Blvd · Shalom Y'all!",
        "name": "JewBoy Burgers",
        "desc": "Border style smashed Angus burgers, scratch potato latkes, green chile queso, and churro shakes.",
        "currency": "$",
        "sections": [
            {
                "title": "🍔 Border Smash Burgers",
                "subtitle": "1/3 lb Angus chuck smashed hot into onions on seasoned cast iron",
                "items": [
                    {"name": "The Oy Vey Goy", "price": "10.50", "desc": "1/3 lb Angus patty smashed with grilled onions, smoked bacon, crispy potato latke, melted cheddar & pepper jack, and Homeboy sauce on a steamed Martin's potato bun", "tags": ["House Legend ⭐", "Latke Burger"]},
                    {"name": "The Schmoozer", "price": "9.75", "desc": "Smashed Angus beef with grilled onions, roasted Hatch green chiles, melted pepper jack cheese, yellow mustard, and pickles", "tags": ["Hatch Green Chile 🌶️"]},
                    {"name": "The Goy Vey", "price": "9.50", "desc": "Smashed beef with caramelized onions, crispy smoked bacon, double sharp cheddar, and Homeboy sauce", "tags": ["Bacon Cheddar"]},
                ]
            },
            {
                "title": "🥔 Latkes & Green Chile Queso",
                "subtitle": "Scratch-shredded potato latkes and loaded queso fries",
                "items": [
                    {"name": "Crispy Latkes & Queso", "price": "5.99", "desc": "Two golden scratch potato latkes fried crisp, served with warm Hatch green chile queso and sour cream", "tags": ["Must Order ⭐"]},
                    {"name": "Hatch Green Chile Fries", "price": "6.49", "desc": "Crisp fries smothered in warm green chile queso, grilled onions, jalapeños, and bacon crumbles", "tags": ["Loaded 🌶️"]},
                ]
            }
        ]
    }
}

SLAB_MENU_PAGE_CODE = '''"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  tags?: string[];
}

interface MenuSection {
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const MENU_DATA: MenuSection[] = __MENU_DATA_JSON__;

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-[#0A0A0A] text-white relative z-10 select-none">
        {/* Banner Section */}
        <section className="py-20 lg:py-24 border-b border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-extrabold inline-block px-3.5 py-1.5 rounded-full border shadow-sm"
              style={{
                backgroundColor: "__PRIMARY__15",
                borderColor: "__PRIMARY__40",
                color: "__PRIMARY__",
              }}
            >
              __TAGLINE__
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{
                color: "__PRIMARY__",
                textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 30px __PRIMARY__50",
              }}
            >
              __NAME_UPPER__ <br />
              <span className="text-white">CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              __DESC__
            </p>
          </div>
        </section>

        {/* Category Tabs Sticky Bar */}
        <section className="sticky top-18 lg:top-20 z-30 py-4 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {MENU_DATA.map((sec, idx) => (
                <button
                  key={sec.title}
                  onClick={() => {
                    if ((window as any).playPopSound) (window as any).playPopSound();
                    setActiveTab(idx);
                  }}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeTab === idx
                      ? "shadow-2xl scale-105"
                      : "text-white/60 hover:text-white border border-white/10 hover:border-white/30"
                  }`}
                  style={{
                    backgroundColor: activeTab === idx ? "__PRIMARY__" : "transparent",
                    color: activeTab === idx ? "__BTN_TEXT__" : undefined,
                  }}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* High-Contrast Menu Slabs Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div>
                  <h2
                    className="type-display text-3xl sm:text-5xl font-black mb-2"
                    style={{
                      color: "__PRIMARY__",
                      textShadow: "0 2px 16px __PRIMARY__40",
                    }}
                  >
                    {MENU_DATA[activeTab].title}
                  </h2>
                  <p className="type-serif text-base sm:text-lg text-white/70">
                    {MENU_DATA[activeTab].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {MENU_DATA[activeTab].items.map((item) => (
                    <div
                      key={item.name}
                      className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-white/15 hover:border-white/40 shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3
                            className="type-display text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:transition-colors"
                            style={{
                              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                            }}
                          >
                            {item.name}
                          </h3>
                          <span
                            className="font-mono font-extrabold text-sm sm:text-base px-3.5 py-1.5 rounded-full flex-shrink-0 shadow-lg"
                            style={{
                              backgroundColor: "__PRIMARY__",
                              color: "__BTN_TEXT__",
                            }}
                          >
                            __CURRENCY__{item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm sm:text-base text-white/80 leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10">
                        {item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border"
                                style={{
                                  backgroundColor: "__PRIMARY__15",
                                  borderColor: "__PRIMARY__30",
                                  color: "__PRIMARY__",
                                }}
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
                          className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 flex-shrink-0"
                          style={{
                            backgroundColor: "__PRIMARY__",
                            color: "__BTN_TEXT__",
                          }}
                        >
                          Add +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
'''

def update_all_menu_pages():
    print("🚀 Deploying solid, high-contrast Menu Slabs across all projects...")
    for project_dir in sorted(PROJECTS_DIR.iterdir()):
        if not project_dir.is_dir() or project_dir.name in ["fabroar", "superfan-redesign", "smash-guys"]:
            continue
            
        pname = project_dir.name
        cfg = ALL_BRAND_MENUS.get(pname)
        if not cfg:
            cfg = {
                "primary": "#F59E0B",
                "btn_text": "#000000",
                "tagline": "Handcrafted Culinary Discipline",
                "name": pname.replace("-", " ").title(),
                "desc": "Fresh premium smash burgers, loaded sides, and fountain drinks.",
                "currency": "$",
                "sections": [
                    {
                        "title": "🍔 Signature Smashes",
                        "subtitle": "Fresh daily seared patties with house sauces",
                        "items": [
                            {"name": "The Classic Double Smash", "price": "9.99", "desc": "Double seared patties, melted American cheese, pickles, and house sauce", "tags": ["House Favorite ⭐"]},
                            {"name": "Spicy Bacon Smash", "price": "10.49", "desc": "Smoked bacon, melted pepper jack, pickled jalapeños, and chipotle mayo", "tags": ["Spicy 🌶️"]},
                        ]
                    },
                    {
                        "title": "🍟 Sides & Fries",
                        "subtitle": "Crispy golden sides",
                        "items": [
                            {"name": "Seasoned French Fries", "price": "4.49", "desc": "Golden fried potatoes with house seasoning", "tags": ["Classic"]},
                            {"name": "Crispy Onion Rings", "price": "4.99", "desc": "Beer-battered onion rings with dipping sauce", "tags": ["Crispy"]},
                        ]
                    }
                ]
            }

        menu_file = project_dir / "app" / "menu" / "page.tsx"
        if menu_file.exists():
            content = SLAB_MENU_PAGE_CODE
            content = content.replace("__MENU_DATA_JSON__", json.dumps(cfg["sections"], indent=2))
            content = content.replace("__PRIMARY__", cfg["primary"])
            content = content.replace("__BTN_TEXT__", cfg["btn_text"])
            content = content.replace("__TAGLINE__", cfg["tagline"])
            content = content.replace("__NAME_UPPER__", cfg["name"].upper())
            content = content.replace("__DESC__", cfg["desc"])
            content = content.replace("__CURRENCY__", cfg["currency"])
            
            menu_file.write_text(content)
            print(f"  ✓ Deployed high-contrast Menu Slabs to {pname}")

    print("🎉 High-contrast Menu Slabs deployed successfully across all projects!")

if __name__ == "__main__":
    update_all_menu_pages()
