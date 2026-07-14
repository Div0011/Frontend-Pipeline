"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const over = () => setHover(true);
    const out = () => setHover(false);

    window.addEventListener("mousemove", move, { passive: true });
    const interactive = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-hover'
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
    };
  }, [visible]);

  if (typeof window === "undefined" || !visible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
        style={{ mixBlendMode: "difference" }}
      >
        <div
          className="absolute top-0 left-0 rounded-full bg-white transition-transform duration-150 ease-out"
          style={{
            width: hover ? 64 : 24,
            height: hover ? 64 : 24,
            transform: `translate3d(${pos.x - (hover ? 32 : 12)}px, ${
              pos.y - (hover ? 32 : 12)
            }px, 0)`,
          }}
        />
      </div>
    </>
  );
}
