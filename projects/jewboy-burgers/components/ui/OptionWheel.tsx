"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

export interface OptionWheelProps {
  items: string[];
  defaultSelected?: number;
  textColor?: string;
  activeColor?: string;
  side?: "left" | "right";
  fontSize?: number; // in rem
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  smoothing?: number;
  inset?: number;
  loop?: boolean;
  draggable?: boolean;
  soundUrl?: string;
  soundVolume?: number;
  onChange?: (index: number, item: string) => void;
  className?: string;
}

export default function OptionWheel({
  items,
  defaultSelected = 0,
  textColor = "#a6a6a6",
  activeColor = "#F5C418",
  side = "left",
  fontSize = 2.8,
  spacing = 1.4,
  curve = 1,
  tilt = 6,
  blur = 2,
  fade = 0.35,
  smoothing = 200,
  inset = 80,
  loop = false,
  draggable = true,
  soundUrl,
  soundVolume = 0.5,
  onChange,
  className = "",
}: OptionWheelProps) {
  const [selectedIndex, setSelectedIndex] = useState(
    defaultSelected >= 0 && defaultSelected < items.length ? defaultSelected : 0
  );
  const [offsetY, setOffsetY] = useState(0);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentDragY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (soundUrl && typeof window !== "undefined") {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.volume = soundVolume;
    }
  }, [soundUrl, soundVolume]);

  const playClickSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const selectItem = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;
      setSelectedIndex(index);
      playClickSound();
      if (onChange) {
        onChange(index, items[index]);
      }
    },
    [items, onChange, playClickSound]
  );

  // Drag and Wheel physics
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.deltaY > 20 && selectedIndex < items.length - 1) {
      selectItem(selectedIndex + 1);
    } else if (e.deltaY < -20 && selectedIndex > 0) {
      selectItem(selectedIndex - 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    startY.current = e.clientY;
    currentDragY.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientY - startY.current;
    setOffsetY(delta * 0.2);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientY - startY.current;
    if (delta < -30 && selectedIndex < items.length - 1) {
      selectItem(selectedIndex + 1);
    } else if (delta > 30 && selectedIndex > 0) {
      selectItem(selectedIndex - 1);
    }
    setOffsetY(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientY - startY.current;
    setOffsetY(delta * 0.2);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.changedTouches[0].clientY - startY.current;
    if (delta < -30 && selectedIndex < items.length - 1) {
      selectItem(selectedIndex + 1);
    } else if (delta > 30 && selectedIndex > 0) {
      selectItem(selectedIndex - 1);
    }
    setOffsetY(0);
  };

  const isLeft = side === "left";

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[380px] select-none flex items-center overflow-hidden cursor-grab active:cursor-grabbing ${
        isLeft ? "justify-start" : "justify-end"
      } ${className}`}
      style={{
        perspective: "1200px",
        paddingLeft: isLeft ? `${inset}px` : "0px",
        paddingRight: !isLeft ? `${inset}px` : "0px",
      }}
    >
      {/* 3D Wheel Cylinder Container */}
      <div
        className="relative flex flex-col justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${offsetY}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, index) => {
          const dist = index - selectedIndex;
          const absDist = Math.abs(dist);
          const isSelected = dist === 0;

          // 3D Cylinder Calculations
          const rotateX = dist * -24 * curve;
          const translateY = dist * (fontSize * 22 * spacing);
          const translateZ = -absDist * 40 * curve;
          const itemBlur = absDist * blur;
          const opacity = Math.max(0.12, 1 - absDist * fade);
          const scale = Math.max(0.7, 1 - absDist * 0.08);

          return (
            <div
              key={index}
              onClick={() => selectItem(index)}
              className="py-1 cursor-pointer transition-all duration-300 whitespace-nowrap flex items-center gap-4 group"
              style={{
                transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${
                  isLeft ? tilt : -tilt
                }deg) scale(${scale})`,
                filter: `blur(${itemBlur}px)`,
                opacity: opacity,
                transformOrigin: isLeft ? "left center" : "right center",
              }}
            >
              {/* Active Indicator Line / Pip */}
              {isLeft && (
                <div
                  className={`h-0.5 transition-all duration-300 ${
                    isSelected ? "w-8 bg-[#06B6D4] shadow-glow" : "w-0 bg-transparent group-hover:w-3 group-hover:bg-white/40"
                  }`}
                  style={{
                    backgroundColor: isSelected ? activeColor : undefined,
                  }}
                />
              )}

              {/* Label */}
              <span
                className={`type-display tracking-tight transition-all duration-300 ${
                  isSelected
                    ? "font-extrabold drop-shadow-[0_0_20px_rgba(245,196,24,0.3)] scale-105"
                    : "font-semibold hover:text-white"
                }`}
                style={{
                  fontSize: `${fontSize}rem`,
                  color: isSelected ? activeColor : textColor,
                  textShadow: isSelected ? `0 0 24px ${activeColor}55` : "none",
                }}
              >
                {item}
              </span>

              {!isLeft && (
                <div
                  className={`h-0.5 transition-all duration-300 ${
                    isSelected ? "w-8 bg-[#06B6D4] shadow-glow" : "w-0 bg-transparent group-hover:w-3 group-hover:bg-white/40"
                  }`}
                  style={{
                    backgroundColor: isSelected ? activeColor : undefined,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Center Spotlight Line Overlay */}
      <div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none w-full h-[60px] border-y border-white/5 bg-gradient-to-r from-white/5 to-transparent z-0"
        style={{
          left: 0,
        }}
      />
    </div>
  );
}
