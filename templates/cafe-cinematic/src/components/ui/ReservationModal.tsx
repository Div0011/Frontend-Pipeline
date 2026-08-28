'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Coffee, Sparkles, CheckCircle2, Cake } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEATING_VIBES = [
  {
    id: 'counter',
    name: 'Barista Counter',
    desc: 'Watch manual pour-overs and latte art up close.',
    icon: Coffee,
  },
  {
    id: 'solarium',
    name: 'Solarium Greenery',
    desc: 'Sunlit botanical garden atrium with morning light.',
    icon: Sparkles,
  },
  {
    id: 'bakery',
    name: 'Hearth Bakery Table',
    desc: 'Right next to the aroma of the oven bakes.',
    icon: Cake,
  },
];

const TIME_SLOTS = [
  '08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM',
  '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM',
];

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [selectedVibe, setSelectedVibe] = useState('counter');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('Today');
  const [cakePairing, setCakePairing] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cafe-dark/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 2D Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white text-cafe-text rounded-3xl border-2 border-cafe-text shadow-[10px_10px_0px_#2A1A12] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-cafe-text bg-cafe-warm">
          <div>
            <span className="badge-2d badge-2d-accent mb-1">Salon Table Hold</span>
            <h3 className="font-display text-2xl md:text-3xl text-cafe-text font-bold">
              CAFE COFFEE <em>Reservation</em>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white border-2 border-cafe-text text-cafe-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-cafe-accent/30 text-cafe-text rounded-full flex items-center justify-center mx-auto border-2 border-cafe-text shadow-[3px_3px_0px_#2A1A12]">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-3xl font-bold text-cafe-text">
                  Your Table is <em>Confirmed</em>!
                </h4>
                <p className="text-cafe-text-muted text-sm max-w-md mx-auto">
                  A confirmation has been sent to {email || 'your email'}. We have your table ready with warm morning vibes.
                </p>
              </div>

              <div className="bg-cafe-warm p-6 rounded-2xl border-2 border-cafe-text shadow-[4px_4px_0px_#2A1A12] max-w-md mx-auto text-left space-y-2 text-sm">
                <div className="flex justify-between border-b border-cafe-text/20 pb-1.5">
                  <span className="text-cafe-text-muted">Table Hold ID:</span>
                  <span className="font-mono font-bold text-cafe-secondary">#CC-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between border-b border-cafe-text/20 pb-1.5">
                  <span className="text-cafe-text-muted">Section:</span>
                  <span className="font-bold text-cafe-text">{SEATING_VIBES.find(v => v.id === selectedVibe)?.name}</span>
                </div>
                <div className="flex justify-between border-b border-cafe-text/20 pb-1.5">
                  <span className="text-cafe-text-muted">Date & Time:</span>
                  <span className="font-bold text-cafe-text">{date} at {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cafe-text-muted">Guests:</span>
                  <span className="font-bold text-cafe-text">{guests} {guests === 1 ? 'Guest' : 'Guests'} {cakePairing ? '(Cake Flight Included)' : ''}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="btn-2d-primary"
              >
                Back To Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Seating Atmosphere */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-cafe-text block">
                  1. Choose Seating Atmosphere
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {SEATING_VIBES.map((vibe) => {
                    const Icon = vibe.icon;
                    const isSelected = selectedVibe === vibe.id;
                    return (
                      <button
                        type="button"
                        key={vibe.id}
                        onClick={() => setSelectedVibe(vibe.id)}
                        className={`p-3.5 text-left border-2 rounded-2xl transition-all flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'bg-cafe-accent text-cafe-dark border-cafe-text shadow-[3px_3px_0px_#2A1A12] font-bold'
                            : 'bg-cafe-bg text-cafe-text border-cafe-text/40 hover:border-cafe-text'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className="w-5 h-5 text-cafe-secondary" />
                          <span className={`w-2.5 h-2.5 rounded-full border border-cafe-text ${isSelected ? 'bg-cafe-text' : 'bg-transparent'}`} />
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-cafe-text">{vibe.name}</div>
                          <div className="text-[0.7rem] text-cafe-text-muted mt-0.5 leading-tight">{vibe.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-cafe-text flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cafe-accent" /> Date
                  </label>
                  <div className="flex gap-2">
                    {['Today', 'Tomorrow', 'Weekend'].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setDate(d)}
                        className={`flex-1 py-2 text-xs font-bold border-2 rounded-xl transition-all ${
                          date === d
                            ? 'bg-cafe-text text-cafe-bg border-cafe-text shadow-[2px_2px_0px_#D89F56]'
                            : 'bg-white border-cafe-text/40 text-cafe-text hover:border-cafe-text'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-cafe-text flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cafe-accent" /> Number of Guests
                  </label>
                  <div className="flex items-center justify-between border-2 border-cafe-text bg-cafe-bg rounded-xl px-3 py-1.5 shadow-[2px_2px_0px_#2A1A12]">
                    <span className="text-xs font-bold text-cafe-text">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-cafe-text font-bold text-cafe-text hover:bg-cafe-warm"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(8, guests + 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-cafe-text font-bold text-cafe-text hover:bg-cafe-warm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-cafe-text flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cafe-accent" /> Available Atelier Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 text-xs font-bold border-2 rounded-xl transition-all ${
                        selectedTime === t
                          ? 'bg-cafe-secondary text-white border-cafe-text shadow-[2px_2px_0px_#2A1A12]'
                          : 'bg-white border-cafe-text/30 text-cafe-text hover:border-cafe-text'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cake Flight Addon */}
              <div
                onClick={() => setCakePairing(!cakePairing)}
                className={`p-3.5 border-2 rounded-2xl cursor-pointer transition-all flex items-start gap-3 ${
                  cakePairing
                    ? 'border-cafe-text bg-cafe-warm shadow-[3px_3px_0px_#2A1A12]'
                    : 'border-cafe-text/30 hover:border-cafe-text bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={cakePairing}
                  onChange={() => {}}
                  className="mt-1 accent-cafe-secondary w-4 h-4"
                />
                <div>
                  <div className="font-display font-bold text-sm text-cafe-text flex items-center gap-2">
                    <span>Include Artisan Cake & Coffee Flight</span>
                    <span className="badge-2d badge-2d-accent text-[0.62rem]">+$12 / Guest</span>
                  </div>
                  <p className="text-xs text-cafe-text-muted mt-0.5">
                    3 mini cake slices (Basque Cheesecake, Matcha Chiffon, Chocolate Ganache) with paired pour-over shots.
                  </p>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-cafe-text mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Claire Bennett"
                    className="w-full px-3.5 py-2 bg-cafe-bg border-2 border-cafe-text rounded-xl text-xs text-cafe-text placeholder:text-cafe-text-muted/50 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-cafe-text mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="claire@example.com"
                    className="w-full px-3.5 py-2 bg-cafe-bg border-2 border-cafe-text rounded-xl text-xs text-cafe-text placeholder:text-cafe-text-muted/50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-2d-primary w-full py-3.5 text-center justify-center text-sm"
                >
                  Confirm Table Hold at CAFE COFFEE
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
