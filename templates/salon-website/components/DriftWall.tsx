'use client';

import React, { useRef, useState } from 'react';

export interface DriftItem {
  image: string;
  title: string;
  href?: string;
  subtitle?: string;
}

export interface DriftWallProps {
  items: DriftItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  tilt?: number;
  turn?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  lift?: number;
  fade?: number;
  dim?: number;
  overlayColor?: string;
  radius?: number;
  roll?: number;
  pauseOnHover?: boolean;
  grayscale?: boolean;
  onItemClick?: (item: DriftItem) => void;
}

export default function DriftWall({
  items,
  columns = 4,
  tileWidth = 240,
  tileHeight = 160,
  gap = 20,
  tilt = 12,
  turn = -10,
  perspective = 1200,
  depth = 100,
  speed = 30,
  direction = 'up',
  variance = 0.35,
  parallax = 0.5,
  lift = 40,
  fade = 0.5,
  dim = 0.4,
  overlayColor = '#09090a',
  radius = 12,
  roll = 0,
  pauseOnHover = true,
  grayscale = false,
  onItemClick,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate column arrays
  const columnData = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    const cols: DriftItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, idx) => {
      cols[idx % columns].push(item);
    });
    // Duplicate column contents to achieve seamless infinite looping
    return cols.map((col) => col.concat(col).concat(col));
  }, [items, columns]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const calculatedTilt = tilt + mousePos.y * 15 * parallax;
  const calculatedTurn = turn + mousePos.x * 20 * parallax;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '500px',
        overflow: 'hidden',
        perspective: `${perspective}px`,
        backgroundColor: overlayColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D Tilted Plane */}
      <div
        style={{
          display: 'flex',
          gap: `${gap}px`,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${calculatedTilt}deg) rotateY(${calculatedTurn}deg) rotateZ(${roll}deg) translateZ(${depth}px)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {columnData.map((col, colIdx) => {
          // Add column-specific variance and offset
          const colVariance = (colIdx % 2 === 0 ? 1 : -1) * variance;
          const animDuration = Math.max(15, speed + colIdx * 4);
          const isReversed = direction === 'down' ? colIdx % 2 === 0 : colIdx % 2 !== 0;

          return (
            <div
              key={colIdx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${gap}px`,
                animation: `driftScroll ${animDuration}s linear infinite`,
                animationDirection: isReversed ? 'reverse' : 'normal',
                animationPlayState: isHovered && pauseOnHover ? 'paused' : 'running',
                transform: `translateY(${colVariance * 60}px)`,
              }}
            >
              {col.map((item, itemIdx) => (
                <div
                  key={`${colIdx}-${itemIdx}`}
                  onClick={() => onItemClick?.(item)}
                  style={{
                    position: 'relative',
                    width: `${tileWidth}px`,
                    height: `${tileHeight}px`,
                    borderRadius: `${radius}px`,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(230, 198, 135, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: grayscale ? 'grayscale(100%)' : 'none',
                    transform: 'translateZ(0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `translateZ(${lift}px) scale(1.05)`;
                    e.currentTarget.style.borderColor = 'rgba(230, 198, 135, 0.6)';
                    e.currentTarget.style.zIndex = '50';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(230, 198, 135, 0.15)';
                    e.currentTarget.style.zIndex = '1';
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {/* Subtle Dim Scrim */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(180deg, transparent 40%, rgba(9, 9, 10, ${dim + 0.3}) 100%)`,
                    }}
                  />
                  {/* Label */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      left: '0.75rem',
                      right: '0.75rem',
                      color: '#fcfbf9',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                        display: 'block',
                      }}
                    >
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.62rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#e6c687',
                        }}
                      >
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Top & Bottom Vignette Fades */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: `${fade * 240}px`,
          background: `linear-gradient(180deg, ${overlayColor} 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${fade * 240}px`,
          background: `linear-gradient(0deg, ${overlayColor} 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />

      <style jsx>{`
        @keyframes driftScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
