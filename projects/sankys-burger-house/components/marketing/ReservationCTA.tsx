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
    if ((window as any).playPopSound) (window as any).playPopSound();
    const randomRef = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setConfirmed(true);
  };

  return (
    <section
      id="reservation-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
            BOOK YOUR EXPERIENCE
          </h2>
        </div>

        {confirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-3xl bg-white/90 text-stone-900 backdrop-blur-xl border-2 max-w-xl mx-auto shadow-2xl space-y-6 text-center"
            style={{ borderColor: "#FFE500" }}
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-black/5">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="space-y-1">
              <h3 className="type-display text-3xl font-extrabold text-black">
                TABLE RESERVED
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-600">
                Booking Reference: {bookingRef}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/5 text-xs text-stone-800 space-y-1 font-semibold">
              <p>{name || "Valued Guest"} · {guestCount} Guests</p>
              <p>{selectedTime} · {seatingZones.find(z => z.id === selectedZone)?.name}</p>
            </div>

            <button
              type="button"
              onClick={() => setConfirmed(false)}
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-stone-800 transition-all shadow-md"
            >
              Modify Booking
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleBook}
            className="p-8 sm:p-10 rounded-3xl bg-[#EBE7DD] dark:bg-[#EBE7DD] light:bg-[#FAF8F2] text-stone-900 shadow-2xl space-y-8 border border-black/10"
          >
            {/* Step 1: Time Slot Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                1. Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => {
                        if ((window as any).playPopSound) (window as any).playPopSound();
                        setSelectedTime(slot.time);
                      }}
                      className={`p-3.5 rounded-2xl text-left transition-all border ${
                        isSelected
                          ? "shadow-md font-bold text-black"
                          : "bg-white/80 text-stone-900 border-black/10 hover:border-black/30 font-medium"
                      }`}
                      style={{
                        backgroundColor: isSelected ? "#FFE500" : undefined,
                        borderColor: isSelected ? "#FFE500" : undefined,
                        color: isSelected ? "#000000" : undefined,
                      }}
                    >
                      <div className="text-sm font-extrabold">{slot.time}</div>
                      <div className="text-[10px] opacity-75">{slot.status}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 & 3: Party Size & Seating Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Party Size */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                  2. Party Size
                </label>
                <div className="flex items-center justify-between p-2 rounded-2xl bg-white/80 border border-black/10">
                  <button
                    type="button"
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setGuestCount((c) => Math.max(1, c - 1));
                    }}
                    className="w-10 h-10 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-base text-black transition-all"
                  >
                    -
                  </button>
                  <div className="text-center">
                    <span className="text-xl font-extrabold text-black block">{guestCount}</span>
                    <span className="text-[10px] uppercase font-bold text-stone-500">
                      {guestCount === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if ((window as any).playPopSound) (window as any).playPopSound();
                      setGuestCount((c) => Math.min(12, c + 1));
                    }}
                    className="w-10 h-10 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-base text-black transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Seating Zone */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                  3. Preferred Seating Zone
                </label>
                <div className="relative">
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full h-14 px-4 rounded-2xl bg-white/80 border border-black/10 text-xs font-bold text-stone-900 focus:outline-none appearance-none cursor-pointer"
                  >
                    {seatingZones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} — {zone.note}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-5 pointer-events-none text-stone-500 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="h-12 px-4 rounded-2xl bg-white/80 border border-black/10 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black/30 transition-all"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="h-12 px-4 rounded-2xl bg-white/80 border border-black/10 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black/30 transition-all"
              />
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-xl text-center"
              style={{
                backgroundColor: "#FFE500",
                color: "#000000",
              }}
            >
              Confirm Table Reservation →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
