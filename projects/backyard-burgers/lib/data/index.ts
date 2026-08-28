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
    "id": "backyard-smokehouse-stack",
    "name": "The Backyard Smokehouse Stack",
    "description": "Charbroiled prime beef patty, slow-smoked shredded brisket, melted sharp cheddar, crispy fried onion strings, and house bourbon BBQ sauce on grilled brioche",
    "price": 395,
    "category": "burgers",
    "tags": [
      "signature",
      "smoked",
      "bestseller"
    ],
    "image": "/hero-burger.png",
    "featured": true
  },
  {
    "id": "texas-jalapeno-char",
    "name": "Texas Charred Jalape\u00f1o Burger",
    "description": "Double grilled beef patties, roasted fresh jalape\u00f1os, smoked pepper jack cheese, chipotle mayo, and dill pickles",
    "price": 365,
    "category": "burgers",
    "tags": [
      "spicy",
      "charbroiled"
    ],
    "image": "/truffle-fries.png",
    "featured": true
  },
  {
    "id": "hickory-bacon-melt",
    "name": "Hickory Smoked Bacon Melt",
    "description": "Double smashed beef, thick-cut wood-smoked bacon, Monterey Jack cheese, caramelized onions, and garlic herb aioli",
    "price": 385,
    "category": "burgers",
    "tags": [
      "classic",
      "bacon"
    ],
    "image": "/old-monk-mousse.png",
    "featured": true
  },
  {
    "id": "loaded-backyard-fries",
    "name": "Loaded Backyard Pitmaster Fries",
    "description": "Skin-on hand-cut fries smothered in smoked brisket bits, molten cheddar cheese sauce, jalape\u00f1o slices, and ranch drizzle",
    "price": 225,
    "category": "sides",
    "tags": [
      "loaded",
      "sides"
    ],
    "image": "/truffle-fries.png",
    "featured": true
  },
  {
    "id": "smoked-vanilla-malt",
    "name": "Smoked Bourbon Vanilla Malt Shake",
    "description": "Handcrafted vanilla bean ice cream, smoked caramel swirl, malted milk, and toasted pecan crumble",
    "price": 245,
    "category": "shakes",
    "tags": [
      "thickshake",
      "signature"
    ],
    "image": "/matcha-special.png",
    "featured": true
  }
];

export const locations: Location[] = [
  {
    "id": "indiranagar-100ft",
    "name": "Backyard Burgers Indiranagar 100ft",
    "address": "Ground Floor, No. 57, 100 Feet Rd, Defence Colony, Indiranagar, Bengaluru 560038",
    "city": "Bangalore",
    "hours": "12:00 PM \u2013 11:30 PM",
    "phone": "088614 80534",
    "image": "/hero-burger.png",
    "featured": true
  }
];

export const filmCredits: FilmCredit[] = [
  {
    id: "craft-series",
    title: "Backyard Burgers & Grill: The Culinary Craft",
    director: "Bangalore Food Lab",
    year: "2025",
    category: "Kitchen Documentary",
    image: "/hero-burger.png",
  },
];
