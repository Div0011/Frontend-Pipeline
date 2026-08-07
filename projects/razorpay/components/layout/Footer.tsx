"use client";

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-charcoal pt-20 pb-8 border-t border-deep-charcoal">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className='text-3xl font-cinematic-display text-off-white-text mb-4'>RAZOR<span className='text-aura-glow'>PAY</span></h3>
            <p className='text-muted-gray max-w-xs text-sm'>India's most trusted payments and banking platform for businesses of all sizes.</p>
          </div>
          <div>
            <h4 className='text-xl font-space-grotesk mb-6 text-off-white-text'>Products</h4>
            <ul className='space-y-3 text-sm'>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>Payment Gateway</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>RazorpayX</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>Payroll</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>Subscriptions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className='text-xl font-space-grotesk mb-6 text-off-white-text'>Developers</h4>
            <ul className='space-y-3 text-sm'>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>API Reference</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>SDKs</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>Webhooks</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>GitHub</Link></li>
            </ul>
          </div>
          <div>
            <h4 className='text-xl font-space-grotesk mb-6 text-off-white-text'>Company</h4>
            <ul className='space-y-3 text-sm'>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>About Us</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>Careers</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>Blog</Link></li>
              <li><Link href="#" className='text-muted-gray hover:text-aura-glow transition duration-200'>Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className='mt-12 pt-8 border-t border-deep-charcoal/50 text-center text-sm text-muted-gray'>
          &copy; {new Date().getFullYear()} Razorpay. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
