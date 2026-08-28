export interface MenuItem {
  id: string;
  name: string;
  category: "burgers" | "shakes" | "sides";
  description: string;
  price: number;
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

export const menuItems: MenuItem[] = [
  {
    id: "all-american-cheese-burger",
    name: "All American Cheese Burger",
    category: "burgers",
    description: "Bangalore's most famous burger. Juicy seasoned patty, melted American cheddar, gherkins, crisp lettuce, and signature Truffles secret mustard mayo.",
    price: 320,
    tags: ["Legendary", "Top Seller", "Signature"],
    image: "/images/menu/all-american-burger.jpg",
    featured: true,
  },
  {
    id: "sloppy-joe-burger",
    name: "Sloppy Joe Lamb Burger",
    category: "burgers",
    description: "Spiced minced lamb slow-cooked with tomatoes, bell peppers, melted cheese sauce, and fried egg in a toasted sesame bun.",
    price: 360,
    tags: ["Hearty", "Diner Classic"],
    image: "/images/menu/sloppy-joe.jpg",
    featured: true,
  },
  {
    id: "chicken-peri-peri-burger",
    name: "Peri Peri Grilled Chicken Burger",
    category: "burgers",
    description: "Flame-grilled chicken breast marinated in fiery African peri-peri glaze, jalapeños, cheddar cheese, and smoked paprika cream.",
    price: 310,
    tags: ["Spicy", "Fan Favorite"],
    image: "/images/menu/peri-peri.jpg",
    featured: true,
  },
  {
    id: "crispy-paneer-steak-burger",
    name: "Crispy Paneer Steak Burger",
    category: "burgers",
    description: "Herb-crusted cottage cheese steak fried golden, house pickled onions, sriracha mayo, and molten mozzarella.",
    price: 280,
    tags: ["Vegetarian", "Crispy"],
    image: "/images/menu/paneer-burger.jpg",
    featured: false,
  },
  {
    id: "ferrero-rocher-thickshake",
    name: "Ferrero Rocher Super Thick Milkshake",
    category: "shakes",
    description: "Whole crushed Ferrero Rocher pralines blended with Belgian chocolate gelato, Nutella drizzle, and fresh whipped cream.",
    price: 260,
    tags: ["Cult Shake", "Dessert"],
    image: "/images/menu/ferrero-shake.jpg",
    featured: true,
  },
  {
    id: "devils-own-dark-chocolate",
    name: "Devil's Own Dark Chocolate Shake",
    category: "shakes",
    description: "Intense 70% dark cocoa gelato, chocolate fudge ripples, espresso shot, and chocolate shavings.",
    price: 250,
    tags: ["Rich", "Chocolate"],
    image: "/images/menu/devils-own.jpg",
    featured: false,
  },
  {
    id: "truffle-parmesan-fries",
    name: "Truffle Parmesan Loaded Fries",
    category: "sides",
    description: "Crisp golden potato batons tossed in white truffle oil, grated aged parmesan, and fresh chopped parsley.",
    price: 220,
    tags: ["Gourmet", "Loaded"],
    image: "/images/menu/truffle-fries.jpg",
    featured: true,
  },
  {
    id: "texas-bbq-chicken-wings",
    name: "Texas BBQ Glazed Wings",
    category: "sides",
    description: "Crispy fried wings smothered in house hickory smoked barbecue reduction with cooling ranch dip.",
    price: 290,
    tags: ["Wings", "Crispy"],
    image: "/images/menu/bbq-wings.jpg",
    featured: false,
  },
];

export const locations: Location[] = [
  {
    id: "koramangala-5th-block",
    name: "Truffles Koramangala (Flagship)",
    address: "Apex Building, 93/A, 4th B Cross Rd, 5th Block",
    city: "Bengaluru 560095",
    hours: "Mon – Sun: 11:30 AM – 11:00 PM",
    phone: "080 4153 6565",
    image: "/images/locations/truffles-koramangala.jpg",
    featured: true,
  },
  {
    id: "st-marks-road",
    name: "Truffles St. Mark's Road",
    address: "22, St Mark's Rd, Shanthala Nagar, Ashok Nagar",
    city: "Bengaluru 560001",
    hours: "Mon – Sun: 11:30 AM – 11:00 PM",
    phone: "080 4112 1160",
    image: "/images/locations/truffles-koramangala.jpg",
    featured: false,
  },
  {
    id: "indiranagar-100ft",
    name: "Truffles Indiranagar",
    address: "Ground Floor, 100 Feet Rd, HAL 2nd Stage",
    city: "Bengaluru 560038",
    hours: "Mon – Sun: 11:30 AM – 11:00 PM",
    phone: "080 4146 6565",
    image: "/images/locations/truffles-koramangala.jpg",
    featured: false,
  },
  {
    id: "new-bel-road",
    name: "Truffles New BEL Road",
    address: "RMV 2nd Stage, Ashwath Nagar, Devasandra Layout",
    city: "Bengaluru 560094",
    hours: "Mon – Sun: 11:30 AM – 11:00 PM",
    phone: "080 4173 6565",
    image: "/images/locations/truffles-koramangala.jpg",
    featured: false,
  },
];
