"use client";

import React from 'react';
import { motion } from 'framer-motion';

const industries = [
  {
    name: 'E-commerce',
    desc: 'Unified dashboard for online + in-person payments, higher conversion, fraud minimization.',
  },
  {
    name: 'SaaS',
    desc: 'Accept payments in 100+ currencies, subscriptions, vendor payouts.',
  },
  {
    name: 'Education',
    desc: 'Fee payments and vendor payouts for institutions, tutorials, and online courses.',
  },
  {
    name: 'BFSI',
    desc: 'Collection management, recurring payments, loan disbursement.',
  },
  {
    name: 'Freelancers',
    desc: 'Accept payments without a website or coding expertise.',
  },
  {
    name: 'Enterprises',
    desc: 'Scalable payment infrastructure with dedicated support and SLAs.',
  },
];

const IndustrySection: React.FC = () => {
  return (
    <section id="solutions" className="py-24 md:py-36 bg-deep-charcoal/30">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          className="text-5xl md:text-6xl font-cinematic-display mb-4 text-off-white-text text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Solutions for every industry.
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-gray mb-16 max-w-3xl mx-auto text-center font-system-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Purpose-built tools for businesses of all sizes and sectors.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-deep-charcoal/60 bg-void/40 backdrop-blur-sm hover:border-aura-glow/30 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <h3 className="text-xl font-cinematic-display text-off-white-text mb-2 group-hover:text-aura-glow transition-colors">
                {industry.name}
              </h3>
              <p className="text-muted-gray text-sm font-system-sans">{industry.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
