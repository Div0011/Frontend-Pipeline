"use client";

import React, { useRef, useState, useEffect } from "react";

interface StickerProps {
  emoji: string;
  label: string;
  initialX: number;
  initialY: number;
  rotate: number;
  bg: string;
}

function Sticker({
  emoji,
  label,
  initialX,
  initialY,
  rotate,
  bg,
}: StickerProps) {
  const stickerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(rotate);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    const rect = stickerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const rect = stickerRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      setDragOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const parent = stickerRef.current?.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        // Get scrolling offsets if dragging across scroll
        let newX = e.clientX - parentRect.left - dragOffset.x;
        let newY = e.clientY - parentRect.top - dragOffset.y;

        // Contain boundaries
        newX = Math.max(10, Math.min(newX, parentRect.width - 120));
        newY = Math.max(10, Math.min(newY, parentRect.height - 120));

        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const parent = stickerRef.current?.parentElement;
      if (parent && e.touches[0]) {
        const parentRect = parent.getBoundingClientRect();
        let newX = e.touches[0].clientX - parentRect.left - dragOffset.x;
        let newY = e.touches[0].clientY - parentRect.top - dragOffset.y;

        newX = Math.max(10, Math.min(newX, parentRect.width - 120));
        newY = Math.max(10, Math.min(newY, parentRect.height - 120));

        setPosition({ x: newX, y: newY });
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      // Give a tiny random rotate nudge on drop
      setRotation((prev) => prev + (Math.random() - 0.5) * 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={stickerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg) scale(${isDragging ? 1.15 : 1})`,
        backgroundColor: bg,
      }}
      className={`absolute w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-4 border-black flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] active:shadow-[2px_2px_0px_#000] z-[45] transition-shadow duration-100 text-center p-1.5`}
    >
      <span className="text-3xl sm:text-4xl pointer-events-none">{emoji}</span>
      <span
        className="text-[9px] font-bold uppercase tracking-wider text-black mt-1 pointer-events-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function DraggableStickers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden">
      <div className="relative w-full h-full pointer-events-auto">
        <Sticker
          emoji="⭐"
          label="MUST TRY"
          initialX={80}
          initialY={140}
          rotate={-15}
          bg="#FFC800"
        />
        <Sticker
          emoji="🌶️"
          label="SPICY"
          initialX={1280}
          initialY={350}
          rotate={12}
          bg="#E63946"
        />
        <Sticker
          emoji="🍳"
          label="CHEF'S PICK"
          initialX={60}
          initialY={980}
          rotate={8}
          bg="#FFE066"
        />
        <Sticker
          emoji="🥤"
          label="CRAFT SHAKE"
          initialX={1320}
          initialY={1500}
          rotate={-10}
          bg="#FAF6F0"
        />
        <Sticker
          emoji="👑"
          label="SMASH KING"
          initialX={150}
          initialY={2400}
          rotate={5}
          bg="#FFC800"
        />
      </div>
    </div>
  );
}
