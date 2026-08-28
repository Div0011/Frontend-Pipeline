"use client";

import { useRef, useEffect, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;
    let trailX = 0;
    let trailY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches("a, button, .cursor-hover, input, textarea, [role='button']") ||
        target.closest("a, button, .cursor-hover")
      ) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches("a, button, .cursor-hover, input, textarea, [role='button']") ||
        target.closest("a, button, .cursor-hover")
      ) {
        setHovering(false);
      }
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(raf);
    };
  }, [visible, isTouch]);

  if (isTouch) return null;

  return (
    <>
      <style>{`
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #C9A96E;
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 99999;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.3s ease,
                      border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .custom-cursor.hovering {
          width: 64px;
          height: 64px;
          background: rgba(201, 169, 110, 0.1);
          border: 2px solid #C9A96E;
        }
        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(201, 169, 110, 0.5);
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 99998;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease;
          will-change: transform;
        }
        .custom-cursor-ring.hovering {
          width: 80px;
          height: 80px;
          border-color: rgba(201, 169, 110, 0.9);
        }
        .custom-cursor-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.08);
          pointer-events: none;
          z-index: 99997;
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .custom-cursor-trail.hovering {
          width: 100px;
          height: 100px;
          background: rgba(201, 169, 110, 0.05);
        }
      `}</style>
      <div
        ref={trailRef}
        className={`custom-cursor-trail ${visible ? "opacity-100" : "opacity-0"} ${hovering ? "hovering" : ""}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${visible ? "opacity-100" : "opacity-0"} ${hovering ? "hovering" : ""}`}
      />
      <div
        ref={cursorRef}
        className={`custom-cursor ${visible ? "opacity-100" : "opacity-0"} ${hovering ? "hovering" : ""}`}
      />
    </>
  );
}
