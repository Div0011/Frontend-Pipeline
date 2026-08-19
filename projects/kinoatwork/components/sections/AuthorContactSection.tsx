"use client";

import { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Send, Mail, MapPin, Feather, CheckCircle2, Globe } from "lucide-react";

export default function AuthorContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Film / Screenplay Rights",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.triggerHoverClick();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative z-10 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
            [ CHAPTER 05 — LITERARY & FILM INQUIRIES ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
            Connect With <span className="italic font-normal text-[#d4a84b]">Julian Vance</span>
          </h2>
          <p className="mt-4 text-sm font-sans text-white/60 max-w-xl leading-relaxed">
            For film/TV rights representation, keynote lectures, literary commissions, and press inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Representation Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="text-2xl font-display font-light text-white">
              REPRESENTATION & AGENCY
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <Feather className="w-5 h-5 text-[#d4a84b] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">LITERARY REPRESENTATION</span>
                  <span className="text-white/50 block mt-1">WME Literary & Media Agency &bull; London & NY</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <Globe className="w-5 h-5 text-[#d4a84b] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">FILM & TV SCREENPLAY RIGHTS</span>
                  <span className="text-white/50 block mt-1">Sfumato Pictures &bull; Paris / Los Angeles</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#d4a84b] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">DIRECT AUTHOR DESK</span>
                  <span className="text-white/50 block mt-1">julian@julianvance.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-12 rounded-2xl bg-[#0e0d0c] border border-[#d4a84b]/60 flex flex-col items-center text-center">
                <CheckCircle2 className="w-16 h-16 text-[#d4a84b] mb-4" />
                <h3 className="text-3xl font-display font-light text-white">CORRESPONDENCE SENT</h3>
                <p className="text-sm font-sans text-white/70 mt-2 max-w-md">
                  Thank you for reaching out. Julian Vance’s literary office will respond to your inquiry promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs font-mono text-[#d4a84b] underline tracking-widest"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0b] border border-white/10 flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-white/50 tracking-widest block mb-2 uppercase">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Thorne"
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
                      placeholder="marcus@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#d4a84b] rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/50 tracking-widest block mb-2 uppercase">
                    INQUIRY CATEGORY
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#d4a84b] rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Film / Screenplay Rights">Film / Screenplay Option Rights</option>
                    <option value="Literary Commission">Literary Commission / Keynote</option>
                    <option value="Press & Interview">Press & Media Interview</option>
                    <option value="Reader Message">Reader Letter / General</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/50 tracking-widest block mb-2 uppercase">
                    MESSAGE / BRIEF
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your inquiry details..."
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
                  SEND CORRESPONDENCE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
