export interface MenuItem {
  id: string;
  name: string;
  category: "burgers" | "shakes" | "sides";
  description: string;
  price: number;
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

export const menuItems: MenuItem[] = [
  {
    id: "og-double-smash-burger",
    name: "The OG Double Smash Burger",
    category: "burgers",
    description: "Two 90g fresh patties smashed ultra-thin with crispy lace edges, double American cheese, caramelized sweet onions, house pickles, and secret animal sauce on a potato bun.",
    price: 360,
    tags: ["Cult Favorite", "Top Smash", "Signature"],
    image: "/images/menu/og-smash.jpg",
    featured: true,
  },
  {
    id: "nashville-hot-chicken-smasher",
    name: "Nashville Hot Fried Chicken",
    category: "burgers",
    description: "Crispy fried chicken thigh dunked in fiery cayenne-infused hot oil, spicy comeback mayo, house dill chips, and creamy vinegar cabbage slaw.",
    price: 380,
    tags: ["Fiery", "Nashville Hot"],
    image: "/images/menu/nashville-hot.jpg",
    featured: true,
  },
  {
    id: "smash-truffle-shroom-burger",
    name: "Smashed Truffle Shroom Burger",
    category: "burgers",
    description: "Double smash patties topped with sauteed buttered cremini mushrooms, Swiss melt, roasted garlic truffle aioli, and wild arugula.",
    price: 410,
    tags: ["Truffle", "Gourmet"],
    image: "/images/menu/truffle-shroom.jpg",
    featured: true,
  },
  {
    id: "lotus-biscoff-malt-shake",
    name: "Lotus Biscoff Speculoos Malt Shake",
    category: "shakes",
    description: "Creamy vanilla malt gelato spun with Belgian Biscoff spread, crushed spiced cookie crumbles, and caramel butter drizzle.",
    price: 280,
    tags: ["Biscoff", "Malt"],
    image: "/images/menu/biscoff-shake.jpg",
    featured: true,
  },
  {
    id: "salted-caramel-pretzel-shake",
    name: "Salted Caramel & Pretzel Shake",
    category: "shakes",
    description: "House fleur de sel caramel, roasted pretzel crumbs, rich dairy cream, and vanilla bean gelato.",
    price: 270,
    tags: ["Caramel", "Crunchy"],
    image: "/images/menu/caramel-shake.jpg",
    featured: false,
  },
  {
    id: "animal-style-loaded-fries",
    name: "Animal Style Crinkle Cut Fries",
    category: "sides",
    description: "Hot crispy crinkle cut fries drenched in molten American cheddar sauce, grilled sweet onions, and secret Beyondburg smash sauce.",
    price: 240,
    tags: ["Loaded", "Fan Favorite"],
    image: "/images/menu/animal-fries.jpg",
    featured: true,
  },
  {
    id: "mango-habanero-tenders",
    name: "Mango Habanero Glazed Tenders",
    category: "sides",
    description: "Fresh fried chicken tenders tossed in sweet Alphonso mango and fiery habanero pepper glaze.",
    price: 310,
    tags: ["Tenders", "Spicy Sweet"],
    image: "/images/menu/habanero-tenders.jpg",
    featured: false,
  },
];

export const locations: Location[] = [
  {
    id: "st-marks-road-flagship",
    name: "Beyondburg Inc. St. Mark's Road (Flagship)",
    address: "16/1, House Of Lords, Ground Floor, St Mark's Rd",
    city: "Bengaluru 560001",
    hours: "Mon – Sun: 12:00 PM – 11:30 PM",
    phone: "090729 64242",
    image: "/images/locations/beyondburg-st-marks.jpg",
    featured: true,
  },
  {
    id: "indiranagar-outpost",
    name: "Beyondburg Inc. Indiranagar",
    address: "100 Feet Rd, Defence Colony, Indiranagar",
    city: "Bengaluru 560038",
    hours: "Mon – Sun: 12:00 PM – 11:30 PM",
    phone: "090712 22263",
    image: "/images/locations/beyondburg-st-marks.jpg",
    featured: false,
  },
];
