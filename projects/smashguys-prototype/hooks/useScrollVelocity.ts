"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const dy = Math.abs(window.scrollY - lastScroll.current);
        const v = dy / dt;
        setVelocity(v);
      }
      lastScroll.current = window.scrollY;
      lastTime.current = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return velocity;
}
