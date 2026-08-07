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
    id: "classic-smash",
    name: "Classic Smash",
    description: "Double patty, American cheese, dill pickles, house sauce, brioche bun",
    price: 249,
    category: "burgers",
    tags: ["signature"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "truffle-smash",
    name: "Truffle Smash",
    description: "Double patty, truffle aioli, gruyère, caramelized onions, arugula",
    price: 349,
    category: "burgers",
    tags: ["premium"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "spicy-smash",
    name: "Spicy Smash",
    description: "Double patty, pepper jack, jalapeños, chipotle mayo, lettuce, tomato",
    price: 279,
    category: "burgers",
    tags: ["spicy"],
    image: "/old-monk-mousse.png",
  },
  {
    id: "bbq-smash",
    name: "BBQ Smash",
    description: "Double patty, smoked gouda, crispy onions, BBQ sauce, coleslaw",
    price: 299,
    category: "burgers",
    tags: ["smoky"],
    image: "/hero-burger.png",
  },
  {
    id: "truffle-fries",
    name: "Truffle Fries",
    description: "Crispy fries, truffle oil, parmesan, fresh herbs, aioli",
    price: 199,
    category: "sides",
    tags: ["popular"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    description: "Crispy fries, cheese sauce, bacon bits, jalapeños, sour cream",
    price: 249,
    category: "sides",
    tags: ["loaded"],
    image: "/matcha-special.png",
  },
  {
    id: "classic-shake",
    name: "Classic Shake",
    description: "Hand-spun vanilla, chocolate, or strawberry shake",
    price: 179,
    category: "shakes",
    tags: ["classic"],
    image: "/old-monk-mousse.png",
  },
  {
    id: "special-shake",
    name: "Special Shake",
    description: "Seasonal special with house-made syrups and toppings",
    price: 229,
    category: "shakes",
    tags: ["seasonal"],
    image: "/matcha-special.png",
    featured: true,
  },
];

export const locations: Location[] = [
  {
    id: "indiranagar",
    name: "Indiranagar",
    address: "12th Main, 100 Feet Road",
    city: "Bangalore",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 80 4567 8900",
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "bellandur",
    name: "Bellandur",
    address: "Ecoworld, Outer Ring Road",
    city: "Bangalore",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 80 4567 8901",
    image: "/truffle-fries.png",
  },
  {
    id: "rmv",
    name: "RMV Extension",
    address: "80ft Road, 2nd Stage",
    city: "Bangalore",
    hours: "11:00 AM – 10:30 PM",
    phone: "+91 80 4567 8902",
    image: "/matcha-special.png",
  },
  {
    id: "whitefield",
    name: "Whitefield",
    address: "Miraya Rose, ITPL Main Road",
    city: "Bangalore",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 80 4567 8903",
    image: "/old-monk-mousse.png",
    featured: true,
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "hermes",
    title: "The Art of Movement",
    director: "Gregoris Pyrpylis",
    year: "2025",
    category: "Brand Film",
    image: "/hero-burger.png",
  },
  {
    id: "vogue",
    title: "Elegance in Every Frame",
    director: "Studio Nari",
    year: "2025",
    category: "Editorial",
    image: "/truffle-fries.png",
  },
  {
    id: "louisvuitton",
    title: "Craft & Precision",
    director: "Creative Studio",
    year: "2024",
    category: "Campaign",
    image: "/matcha-special.png",
  },
  {
    id: "prada",
    title: "Silhouette & Form",
    director: "In-House",
    year: "2024",
    category: "Lookbook",
    image: "/old-monk-mousse.png",
  },
];
