"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import CinematicButton from '@/components/ui/Button';

const Hero3D = dynamic(() => import('@/components/three/Hero3D'), { ssr: false });

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden bg-void">
      <Hero3D />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(45, 91, 255, 0.05) 0px, transparent 1px)' }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-20">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-cinematic-display text-off-white-text leading-[0.95] mb-6 tracking-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <span className="block">India's All-in-One</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aura-glow to-blue-400 mt-2">
            Finance Platform.
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-gray mb-12 max-w-3xl mx-auto font-system-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }} 
        >
          Accept payments, make payouts, manage banking, automate payroll, and access credit — all from a single platform.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <CinematicButton className='px-10 py-4 text-lg'>
            Start Now
          </CinematicButton>
          <button 
             className="border border-muted-gray/50 text-muted-gray hover:bg-deep-charcoal/50 px-8 py-4 transition duration-200 text-lg">
              Contact Sales
          </button>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-muted-gray/70 font-tech-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Trusted by 1,50,000+ businesses across India
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
