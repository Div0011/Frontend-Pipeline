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
    id: "original-behemoth",
    name: "The Original Behemoth",
    description: "Double flame-grilled lamb & beef blend, secret smoked barbecue glaze, melted cheddar, crisp gherkins, toasted sesame milk bun",
    price: 329,
    category: "burgers",
    tags: ["signature", "flame-grilled"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "peri-peri-grilled",
    name: "Peri Peri Flame Chicken",
    description: "Charcoal-grilled chicken breast, African bird's eye marinade, roasted garlic aioli, caramelized shallots",
    price: 269,
    category: "burgers",
    tags: ["spicy", "signature"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "smoked-tandoori-beast",
    name: "Smoked Tandoori Beast",
    description: "Clay-oven spiced grilled patty, smoked mint cream, pickled onions, butter-seared artisanal brioche",
    price: 289,
    category: "burgers",
    tags: ["smoky", "popular"],
    image: "/old-monk-mousse.png",
  },
  {
    id: "afghani-paneer-supreme",
    name: "Afghani Grilled Supreme",
    description: "Charred cottage cheese steak, rich Afghani herb creme, roasted peppers, melted Monterey Jack",
    price: 249,
    category: "burgers",
    tags: ["vegetarian", "flame-grilled"],
    image: "/hero-burger.png",
  },
  {
    id: "fire-dusted-wedges",
    name: "Fire-Dusted Wedges",
    description: "Hand-cut Idaho potatoes, house Cajun smoked seasoning, creamy chipotle dip",
    price: 169,
    category: "sides",
    tags: ["crispy"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "cheesy-jalapeno-poppers",
    name: "Smoked Cheddar Poppers",
    description: "Crispy fried jalapeño spheres with molten smoked gouda and spicy barbecue drizzle",
    price: 219,
    category: "sides",
    tags: ["cheesy"],
    image: "/matcha-special.png",
  },
  {
    id: "belgian-smoke-shake",
    name: "Belgian Dark Smoke Shake",
    description: "70% single-origin Belgian chocolate, smoky caramel infusion, hand-whipped cream",
    price: 219,
    category: "shakes",
    tags: ["signature"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "alphonso-crush-shake",
    name: "Alphonso Velvet Shake",
    description: "Hand-picked Ratnagiri Alphonso mango pulp, condensed vanilla bean cream",
    price: 199,
    category: "shakes",
    tags: ["seasonal"],
    image: "/matcha-special.png",
  },
];

export const locations: Location[] = [
  {
    id: "church-street",
    name: "Church Street (Flagship)",
    address: "Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru 560001",
    city: "Bangalore",
    hours: "11:00 AM – 11:30 PM",
    phone: "073034 47342",
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "cunningham-road",
    name: "Cunningham Road",
    address: "Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560052",
    city: "Bangalore",
    hours: "11:00 AM – 11:00 PM",
    phone: "079087 39053",
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "aecs-layout",
    name: "AECS Layout",
    address: "Avalon Arcade, #313/314 AECS B Block, Kundalahalli, Mahadevapura, Bengaluru 560037",
    city: "Bangalore",
    hours: "11:30 AM – 11:00 PM",
    phone: "073034 47342",
    image: "/matcha-special.png",
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "flame-heritage",
    title: "130 Outlets, One Grill Fire",
    director: "Biggies Visual Team",
    year: "2025",
    category: "Brand Documentary",
    image: "/hero-burger.png",
  },
  {
    id: "church-st-origins",
    title: "Born on Church Street",
    director: "Bangalore Film Archive",
    year: "2024",
    category: "Heritage Short",
    image: "/truffle-fries.png",
  },
];
