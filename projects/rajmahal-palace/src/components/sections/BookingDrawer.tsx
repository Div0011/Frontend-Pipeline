"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, CheckCircle } from "lucide-react";

export default function BookingDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [suite, setSuite] = useState("Grand Maharaja Presidential Suite");
  const [checkIn, setCheckIn] = useState("2026-10-15");
  const [checkOut, setCheckOut] = useState("2026-10-18");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const confirmCode = `RM-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-[#0f0204]/90 backdrop-blur-xl"
        onClick={(e: React.MouseEvent) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#160306] border border-[#f5d061]/50 p-6 md:p-10 shadow-[0_0_80px_rgba(245,208,97,0.25)] text-[#faf0ca] overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#f5d061]" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#f5d061]" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#f5d061]" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#f5d061]" />

          <button
            onClick={onClose}
            data-cursor="hover"
            className="absolute top-6 right-6 p-2 text-[#faf0ca]/50 hover:text-[#f5d061] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[#f5d061] bg-[#20060a] border border-[#f5d061]/30 px-4 py-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> VIP ROYAL RESERVATION
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-[#f5d061] mt-3">
                  Reserve Your <span className="italic text-[#faf0ca] font-normal">Sanctuary</span>
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#f5d061]/80 mb-2">
                    Select Royal Suite
                  </label>
                  <select
                    value={suite}
                    onChange={(e) => setSuite(e.target.value)}
                    className="w-full bg-[#20060a] border border-[#f5d061]/30 p-3.5 text-xs font-body text-[#faf0ca] focus:border-[#f5d061] focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="Grand Maharaja Presidential Suite">The Grand Maharaja Presidential Suite ($1,850/night)</option>
                    <option value="Royal Haveli Courtyard Suite">Royal Haveli Courtyard Suite ($1,200/night)</option>
                    <option value="Peacock Garden Heritage Room">Peacock Garden Heritage Room ($850/night)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#f5d061]/80 mb-2">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#20060a] border border-[#f5d061]/30 p-3.5 text-xs font-body text-[#faf0ca] focus:border-[#f5d061] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#f5d061]/80 mb-2">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#20060a] border border-[#f5d061]/30 p-3.5 text-xs font-body text-[#faf0ca] focus:border-[#f5d061] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#f5d061]/80 mb-2">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alexander Wright"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#20060a] border border-[#f5d061]/30 p-3.5 text-xs font-body text-[#faf0ca] focus:border-[#f5d061] focus:outline-none placeholder:text-[#faf0ca]/30"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#f5d061]/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#20060a] border border-[#f5d061]/30 p-3.5 text-xs font-body text-[#faf0ca] focus:border-[#f5d061] focus:outline-none placeholder:text-[#faf0ca]/30"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                data-cursor="hover"
                data-cursor-label="CONFIRM"
                className="w-full py-4 bg-[#f5d061] text-[#160306] font-mono text-xs uppercase tracking-[0.3em] font-bold shadow-[0_0_30px_rgba(245,208,97,0.35)] hover:bg-[#ffdf7a] transition-all duration-300 cursor-pointer mt-4"
              >
                Confirm Royal Sanctuary Reservation
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <CheckCircle className="w-16 h-16 text-[#f5d061] mx-auto" />
              <h3 className="font-display text-4xl text-[#f5d061]">
                Reservation <span className="italic text-[#faf0ca] font-normal">Confirmed</span>
              </h3>
              <p className="font-body text-sm text-[#faf0ca]/80 max-w-md mx-auto leading-relaxed">
                Greetings, <span className="text-[#f5d061] font-bold">{name}</span>. Your reservation for{" "}
                <span className="text-[#f5d061] font-bold">{suite}</span> is registered for {checkIn} to {checkOut}.
                Our Head Royal Butler will reach out to fulfill your arrival preferences.
              </p>
              <div className="bg-[#20060a] border border-[#f5d061]/40 p-4 font-mono text-xs text-[#f5d061] tracking-[0.3em]">
                CONFIRMATION CODE: {confirmCode}
              </div>
              <button
                onClick={onClose}
                data-cursor="hover"
                className="px-8 py-3 bg-[#faf0ca]/10 hover:bg-[#faf0ca]/20 text-[#faf0ca] font-mono text-xs uppercase tracking-[0.25em] transition-colors cursor-pointer"
              >
                Return to Palace
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
