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
    "id": "simon-monster-double",
    "name": "The Simon Monster Double",
    "description": "Two juicy seasoned beef patties, double melted cheddar, saut\u00e9ed sweet onions, and Simon signature sauce on toasted sesame bun",
    "price": 290,
    "category": "burgers",
    "tags": [
      "signature",
      "monster-stack",
      "bestseller"
    ],
    "image": "/hero-burger.png",
    "featured": true
  },
  {
    "id": "fiery-crispy-zinger",
    "name": "Fiery Crispy Chicken Zinger",
    "description": "Double-crunch marinated chicken breast, habanero dust, spicy garlic mayo, and shredded iceberg lettuce",
    "price": 250,
    "category": "burgers",
    "tags": [
      "spicy",
      "crispy"
    ],
    "image": "/truffle-fries.png",
    "featured": true
  },
  {
    "id": "cheesy-chilli-fries",
    "name": "Cheesy Chilli Loaded Fries",
    "description": "Golden crinkle fries topped with homemade minced meat chilli, molten cheese, and sliced jalape\u00f1os",
    "price": 160,
    "category": "sides",
    "tags": [
      "sides",
      "loaded"
    ],
    "image": "/old-monk-mousse.png",
    "featured": true
  },
  {
    "id": "nutella-fudge-shake",
    "name": "Nutella Fudge Thickshake",
    "description": "Pure Italian Nutella blended with rich vanilla bean cream, chocolate fudge rim, hazelnut crunch",
    "price": 180,
    "category": "shakes",
    "tags": [
      "thickshake",
      "bestseller"
    ],
    "image": "/matcha-special.png",
    "featured": true
  }
];

export const locations: Location[] = [
  {
    "id": "kammanahalli-3rd-cross",
    "name": "Simon Burgers Kammanahalli",
    "address": "Unit 6, Vivekananda Swamy, 38, 3rd Cross Rd, Kammanahalli, Bengaluru, Karnataka 560084",
    "city": "Bangalore",
    "hours": "1:00 PM \u2013 12:30 AM (Late Night Hub)",
    "phone": "095911 84263",
    "image": "/hero-burger.png",
    "featured": true
  }
];

export const filmCredits: FilmCredit[] = [
  {
    id: "craft-series",
    title: "Simon Burgers: The Culinary Craft",
    director: "Bangalore Food Lab",
    year: "2025",
    category: "Kitchen Documentary",
    image: "/hero-burger.png",
  },
];
