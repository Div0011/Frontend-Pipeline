"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCw, Eye } from "lucide-react";

export default function OpticalDevices() {
  const [activeDevice, setActiveDevice] = useState<"thaumatrope" | "zoetrope" | "phenakistoscope" | "flipbook">("thaumatrope");
  const [isFlipped, setIsFlipped] = useState(false);
  const [zoetropeSpeed, setZoetropeSpeed] = useState(3);
  const [isSpinning, setIsSpinning] = useState(true);
  const [flipFrame, setFlipFrame] = useState(0);

  // Flip-book auto-play animation loop
  useEffect(() => {
    if (!isSpinning || activeDevice !== "flipbook") return;
    const interval = setInterval(() => {
      setFlipFrame((f) => (f + 1) % 8);
    }, 150);
    return () => clearInterval(interval);
  }, [isSpinning, activeDevice]);

  return (
    <div className="bg-[#0e0d0c] border border-[#c9a96e]/30 p-6 md:p-10 shadow-2xl my-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#c9a96e]/20 pb-6 mb-8">
        <div>
          <span className="font-mono text-[10px] text-[#c9a96e] uppercase tracking-widest font-bold">
            INTERACTIVE PRE-CINEMA OPTICAL SIMULATOR
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-white font-bold uppercase mt-1">
            Machines That Invented Motion
          </h3>
        </div>

        {/* Device Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "thaumatrope", label: "Thaumatrope (1824)" },
            { id: "zoetrope", label: "Zoetrope (1834)" },
            { id: "phenakistoscope", label: "Phenakistoscope (1831)" },
            { id: "flipbook", label: "Flip-book (1868)" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDevice(d.id as any)}
              className={`px-3 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-all border cursor-pointer ${
                activeDevice === d.id
                  ? "bg-[#c9a96e] text-black border-[#c9a96e] font-bold shadow-lg"
                  : "bg-black/40 text-white/70 border-white/10 hover:border-[#c9a96e]/50 hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Viewer Container */}
      <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[360px]">
        {/* Device Canvas Stage */}
        <div className="lg:col-span-7 bg-[#070709] border border-white/10 p-8 flex flex-col items-center justify-center relative min-h-[320px]">
          {activeDevice === "thaumatrope" && (
            <div className="flex flex-col items-center gap-6">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-48 h-48 rounded-full border-4 border-[#c9a96e] bg-[#f7f4ec] text-black flex items-center justify-center cursor-pointer shadow-2xl transition-transform duration-500 hover:scale-105"
                style={{
                  transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="text-center font-serif">
                  {isFlipped ? (
                    <div className="space-y-1">
                      <div className="text-4xl">🕊️</div>
                      <div className="font-mono text-[10px] text-black/60 uppercase">Side B: Bird</div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-4xl">🕸️</div>
                      <div className="font-mono text-[10px] text-black/60 uppercase">Side A: Cage</div>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-2 font-mono text-xs text-[#c9a96e] border border-[#c9a96e]/40 px-4 py-2 hover:bg-[#c9a96e] hover:text-black transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" /> SPIN THAUMATROPE (PERSISTENCE OF VISION)
              </button>
            </div>
          )}

          {activeDevice === "zoetrope" && (
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              <div className="relative w-48 h-48 rounded-full border-8 border-dashed border-[#c9a96e] flex items-center justify-center bg-[#181715] shadow-2xl">
                <div
                  className="w-36 h-36 rounded-full border-2 border-white/20 flex items-center justify-center font-mono text-xs text-[#c9a96e] transition-transform duration-100"
                  style={{
                    animation: isSpinning ? `spin ${4 / zoetropeSpeed}s linear infinite` : "none",
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl">🏃‍♂️</div>
                    <div className="text-[9px] text-white/50 tracking-widest mt-1">ZOETROPE STRIP</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full">
                <span className="font-mono text-[10px] text-white/60">SPEED:</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={zoetropeSpeed}
                  onChange={(e) => setZoetropeSpeed(Number(e.target.value))}
                  className="flex-1 accent-[#c9a96e]"
                />
                <button
                  onClick={() => setIsSpinning(!isSpinning)}
                  className="p-2 bg-[#c9a96e] text-black font-bold cursor-pointer hover:bg-[#b8985d]"
                >
                  {isSpinning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {activeDevice === "phenakistoscope" && (
            <div className="flex flex-col items-center gap-6">
              <div
                className="w-52 h-52 rounded-full border-4 border-[#c9a96e] bg-[#1a1917] flex items-center justify-center shadow-2xl relative overflow-hidden"
                style={{ animation: isSpinning ? "spin 3s linear infinite" : "none" }}
              >
                <div className="absolute inset-2 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-4 text-2xl">
                    <span>🤾</span>
                    <span>🤸</span>
                    <span>🏃</span>
                    <span>🚶</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsSpinning(!isSpinning)}
                className="flex items-center gap-2 font-mono text-xs text-[#c9a96e] border border-[#c9a96e]/40 px-4 py-2 hover:bg-[#c9a96e] hover:text-black transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" /> TOGGLE MIRROR DISC SPIN
              </button>
            </div>
          )}

          {activeDevice === "flipbook" && (
            <div className="flex flex-col items-center gap-6 w-full max-w-sm">
              <div className="w-64 h-40 bg-[#f7f4ec] border-4 border-[#8c7343] p-4 text-black font-mono shadow-2xl flex flex-col justify-between relative">
                <div className="flex justify-between text-[10px] text-black/50 border-b border-black/10 pb-1">
                  <span>KINEOGRAPH PAGE #{flipFrame + 1} / 8</span>
                  <span>1868 PATENT</span>
                </div>
                <div className="text-center my-auto text-4xl">
                  {["🚶", "🚶‍♂️", "🏃", "🏃‍♂️", "🤸", "🤸‍♂️", "🤾", "🤾‍♂️"][flipFrame]}
                </div>
                <div className="text-[9px] text-black/40 text-right">FLIP TO ANIMATE →</div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSpinning(!isSpinning)}
                  className="flex items-center gap-2 font-mono text-xs bg-[#c9a96e] text-black px-4 py-2 font-bold cursor-pointer hover:bg-[#b8985d]"
                >
                  {isSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isSpinning ? "PAUSE FLIP-BOOK" : "PLAY FLIP-BOOK"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Device Information & History Specs */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs text-white/80">
          {activeDevice === "thaumatrope" && (
            <>
              <span className="text-[#c9a96e] font-bold text-[10px] uppercase tracking-widest">
                PATENT YEAR: 1824 // INVENTOR: JOHN AYRTON PARIS
              </span>
              <h4 className="font-serif text-2xl text-white font-bold">The Thaumatrope</h4>
              <p className="text-white/60 font-sans font-light leading-relaxed">
                A simple disk with a picture on each side attached to two pieces of string. When rotated rapidly, the two images blend into one due to the retina retaining the image—known as persistence of vision.
              </p>
            </>
          )}

          {activeDevice === "zoetrope" && (
            <>
              <span className="text-[#c9a96e] font-bold text-[10px] uppercase tracking-widest">
                PATENT YEAR: 1834 // INVENTOR: WILLIAM GEORGE HORNER
              </span>
              <h4 className="font-serif text-2xl text-white font-bold">The Zoetrope</h4>
              <p className="text-white/60 font-sans font-light leading-relaxed">
                A hollow drum with vertical slots around the sides. As the cylinder spins, looking through the slots creates an illusion of continuous motion from sequential drawing strips placed inside.
              </p>
            </>
          )}

          {activeDevice === "phenakistoscope" && (
            <>
              <span className="text-[#c9a96e] font-bold text-[10px] uppercase tracking-widest">
                PATENT YEAR: 1831 // INVENTOR: JOSEPH PLATEAU
              </span>
              <h4 className="font-serif text-2xl text-white font-bold">The Phenakistoscope</h4>
              <p className="text-white/60 font-sans font-light leading-relaxed">
                Featured spinning cardboard discs with radial slits reflected in a mirror. Spinning the disc in front of a mirror produced the illusion of fluid, looping movement.
              </p>
            </>
          )}

          {activeDevice === "flipbook" && (
            <>
              <span className="text-[#c9a96e] font-bold text-[10px] uppercase tracking-widest">
                PATENT YEAR: 1868 // INVENTOR: JOHN BARNES LINNETT
              </span>
              <h4 className="font-serif text-2xl text-white font-bold">The Flip-book (Kineograph)</h4>
              <p className="text-white/60 font-sans font-light leading-relaxed">
                The first form of animation that used a linear sequence of images rather than a circular loop. Credited with inspiring early 20th-century animators more than mechanical optical wheels.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
