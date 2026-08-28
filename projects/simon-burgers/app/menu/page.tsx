"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  name: string;
  price: string | number;
  desc?: string;
  tags?: string[];
  subitems?: string[];
}

interface MenuSection {
  title: string;
  subtitle: string;
  subsections: {
    title: string;
    items: MenuItem[];
  }[];
}

const MENU_DATA: MenuSection[] = [
  {
    title: "🍔 Burgers & Smashes",
    subtitle: "Hand-formed patties pressed fresh on bare cast iron",
    subsections: [
      {
        title: "Veggie Burgers",
        items: [
          { name: "Korean Fried Paneer", price: 360, desc: "Gochujang glazed fried paneer, chimichurri, slaw, lettuce, garlic mayo", tags: ["Chef recommended"] },
          { name: "Magic Mushroom", price: 360, desc: "Multigrain crusted wild mushroom patty, pickled onions, lettuce, smash sauce", tags: ["New recipe"] },
          { name: "Louisiana", price: 360, desc: "Roasted mix vegetable patty, slaw, american cheese, jalapeños, lettuce, smoky chipotle mayo", tags: ["New", "Contains Nuts"] },
          { name: "Cheesy Chilli Mac", price: 360, desc: "Mac and cheese patty, chilli sofrito, double cheese slices, grilled onions, jalapeños, smoky chipotle mayo", tags: ["Spicy 🌶️"] },
          { name: "Broccoli and Cheddar", price: 360, desc: "Crumbled broccoli, cheddar & walnut patty, american cheese, jalapeños, lettuce, smash sauce", tags: ["Contains Nuts"] },
        ],
      },
      {
        title: "The Fried Chicken Burgers",
        items: [
          { name: "Buffalo Chicken", price: 370, desc: "Buffalo-sauce-dunked fried chicken, garlic mayo, grilled onions, lettuce, smoky chipotle mayo", tags: ["Spicy 🌶️"] },
          { name: "Nashville Chicken", price: 370, desc: "Nashville spiced fried chicken dipped in hot oil, home-made chilli sofrito, pickles, garlic aioli", tags: ["Spicy 🌶️🌶️", "Chef recommended"] },
          { name: "Crispy French Dip", price: 390, desc: "French-dip-dunked fried chicken, white onions, pickles, lettuce, garlic aioli, served with a French gravy dip", tags: ["Contains Egg"] },
          { name: "Chicken Caesar Burger", price: 390, desc: "Fried chicken, jalapeños, romaine lettuce, parmesan, caesar dressing", tags: ["Contains Egg"] },
        ],
      },
      {
        title: "Smash Chicken",
        items: [
          { name: "Foster Chicken Smash", price: 420, desc: "Double smash chicken patties, american cheese, chimichurri, pickles, lettuce, smash sauce", tags: ["Chef recommended"] },
          { name: "Chicken Chilli Cheese Smash", price: 450, desc: "Double smash patties, chilli cheese sauce, american cheese, home-made chilli sofrito, smash sauce", tags: ["Spicy 🌶️"] },
        ],
      },
      {
        title: "Beef (Buff) & Lamb Classics",
        items: [
          { name: "OG Smash", price: 470, desc: "Double smash patties, double american cheese, pickles, white onions, mustard", tags: ["Classic"] },
          { name: "Oklahoma Smash", price: 520, desc: "Double white onion smash patties, american cheese, chimichurri, pickles, lettuce, smash sauce", tags: ["Signature"] },
          { name: "Chilli Cheese Smash", price: 550, desc: "Double smash patties, chilli cheese sauce, american cheese, home-made chilli sofrito, smash sauce", tags: ["Spicy 🌶️", "Chef recommended"] },
          { name: "Bacon Chilli Cheese Smash", price: 650, desc: "Double smash patties, chilli cheese sauce, american cheese, bacon, home-made chilli sofrito, smash sauce", tags: ["Spicy 🌶️"] },
        ],
      },
      {
        title: "Exhibition Smash",
        items: [
          { name: "8 Hr. Braised Brisket (Buff)", price: 650, desc: "Pickled-onion smash patty, bbq braised brisket, american cheese, smash sauce", tags: ["Chef recommended"] },
          { name: "PB & Bacon Smash (Buff / Lamb)", price: 550, desc: "Smash patty, crunchy peanut butter, american cheese, streaky bacon, sliced red paprika, smash sauce", tags: ["Contains Nuts"] },
          { name: "The Dalston Dip (Buff)", price: 750, desc: "Double smash patties, double american cheese, grilled onions, smash sauce. Served with home-made jus", tags: ["French Dip"] },
          { name: "The Flintstone (Buff & Bacon)", price: 750, desc: "Smash patty, american cheese, streaky bacon, smash sauce. Served with a dino bone marrow", tags: ["Exhibition"] },
          { name: "The Wellington (Buff & Bacon)", price: 790, desc: "Double mustard buff smash patties, streaky bacon, roasted mushroom, smash sauce. Served with home-made jus", tags: ["Premium"] },
        ],
      },
    ],
  },
  {
    title: "🍟 Sides & Salad",
    subtitle: "Perfect complements, seasoned fresh",
    subsections: [
      {
        title: "Veg Sides",
        items: [
          { name: "Fries (Classic / Cajun)", price: "268 / 278", desc: "Served with home-made ketchup and spiked garlic dip", tags: ["Vegan opt."] },
          { name: "Corn Ribs", price: 328, desc: "Served with spiced garlic dip, lemon wedge", tags: ["Chef recommended"] },
          { name: "Oyster Mushroom Karaage", price: 348, desc: "Crispy fried oyster mushroom dusted with togarashi spice, served with truffle mayo", tags: ["New"] },
          { name: "Truffle Fries", price: 338, desc: "Truffle mayo, parmesan, parsley", tags: ["Popular"] },
          { name: "Onion Rings", price: 298, desc: "Served with spiced garlic dip", tags: ["Crisp"] },
          { name: "Caesar Salad Veg", price: 298, desc: "Romaine lettuce with homemade dressing, croutons, marinated olives, sun-dried tomatoes", tags: ["Contains Egg"] },
        ],
      },
      {
        title: "Non-Veg Sides",
        items: [
          { name: "Gravy Fries", price: 338, desc: "French gravy sauce poured on top of our crispy fries (sauce contains chicken stock)", tags: ["New"] },
          { name: "Buffalo Chicken Flings", price: 348, desc: "Buffalo-sauce-dunked fried chicken, crispy onions. Served with garlic aioli", tags: ["Spicy 🌶️"] },
          { name: "Dino Bone Marrow", price: 448, desc: "Roasted bone marrow. Served with toasted bread, chimichurri, pickled onions", tags: ["New"] },
          { name: "Chicken Wings (Blackened BBQ / AOP / Chilli Honey)", price: 398, desc: "Available in three glazed flavors, served with ranch dip", tags: ["Signature"] },
          { name: "Caesar Salad (Grilled Chicken / Bacon)", price: "368 / 418", desc: "Romaine lettuce with homemade dressing (contains egg), croutons, marinated olives, sun-dried tomatoes", tags: ["Contains Egg"] },
        ],
      },
      {
        title: "Mac & Cheese",
        items: [
          { name: "The Classic Mac", price: 390, desc: "A creamy combination of tender macaroni and saucy cheddar cheese" },
          { name: "Sundried Tomato Mac", price: 410, desc: "Mac & cheese folded with rich sundried tomatoes" },
          { name: "Grilled Chicken Mac", price: 460, desc: "Creamy mac loaded with tender grilled chicken breast chunks" },
          { name: "Bacon Crisp Mac", price: 520, desc: "Classic mac loaded with crispy smoked bacon bits" },
          { name: "Brisket Mac", price: 595, desc: "Creamy mac topped with our signature 8-hour slow braised beef brisket", tags: ["Chef recommended"] },
        ],
      },
    ],
  },
  {
    title: "🥤 Beverages & Coffees",
    subtitle: "Artisan Matchas, Shakes and speciality brews",
    subsections: [
      {
        title: "Juice, Soda & Mocktails",
        items: [
          { name: "Fresh Watermelon & Mint Juice", price: 218 },
          { name: "Fresh Iced Tea (Peach/Lemon)", price: 228 },
          { name: "Homemade Ginger Ale", price: 228 },
          { name: "Fresh Lime (Soda/Water)", price: 170 },
          { name: "Sober Picante", price: 248, tags: ["New"] },
          { name: "Virgin Mojito", price: 228 },
          { name: "Fresh Watermelon Mojito", price: 238 },
          { name: "Virgin Piña Colada", price: 238 },
        ],
      },
      {
        title: "Hand-Spun Shakes",
        items: [
          { name: "French Vanilla Biscuit Shake", price: 290, desc: "Rich vanilla custard base spun with premium biscuit crumbs" },
          { name: "Strawberry Cheesecake Shake", price: 290, desc: "Creamy shake featuring real strawberry preserve and cheesecake chunks" },
          { name: "Salted Pistachio Shake", price: 320, desc: "Premium ground pistachios with a touch of sea salt", tags: ["New", "Contains Nuts"] },
          { name: "Oreo & Chocolate Shake", price: 290, desc: "Rich chocolate fudge spun with crushed Oreos" },
        ],
      },
      {
        title: "Matcha Specials",
        items: [
          { name: "Classic Matcha (Hot/Iced)", price: 350 },
          { name: "Roasted Hazelnut Matcha", price: 350 },
          { name: "Vanilla Matcha Latte", price: 350 },
          { name: "Iced Mango Matcha", price: 350 },
          { name: "Iced Summer Berry Matcha", price: 350 },
        ],
      },
      {
        title: "Speciality Coffee (Mannheim Roasters)",
        items: [
          { name: "Americano (Hot/Iced)", price: 230 },
          { name: "Cappuccino (Hot/Iced)", price: 255 },
          { name: "Cafe Latte (Hot/Iced)", price: 255 },
          { name: "Spanish Latte (Hot/Iced)", price: 280, desc: "Double shot espresso, fresh milk, condensed milk" },
          { name: "Mocha / Flat White", price: "280 / 255" },
          { name: "Cold Coffee Classic", price: 265 },
          { name: "Roasted Hazelnut Cold Coffee", price: 295 },
        ],
      },
    ],
  },
  {
    title: "🍰 Desserts & Add-ons",
    subtitle: "Sweet finishes and custom upgrades",
    subsections: [
      {
        title: "Desserts",
        items: [
          { name: "Deep Fried Oreos", price: 350, desc: "Eggless golden fried Oreos, served with whipped custard and rich dulce de leche", tags: ["Eggless"] },
          { name: "Old Monk Chocolate Mousse", price: 350, desc: "Eggless chocolate mousse infused with Old Monk rum, cocoa dust", tags: ["Chef recommended", "Must try! 🌟"] },
          { name: "Apple Crumble Cake", price: 350, desc: "Served warm with whipped cream and vanilla ice cream", tags: ["Contains Egg", "Contains Nuts"] },
        ],
      },
      {
        title: "Atelier Add-Ons",
        items: [
          { name: "Smashed Truffle Burrata", price: 125, desc: "Velvety truffle burrata cheese dolloped on top" },
          { name: "BBQ Braised Brisket (Buff)", price: 240, desc: "8-hour slow-braised tender brisket layer" },
          { name: "Dino Bone Marrow", price: 448, desc: "Roasted bone marrow adding deep umami satisfaction" },
          { name: "Streaky Bacon", price: 120 },
          { name: "Buff or Lamb Patty", price: 150 },
          { name: "Chicken Smash Patty", price: 100 },
          { name: "Home-made Jus (Buff)", price: 120 },
        ],
      },
    ],
  },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-bone">
        {/* Banner */}
        <section className="py-20 bg-char text-ink relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF9F4_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8 relative z-10">
            <p className="type-caption text-[#DC2626] mb-3">Atelier Menu Board</p>
            <h1 className="type-display text-5xl md:text-7xl lg:text-8xl leading-none text-ink">
              THE COMPLETE<br /><span className="text-[#DC2626]">KITCHEN BOARD</span>
            </h1>
            <p className="type-serif text-lg md:text-xl text-stone mt-6 max-w-xl">
              100% hand-pressed patties seared at 230°C. Cold-brewed Matchas, artisan milkshakes, and signature Old Monk desserts.
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="sticky top-18 lg:top-20 z-30 bg-bone border-b border-bone-dark py-4 backdrop-blur-md">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MENU_DATA.map((sec, idx) => (
                <button
                  key={sec.title}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-3 type-caption text-[10px] border whitespace-nowrap transition-all duration-300 ${
                    activeTab === idx
                      ? "bg-char text-[#DC2626] border-char"
                      : "bg-transparent text-smoke border-bone-dark hover:border-char"
                  }`}
                >
                  {sec.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content Display */}
        <section className="py-16">
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-16"
              >
                <div>
                  <h2 className="type-display text-4xl sm:text-5xl text-char border-b-2 border-char pb-4 mb-2">
                    {MENU_DATA[activeTab].title}
                  </h2>
                  <p className="type-serif text-smoke italic text-lg">
                    {MENU_DATA[activeTab].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {MENU_DATA[activeTab].subsections.map((subsec) => (
                    <div key={subsec.title} className="space-y-8">
                      <div className="border-b border-bone-dark pb-2">
                        <h3 className="type-display text-2xl text-[#DC2626]-dark">
                          {subsec.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-8">
                        {subsec.items.map((item) => (
                          <div key={item.name} className="group border-b border-bone-dark/40 pb-4">
                            <div className="flex justify-between items-baseline mb-2 gap-4">
                              <h4 className="type-display text-xl text-char group-hover:text-[#DC2626]-dark transition-colors duration-300">
                                {item.name}
                              </h4>
                              <span className="type-label text-char font-bold text-sm whitespace-nowrap">
                                ₹{item.price}
                              </span>
                            </div>
                            {item.desc && (
                              <p className="type-serif text-smoke text-sm leading-relaxed mb-2">
                                {item.desc}
                              </p>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8px] font-mono uppercase bg-char-soft text-[#DC2626] px-2 py-0.5"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* General Policy Notes */}
            <div className="border-t border-bone-dark mt-24 pt-8 text-center sm:text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2">⚠️ Allergen Notice</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    Some dishes contain eggs, nuts, dairy, or gluten. Please notify our staff of any allergies before placing your order.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2">🛵 Swiggy &amp; Zomato</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    Enjoy our fresh smashes at home. We are available for delivery on Swiggy and Zomato across all key locations.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2">💸 Tax Information</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    GST is applicable on all menu rates. A discretionary 10% service charge is added to dine-in orders.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
