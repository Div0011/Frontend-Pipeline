"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 380, damping: 28, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.2 });

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, [role='button'], input, select, .interactive, [data-cursor]"
      ) as HTMLElement | null;

      setHovered(!!interactive);
      setLabel(interactive?.dataset.cursor ?? "");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  const size = hovered ? 56 : 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden overflow-hidden md:block">
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-[#c9a96e]/70"
        style={{
          x: ringX,
          y: ringY,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          opacity: visible ? 1 : 0,
          backgroundColor: hovered ? "rgba(201,169,110,0.12)" : "transparent",
          boxShadow: hovered ? "0 0 24px rgba(201,169,110,0.25)" : "none",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        {label ? (
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#c9a96e]">
            {label}
          </span>
        ) : null}
      </motion.div>

      <motion.div
        className="absolute rounded-full bg-[#c9a96e]"
        style={{
          x: dotX,
          y: dotY,
          width: hovered ? 4 : 6,
          height: hovered ? 4 : 6,
          marginLeft: hovered ? -2 : -3,
          marginTop: hovered ? -2 : -3,
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 12px rgba(201,169,110,0.55)",
        }}
      />
    </div>
  );
}
