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
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans select-none"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-white font-extrabold tracking-tight">
            BOOK YOUR EXPERIENCE
          </h2>
        </div>

        {confirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-2xl bg-white/[0.06] backdrop-blur-xl border-2 max-w-xl mx-auto shadow-2xl space-y-6 text-center"
            style={{ borderColor: "#B12727" }}
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-black" style={{ backgroundColor: "#B12727" }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold block" style={{ color: "#B12727" }}>
                RESERVATION CONFIRMED
              </span>
              <h3 className="type-display text-3xl text-white font-extrabold">
                FRONT-ROW SEATING RESERVED
              </h3>
              <p className="text-stone-300 text-xs font-medium">
                Ref Code: <span className="font-bold" style={{ color: "#B12727" }}>{bookingRef}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-left text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Guest:</span>
                <span className="text-white font-bold">{name || "VIP Guest"}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Time:</span>
                <span className="font-bold" style={{ color: "#B12727" }}>{selectedTime}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Party Size:</span>
                <span className="text-white font-bold">{guestCount} Guests</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Zone:</span>
                <span className="text-white font-bold">
                  {seatingZones.find((z) => z.id === selectedZone)?.name}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setConfirmed(false)}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Modify Booking
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleBook}
            className="p-8 sm:p-10 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-2xl space-y-8"
          >
            {/* 1. Time Slot Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
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
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "shadow-lg scale-105"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-stone-300"
                      }`}
                      style={{
                        backgroundColor: isSelected ? "#B12727" : undefined,
                        color: isSelected ? "#000000" : undefined,
                        borderColor: isSelected ? "#B12727" : undefined,
                      }}
                    >
                      <div className="text-xs font-bold">{slot.time}</div>
                      <div className="text-[10px] opacity-75">{slot.status}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Party Size & Seating Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
                  2. Party Size
                </label>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 flex items-center justify-center transition-colors text-lg"
                  >
                    -
                  </button>
                  <span className="text-sm font-black text-white">
                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 flex items-center justify-center transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-bold block">
                  3. Preferred Seating Zone
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full h-14 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none transition-colors"
                >
                  {seatingZones.map((z) => (
                    <option key={z.id} value={z.id} className="bg-stone-900 text-white">
                      {z.name} — {z.note}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#B12727] text-black hover:brightness-110 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-2"
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
