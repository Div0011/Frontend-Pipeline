"use client";

import { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Send, MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Commercial",
    budget: "$50k - $100k",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.triggerHoverClick();
    setSubmitted(true);
  };

  return (
    <section className="relative z-20 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3] bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
            [ CHAPTER 06 — INITIATE PRODUCTION ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
            Let’s Film <span className="italic font-normal text-[#d4a84b]">Together</span>
          </h2>
          <p className="mt-4 text-sm font-sans text-white/60 max-w-xl leading-relaxed">
            Have a commercial, feature, or brand campaign concept? Reach out to our directors and post-production leads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Info & Studios */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <h3 className="text-2xl font-display font-light text-white mb-6">
                GLOBAL STUDIO HUBS
              </h3>

              <div className="space-y-6 text-xs font-mono">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#d4a84b] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">MUMBAI & PARIS HUB</span>
                    <span className="text-white/50 block mt-1">Sfumato Studios, Bandra West & 11th Arr. Paris</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#d4a84b] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">DIRECT COMMISION INQUIRIES</span>
                    <span className="text-white/50 block mt-1">productions@kinoatwork.com</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#d4a84b] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">STUDIO DIRECT LINE</span>
                    <span className="text-white/50 block mt-1">+91 (022) 884-SFUMATO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-12 rounded-2xl bg-[#0e0e0e] border border-[#d4a84b]/60 flex flex-col items-center text-center">
                <CheckCircle2 className="w-16 h-16 text-[#d4a84b] mb-4" />
                <h3 className="text-3xl font-display font-light text-white">INQUIRY RECEIVED</h3>
                <p className="text-sm font-sans text-white/70 mt-2 max-w-md">
                  Thank you for reaching out. Producer Aarav & Elena will review your brief within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs font-mono text-[#d4a84b] underline tracking-widest"
                >
                  SEND ANOTHER BRIEF
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-white/50 tracking-widest block mb-2 uppercase">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sofia Laurent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#d4a84b] rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/50 tracking-widest block mb-2 uppercase">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sofia@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#d4a84b] rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-white/50 tracking-widest block mb-2 uppercase">
                      PROJECT TYPE
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#d4a84b] rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="Commercial">Commercial Film</option>
                      <option value="Feature">Feature Film</option>
                      <option value="Culinary">Food & Beverage Specialty</option>
                      <option value="Post-Production">Color & Sound Post</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/50 tracking-widest block mb-2 uppercase">
                      ESTIMATED BUDGET
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#d4a84b] rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="$25k - $50k">$25,000 - $50,000</option>
                      <option value="$50k - $100k">$50,000 - $100,000</option>
                      <option value="$100k+">$100,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/50 tracking-widest block mb-2 uppercase">
                    PROJECT BRIEF & VISION
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your brand narrative, timeline, and visual aesthetic..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#d4a84b] rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 bg-[#d4a84b] text-black font-mono text-xs font-semibold tracking-widest py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  SUBMIT PRODUCTION BRIEF
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
