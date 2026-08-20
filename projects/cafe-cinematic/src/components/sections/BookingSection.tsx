'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Mail } from 'lucide-react';

interface BookingSectionProps {
  onOpenReservation?: () => void;
}

export function BookingSection({ onOpenReservation }: BookingSectionProps) {
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

  return (
    <section
      id="booking"
      className="relative min-h-screen w-full bg-cafe-bg flex items-center overflow-hidden"
    >
      {/* Minimal grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left — Form */}
          <div className="space-y-8">
            <div>
              <span className="chapter-tag">[07 / RESERVE]</span>
              <h2 className="section-title mb-3">
                Book a <em>Slow Moment</em>
              </h2>
              <p className="text-cafe-text-muted text-base leading-relaxed">
                Reserve a table for morning pour-overs, afternoon cake flights, or private tastings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-text mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-cafe-text/15 rounded-xl text-cafe-text placeholder:text-cafe-text/30 focus:border-cafe-accent focus:outline-none text-sm transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-text mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-cafe-text/15 rounded-xl text-cafe-text placeholder:text-cafe-text/30 focus:border-cafe-accent focus:outline-none text-sm transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-text mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-cafe-text/15 rounded-xl text-cafe-text focus:border-cafe-accent focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-text mb-2">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-cafe-text/15 rounded-xl text-cafe-text focus:border-cafe-accent focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-text mb-2">Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-cafe-text/15 rounded-xl text-cafe-text focus:border-cafe-accent focus:outline-none text-sm transition-colors"
                  >
                    {['1', '2', '3', '4', '5', '6'].map((n) => (
                      <option key={n} value={n}>{n} guest{parseInt(n) > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-2d-primary flex items-center gap-2 w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table</span>
              </button>
            </form>
          </div>

          {/* Right — Info */}
          <div className="space-y-10 pt-2">
            <div className="card-2d p-8 space-y-6">
              <h3 className="font-display text-xl font-semibold text-cafe-text">Find Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-cafe-text-muted">
                  <MapPin className="w-4 h-4 text-cafe-accent shrink-0 mt-0.5" />
                  <span>123 Coffee Lane, Arts District<br />Soho, New York, NY 10013</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-cafe-text-muted">
                  <Clock className="w-4 h-4 text-cafe-accent shrink-0 mt-0.5" />
                  <span>
                    Mon – Fri: 07:00 — 20:00<br />
                    Sat – Sun: 08:00 — 21:00
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cafe-text-muted">
                  <Mail className="w-4 h-4 text-cafe-accent shrink-0" />
                  <a href="mailto:hello@cafecoffee.com" className="hover:text-cafe-accent transition-colors">
                    hello@cafecoffee.com
                  </a>
                </div>
              </div>
            </div>

            {/* Minimal pull quote */}
            <blockquote className="pl-6 border-l-2 border-cafe-accent">
              <p className="font-display text-xl sm:text-2xl text-cafe-dark italic leading-snug">
                &ldquo;Every seat is made for staying.&rdquo;
              </p>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}
