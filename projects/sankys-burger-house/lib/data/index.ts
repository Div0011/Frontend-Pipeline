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
    id: "the-monster-double-beast",
    name: "The Monster Double Beast Burger",
    category: "burgers",
    description: "Bangalore's cult late-night burger. Two massive quarter-pound seasoned beef/chicken patties, fried bullseye egg, double molten cheddar, caramelized onions, and secret Sanky spicy garage sauce.",
    price: 340,
    tags: ["Legendary", "Monster Size", "Top Seller"],
    image: "/images/menu/monster-beast.jpg",
    featured: true,
  },
  {
    id: "hennur-firecracker-chicken",
    name: "Hennur Firecracker Chicken Burger",
    category: "burgers",
    description: "Crisp fried chicken breast drenched in ghost pepper & bird's eye chili garage sauce, cooling pickled gherkins, and melted Monterey Jack.",
    price: 310,
    tags: ["Extra Spicy", "Cult Classic"],
    image: "/images/menu/firecracker.jpg",
    featured: true,
  },
  {
    id: "juicy-lucy-cheese-core",
    name: "Juicy Lucy Molten-Core Burger",
    category: "burgers",
    description: "Thick hand-pressed seasoned patty stuffed with molten mozzarella & sharp cheddar cheese that erupts on the first bite, topped with house BBQ reduction.",
    price: 350,
    tags: ["Cheese Core", "Juicy Lucy"],
    image: "/images/menu/juicy-lucy.jpg",
    featured: true,
  },
  {
    id: "bacon-cheese-overload",
    name: "Smoked Bacon & Cheese Overload",
    category: "burgers",
    description: "Crispy griddled smoked bacon strips piled high over a searing double patty with smoked garlic mayo and toasted sesame bun.",
    price: 360,
    tags: ["Bacon Loaded", "Hearty"],
    image: "/images/menu/bacon-burger.jpg",
    featured: false,
  },
  {
    id: "nutella-dark-brownie-shake",
    name: "Nutella Dark Brownie Garage Thickshake",
    category: "shakes",
    description: "Whole fudge brownies crushed into cold chocolate malt cream, blended with thick Nutella swirls and chocolate flakes.",
    price: 240,
    tags: ["Dessert", "Thickshake"],
    image: "/images/menu/nutella-shake.jpg",
    featured: true,
  },
  {
    id: "cold-coffee-overdrive",
    name: "Bangalore Cold Coffee Overdrive",
    category: "shakes",
    description: "Quad shot dark roast South Indian espresso whipped with condensed milk and vanilla bean ice cream.",
    price: 210,
    tags: ["Espresso", "Energizing"],
    image: "/images/menu/cold-coffee.jpg",
    featured: false,
  },
  {
    id: "gunpowder-crinkle-fries",
    name: "Gunpowder Spiced Crinkle Fries",
    category: "sides",
    description: "Crispy crinkle cut fries dusted in spicy South Indian podi masala, garlic crunch, and served with spicy mayo.",
    price: 190,
    tags: ["Gunpowder", "Crispy"],
    image: "/images/menu/gunpowder-fries.jpg",
    featured: true,
  },
  {
    id: "crispy-bbq-chicken-strips",
    name: "Crispy BBQ Glazed Chicken Strips",
    category: "sides",
    description: "Tender chicken tenderloin strips coated in spiced panko crumbs, fried golden and tossed in sweet smoky BBQ glaze.",
    price: 260,
    tags: ["Crispy", "BBQ"],
    image: "/images/menu/bbq-strips.jpg",
    featured: false,
  },
];

export const locations: Location[] = [
  {
    id: "hennur-garage-flagship",
    name: "Sanky's Burger House (The Garage)",
    address: "50, Hennur Main Rd, opp. Jyothi School, St Thomas Town",
    city: "Bengaluru, Karnataka 560084",
    hours: "Mon – Sun: 4:00 PM – 1:30 AM (Late Night)",
    phone: "098867 38143",
    image: "/images/locations/sankys-burger-house.jpg",
    featured: true,
  },
];
