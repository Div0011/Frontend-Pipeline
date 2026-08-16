export const SCENE_SECTIONS = [
  "hero",
  "about",
  "choose-your-vibe",
  "trio-select",
  "flavor-story",
  "molecular-craft",
  "explore",
  "scroll-expand",
  "product-spotlight",
  "collection",
  "contact",
  "products",
  "footer",
] as const;

export type SceneSection = (typeof SCENE_SECTIONS)[number];

export interface CanTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export type SectionWaypoints = Partial<Record<SceneSection, CanTransform>>;

export const PRODUCT_SLUGS = ["classic", "diet", "cool"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const MODEL_PATHS: Record<ProductSlug, string> = {
  classic: "/models/soda-can.glb",
  diet: "/models/diet_soda.glb",
  cool: "/models/cool-ayyd_soda_can.glb",
};

export const PRODUCT_INFO: Record<
  ProductSlug,
  {
    name: string;
    tagline: string;
    flavor: string;
    notes: string[];
    description: string;
    accentColor: string;
    glowColor: string;
    price: string;
    stats: { label: string; value: string }[];
    ingredients: string[];
    details: { label: string; value: string }[];
  }
> = {
  classic: {
    name: "Classic Original",
    tagline: "The Blueprint of Pure Carbonation",
    flavor: "Crisp Botanical Citrus & Yuzu",
    notes: ["Japanese Yuzu", "Bergamot Essence", "Mountain Artemisia"],
    description:
      "Crafted with hand-harvested citrus oils and mineral-rich mountain spring water. Engineered with micron-level carbonation for an ultra-fine, persistent effervescence that never fades.",
    accentColor: "#06D6A0",
    glowColor: "rgba(6, 214, 160, 0.45)",
    price: "$36 / 12-Pack",
    stats: [
      { label: "Carbonation", value: "3.2 Vol" },
      { label: "Natural Sugars", value: "4g Cane" },
      { label: "Caffeine", value: "45mg Green Tea" },
    ],
    ingredients: ["Alpine Spring Water", "Cold-Pressed Yuzu Oil", "Organic Cane", "Green Tea L-Theanine"],
    details: [
      { label: "Volume", value: "12oz / 355ml" },
      { label: "Calories", value: "25 kcal" },
      { label: "Pressure", value: "3.2 BAR" },
      { label: "Recyclability", value: "100% Infinite" },
    ],
  },
  diet: {
    name: "Diet Kinetic",
    tagline: "Zero Compromise. Maximum Velocity.",
    flavor: "Electric Berry & Crushed Violet",
    notes: ["Wild Blackberry", "Acai Stardust", "Violet Blossom"],
    description:
      "Zero sugar formulation powered by adaptogenic monk fruit and electrolyte-infused mineral water. Crisp, electric finish with zero synthetic aftertaste or glucose spikes.",
    accentColor: "#4CC9F0",
    glowColor: "rgba(76, 201, 240, 0.45)",
    price: "$36 / 12-Pack",
    stats: [
      { label: "Sugar", value: "0g Zero" },
      { label: "Calories", value: "0 kcal" },
      { label: "Electrolytes", value: "180mg" },
    ],
    ingredients: ["Ionized Alpine Water", "Monk Fruit Nectar", "Himalayan Pink Minerals", "Natural Berry Essence"],
    details: [
      { label: "Volume", value: "12oz / 355ml" },
      { label: "Sugar Added", value: "0.0g" },
      { label: "Electrolytes", value: "Potassium + Magnesium" },
      { label: "Can Spec", value: "Aerospace Grade" },
    ],
  },
  cool: {
    name: "Cool Cosmic",
    tagline: "Bold Tropical Dimension",
    flavor: "Blood Orange & Starfruit Nectar",
    notes: ["Sicilian Blood Orange", "Starfruit", "Adaptogenic Ginseng"],
    description:
      "A daring fusion of exotic fruit extracts and adaptogens. Bold, layered, and unapologetically vibrant from the first pour to the final lingering drop.",
    accentColor: "#FF8A00",
    glowColor: "rgba(255, 138, 0, 0.5)",
    price: "$38 / 12-Pack",
    stats: [
      { label: "Fruit Extract", value: "15% Pure" },
      { label: "Adaptogens", value: "100mg L-Theanine" },
      { label: "Intensity", value: "2x Bold" },
    ],
    ingredients: ["Blood Orange Puree", "Starfruit Nectar", "Organic Panax Ginseng", "Carbonated Artesian Springs"],
    details: [
      { label: "Volume", value: "12oz / 355ml" },
      { label: "Juice Content", value: "15% Real Fruit" },
      { label: "Adaptogens", value: "Ginseng + Theanine" },
      { label: "Edition", value: "Limited Batch" },
    ],
  },
};

/**
 * Standardized waypoints for the 3 cans across all sections.
 */
export const CAN_WAYPOINTS: Record<ProductSlug, SectionWaypoints> = {
  classic: {
    hero: {
      position: [-2.8, -0.5, 0.5],
      rotation: [0.08, -0.4, 0.05],
      scale: 1.05,
    },
    about: {
      position: [0, -30, -30],
      rotation: [0, 0, 0],
      scale: 0.0001,
    },
    "choose-your-vibe": {
      position: [-2.2, -0.38, 0],
      rotation: [0, 0.25, 0],
      scale: 0.88,
    },
    "product-spotlight": {
      position: [-2.5, -0.2, 0.5],
      rotation: [0.1, -0.3, 0.05],
      scale: 1.0,
    },
    collection: {
      position: [-3.4, 0, -1.0],
      rotation: [0, 0.45, 0],
      scale: 0.72,
    },
  },
  diet: {
    hero: {
      position: [0, 0.2, 1.0],
      rotation: [0, 0, 0],
      scale: 1.1,
    },
    about: {
      position: [0, -30, -30],
      rotation: [0, 0, 0],
      scale: 0.0001,
    },
    "choose-your-vibe": {
      position: [0, -0.38, 0],
      rotation: [0, 0, 0],
      scale: 0.88,
    },
    "product-spotlight": {
      position: [0, -30, -30],
      rotation: [0, 0, 0],
      scale: 0.0001,
    },
    collection: {
      position: [0, 0.05, 0.5],
      rotation: [0, 0, 0],
      scale: 1.15,
    },
  },
  cool: {
    hero: {
      position: [2.8, -0.8, 0.5],
      rotation: [-0.15, -0.5, -0.1],
      scale: 0.95,
    },
    about: {
      position: [0, -30, -30],
      rotation: [0, 0, 0],
      scale: 0.0001,
    },
    "choose-your-vibe": {
      position: [2.2, -0.38, 0],
      rotation: [0, -0.25, 0],
      scale: 0.88,
    },
    "product-spotlight": {
      position: [0, -30, -30],
      rotation: [0, 0, 0],
      scale: 0.0001,
    },
    collection: {
      position: [3.4, 0, -1.0],
      rotation: [0, -0.45, 0],
      scale: 0.68,
    },
  },
};
