export interface MenuItem {
  name: string;
  price: number | number[];
  description?: string;
  badges?: string[];
  tags?: string[];
}

export interface MenuCategory {
  title: string;
  emoji: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    title: "Fresh Juice, Iced Tea & Mocktails",
    emoji: "🥤",
    items: [
      { name: "Fresh Watermelon & Mint Juice", price: 218 },
      { name: "Fresh Iced Tea (Peach / Lemon)", price: 228 },
      { name: "Homemade Ginger Ale", price: 228 },
      { name: "Fresh Lime (Soda / Water)", price: 170 },
      { name: "Sober Picante", price: 248, badges: ["NEW"] },
      { name: "Virgin Mojito", price: 228 },
      { name: "Fresh Watermelon Mojito", price: 238 },
      { name: "Virgin Piña Colada", price: 238 },
    ],
  },
  {
    title: "Shakes",
    emoji: "🥛",
    items: [
      { name: "French Vanilla Biscuit Shake", price: 290 },
      { name: "Strawberry Cheesecake Shake", price: 290 },
      { name: "Salted Pistachio Shake", price: 320, badges: ["NEW", "NUTS"] },
      { name: "Oreo & Chocolate Shake", price: 290 },
    ],
  },
  {
    title: "Kombucha (by Mossant)",
    emoji: "🍹",
    items: [
      { name: "Salted Lime", price: 260 },
      { name: "Blueberry Lemonade", price: 260 },
    ],
  },
  {
    title: "Cold & Hot Chocolate",
    emoji: "☕",
    items: [
      { name: "European Hot Chocolate", price: 320, description: "Dark & Delicious!" },
      { name: "Cold Chocolate", price: 290, description: "Dark & Delicious!" },
    ],
  },
  {
    title: "Bottled & Canned",
    emoji: "🥤",
    items: [
      { name: "Coke / Diet Coke / Sprite", price: 130 },
      { name: "Mineral Water 1L", price: 125 },
    ],
  },
  {
    title: "Speciality Coffee (By Mannheim)",
    emoji: "☕",
    items: [
      { name: "Americano (Hot / Iced)", price: 230 },
      { name: "Cappuccino (Hot / Iced)", price: 255 },
      { name: "Cafe Latte (Hot / Iced)", price: 255 },
      { name: "Mocha", price: 280 },
      { name: "Flat White", price: 255 },
      { name: "Spanish Latte (Hot / Iced)", price: 280, description: "Espresso, milk, condensed milk" },
    ],
  },
  {
    title: "Cold Coffee",
    emoji: "🧊",
    items: [
      { name: "Classic", price: 265 },
      { name: "Roasted Hazelnut", price: 295 },
      { name: "Vanilla", price: 295 },
      { name: "Caramel", price: 295 },
      { name: "Mocha", price: 295 },
      { name: "Irish", price: 295 },
    ],
  },
  {
    title: "Matcha Specials",
    emoji: "🍵",
    items: [
      { name: "Classic Matcha", price: 350 },
      { name: "Roasted Hazelnut Matcha", price: 350 },
      { name: "Vanilla Matcha Latte", price: 350 },
      { name: "Iced Classic Matcha", price: 350 },
      { name: "Iced Mango Matcha", price: 350 },
      { name: "Iced Summer Berry Matcha", price: 350 },
    ],
  },
  {
    title: "Sides & Salad — Veg",
    emoji: "🍟",
    items: [
      { name: "Fries (Classic / Cajun)", price: [268, 278], description: "Served with home-made ketchup and spiced garlic dip" },
      { name: "Corn Ribs", price: 328, badges: ["CHEF"], description: "Served with spiced garlic dip, lemon wedge" },
      { name: "Oyster Mushroom Karaage", price: 348, badges: ["NEW"], description: "Crispy fried oyster mushroom dusted with togarashi spice, served with truffle mayo" },
      { name: "Truffle Fries", price: 338, description: "Truffle mayo, parmesan, parsley" },
      { name: "Onion Rings", price: 298, description: "Served with spiced garlic dip" },
      { name: "Caesar Salad", price: 298, badges: ["EGG"], description: "Romaine lettuce with homemade dressing (contains egg), croutons, marinated olives, sun-dried tomatoes" },
    ],
  },
  {
    title: "Sides & Salad — Non Veg",
    emoji: "🍗",
    items: [
      { name: "Gravy Fries", price: 338, badges: ["NEW"], description: "French gravy sauce poured on top of our crispy fries (sauce contains chicken stock)" },
      { name: "Buffalo Chicken Flings", price: 348, badges: ["SPICY"], description: "Buffalo sauce dunked fried chicken, crispy onions. Served with garlic aioli" },
      { name: "Dino Bone Marrow", price: 448, badges: ["NEW"], description: "Roasted bone marrow. Served with toasted bread, chimichurri, pickled onions" },
      { name: "Chicken Wings", price: 398, description: "Available flavors: Blackened BBQ, AOP (Aglio Olio Peperoncino), Chilli Honey" },
      { name: "Caesar Salad (Grilled Chicken / Bacon)", price: [368, 418], badges: ["EGG"], description: "Romaine lettuce with homemade dressing (contains egg), croutons, marinated olives, sun-dried tomatoes" },
    ],
  },
  {
    title: "Mac & Cheese",
    emoji: "🧀",
    items: [
      { name: "The Classic", price: 390 },
      { name: "Sundried Tomato", price: 410 },
      { name: "Grilled Chicken Mac", price: 460 },
      { name: "Bacon Crisp", price: 520 },
      { name: "Brisket Mac", price: 595, badges: ["CHEF"] },
      { name: "Mac with Braised Brisket", price: 0, badges: ["MUST"], description: "A must-try experience" },
    ],
  },
  {
    title: "Veggie Burgers",
    emoji: "🥬",
    items: [
      { name: "Korean Fried Paneer", price: 360, badges: ["CHEF"], description: "Gochujang glazed fried paneer, chimichurri, slaw, lettuce, garlic mayo" },
      { name: "Magic Mushroom", price: 360, badges: ["NEW"], description: "Multigrain crusted wild mushroom patty, pickled onions, lettuce, smash sauce" },
      { name: "Louisiana", price: 360, badges: ["NEW", "NUTS"], description: "Roasted mix vegetable patty, slaw, american cheese, jalapeños, lettuce, smoky chipotle mayo" },
      { name: "Cheesy Chilli Mac", price: 360, badges: ["SPICY"], description: "Mac and cheese patty, chilli sofrito, double cheese slices, grilled onions, jalapeños, smoky chipotle mayo" },
      { name: "Broccoli and Cheddar", price: 360, badges: ["NUTS"], description: "Crumbled broccoli, cheddar & walnut patty, american cheese, jalapeños, lettuce, smash sauce" },
    ],
  },
  {
    title: "Fried Chicken Burgers",
    emoji: "🍔",
    items: [
      { name: "Buffalo Chicken", price: 370, badges: ["SPICY"], description: "Buffalo-sauce-dunked fried chicken, garlic mayo, grilled onions, lettuce, smoky chipotle mayo" },
      { name: "Nashville Chicken", price: 370, badges: ["SPICY", "CHEF"], description: "Nashville spiced fried chicken dipped in hot oil, home-made chilli sofrito, pickles, garlic aioli" },
      { name: "Crispy French Dip", price: 390, badges: ["EGG"], description: "French-dip-dunked fried chicken, white onions, pickles, lettuce, garlic aioli, served with a French gravy dip" },
      { name: "Chicken Caesar Burger", price: 390, badges: ["EGG"], description: "Fried chicken, jalapeños, romaine lettuce, parmesan, caesar dressing" },
    ],
  },
  {
    title: "Smash Chicken",
    emoji: "🍗",
    items: [
      { name: "Foster Chicken Smash", price: 420, badges: ["CHEF"], description: "Double smash chicken patties, american cheese, chimichurri, pickles, lettuce, smash sauce" },
      { name: "Chicken Chilli Cheese Smash", price: 450, badges: ["SPICY"], description: "Double smash patties, chilli cheese sauce, american cheese, home-made chilli sofrito, smash sauce" },
    ],
  },
  {
    title: "Beef (Buff) & Lamb — Classic Smash",
    emoji: "🥩",
    items: [
      { name: "OG Smash", price: 470, description: "Double smash patties, double american cheese, pickles, white onions, mustard" },
      { name: "Oklahoma Smash", price: 520, description: "Double white onion smash patties, american cheese, chimichurri, pickles, lettuce, smash sauce" },
      { name: "Chilli Cheese Smash", price: 550, badges: ["SPICY", "CHEF"], description: "Double smash patties, chilli cheese sauce, american cheese, home-made chilli sofrito, smash sauce" },
      { name: "Bacon Chilli Cheese Smash", price: 650, badges: ["SPICY"], description: "Double smash patties, chilli cheese sauce, american cheese, bacon, home-made chilli sofrito, smash sauce" },
    ],
  },
  {
    title: "Beef (Buff) & Lamb — Exhibition Smash",
    emoji: "🌟",
    items: [
      { name: "8 Hr. Braised Brisket (Buff)", price: 650, badges: ["CHEF"], description: "Pickled-onion smash patty, bbq braised brisket, american cheese, smash sauce" },
      { name: "PB & Bacon Smash (Buff / Lamb)", price: 550, badges: ["NUTS"], description: "Smash patty, crunchy peanut butter, american cheese, streaky bacon, sliced red paprika, smash sauce" },
      { name: "The Dalston Dip (Buff)", price: 750, description: "Double smash patties, double american cheese, grilled onions, smash sauce. Served with home-made jus" },
      { name: "The Flintstone (Buff & Bacon)", price: 750, description: "Smash patty, american cheese, streaky bacon, smash sauce. Served with a dino bone marrow" },
      { name: "The Wellington (Buff & Bacon)", price: 790, description: "Double mustard buff smash patties, streaky bacon, roasted mushroom, smash sauce. Served with home-made jus" },
    ],
  },
  {
    title: "Desserts",
    emoji: "🍰",
    items: [
      { name: "Deep Fried Oreos (Eggless)", price: 350, description: "Whipped custard, dulce de leche" },
      { name: "Old Monk Chocolate Mousse (Eggless)", price: 350, badges: ["CHEF", "MUST"], description: "Whipped custard, cocoa dust" },
      { name: "Apple Crumble Cake", price: 350, badges: ["NUTS"], description: "Whipped cream, vanilla ice cream" },
    ],
  },
];

export const addOnsVeg = [
  { name: "Haystack onions / Grilled onions", price: 40 },
  { name: "Chilli sofrito / Cheese slice / Slaw / Jalapeños", price: 40 },
  { name: "Extra dip", price: 40 },
  { name: "Chimichurri", price: 40 },
  { name: "Extra veg patty", price: 100 },
  { name: "Smashed Truffle Burrata", price: 125 },
];

export const addOnsNonVeg = [
  { name: "Home-made jus (Buff)", price: 120 },
  { name: "Fried egg", price: 60 },
  { name: "Chicken smash patty", price: 100 },
  { name: "Buff or Lamb patty", price: 150 },
  { name: "Streaky bacon", price: 120 },
  { name: "Dino Bone Marrow (Buff)", price: 448 },
  { name: "BBQ Braised Brisket (Buff)", price: 240 },
];
