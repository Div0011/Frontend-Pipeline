"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "drag";
type BackgroundTone = "dark" | "light" | "primary";

export default function CustomCursor() {
  const [state, setState]             = useState<CursorState>("default");
  const [bgTone, setBgTone]           = useState<BackgroundTone>("dark");
  const [mounted, setMounted]         = useState(false);
  const [isTouch, setIsTouch]         = useState(true);
  
  const stateRef = useRef<CursorState>("default");
  const bgToneRef = useRef<BackgroundTone>("dark");

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
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      if (!el) return;

      // 1. Detect if hovering over a primary-colored background / button / ticker
      const isOverPrimary = !!el.closest(
        ".btn-primary, [data-on-mustard], [style*='backgroundColor: #C68A14'], [style*='background-color: #C68A14'], [style*='background-color: rgb(198, 138, 20)'], [style*='background-color: #D91C24'], [style*='background-color: rgb(217, 28, 36)'], .bg-\\[\\#C68A14\\], .bg-\\[\\#D91C24\\], .bg-primary"
      );

      // 2. Detect if hovering over a light / white surface
      const isOverLight = !isOverPrimary && !!el.closest(
        "html.light body, .bg-white, .bg-[#FAF8F2], .bg-[#FBF8F0], footer[style*='background-color: #FFFFFF']"
      );

      let nextTone: BackgroundTone = "dark";
      if (isOverPrimary) {
        nextTone = "primary";
      } else if (isOverLight) {
        nextTone = "light";
      } else {
        nextTone = "dark";
      }

      if (nextTone !== bgToneRef.current) {
        bgToneRef.current = nextTone;
        setBgTone(nextTone);
      }

      // Detect cursor interactive state
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
    document.addEventListener("mouseover", onOver as EventListener, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver as EventListener);
    };
  }, [mx, my]);

  if (!mounted || isTouch) return null;

  // ── Monochromatic Contrast Color Inversion ──────────────────────────────
  // 1. Over Primary-colored background -> Invert to pure White (#FFFFFF)
  // 2. Over Light/White background -> Invert to Brand Primary Accent or Dark Charcoal (#0A0A0A)
  // 3. Over Dark background -> Brand Primary Accent (var(--primary))
  let cursorColor = "var(--primary, #FFFFFF)";
  let ringHoverBg = "rgba(255, 255, 255, 0.12)";

  if (bgTone === "primary") {
    cursorColor = "#FFFFFF";
    ringHoverBg = "rgba(255, 255, 255, 0.20)";
  } else if (bgTone === "light") {
    cursorColor = "var(--primary, #0A0A0A)";
    ringHoverBg = "rgba(198, 138, 20, 0.15)";
  } else {
    cursorColor = "var(--primary, #FFFFFF)";
    ringHoverBg = "rgba(255, 255, 255, 0.10)";
  }

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
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="border-2 relative flex items-center justify-center transition-colors duration-200"
          style={{
            borderStyle: "solid",
            imageRendering: "pixelated",
          }}
        >
          {/* Corner pixels */}
          <div className="absolute -top-1 -left-1 w-1 h-1 transition-colors duration-200" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -top-1 -right-1 w-1 h-1 transition-colors duration-200" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -bottom-1 -left-1 w-1 h-1 transition-colors duration-200" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -bottom-1 -right-1 w-1 h-1 transition-colors duration-200" style={{ backgroundColor: cursorColor }} />

          {state === "drag" && (
            <span
              className="uppercase select-none font-sans font-extrabold tracking-widest text-[6px] transition-colors duration-200"
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
        className="fixed top-0 left-0 pointer-events-none transition-colors duration-200"
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
          className="rounded-none shadow-sm transition-colors duration-200"
          style={{ backgroundColor: cursorColor }}
        />
      </motion.div>
    </>
  );
}
