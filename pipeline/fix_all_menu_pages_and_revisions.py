#!/usr/bin/env python3
"""
Comprehensive script addressing:
1. Truffles Bangalore: Heading color changed to Neon Yellow (#FFE500).
2. Beyondburg Inc.: Heading color changed to lighter emerald shade (#22C55E) with whitish glow.
3. JewBoy Burgers Footer: Cursor strictly turns Deep Black (#0A0A0A) upon entering the white footer.
4. Menu Page Fix: Fully rebuilds /menu/page.tsx across all 24 projects with authentic menus, working tabs, crisp contrast, and zero undefined classes.
"""

import os
import re
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

# Detailed project brand configs
PROJECT_CONFIGS = {
    "truffles-bangalore": {
        "primary": "#FFE500",
        "secondary": "#2A2A2A",
        "heading_color": "#FFE500",
        "heading_shadow": "text-shadow: 0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(255,229,0,0.3);",
        "is_light": True,
        "bg_default": "#FFFFFF",
        "bg_dark": "#0A0A0A",
        "name": "Truffles",
        "tagline": "St. Marks Rd & Koramangala · Bangalorean Burger Legend",
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
        "primary": "#122B1E",
        "secondary": "#22C55E",
        "heading_color": "#22C55E",
        "heading_shadow": "text-shadow: 0 0 15px rgba(34, 197, 94, 0.4), 0 0 30px rgba(255, 255, 255, 0.25);",
        "is_light": True,
        "bg_default": "#FFFFFF",
        "bg_dark": "#0A0A0A",
        "name": "Beyondburg Inc.",
        "tagline": "Kochi & Bengaluru · Next-Gen Smash Artistry",
        "desc": "High-temp smash burgers, smashed bone marrow, potato potato buns, and craft sodas.",
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
    "jewboy-burgers": {
        "primary": "#FFFFFF",
        "secondary": "#0A0A0A",
        "heading_color": "#FFFFFF",
        "heading_shadow": "text-shadow: 0 4px 20px rgba(0,0,0,0.9);",
        "is_light": False,
        "bg_default": "#0A0A0A",
        "bg_dark": "#0A0A0A",
        "name": "JewBoy Burgers",
        "tagline": "5111 Airport Blvd · Shalom Y'all!",
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
                    {"name": "The Down Home Double", "price": "11.50", "desc": "Two 1/3 lb patties smashed with onions, double American cheese, crinkle-cut pickles, and mustard", "tags": ["Double Stack"]},
                ]
            },
            {
                "title": "🥔 Latkes & Green Chile Queso",
                "subtitle": "Scratch-shredded potato latkes and loaded queso fries",
                "items": [
                    {"name": "Crispy Latkes & Queso", "price": "5.99", "desc": "Two golden scratch potato latkes fried crisp, served with warm Hatch green chile queso and sour cream", "tags": ["Must Order ⭐"]},
                    {"name": "Hatch Green Chile Fries", "price": "6.49", "desc": "Crisp fries smothered in warm green chile queso, grilled onions, jalapeños, and bacon crumbles", "tags": ["Loaded 🌶️"]},
                    {"name": "Cornmeal Onion Rings", "price": "4.99", "desc": "Jumbo sweet Texas onions in seasoned cornmeal batter with spicy Homeboy sauce", "tags": ["Crispy"]},
                ]
            },
            {
                "title": "🥤 Churro Shakes & Aguas",
                "subtitle": "Hand-spun fountain shakes and ice-cold Mexican beers",
                "items": [
                    {"name": "Mexican Chocolate Churro Shake", "price": "5.75", "desc": "Vanilla ice cream spun with Abuelita chocolate, ground cinnamon, and crunchy churro crumbles", "tags": ["Signature ⭐"]},
                    {"name": "Hibiscus Jamaica Agua Fresca", "price": "3.99", "desc": "House-steeped sweet hibiscus flower tea served ice-cold with fresh lime", "tags": ["Fresh"]},
                ]
            }
        ]
    },
    "pedrosos-pizza": {
        "primary": "#D91C24",
        "secondary": "#F2C777",
        "heading_color": "#F2C777",
        "heading_shadow": "text-shadow: 0 4px 20px rgba(0,0,0,0.9);",
        "is_light": False,
        "bg_default": "#0A0A0A",
        "bg_dark": "#0A0A0A",
        "name": "Pedroso's Pizza",
        "tagline": "8315 Burnet Rd · Austin, TX",
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
                    {"name": "White Pie with Garlic & Ricotta", "price": "25.00", "desc": "Creamy whipped ricotta, whole milk mozzarella, roasted garlic cloves, and fresh cracked pepper", "tags": ["Garlic Herb"]},
                ]
            },
            {
                "title": "🥖 Knots, Calzones & Cannolis",
                "subtitle": "Scratch garlic knots and classic Italian desserts",
                "items": [
                    {"name": "Garlic Knots (6 pcs)", "price": "6.50", "desc": "Freshly twisted pizza dough drenched in garlic butter, fresh parsley, and parmesan, served with marinara", "tags": ["Must Order ⭐"]},
                    {"name": "Pepperoni & Cheese Calzone", "price": "14.00", "desc": "Stuffed with seasoned ricotta, mozzarella, and cupping pepperoni with hot marinara dip", "tags": ["Stuffed"]},
                    {"name": "Authentic Sicilian Cannoli", "price": "5.00", "desc": "Crispy fried shell filled with sweet orange-kissed ricotta cream and chocolate chips", "tags": ["Dessert"]},
                ]
            }
        ]
    },
    "dirty-martins": {
        "primary": "#C68A14",
        "secondary": "#FFFFFF",
        "heading_color": "#C68A14",
        "heading_shadow": "text-shadow: 0 2px 10px rgba(0,0,0,0.1);",
        "is_light": True,
        "bg_default": "#FFFFFF",
        "bg_dark": "#0A0A0A",
        "name": "Dirty Martin's Kum-Bak",
        "tagline": "2808 Guadalupe St · Since 1926",
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
            },
            {
                "title": "🥤 Hand-Spun Fountain Shakes",
                "subtitle": "Classic malts and ice-cold Texas drafts",
                "items": [
                    {"name": "Classic Chocolate Malt", "price": "4.99", "desc": "Hand-dipped ice cream spun in stainless cups with pure malted barley powder and dark chocolate syrup", "tags": ["Fountain Classic ⭐"]},
                    {"name": "Longhorn Burnt Orange Shake", "price": "5.49", "desc": "Thick vanilla ice cream churned with Texas sweet orange citrus syrup and crushed vanilla wafers", "tags": ["UT Tradition"]},
                ]
            }
        ]
    },
    "burger-seigneur": {
        "primary": "#418043",
        "secondary": "#0A0A0A",
        "heading_color": "#418043",
        "heading_shadow": "text-shadow: 0 2px 10px rgba(0,0,0,0.1);",
        "is_light": True,
        "bg_default": "#FFFFFF",
        "bg_dark": "#0A0A0A",
        "name": "Burger Seigneur",
        "tagline": "Indiranagar & Forum Rex · Gourmet French Craft",
        "desc": "Artisanal gourmet burgers, brioche buns baked fresh daily, and signature crafted milkshakes.",
        "currency": "₹",
        "sections": [
            {
                "title": "🍔 Gourmet French Burgers",
                "subtitle": "Crafted with imported cheeses, house sauces, and artisan brioche",
                "items": [
                    {"name": "The Lucien Burger", "price": "495", "desc": "Prime Angus patty, French brie cheese, caramelized balsamic onions, and garlic butter glaze", "tags": ["French Classic ⭐"]},
                    {"name": "Dynamite Beef Burger", "price": "525", "desc": "Two smashed beef patties, spicy dynamite sauce, smoked cheddar, and pickled jalapeños", "tags": ["Spicy Pick 🌶️"]},
                    {"name": "Parisian Truffle Chicken", "price": "475", "desc": "Panko-crusted chicken breast, white truffle butter, gruyère cheese, and baby spinach", "tags": ["Truffle Specialty"]},
                    {"name": "The Seigneur Veggie", "price": "425", "desc": "Herbed halloumi steak, roasted red pepper coulis, arugula, and pesto mayo", "tags": ["Gourmet Veg"]},
                ]
            },
            {
                "title": "🍟 Sides & Artisanal Shakes",
                "subtitle": "Truffle parmesan fries and Belgian chocolate shakes",
                "items": [
                    {"name": "Truffle Parmesan French Fries", "price": "295", "desc": "Golden fried potatoes tossed in Italian black truffle oil and 24-month aged parmesan", "tags": ["Best Seller ⭐"]},
                    {"name": "French Salted Caramel Shake", "price": "325", "desc": "Handcrafted vanilla gelato blended with fleur de sel caramel sauce", "tags": ["Dessert Shake"]},
                ]
            }
        ]
    },
    "dans-burgers": {
        "primary": "#E52421",
        "secondary": "#FFFFFF",
        "heading_color": "#E52421",
        "heading_shadow": "text-shadow: 0 2px 10px rgba(0,0,0,0.1);",
        "is_light": True,
        "bg_default": "#FFFFFF",
        "bg_dark": "#0A0A0A",
        "name": "Dan's Hamburgers",
        "tagline": "Austin, Texas · Serving Since 1973",
        "desc": "Fresh 100% Angus ground chuck burgers, homemade jalapeño cheeseburgers, curly fries, and onion rings.",
        "currency": "$",
        "sections": [
            {
                "title": "🍔 Austin's Best Hamburgers",
                "subtitle": "Fresh daily Angus beef dressed with mustard, lettuce, tomato, pickles & onion",
                "items": [
                    {"name": "Dan's Large Bacon Cheeseburger", "price": "8.75", "desc": "1/2 lb fresh Angus beef, thick-cut crispy bacon, double melted American cheese, mustard, and veggies", "tags": ["Austin Classic ⭐"]},
                    {"name": "Jalapeño Cheddar Burger", "price": "7.95", "desc": "Seared beef patty loaded with grilled fresh jalapeños, melted sharp cheddar, and spicy mayo", "tags": ["Texas Spice 🌶️"]},
                    {"name": "Mushroom Swiss Burger", "price": "7.95", "desc": "Angus chuck smothered in buttery sautéed mushrooms and molten Swiss cheese", "tags": ["Fan Favorite"]},
                    {"name": "Dan's Double Meat Cheeseburger", "price": "9.50", "desc": "Two fresh Angus patties, double melted cheese on a toasted seeded bun", "tags": ["Double Classic"]},
                ]
            },
            {
                "title": "🍟 Curly Fries & Homestyle Sides",
                "subtitle": "Fresh fried sides and handmade shakes",
                "items": [
                    {"name": "Dan's Seasoned Curly Fries", "price": "3.95", "desc": "Crispy spiral cut potatoes seasoned in Dan's signature paprika spice blend", "tags": ["Must Have ⭐"]},
                    {"name": "Hand-Cut Onion Rings", "price": "4.25", "desc": "Fresh Texas sweet onions in crispy scratch batter", "tags": ["Handmade"]},
                    {"name": "Hand-Spun Chocolate Shake", "price": "4.50", "desc": "Old fashioned thick milk shake made with Blue Bell ice cream", "tags": ["Blue Bell 🍦"]},
                ]
            }
        ]
    }
}

