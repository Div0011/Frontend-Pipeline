"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "drag";

export default function CustomCursor() {
  const [state, setState]             = useState<CursorState>("default");
  const [isDarkBg, setIsDarkBg]       = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [isTouch, setIsTouch]         = useState(true);
  
  const stateRef = useRef<CursorState>("default");
  const darkBgRef = useRef(false);

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
    // Hide on touch devices
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

      // Detect background theme
      const hasDarkParent = !!el.closest(".bg-char, .bg-char-soft, .bg-char-mute, [data-theme='dark'], canvas");
      if (hasDarkParent !== darkBgRef.current) {
        darkBgRef.current = hasDarkParent;
        setIsDarkBg(hasDarkParent);
      }

      // Detect cursor state
      let next: CursorState = "default";
      if (el.closest("[data-cursor='drag']")) {
        next = "drag";
      } else if (el.closest("a, button, [data-cursor='hover'], [role='button'], select, input")) {
        next = "hover";
      }

      if (next !== stateRef.current) {
        stateRef.current = next;
        setState(next);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver as EventListener, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver as EventListener);
    };
  }, []);

  if (!mounted || isTouch) return null;

  // Colors based on background contrast:
  // Over Dark -> Yellow (#F5C418)
  // Over Light / Yellow -> Black (#141413)
  const cursorColor = isDarkBg ? "#F5C418" : "#141413";
  const ringHoverBg = isDarkBg ? "rgba(245,196,24,0.12)" : "rgba(20,20,19,0.14)";

  return (
    <>
      {/* ── Outer Ring: Retro 8-bit Pixelated Targeting Frame ────────────────── */}
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
              state === "drag"  ? 68
              : state === "hover" ? 48
              : 28,
            height:
              state === "drag"  ? 68
              : state === "hover" ? 48
              : 28,
            backgroundColor:
              state === "hover" ? ringHoverBg
              : "transparent",
            borderColor: cursorColor,
            rotate: state === "hover" ? 45 : 0, // Rotates to a diamond lock on hover
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="border-2 relative flex items-center justify-center transition-colors duration-200"
          style={{
            // Double-border style for pixel effect + crisp rendering
            borderStyle: "solid",
            imageRendering: "pixelated",
            boxShadow: `0 0 0 2px ${isDarkBg ? "#141413" : "#FAF9F4"}`,
          }}
        >
          {/* Pixelated Corner blocks */}
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 transition-colors duration-200" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 transition-colors duration-200" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 transition-colors duration-200" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 transition-colors duration-200" style={{ backgroundColor: cursorColor }} />

          {state === "drag" && (
            <motion.span
              key="drag-label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className={`uppercase select-none font-mono font-bold tracking-widest text-[6px] ${isDarkBg ? "text-[#B12727]" : "text-char"}`}
              style={{ transform: "rotate(-45deg)" }}
            >
              DRAG
            </motion.span>
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
          width: 8,
          height: 8,
          backgroundColor: cursorColor,
          imageRendering: "pixelated",
          boxShadow: `0 0 0 1px ${isDarkBg ? "#141413" : "#FAF9F4"}`,
        }}
        animate={{
          scale:   state === "hover" ? 0 : state === "drag" ? 0.6 : 1,
          rotate:  state === "drag" ? 45 : 0,
        }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
      />
    </>
  );
}
