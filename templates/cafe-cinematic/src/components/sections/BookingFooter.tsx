'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Clock, Mail, Phone, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BookingFooterProps {
  onOpenReservation?: () => void;
}

export function BookingFooter({ onOpenReservation }: BookingFooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenReservation?.();
  };

  useEffect(() => {
    const container = containerRef.current;
    const booking = bookingRef.current;
    const footer = footerRef.current;
    if (!container || !booking || !footer) return;

    // Footer starts hidden
    gsap.set(footer, { opacity: 0, y: 50 });
    gsap.set(booking, { opacity: 1, y: 0 });

    const ctx = gsap.context(() => {
      // The container is 220vh tall; the inner sticky div stays pinned.
      // We track the container's scroll to drive the booking → footer swap.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      // 0 → 0.45: booking fades out & slides up
      tl.to(booking, { opacity: 0, y: -70, ease: 'power2.inOut', duration: 0.45 }, 0);
      // 0.25 → 0.7: footer fades in from below
      tl.to(footer, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.45 }, 0.25);

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    /* ── Outer container: 220vh gives us the scroll travel ── */
    <div ref={containerRef} className="relative h-[220vh]">

      {/* ── CSS sticky: stays pinned for the full 220vh ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/coffee-mug-table.mp4" type="video/mp4" />
        </video>

        {/* Left-heavy gradient overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-cafe-dark/95 via-cafe-dark/70 to-cafe-dark/20" />

        {/* ── BOOKING PANEL (left-aligned) ── */}
        <div
          ref={bookingRef}
          className="absolute inset-0 z-20 flex items-center px-8 sm:px-16 md:px-20 will-change-transform"
        >
          <div className="max-w-lg w-full">
            <div className="chapter-tag text-cafe-accent mb-6">Reserve</div>
            <h2
              className="font-display font-normal text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.025em' }}
            >
              Book a{' '}
              <em className="italic" style={{ color: '#C4A77D' }}>Slow Moment</em>
            </h2>
            <p className="font-body font-light text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Reserve a table for morning pour-overs, afternoon cake flights, or private tastings.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.6rem] font-bold uppercase tracking-wider text-white/40 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/8 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/25 focus:border-cafe-accent focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[0.6rem] font-bold uppercase tracking-wider text-white/40 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/8 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/25 focus:border-cafe-accent focus:outline-none"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[0.6rem] font-bold uppercase tracking-wider text-white/40 mb-1.5">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-lg text-white text-sm focus:border-cafe-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.6rem] font-bold uppercase tracking-wider text-white/40 mb-1.5">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-lg text-white text-sm focus:border-cafe-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.6rem] font-bold uppercase tracking-wider text-white/40 mb-1.5">Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-lg text-white text-sm focus:border-cafe-accent focus:outline-none"
                  >
                    {['1', '2', '3', '4', '5', '6'].map((n) => (
                      <option key={n} value={n} className="bg-cafe-dark">
                        {n} guest{parseInt(n) > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-2d-primary flex items-center gap-2 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>
            </form>

            <div className="mt-7 pt-5 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2.5 text-[0.72rem] text-white/35">
                <MapPin className="w-3 h-3 text-cafe-accent shrink-0" />
                <span>123 Coffee Lane, Soho, New York NY 10013</span>
              </div>
              <div className="flex items-center gap-2.5 text-[0.72rem] text-white/35">
                <Clock className="w-3 h-3 text-cafe-accent shrink-0" />
                <span>Mon–Fri 07:00–20:00 · Sat–Sun 08:00–21:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER PANEL (left-aligned, fades in on scroll) ── */}
        <div
          ref={footerRef}
          className="absolute inset-0 z-20 flex items-center px-8 sm:px-16 md:px-20 will-change-transform pointer-events-none"
        >
          <div className="max-w-xl w-full pointer-events-auto">
            {/* Ghost brand wordmark */}
            <div className="mb-10">
              <p className="text-[0.55rem] font-mono tracking-[0.35em] uppercase text-white/25 mb-3">
                Artisanal Roastery &amp; Dawn Hearth Bakery
              </p>
              <h2 className="font-display text-6xl sm:text-8xl font-normal leading-none tracking-tight text-white/10">
                CAFE<br />COFFEE
              </h2>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-10 text-[0.72rem] text-white/40 mb-9">
              <div className="space-y-3">
                <p className="text-white/65 font-semibold uppercase tracking-widest text-[0.55rem]">Visit</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3 h-3 text-cafe-accent shrink-0 mt-0.5" />
                  <span className="leading-relaxed">123 Coffee Lane, Arts District<br />Soho, New York, NY 10013</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3 h-3 text-cafe-accent shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Mon–Fri: 07:00–20:00<br />Sat–Sun: 08:00–21:00</span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-white/65 font-semibold uppercase tracking-widest text-[0.55rem]">Contact</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-cafe-accent shrink-0" />
                  <a href="mailto:hello@cafecoffee.com" className="hover:text-cafe-accent transition-colors">hello@cafecoffee.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-cafe-accent shrink-0" />
                  <a href="tel:+12125550147" className="hover:text-cafe-accent transition-colors">+1 (212) 555-0147</a>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-3 h-3 shrink-0" />
                  <a href="#" className="hover:text-cafe-accent transition-colors">X / Twitter</a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/8 pt-5">
              <p className="text-[0.55rem] font-mono tracking-widest text-white/18 uppercase">
                &copy; {new Date().getFullYear()} CAFE COFFEE. All rights reserved. · Crafted with slow intention.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
