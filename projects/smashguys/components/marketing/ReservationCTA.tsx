"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = ["Indiranagar", "Bellandur", "RMV Extension", "Whitefield"];

export default function ReservationCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [guests, setGuests] = useState(2);
  const [selectedLoc, setSelectedLoc] = useState("Indiranagar");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleIncrement = () => setGuests((prev) => Math.min(12, prev + 1));
  const handleDecrement = () => setGuests((prev) => Math.max(1, prev - 1));

  return (
    <section className="bg-bone-warm section-cinematic border-b border-bone-dark/50">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — headline */}
          <div>
            <p className="type-caption text-yolk-dark mb-4">Reservations</p>
            <h2 className="type-display text-6xl sm:text-8xl lg:text-[8rem] text-char leading-[0.9] mb-8">
              GRAB<br />YOUR<br />TABLE
            </h2>
            <p className="type-serif text-xl text-smoke leading-relaxed max-w-md mb-10">
              Walk-ins are welcome, but if you&apos;ve got the crew, we&apos;ve got the table.
              Reserve in under 30 seconds.
            </p>
            <div className="flex flex-col gap-3 font-mono text-xs text-smoke">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-yolk rounded-sm flex items-center justify-center text-char font-bold text-[10px]">✓</span>
                No credit card required
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-yolk rounded-sm flex items-center justify-center text-char font-bold text-[10px]">✓</span>
                Instant SMS confirmation
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-yolk rounded-sm flex items-center justify-center text-char font-bold text-[10px]">✓</span>
                Free cancellation anytime
              </div>
            </div>
          </div>

          {/* Right — quick form */}
          <div className="bg-char p-8 lg:p-10 border border-char-mute/40">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-5"
                >
                  <div>
                    <p className="type-caption text-yolk mb-1">Quick Reservation</p>
                    <h3 className="type-display text-3xl text-ink">Book in 30 Seconds</h3>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="type-label text-smoke text-[9px] block mb-1.5">YOUR NAME</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Kumar"
                      className="w-full bg-char-soft border border-char-mute px-4 py-3 text-ink type-body text-sm focus:outline-none focus:border-yolk transition-colors duration-200 placeholder:text-smoke hover:border-char-mute/80"
                    />
                  </div>

                  {/* Two-col: Interactive Guest Stepper + Location Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Guest Stepper */}
                    <div>
                      <label className="type-label text-smoke text-[9px] block mb-1.5">GUESTS</label>
                      <div className="flex items-center justify-between bg-char-soft border border-char-mute px-3 py-2 text-ink">
                        <button
                          type="button"
                          onClick={handleDecrement}
                          className="w-8 h-8 rounded-full border border-char-mute text-smoke hover:text-yolk hover:border-yolk transition-colors font-bold flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="type-display text-xl text-ink px-2">{guests} {guests === 1 ? "Guest" : "Guests"}</span>
                        <button
                          type="button"
                          onClick={handleIncrement}
                          className="w-8 h-8 rounded-full border border-char-mute text-smoke hover:text-yolk hover:border-yolk transition-colors font-bold flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Location Selector */}
                    <div>
                      <label className="type-label text-smoke text-[9px] block mb-1.5">LOCATION</label>
                      <div className="relative">
                        <select
                          value={selectedLoc}
                          onChange={(e) => setSelectedLoc(e.target.value)}
                          className="w-full bg-char-soft border border-char-mute px-4 py-3.5 text-ink type-body text-sm focus:outline-none focus:border-yolk transition-colors duration-200 appearance-none cursor-pointer hover:border-char-mute/80"
                        >
                          {LOCATIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-char">{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-smoke text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Phone */}
                  <div>
                    <label className="type-label text-smoke text-[9px] block mb-1.5">PHONE (for SMS confirmation)</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-char-soft border border-char-mute px-4 py-3 text-ink type-body text-sm focus:outline-none focus:border-yolk transition-colors duration-200 placeholder:text-smoke hover:border-char-mute/80"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-yolk justify-center py-4 text-[11px]"
                  >
                    Confirm Reservation →
                  </button>

                  <p className="type-label text-smoke text-center text-[9px]">
                    Or call us:{" "}
                    <a href="tel:+918045678900" className="text-yolk hover:underline">+91 80 4567 8900</a>
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-5"
                >
                  <div className="w-14 h-14 bg-yolk rounded-sm flex items-center justify-center mx-auto">
                    <span className="text-char text-2xl font-bold">✓</span>
                  </div>
                  <p className="type-caption text-yolk">Reservation Confirmed</p>
                  <h3 className="type-display text-4xl text-ink">See You Soon!</h3>
                  <p className="type-serif text-stone">
                    We&apos;ll send an SMS confirmation shortly. We are holding a table for <b>{guests} people</b> at our <b>{selectedLoc} atelier</b>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setGuests(2);
                    }}
                    className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300 border border-char-mute px-4 py-2 mt-4 inline-block"
                  >
                    Make another reservation →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
