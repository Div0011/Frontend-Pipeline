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

export interface HistoryMilestone {
  year: string;
  chapter: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "amarillo-burger",
    name: "The Amarillo Burger",
    description: "3/4 lb fresh Certified Angus beef patty chargrilled over live flame, roasted serrano chiles, melted jalapeño jack cheese, and house cilantro mayonnaise on a toasted bun.",
    price: 13.50,
    category: "burgers",
    tags: ["house legend ⭐", "triple-d featured", "spicy 🌶️"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "buffalo-burger",
    name: "The Buffalo Burger",
    description: "3/4 lb Angus patty grilled over open fire, melted blue cheese crumbles, spicy cayenne buffalo sauce, crisp leaf lettuce, and sliced tomato.",
    price: 13.50,
    category: "burgers",
    tags: ["blue cheese", "spicy buffalo"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "pittsburger",
    name: "The Pittsburger",
    description: "3/4 lb monster burger smothered in melted provolone cheese, sautéed garlic mushrooms, and Casino's rich homemade brown gravy.",
    price: 13.50,
    category: "burgers",
    tags: ["mushroom gravy", "fan favorite"],
    image: "/hero-burger.png",
  },
  {
    id: "los-angeles-burger",
    name: "The Los Angeles Burger",
    description: "3/4 lb chargrilled Angus beef patty, fresh sliced avocado, melted Swiss cheese, crispy thick bacon, and creamy Thousand Island dressing.",
    price: 13.00,
    category: "burgers",
    tags: ["avocado bacon"],
    image: "/hero-burger.png",
  },
  {
    id: "el-camino-classic",
    name: "The El Camino Classic",
    description: "3/4 lb monster Angus burger with melted American cheese, crisp lettuce, fresh tomato, red onions, sliced pickles, and mayo.",
    price: 12.00,
    category: "burgers",
    tags: ["3/4 lb classic", "chargrilled"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "verde-chili-fries",
    name: "Pork Verde Chili Cheese Fries",
    description: "Massive basket of crispy golden fries smothered in scratch-simmered pork chile verde, melted pepper jack, and sliced roasted serranos.",
    price: 8.50,
    category: "sides",
    tags: ["triple-d famous ⭐", "pork verde 🌶️"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "chili-cheese-tots",
    name: "Loaded Texas Chili Cheese Tots",
    description: "Crispy tater tots smothered in slow-cooked all-beef Texas chili, melted sharp cheddar cheese, and pickled jalapeño coins.",
    price: 7.99,
    category: "sides",
    tags: ["texas chili", "loaded tots"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "beer-battered-rings",
    name: "Shiner Beer-Battered Onion Rings",
    description: "Jumbo Texas sweet onions dipped in Shiner Bock beer batter, fried crisp, served with chipotle ranch.",
    price: 6.50,
    category: "sides",
    tags: ["shiner batter"],
    image: "/truffle-fries.png",
  },
  {
    id: "loaded-bloody-mary",
    name: "World-Famous Loaded Bloody Mary",
    description: "Austin's most legendary Bloody Mary — spicy house mix loaded with a mini burger slider skewer, crispy bacon strip, pickled okra, cocktail olives, and celery.",
    price: 12.00,
    category: "shakes",
    tags: ["world famous ⭐", "house cocktail"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "boilermaker-combo",
    name: "Lone Star Tallboy & Well Shot",
    description: "The classic 6th Street rock-and-roll dive bar pairing: ice-cold 16oz Lone Star can with a shot of Texas bourbon or tequila.",
    price: 7.00,
    category: "shakes",
    tags: ["6th street staple", "beer & shot"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "local-draft-pints",
    name: "Austin Craft Drafts & Pints",
    description: "Live Oak Hefeweizen, (512) Pecan Porter, and Austin Eastciders on tap in cold 20oz pint glasses.",
    price: 6.00,
    category: "specials",
    tags: ["austin drafts", "local taps"],
    image: "/old-monk-mousse.png",
  },
];

export const locations: Location[] = [
  {
    id: "6th-street",
    name: "Historic 6th Street",
    address: "517 E 6th St",
    city: "Austin, TX 78701",
    hours: "Mon–Sun: 11:30 AM – 2:00 AM (Grill open late)",
    phone: "(512) 469-9330",
    image: "/images/locations/casino-el-camino.jpg",
    featured: true,
  },
];

export const historyMilestones: HistoryMilestone[] = [
  {
    year: "1994",
    chapter: "CHAPTER 01",
    title: "Paul Eighmey Opens on 6th St",
    subtitle: "A dark sanctuary for music, movies & monster burgers",
    description: "In 1994, Paul Eighmey opened Casino El Camino on East 6th Street as a moody dive bar complete with vintage jukebox, horror movie memorabilia, and thick, honest chargrilled burgers.",
    image: "/images/locations/casino-el-camino.jpg",
  },
  {
    year: "2008",
    chapter: "CHAPTER 02",
    title: "Diners, Drive-Ins & Dives Spotlight",
    subtitle: "Guy Fieri discovers the 3/4 lb Amarillo Burger",
    description: "The nation fell in love with Casino's flame-grilled 3/4 lb burgers, roasted serrano chiles, and pork verde fries when Guy Fieri featured it on Food Network.",
    image: "/hero-burger.png",
  },
  {
    year: "2015",
    chapter: "CHAPTER 03",
    title: "Best Bloody Mary in Austin",
    subtitle: "The towering meal-in-a-glass cocktail",
    description: "Casino's legendary loaded Bloody Mary — garnished with a burger slider, bacon, pickled okra, and cheeses — became a worldwide Sunday hangover cure.",
    image: "/matcha-special.png",
  },
  {
    year: "2026",
    chapter: "CHAPTER 04",
    title: "Over 30 Years of Rock & Roll",
    subtitle: "Still loud, still dark, still flame-grilling monster burgers",
    description: "While downtown Austin changes around it, Casino El Camino remains unapologetically loud, serving the best 3/4 lb burgers on 6th Street until 2 AM every night.",
    image: "/truffle-fries.png",
  },
];
