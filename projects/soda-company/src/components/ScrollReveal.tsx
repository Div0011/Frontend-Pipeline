"use client";

import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children?: React.ReactNode;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  className?: string;
  style?: React.CSSProperties;
};

const ScrollReveal = ({
  children,
  baseOpacity = 0.1,
  enableBlur = false,
  baseRotation = 3,
  blurStrength = 4,
  className = "",
  style,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? "scroll-reveal--visible" : ""} ${className}`}
      style={{
        opacity: isVisible ? 1 : baseOpacity,
        filter: enableBlur
          ? isVisible
            ? "blur(0px)"
            : `blur(${blurStrength}px)`
          : undefined,
        transform: isVisible
          ? "rotate(0deg) translateY(0)"
          : `rotate(${baseRotation}deg) translateY(24px)`,
        transition:
          "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.8s cubic-bezier(0.22,1,0.36,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
