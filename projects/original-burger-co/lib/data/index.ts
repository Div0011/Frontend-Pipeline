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
    id: "obc-classic-double",
    name: "OBC Classic Double Smash",
    description: "Two 90g fresh buffalo smash patties, double sharp American cheddar, house dill pickles, minced onions, and signature secret OBC burger sauce on golden toasted brioche",
    price: 360,
    category: "burgers",
    tags: ["bestseller", "signature", "double-smash"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "smoked-bacon-jam-melt",
    name: "Smoked Bacon Jam Melt",
    description: "Double smashed patties smothered in slow-simmered caramelized bacon onion jam, melted Monterey Jack, and smoky garlic aioli",
    price: 410,
    category: "burgers",
    tags: ["popular", "smoky"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "hot-honey-crispy-chicken",
    name: "Hot Honey Fried Chicken Burger",
    description: "24-hr brined double-dredged chicken thigh drizzled with habanero-infused hot honey, creamy apple slaw, and pickle chips",
    price: 340,
    category: "burgers",
    tags: ["crispy", "spicy", "hot-honey"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "mushroom-truffle-smash",
    name: "Wild Mushroom Truffle Smash",
    description: "Charred double smash, sautéed wild oyster mushrooms, Swiss cheese melt, and white truffle garlic butter",
    price: 420,
    category: "burgers",
    tags: ["gourmet", "truffle"],
    image: "/hero-burger.png",
  },
  {
    id: "truffle-parmesan-fries",
    name: "OBC Truffle Mayo Loaded Fries",
    description: "Skin-on rustic Kennebec potato fries tossed with rosemary salt, Grana Padano shavings, and house truffle aioli",
    price: 210,
    category: "sides",
    tags: ["sides", "vegetarian"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "salted-caramel-pretzel-shake",
    name: "Salted Caramel Pretzel Shake",
    description: "Thick hand-spun vanilla bean ice cream, artisanal sea salt caramel swirl, crushed butter pretzels, whipped cream",
    price: 260,
    category: "shakes",
    tags: ["thickshake", "dessert"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "dark-chocolate-peanut-butter",
    name: "Dark Chocolate Peanut Butter Shake",
    description: "Dutch cocoa blend, roasted creamy peanut butter, malted milk, chocolate fudge drizzle",
    price: 260,
    category: "shakes",
    tags: ["thickshake"],
    image: "/old-monk-mousse.png",
  },
];

export const locations: Location[] = [
  {
    id: "koramangala",
    name: "OBC Koramangala 5th Block",
    address: "135, 1st Cross, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
    city: "Bangalore",
    hours: "11:30 AM – 11:30 PM",
    phone: "096061 54669",
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "kalyan-nagar",
    name: "OBC Kalyan Nagar HRBR",
    address: "414, 7th Main Rd, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru 560043",
    city: "Bangalore",
    hours: "11:30 AM – 11:30 PM",
    phone: "090080 73254",
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "jp-nagar",
    name: "OBC JP Nagar 6th Phase",
    address: "24th Main Rd, 6th Phase, JP Nagar, Bengaluru, Karnataka 560078",
    city: "Bangalore",
    hours: "12:00 PM – 11:00 PM",
    phone: "079789 48799",
    image: "/matcha-special.png",
  },
  {
    id: "race-course",
    name: "OBC Race Course Road",
    address: "Race Course Rd, High Grounds, Sampangi Rama Nagar, Bengaluru 560001",
    city: "Bangalore",
    hours: "11:30 AM – 11:00 PM",
    phone: "096061 54669",
    image: "/old-monk-mousse.png",
  },
  {
    id: "whitefield",
    name: "OBC Miraya Rose Whitefield",
    address: "Miraya Rose, Siddapura, Whitefield Main Rd, Bengaluru 560066",
    city: "Bangalore",
    hours: "12:00 PM – 11:30 PM",
    phone: "090080 73254",
    image: "/hero-burger.png",
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "smash-craft",
    title: "The Art of the Cast Iron Sear",
    director: "OBC Visual Lab",
    year: "2025",
    category: "Kitchen Documentary",
    image: "/hero-burger.png",
  },
  {
    id: "bangalore-diner",
    title: "Bangalore's New Smashed Culture",
    director: "Bangalore Street Chronicles",
    year: "2024",
    category: "Culinary Series",
    image: "/truffle-fries.png",
  },
];
