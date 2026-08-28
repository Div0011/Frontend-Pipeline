"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAdaptiveTheme } from "@/components/AdaptiveThemeProvider";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const { theme } = useAdaptiveTheme();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ripple = rippleRef.current;
    if (!dot || !ring || !ripple) return;

    const onMouseMove = (e: MouseEvent) => {
      // Dot follows tightly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: "power2.out",
      });
      // Ring follows with more lag
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power2.out",
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      // Click ripple
      gsap.set(ripple, { x: e.clientX, y: e.clientY, scale: 0, opacity: 0.5 });
      gsap.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      // Compress dot
      gsap.to(dot, { scale: 0.6, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" });
    };

    const onEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      const label = target.getAttribute("data-cursor-label") || "";
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 2.5, borderWidth: "1px", duration: 0.3, ease: "power2.out" });
    };

    const onLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 1, borderWidth: "1.5px", duration: 0.3, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: "translate(-50%, -50%)",
          backgroundColor: theme.lightA,
          boxShadow: `0 0 12px ${theme.lightA}80`,
          transition: "background-color 0.6s ease, box-shadow 0.6s ease",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          transform: "translate(-50%, -50%)",
          border: `1.5px solid ${theme.lightA}60`,
          transition: "border-color 0.6s ease",
        }}
      />
      {/* Click ripple */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          transform: "translate(-50%, -50%) scale(0)",
          border: `1px solid ${theme.lightA}40`,
          opacity: 0,
        }}
      />
    </>
  );
}
