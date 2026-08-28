"use client";

import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface ZigzagContentProps {
  children: React.ReactNode;
  pathIndex: number;
  totalPoints?: number;
  className?: string;
}

export default function ZigzagContent({
  children,
  pathIndex,
  totalPoints = 7,
  className = "",
}: ZigzagContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const progressStart = pathIndex / totalPoints;
    const progressEnd = (pathIndex + 1) / totalPoints;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 120, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: `top ${progressStart * 100}%`,
            end: `bottom ${progressEnd * 100}%`,
            scrub: 1.2,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [pathIndex, totalPoints]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
