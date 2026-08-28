"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const visibleRef = useRef(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 380, damping: 30, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 380, damping: 30, mass: 0.4 });
  const dotX = useSpring(rawX, { stiffness: 1000, damping: 48, mass: 0.1 });
  const dotY = useSpring(rawY, { stiffness: 1000, damping: 48, mass: 0.1 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovered(true);
        setHoverText(interactive.getAttribute("data-cursor") || "");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    const handleLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [isFinePointer, rawX, rawY]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4ff00] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: isHovered ? 0 : 1, opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4ff00]/50 bg-[#d4ff00]/[0.06] backdrop-blur-[2px]"
        style={{ x, y }}
        animate={{
          width: isHovered ? 88 : 36,
          height: isHovered ? 88 : 36,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {hoverText ? (
          <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#d4ff00] uppercase">
            {hoverText}
          </span>
        ) : null}
      </motion.div>
    </>
  );
}
