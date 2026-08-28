"use client";

import { useState } from "react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
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
    title: "🍔 Certified Angus Burgers",
    subtitle: "100% Certified Angus chuck griddled fresh to order on seasoned cast iron",
    subsections: [
      {
        title: "Classic & Specialty Burgers",
        items: [
          { name: "Dan's Special Cheeseburger (Large 6oz)", price: "$8.99", desc: "6 oz Certified Angus chuck, melted American cheese, lettuce, tomato, pickles, diced onions, and Dan's famous house sauce on a butter-toasted sesame bun", tags: ["House Signature", "Austin Legend"] },
          { name: "Bacon Cheeseburger (Large 6oz)", price: "$8.99", desc: "6 oz hand-pressed Angus beef patty, hickory smoked thick-cut bacon, double American cheese, pickles, lettuce, tomato, and mayo", tags: ["Top Pick", "Smoky"] },
          { name: "Texas Jalapeño Cheeseburger", price: "$8.49", desc: "Juicy Angus beef, grilled fresh Texas jalapeños, melted pepper jack and American cheese, mustard, and grilled onions", tags: ["Spicy 🌶️", "Local Favorite"] },
          { name: "Double Meat Double Cheese", price: "$9.49", desc: "Two 4 oz Angus chuck patties seared hot on cast iron, double melted cheddar, crinkle-cut pickles, diced white onions, and yellow mustard", tags: ["Double Stack", "Hearty"] },
          { name: "Mushroom Swiss Burger", price: "$8.49", desc: "Angus beef patty smothered in sautéed buttery mushrooms, melted Swiss cheese, grilled onions, and garlic herb spread", tags: ["Rich & Savory"] },
          { name: "Texas Chili Cheeseburger", price: "$8.99", desc: "Angus beef patty topped with Dan's slow-simmered Texas red chili, shredded cheddar cheese, diced white onions, and mustard", tags: ["Comfort Classic"] },
        ],
      },
      {
        title: "Traditional Sizing & Value Classics",
        items: [
          { name: "Small Hamburger (2oz)", price: "$3.99", desc: "The original 1973 recipe: 2 oz Angus chuck patty, mustard, pickles, and onion on a soft toasted bun", tags: ["Original 1973"] },
          { name: "Small Cheeseburger (2oz)", price: "$4.49", desc: "2 oz Angus patty, American cheese, mustard, pickles, and diced onion", tags: ["Classic"] },
          { name: "Medium Hamburger (4oz)", price: "$5.99", desc: "4 oz Angus patty, mustard, lettuce, tomato, pickles, and onion", tags: ["Classic Single"] },
          { name: "Medium Cheeseburger (4oz)", price: "$6.49", desc: "4 oz Angus patty, melted American cheese, mustard, lettuce, tomato, pickles, and onion", tags: ["Popular"] },
          { name: "Large Hamburger (6oz)", price: "$7.49", desc: "6 oz thick-cut Angus patty, mustard, lettuce, tomato, pickles, and onion", tags: ["Hearty Single"] },
        ],
      },
    ],
  },
  {
    title: "🥪 Sandwiches & Baskets",
    subtitle: "Hand-breaded Texas favorites and griddled deli classics",
    subsections: [
      {
        title: "Hand-Breaded Texas Classics",
        items: [
          { name: "Chicken Fried Steak Sandwich", price: "$8.99", desc: "Hand-tenderized Texas beef cutlet breaded to order, fried golden crisp, with lettuce, tomato, and mayo on Texas toast", tags: ["Texas Tradition", "Hand-Breaded"] },
          { name: "Crispy Chicken Tender Basket", price: "$8.49", desc: "Four buttermilk-marinated hand-breaded chicken tenders served with curly fries, Texas toast, and cream gravy", tags: ["Customer Favorite"] },
          { name: "Grilled Chicken Breast Sandwich", price: "$7.99", desc: "Tender marinated chicken breast, melted Swiss cheese, lettuce, tomato, and honey mustard on a toasted bun", tags: ["Lighter Fare"] },
          { name: "Classic BLT on Texas Toast", price: "$6.49", desc: "Six strips of crispy smoked bacon, crisp lettuce, ripe tomatoes, and mayonnaise on thick buttered Texas toast", tags: ["Diner Staple"] },
          { name: "Grilled Ham & Cheese", price: "$5.99", desc: "Smoked shaved ham and melted American & cheddar cheeses pressed on golden Texas toast", tags: ["Comfort Food"] },
        ],
      },
    ],
  },
  {
    title: "🍟 Famous Sides & Chili",
    subtitle: "Scratch recipes including our legendary $50 onion ring tradition",
    subsections: [
      {
        title: "Sides Made Fresh Daily",
        items: [
          { name: "Famous Hand-Breaded Onion Rings", price: "$2.99 / $5.29", desc: "The legendary recipe purchased by Dan Junk in 1973 for $50. Fresh jumbo sweet onions sliced daily, dipped in seasoned buttermilk batter, and fried golden crisp", tags: ["Legendary", "$50 Recipe", "Must Try ⭐"] },
          { name: "Seasoned Curly Fries", price: "$2.99 / $5.29", desc: "Crispy spiral-cut potatoes tossed in Dan's signature paprika & garlic seasoning blend", tags: ["Fan Favorite"] },
          { name: "Homestyle French Fries", price: "$1.99 / $2.99", desc: "Classic golden cut Idaho potatoes, cooked fresh and salted hot from the kettle", tags: ["Classic"] },
          { name: "Texas Red Chili Bowl", price: "$4.99", desc: "Hearty slow-simmered all-beef chili without beans, topped with sharp cheddar cheese and fresh diced onions", tags: ["Homemade"] },
          { name: "Fresh Sliced Jalapeños", price: "$0.50", desc: "Fresh jalapeño peppers sliced daily (served raw or griddled)", tags: ["Texas Heat 🌶️"] },
        ],
      },
    ],
  },
  {
    title: "🥤 Hand-Dipped Malts & Shakes",
    subtitle: "Old-fashioned soda fountain treats churned with real Texas ice cream",
    subsections: [
      {
        title: "Fountain Malts & Shakes",
        items: [
          { name: "Hand-Dipped Chocolate Malt", price: "$4.99", desc: "Rich Texas ice cream spun with pure malt powder and dark chocolate syrup in classic stainless mixer cups", tags: ["Fountain Classic"] },
          { name: "Fresh Strawberry Shake", price: "$4.49", desc: "Hand-spun vanilla ice cream folded with real crushed sweet strawberries and topped with whipped cream", tags: ["Real Strawberries"] },
          { name: "Texas Buttered Pecan Shake", price: "$5.29", desc: "Rich custard base churned with roasted Hill Country pecans and salted caramel ribbons", tags: ["Texas Special ⭐"] },
          { name: "Old-Fashioned Vanilla Shake", price: "$4.49", desc: "Creamy Madagascar vanilla bean ice cream hand-spun with whole milk", tags: ["Classic"] },
          { name: "Oreo Cookies & Cream Shake", price: "$4.99", desc: "Sweet cream ice cream loaded with crunchy crushed Oreo cookie pieces", tags: ["Popular"] },
          { name: "Classic Root Beer Float", price: "$4.49", desc: "Chilled mug of draft root beer topped with two scoops of creamy vanilla ice cream", tags: ["Retro Classic"] },
        ],
      },
      {
        title: "Cold Beverages & Coffee",
        items: [
          { name: "Fresh Brewed Texas Sweet Tea", price: "$2.49", desc: "Southern-style sweet black tea brewed fresh all day" },
          { name: "Unsweetened Iced Tea", price: "$2.49", desc: "Crisp, cold-brewed unflavored iced tea with lemon" },
          { name: "Fountain Sodas (Dr Pepper, Coke, Sprite)", price: "$2.49", desc: "Free refills on all dine-in fountain drinks" },
          { name: "Fresh Hot Diner Coffee", price: "$1.99", desc: "Bottomless cup of fresh roasted American breakfast coffee" },
        ],
      },
    ],
  },
  {
    title: "🍳 Texas Breakfast Board",
    subtitle: "Served starting 6:00 AM Mon–Sat and 7:00 AM Sun",
    subsections: [
      {
        title: "Scratch Breakfast Specialties",
        items: [
          { name: "Homemade Biscuits & Sausage Gravy", price: "$4.99", desc: "Two large scratch-made buttermilk biscuits split open and smothered in creamy black pepper country sausage gravy", tags: ["Breakfast Legend ⭐"] },
          { name: "Big Dan Breakfast Platter", price: "$7.99", desc: "Two farm-fresh eggs cooked to order, choice of crispy bacon or country sausage patties, golden hash browns, and buttered Texas toast", tags: ["Hearty Classic"] },
          { name: "Fluffy Buttermilk Pancake Stack", price: "$5.99", desc: "Three large golden buttermilk pancakes served with warm maple syrup and whipped butter", tags: ["Scratch-Made"] },
          { name: "Austin Sunrise Breakfast Tacos", price: "$2.99", desc: "Two warm flour tortillas filled with fluffy scrambled eggs, melted cheddar, and choice of bacon, sausage, or potato", tags: ["Austin Morning Staple"] },
          { name: "Western Omelet with Texas Toast", price: "$8.49", desc: "Three-egg omelet loaded with smoked ham, diced bell peppers, onions, and cheddar. Served with crispy hash browns", tags: ["Full Meal"] },
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
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF7F0_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="mx-auto max-w-[88rem] px-6 lg:px-8 relative z-10">
            <p className="type-caption text-[#D97706] mb-3 font-bold">Austin, Texas · Est. 1973</p>
            <h1 className="type-display text-5xl md:text-7xl lg:text-8xl leading-none text-ink">
              DAN&apos;S HAMBURGERS<br /><span className="text-ember">KITCHEN BOARD</span>
            </h1>
            <p className="type-serif text-lg md:text-xl text-stone mt-6 max-w-xl">
              100% Certified Angus chuck made to order. World-famous $50 onion rings, hand-dipped malts, and homemade Texas breakfast biscuits.
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
                  className={`px-6 py-3 type-caption text-[10px] border whitespace-nowrap transition-all duration-300 font-bold ${
                    activeTab === idx
                      ? "bg-ember text-bone border-ember"
                      : "bg-transparent text-smoke border-bone-dark hover:border-ember hover:text-char"
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
                  <h2 className="type-display text-4xl sm:text-5xl text-char border-b-2 border-ember pb-4 mb-2">
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
                        <h3 className="type-display text-2xl text-ember">
                          {subsec.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-8">
                        {subsec.items.map((item) => (
                          <div key={item.name} className="group border-b border-bone-dark/50 pb-4">
                            <div className="flex justify-between items-baseline mb-2 gap-4">
                              <h4 className="type-display text-xl text-char group-hover:text-ember transition-colors duration-300">
                                {item.name}
                              </h4>
                              <span className="type-label text-char font-bold text-sm whitespace-nowrap">
                                {item.price}
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
                                    className="text-[8px] font-mono uppercase bg-char text-[#D97706] px-2 py-0.5"
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
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">🍔 Made To Order</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    We never pre-cook our patties. Every burger is seared on hot cast iron right after you order for peak juiciness and flavor.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">📞 Phone-In Orders</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    Short on time? Call any of our 4 Austin/Buda locations ahead of time and your order will be bagged hot and ready for counter pickup.
                  </p>
                </div>
                <div>
                  <h5 className="type-caption text-char text-[9px] mb-2 font-bold">🍳 Breakfast Hours</h5>
                  <p className="type-serif text-smoke text-xs leading-relaxed">
                    Homemade biscuits &amp; sausage gravy, breakfast tacos, and hot pancake stacks are served from opening until 10:30 AM daily.
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
