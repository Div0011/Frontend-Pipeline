"use client";

import { useState } from "react";
import { X, Calendar, Users, CheckCircle, Sparkles, Anchor } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [villaType, setVillaType] = useState("Overwater Coral Villa");
  const [guests, setGuests] = useState("2 Guests");
  const [checkIn, setCheckIn] = useState("2026-10-15");
  const [checkOut, setCheckOut] = useState("2026-10-22");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#094067]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-card-strong rounded-3xl p-8 md:p-10 border-[#48d1cc]/60 shadow-[0_0_60px_rgba(72,209,204,0.4)] text-[#f5f0e6]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full glass-card hover:bg-[#48d1cc]/20 transition-colors text-[#48d1cc]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#00a896]/30 border-2 border-[#48d1cc] flex items-center justify-center mx-auto text-[#48d1cc] animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-display text-3xl md:text-4xl text-[#f5f0e6]">
              RESERVATION REQUEST RECEIVED
            </h3>

            <p className="font-body text-sm text-[#90e0ef] max-w-md mx-auto leading-relaxed">
              Your personal island concierge will reach out within 2 hours to confirm dates for your stay in the <span className="text-[#48d1cc] font-semibold">{villaType}</span>.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3.5 rounded-full bg-[#48d1cc] text-[#094067] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#e0f7fa]"
            >
              RETURN TO RESORT
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#e5c378]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#48d1cc]">
                PRIVATE ATOLL RESERVATION
              </span>
            </div>

            <h3 className="font-display text-3xl text-[#f5f0e6]">
              RESERVE YOUR <span className="italic text-[#48d1cc]">SANCTUARY</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#90e0ef]">
                  SELECT SUITE / VILLA
                </label>
                <select
                  value={villaType}
                  onChange={(e) => setVillaType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#094067]/90 border border-[#48d1cc]/40 text-[#f5f0e6] font-body text-sm focus:border-[#48d1cc] outline-none"
                >
                  <option value="Overwater Coral Villa">Overwater Coral Villa ($2,800/night)</option>
                  <option value="Lagoon Sunset Pavilion">Lagoon Sunset Pavilion ($4,500/night)</option>
                  <option value="The Royal Ocean Sanctuary">The Royal Ocean Sanctuary ($8,200/night)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#90e0ef]">
                  GUESTS
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#094067]/90 border border-[#48d1cc]/40 text-[#f5f0e6] font-body text-sm focus:border-[#48d1cc] outline-none"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests (Couple)</option>
                  <option value="4 Guests">4 Guests (Family)</option>
                  <option value="6+ Guests">6+ Guests (Private Villa)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#90e0ef]">
                  CHECK-IN DATE
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#094067]/90 border border-[#48d1cc]/40 text-[#f5f0e6] font-body text-sm focus:border-[#48d1cc] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#90e0ef]">
                  CHECK-OUT DATE
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#094067]/90 border border-[#48d1cc]/40 text-[#f5f0e6] font-body text-sm focus:border-[#48d1cc] outline-none"
                />
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-center justify-between border-[#48d1cc]/30">
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-[#48d1cc]" />
                <span className="font-mono text-xs text-[#f5f0e6]">INCLUDES SEAPLANE TRANSFERS</span>
              </div>
              <span className="font-mono text-xs text-[#e5c378] font-semibold">100% REFUNDABLE</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#48d1cc] to-[#00a896] text-[#094067] font-mono text-xs uppercase tracking-[0.3em] font-bold shadow-[0_0_30px_rgba(72,209,204,0.5)] hover:scale-[1.02] transition-transform cursor-pointer"
            >
              CONFIRM RESERVATION REQUEST
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
