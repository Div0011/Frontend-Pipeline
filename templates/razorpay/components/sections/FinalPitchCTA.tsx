"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CinematicButton from '@/components/ui/Button';

const FinalPitchCTA: React.FC = () => {
  return (
    <section id="cta" className="py-32 md:py-40 bg-void relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-aura-glow/5 to-transparent pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-cinematic-display mb-6 text-off-white-text"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Ready to power your payments?
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-gray mb-10 max-w-3xl mx-auto font-system-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Join 1,50,000+ businesses that trust Razorpay for payments, banking, and payroll.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <CinematicButton className='px-10 py-4 text-lg'>
            Start Now for Free
          </CinematicButton>
          <CinematicButton className='px-10 py-4 text-lg border-muted-gray/50 text-muted-gray hover:text-off-white-text'>
            Talk to Sales
          </CinematicButton>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalPitchCTA;
