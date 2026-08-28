"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const timeSlots = [
  { time: "12:30 PM", status: "Available" },
  { time: "1:45 PM", status: "Few Tables" },
  { time: "7:00 PM", status: "Peak Dinner" },
  { time: "8:30 PM", status: "Filling Fast" },
  { time: "9:45 PM", status: "Available" },
  { time: "11:00 PM", status: "Late Night" },
];

const seatingZones = [
  { id: "counter", name: "Chef's Sizzle Counter", note: "Front-row sizzling view" },
  { id: "booth", name: "Cozy Dining Booth", note: "Spacious group seating" },
  { id: "patio", name: "Open-Air Patio Deck", note: "Outdoor dining" },
];

export default function ReservationCTA() {
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [guestCount, setGuestCount] = useState(2);
  const [selectedZone, setSelectedZone] = useState("counter");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setConfirmed(true);
  };

  return (
    <section
      id="reservation-section"
      className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs tracking-widest uppercase font-bold block" style={{ color: "#D97706" }}>
            DAN'S HAMBURGERS // TABLE RESERVATIONS
          </span>
          <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
            BOOK YOUR EXPERIENCE
          </h2>
          <p className="text-stone-300 text-sm max-w-xl mx-auto font-body">
            Reserve front-row seats for fresh sizzling craft dining in Austin.
          </p>
        </div>

        {confirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-2xl bg-white/[0.06] backdrop-blur-xl border-2 max-w-xl mx-auto shadow-2xl space-y-6 text-center"
            style={{ borderColor: "#D97706" }}
          >
            <div
              className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto text-2xl"
              style={{
                backgroundColor: "#D9770620",
                borderColor: "#D97706",
                color: "#D97706",
              }}
            >
              ✓
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: "#D97706" }}>
                RESERVATION CONFIRMED // VIP PASS
              </span>
              <h3 className="type-display text-3xl font-extrabold text-white">
                SEE YOU SOON, {name.toUpperCase()}!
              </h3>
              <p className="font-mono text-xs text-stone-300">
                Booking Reference: <span className="font-bold" style={{ color: "#D97706" }}>{bookingRef}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-left font-mono text-xs space-y-2 text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Timing:</span>
                <span className="text-white font-bold">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Guests:</span>
                <span className="text-white font-bold">{guestCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Seating Zone:</span>
                <span className="font-bold" style={{ color: "#D97706" }}>
                  {seatingZones.find((z) => z.id === selectedZone)?.name}
                </span>
              </div>
            </div>

            <button
              onClick={() => setConfirmed(false)}
              className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase transition-colors"
            >
              Modify Reservation
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleBook}
            className="p-8 sm:p-10 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-8"
          >
            <div className="space-y-3">
              <label className="font-mono text-xs uppercase tracking-wider text-stone-300 font-bold block">
                1. Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "font-black shadow-md"
                          : "bg-white/5 border-white/10 text-stone-300 hover:border-white/20"
                      }`}
                      style={{
                        backgroundColor: isSelected ? "#D97706" : undefined,
                        color: isSelected ? "#FFFFFF" : undefined,
                        borderColor: isSelected ? "#D97706" : undefined,
                      }}
                    >
                      <span className="font-mono text-xs block">{slot.time}</span>
                      <span className={`text-[9px] font-mono block ${isSelected ? "opacity-90" : "text-stone-400"}`}>
                        {slot.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-stone-300 font-bold block">
                  2. Party Size
                </label>
                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10 justify-between">
                  <button
                    type="button"
                    onClick={() => setGuestCount((g) => Math.max(1, g - 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-lg font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <div className="text-center font-mono">
                    <span className="text-2xl font-bold" style={{ color: "#D97706" }}>{guestCount}</span>
                    <span className="text-xs text-stone-400 block">
                      {guestCount === 1 ? "Solo Diner" : `${guestCount} Guests`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGuestCount((g) => Math.min(12, g + 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-lg font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-stone-300 font-bold block">
                  3. Preferred Seating Zone
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white focus:outline-none transition-colors"
                >
                  {seatingZones.map((z) => (
                    <option key={z.id} value={z.id} className="bg-[#0e0e12] text-white">
                      {z.name} — {z.note}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-stone-400 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-stone-400 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 font-mono text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-98 transition-all shadow-2xl flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#D97706",
                color: "#FFFFFF",
              }}
            >
              <span>Confirm Table Reservation</span>
              <span>→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
