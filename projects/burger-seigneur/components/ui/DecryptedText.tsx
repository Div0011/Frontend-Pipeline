"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
  revealDirection?: "start" | "end" | "center";
  sequential?: boolean;
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-[#418043] opacity-70",
  animateOn = "view",
  revealDirection = "start",
  sequential = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
        setDisplayText(text);
      }

      iteration += 1 / (maxIterations / 2);
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view" && inView) {
      scramble();
    }
  }, [inView, animateOn]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => {
        if (animateOn === "hover") scramble();
      }}
      className={`inline-block cursor-default select-none ${parentClassName}`}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
