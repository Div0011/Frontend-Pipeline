"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const dot = dotRef.current;
    if (!outer || !dot) return;

    if (window.matchMedia("(pointer: coarse)").matches) {
      outer.style.display = "none";
      dot.style.display = "none";
      return;
    }

    outer.style.display = "flex";
    dot.style.display = "block";

    const outerXTo = gsap.quickTo(outer, "x", { duration: 0.35, ease: "power3.out" });
    const outerYTo = gsap.quickTo(outer, "y", { duration: 0.35, ease: "power3.out" });
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      outerXTo(e.clientX);
      outerYTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [data-cursor], [data-cursor-text]");

      if (interactiveEl) {
        const text = interactiveEl.getAttribute("data-cursor-text") || interactiveEl.getAttribute("data-cursor") || "";

        if (text) {
          setCursorText(text);
          setIsActive(true);
          gsap.to(outer, {
            scale: 2.5,
            backgroundColor: "rgba(245, 196, 24, 0.95)",
            borderColor: "transparent",
            mixBlendMode: "normal",
            duration: 0.25,
            ease: "power2.out",
          });
          gsap.to(dot, { opacity: 0, duration: 0.15 });
        } else {
          setIsActive(false);
          setCursorText("");
          gsap.to(outer, {
            scale: 1.8,
            backgroundColor: "rgba(245, 196, 24, 0.15)",
            borderColor: "#f5c418",
            mixBlendMode: "normal",
            duration: 0.25,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 1.5, duration: 0.2 });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;

      const currentInteractive = target.closest("a, button, [data-cursor], [data-cursor-text]");
      const nextInteractive = relatedTarget ? relatedTarget.closest("a, button, [data-cursor], [data-cursor-text]") : null;

      if (currentInteractive && currentInteractive !== nextInteractive) {
        setIsActive(false);
        setCursorText("");
        gsap.to(outer, {
          scale: 1.0,
          backgroundColor: "transparent",
          borderColor: "#f5c418",
          mixBlendMode: "normal",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, { opacity: 1, scale: 1.0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cinema-accent pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Outer Ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cinema-accent pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[8px] font-mono tracking-widest text-center uppercase overflow-hidden select-none transition-opacity duration-300 hidden md:flex"
      >
        <span className={`transition-opacity duration-200 text-cinema-bg font-bold ${isActive ? "opacity-100" : "opacity-0"}`}>
          {cursorText}
        </span>
      </div>
    </>
  );
}
