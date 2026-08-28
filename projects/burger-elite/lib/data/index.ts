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
    "id": "elite-double-smash",
    "name": "The Elite Double Smash Royale",
    "description": "Two 90g fresh smashed patties, double melted cheddar, grilled diced onions, house elite burger sauce on toasted brioche",
    "price": 310,
    "category": "burgers",
    "tags": [
      "signature",
      "bestseller"
    ],
    "image": "/hero-burger.png",
    "featured": true
  },
  {
    "id": "crispy-elite-chicken",
    "name": "Crispy Elite Zinger Burger",
    "description": "Crunchy double-dredged chicken fillet, spicy peri-peri dust, garlic mayo, and crunchy iceberg lettuce",
    "price": 270,
    "category": "burgers",
    "tags": [
      "crispy",
      "spicy"
    ],
    "image": "/truffle-fries.png",
    "featured": true
  },
  {
    "id": "peri-peri-cheese-wedges",
    "name": "Peri-Peri Loaded Cheese Wedges",
    "description": "Crispy potato wedges tossed with fiery peri-peri spices, topped with molten cheese and spring onions",
    "price": 160,
    "category": "sides",
    "tags": [
      "sides",
      "vegetarian"
    ],
    "image": "/old-monk-mousse.png",
    "featured": true
  },
  {
    "id": "belgian-chocolate-thickshake",
    "name": "Belgian Dark Chocolate Thickshake",
    "description": "Rich blended dark chocolate ice cream, chocolate fudge swirl, cocoa wafer crunch",
    "price": 195,
    "category": "shakes",
    "tags": [
      "shakes"
    ],
    "image": "/matcha-special.png",
    "featured": true
  }
];

export const locations: Location[] = [
  {
    "id": "mahalakshmi-layout",
    "name": "BURGER ELITE Mahalakshmi Layout",
    "address": "34, 9th B Cross Rd, West of Chord Road 2nd Stage, Mahalakshmi Layout, Bengaluru 560086",
    "city": "Bangalore",
    "hours": "12:00 PM \u2013 11:00 PM",
    "phone": "099454 83345",
    "image": "/hero-burger.png",
    "featured": true
  }
];

export const filmCredits: FilmCredit[] = [
  {
    id: "craft-series",
    title: "BURGER ELITE: The Culinary Craft",
    director: "Bangalore Food Lab",
    year: "2025",
    category: "Kitchen Documentary",
    image: "/hero-burger.png",
  },
];
