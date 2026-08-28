"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface AccordionGalleryItem {
  image: string;
  label: string;
  category?: string;
  price?: string;
  caption?: string;
  link?: string;
}

export interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: "hover" | "click";
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  height?: number | string;
  gap?: number;
  radius?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.5,
  trigger = "hover",
  accentColor = "#F5C418",
  textColor = "#ffffff",
  grayscale = false,
  showLabels = true,
  duration = 0.5,
  parallax = 0.2,
  tilt = 4,
  height = 500,
  gap = 12,
  radius = 16,
  orientation = "horizontal",
  className = "",
}: AccordionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(
    defaultIndex >= 0 && defaultIndex < items.length ? defaultIndex : 0
  );
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const isHorizontal = orientation === "horizontal";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt && !parallax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const getFlexValue = (index: number) => {
    if (activeIndex === index) {
      return expandRatio;
    }
    const remainingRatio = 1 - expandRatio;
    return remainingRatio / (items.length - 1);
  };

  return (
    <div
      className={`w-full select-none overflow-hidden ${className}`}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        gap: `${gap}px`,
      }}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        const flexVal = getFlexValue(index);

        return (
          <div
            key={index}
            onMouseEnter={() => {
              if (trigger === "hover") setActiveIndex(index);
            }}
            onClick={() => {
              if (trigger === "click") setActiveIndex(index);
            }}
            onMouseMove={(e) => isActive && handleMouseMove(e)}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer overflow-hidden transition-all group bg-stone-900"
            style={{
              flex: `${flexVal} ${flexVal} 0%`,
              borderRadius: `${radius}px`,
              transitionDuration: `${duration}s`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transform:
                isActive && tilt
                  ? `perspective(1000px) rotateY(${mousePos.x * tilt}deg) rotateX(${-mousePos.y * tilt}deg)`
                  : "perspective(1000px) rotateY(0deg) rotateX(0deg)",
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                transform:
                  isActive && parallax
                    ? `scale(1.05) translate3d(${mousePos.x * parallax * 8}px, ${mousePos.y * parallax * 8}px, 0)`
                    : "scale(1) translate3d(0, 0, 0)",
                transition: "transform 0.3s ease-out, filter 0.4s ease",
                filter: grayscale && !isActive ? "grayscale(80%) brightness(0.6)" : "grayscale(0%) brightness(0.95)",
              }}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-center"
                priority={index <= 2}
              />
            </div>

            {/* Subtle Gradient Overlay for Text Readability */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-400"
              style={{
                background: isActive
                  ? "linear-gradient(to top, rgba(10, 10, 12, 0.9) 0%, rgba(10, 10, 12, 0.4) 40%, transparent 80%)"
                  : "linear-gradient(to top, rgba(10, 10, 12, 0.85) 0%, rgba(10, 10, 12, 0.4) 100%)",
                opacity: 0.8,
              }}
            />

            {/* Active Border Accent */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-400"
              style={{
                border: `2px solid ${isActive ? accentColor : "rgba(255,255,255,0.08)"}`,
                opacity: isActive ? 1 : 0.4,
              }}
            />

            {/* Collapsed State Label — always white, on image */}
            {!isActive && showLabels && isHorizontal && (
              <div data-image-overlay className="absolute inset-0 flex flex-col justify-end p-4 z-10 pointer-events-none">
                <span
                  className="font-mono text-xs uppercase tracking-widest text-black/90 transform -rotate-90 origin-bottom-left translate-x-4 mb-8 whitespace-nowrap group-hover:text-black transition-all duration-300 font-bold drop-shadow-md"
                >
                  {item.label}
                </span>
                <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: accentColor }} />
              </div>
            )}

            {/* Expanded State Content Card — always white, on image */}
            <div
              data-image-overlay
              className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-20 transition-all duration-400 ${
                isActive ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
              }`}
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between">
                {item.category && (
                  <span
                    className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border shadow-lg"
                    style={{
                      borderColor: `${accentColor}50`,
                      backgroundColor: "rgba(0,0,0,0.65)",
                      color: accentColor,
                    }}
                  >
                    {item.category}
                  </span>
                )}
                {item.price && (
                  <span
                    className="font-mono font-bold text-sm px-3.5 py-1 rounded-md bg-white text-black border border-[#C68A14]/25 backdrop-blur-md shadow-lg"
                  >
                    {item.price}
                  </span>
                )}
              </div>

              {/* Bottom Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                  <span className="font-mono text-xs uppercase tracking-widest text-stone-700 font-bold">
                    FEATURED SPECIMEN
                  </span>
                </div>

                <h3 className="type-display text-3xl sm:text-4xl text-black font-bold tracking-tight drop-shadow-md">
                  {item.label}
                </h3>

                {item.caption && (
                  <p className="text-stone-700 text-xs sm:text-sm font-sans line-clamp-2 max-w-lg leading-relaxed drop-shadow-sm">
                    {item.caption}
                  </p>
                )}

                <div className="pt-2">
                  <Link
                    href={item.link || "/menu"}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider shadow-xl hover:opacity-90 active:scale-95 transition-all duration-200"
                    style={{
                      backgroundColor: accentColor,
                      color: "#000000",
                    }}
                  >
                    <span>Order from Menu</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
