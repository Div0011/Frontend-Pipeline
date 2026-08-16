"use client";

import { ProductSlug } from "@/config/sceneConfig";

export interface ModelTheme {
  id: ProductSlug | "default";
  label: string;
  colors: readonly string[];
  gradient: string;
  bgGradient: string;
  accentColor: string;
  glowColor: string;
  lightA: string;
  lightB: string;
  ambient: string;
}

export const THEME_PALETTES: Record<ProductSlug | "default", ModelTheme> = {
  default: {
    id: "default",
    label: "Aura Cosmic",
    colors: ["#FF8A00", "#9D4EDD", "#FF006E"],
    gradient: "linear-gradient(135deg, #FF8A00 0%, #9D4EDD 50%, #FF006E 100%)",
    bgGradient:
      "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(157, 78, 221, 0.35) 0%, rgba(255, 138, 0, 0.22) 40%, rgba(27, 8, 40, 0.95) 75%, #0d0314 100%)",
    accentColor: "#FF8A00",
    glowColor: "rgba(255, 138, 0, 0.4)",
    lightA: "#FF8A00",
    lightB: "#9D4EDD",
    ambient: "#250836",
  },
  classic: {
    id: "classic",
    label: "Classic Original",
    colors: ["#06D6A0", "#118AB2", "#073B4C"],
    gradient: "linear-gradient(135deg, #06D6A0 0%, #118AB2 50%, #073B4C 100%)",
    bgGradient:
      "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(6, 214, 160, 0.32) 0%, rgba(17, 138, 178, 0.22) 40%, rgba(7, 31, 40, 0.95) 75%, #03141b 100%)",
    accentColor: "#06D6A0",
    glowColor: "rgba(6, 214, 160, 0.4)",
    lightA: "#06D6A0",
    lightB: "#118AB2",
    ambient: "#082522",
  },
  diet: {
    id: "diet",
    label: "Diet Kinetic",
    colors: ["#4CC9F0", "#F72585", "#7209B7"],
    gradient: "linear-gradient(135deg, #4CC9F0 0%, #F72585 50%, #7209B7 100%)",
    bgGradient:
      "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(76, 201, 240, 0.35) 0%, rgba(247, 37, 133, 0.25) 40%, rgba(40, 8, 55, 0.95) 75%, #12031d 100%)",
    accentColor: "#4CC9F0",
    glowColor: "rgba(76, 201, 240, 0.4)",
    lightA: "#4CC9F0",
    lightB: "#F72585",
    ambient: "#280838",
  },
  cool: {
    id: "cool",
    label: "Cool Cosmic",
    colors: ["#FF8A00", "#9D4EDD", "#FF006E"],
    gradient: "linear-gradient(135deg, #FF8A00 0%, #9D4EDD 50%, #FF006E 100%)",
    bgGradient:
      "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(255, 138, 0, 0.38) 0%, rgba(157, 78, 221, 0.26) 40%, rgba(48, 10, 35, 0.95) 75%, #180310 100%)",
    accentColor: "#FF8A00",
    glowColor: "rgba(255, 138, 0, 0.45)",
    lightA: "#FF8A00",
    lightB: "#9D4EDD",
    ambient: "#320b1e",
  },
};

export const MODEL_THEMES = {
  "/models/soda-can.glb": THEME_PALETTES.classic,
  "/models/diet_soda.glb": THEME_PALETTES.diet,
  "/models/cool-ayyd_soda_can.glb": THEME_PALETTES.cool,
} as const;

export type ModelThemeKey = keyof typeof MODEL_THEMES;

export function getThemeForProduct(slug: ProductSlug | null): ModelTheme {
  if (!slug) return THEME_PALETTES.default;
  return THEME_PALETTES[slug] || THEME_PALETTES.default;
}

export function getDefaultTheme(): ModelTheme {
  return THEME_PALETTES.default;
}
