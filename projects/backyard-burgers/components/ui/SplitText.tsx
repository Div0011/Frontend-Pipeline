"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; y?: number };
  animationTo?: { opacity: number; y?: number };
  textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text = "",
  className = "",
  delay = 40,
  animationFrom = { opacity: 0, y: 25 },
  animationTo = { opacity: 1, y: 0 },
  textAlign = "left",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const words = text.split(" ").map((word) => word.split(""));
  const letters = words.flat();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <p
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.map((letter, letterIndex) => {
            const index =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;
            return (
              <motion.span
                key={index}
                initial={{ opacity: animationFrom.opacity, y: animationFrom.y ?? 25, filter: "blur(4px)" }}
                animate={
                  inView
                    ? { opacity: animationTo.opacity, y: animationTo.y ?? 0, filter: "blur(0px)" }
                    : { opacity: animationFrom.opacity, y: animationFrom.y ?? 25, filter: "blur(4px)" }
                }
                transition={{
                  duration: 0.45,
                  delay: (index * delay) / 1000,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                onAnimationComplete={
                  index === letters.length - 1 ? onLetterAnimationComplete : undefined
                }
                style={{ display: "inline-block", willChange: "transform, opacity" }}
              >
                {letter}
              </motion.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
}
