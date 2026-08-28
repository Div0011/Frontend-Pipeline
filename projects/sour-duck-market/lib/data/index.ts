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
    id: "sourdough-wagyu-smash",
    name: "Sour Duck Wagyu Smash Burger",
    description: "Double 44 Farms Texas Wagyu smash patties, house-fermented 36-hr sourdough potato bun, smoked Texas cheddar, sweet pickle relish, and special smoked tomato remoulade",
    price: 13.50,
    category: "burgers",
    tags: ["signature", "farm-to-table", "bestseller"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "post-oak-smoked-ribs",
    name: "Post Oak Smoked Heritage Pork Ribs",
    description: "Slow-smoked over seasoned Texas post oak, sweet sorghum mustard glaze, pickled mustard seeds, and fresh herb salad",
    price: 18.00,
    category: "burgers",
    tags: ["smokehouse", "popular"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "wood-grilled-chicken-sando",
    name: "Wood-Grilled Herb Chicken Sandwich",
    description: "Marinated free-range chicken breast grilled over live oak embers, charred scallion mayo, arugula, and pickled shallots on sourdough focaccia",
    price: 13.00,
    category: "burgers",
    tags: ["wood-fired", "fresh"],
    image: "/old-monk-mousse.png",
  },
  {
    id: "soft-sourdough-pretzel",
    name: "House-Milled Sourdough Pretzel",
    description: "Baked fresh daily from Texas heritage grains, Maldon flake salt, accompanied by warm pimento beer cheese dip & grain mustard",
    price: 6.50,
    category: "sides",
    tags: ["bakery", "vegetarian"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "charred-cabbage-caesar",
    name: "Charred Savoy Cabbage Caesar",
    description: "Cast-iron charred green cabbage, sourdough breadcrumb crunch, 24-month aged parmesan, and creamy white anchovy dressing",
    price: 11.00,
    category: "sides",
    tags: ["farm-fresh"],
    image: "/matcha-special.png",
  },
  {
    id: "draft-texas-paloma",
    name: "Draft Texas Rio Red Paloma",
    description: "Tequila blanco, fresh-pressed Rio Grande Valley pink grapefruit juice, lime, Topo Chico fizz, and smoked chile salt rim",
    price: 12.00,
    category: "shakes",
    tags: ["craft-cocktail", "seasonal"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "seasonal-hand-pie",
    name: "Texas Seasonal Hand Pie",
    description: "All-butter laminated sourdough pastry stuffed with Fredericksburg peaches and Texas pecans, warm vanilla glaze",
    price: 5.50,
    category: "shakes",
    tags: ["bakery", "dessert"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
];

export const locations: Location[] = [
  {
    id: "east-austin",
    name: "Sour Duck Market East Austin",
    address: "1814 E Martin Luther King Jr Blvd, Austin, TX 78702",
    city: "Austin",
    hours: "Wed–Sun 9am–9pm (Live Oak Courtyard Dining)",
    phone: "(512) 394-5776",
    image: "/hero-burger.png",
    featured: true,
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "fermentation-craft",
    title: "Heritage Grains & Live Fire",
    director: "East Austin Culinary Collective",
    year: "2025",
    category: "Craft Documentary",
    image: "/hero-burger.png",
  },
];
