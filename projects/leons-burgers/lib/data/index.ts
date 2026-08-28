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
    id: "peri-peri-chicken-burger",
    name: "Leon's Signature Peri Peri Burger",
    description: "24-hour buttermilk-marinated crispy fried chicken fillet, dusted with hot African bird's eye peri-peri spice, creamy house ranch, shredded iceberg, toasted butter brioche",
    price: 249,
    category: "burgers",
    tags: ["signature", "spicy", "bestseller"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "royal-crunch-chicken",
    name: "The Royal Chicken Crunch",
    description: "Extra-crisp double chicken fillet, melted English cheddar, pickled gherkins, smoky garlic mayo",
    price: 289,
    category: "burgers",
    tags: ["popular", "crispy"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "fiery-jumbo-wings",
    name: "Fiery Jumbo Peri-Peri Wings (6 Pcs)",
    description: "Whole jumbo wings tossed in flaming peri-peri glaze with cooling roasted garlic ranch dip",
    price: 279,
    category: "sides",
    tags: ["spicy", "signature"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "smash-lamb-classic",
    name: "Leon's Gourmet Mutton Smash",
    description: "Double smashed spiced lamb patties, caramelized onions, smoked barbecue drizzle, double cheddar",
    price: 349,
    category: "burgers",
    tags: ["gourmet", "double-smash"],
    image: "/hero-burger.png",
  },
  {
    id: "peri-peri-crinkle-fries",
    name: "Peri Peri Crinkle Fries",
    description: "Golden crinkle-cut fries tossed with signature Leon's peri-peri seasoning and spicy cheesy dip",
    price: 159,
    category: "sides",
    tags: ["bestseller"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "belgian-chocolate-thickshake",
    name: "Belgian Dark Velvet Thickshake",
    description: "Dense handcrafted Belgian chocolate thickshake with dark chocolate fudge swirl",
    price: 199,
    category: "shakes",
    tags: ["signature"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "lotus-biscoff-shake",
    name: "Caramel Biscoff Thickshake",
    description: "Spiced Lotus Biscoff biscuit crumble blended with rich vanilla soft serve and butterscotch drizzle",
    price: 229,
    category: "shakes",
    tags: ["indulgent"],
    image: "/matcha-special.png",
  },
];

export const locations: Location[] = [
  {
    id: "indiranagar",
    name: "Indiranagar (Flagship)",
    address: "No. 839/1 Binnamangala, 1st Stage, Indiranagar, Bengaluru 560038",
    city: "Bangalore",
    hours: "11:00 AM – 01:00 AM",
    phone: "096069 89821",
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "rajajinagar",
    name: "Rajajinagar",
    address: "722, Savitru Elegance, Modi Hospital Rd, Stage 2, Bengaluru 560010",
    city: "Bangalore",
    hours: "11:00 AM – 11:30 PM",
    phone: "096069 89818",
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "sarjapur",
    name: "Sarjapur Road",
    address: "Sarjapur Main Road, Doddakannelli, Bengaluru 560035",
    city: "Bangalore",
    hours: "11:00 AM – 12:00 AM",
    phone: "090359 79994",
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "banashankari",
    name: "Banashankari",
    address: "100 Feet Ring Rd, 3rd Stage, Banashankari, Bengaluru 560085",
    city: "Bangalore",
    hours: "11:00 AM – 11:00 PM",
    phone: "072049 41928",
    image: "/old-monk-mousse.png",
  },
  {
    id: "kalyan-nagar",
    name: "Kalyan Nagar",
    address: "CMR Road, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru 560043",
    city: "Bangalore",
    hours: "11:00 AM – 11:30 PM",
    phone: "08071 176 444",
    image: "/hero-burger.png",
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "crunch-heritage",
    title: "The 24-Hour Buttermilk Secret",
    director: "Leon Culinary Studios",
    year: "2025",
    category: "Craft Film",
    image: "/hero-burger.png",
  },
  {
    id: "bangalore-wings",
    title: "Fiery Nights in Indiranagar",
    director: "Bangalore Food Lab",
    year: "2024",
    category: "Brand Series",
    image: "/truffle-fries.png",
  },
];
