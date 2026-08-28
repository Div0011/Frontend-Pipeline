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
    id: "traiteur-portobello-burger",
    name: "Traiteur Portobello Truffle Burger",
    category: "burgers",
    description: "Whole roasted Portobello mushroom cap stuffed with smoked scamorza cheese, caramelized shallots, black winter truffle glaze, and French golden brioche.",
    price: 645,
    tags: ["Haute Cuisine", "Truffle", "Chef Choice"],
    image: "/images/menu/portobello-burger.jpg",
    featured: true,
  },
  {
    id: "parisien-rosemary-lamb-burger",
    name: "Parisien Rosemary Lamb Burger",
    category: "burgers",
    description: "Slow-braised New Zealand lamb patty infused with fresh rosemary and roasted garlic, melted French brie, Dijon mustard emulsion, and baby arugula.",
    price: 695,
    tags: ["Signature", "Gourmet Lamb"],
    image: "/images/menu/parisien-lamb.jpg",
    featured: true,
  },
  {
    id: "lucien-artisan-cheeseburger",
    name: "Lucien Artisan Prime Burger",
    category: "burgers",
    description: "Custom-aged double prime beef patty, aged Gouda melt, house smoked bacon jam, and tarragon aioli on toasted French brioche.",
    price: 625,
    tags: ["Prime Beef", "Gourmet"],
    image: "/images/menu/lucien-burger.jpg",
    featured: true,
  },
  {
    id: "firebird-crispy-harissa-chicken",
    name: "Firebird Crispy Harissa Chicken",
    category: "burgers",
    description: "Buttermilk fried chicken breast basted in North African spiced harissa oil, cucumber pickle ribbons, and creamy herbed labneh.",
    price: 545,
    tags: ["Crispy", "Artisanal Spice"],
    image: "/images/menu/firebird.jpg",
    featured: false,
  },
  {
    id: "rose-pistachio-mocktail",
    name: "Rose & Cardamom Parisian Mocktail",
    category: "shakes",
    description: "Distilled organic Damask rose essence, crushed green pistachios, sparkling botanical soda, and crushed Turkish delight foam.",
    price: 345,
    tags: ["Botanical", "Artisan Drink"],
    image: "/images/menu/rose-mocktail.jpg",
    featured: true,
  },
  {
    id: "valrhona-molten-dark-shake",
    name: "Valrhona Belgian Dark Chocolate Shake",
    category: "shakes",
    description: "72% Grand Cru Valrhona dark chocolate emulsion, whipped Madagascar vanilla bean chantilly, and sea salt cacao nibs.",
    price: 395,
    tags: ["Valrhona", "Decadent"],
    image: "/images/menu/valrhona-shake.jpg",
    featured: false,
  },
  {
    id: "truffle-parmesan-gold-fries",
    name: "Truffle & 24-Month Parmigiano Fries",
    category: "sides",
    description: "Triple-cooked Belgian Russet potato frites tossed with black truffle carpaccio, 24-month Parmigiano-Reggiano, and garlic chive aioli.",
    price: 395,
    tags: ["Black Truffle", "Parmigiano"],
    image: "/images/menu/truffle-fries.jpg",
    featured: true,
  },
  {
    id: "dynamite-tiger-prawns",
    name: "Crisp Dynamite Tiger Prawns",
    category: "sides",
    description: "Jumbo wild tiger prawns fried in delicate panko crust, coated in yuzu-togarashi spiced dynamite dressing.",
    price: 545,
    tags: ["Seafood", "Crispy"],
    image: "/images/menu/dynamite-prawns.jpg",
    featured: false,
  },
];

export const locations: Location[] = [
  {
    id: "indiranagar-flagship",
    name: "Burger Seigneur Indiranagar (Boutique Salon)",
    address: "470, 80 Feet Rd, opp. BSNL Office, HAL 3rd Stage",
    city: "Indiranagar, Bengaluru 560075",
    hours: "Mon – Sun: 12:00 PM – 11:30 PM",
    phone: "080 4965 2555",
    image: "/images/locations/burger-seigneur-indiranagar.jpg",
    featured: true,
  },
];
