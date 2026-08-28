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
    id: "oy-vey-goy",
    name: "The Oy Vey Goy",
    description: "1/3 lb fresh Angus chuck smashed with diced grilled onions on hot cast iron, hickory bacon, a crispy potato latke patty, melted cheddar & pepper jack, and house Homeboy sauce on a steamed Martin's potato bun.",
    price: 10.50,
    category: "burgers",
    tags: ["house legend", "latke burger", "must try ⭐"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "schmoozer",
    name: "The Schmoozer",
    description: "Smashed Angus patty with grilled onions, roasted Hatch green chiles, melted pepper jack cheese, yellow mustard, and pickles on a steamed potato bun.",
    price: 9.75,
    category: "burgers",
    tags: ["hatch chile 🌶️", "border style"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "goy-vey",
    name: "The Goy Vey",
    description: "Smashed Angus beef with caramelized grilled onions, crispy smoked bacon, double melted sharp cheddar, and Homeboy sauce on a steamed Martin's bun.",
    price: 9.50,
    category: "burgers",
    tags: ["bacon cheddar", "fan favorite"],
    image: "/hero-burger.png",
  },
  {
    id: "yenta-burger",
    name: "The Yenta Burger",
    description: "Smashed beef patty with grilled onions, melted Swiss cheese, sautéed garlic mushrooms, and savory herb spread.",
    price: 8.99,
    category: "burgers",
    tags: ["mushroom swiss"],
    image: "/hero-burger.png",
  },
  {
    id: "down-home-double",
    name: "The Down Home Double",
    description: "Two 1/3 lb Angus patties smashed hot with grilled onions, double American cheese, crinkle-cut pickles, mustard, and shredded lettuce.",
    price: 11.50,
    category: "burgers",
    tags: ["double stack", "hearty"],
    image: "/hero-burger.png",
    featured: true,
  },
  {
    id: "potato-latkes-queso",
    name: "Crispy Potato Latkes & Queso",
    description: "Two golden scratch-made shredded potato latkes fried crisp, served with warm Hatch green chile queso and sour cream.",
    price: 5.99,
    category: "sides",
    tags: ["border fusion", "house special ⭐"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "green-chile-fries",
    name: "Hatch Green Chile Cheese Fries",
    description: "Crispy Idaho french fries smothered in warm green chile queso, grilled onions, pickled jalapeños, and bacon crumbles.",
    price: 6.49,
    category: "sides",
    tags: ["queso loaded", "spicy 🌶️"],
    image: "/truffle-fries.png",
    featured: true,
  },
  {
    id: "onion-rings-homeboy",
    name: "Thick-Cut Onion Rings",
    description: "Jumbo sweet Texas onions in seasoned cornmeal batter, served with spicy Homeboy dipping sauce.",
    price: 4.99,
    category: "sides",
    tags: ["crispy rings"],
    image: "/truffle-fries.png",
  },
  {
    id: "churro-shake",
    name: "Mexican Chocolate Churro Shake",
    description: "Thick hand-dipped vanilla ice cream spun with Abuelita Mexican chocolate, ground cinnamon, and topped with churro crumbles.",
    price: 5.75,
    category: "shakes",
    tags: ["hand spun", "specialty ⭐"],
    image: "/matcha-special.png",
    featured: true,
  },
  {
    id: "jamaica-agua-fresca",
    name: "Fresh Hibiscus Jamaica Agua Fresca",
    description: "Scratch-steeped sweet hibiscus flower tea served ice-cold with fresh lime.",
    price: 3.99,
    category: "shakes",
    tags: ["agua fresca", "refreshing"],
    image: "/old-monk-mousse.png",
    featured: true,
  },
  {
    id: "austin-beerworks-pint",
    name: "Austin Beerworks Pearl-Snap Pils",
    description: "Crisp local Austin pilsner on draft in a frosted glass mug. The perfect pairing for border burgers.",
    price: 5.50,
    category: "specials",
    tags: ["local draft", "austin beer"],
    image: "/old-monk-mousse.png",
  },
];

export const locations: Location[] = [
  {
    id: "airport-blvd",
    name: "Airport Blvd Flagship",
    address: "5111 Airport Blvd",
    city: "Austin, TX 78751",
    hours: "Mon–Sat: 11:00 AM – 10:00 PM | Sun: Closed",
    phone: "(512) 291-3358",
    image: "/images/locations/jewboy-burgers.jpg",
    featured: true,
  },
];

export const historyMilestones: HistoryMilestone[] = [
  {
    year: "2016",
    chapter: "CHAPTER 01",
    title: "Mo Pittle Starts on 29th St",
    subtitle: "Border roots meet Jewish comfort food",
    description: "Mo Pittle grew up in El Paso, where Mexican border cuisine and Jewish home cooking were part of daily life. He launched the JewBoy Burgers truck in Austin with a simple mission: smash burgers, potato latkes, and big smiles.",
    image: "/images/locations/jewboy-burgers.jpg",
  },
  {
    year: "2018",
    chapter: "CHAPTER 02",
    title: "The Oy Vey Goy Goes Viral",
    subtitle: "A potato latke inside an Angus smash burger",
    description: "The food world discovered Mo's creation: an Angus chuck patty smashed with grilled onions, topped with a hot crispy potato latke, bacon, and queso. Named one of Texas' top burgers.",
    image: "/hero-burger.png",
  },
  {
    year: "2020",
    chapter: "CHAPTER 03",
    title: "Airport Blvd Flagship Opens",
    subtitle: "From humble truck to iconic Austin institution",
    description: "JewBoy Burgers opened its permanent brick-and-mortar home at 5111 Airport Blvd with vibrant blue-and-yellow decor, a sunny patio, and a bustling kitchen.",
    image: "/images/locations/jewboy-burgers.jpg",
  },
  {
    year: "2026",
    chapter: "CHAPTER 04",
    title: "Shalom Y'all Across Austin",
    subtitle: "Border-style burger culture celebrated statewide",
    description: "Continuing to serve Austin with heart, humor, and unmatched flavor — where every guest is welcomed with 'Shalom y'all, Mucho gusto!'",
    image: "/truffle-fries.png",
  },
];
