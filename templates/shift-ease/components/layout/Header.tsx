'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Truck, ShieldCheck, PlusCircle } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/directory', label: 'Directory' },
    { href: '/quote', label: 'Instant Quote' },
    { href: '/cities', label: 'Top Cities' },
    { href: '/blog', label: 'Moving Guides' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },

  ];

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-tr from-teal to-teal/80 rounded-xl flex items-center justify-center shadow-lg shadow-teal/20 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-white">ShiftEase</span>
                <span className="badge bg-teal/20 text-teal text-[10px] uppercase font-bold py-0.5 px-2">Verified</span>
              </div>
              <span className="text-xs text-slate-400 block tracking-wide -mt-1 font-medium">by Sheetal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative py-1 ${
                    isActive ? 'text-teal font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-full animate-in fade-in zoom-in duration-200"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/list-your-business"
              className="text-xs font-semibold text-slate-300 hover:text-teal px-3 py-2 rounded-lg border border-slate-700 hover:border-teal/50 transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-teal" /> Partner Registration
            </Link>
            <Link href="/quote" className="btn-primary text-sm font-semibold shadow-lg shadow-teal/20">
              Calculate Cost
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-teal focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy/98 border-t border-slate-800 text-white animate-in slide-in-from-top-4 duration-200">
          <div className="container-custom py-6">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium py-2.5 px-3 rounded-lg transition-colors ${
                      isActive ? 'bg-teal/20 text-teal font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
                <Link
                  href="/list-your-business"
                  className="btn-outline text-center text-sm py-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register Business (Vendors)
                </Link>
                <Link
                  href="/quote"
                  className="btn-primary text-center text-sm py-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Instant Moving Quote
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}