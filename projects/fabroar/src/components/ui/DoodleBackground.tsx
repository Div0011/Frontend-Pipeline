"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ALL_DOODLE_COMPONENTS } from "./DoodleIcons";
import { useTheme } from "@/context/ThemeContext";

interface DoodleItem {
  id: number;
  Component: React.ComponentType<any>;
  topPercent: number; // Vertical position in % of viewport height (0% to 95%)
  leftPercent: number; // Horizontal position in % (0% to 95%)
  size: number;
  rotation: number;
  floatDelay: number;
  floatDuration: number;
  opacity: number;
  colorDark: string;
  colorLight: string;
}

const DARK_THEME_DOODLE_COLORS = [
  "#F5F0E8", // Aged Cotton White
  "#C4A77D", // Sand / Ochre
  "#E07A60", // Soft Terracotta
  "#D4654A", // Burnt Terracotta
];

const LIGHT_THEME_DOODLE_COLORS = [
  "#0F0F0F", // Charcoal Black
  "#141110", // Warm Dark Charcoal
  "#D4654A", // Burnt Terracotta
  "#8C7047", // Deep Ochre
];

export default function DoodleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [doodles, setDoodles] = useState<DoodleItem[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Generate a dense, evenly-distributed matrix of floating doodles across the viewport
    const items: DoodleItem[] = [];
    const rows = 7;
    const cols = 8;
    let idCounter = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const Component = ALL_DOODLE_COMPONENTS[idCounter % ALL_DOODLE_COMPONENTS.length];
        const colorDark = DARK_THEME_DOODLE_COLORS[idCounter % DARK_THEME_DOODLE_COLORS.length];
        const colorLight = LIGHT_THEME_DOODLE_COLORS[idCounter % LIGHT_THEME_DOODLE_COLORS.length];

        // Even distribution across entire viewport width (3% to 95%) and height (3% to 95%)
        const topPercent = Math.min(95, Math.max(3, 3 + (r / (rows - 1)) * 90 + (Math.random() * 4 - 2)));
        const leftPercent = Math.min(95, Math.max(3, 3 + (c / (cols - 1)) * 90 + (Math.random() * 4 - 2)));
        const size = Math.floor(36 + Math.random() * 32); // 36px to 68px
        const rotation = Math.floor(Math.random() * 90 - 45); // -45deg to +45deg
        const floatDelay = Math.random() * 2;
        const floatDuration = 3.5 + Math.random() * 3.5;
        const opacity = 0.25 + Math.random() * 0.20;

        items.push({
          id: idCounter++,
          Component,
          topPercent,
          leftPercent,
          size,
          rotation,
          floatDelay,
          floatDuration,
          opacity,
          colorDark,
          colorLight,
        });
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDoodles(items);
  }, []);

  useEffect(() => {
    if (!doodles.length || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const doodleElements = containerRef.current?.querySelectorAll(".fixed-doodle-icon");
      if (!doodleElements) return;

      doodleElements.forEach((el, index) => {
        const item = doodles[index];
        if (!item) return;

        // Subtle organic floating animation
        gsap.to(el, {
          y: "random(-18, 18)",
          x: "random(-12, 12)",
          rotation: `+=${Math.random() > 0.5 ? 15 : -15}`,
          duration: item.floatDuration,
          delay: item.floatDelay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [doodles]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none"
      aria-hidden="true"
    >
      {doodles.map((item) => {
        const IconComponent = item.Component;
        return (
          <div
            key={item.id}
            className="fixed-doodle-icon absolute will-change-transform"
            style={{
              top: `${item.topPercent}%`,
              left: `${item.leftPercent}%`,
              transform: `rotate(${item.rotation}deg)`,
              opacity: item.opacity,
              color: theme === "light" ? item.colorLight : item.colorDark,
              filter: theme === "light" ? "drop-shadow(0 2px 6px rgba(15,15,15,0.15))" : "drop-shadow(0 2px 8px rgba(196,167,125,0.22))",
            }}
          >
            <IconComponent size={item.size} strokeWidth={1.8} />
          </div>
        );
      })}
    </div>
  );
}
