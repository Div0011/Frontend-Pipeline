"use client";

import React from 'react';
import { motion } from 'framer-motion';

const DeveloperSection: React.FC = () => {
  return (
    <section id="developers" className="py-24 md:py-36 bg-void">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-cinematic-display mb-6 text-off-white-text">
              Built for developers.<br />
              <span className="text-aura-glow">By developers.</span>
            </h2>
            <p className="text-xl text-muted-gray mb-8 font-system-sans leading-relaxed">
              SDKs for every major platform. Comprehensive REST APIs. Webhooks for real-time events. OpenAPI specs. We handle the payments infrastructure so you can focus on building your product.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Node.js', 'Python', 'PHP', 'Java', 'Go', 'Ruby'].map((lang) => (
                <span key={lang} className="px-4 py-2 text-sm font-tech-mono text-aura-glow border border-aura-glow/30 rounded-lg bg-aura-glow/5">
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-deep-charcoal/80 rounded-2xl p-6 border border-aura-glow/20 backdrop-blur-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-4 text-xs text-muted-gray font-tech-mono">quickstart.js</span>
            </div>
            <pre className="text-sm text-off-white-text/90 font-tech-mono overflow-x-auto">
              <code>{`const Razorpay = require('razorpay');

const rzp = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});

const payment = await rzp.orders.create({
  amount: 500,
  currency: 'INR',
  receipt: 'order_rcptid_11',
});`}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
