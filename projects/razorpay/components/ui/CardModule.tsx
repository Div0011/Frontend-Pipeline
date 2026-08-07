"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const pillarVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

interface CardModuleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const PillarCardModule: React.FC<CardModuleProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={cn("bg-deep-charcoal/80 border border-transparent hover:border-aura-glow/30 transition-all duration-300 p-8 rounded-2xl shadow-lg backdrop-blur-sm", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={pillarVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PillarCardModule;
