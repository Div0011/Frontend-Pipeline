"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = [
  "South Austin / Manchaca (5602 Manchaca Rd)",
  "North Lamar Blvd (5601 N Lamar Blvd)",
  "Airport Blvd (6105 Airport Blvd)",
  "Buda Historic (101 Old San Antonio Rd)",
];

export default function ReservationCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [guests, setGuests] = useState(4);
  const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleIncrement = () => setGuests((prev) => Math.min(20, prev + 1));
  const handleDecrement = () => setGuests((prev) => Math.max(1, prev - 1));

  return (
    <section className="bg-bone-warm section-cinematic border-b border-bone-dark/50">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — headline */}
          <div>
            <p className="type-caption text-ember mb-4 font-bold">Pick Up &amp; Group Dining</p>
            <h2 className="type-display text-6xl sm:text-8xl lg:text-[8rem] text-char leading-[0.9] mb-8">
              FEED<br />YOUR<br />CREW
            </h2>
            <p className="type-serif text-xl text-smoke leading-relaxed max-w-md mb-10">
              Walk-ins are always welcome. Call ahead for quick counter pickup or book a table for large groups and family gatherings.
            </p>
            <div className="flex flex-col gap-3 font-mono text-xs text-smoke">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-ember rounded-sm flex items-center justify-center text-bone font-bold text-[10px]">✓</span>
                Made fresh to order when you arrive
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-ember rounded-sm flex items-center justify-center text-bone font-bold text-[10px]">✓</span>
                Breakfast served daily starting 6:00 AM (7:00 AM Sun)
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-ember rounded-sm flex items-center justify-center text-bone font-bold text-[10px]">✓</span>
                Famous $50 onion rings &amp; hand-dipped malts
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
                    <p className="type-caption text-yolk mb-1">Quick Reservation &amp; Pickup</p>
                    <h3 className="type-display text-3xl text-ink">Save Your Spot</h3>
                  </div>

                  <div>
                    <label className="type-label text-smoke text-[9px] block mb-1.5 font-mono">YOUR NAME</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Willie Nelson"
                      className="w-full bg-char-soft border border-char-mute px-4 py-3 text-ink type-body text-sm focus:outline-none focus:border-ember transition-colors duration-200 placeholder:text-smoke hover:border-char-mute/80"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Guest Stepper */}
                    <div>
                      <label className="type-label text-smoke text-[9px] block mb-1.5 font-mono">PARTY SIZE</label>
                      <div className="flex items-center justify-between bg-char-soft border border-char-mute px-3 py-2 text-ink">
                        <button
                          type="button"
                          onClick={handleDecrement}
                          className="w-8 h-8 rounded-full border border-char-mute text-smoke hover:text-yolk hover:border-yolk transition-colors font-bold flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="type-display text-xl text-ink px-2">{guests} {guests === 1 ? "Person" : "People"}</span>
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
                      <label className="type-label text-smoke text-[9px] block mb-1.5 font-mono">AUSTIN STORE</label>
                      <div className="relative">
                        <select
                          value={selectedLoc}
                          onChange={(e) => setSelectedLoc(e.target.value)}
                          className="w-full bg-char-soft border border-char-mute px-4 py-3.5 text-ink type-body text-xs focus:outline-none focus:border-ember transition-colors duration-200 appearance-none cursor-pointer hover:border-char-mute/80 truncate"
                        >
                          {LOCATIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-char text-xs">{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-smoke text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                  </div>

                  <div>
                    <label className="type-label text-smoke text-[9px] block mb-1.5 font-mono">PHONE NUMBER (for order / booking status)</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(512) 443-6131"
                      className="w-full bg-char-soft border border-char-mute px-4 py-3 text-ink type-body text-sm focus:outline-none focus:border-ember transition-colors duration-200 placeholder:text-smoke hover:border-char-mute/80"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-red justify-center py-4 text-[11px] font-bold"
                  >
                    Submit Booking Request →
                  </button>

                  <p className="type-label text-smoke text-center text-[9px] font-mono">
                    Or call your nearest Dan&apos;s directly:{" "}
                    <a href="tel:5124436131" className="text-yolk hover:underline">(512) 443-6131</a>
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-5"
                >
                  <div className="w-14 h-14 bg-ember rounded-sm flex items-center justify-center mx-auto">
                    <span className="text-bone text-2xl font-bold">✓</span>
                  </div>
                  <p className="type-caption text-yolk">Request Received</p>
                  <h3 className="type-display text-4xl text-ink">We&apos;re Firing Up the Grill!</h3>
                  <p className="type-serif text-stone">
                    We have noted your table request for <b>{guests} people</b> at our <b>{selectedLoc.split("(")[0]}</b> location.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setGuests(4);
                    }}
                    className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300 border border-char-mute px-4 py-2 mt-4 inline-block"
                  >
                    Submit another request →
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
