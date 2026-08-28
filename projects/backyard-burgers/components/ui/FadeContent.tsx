"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
  delay?: number;
}

export default function FadeContent({
  children,
  duration = 0.6,
  initialOpacity = 0,
  className = "",
  delay = 0,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: initialOpacity,
        transform: "translateY(16px)",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              transform: "translateY(0px)",
            }
          : {
              opacity: initialOpacity,
              transform: "translateY(16px)",
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
