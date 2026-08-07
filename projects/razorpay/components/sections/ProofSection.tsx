"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CinematicButton from '@/components/ui/Button';

const ProofSection: React.FC = () => {
  return (
    <section id="proof" className="py-24 md:py-36 bg-void/80">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          className="text-5xl md:text-6xl font-cinematic-display mb-4 text-off-white-text text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Trusted by India's best.
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-gray mb-16 max-w-3xl mx-auto text-center font-system-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Swiggy, Zomato, BookMyShow, Zepto, Lenskart, and thousands of fast-growing businesses.
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center items-center gap-10 md:gap-16 py-12 border-y border-deep-charcoal/50 mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {['Swiggy', 'Zomato', 'BookMyShow', 'Zepto', 'Lenskart', 'Nykaa', 'BigBasket', 'Pharmeasy'].map((logo, index) => (
            <motion.div 
              key={index} 
              className="text-xl md:text-2xl font-space-grotesk text-muted-gray/70 hover:text-aura-glow transition cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true, amount: 0.2 }}
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <blockquote className="text-3xl md:text-4xl italic text-off-white-text/90 max-w-4xl mx-auto font-cinematic-display">
            "Razorpay has been instrumental in scaling our payment infrastructure. Their checkout experience is best-in-class."
          </blockquote>
          <p className='mt-6 text-lg font-space-grotesk text-aura-glow'>— CTO, Leading E-commerce Platform</p>
        </motion.div>

        <motion.div 
           className="text-center"
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }} 
           viewport={{ once: true, amount: 0.5 }}
           transition={{ delay: 0.5, duration: 0.8 }}
        >
          <CinematicButton className='px-12 py-3 text-base'>
            View Customer Stories
          </CinematicButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;
