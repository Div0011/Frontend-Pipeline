"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const cursorType = target.getAttribute("data-cursor");
        const cursorLabel = target.getAttribute("data-cursor-label") || "";
        if (cursorType === "hidden") {
          setIsHidden(true);
        } else {
          setIsHidden(false);
          setIsHovered(true);
          setLabel(cursorLabel);
        }
      } else {
        setIsHovered(false);
        setIsHidden(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 bg-[#f5d061] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        ref={ringRef}
        className={`fixed top-0 left-0 border border-[#f5d061]/60 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ${
          isHidden
            ? "opacity-0 scale-0"
            : isHovered
            ? "w-20 h-20 bg-[#f5d061]/15 border-[#f5d061] backdrop-blur-[1px]"
            : "w-10 h-10 bg-transparent"
        }`}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#f5d061] font-bold">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
