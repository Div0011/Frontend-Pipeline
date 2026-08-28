import { create } from "zustand";
import {
  CanTransform,
  SceneSection,
  ProductSlug,
  CAN_WAYPOINTS,
  MODEL_PATHS,
  PRODUCT_SLUGS,
} from "@/config/sceneConfig";

export interface SceneStore {
  activeSection: SceneSection;
  activeProduct: ProductSlug | null;
  collectionSlug: ProductSlug;
  scrollProgress: number;
  sectionProgress: number;
  trioSelectProgress: number;
  prefersReducedMotion: boolean;
  setActiveSection: (section: SceneSection) => void;
  setActiveProduct: (slug: ProductSlug | null) => void;
  setCollectionSlug: (slug: ProductSlug) => void;
  nextCollectionSlug: () => void;
  prevCollectionSlug: () => void;
  setScrollProgress: (progress: number) => void;
  setSectionProgress: (progress: number) => void;
  setTrioSelectProgress: (progress: number) => void;
  getCanTarget: (slug: ProductSlug) => CanTransform;
  getModelPath: (slug: ProductSlug) => string;
}

export const useSceneStore = create<SceneStore>((set, get) => {
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return {
    activeSection: "hero",
    activeProduct: null,
    collectionSlug: "diet",
    scrollProgress: 0,
    sectionProgress: 0,
    trioSelectProgress: 0,
    prefersReducedMotion,

    setActiveSection: (section) => set({ activeSection: section }),
    setActiveProduct: (slug) => set({ activeProduct: slug }),
    setCollectionSlug: (slug) => set({ collectionSlug: slug }),

    nextCollectionSlug: () => {
      const current = get().collectionSlug;
      const idx = PRODUCT_SLUGS.indexOf(current);
      const next = PRODUCT_SLUGS[(idx + 1) % PRODUCT_SLUGS.length];
      set({ collectionSlug: next, activeProduct: next });
    },

    prevCollectionSlug: () => {
      const current = get().collectionSlug;
      const idx = PRODUCT_SLUGS.indexOf(current);
      const prev = PRODUCT_SLUGS[(idx - 1 + PRODUCT_SLUGS.length) % PRODUCT_SLUGS.length];
      set({ collectionSlug: prev, activeProduct: prev });
    },

    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setSectionProgress: (progress) => set({ sectionProgress: progress }),
    setTrioSelectProgress: (progress) => set({ trioSelectProgress: progress }),

    getCanTarget: (slug: ProductSlug) => {
      const { activeSection, activeProduct, collectionSlug, trioSelectProgress, sectionProgress } = get();

      // HIDE GLOBAL FLOATING CANS IN DEDICATED PAGES, EXPLORE & FOOTER
      if (
        activeSection === "contact" ||
        activeSection === "products" ||
        activeSection === "about" ||
        activeSection === "explore" ||
        activeSection === "footer"
      ) {
        return {
          position: [0, -30, -30],
          rotation: [0, 0, 0],
          scale: 0.0001,
        };
      }

      // SECTION 1: HERO
      if (activeSection === "hero") {
        const p = Math.max(0, Math.min(1, sectionProgress)); // 0 to 1
        
        if (slug === "classic") { // Left Can -> Disperses to Left & Back
          return {
            position: [-2.6 - (p * 10), -0.25 - (p * 2), 0.6 - (p * 3)],
            rotation: [0.1, 0.35 + (p * 0.4), -0.08 - (p * 0.55)],
            scale: Math.max(0.0001, 1.02 * (1 - p * 1.15)),
          };
        }
        if (slug === "cool") { // Right Can -> Disperses to Right & Back
          return {
            position: [2.6 + (p * 10), -0.25 - (p * 2), 0.6 - (p * 3)],
            rotation: [0.1, -0.35 - (p * 0.4), 0.08 + (p * 0.55)],
            scale: Math.max(0.0001, 1.02 * (1 - p * 1.15)),
          };
        }
        // Diet (Silver Can) -> Center -> Elevates Upwards to the Sky
        return {
          position: [0, 0.1 + (p * 11), 1.25 + (p * 1.2)],
          rotation: [0.05, p * 2.8, 0],
          scale: Math.max(0.0001, 1.18 * (1 - p * 1.15)),
        };
      }

      // SECTION 2: TRIO SELECTION STAGE (Choose Your Vibe carousel)
      if (activeSection === "trio-select") {
        const activeCenter = activeProduct || collectionSlug || "diet";
        if (slug === activeCenter) {
          return {
            position: [0, -0.28, 0.45],
            rotation: [0.05, 0, 0],
            scale: 1.05,
          };
        }

        const idxCenter = PRODUCT_SLUGS.indexOf(activeCenter);
        const idxCurrent = PRODUCT_SLUGS.indexOf(slug);
        const diff = (idxCurrent - idxCenter + 3) % 3;

        if (diff === 1) { // Right side can
          return {
            position: [2.9, -0.45, -1.2],
            rotation: [0, -0.4, 0],
            scale: 0.65,
          };
        } else { // Left side can
          return {
            position: [-2.9, -0.45, -1.2],
            rotation: [0, 0.4, 0],
            scale: 0.65,
          };
        }
      }

      // SECTION 3A: FLAVOR STORY (Selected can shifts to the LEFT side as user scrolls)
      if (activeSection === "flavor-story") {
        const targetFocus = activeProduct || "diet";
        if (slug === targetFocus) {
          return {
            position: [-2.35, -0.1, 0.55],
            rotation: [0.08, 0.38, -0.04],
            scale: 1.12,
          };
        }
        return {
          position: slug === "classic" ? [-8, 0, -5] : [8, 0, -5],
          rotation: [0, 0, 0],
          scale: 0.0001,
        };
      }

      // SECTION 3B: MOLECULAR CRAFT (Selected can shifts to the RIGHT side as user scrolls)
      if (activeSection === "molecular-craft") {
        const targetFocus = activeProduct || "diet";
        if (slug === targetFocus) {
          return {
            position: [2.35, -0.1, 0.55],
            rotation: [0.08, -0.38, 0.04],
            scale: 1.12,
          };
        }
        return {
          position: slug === "classic" ? [-8, 0, -5] : [8, 0, -5],
          rotation: [0, 0, 0],
          scale: 0.0001,
        };
      }

      // SECTION 4: SCROLL EXPAND FULL FRAME
      if (activeSection === "scroll-expand") {
        return {
          position: [0, 0, -8],
          rotation: [0, 0, 0],
          scale: 0.001,
        };
      }

      // SECTION 5: COLLECTION CAROUSEL (Center main, other two half-visible on sides)
      if (activeSection === "collection") {
        const activeCenter = activeProduct || collectionSlug || "diet";
        if (slug === activeCenter) {
          return {
            position: [0, -0.38, 0.3],
            rotation: [0.05, 0, 0],
            scale: 0.98,
          };
        }

        const idxCenter = PRODUCT_SLUGS.indexOf(activeCenter);
        const idxCurrent = PRODUCT_SLUGS.indexOf(slug);
        const diff = (idxCurrent - idxCenter + 3) % 3;

        if (diff === 1) {
          return {
            position: [3.4, -0.42, -1.0],
            rotation: [0, -0.45, 0],
            scale: 0.68,
          };
        } else {
          return {
            position: [-3.4, -0.42, -1.0],
            rotation: [0, 0.45, 0],
            scale: 0.68,
          };
        }
      }

      return CAN_WAYPOINTS[slug][activeSection] ?? CAN_WAYPOINTS[slug].hero ?? {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1,
      };
    },

    getModelPath: (slug: ProductSlug) => MODEL_PATHS[slug],
  };
});
