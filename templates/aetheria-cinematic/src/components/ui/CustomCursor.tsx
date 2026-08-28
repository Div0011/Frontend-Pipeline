"use client";

import { useEffect, useState } from "react";

type CursorMode = "default" | "artwork" | "text" | "click";

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setMode("click");
    const handleMouseUp = () => setMode("default");

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleTargetChange = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setMode("default");
        return;
      }

      if (
        target.closest("[data-cursor-artwork]") ||
        target.closest(".artwork-card")
      ) {
        setMode("artwork");
      } else if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setMode("text");
      } else {
        setMode("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleTargetChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleTargetChange);
    };
  }, [isClient]);

  if (!isClient) return null;

  const dotSize = mode === "artwork" ? 36 : mode === "click" ? 10 : mode === "text" ? 20 : 8;
  const opacity = mode === "artwork" ? 0.9 : mode === "click" ? 1 : mode === "text" ? 0.6 : 0.5;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[100] transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      {/* Primary Spotlight Cursor Ring */}
      <div
        className="fixed top-0 left-0 rounded-full border border-amber/60 flex items-center justify-center backdrop-blur-[1px] transition-all duration-150 ease-out"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: mode === "artwork" ? "rgba(201, 169, 110, 0.15)" : "transparent",
          transform: `translate3d(${pos.x - dotSize / 2}px, ${pos.y - dotSize / 2}px, 0)`,
          opacity: opacity,
        }}
      >
        {/* Core Amber Center Pinpoint */}
        <div className="w-1.5 h-1.5 rounded-full bg-amber shadow-sm" />
      </div>
    </div>
  );
}