TEMPLATE_MENU = '''"use client";

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
      <main className="pt-24 min-h-screen __BG_MAIN__ __TEXT_MAIN__ select-none">
        {/* Banner Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden border-b border-black/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-4">
            <span
              className="text-xs uppercase tracking-widest font-extrabold inline-block px-3 py-1 rounded-full border border-black/10 shadow-sm"
              style={{ color: "__PRIMARY__" }}
            >
              __TAGLINE__
            </span>

            <h1
              className="type-display text-5xl sm:text-7xl md:text-8xl leading-none font-black tracking-tight"
              style={{ color: "__HEADING_COLOR__" }}
            >
              __NAME_UPPER__ <br />
              <span style={{ color: "__PRIMARY__" }}>CULINARY MENU</span>
            </h1>

            <p className="type-serif text-base sm:text-xl __SUBTEXT_COLOR__ max-w-2xl leading-relaxed">
              __DESC__
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="sticky top-18 lg:top-20 z-30 py-4 backdrop-blur-md border-b border-black/10 __BG_MAIN__/90">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {MENU_DATA.map((sec, idx) => (
                <button
                  key={sec.title}
                  onClick={() => {
                    if ((window as any).playPopSound) (window as any).playPopSound();
                    setActiveTab(idx);
                  }}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeTab === idx
                      ? "shadow-lg scale-105"
                      : "__TAB_INACTIVE_TEXT__ border border-black/10"
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

        {/* Tab Content Display */}
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
                    style={{ color: "__HEADING_COLOR__" }}
                  >
                    {MENU_DATA[activeTab].title}
                  </h2>
                  <p className="type-serif text-base sm:text-lg __SUBTEXT_COLOR__">
                    {MENU_DATA[activeTab].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {MENU_DATA[activeTab].items.map((item) => (
                    <div
                      key={item.name}
                      className="p-6 sm:p-8 rounded-3xl __CARD_BG__ hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline gap-4">
                          <h3
                            className="type-display text-xl sm:text-2xl font-bold leading-tight"
                            style={{ color: "__HEADING_COLOR__" }}
                          >
                            {item.name}
                          </h3>
                          <span className="font-mono font-extrabold text-base sm:text-lg text-black px-3 py-1 rounded-full bg-black/5 flex-shrink-0">
                            __CURRENCY__{item.price}
                          </span>
                        </div>

                        {item.desc && (
                          <p className="type-serif text-sm __SUBTEXT_COLOR__ leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border border-black/10"
                              style={{
                                backgroundColor: "__PRIMARY__15",
                                color: "__PRIMARY__",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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

def build_menu_content(cfg: dict) -> str:
    primary = cfg["primary"]
    heading_color = cfg.get("heading_color", primary)
    is_light = cfg.get("is_light", False)
    currency = cfg.get("currency", "$")
    
    bg_main = "bg-[#FFFFFF]" if is_light else "bg-[#0A0A0A]"
    text_main = "text-[#1A1A1A]" if is_light else "text-[#FFFFFF]"
    card_bg = "bg-white border border-black/10 shadow-lg text-[#1A1A1A]" if is_light else "bg-[#141414] border border-white/10 shadow-xl text-[#FFFFFF]"
    subtext_color = "text-[#4B5563]" if is_light else "text-white/70"
    tab_inactive_text = "text-[#4B5563] hover:text-[#0A0A0A]" if is_light else "text-white/60 hover:text-white"
    btn_text = "#000000" if primary in ["#FFE500", "#F2C777"] else "#FFFFFF"
    
    sections_json_str = json.dumps(cfg["sections"], indent=2)
    
    content = TEMPLATE_MENU
    content = content.replace("__MENU_DATA_JSON__", sections_json_str)
    content = content.replace("__BG_MAIN__", bg_main)
    content = content.replace("__TEXT_MAIN__", text_main)
    content = content.replace("__PRIMARY__", primary)
    content = content.replace("__HEADING_COLOR__", heading_color)
    content = content.replace("__TAGLINE__", cfg["tagline"])
    content = content.replace("__NAME_UPPER__", cfg["name"].upper())
    content = content.replace("__DESC__", cfg["desc"])
    content = content.replace("__SUBTEXT_COLOR__", subtext_color)
    content = content.replace("__TAB_INACTIVE_TEXT__", tab_inactive_text)
    content = content.replace("__BTN_TEXT__", btn_text)
    content = content.replace("__CARD_BG__", card_bg)
    content = content.replace("__CURRENCY__", currency)
    
    return content

def update_all():
    print("🚀 Updating Truffles, Beyondburg, JewBoy Footer, and fixing all Menu Pages...")
    for project_dir in sorted(PROJECTS_DIR.iterdir()):
        if not project_dir.is_dir() or project_dir.name in ["fabroar", "superfan-redesign", "smash-guys"]:
            continue
            
        pname = project_dir.name
        cfg = PROJECT_CONFIGS.get(pname)
        if not cfg:
            # Fallback default configuration
            cfg = {
                "primary": "#C68A14",
                "heading_color": "#C68A14",
                "is_light": False,
                "name": pname.replace("-", " ").title(),
                "tagline": "Handcrafted Culinary Discipline",
                "desc": "Fresh premium smash burgers, loaded sides, and fountain drinks.",
                "currency": "$",
                "sections": [
                    {
                        "title": "🍔 Signature Burgers",
                        "subtitle": "Fresh daily seared patties with house sauces",
                        "items": [
                            {"name": "The House Classic Double", "price": "9.99", "desc": "Double seared patties, melted cheese, pickles, and house sauce", "tags": ["House Favorite ⭐"]},
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

        # 1. Update /menu/page.tsx
        menu_file = project_dir / "app" / "menu" / "page.tsx"
        if menu_file.exists():
            menu_file.write_text(build_menu_content(cfg))
            print(f"  ✓ Fixed /menu/page.tsx for {pname}")

        # 2. Update globals.css for Truffles (Neon Yellow headings) & Beyondburg (Lighter Emerald glow)
        if pname == "truffles-bangalore":
            css_file = project_dir / "app" / "globals.css"
            if css_file.exists():
                txt = css_file.read_text()
                txt = re.sub(r'color:\s*#2A2A2A;', 'color: #FFE500 !important;\n  text-shadow: 0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(255,229,0,0.3);', txt)
                css_file.write_text(txt)
                print("  ✓ Updated Truffles headings to Neon Yellow (#FFE500)")

        elif pname == "beyondburg-inc":
            css_file = project_dir / "app" / "globals.css"
            if css_file.exists():
                txt = css_file.read_text()
                txt = re.sub(r'color:\s*#122B1E;', 'color: #22C55E !important;\n  text-shadow: 0 0 15px rgba(34, 197, 94, 0.4), 0 0 30px rgba(255, 255, 255, 0.3);', txt)
                css_file.write_text(txt)
                print("  ✓ Updated Beyondburg headings to Lighter Emerald Green with whitish glow")

        elif pname == "jewboy-burgers":
            cursor_file = project_dir / "components" / "marketing" / "CustomCursor.tsx"
            if cursor_file.exists():
                txt = cursor_file.read_text()
                if "isWhiteFooter" not in txt:
                    txt = txt.replace('const isRed =', 'const isWhiteFooter = !!el.closest("footer, footer *");\n      const isRed =')
                    txt = txt.replace('if (isRed) {', 'if (isWhiteFooter) {\n        nextColor = "#0A0A0A";\n      } else if (isRed) {')
                    cursor_file.write_text(txt)
                    print("  ✓ Updated JewBoy CustomCursor to strictly become Black (#0A0A0A) in the white footer")

    print("🎉 Menu pages and specific brand revisions updated successfully!")

if __name__ == "__main__":
    update_all()
