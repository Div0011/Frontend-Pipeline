"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from '@/components/ui/CustomCursor';
import CinematicButton from '@/components/ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-void/80 border-b border-deep-charcoal/50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="#" className="text-2xl font-cinematic-display text-off-white-text tracking-widest cursor-pointer">
            RAZOR<span className='text-aura-glow'>PAY</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-10 text-sm font-space-grotesk tracking-wider">
            {['Products', 'Solutions', 'Developers', 'Pricing', 'Resources'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-gray hover:text-off-white-text transition duration-200 cursor-pointer relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className='absolute bottom-0 left-0 w-full h-[1px] bg-aura-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <CinematicButton className='px-6 py-2 text-sm'>Sign Up</CinematicButton>
            <Link href="#" className="text-sm text-muted-gray hover:text-off-white-text transition">Login</Link>
          </div>

          <button 
            className="md:hidden text-off-white-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-deep-charcoal/95 backdrop-blur-sm border-t border-aura-glow/10"
            >
              <div className="px-8 py-6 space-y-4">
                {['Products', 'Solutions', 'Developers', 'Pricing', 'Resources'].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-lg font-space-grotesk text-muted-gray hover:text-aura-glow transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 pt-4">
                  <CinematicButton className='w-full px-6 py-3 text-sm'>Sign Up</CinematicButton>
                  <Link href="#" className="text-center text-sm text-muted-gray hover:text-off-white-text transition">Login</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
