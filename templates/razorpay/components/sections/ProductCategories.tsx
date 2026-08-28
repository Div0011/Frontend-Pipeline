"use client";

import React from 'react';
import { motion } from 'framer-motion';
import PillarCardModule from '@/components/ui/CardModule';
import CustomEmoji from '@/components/ui/CustomEmoji';

interface Product {
  title: string;
  description: string;
  icon: 'payment' | 'business' | 'payroll' | 'credit' | 'security' | 'globe';
}

const products: Product[] = [
  {
    title: 'Payment Gateway',
    description: 'Accept payments online with 100+ payment methods including UPI, cards, netbanking, and wallets.',
    icon: 'payment',
  },
  {
    title: 'RazorpayX',
    description: 'Supercharged business banking with current accounts, payouts, and automated compliance.',
    icon: 'business',
  },
  {
    title: 'Payroll',
    description: 'Automate salary processing, tax compliance, and direct bank transfers for your team.',
    icon: 'payroll',
  },
  {
    title: 'Corporate Cards',
    description: 'Turn SaaS, cloud, and marketing spends into real savings with smart limits.',
    icon: 'credit',
  },
  {
    title: 'Subscriptions',
    description: 'Flexible recurring billing with smart retries, dunning, and revenue recovery.',
    icon: 'security',
  },
  {
    title: 'Global Payments',
    description: 'Accept payments in 100+ currencies from customers worldwide with ease.',
    icon: 'globe',
  },
];

const ProductCategories: React.FC = () => {
  return (
    <section id="products" className="py-24 md:py-36 bg-void">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          className="text-5xl md:text-6xl font-cinematic-display mb-4 text-off-white-text text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          One platform. Every payment.
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-gray mb-16 max-w-3xl mx-auto text-center font-system-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          From checkout to compliance, everything you need to run your business — in one place.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <PillarCardModule className="flex flex-col h-full">
                <CustomEmoji name={product.icon} className="mb-4" />
                <h3 className="text-2xl font-cinematic-display text-off-white-text mb-3">{product.title}</h3>
                <p className="text-muted-gray font-system-sans leading-relaxed">{product.description}</p>
              </PillarCardModule>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
