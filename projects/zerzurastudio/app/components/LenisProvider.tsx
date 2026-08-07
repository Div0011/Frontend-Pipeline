"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
  onScroll,
}: {
  children: React.ReactNode;
  onScroll?: (progress: number) => void;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      if (onScroll && e.limit) {
        const progress = e.scroll / e.limit;
        onScroll(Math.max(0, Math.min(1, progress)));
      }
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [onScroll]);

  return <div className="relative">{children}</div>;
}
