"use client";

import React from 'react';
import { motion } from 'framer-motion';

const StatsSection: React.FC = () => {
  const stats = [
    { value: '1,50,000+', label: 'Businesses' },
    { value: '99.9%', label: 'Uptime' },
    { value: '100+', label: 'Payment Methods' },
    { value: '200+', label: 'Countries' },
  ];

  return (
    <section className="py-20 bg-void/80 border-y border-deep-charcoal/50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-cinematic-display text-aura-glow mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-gray font-space-grotesk tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
