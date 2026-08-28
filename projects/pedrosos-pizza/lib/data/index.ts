export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "burgers" | "sides" | "shakes" | "specials"; // mapped to: pies | slices | sides | desserts
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
    id: "grandma-pedroso",
    name: "The Grandma Pedroso",
    description: "Crispy square pan crust, fresh whole-milk mozzarella, Pedroso family marinara, sweet basil, fresh garlic, and extra virgin olive oil.",
    price: 26,
    category: "burgers",
    tags: ["signature", "grandma-style"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "brooklyn-ny-cheese",
    name: "Classic Brooklyn NY Pie",
    description: "72-hour cold fermented dough, hand-stretched thin crust, aged mozzarella, San Marzano tomato sauce, pecorino romano.",
    price: 22,
    category: "burgers",
    tags: ["classic", "ny-style"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "sicilian-pepperoni-cup",
    name: "Sicilian Spicy Pepperoni",
    description: "Thick focaccia-style airy crust with crisp caramelized cheesy edges, double cupping pepperoni, hot honey drizzle, fresh oregano.",
    price: 28,
    category: "burgers",
    tags: ["spicy", "sicilian"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "garlic-knots",
    name: "Hand-Tied Garlic Knots (6pc)",
    description: "Baked fresh daily, tossed in extra virgin olive oil, minced fresh garlic, Italian parsley, parmesan, served with hot marinara.",
    price: 8,
    category: "sides",
    tags: ["popular", "scratch-made"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "burrata-caprese-salad",
    name: "Heirloom Tomato & Burrata",
    description: "Creamy local burrata ball, marinated Texas heirloom tomatoes, basil pesto, balsamic reduction, house flatbread crisps.",
    price: 13,
    category: "sides",
    tags: ["fresh", "vegetarian"],
    image: "/matcha-special.png",
  },
  {
    id: "sicilian-cannoli",
    name: "House-Filled Sicilian Cannoli (2pc)",
    description: "Crisp fried pastry shells filled to order with sweet imported ricotta cream, Valrhona dark chocolate chips, and crushed Sicilian pistachios.",
    price: 9,
    category: "shakes",
    tags: ["dessert", "scratch-made"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "san-pellegrino-aranciata",
    name: "San Pellegrino Aranciata & Soda",
    description: "Sparkling blood orange and lemon Italian sodas, ice cold glass bottles.",
    price: 4,
    category: "shakes",
    tags: ["beverage"],
    image: "/matcha-special.png",
  },
];

export const locations: Location[] = [
  {
    id: "justin-lane",
    name: "Pedroso's Justin Lane Flagship",
    address: "2207 Justin Ln Suite D",
    city: "Austin, TX 78757",
    hours: "Tue – Sun: 12:00 PM – 9:00 PM · Closed Mon",
    phone: "(737) 600-1107",
    image: "/images/locations/pedrosos-pizza.jpg",
    featured: true,
  },
  {
    id: "airport-blvd",
    name: "Pedroso's Slice Shop & Patio",
    address: "3850 Airport Blvd",
    city: "Austin, TX 78722",
    hours: "Wed – Sun: 12:00 PM – 10:00 PM",
    phone: "(512) 676-7368",
    image: "/images/locations/pedrosos-pizza.jpg",
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "austin-chronicle-top-slice",
    title: "Austin's Best NY Pizza Slice",
    director: "Austin Chronicle Food & Wine",
    year: "2024",
    category: "Best Pizza in Texas",
    image: "/images/locations/pedrosos-pizza.jpg",
  },
  {
    id: "eater-austin-38",
    title: "Essential Austin Pizzerias",
    director: "Eater Austin Essential 38",
    year: "2025",
    category: "Culinary Heritage",
    image: "/images/locations/pedrosos-pizza.jpg",
  },
];
