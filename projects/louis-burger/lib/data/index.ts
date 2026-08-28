export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "burgers" | "sides" | "shakes" | "specials";
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  image: string;
  featured?: boolean;
}

export interface FilmCredit {
  id: string;
  title: string;
  director: string;
  year: string;
  category: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "truffle-takeover",
    name: "The Truffle Takeover Burger",
    description: "Charcoal-seared prime buffalo patty, shaved European black winter truffles, shiitake & shimeji mushroom ragout, aged English cheddar, truffle garlic emulsion, butter-toasted French brioche",
    price: 495,
    category: "burgers",
    tags: ["signature", "truffle", "luxury"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "monster-cheese-burger",
    name: "The Monster Cheese Royale",
    description: "Double smashed prime patties, smoked bacon onion marmalade, molten English red leicester & sharp cheddar cheese syringe injection",
    price: 525,
    category: "burgers",
    tags: ["bestseller", "indulgent"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "korean-gochujang-chicken",
    name: "Korean Glazed Fried Chicken Burger",
    description: "Crisp free-range chicken breast dipped in sweet spicy Gochujang glaze, kimchi sesame slaw, Japanese Kewpie mayo",
    price: 395,
    category: "burgers",
    tags: ["crispy", "spicy"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "louis-grand-cru-wagyu",
    name: "Louis Grand Cru Wagyu Smash",
    description: "Tenderloin smash patty, 24k edible gold leaf garnish, French comté cheese, caramelized shallots, brioche",
    price: 695,
    category: "burgers",
    tags: ["gold-leaf", "ultra-luxury"],
    image: "/hero-burger.png",
  },
  {
    id: "truffle-parmesan-fries",
    name: "Truffle & Aged Parmesan Fries",
    description: "Hand-cut Kennebec potato fries tossed with white truffle oil, freshly shaved 24-month Grana Padano, and chives",
    price: 245,
    category: "sides",
    tags: ["signature", "vegetarian"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "lotus-biscoff-shake",
    name: "Lotus Biscoff Decadence Shake",
    description: "Spiced Belgian Biscoff cream, handcrafted vanilla bean gelato, toasted marshmallow cream, golden cookie crumb",
    price: 295,
    category: "shakes",
    tags: ["signature", "bestseller"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "valrhona-dark-shake",
    name: "Valrhona 70% Chocolate Silk Shake",
    description: "Single-origin French Valrhona dark chocolate, espresso mist, dark cocoa nibs",
    price: 295,
    category: "shakes",
    tags: ["gourmet"],
    image: "/old-monk-mousse.png",
  },
];

export const locations: Location[] = [
  {
    id: "indiranagar-studio",
    name: "Louis Burger Indiranagar Studio",
    address: "212/A, 1st Main Rd, Stage 2, Indiranagar, Bengaluru, Karnataka 560071",
    city: "Bangalore",
    hours: "12:00 PM – 02:00 AM (Late Night Gourmet)",
    phone: "063663 93732",
    image: "/hero-burger.png",
    featured: true,
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "truffle-artistry",
    title: "The Alchemy of Black Truffles",
    director: "Massive Creative Studios",
    year: "2025",
    category: "Culinary Cinema",
    image: "/hero-burger.png",
  },
  {
    id: "tribute-louis",
    title: "A Tribute to Louis Lassen",
    director: "Zorawar Kalra Food Lab",
    year: "2024",
    category: "Origins Film",
    image: "/truffle-fries.png",
  },
];
