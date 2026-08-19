'use client';

import { MapPin, Clock, Phone, Mail, Navigation as NavIcon, Calendar, Sparkles } from 'lucide-react';

interface VisitProps {
  onOpenReservation?: () => void;
}

export function Visit({ onOpenReservation }: VisitProps) {
  return (
    <section id="visit" className="py-28 bg-cafe-bg border-b-2 border-cafe-text relative overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Address & Details */}
          <div className="lg:col-span-6 space-y-6 reveal">
            <span className="chapter-tag">[06 / LOCATION & VISIT]</span>
            
            <h2 className="section-title">
              Come Visit <em>Our Space</em>
            </h2>

            <p className="text-cafe-text-muted text-base sm:text-lg leading-relaxed">
              A cobblestone corner in Soho. Quiet reading, fresh cakes, and coffee worth the wait.
            </p>

            {/* 2D Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="card-2d p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cafe-secondary">
                  <MapPin className="w-4 h-4 text-cafe-accent" /> Address & Soho Corner
                </div>
                <p className="text-xs text-cafe-text font-medium leading-relaxed">
                  123 Coffee Lane, Arts District<br />
                  Soho, New York, NY 10013
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-cafe-secondary hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <NavIcon className="w-3 h-3" /> Get Directions
                </a>
              </div>

              <div className="card-2d p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cafe-secondary">
                  <Clock className="w-4 h-4 text-cafe-accent" /> Opening Hours
                </div>
                <p className="text-xs text-cafe-text font-medium leading-relaxed">
                  Mon – Fri: 07:00 — 20:00<br />
                  Sat – Sun: 08:00 — 21:00
                </p>
                <span className="badge-2d bg-cafe-warm text-[0.65rem] mt-1">Oven hot at 07:00</span>
              </div>

              <div className="card-2d p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cafe-secondary">
                  <Phone className="w-4 h-4 text-cafe-accent" /> Telephone Inquiries
                </div>
                <p className="text-xs font-mono font-bold text-cafe-text">
                  +1 (212) 555-0147
                </p>
                <p className="text-[0.7rem] text-cafe-text-muted">For table holds & cake preorders</p>
              </div>

              <div className="card-2d p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cafe-secondary">
                  <Mail className="w-4 h-4 text-cafe-accent" /> Direct Mail
                </div>
                <p className="text-xs font-mono font-bold text-cafe-text">
                  hello@cafecoffee.com
                </p>
                <p className="text-[0.7rem] text-cafe-text-muted">Catering & private tastings</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="btn-2d-primary"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Salon Table</span>
              </button>
            </div>
          </div>

          {/* Right Column: 2D Framed Storefront Photo */}
          <div className="lg:col-span-6 relative reveal reveal-delay-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl border-2 border-cafe-text shadow-[8px_8px_0px_#2A1A12] overflow-hidden bg-white aspect-[4/3]">
                <img
                  src="/images/visit-facade.jpg"
                  alt="CAFE COFFEE storefront in Soho"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Interior Corner Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-3 sm:p-4 rounded-2xl border-2 border-cafe-text shadow-[4px_4px_0px_#2A1A12] flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-cafe-text shrink-0">
                  <img
                    src="/images/visit-interior.jpg"
                    alt="Interior booth"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="badge-2d badge-2d-accent text-[0.62rem]">Atelier Seating</span>
                  <p className="font-display text-xs font-bold text-cafe-text mt-0.5">Solarium & Counter</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
