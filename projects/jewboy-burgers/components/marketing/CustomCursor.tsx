"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "drag";

function getEffectiveBackgroundColor(el: Element | null): [number, number, number] {
  let current: Element | null = el;
  while (current && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    const bg = style.backgroundColor;
    if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
      }
    }
    current = current.parentElement;
  }
  return [10, 10, 10]; // Default dark tone
}

export default function CustomCursor() {
  const [state, setState]             = useState<CursorState>("default");
  const [cursorColor, setCursorColor] = useState<string>("var(--primary, #FFFFFF)");
  const [mounted, setMounted]         = useState(false);
  const [isTouch, setIsTouch]         = useState(true);
  
  const stateRef = useRef<CursorState>("default");
  const colorRef = useRef<string>("var(--primary, #FFFFFF)");

  // Raw mouse position
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  // Dot: near-instant spring
  const dx = useSpring(mx, { stiffness: 4500, damping: 120, mass: 0.05 });
  const dy = useSpring(my, { stiffness: 4500, damping: 120, mass: 0.05 });

  // Ring: lagged spring
  const rx = useSpring(mx, { stiffness: 250, damping: 28, mass: 0.8 });
  const ry = useSpring(my, { stiffness: 250, damping: 28, mass: 0.8 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(isCoarse);
    setMounted(true);

    if (isCoarse) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY) || (e.target as Element);
      if (!el) return;

      const [r, g, b] = getEffectiveBackgroundColor(el);
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Detect background color characteristics
      const isWhiteFooter = !!el.closest("footer, footer *");
      const isRed = (r > 150 && g < 80 && b < 80) || !!el.closest("footer[style*='#D91C24'], footer[style*='#E52421'], footer[style*='#DC2626'], .bg-red-600, .bg-\\[\\#D91C24\\], .bg-\\[\\#E52421\\]");
      const isGreen = (g > 55 && g > r * 1.05 && b < 100) || !!el.closest("footer[style*='#122B1E'], footer[style*='#418043'], footer[style*='#15803D'], .bg-\\[\\#122B1E\\], .bg-\\[\\#418043\\]");
      const isBlue = (b > 140 && r < 100) || !!el.closest("footer[style*='#2563EB'], .bg-\\[\\#2563EB\\]");
      const isMustard = (r > 150 && g > 100 && g < 185 && b < 60) || !!el.closest("[data-on-mustard], footer[style*='#C68A14'], .bg-\\[\\#C68A14\\]");
      const isNeonYellow = (r > 200 && g > 200 && b < 80) || !!el.closest("footer[style*='#FFE500'], .bg-\\[\\#FFE500\\]");
      const isPrimaryBtn = !!el.closest(".btn-primary");

      let nextColor = "var(--primary, #FFFFFF)";

      if (isWhiteFooter) {
        nextColor = "#0A0A0A";
      } else if (isRed) {
        // Red surface -> Deep Black for maximum contrast
        nextColor = "#0A0A0A";
      } else if (isGreen || isBlue || isMustard) {
        // Green, Blue, or Dark Mustard surface -> Crisp White
        nextColor = "#FFFFFF";
      } else if (isNeonYellow) {
        // Bright Neon Yellow -> Deep Black
        nextColor = "#0A0A0A";
      } else if (isPrimaryBtn) {
        // Over a primary button, invert to the button's contrasting text color
        nextColor = isRed || isNeonYellow ? "#0A0A0A" : "#FFFFFF";
      } else if (lum > 0.70) {
        // Light / Pure White surface -> Brand Primary or Deep Black
        nextColor = "var(--primary, #0A0A0A)";
      } else {
        // Dark / Black surface -> Brand Primary Accent
        nextColor = "var(--primary, #FFFFFF)";
      }

      if (nextColor !== colorRef.current) {
        colorRef.current = nextColor;
        setCursorColor(nextColor);
      }

      // Interactive state
      let nextState: CursorState = "default";
      if (el.closest("[data-cursor='drag']")) {
        nextState = "drag";
      } else if (el.closest("a, button, [data-cursor='hover'], [role='button'], select, input, .cursor-pointer")) {
        nextState = "hover";
      }

      if (nextState !== stateRef.current) {
        stateRef.current = nextState;
        setState(nextState);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [mx, my]);

  if (!mounted || isTouch) return null;

  const ringHoverBg = cursorColor === "#0A0A0A"
    ? "rgba(10, 10, 10, 0.15)"
    : "rgba(255, 255, 255, 0.15)";

  return (
    <>
      {/* ── Outer Ring: Retro Pixelated Targeting Frame ────────────────── */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99998,
        }}
      >
        <motion.div
          animate={{
            width:
              state === "drag"  ? 64
              : state === "hover" ? 44
              : 26,
            height:
              state === "drag"  ? 64
              : state === "hover" ? 44
              : 26,
            backgroundColor:
              state === "hover" ? ringHoverBg
              : "transparent",
            borderColor: cursorColor,
            rotate: state === "hover" ? 45 : 0,
          }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="border-2 relative flex items-center justify-center transition-colors duration-150"
          style={{
            borderStyle: "solid",
            imageRendering: "pixelated",
          }}
        >
          {/* Corner pixels */}
          <div className="absolute -top-1 -left-1 w-1 h-1 transition-colors duration-150" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -top-1 -right-1 w-1 h-1 transition-colors duration-150" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -bottom-1 -left-1 w-1 h-1 transition-colors duration-150" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -bottom-1 -right-1 w-1 h-1 transition-colors duration-150" style={{ backgroundColor: cursorColor }} />

          {state === "drag" && (
            <span
              className="uppercase select-none font-sans font-extrabold tracking-widest text-[6px] transition-colors duration-150"
              style={{ transform: "rotate(-45deg)", color: cursorColor }}
            >
              DRAG
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* ── Inner Dot: Pixelated Solid Square ───────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none transition-colors duration-150"
        style={{
          x: dx,
          y: dy,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
        }}
      >
        <motion.div
          animate={{
            width:  state === "hover" ? 6 : 4,
            height: state === "hover" ? 6 : 4,
            opacity: state === "drag" ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-none shadow-sm transition-colors duration-150"
          style={{ backgroundColor: cursorColor }}
        />
      </motion.div>
    </>
  );
}
