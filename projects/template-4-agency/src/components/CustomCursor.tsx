"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("a, button, [data-cursor]");
        if (interactive) {
          setIsHovered(true);
          const customText = interactive.getAttribute("data-cursor");
          setHoverText(customText || "");
        } else {
          setIsHovered(false);
          setHoverText("");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Precision Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 rounded-full bg-[#d4ff00] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Expanding Ring / Custom Text Follower */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border border-[#d4ff00]/60 bg-[#d4ff00]/10 backdrop-blur-xs"
        animate={{
          x: mousePosition.x - (isHovered ? 40 : 20),
          y: mousePosition.y - (isHovered ? 40 : 20),
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {hoverText && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-[#d4ff00] uppercase">
            {hoverText}
          </span>
        )}
      </motion.div>
    </>
  );
}
