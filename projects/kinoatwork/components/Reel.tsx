"use client";

import { useState } from "react";

export default function Reel() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="reel"
        className="relative py-24 md:py-40 px-6 bg-cinema-bg overflow-hidden"
      >
        <div className="max-w-[88rem] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-widest text-cinema-accent border border-cinema-accent/20 px-4 py-2 rounded-full inline-block bg-cinema-surface/40 backdrop-blur-xs select-none">
              SHOWREEL
            </span>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mt-8 text-cinema-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A Selection of <br />
              <span className="text-cinema-accent">Still</span> Moments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Silence of the Ghats",
                camera: "ARRI ALEXA LF // 35mm PRIME",
                color: "SFUMATO PORTRA 400",
                location: "Varanasi Riverfront",
                src: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1600&q=95&fit=crop",
              },
              {
                title: "Desert Solitude",
                camera: "RED V-RAPTOR // 50mm ANAMORPHIC",
                color: "MONOCHROME D90",
                location: "Thar Desert, India",
                src: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1600&q=95&fit=crop",
              },
              {
                title: "After the Light",
                camera: "ARRI ALEXA LF // 45mm ANAMORPHIC",
                color: "SFUMATO NEON 800",
                location: "Mumbai Lights, India",
                src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=95&fit=crop",
              },
              {
                title: "Morning Mist",
                camera: "SONY VENICE 2 // 85mm T1.5",
                color: "WARM GOLDEN CHROME",
                location: "Western Ghats, India",
                src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=95&fit=crop",
              },
            ].map((still) => (
              <div
                key={still.title}
                className="group relative aspect-[16/10] overflow-hidden rounded-md border border-cinema-ink/10 bg-cinema-surface cursor-pointer"
                data-cursor="VIEW LARGE"
              >
                <img
                  src={still.src}
                  alt={still.title}
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-display tracking-wide font-bold text-cinema-ink">
                    {still.title}
                  </h3>
                  <span className="text-[9px] font-mono text-cinema-muted tracking-widest uppercase block mt-1">
                    {still.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 text-[10px] font-mono tracking-widest text-cinema-ink hover:text-cinema-accent uppercase border border-cinema-ink/20 hover:border-cinema-accent px-6 py-3.5 rounded-full transition-all duration-300"
              data-cursor="PLAY REEL"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Showreel
            </button>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-bg/95 backdrop-blur-md">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-8 right-8 text-cinema-muted hover:text-cinema-ink text-[10px] font-mono tracking-widest uppercase"
          >
            [ Close Player ]
          </button>
          <div className="w-full max-w-5xl aspect-video px-4 md:px-8">
            <div className="w-full h-full rounded-md border border-cinema-ink/10 bg-cinema-surface flex items-center justify-center">
              <p className="type-caption text-cinema-muted">Showreel placeholder</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
