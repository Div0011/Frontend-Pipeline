"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const outposts = [
  {
    "id": "manchaca",
    "name": "Manchaca Road",
    "badge": "SOUTH AUSTIN CLASSIC",
    "address": "5602 Manchaca Rd",
    "city": "Austin, TX 78745",
    "hours": "6:00 AM \u2013 9:00 PM",
    "phone": "+1 512-448-3800",
    "status": "Drive-Thru & Dine-In Active",
    "seating": "Vintage Booths & Patio",
    "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    ],
    "mapUrl": "https://maps.google.com/?q=Dans+Hamburgers+Manchaca"
  }
];

export default function RestaurantLocations() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentLoc = outposts[selectedLocation] || outposts[0];
  const allImages = currentLoc ? [currentLoc.heroImage, ...(currentLoc.gallery || [])] : [];

  return (
    <section
      id="locations-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              AUSTIN KITCHENS
            </h2>
          </div>

          {outposts.length > 1 && (
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
              {outposts.map((loc: any, idx: number) => (
                <button
                  key={loc.id || idx}
                  onClick={() => {
                    if ((window as any).playPopSound) (window as any).playPopSound();
                    setSelectedLocation(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-wider transition-all font-bold ${
                    selectedLocation === idx
                      ? "shadow-lg"
                      : "text-stone-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: selectedLocation === idx ? "#E52421" : undefined,
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
            {/* Visual Photography Carousel */}
            <div className="lg:col-span-7 relative min-h-[420px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/50 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentLoc.id}-${activeImageIndex}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={allImages[activeImageIndex] || currentLoc.heroImage}
                    alt={currentLoc.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Text Over Image — always white regardless of theme */}
              <div data-image-overlay className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 z-10">
                <div className="space-y-1 text-white">
                  <span className="text-[10px] uppercase tracking-widest font-bold block" style={{ color: "#E52421" }}>
                    {currentLoc.badge}
                  </span>
                  <h3 className="type-display text-2xl sm:text-3xl text-white font-extrabold drop-shadow-md">
                    {currentLoc.name}
                  </h3>
                </div>

                {allImages.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                    {allImages.map((_, imgIdx) => (
                      <button
                        key={imgIdx}
                        onClick={() => setActiveImageIndex(imgIdx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeImageIndex === imgIdx
                            ? "w-5 bg-[#E52421]"
                            : "bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Location Specs & Quick Actions Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-emerald-400" />
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    {currentLoc.status}
                  </span>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Address
                    </span>
                    <p className="text-white font-semibold text-sm">{currentLoc.address}</p>
                    <p className="text-stone-400">{currentLoc.city}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Hours
                      </span>
                      <p className="text-white font-bold">{currentLoc.hours}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Seating
                      </span>
                      <p className="text-white font-bold text-[11px] leading-tight">
                        {currentLoc.seating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <a
                  href={currentLoc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider text-center transition-all shadow-lg hover:brightness-110 active:scale-95"
                  style={{
                    backgroundColor: "#E52421",
                    color: "#000000",
                  }}
                >
                  Directions ↗
                </a>

                <a
                  href={`tel:${currentLoc.phone.replace(/[^0-9+]/g, "")}`}
                  className="py-3.5 px-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider text-center bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15"
                >
                  Call Outpost
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
