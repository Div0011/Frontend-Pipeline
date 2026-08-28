import os, shutil, json

all_projects = [
    'backyard-burgers', 'beyondburg-inc', 'biggies-burger', 'burger-bar-austin',
    'burger-elite', 'burger-seigneur', 'burgerman', 'casino-el-camino',
    'dans-burgers', 'dirty-martins', 'good-flippin-burgers', 'jewboy-burgers',
    'leons-burgers', 'little-deli-pizzeria', 'louis-burger', 'nadc-burger',
    'original-burger-co', 'pedrosos-pizza', 'pool-burger', 'sankys-burger-house',
    'simon-burgers', 'smash-guys', 'sour-duck-market', 'truffles-bangalore'
]

source_ui_dir = os.path.join('projects', 'beyondburg-inc', 'components', 'ui')
ui_files = ['AccordionGallery.tsx', 'MorphSlider.tsx', 'OptionWheel.tsx']

# Brand tailored data for gallery and morph slides
brand_data = {
    'backyard-burgers': {
        'accent': '#E67E22',
        'curr': '₹',
        'gallery_items': [
            {'label': 'Backyard Smokehouse Double', 'category': 'Signature Smoke', 'price': '₹395', 'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop', 'caption': 'Hickory-smoked smashed patties with aged cheddar, caramelized bacon jam, and pitmaster BBQ sauce.'},
            {'label': 'Crispy Pork Belly Slider', 'category': 'Pitmaster Special', 'price': '₹380', 'image': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop', 'caption': 'Slow-braised crispy pork belly with apple cider mustard slaw on a brioche slider.'},
            {'label': 'Nashville Cayenne Tender', 'category': 'Fried Chicken', 'price': '₹340', 'image': 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1200&auto=format&fit=crop', 'caption': 'Buttermilk-soaked chicken breast tenders dusted with ghost pepper rub and honey glaze.'},
            {'label': 'Smoked Pecan Thickshake', 'category': 'Craft Shakes', 'price': '₹290', 'image': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop', 'caption': 'Roasted Texas pecans blended with vanilla bean cream, brown butter, and caramel crisp.'},
            {'label': 'Loaded Pitmaster Fries', 'category': 'Crispy Sides', 'price': '₹230', 'image': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop', 'caption': 'Hand-cut skin-on fries topped with pulled beef bits, melted queso, and pickled jalapenos.'},
        ],
        'categories': ['All Creations', 'Smokehouse Smashes', 'Pitmaster Specialties', 'Craft Shakes', 'Loaded Sides'],
    },
    'truffles-bangalore': {
        'accent': '#F5A623',
        'curr': '₹',
        'gallery_items': [
            {'label': 'All American Cheese Burger', 'category': 'Landmark Classic', 'price': '₹360', 'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop', 'caption': 'The 2004 Bangalore icon: flame-grilled double beef patty with melted cheddar and secret relish.'},
            {'label': 'Ferrero Rocher Ultra Shake', 'category': 'Legendary Shakes', 'price': '₹290', 'image': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop', 'caption': 'Whole Ferrero pralines blended into thick hazelnut fudge chocolate cream.'},
            {'label': 'Truffles Sloppy Joe Sub', 'category': 'Cafe Specialties', 'price': '₹340', 'image': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop', 'caption': 'Spiced minced beef smothered in tangy tomato ragu and gooey mozzarella inside toasted French roll.'},
            {'label': 'Crispy Peri-Peri Chicken Burger', 'category': 'Crispy Poultry', 'price': '₹320', 'image': 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1200&auto=format&fit=crop', 'caption': 'Panko-crusted chicken fillet dusted in African bird eye chili spice and garlic mayo.'},
            {'label': 'Cheese Fries Diablo', 'category': 'Legendary Sides', 'price': '₹220', 'image': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop', 'caption': 'Golden French fries drowned in spicy cheese sauce, chopped green chilies, and herbs.'},
        ],
        'categories': ['Full Lineup', 'Legendary Burgers', 'Ferrero Shakes', 'Crispy Poultry', 'Cafe Munchies'],
    },
    'burger-seigneur': {
        'accent': '#C8A96E',
        'curr': '₹',
        'gallery_items': [
            {'label': 'Lucien Portobello Brioche', 'category': 'European Gourmet', 'price': '₹495', 'image': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop', 'caption': 'Whole roasted Portobello mushroom filled with sun-dried tomatoes, gouda melt, and truffle butter.'},
            {'label': 'Dynamit Beef Smasher', 'category': 'Signatures', 'price': '₹480', 'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop', 'caption': 'Grass-fed smashed beef, dynamit spicy glaze, crispy shallots, and Swiss Emmental cheese.'},
            {'label': 'Traiteur Truffle Parmesan Fries', 'category': 'Luxury Sides', 'price': '₹270', 'image': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop', 'caption': 'Thin-cut Belgian frites infused with Alba white truffle essence and aged Reggiano.'},
            {'label': 'Madagascar Vanilla Bean Float', 'category': 'Artisanal Drinks', 'price': '₹310', 'image': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop', 'caption': 'Single-origin Madagascar vanilla gelato drowned in sparkling botanical root beer.'},
            {'label': 'Roquefort Blue Steak Burger', 'category': 'Chef Reserve', 'price': '₹540', 'image': 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop', 'caption': 'Dry-aged beef tenderloin patty topped with cave-aged French blue cheese and onion compote.'},
        ],
        'categories': ['Grand Menu', 'Gourmet Brioche', 'Chef Reserve', 'Luxury Frites', 'Artisanal Mocktails'],
    },
    'dans-burgers': {
        'accent': '#D97706',
        'curr': '$',
        'gallery_items': [
            {'label': "Dan's Special Cheeseburger", 'category': 'Austin Classic 1973', 'price': '$8.99', 'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop', 'caption': 'Fresh Texas beef on flat-top griddle with American cheese, shredded lettuce, tomato, and mayo on toasted sesame bun.'},
            {'label': 'Texas Toast Patty Melt', 'category': 'Griddled Melts', 'price': '$9.49', 'image': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop', 'caption': 'Caramelized sweet yellow onions and Swiss cheese pressed between thick buttered Texas toast.'},
            {'label': 'Dan-Air Onion Rings', 'category': 'Hand-Battered', 'price': '$4.50', 'image': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop', 'caption': 'Colossal sweet Texas onions hand-dunked in seasoned cornmeal batter and fried extra crisp.'},
            {'label': 'Malted Chocolate Shake', 'category': 'Old-Fashioned Shakes', 'price': '$5.25', 'image': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop', 'caption': 'Real malted milk powder and Blue Bell chocolate ice cream spun in stainless steel malt cup.'},
            {'label': 'Jalapeno Bacon Double', 'category': 'Hill Country Smashes', 'price': '$10.25', 'image': 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop', 'caption': 'Two seasoned beef patties layered with crispy hickory bacon and grilled Texas jalapenos.'},
        ],
        'categories': ['Diner Classics', 'Texas Burgers', 'Toast Melts', 'Hand-Battered Sides', 'Blue Bell Shakes'],
    },
    'dirty-martins': {
        'accent': '#BF5700',
        'curr': '$',
        'gallery_items': [
            {'label': 'The O.T. Special (Original Texas)', 'category': 'UT Drag Legend 1926', 'price': '$9.50', 'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop', 'caption': 'Cast-iron griddled beef patty with mustard, pickles, and grilled onions on a toasted bun.'},
            {'label': 'Kum-Bak Chili Cheeseburger', 'category': 'House Chili Specials', 'price': '$10.25', 'image': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop', 'caption': 'Smothered in 100-year recipe Texas all-meat chili and shredded sharp cheddar cheese.'},
            {'label': 'Centennial Chili Cheese Tots', 'category': 'Historic Sides', 'price': '$5.50', 'image': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop', 'caption': 'Golden crunchy potato tots buried under house chili, cheese sauce, and diced onions.'},
            {'label': 'Hand-Spun Longhorn Shake', 'category': 'Fountain Shakes', 'price': '$5.75', 'image': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop', 'caption': 'Vanilla bean ice cream spun with salted caramel and chocolate malt swirl.'},
            {'label': 'DH Double Bacon Cheeseburger', 'category': 'Signature Doubles', 'price': '$11.50', 'image': 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop', 'caption': 'Double meat, double cheese, and double thick-cut hardwood smoked bacon.'},
        ],
        'categories': ['1926 Classics', 'Kum-Bak Burgers', 'Chili Specialties', 'Fried Bar Sides', 'Fountain Malts'],
    },
}

def make_signature_menu(accent, curr, categories):
    cats_js = json.dumps(categories, indent=2)
    template = '''"use client";

import React, { useState } from "react";
import { menuItems } from "@/lib/data";
import OptionWheel from "@/components/ui/OptionWheel";
import { motion, AnimatePresence } from "framer-motion";

const categories = __CATS_JS__;

export default function SignatureMenu() {
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [isWheelOpen, setIsWheelOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"wheel" | "grid">("wheel");

  const currentCategory = categories[selectedCatIndex];

  const filteredItems = menuItems.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    if (selectedCatIndex === 0) return true;
    if (selectedCatIndex === 1) return cat.includes("burger") || cat.includes("pizza") || cat.includes("special") || cat === "mains";
    if (selectedCatIndex === 2) return cat.includes("shake") || cat.includes("drink") || cat.includes("sweet") || cat.includes("dessert");
    if (selectedCatIndex === 3) return cat.includes("side") || cat.includes("fry") || cat.includes("wing") || cat.includes("salad");
    return true;
  });

  return (
    <section id="menu-section" className="py-24 px-6 sm:px-12 md:px-20 bg-char-soft text-bone border-b border-char-mute relative">
      <div className="fixed right-6 bottom-8 z-40">
        <button
          onClick={() => {
            const el = document.getElementById("menu-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            setIsWheelOpen((prev) => !prev);
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-black/20 backdrop-blur-md"
          style={{ backgroundColor: "__ACCENT__", color: "#000000" }}
        >
          <span>🎡</span>
          <span>{isWheelOpen ? "Hide Wheel" : "Spin Category Dial"}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 pb-6 border-b border-char-mute">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "__ACCENT__" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__ACCENT__" }}>
                INTERACTIVE 3D SELECTION DIAL
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-bone">
              SIGNATURE LINEUP
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-smoke">
              Showing <span className="font-bold" style={{ color: "__ACCENT__" }}>{filteredItems.length}</span> Items
            </div>

            <div className="flex items-center bg-char p-1 rounded-sm border border-char-mute font-mono text-xs">
              <button
                onClick={() => setViewMode("wheel")}
                className="px-3 py-1.5 rounded-xs transition-colors"
                style={{
                  backgroundColor: viewMode === "wheel" ? "__ACCENT__" : "transparent",
                  color: viewMode === "wheel" ? "#000000" : "#a8a29e",
                  fontWeight: viewMode === "wheel" ? "bold" : "normal"
                }}
              >
                3D Wheel
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className="px-3 py-1.5 rounded-xs transition-colors"
                style={{
                  backgroundColor: viewMode === "grid" ? "__ACCENT__" : "transparent",
                  color: viewMode === "grid" ? "#000000" : "#a8a29e",
                  fontWeight: viewMode === "grid" ? "bold" : "normal"
                }}
              >
                Classic Tabs
              </button>
            </div>
          </div>
        </div>

        {viewMode === "wheel" && isWheelOpen && (
          <div className="p-8 sm:p-10 rounded-2xl bg-char border-2 border-char-mute/80 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="mb-4">
                <span className="font-mono text-[11px] uppercase tracking-widest block" style={{ color: "__ACCENT__" }}>
                  Drag or scroll to select category
                </span>
              </div>
              <OptionWheel
                items={categories}
                defaultSelected={selectedCatIndex}
                textColor="#888888"
                activeColor="__ACCENT__"
                side="left"
                fontSize={2.5}
                spacing={1.3}
                curve={1}
                tilt={8}
                blur={2.5}
                fade={0.3}
                smoothing={180}
                inset={20}
                draggable={true}
                onChange={(index) => setSelectedCatIndex(index)}
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl bg-char-soft border border-char-mute flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3 border" style={{ backgroundColor: "__ACCENT__15", color: "__ACCENT__", borderColor: "__ACCENT__30" }}>
                  ACTIVE CATEGORY
                </span>
                <h3 className="type-display text-3xl sm:text-4xl text-bone font-bold">
                  {currentCategory}
                </h3>
                <p className="type-serif text-xs sm:text-sm text-smoke mt-3 leading-relaxed">
                  Explore our handcrafted culinary collection featuring premium locally sourced ingredients, house-made sauces, and artisanal recipes.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-char-mute">
                <span className="font-mono text-xs text-smoke">
                  Items in category: <span className="text-white font-bold">{filteredItems.length}</span>
                </span>
                <button
                  onClick={() => {
                    const el = document.getElementById("menu-grid-anchor");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="font-mono text-xs font-bold hover:underline flex items-center gap-1"
                  style={{ color: "__ACCENT__" }}
                >
                  View Dishes ↓
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === "grid" && (
          <div className="flex flex-wrap gap-2 font-mono text-xs uppercase">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setSelectedCatIndex(idx)}
                className="px-4 py-2.5 rounded-sm transition-all"
                style={{
                  backgroundColor: selectedCatIndex === idx ? "__ACCENT__" : "#1a1a1a",
                  color: selectedCatIndex === idx ? "#000000" : "#a8a29e",
                  fontWeight: selectedCatIndex === idx ? "bold" : "normal"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div id="menu-grid-anchor" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-xl bg-char border border-char-mute shadow-md hover:border-white/30 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:translate-y-[-2px]"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-bone group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono font-bold text-lg px-2 py-0.5 rounded bg-char-soft border" style={{ color: "__ACCENT__", borderColor: "__ACCENT__30" }}>
                      __CURR__{item.price}
                    </span>
                  </div>
                  <p className="text-smoke text-xs leading-relaxed font-body">
                    {item.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-char-mute">
                  <div className="flex gap-1.5 flex-wrap">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-xs bg-char-soft text-[9px] font-mono uppercase text-smoke"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="/menu"
                    className="text-xs font-mono font-bold hover:underline flex items-center gap-1"
                    style={{ color: "__ACCENT__" }}
                  >
                    Add +
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
'''
    return template.replace('__CATS_JS__', cats_js).replace('__ACCENT__', accent).replace('__CURR__', curr)

# Process all 24 projects
for p in all_projects:
    p_path = os.path.join('projects', p)
    if not os.path.exists(p_path):
        continue
    
    is_austin = 'austin' in p or p in ['dans-burgers', 'dirty-martins', 'casino-el-camino', 'jewboy-burgers', 'pedrosos-pizza', 'little-deli-pizzeria', 'pool-burger', 'sour-duck-market', 'nadc-burger']
    b_info = brand_data.get(p, {
        'accent': '#F5C418',
        'curr': '$' if is_austin else '₹',
        'categories': ['Full Menu', 'Smashed Burgers', 'Hand-Spun Shakes', 'Crispy Sides', 'Secret Reserve'],
    })

    # Write SignatureMenu.tsx
    menu_content = make_signature_menu(b_info['accent'], b_info['curr'], b_info['categories'])
    with open(os.path.join(p_path, 'components', 'marketing', 'SignatureMenu.tsx'), 'w', encoding='utf-8') as f:
        f.write(menu_content)

print("Updated SignatureMenu.tsx across all 24 projects with clean JSX tag rendering!")
