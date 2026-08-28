export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "burgers" | "sides" | "shakes" | "specials" | "breakfast";
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
    id: "dans-special-burger",
    name: "Dan's Special Cheeseburger",
    description: "6 oz fresh Certified Angus chuck, melted American cheese, crisp lettuce, ripe tomato, pickles, diced onions, and Dan's famous house sauce on a butter-toasted sesame bun.",
    price: 8.99,
    category: "burgers",
    tags: ["signature", "local favorite"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "large-bacon-cheeseburger",
    name: "Bacon Cheeseburger (Large 6oz)",
    description: "Thick hand-pressed Angus beef patty, hickory smoked thick-cut bacon, double American cheese, pickles, lettuce, tomato, and mayo.",
    price: 8.99,
    category: "burgers",
    tags: ["popular", "classic"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "jalapeno-cheeseburger",
    name: "Texas Jalapeño Cheeseburger",
    description: "Juicy griddled Angus beef, spicy grilled fresh jalapeños, melted pepper jack and American cheese, mustard, pickles, and grilled sweet onions.",
    price: 8.49,
    category: "burgers",
    tags: ["spicy", "austin style"],
    image: "/old-monk-mousse.png",
  },
  {
    id: "double-meat-burger",
    name: "Double Meat Double Cheese",
    description: "Two 4 oz Angus chuck patties seared hot on cast iron, double melted cheddar, crinkle-cut pickles, diced white onions, and yellow mustard.",
    price: 9.49,
    category: "burgers",
    tags: ["hearty", "double stack"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "small-cheeseburger",
    name: "Small 2oz Old-Fashioned Burger",
    description: "The original 1973 recipe: 2 oz Angus chuck patty, American cheese, mustard, pickles, and onion on a soft toasted bun.",
    price: 4.49,
    category: "burgers",
    tags: ["heritage", "original 1973"],
    image: "/hero-burger.png",
  },
  {
    id: "cfs-sandwich",
    name: "Chicken Fried Steak Sandwich",
    description: "Hand-tenderized Texas beef cutlet breaded to order, fried golden crisp, topped with lettuce, tomato, and mayo on Texas toast.",
    price: 8.99,
    category: "burgers",
    tags: ["texas tradition", "hand-breaded"],
    image: "/truffle-fries.png",
  },
  {
    id: "famous-onion-rings",
    name: "Famous Hand-Breaded Onion Rings",
    description: "The legendary $50 recipe purchased by Dan Junk in 1973. Fresh jumbo sweet onions sliced daily, dipped in seasoned buttermilk batter, and fried to golden perfection.",
    price: 5.29,
    category: "sides",
    tags: ["legendary", "$50 recipe", "must try"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "seasoned-curly-fries",
    name: "Seasoned Curly Fries",
    description: "Crispy spiral potatoes tossed in Dan's signature paprika & garlic seasoning blend.",
    price: 5.29,
    category: "sides",
    tags: ["crispy", "fan favorite"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "golden-french-fries",
    name: "Homestyle French Fries",
    description: "Classic golden cut Idaho potatoes, cooked fresh and salted hot from the kettle.",
    price: 2.99,
    category: "sides",
    tags: ["classic"],
    image: "/truffle-fries.png",
  },
  {
    id: "texas-chili-bowl",
    name: "Texas Red Chili Bowl",
    description: "Hearty slow-simmered all-beef chili without beans, topped with sharp cheddar and diced fresh onions.",
    price: 4.99,
    category: "sides",
    tags: ["comfort food"],
    image: "/old-monk-mousse.png",
  },
  {
    id: "hand-dipped-chocolate-malt",
    name: "Hand-Dipped Chocolate Malt",
    description: "Premium Texas Blue Bell style ice cream spun with pure malt powder and rich dark chocolate syrup.",
    price: 4.99,
    category: "shakes",
    tags: ["classic malt", "hand dipped"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "fresh-strawberry-shake",
    name: "Fresh Strawberry Shake",
    description: "Hand-spun vanilla ice cream folded with real crushed sweet strawberries and topped with whipped cream.",
    price: 4.49,
    category: "shakes",
    tags: ["real fruit", "hand spun"],
    image: "/matcha-special.png",
  },
  {
    id: "texas-pecan-shake",
    name: "Texas Buttered Pecan Shake",
    description: "Rich vanilla custard base churned with roasted Hill Country pecans and salted caramel ribbon.",
    price: 5.29,
    category: "shakes",
    tags: ["texas special"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "biscuits-and-gravy",
    name: "Homemade Biscuits & Country Sausage Gravy",
    description: "Two scratch-made buttermilk biscuits split open and smothered in creamy black pepper country sausage gravy.",
    price: 4.99,
    category: "specials",
    tags: ["breakfast legend", "homemade"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "austin-breakfast-taco",
    name: "Austin Sunrise Breakfast Tacos",
    description: "Two warm flour tortillas stuffed with farm-fresh scrambled eggs, crispy bacon or country sausage, and melted cheddar.",
    price: 2.99,
    category: "specials",
    tags: ["morning fuel", "austin classic"],
    image: "/matcha-special.png",
  },
];

export const locations: Location[] = [
  {
    id: "manchaca",
    name: "South Austin / Manchaca",
    address: "5602 Manchaca Rd",
    city: "Austin, TX 78745",
    hours: "Mon–Sat: 6:00 AM – 9:00 PM | Sun: 7:00 AM – 8:00 PM",
    phone: "(512) 443-6131",
    image: "/images/locations/manchaca.jpg",
    featured: true,
  },
  {
    id: "north-lamar",
    name: "North Lamar Blvd",
    address: "5601 N Lamar Blvd",
    city: "Austin, TX 78751",
    hours: "Mon–Sat: 6:00 AM – 9:00 PM | Sun: 7:00 AM – 8:00 PM",
    phone: "(512) 459-3239",
    image: "/images/locations/north-lamar.jpg",
    featured: true,
  },
  {
    id: "airport-blvd",
    name: "Airport Blvd",
    address: "6105 Airport Blvd",
    city: "Austin, TX 78752",
    hours: "Mon–Sat: 6:00 AM – 9:00 PM | Sun: 7:00 AM – 8:00 PM",
    phone: "(512) 451-6000",
    image: "/images/locations/airport-blvd.jpg",
  },
  {
    id: "buda-tx",
    name: "Buda Historic",
    address: "101 Old San Antonio Rd",
    city: "Buda, TX 78610",
    hours: "Mon–Sat: 6:00 AM – 9:00 PM | Sun: 7:00 AM – 8:00 PM",
    phone: "(512) 295-8888",
    image: "/images/locations/buda.jpg",
  },
];

export const historyMilestones: HistoryMilestone[] = [
  {
    year: "1973",
    chapter: "CHAPTER 01",
    title: "South Congress Roots",
    subtitle: "Dan & Frances Junk open the original diner",
    description: "In January 1973, Dan Junk and his wife Frances transformed a former South Congress root beer stand into the first Dan's Hamburgers. Choosing 'Dan's' saved $50 on neon sign lettering — capital quickly reinvested into quality beef.",
    image: "/hero-burger.png",
  },
  {
    year: "1973",
    chapter: "CHAPTER 02",
    title: "The $50 Recipe",
    subtitle: "A legendary investment in onion rings",
    description: "Shortly after opening, Dan paid $50 for a secret buttermilk hand-breaded onion ring recipe. Over 50 years later, that $50 recipe remains one of Austin's most famous culinary traditions.",
    image: "/truffle-fries.png",
  },
  {
    year: "1990",
    chapter: "CHAPTER 03",
    title: "Expansion & Tradition",
    subtitle: "South Austin, North Lamar & Airport Blvd",
    description: "As Austin grew from a sleepy college town into a bustling capital, Dan's remained an unshakeable anchor of made-to-order certified Angus beef burgers and scratch-made breakfast biscuits.",
    image: "/matcha-special.png",
  },
  {
    year: "2026",
    chapter: "CHAPTER 04",
    title: "Second-Generation Legacy",
    subtitle: "Katie Congdon leads Dan's into a new era",
    description: "Today, Katie Congdon — daughter of Dan and Frances — upholds the exact recipes, high standards, and community warmth that have defined Dan's Hamburgers for over half a century.",
    image: "/old-monk-mousse.png",
  },
];
