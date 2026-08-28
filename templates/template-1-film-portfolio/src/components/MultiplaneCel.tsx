"use client";

import { useState } from "react";
import Image from "next/image";

export default function MultiplaneCel() {
  const [depthOffset, setDepthOffset] = useState(25);

  return (
    <div className="bg-[#0e0d0c] border border-[#c9a96e]/30 p-8 md:p-12 shadow-2xl my-16 font-mono">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#c9a96e]/20 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] text-[#c9a96e] uppercase tracking-widest font-bold">
            CHAPTER 04 // MULTIPLANE CAMERA SIMULATOR (1937)
          </span>
          <h3 className="font-serif text-3xl text-white font-bold uppercase mt-1">
            Multiplane Cel Depth Stacking
          </h3>
        </div>
        <p className="text-xs text-white/60 font-sans font-light max-w-md">
          Invented by Walt Disney Studios for <em className="text-[#c9a96e]">Snow White (1937)</em>, the Multiplane camera moved glass cel layers at different speeds to create true 3D depth in 2D animation.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Multiplane 3D Stage */}
        <div className="lg:col-span-8 bg-[#050507] border border-white/10 h-[380px] relative overflow-hidden flex items-center justify-center shadow-2xl">
          {/* Layer 1: Background Sky */}
          <div
            className="absolute inset-0 transition-transform duration-300 opacity-60"
            style={{
              transform: `scale(1.1) translate3d(${depthOffset * 0.2}px, 0, 0)`,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80"
              alt="Distant Castle Sky"
              fill
              className="object-cover filter contrast-125 brightness-75"
            />
          </div>

          {/* Layer 2: Midground Forest Cel */}
          <div
            className="absolute inset-4 transition-transform duration-300 z-10"
            style={{
              transform: `scale(1.05) translate3d(${depthOffset * 0.6}px, 0, 0)`,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80"
              alt="Midground Forest Cel"
              fill
              className="object-cover opacity-80 mix-blend-screen"
            />
          </div>

          {/* Layer 3: Foreground Character Cel */}
          <div
            className="absolute z-20 w-64 h-80 transition-transform duration-300 drop-shadow-2xl"
            style={{
              transform: `translate3d(${-depthOffset * 1.2}px, 0, 0)`,
            }}
          >
            <div className="w-full h-full border-2 border-[#c9a96e] bg-[#f7f4ec]/10 backdrop-blur-xs p-4 flex flex-col justify-between">
              <div className="text-[9px] text-[#c9a96e] uppercase tracking-widest font-bold border-b border-[#c9a96e]/30 pb-1">
                HAND-DRAWN CEL #402
              </div>
              <div className="text-center font-serif text-5xl">🍎</div>
              <div className="text-[9px] text-white/70 text-right uppercase">SNOW WHITE (1937)</div>
            </div>
          </div>
        </div>

        {/* Depth Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#151412] p-6 border border-white/10 space-y-4">
            <span className="text-[10px] text-[#c9a96e] font-bold uppercase tracking-widest">
              PARALLAX CAMERA CONTROLS
            </span>
            <div>
              <div className="flex justify-between text-xs text-white/80 mb-2">
                <span>CEL SEPARATION DEPTH</span>
                <span className="text-[#c9a96e] font-bold">{depthOffset}px</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={depthOffset}
                onChange={(e) => setDepthOffset(Number(e.target.value))}
                className="w-full accent-[#c9a96e]"
              />
            </div>
            <p className="text-[11px] text-white/50 font-sans leading-relaxed">
              Drag the slider to shift the multiplane camera axis. Notice how foreground cels move faster than distant background layers.
            </p>
          </div>

          <div className="border border-white/10 p-5 bg-[#050507]">
            <div className="text-[#c9a96e] font-bold text-[10px] uppercase mb-1">ACADEMY AWARD CITATION</div>
            <p className="text-xs text-white/70 font-sans font-light">
              Walt Disney was awarded an honorary Academy Award consisting of one full-size Oscar and seven miniature statuettes for <em className="text-white">Snow White</em>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
