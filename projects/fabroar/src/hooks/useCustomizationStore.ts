import { create } from "zustand";

export type BaseStyle = "classic-crew" | "oversized" | "slim-fit" | "relaxed";
export type ShirtColor = "obsidian" | "bone" | "sage" | "terracotta" | "indigo" | "sand";
export type Placement = "left-chest" | "center-chest" | "full-back" | "sleeve";

export interface CustomDesign {
  file: File | null;
  preview: string | null;
  placement: Placement;
  rotation: number;
  scale: number;
}

interface CustomizationState {
  baseStyle: BaseStyle;
  color: ShirtColor;
  size: string;
  quantity: number;
  design: CustomDesign;
  setBaseStyle: (style: BaseStyle) => void;
  setColor: (color: ShirtColor) => void;
  setSize: (size: string) => void;
  setQuantity: (quantity: number) => void;
  setDesign: (design: Partial<CustomDesign>) => void;
  reset: () => void;
}

const basePrices: Record<BaseStyle, number> = {
  "classic-crew": 599,
  "oversized": 649,
  "slim-fit": 599,
  "relaxed": 599,
};

const placementPrices: Record<Placement, number> = {
  "left-chest": 0,
  "center-chest": 50,
  "full-back": 150,
  sleeve: 0,
};

export function calculateCustomPrice(state: {
  baseStyle: BaseStyle;
  color: ShirtColor;
  size: string;
  quantity: number;
  design: CustomDesign;
}): number {
  const base = basePrices[state.baseStyle];
  const placement = placementPrices[state.design.placement];
  const print = state.design.file ? 150 : 0;
  return base + placement + print;
}

const initialState = {
  baseStyle: "classic-crew" as BaseStyle,
  color: "obsidian" as ShirtColor,
  size: "M",
  quantity: 1,
  design: {
    file: null,
    preview: null,
    placement: "center-chest" as Placement,
    rotation: 0,
    scale: 1,
  },
};

export const useCustomizationStore = create<CustomizationState>((set) => ({
  ...initialState,

  setBaseStyle: (baseStyle) => set({ baseStyle }),
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  setQuantity: (quantity) => set({ quantity }),
  setDesign: (design) =>
    set((state) => ({
      design: { ...state.design, ...design },
    })),
  reset: () => set(initialState),
}));
