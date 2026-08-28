"use client";

import React from "react";

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerColor?: string;
}

export default function ShinyText({
  text,
  className = "",
  shimmerColor = "#ffffff",
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block font-extrabold tracking-normal ${className}`}
      style={{
        color: shimmerColor,
        textShadow: `0 0 20px ${shimmerColor}35`,
      }}
    >
      {text}
    </span>
  );
}
