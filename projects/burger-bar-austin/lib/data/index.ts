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
    id: "congress-double",
    name: "The Congress Double",
    description: "Two 100% fresh Texas Angus beef patties, sharp Wisconsin cheddar, butter leaf lettuce, thick-cut tomato, and Congress secret sauce on toasted brioche",
    price: 10.50,
    category: "burgers",
    tags: ["signature", "bestseller", "downtown-classic"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "big-als-chili-dog",
    name: "Big Al's Texas Chili Dog",
    description: "All-beef griddled frankfurter, slow-simmered Texas beef chili, melted shredded cheddar, and diced sweet white onions on a split top potato bun",
    price: 8.50,
    category: "burgers",
    tags: ["classic", "texas-chili"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "crispy-buffalo-chicken",
    name: "Crispy Buffalo Chicken Sandwich",
    description: "Hand-breaded buttermilk chicken breast tossed in cayenne hot sauce, blue cheese slaw, dill pickle chips, toasted brioche",
    price: 11.00,
    category: "burgers",
    tags: ["crispy", "spicy"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "shiner-onion-rings",
    name: "Shiner Bock Beer-Battered Onion Rings",
    description: "Thick-cut Texas sweet onions dipped in Shiner Bock beer batter, fried golden crisp, served with Texas comeback dip",
    price: 5.50,
    category: "sides",
    tags: ["crispy", "vegetarian"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "crinkle-parmesan-fries",
    name: "Parmesan Herb Crinkle Fries",
    description: "Golden crinkle fries tossed with fresh rosemary, sea salt, and grated parmesan",
    price: 4.75,
    category: "sides",
    tags: ["sides"],
    image: "/matcha-special.png",
  },
  {
    id: "texas-peach-shake",
    name: "Fredericksburg Peach Shake",
    description: "Real Texas Hill Country peach purée spun into handcrafted vanilla bean ice cream, cinnamon crumble topping",
    price: 6.50,
    category: "shakes",
    tags: ["signature", "local"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "mexican-vanilla-shake",
    name: "Mexican Vanilla Bean Shake",
    description: "Rich Mexican vanilla bean custard, malted milk, whipped cream, and shaved dark chocolate",
    price: 6.50,
    category: "shakes",
    tags: ["classic", "custard"],
    image: "/old-monk-mousse.png",
  },
];

export const locations: Location[] = [
  {
    id: "congress-window",
    name: "Burger Bar on Congress Walk-Up",
    address: "208 Congress Ave, Austin, TX 78701",
    city: "Austin",
    hours: "Open Daily 11:00 AM – 10:00 PM (Walk-Up Window)",
    phone: "(512) 476-4900",
    image: "/hero-burger.png",
    featured: true,
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "congress-street",
    title: "The Congress Ave Lunch Rush",
    director: "Austin Downtown Visuals",
    year: "2024",
    category: "Street Life",
    image: "/hero-burger.png",
  },
];
