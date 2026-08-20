"use client";

import { Upload, RotateCcw, ZoomIn, ZoomOut, Sparkles, Move, AlertTriangle, Trash2, X } from "lucide-react";
import { type ShirtColor, type Placement, type CustomDesign } from "@/hooks/useCustomizationStore";

const COLOR_HEX: Record<ShirtColor, string> = {
  obsidian: "#181818",
  bone: "#f4efe6",
  sage: "#7e9281",
  terracotta: "#be6943",
  indigo: "#354670",
  sand: "#cebd97",
};

interface TShirtMockupProps {
  color: ShirtColor;
  design: CustomDesign;
  onUpdateDesign: (update: Partial<CustomDesign>) => void;
  onSelectSampleSticker: (src: string) => void;
  onTriggerUpload: () => void;
  onRemoveSticker: () => void;
}

export default function TShirtMockup({
  color,
  design,
  onUpdateDesign,
  onSelectSampleSticker,
  onTriggerUpload,
  onRemoveSticker,
}: TShirtMockupProps) {
  const shirtHex = COLOR_HEX[color] || "#181818";
  const isDarkShirt = color === "obsidian" || color === "indigo" || color === "terracotta";

  // Position styles based on placement
  const getPlacementStyle = (placement: Placement) => {
    switch (placement) {
      case "left-chest":
        return { top: "38%", left: "38%", transform: "translate(-50%, -50%)" };
      case "full-back":
        return { top: "48%", left: "50%", transform: "translate(-50%, -50%)" };
      case "sleeve":
        return { top: "36%", left: "72%", transform: "translate(-50%, -50%)" };
      case "center-chest":
      default:
        return { top: "46%", left: "50%", transform: "translate(-50%, -50%)" };
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* T-Shirt Canvas Frame */}
      <div className="relative w-full aspect-[4/5] bg-[#181514] border border-[#D4654A]/30 rounded-lg overflow-hidden flex items-center justify-center p-4 shadow-2xl group">
        
        {/* Subtle background studio radial light */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${shirtHex}66 0%, transparent 70%)`,
          }}
        />

        {/* Large Vector T-Shirt Canvas */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 500 600"
            className="w-full h-full max-h-[520px] drop-shadow-2xl transition-all duration-500 ease-out"
          >
            <defs>
              <radialGradient id="shirt-3d-shading" cx="50%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={isDarkShirt ? "0.15" : "0.25"} />
                <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
              </radialGradient>

              <linearGradient id="fold-lines" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
                <stop offset="15%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                <stop offset="85%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Main T-Shirt Body Path */}
            <path
              d="M 160 80
                 Q 250 120 340 80
                 L 440 140
                 L 390 230
                 L 345 200
                 L 345 520
                 Q 250 535 155 520
                 L 155 200
                 L 110 230
                 L 60 140
                 Z"
              fill={shirtHex}
              stroke={isDarkShirt ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)"}
              strokeWidth="3"
              strokeLinejoin="round"
              className="transition-colors duration-500 ease-out"
            />

            {/* Neckline & Collar Ribbing */}
            <path
              d="M 160 80 Q 250 130 340 80 Q 250 98 160 80 Z"
              fill={shirtHex}
              filter="brightness(0.82)"
              stroke={isDarkShirt ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)"}
              strokeWidth="2"
            />
            {/* Inner Collar Stitching */}
            <path
              d="M 172 83 Q 250 122 328 83"
              fill="none"
              stroke={isDarkShirt ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Shoulder & Sleeve Seams */}
            <path
              d="M 155 200 L 125 100 M 345 200 L 375 100"
              fill="none"
              stroke={isDarkShirt ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"}
              strokeWidth="2"
            />

            {/* 3D Shading & Folds Layer */}
            <path
              d="M 160 80 Q 250 120 340 80 L 440 140 L 390 230 L 345 200 L 345 520 Q 250 535 155 520 L 155 200 L 110 230 L 60 140 Z"
              fill="url(#shirt-3d-shading)"
              className="pointer-events-none"
            />
            <path
              d="M 160 80 Q 250 120 340 80 L 440 140 L 390 230 L 345 200 L 345 520 Q 250 535 155 520 L 155 200 L 110 230 L 60 140 Z"
              fill="url(#fold-lines)"
              className="pointer-events-none"
            />
          </svg>

          {/* Interactive Sticker / Print Overlay Zone */}
          <div
            className="absolute transition-all duration-500 ease-out flex items-center justify-center"
            style={getPlacementStyle(design.placement)}
          >
            {design.preview ? (
              <div
                className="relative group/sticker transition-transform duration-200 ease-out flex items-center justify-center"
                style={{
                  transform: `scale(${design.scale || 1}) rotate(${design.rotation || 0}deg)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={design.preview}
                  alt="Sticker artwork preview"
                  className="max-w-[150px] max-h-[190px] object-contain drop-shadow-xl select-none"
                  style={{
                    filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.45))",
                  }}
                />

                {/* Remove Sticker Button Badge on hover */}
                <button
                  type="button"
                  onClick={onRemoveSticker}
                  className="absolute -top-3 -right-3 w-7 h-7 bg-[#c8102e] text-white rounded-full flex items-center justify-center shadow-lg border border-white opacity-0 group-hover/sticker:opacity-100 transition-opacity hover:scale-110 active:scale-95"
                  title="Remove sticker"
                >
                  <X size={16} />
                </button>
                
                {/* Print Bounding Box Indicator */}
                <div className="absolute -inset-2 border-2 border-dashed border-amber rounded-sm opacity-0 group-hover/sticker:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                  <span className="bg-amber text-void font-ui text-[9px] font-bold px-2 py-0.5 rounded-xs absolute -top-3 whitespace-nowrap shadow">
                    Print Area • {design.placement} ({Math.round((design.scale || 1) * 100)}%)
                  </span>
                </div>
              </div>
            ) : (
              /* Empty Canvas Prompt */
              <button
                type="button"
                onClick={onTriggerUpload}
                className="w-34 h-38 border-2 border-dashed border-white/50 hover:border-white bg-black/40 hover:bg-white/20 rounded-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-center p-3 group/empty shadow-xl active:scale-95"
              >
                <Upload size={26} className="text-white group-hover/empty:scale-110 mb-1.5 transition-transform animate-bounce" />
                <span className="font-ui text-xs font-bold text-white uppercase tracking-wider">
                  Upload Sticker
                </span>
                <span className="font-ui text-[10px] text-white/80 mt-1">
                  Click for Guidelines
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Live Sticker Controls Bar (if preview uploaded) */}
        {design.preview && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md border border-white/20 p-3 rounded-md flex flex-wrap items-center justify-between gap-3 z-20 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="font-ui text-[10px] uppercase text-white/70 tracking-wider">Scale:</span>
              <button
                onClick={() => onUpdateDesign({ scale: Math.max(0.6, (design.scale || 1) - 0.1) })}
                className="p-1 text-white/80 hover:text-white transition-colors"
                title="Decrease scale"
              >
                <ZoomOut size={16} />
              </button>
              <span className="font-ui text-xs font-bold text-white min-w-[2.2rem] text-center">
                {Math.round((design.scale || 1) * 100)}%
              </span>
              <button
                onClick={() => onUpdateDesign({ scale: Math.min(1.8, (design.scale || 1) + 0.1) })}
                className="p-1 text-white/80 hover:text-white transition-colors"
                title="Increase scale"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateDesign({ rotation: ((design.rotation || 0) + 90) % 360 })}
                className="p-1.5 text-white/80 hover:text-white transition-colors flex items-center gap-1 font-ui text-xs"
                title="Rotate sticker"
              >
                <RotateCcw size={14} />
                Rotate
              </button>

              <button
                onClick={onTriggerUpload}
                className="px-2.5 py-1 bg-white text-[#D4654A] font-ui text-[10px] font-bold uppercase rounded shadow hover:bg-white/90 transition-colors"
              >
                Change
              </button>

              {/* REMOVE / CANCEL STICKER BUTTON */}
              <button
                type="button"
                onClick={onRemoveSticker}
                className="px-2.5 py-1 bg-[#D4654A] text-white border border-white/40 font-ui text-[10px] font-bold uppercase rounded shadow hover:bg-[#E07A60] transition-colors flex items-center gap-1"
                title="Remove sticker"
              >
                <Trash2 size={12} />
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
