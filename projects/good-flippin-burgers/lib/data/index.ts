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
    "id": "the-cluckinator",
    "name": "The Cluckinator",
    "description": "Crispy deep-fried chicken thigh tossed in house spice blend, honey mustard slaw, cheese, and pickles on potato brioche",
    "price": 345,
    "category": "burgers",
    "tags": [
      "signature",
      "crispy",
      "bestseller"
    ],
    "image": "/hero-burger.png",
    "featured": true
  },
  {
    "id": "the-standard-double",
    "name": "The Standard Double Smash",
    "description": "Two smashed beef patties, double melted cheddar, diced red onions, house Flippin sauce on toasted potato bun",
    "price": 375,
    "category": "burgers",
    "tags": [
      "double-smash",
      "classic"
    ],
    "image": "/truffle-fries.png",
    "featured": true
  },
  {
    "id": "cheese-boom",
    "name": "The Cheese Boom Burger",
    "description": "Crispy molten cheese patty with jalape\u00f1o filling, lettuce, tomato, spicy garlic mayo",
    "price": 325,
    "category": "burgers",
    "tags": [
      "vegetarian",
      "cheese-boom"
    ],
    "image": "/old-monk-mousse.png",
    "featured": true
  },
  {
    "id": "salted-caramel-thickshake",
    "name": "Salted Butter Caramel Thickshake",
    "description": "Handcrafted vanilla gelato, rich salted caramel drizzle, crushed butter wafer",
    "price": 225,
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
    "id": "church-street",
    "name": "Good Flippin' Burgers Church Street",
    "address": "Church St, off Brigade Road, Shanthala Nagar, Ashok Nagar, Bengaluru 560001",
    "city": "Bangalore",
    "hours": "11:00 AM \u2013 12:00 AM",
    "phone": "1800 202 3312",
    "image": "/hero-burger.png",
    "featured": true
  },
  {
    "id": "whitefield",
    "name": "Good Flippin' Burgers Whitefield",
    "address": "Whitefield Main Rd, Pattandur Agrahara, Bengaluru 560066",
    "city": "Bangalore",
    "hours": "11:00 AM \u2013 11:30 PM",
    "phone": "1800 202 3312",
    "image": "/truffle-fries.png"
  }
];

export const filmCredits: FilmCredit[] = [
  {
    id: "craft-series",
    title: "Good Flippin' Burgers: The Culinary Craft",
    director: "Bangalore Food Lab",
    year: "2025",
    category: "Kitchen Documentary",
    image: "/hero-burger.png",
  },
];
