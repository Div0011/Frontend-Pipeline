"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    if (!cursor || !cursorText) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const label = target.getAttribute("data-cursor-label") || "";
      gsap.to(cursor, { scale: 3, duration: 0.3, ease: "power2.out" });
      cursorText.textContent = label;
      gsap.to(cursorText, { opacity: 1, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(cursorText, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-[#d4a574] rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div
        ref={cursorTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4px] text-black uppercase tracking-widest whitespace-nowrap opacity-0 font-mono"
      />
    </div>
  );
}
