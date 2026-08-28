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
    "id": "classic-smash-double",
    "name": "The Classic Double Smash",
    "description": "Two 90g fresh beef patties smashed thin on 230\u00b0C cast iron, double American cheese, dill pickles, diced onions, and signature smash sauce on toasted brioche",
    "price": 349,
    "category": "burgers",
    "tags": [
      "signature",
      "bestseller",
      "double-smash"
    ],
    "image": "/hero-burger.png",
    "featured": true
  },
  {
    "id": "truffle-smash-special",
    "name": "Black Truffle Garlic Smash",
    "description": "Double smashed beef patties, house-made truffle garlic aioli, caramelized shallots, aged Swiss melt, butter brioche",
    "price": 399,
    "category": "burgers",
    "tags": [
      "truffle",
      "gourmet"
    ],
    "image": "/truffle-fries.png",
    "featured": true
  },
  {
    "id": "truffle-parmesan-fries",
    "name": "Truffle & Parmesan Fries",
    "description": "Hand-cut skin-on fries tossed with white truffle oil, shaved Grana Padano, and chives",
    "price": 199,
    "category": "sides",
    "tags": [
      "sides",
      "vegetarian"
    ],
    "image": "/old-monk-mousse.png",
    "featured": true
  },
  {
    "id": "old-monk-mousse-shake",
    "name": "Old Monk Mousse Craft Shake",
    "description": "Hand-spun dark chocolate mousse shake infused with caramelized spice essence and whipped cream",
    "price": 229,
    "category": "shakes",
    "tags": [
      "shakes",
      "signature"
    ],
    "image": "/matcha-special.png",
    "featured": true
  }
];

export const locations: Location[] = [
  {
    "id": "indiranagar",
    "name": "Smash Guys Indiranagar (Flagship)",
    "address": "948, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
    "city": "Bangalore",
    "hours": "11:00 AM \u2013 11:30 PM",
    "phone": "080 4736 2227",
    "image": "/hero-burger.png",
    "featured": true
  },
  {
    "id": "bellandur",
    "name": "Smash Guys RMZ Ecoworld",
    "address": "Ground Floor, RMZ Ecoworld Rd, Bellandur, Bengaluru, Karnataka 560103",
    "city": "Bangalore",
    "hours": "11:00 AM \u2013 11:00 PM",
    "phone": "080 4736 2228",
    "image": "/truffle-fries.png"
  }
];

export const filmCredits: FilmCredit[] = [
  {
    id: "craft-series",
    title: "Smash Guys: The Culinary Craft",
    director: "Bangalore Food Lab",
    year: "2025",
    category: "Kitchen Documentary",
    image: "/hero-burger.png",
  },
];
