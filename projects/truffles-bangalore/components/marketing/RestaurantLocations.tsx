"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const outposts = [{"id": "st-marks", "name": "St. Mark's Road Landmark", "badge": "LEGENDARY 2004 FLAGSHIP", "address": "Apex Building, St. Mark's Road", "city": "Bengaluru 560001", "hours": "11:00 AM \u2013 11:00 PM", "phone": "+91 80 4112 0189", "status": "Active \u00b7 Landmark Diners", "seating": "Iconic Diner Booths & Counter", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Truffles+St+Marks+Road+Bangalore"}, {"id": "koramangala", "name": "Koramangala 5th Block", "badge": "CAMPUS CULT OUTPOST", "address": "28, 4th B Cross, 5th Block", "city": "Bengaluru 560095", "hours": "11:00 AM \u2013 11:30 PM", "phone": "+91 80 4146 6565", "status": "Active \u00b7 Fast Service", "seating": "Vibrant Casual Dining", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80", "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Truffles+Koramangala"}];

export default function RestaurantLocations() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentLoc = outposts[selectedLocation] || outposts[0];
  const allImages = currentLoc ? [currentLoc.heroImage, ...(currentLoc.gallery || [])] : [];

  return (
    <section
      id="locations-section"
      className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
                        <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              BENGALURU KITCHENS
            </h2>
          </div>

          {outposts.length > 1 && (
            <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/10">
              {outposts.map((loc: any, idx: number) => (
                <button
                  key={loc.id || idx}
                  onClick={() => {
                    setSelectedLocation(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all font-bold ${
                    selectedLocation === idx
                      ? "shadow-lg"
                      : "text-stone-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: selectedLocation === idx ? "#F5A623" : undefined,
                    color: selectedLocation === idx ? "#000000" : undefined,
                  }}
                >
                  {loc.name.split(" ")[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {currentLoc && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 relative min-h-[420px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/50 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedLocation}-${activeImageIndex}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={allImages[activeImageIndex] || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80"}
                    alt={currentLoc.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-6 left-6 z-10">
                <span
                  className="px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-lg"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#000000",
                  }}
                >
                  {currentLoc.badge || "FEATURED OUTPOST"}
                </span>
              </div>

              {allImages.length > 1 && (
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {allImages.map((img: string, iIdx: number) => (
                      <button
                        key={iIdx}
                        onClick={() => setActiveImageIndex(iIdx)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shadow ${
                          activeImageIndex === iIdx
                            ? "scale-110"
                            : "border-white/30 opacity-70 hover:opacity-100"
                        }`}
                        style={{
                          borderColor: activeImageIndex === iIdx ? "#F5A623" : undefined,
                        }}
                      >
                        <Image src={img} alt="Thumbnail" fill className="object-cover" />
                      </button>
                    ))}
                  </div>

                  <span className="font-mono text-xs text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    View {activeImageIndex + 1} of {allImages.length}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 flex flex-col justify-between shadow-2xl space-y-6">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold block" style={{ color: "#F5A623" }}>
                    OUTPOST DETAILS
                  </span>
                  <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                    {currentLoc.name}
                  </h3>
                  <p className="font-mono text-xs text-stone-300">
                    {currentLoc.address}
                  </p>
                  <p className="font-mono text-xs font-bold" style={{ color: "#F5A623" }}>
                    {currentLoc.city}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <span className="font-mono text-xs text-white font-bold block">
                      {currentLoc.status || "Kitchen Active"}
                    </span>
                    <span className="font-mono text-[10px] text-stone-400">
                      Hours: {currentLoc.hours}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-stone-300 pt-2 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Atmosphere:</span>
                    <span className="text-white font-bold">{currentLoc.seating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Direct Line:</span>
                    <span className="font-bold" style={{ color: "#F5A623" }}>{currentLoc.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <a
                  href={currentLoc.mapUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-3 rounded-lg font-mono text-xs font-extrabold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-xl"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#000000",
                  }}
                >
                  Directions ↗
                </a>
                <a
                  href={`tel:${String(currentLoc.phone || "").replace(/\D/g, "")}`}
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 active:scale-95 transition-all"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
