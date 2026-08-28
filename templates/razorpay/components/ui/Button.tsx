"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const cinematicVariants = {
  initial: { scale: 1, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 30px rgba(45, 91, 255, 0.6)',
    transition: { duration: 0.3 }
  }
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CinematicButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const baseClasses = "relative z-10 transition-all duration-300 ease-in-out overflow-hidden bg-transparent border-2 border-aura-glow text-aura-glow hover:bg-aura-glow/10 focus:ring-2 focus:ring-aura-glow/50";
  
  return (
    <motion.button
      variants={cinematicVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={cn(baseClasses, "px-8 py-3 rounded-lg font-space-grotesk text-sm tracking-wide", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default CinematicButton;
