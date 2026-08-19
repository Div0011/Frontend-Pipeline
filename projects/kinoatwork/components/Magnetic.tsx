"use client";

import { useEffect, useRef, ReactElement, cloneElement } from "react";
import { gsap } from "gsap";

interface MagneticProps {
  children: ReactElement;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 50, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use gsap.quickTo for high-performance updates
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const distanceX = clientX - x;
      const distanceY = clientY - y;
      
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Pull element towards mouse
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        // Snap back to original position
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

  return cloneElement(children, { ref } as any);
}
