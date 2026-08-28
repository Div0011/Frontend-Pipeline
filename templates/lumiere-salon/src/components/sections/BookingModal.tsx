"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, User, Scissors, CheckCircle, Sparkles } from "lucide-react";

export default function BookingModal({
  isOpen,
  onClose,
  initialService = "Lumière Sun-Kissed Balayage"
}: {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}) {
  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedStylist, setSelectedStylist] = useState("Antoine Lumière");
  const [selectedDate, setSelectedDate] = useState("2026-08-10");
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#141414] border border-[#d4a574]/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#d4a574] uppercase bg-[#1a1a1a] border border-[#d4a574]/30 px-4 py-1.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4a574]" />
                  VIP SALON RESERVATION
                </div>
                <h3 className="text-3xl sm:text-4xl font-display text-white">
                  Reserve Your <span className="italic text-[#d4a574]">Experience</span>
                </h3>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block font-mono text-xs text-[#d4a574] uppercase tracking-wider mb-2">
                  Select Experience
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm font-sans text-white focus:border-[#d4a574] focus:outline-none"
                >
                  <option value="Architectural Precision Cut">Architectural Precision Cut ($220+)</option>
                  <option value="Lumière Sun-Kissed Balayage">Lumière Sun-Kissed Balayage ($520+)</option>
                  <option value="Master Color Correction">Master Color Correction ($650+)</option>
                  <option value="Bespoke Silk Hair Extensions">Bespoke Silk Hair Extensions ($850+)</option>
                  <option value="Gold Leaf Keratin Elixir">Gold Leaf Keratin Elixir ($380+)</option>
                </select>
              </div>

              {/* Stylist & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#d4a574] uppercase tracking-wider mb-2">
                    Master Stylist
                  </label>
                  <select
                    value={selectedStylist}
                    onChange={(e) => setSelectedStylist(e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm font-sans text-white focus:border-[#d4a574] focus:outline-none"
                  >
                    <option value="Antoine Lumière">Antoine Lumière (Creative Director)</option>
                    <option value="Elena Rostova">Elena Rostova (Head Color Director)</option>
                    <option value="Kenji Takahashi">Kenji Takahashi (Senior Specialist)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#d4a574] uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm font-sans text-white focus:border-[#d4a574] focus:outline-none"
                  />
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#d4a574] uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sophia Laurent"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm font-sans text-white focus:border-[#d4a574] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#d4a574] uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sophia@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm font-sans text-white focus:border-[#d4a574] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#d4a574] hover:bg-[#e0b98a] text-[#0a0a0a] font-mono text-xs uppercase tracking-widest font-bold rounded-lg transition-colors cursor-pointer shadow-lg mt-6"
              >
                Confirm VIP Reservation
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <CheckCircle className="w-16 h-16 text-[#d4a574] mx-auto animate-bounce" />
              <h3 className="text-4xl font-display text-white">
                Reservation <span className="italic text-[#d4a574]">Confirmed</span>
              </h3>
              <p className="font-sans text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#d4a574] font-bold">{guestName}</span>. Your VIP consultation for{" "}
                <span className="text-[#d4a574] font-bold">{selectedService}</span> with{" "}
                <span className="text-[#d4a574] font-bold">{selectedStylist}</span> is confirmed for {selectedDate}.
              </p>
              <div className="bg-[#1e1e1e] border border-[#d4a574]/30 p-4 rounded-xl font-mono text-xs text-[#d4a574]">
                CONFIRMATION CODE: LUM-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Return to Salon
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
