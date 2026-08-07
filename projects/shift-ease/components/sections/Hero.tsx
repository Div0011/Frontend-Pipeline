'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Search, ShieldCheck, Star, Users, CheckCircle } from 'lucide-react';

export default function Hero() {
  const [selectedCity, setSelectedCity] = useState('');
  const router = useRouter();

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCity) {
      router.push(`/directory?city=${encodeURIComponent(selectedCity)}`);
    } else {
      router.push('/directory');
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy text-white pt-8 pb-20">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      <div className="relative container-custom z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-teal/30 text-teal text-xs md:text-sm font-semibold mb-6 shadow-inner"
          >
            <ShieldCheck className="w-4 h-4 text-teal animate-pulse" />
            <span>India&apos;s #1 Verified Packers & Movers Portal</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-xl text-white mb-6 leading-tight"
          >
            Seamless Home & Office Relocation, <span className="text-teal underline decoration-teal/40 underline-offset-8">Stress-Free</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Compare verified quotes from GST-compliant moving partners in Delhi, Mumbai, Bangalore, and across India. No hidden charges.
          </motion.p>

          {/* Quick Search Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-900/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl border border-slate-800 shadow-2xl max-w-3xl mx-auto mb-10"
          >
            <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-slate-800/80 rounded-xl px-4 py-3 border border-slate-700 w-full">
                <MapPin className="text-teal w-5 h-5 flex-shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-white w-full outline-none text-sm cursor-pointer"
                  aria-label="Select City"
                >
                  <option value="" className="bg-slate-900 text-slate-300">Select Your City...</option>
                  <option value="Delhi" className="bg-slate-900 text-white">Delhi NCR</option>
                  <option value="Mumbai" className="bg-slate-900 text-white">Mumbai</option>
                  <option value="Bangalore" className="bg-slate-900 text-white">Bangalore</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg shadow-teal/20"
              >
                <Search className="w-4 h-4" /> Search Verified Movers
              </button>
            </form>
          </motion.div>

          {/* Quick Action Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 text-sm font-medium"
          >
            <Link href="/quote" className="inline-flex items-center gap-2 text-teal hover:text-white transition-colors bg-teal/10 hover:bg-teal/20 px-5 py-2.5 rounded-full border border-teal/30">
              Calculate Moving Cost Range <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/directory" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-slate-800/60 hover:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-700">
              Explore All Directory Listings
            </Link>
          </motion.div>
        </div>

        {/* Live Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 max-w-4xl mx-auto pt-8 border-t border-slate-800/80"
        >
          <div className="text-center p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl md:text-3xl font-display font-extrabold text-teal">15,000+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-teal" /> Happy Relocations
            </div>
          </div>

          <div className="text-center p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl md:text-3xl font-display font-extrabold text-white">4.8 / 5</div>
            <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> Customer Rating
            </div>
          </div>

          <div className="text-center p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl md:text-3xl font-display font-extrabold text-teal">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-teal" /> GST & Audit Verified
            </div>
          </div>

          <div className="text-center p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl md:text-3xl font-display font-extrabold text-white">₹0</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Free Quote Guarantee</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}