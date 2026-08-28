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
    id: "the-nadc-burger",
    name: "The NADC Burger",
    description: "Only one burger, made right. 100% Texas HeartBrand Akaushi Wagyu beef smashed on high-heat cast iron, American cheese, house secret sauce, and thick-cut pickles on a toasted Martin's Famous Potato Roll",
    price: 16.00,
    category: "burgers",
    tags: ["signature", "100%-wagyu", "bestseller"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "nadc-double-wagyu",
    name: "The NADC Double Wagyu",
    description: "Double 100% Texas HeartBrand Akaushi Wagyu patties, double American cheese, double pickles, and extra secret sauce on Martin's Potato Roll",
    price: 22.00,
    category: "burgers",
    tags: ["double-wagyu", "heavy"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "beef-tallow-fries",
    name: "Wagyu Beef Tallow Fries",
    description: "Idaho russet potatoes cut in-house, soaked, blanched, and thrice-fried in 100% pure Akaushi Wagyu beef tallow for ultimate crunch",
    price: 6.00,
    category: "sides",
    tags: ["beef-tallow", "crispy"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "loaded-tallow-beast-fries",
    name: "Loaded Beast Tallow Fries",
    description: "Thrice-cooked Wagyu beef tallow fries piled high with chopped Akaushi smash patty, melted American cheese, diced pickles, and secret NADC sauce",
    price: 10.00,
    category: "sides",
    tags: ["loaded", "indulgent"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "topo-chico-mineral-water",
    name: "Cold Topo Chico Glass Bottle",
    description: "Ice-cold sparkling Mexican mineral water served with fresh lime wedge",
    price: 4.00,
    category: "shakes",
    tags: ["sparkling", "beverage"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "mexican-coca-cola",
    name: "Mexican Coca-Cola (Cane Sugar)",
    description: "Chilled glass bottle Mexican Coke made with pure cane sugar",
    price: 4.00,
    category: "shakes",
    tags: ["beverage"],
    image: "/old-monk-mousse.png",
  },
];

export const locations: Location[] = [
  {
    id: "east-sixth-street",
    name: "NADC Burger East 6th Street",
    address: "1007 E 6th St, Austin, TX 78702 (Behind Idle Hands)",
    city: "Austin",
    hours: "Daily 4:00 PM – 2:00 AM (Late Night Wagyu Smash)",
    phone: "(512) 555-NADC",
    image: "/hero-burger.png",
    featured: true,
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "wagyu-skate",
    title: "Neen Williams & Philip Speer: The Wagyu Code",
    director: "Austin Underground Cinema",
    year: "2024",
    category: "Origins Film",
    image: "/hero-burger.png",
  },
];
