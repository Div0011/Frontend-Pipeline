"use client";

import { motion } from "framer-motion";

interface MotionStaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function MotionStaggerText({
  text,
  className = "",
  delay = 0,
}: MotionStaggerTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
