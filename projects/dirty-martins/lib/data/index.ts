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
    id: "ot-special",
    name: "The OT Special",
    description: "Dirty Martin's legendary signature since 1926: Two seared Angus chuck patties, double sharp cheddar, and grilled onions pressed between thick golden buttered Texas toast.",
    price: 8.99,
    category: "burgers",
    tags: ["house legend", "since 1926", "texas toast"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "dh-special",
    name: "The DH Special",
    description: "Two 100% Angus chuck patties, double melted Swiss cheese, savory sautéed mushrooms, and caramelized onions on a grilled sesame bun.",
    price: 8.49,
    category: "burgers",
    tags: ["fan favorite", "mushroom swiss"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "k-bar-special",
    name: "The K-Bar Bacon Cheeseburger",
    description: "Hand-pressed Angus beef, thick-cut crispy bacon, double melted American cheese, crinkle-cut pickles, and mustard on a toasted bun.",
    price: 8.99,
    category: "burgers",
    tags: ["bacon lover", "austin classic"],
    image: "/hero-burger.png",
  },
  {
    id: "original-kum-bak",
    name: "Original Kum-Bak Burger",
    description: "The 1926 recipe: Fresh Angus beef seared hot on our 100-year seasoned flat-top, yellow mustard, sliced dill pickles, and chopped white onions.",
    price: 6.99,
    category: "burgers",
    tags: ["original 1926", "heritage"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "chili-cheeseburger",
    name: "Texas Chili Cheeseburger",
    description: "Angus burger smothered in Dirty Martin's homemade Texas red beef chili, melted cheddar, and diced white onions.",
    price: 8.99,
    category: "burgers",
    tags: ["house chili", "comfort food"],
    image: "/hero-burger.png",
  },
  {
    id: "dirty-tater-tots",
    name: "Dirty's Famous Tater Tots",
    description: "The most famous tots on The Drag. Extra crispy golden cylinders tossed hot in Dirty's signature paprika salt blend.",
    price: 4.29,
    category: "sides",
    tags: ["must order", "famous tots"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "hand-battered-rings",
    name: "Hand-Battered Onion Rings",
    description: "Fresh jumbo sweet Texas onions sliced daily, dipped in our thick scratch-made buttermilk batter, and fried crisp to order.",
    price: 4.99,
    category: "sides",
    tags: ["scratch batter", "crispy"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "homemade-chili-bowl",
    name: "Dirty's Texas Chili Bowl",
    description: "Slow-simmered all-beef chili without beans, topped with sharp shredded cheddar cheese and diced fresh onions.",
    price: 5.49,
    category: "sides",
    tags: ["texas tradition"],
    image: "/old-monk-mousse.png",
  },
  {
    id: "burnt-orange-shake",
    name: "Longhorn Burnt Orange Shake",
    description: "Thick hand-dipped vanilla ice cream spun with Texas orange citrus syrup and crushed vanilla wafers.",
    price: 5.49,
    category: "shakes",
    tags: ["ut longhorn", "specialty"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "chocolate-malt",
    name: "Classic Chocolate Malt",
    description: "Hand-dipped ice cream spun in vintage stainless steel mixer cups with pure malted barley powder and rich chocolate fudge.",
    price: 4.99,
    category: "shakes",
    tags: ["soda fountain"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "strawberry-shake",
    name: "Fresh Strawberry Shake",
    description: "Hand-spun vanilla ice cream blended with sweet Texas strawberries, whipped cream, and a red maraschino cherry.",
    price: 4.99,
    category: "shakes",
    tags: ["real berries"],
    image: "/matcha-special.png",
  },
  {
    id: "draft-shiner-bock",
    name: "Ice Cold Shiner Bock on Tap",
    description: "Texas favorite dark lager poured ice-cold in a frosted glass mug. The perfect pairing for an OT Special.",
    price: 5.00,
    category: "specials",
    tags: ["texas beer", "draft"],
    image: "/matcha-special.png",
    featured: true,
  },
];

export const locations: Location[] = [
  {
    id: "guadalupe-drag",
    name: "Historic 2808 Guadalupe (The Drag)",
    address: "2808 Guadalupe St",
    city: "Austin, TX 78705",
    hours: "Sun–Thu: 11:00 AM – 10:00 PM | Fri–Sat: 11:00 AM – 11:00 PM",
    phone: "(512) 477-3173",
    image: "/images/locations/dirty-martins.jpg",
    featured: true,
  },
];

export const historyMilestones: HistoryMilestone[] = [
  {
    year: "1926",
    chapter: "CHAPTER 01",
    title: "Martin 'Dirty' Kermich Opens",
    subtitle: "Dirt floors and 8 counter stools on Guadalupe",
    description: "In 1926, Martin Kermich established Martin's Kum-Bak on dirt floors. Customers dubbed him 'Dirty Martin' because he was always covered in flour and grease while hand-forming burgers.",
    image: "/images/locations/dirty-martins.jpg",
  },
  {
    year: "1957",
    chapter: "CHAPTER 02",
    title: "The OT Special is Born",
    subtitle: "Double meat on Texas toast becomes an Austin staple",
    description: "Students from UT Austin demanded a bigger burger. The 'OT Special' was created on thick buttered Texas toast and quickly became the university's favorite victory meal.",
    image: "/hero-burger.png",
  },
  {
    year: "1989",
    chapter: "CHAPTER 03",
    title: "Mark Nemir's Stewardship",
    subtitle: "Protecting the 100-year recipe for future generations",
    description: "Mark Nemir took ownership with a single promise: never change the seasoned flat-top griddle, never alter the burger recipe, and always welcome every guest like family.",
    image: "/truffle-fries.png",
  },
  {
    year: "2026",
    chapter: "CHAPTER 04",
    title: "The 100-Year Centennial",
    subtitle: "Austin's oldest continuous hamburger institution",
    description: "Approaching 100 continuous years of serving Austin, Dirty Martin's remains the proud living heart of collegiate dining and authentic Texas burger history.",
    image: "/images/locations/dirty-martins.jpg",
  },
];
