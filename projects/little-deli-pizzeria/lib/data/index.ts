export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "burgers" | "sides" | "shakes" | "specials"; // mapped to: deli subs | pizzas | sides | desserts
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
    id: "hot-pastrami-reuben",
    name: "The Famous Hot Pastrami Reuben",
    description: "Half-pound hot cured pastrami, melted Swiss cheese, Bavarian sauerkraut, house Russian dressing on grilled New York marble rye.",
    price: 15.5,
    category: "burgers",
    tags: ["signature", "deli-classic"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "classic-italian-sub",
    name: "Classic Italian Submarine",
    description: "Prosciutto, Genoa salami, hot capicola, provolone, shredded lettuce, ripe tomato, thinly sliced red onion, house vinaigrette on fresh Italian bread.",
    price: 14.5,
    category: "burgers",
    tags: ["popular", "cold-sub"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "jersey-thin-crust-pie",
    name: "Jersey City Cheese Pizza (16\")",
    description: "Classic New Jersey thin crust, whole milk aged mozzarella, house sweet tomato pizza sauce, oregano, pecorino romano.",
    price: 21,
    category: "burgers",
    tags: ["jersey-style", "wood-fired"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "homemade-potato-salad",
    name: "Grandma's Red Bliss Potato Salad",
    description: "Tender red skin potatoes, crisp celery, green onions, and creamy Dijon herb mayonnaise.",
    price: 4.5,
    category: "sides",
    tags: ["deli-side", "scratch-made"],
    image: "/truffle-fries.png",
  },
  {
    id: "black-and-white-cookie",
    name: "NYC Black & White Cookie",
    description: "Soft cake-like shortbread cookie iced half dark Dutch chocolate fudge, half vanilla royal glaze.",
    price: 4.0,
    category: "shakes",
    tags: ["bakery", "nyc-classic"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "dr-browns-cream-soda",
    name: "Dr. Brown's Cel-Ray & Black Cherry",
    description: "Classic New York deli sodas in ice-cold cans.",
    price: 3.0,
    category: "shakes",
    tags: ["deli-soda"],
    image: "/old-monk-mousse.png",
  },
];

export const locations: Location[] = [
  {
    id: "crestview",
    name: "Little Deli Crestview (Original)",
    address: "7101-A Woodrow Ave",
    city: "Austin, TX 78757",
    hours: "Mon – Sat: 11:00 AM – 9:00 PM · Closed Sun",
    phone: "(512) 467-7402",
    image: "/images/locations/little-deli.jpg",
    featured: true,
  },
  {
    id: "windsor-park",
    name: "Little Deli Windsor Park",
    address: "1804 Briarcliff Blvd",
    city: "Austin, TX 78723",
    hours: "Mon – Sat: 11:00 AM – 9:00 PM",
    phone: "(512) 220-8346",
    image: "/images/locations/little-deli.jpg",
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "austin-monthly-best-deli",
    title: "Austin's #1 Neighborhood Deli",
    director: "Austin Monthly Best of ATX",
    year: "2024",
    category: "Neighborhood Legend",
    image: "/images/locations/little-deli.jpg",
  },
  {
    id: "chronicle-hall-of-fame",
    title: "Austin Chronicle Hall of Fame",
    director: "Austin Chronicle Readers Poll",
    year: "2025",
    category: "30-Year Institution",
    image: "/images/locations/little-deli.jpg",
  },
];
