"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CinematicButton from '@/components/ui/Button';

const InnovationSection: React.FC = () => {
  return (
    <section id="innovation" className="py-24 md:py-36 bg-deep-charcoal/50">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          className="text-5xl md:text-6xl font-cinematic-display mb-4 text-off-white-text text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Built for the next generation.
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-gray mb-16 max-w-3xl mx-auto text-center font-system-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          AI-native payment infrastructure designed for speed, scale, and intelligence.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Agentic Payments',
              desc: 'Turn every chat into a checkout with AI-native payment flows that understand context.',
            },
            {
              title: 'Agent Studio',
              desc: 'Delegate operational work to intelligent agents that get things done autonomously.',
            },
            {
              title: 'Payments for AI Builders',
              desc: 'One-click payment nodes for n8n, Replit, and Vercel workflows.',
            },
            {
              title: 'Turbo UPI',
              desc: '5X faster checkout with 10% higher success rate. No redirections required.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl border border-aura-glow/20 bg-void/60 backdrop-blur-sm hover:border-aura-glow/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h3 className="text-2xl font-cinematic-display text-aura-glow mb-3">{item.title}</h3>
              <p className="text-muted-gray font-system-sans mb-4">{item.desc}</p>
              <CinematicButton className='text-sm'>Learn More</CinematicButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
