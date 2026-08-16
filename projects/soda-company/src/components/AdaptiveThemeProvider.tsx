"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useSceneStore } from "@/stores/sceneStore";
import { getThemeForProduct, type ModelTheme } from "@/lib/adaptive-theme";
import { ProductSlug } from "@/config/sceneConfig";
import Antigravity from "@/components/Antigravity";

interface AdaptiveThemeContextValue {
  theme: ModelTheme;
  activeProduct: ProductSlug | null;
  setActiveProduct: (slug: ProductSlug | null) => void;
}

const AdaptiveThemeContext = createContext<AdaptiveThemeContextValue>({
  theme: getThemeForProduct(null),
  activeProduct: null,
  setActiveProduct: () => {},
});

export function AdaptiveThemeProvider({ children }: { children: ReactNode }) {
  const activeProduct = useSceneStore((s) => s.activeProduct);
  const setActiveProduct = useSceneStore((s) => s.setActiveProduct);

  const theme = useMemo(() => {
    return getThemeForProduct(activeProduct);
  }, [activeProduct]);

  return (
    <AdaptiveThemeContext.Provider value={{ theme, activeProduct, setActiveProduct }}>
      {/* Dynamic atmospheric gradient background at z-0 */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: theme.bgGradient,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric glowing aura orbs at z-0 */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <div
          className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[140px] opacity-60 transition-colors duration-1000 animate-pulse"
          style={{ backgroundColor: theme.lightA }}
        />
        <div
          className="absolute -bottom-[15%] -right-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[160px] opacity-55 transition-colors duration-1000 animate-pulse"
          style={{ backgroundColor: theme.lightB, animationDelay: "3s" }}
        />
      </div>

      {/* Persistent Full-Screen Antigravity Particle Field in background */}
      <Antigravity
        count={100}
        color={theme.accentColor}
        waveSpeed={0.32}
        waveAmplitude={1.0}
        particleSize={1.6}
        particleShape="capsule"
        magnetRadius={7}
        fieldStrength={10}
        opacity={0.55}
      />

      <div className="relative z-10 w-full min-h-screen">{children}</div>
    </AdaptiveThemeContext.Provider>
  );
}

export function useAdaptiveTheme() {
  return useContext(AdaptiveThemeContext);
}
