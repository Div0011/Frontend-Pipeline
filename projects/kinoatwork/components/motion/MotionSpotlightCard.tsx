"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface MotionSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export default function MotionSpotlightCard({
  children,
  className = "",
  onClick,
  onMouseEnter,
}: MotionSpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a09] p-6 cursor-pointer ${className}`}
    >
      {/* Motion Radial Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 168, 75, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Border Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-[#d4a84b]/40"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
