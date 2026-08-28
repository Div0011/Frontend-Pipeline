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
    "id": "teriyaki-grilled-chicken",
    "name": "Teriyaki Glazed Grilled Chicken Burger",
    "description": "Flame-grilled chicken breast basted in house teriyaki ginger glaze, toasted whole wheat bun, crisp lettuce, grilled pineapple",
    "price": 279,
    "category": "burgers",
    "tags": [
      "signature",
      "flame-grilled",
      "bestseller"
    ],
    "image": "/hero-burger.png",
    "featured": true
  },
  {
    "id": "smoke-house-grilled-paneer",
    "name": "Smoked BBQ Grilled Paneer Burger",
    "description": "Cottage cheese steak marinated in smoked paprika and grilled over flame, caramelized onions, zero-fat herb mayo",
    "price": 259,
    "category": "burgers",
    "tags": [
      "vegetarian",
      "flame-grilled"
    ],
    "image": "/truffle-fries.png",
    "featured": true
  },
  {
    "id": "baked-herb-wedges",
    "name": "Oven-Baked Rosemary Potato Wedges",
    "description": "Thick-cut skin-on potato wedges seasoned with fresh rosemary and sea salt, baked golden crisp without deep frying",
    "price": 149,
    "category": "sides",
    "tags": [
      "healthy",
      "baked"
    ],
    "image": "/old-monk-mousse.png",
    "featured": true
  },
  {
    "id": "pink-guava-cooler",
    "name": "Artisanal Pink Guava Chilli Cooler",
    "description": "Fresh pink guava pulp, crushed mint, sparkling water, light dusting of red chili salt",
    "price": 139,
    "category": "shakes",
    "tags": [
      "iced-tea",
      "signature"
    ],
    "image": "/matcha-special.png",
    "featured": true
  }
];

export const locations: Location[] = [
  {
    "id": "indiranagar-12th-main",
    "name": "BurgerMan Indiranagar Bistro",
    "address": "No 3282, 1, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
    "city": "Bangalore",
    "hours": "11:00 AM \u2013 11:30 PM",
    "phone": "081971 46681",
    "image": "/hero-burger.png",
    "featured": true
  }
];

export const filmCredits: FilmCredit[] = [
  {
    id: "craft-series",
    title: "BurgerMan: The Culinary Craft",
    director: "Bangalore Food Lab",
    year: "2025",
    category: "Kitchen Documentary",
    image: "/hero-burger.png",
  },
];
