"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);
  const animRef = useRef<number>(0);
  const currentPos = useRef({ x: -200, y: -200 });
  const targetPos = useRef({ x: -200, y: -200 });

  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const media = window.matchMedia("(pointer: fine)");
    setIsPointerFine(media.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };

    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isClient || !isPointerFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleTargetChange = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovered(false);
        return;
      }

      // Check if target or parent is an interactive option or clickable element
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest("label") ||
        target.closest("[role='button']") ||
        target.closest("[data-cursor-hover]") ||
        target.closest(".product-card") ||
        target.closest(".category-link")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Smooth trailing interpolation
    const animateTrail = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.2;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.2;
      setTrail({ ...currentPos.current });
      animRef.current = requestAnimationFrame(animateTrail);
    };
    animRef.current = requestAnimationFrame(animateTrail);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleTargetChange);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleTargetChange);
    };
  }, [isClient, isPointerFine]);

  if (!isClient || !isPointerFine) return null;

  // Dot dimensions: default 10px white dot; expands to 34px on options
  const dotSize = isHovered ? 34 : 10;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[999999]"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 300ms" }}
      aria-hidden="true"
    >
      <div
        className="fixed top-0 left-0 rounded-full bg-[#D4654A] shadow-lg flex items-center justify-center"
        style={{
          width: dotSize,
          height: dotSize,
          transform: `translate3d(${trail.x - dotSize / 2}px, ${trail.y - dotSize / 2}px, 0)`,
          opacity: isHovered ? 0.9 : 1,
          boxShadow: isHovered
            ? "0 0 18px 6px rgba(212,101,74,0.8)"
            : "0 0 10px 2px rgba(212,101,74,0.9)",
          transition:
            "width 300ms cubic-bezier(0.34, 1.56, 0.64, 1), height 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease, box-shadow 300ms ease",
        }}
      />
    </div>
  );
}
