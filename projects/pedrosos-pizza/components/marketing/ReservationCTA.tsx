"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReservationCTA() {
  const [selectedLocation, setSelectedLocation] = useState("Burnet Road Pizzeria");
  const [selectedDate, setSelectedDate] = useState("Today, 7:30 PM");
  const [guests, setGuests] = useState("2 Guests");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    if ((window as any).playSizzleSound) (window as any).playSizzleSound();
    setIsBooked(true);
  };

  return (
    <section id="reservation-section" className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h2 className="type-display text-4xl sm:text-6xl text-[#F2C777] font-black tracking-tight">
            BOOK YOUR EXPERIENCE
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="type-display text-3xl sm:text-4xl text-[#F2C777] font-extrabold leading-tight">
              TABLE RESERVATIONS AT PEDROSO'S PIZZA
            </h3>
          </div>

          {/* High Contrast Crisp Booking Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#FAF7F2] text-black shadow-2xl border border-black/10">
            <AnimatePresence mode="wait">
              {!isBooked ? (
                <form onSubmit={handleBooking} className="space-y-4 text-black">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Select Outpost</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                    >
                    <option value="Burnet Road Pizzeria">Burnet Road Pizzeria</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6+ Guests">6+ Guests</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Date & Time</label>
                      <input
                        type="text"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Your Name</label>
                    <input
                      type="text"
                      placeholder="Alex Parker"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 512-814-7220"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xl hover:brightness-110 active:scale-95"
                    style={{
                      backgroundColor: "#D91C24",
                      color: "#000000",
                    }}
                  >
                    Confirm Table Reservation →
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-4 text-black"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="type-display text-2xl font-bold">RESERVATION CONFIRMED</h4>
                  <p className="text-xs font-semibold text-stone-700">
                    We look forward to welcoming you, {name} at {selectedLocation} for {guests}.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
