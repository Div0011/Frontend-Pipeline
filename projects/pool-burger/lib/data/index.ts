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
    id: "deep-end-double",
    name: "The Deep End Double",
    description: "Double grass-fed Texas beef patties, thick-cut bacon, charred fresh pineapple slice, Swiss cheese, jalapeño ranch, and toasted brioche",
    price: 11.50,
    category: "burgers",
    tags: ["signature", "bestseller", "tiki"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "grateful-dead",
    name: "The Grateful Dead",
    description: "Double smashed patties, fresh Haas avocado, alfalfa sprouts, Monterey Jack cheese, and green chile lime mayo",
    price: 10.75,
    category: "burgers",
    tags: ["austin-favorite", "avocado"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "classic-pool-burger",
    name: "The Classic Pool Burger",
    description: "Two seared smashed beef patties, melted American cheese, butter lettuce, tomato, pickles, and secret Polynesian burger sauce",
    price: 9.50,
    category: "burgers",
    tags: ["classic", "smash"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "polynesian-pulled-pork",
    name: "Polynesian Pulled Pork Sandwich",
    description: "12-hour slow-smoked pork shoulder, house tiki BBQ glaze, pickled red onions, and crunchy cilantro slaw on brioche",
    price: 11.00,
    category: "burgers",
    tags: ["smoked", "pork"],
    image: "/old-monk-mousse.png",
  },
  {
    id: "crinkle-cut-tiki-fries",
    name: "Crinkle-Cut Tiki Fries",
    description: "Crispy golden crinkle fries fried in peanut oil, dusted with house Polynesian salt spice blend, served with garlic jalapeño dip",
    price: 4.50,
    category: "sides",
    tags: ["vegetarian", "crispy"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "classic-mai-tai",
    name: "1944 Classic Mai Tai",
    description: "Appleton Estate Jamaican rum, Pierre Ferrand dry Curaçao, fresh lime juice, and house-made almond orgeat syrup with mint sprig",
    price: 13.00,
    category: "shakes",
    tags: ["cocktail", "tiki-classic"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "frozen-hurricane-slush",
    name: "Frozen Hurricane Slush",
    description: "Dark & light rums, passion fruit purée, fresh orange & lime juices, grenadine, served in a souvenir tiki glass",
    price: 14.00,
    category: "shakes",
    tags: ["frozen", "cocktail"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
];

export const locations: Location[] = [
  {
    id: "deep-eddy-airstream",
    name: "Pool Burger Deep Eddy Airstream",
    address: "2315 Lake Austin Blvd, Austin, TX 78703",
    city: "Austin",
    hours: "Sun–Thu 11am–10pm · Fri–Sat 11am–11pm",
    phone: "(512) 334-9747",
    image: "/hero-burger.png",
    featured: true,
  },
];

export const filmCredits: FilmCredit[] = [
  {
    id: "tiki-tales",
    title: "Summer Days at Deep Eddy Pool",
    director: "Austin Sun Media",
    year: "2024",
    category: "Atmospheric Short",
    image: "/hero-burger.png",
  },
];
