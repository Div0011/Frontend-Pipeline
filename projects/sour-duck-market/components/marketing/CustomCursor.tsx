"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "drag";

export default function CustomCursor() {
  const [state, setState]             = useState<CursorState>("default");
  const [isDarkBg, setIsDarkBg]       = useState(true);
  const [mounted, setMounted]         = useState(false);
  const [isTouch, setIsTouch]         = useState(true);
  
  const stateRef = useRef<CursorState>("default");
  const darkBgRef = useRef(true);

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

      // Detect background theme: dark background vs light/colored background
      const hasLightParent = !!el.closest("footer, .bg-[#FAF7F2], .bg-white, html.light body section:not([data-image-frame])");
      const isDark = !hasLightParent;

      if (isDark !== darkBgRef.current) {
        darkBgRef.current = isDark;
        setIsDarkBg(isDark);
      }

      let next: CursorState = "default";
      if (el.closest("[data-cursor='drag']")) {
        next = "drag";
      } else if (el.closest("a, button, [data-cursor='hover'], [role='button'], select, input, .cursor-pointer")) {
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
  }, [mx, my]);

  if (!mounted || isTouch) return null;

  // Strict Brand Color Palette:
  // Over Dark -> Brand Primary Accent (var(--primary))
  // Over Light / Footer -> Deep Black (#0A0A0A)
  const cursorColor = isDarkBg ? "var(--primary, #FAF8F2)" : "#0A0A0A";
  const ringHoverBg = isDarkBg ? "rgba(255,255,255,0.08)" : "rgba(10,10,10,0.12)";

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
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="border-2 relative flex items-center justify-center transition-colors duration-200"
          style={{
            borderStyle: "solid",
            imageRendering: "pixelated",
          }}
        >
          {/* Corner pixels */}
          <div className="absolute -top-1 -left-1 w-1 h-1" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -top-1 -right-1 w-1 h-1" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -bottom-1 -left-1 w-1 h-1" style={{ backgroundColor: cursorColor }} />
          <div className="absolute -bottom-1 -right-1 w-1 h-1" style={{ backgroundColor: cursorColor }} />

          {state === "drag" && (
            <span
              className="uppercase select-none font-sans font-extrabold tracking-widest text-[6px]"
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
          className="rounded-none shadow-sm"
          style={{ backgroundColor: cursorColor }}
        />
      </motion.div>
    </>
  );
}
