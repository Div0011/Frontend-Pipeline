'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface OptionWheelProps {
  items?: string[];
  defaultSelected?: number;
  textColor?: string;
  activeColor?: string;
  side?: 'left' | 'right';
  fontSize?: number;
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  draggable?: boolean;
  onChange?: (index: number, item: string) => void;
  onSelect?: (index: number, item: string) => void;
}

const DEFAULT_ITEMS = ['Overview', 'Heritage', 'Atelier', 'Rituals', 'Booking', 'Contact'];

export default function OptionWheel({
  items = DEFAULT_ITEMS,
  defaultSelected = 0,
  textColor = '#666666',
  activeColor = '#ffffff',
  fontSize = 1.6,
  spacing = 1.3,
  curve = 1,
  tilt = 6,
  blur = 2,
  fade = 0.25,
  draggable = true,
  onChange,
  onSelect,
}: OptionWheelProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [offset, setOffset] = useState(defaultSelected);
  const targetOffset = useRef(defaultSelected);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const lastY = useRef(0);
  const rafId = useRef<number | null>(null);

  // Sync external index changes when not open
  useEffect(() => {
    if (!isOpen && defaultSelected !== undefined && defaultSelected !== selectedIndex) {
      setSelectedIndex(defaultSelected);
      targetOffset.current = defaultSelected;
    }
  }, [defaultSelected, selectedIndex, isOpen]);

  // Smooth lerp loop for wheel rotation
  useEffect(() => {
    const update = () => {
      setOffset((prev) => {
        const diff = targetOffset.current - prev;
        if (Math.abs(diff) < 0.001) return targetOffset.current;
        return prev + diff * 0.15;
      });
      rafId.current = requestAnimationFrame(update);
    };
    rafId.current = requestAnimationFrame(update);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Navigate ONLY when the user explicitly clicks/confirms an option
  const executeNavigation = useCallback(
    (index: number) => {
      targetOffset.current = index;
      setSelectedIndex(index);
      setOffset(index);

      if (onSelect) {
        onSelect(index, items[index]);
      } else {
        const routes: Record<number, string> = {
          0: '/',
          1: '/story',
          2: '/about',
          3: '/catalogue',
          4: '/booking',
          5: '/#contact',
        };
        const targetRoute = routes[index];
        if (targetRoute) {
          router.push(targetRoute);
        }
      }
      setIsOpen(false);
    },
    [items, onSelect, router]
  );

  // Wheel scrolling ONLY changes selection highlight, does NOT navigate on its own
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY > 0 ? 1 : -1;
    const nextIdx = Math.max(0, Math.min(items.length - 1, Math.round(targetOffset.current + delta)));
    targetOffset.current = nextIdx;
    setSelectedIndex(nextIdx);
    onChange?.(nextIdx, items[nextIdx]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    startY.current = e.clientY;
    lastY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = (lastY.current - e.clientY) / (fontSize * 36);
    lastY.current = e.clientY;
    const next = Math.max(0, Math.min(items.length - 1, targetOffset.current + delta));
    targetOffset.current = next;
    const currentRounded = Math.round(next);
    if (currentRounded !== selectedIndex) {
      setSelectedIndex(currentRounded);
      onChange?.(currentRounded, items[currentRounded]);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const nearest = Math.max(0, Math.min(items.length - 1, Math.round(targetOffset.current)));
    targetOffset.current = nearest;
    setSelectedIndex(nearest);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      const next = Math.min(items.length - 1, selectedIndex + 1);
      targetOffset.current = next;
      setSelectedIndex(next);
    } else if (e.key === 'ArrowUp') {
      const prev = Math.max(0, selectedIndex - 1);
      targetOffset.current = prev;
      setSelectedIndex(prev);
    } else if (e.key === 'Enter') {
      executeNavigation(selectedIndex);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      {/* Sleek Minimal Collapsible Menu Trigger Button (Top Right) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Navigation Index"
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2.5rem',
          zIndex: 100,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.4rem 0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#ffffff',
          outline: 'none',
          pointerEvents: 'auto',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: isOpen ? '#ffffff' : '#aaaaaa',
            transition: 'color 0.3s ease',
          }}
        >
          {isOpen ? 'Close' : 'Index'}
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '18px',
          }}
        >
          <span
            style={{
              height: '1px',
              width: '100%',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease',
              transform: isOpen ? 'rotate(45deg) translate(3px, 3.5px)' : 'none',
            }}
          />
          <span
            style={{
              height: '1px',
              width: isOpen ? '100%' : '65%',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              opacity: isOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              height: '1px',
              width: '100%',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease',
              transform: isOpen ? 'rotate(-45deg) translate(3px, -3.5px)' : 'none',
            }}
          />
        </div>
      </button>

      {/* 3D Option Wheel Drawer */}
      <div
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          width: 'min(420px, 92vw)',
          background: 'rgba(9, 9, 10, 0.94)',
          backdropFilter: 'blur(36px)',
          WebkitBackdropFilter: 'blur(36px)',
          zIndex: 98,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          userSelect: 'none',
          cursor: draggable ? 'grab' : 'pointer',
          perspective: '1000px',
          padding: '3.5rem 3rem',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, visibility 0.35s ease',
          outline: 'none',
        }}
      >
        {/* Helper Hint */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '2rem',
            textAlign: 'right',
          }}
        >
          Scroll to select • Click to visit
        </div>

        {/* Wheel Items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: `${spacing * 0.85}rem`,
            transformStyle: 'preserve-3d',
            width: '100%',
          }}
        >
          {items.map((item, index) => {
            const dist = index - offset;
            const absDist = Math.abs(dist);
            const isCurrent = Math.round(offset) === index;

            const rotateX = dist * tilt * 4;
            const rotateY = -curve * dist * 3;
            const translateZ = -absDist * 20;
            const itemOpacity = Math.max(fade, 1 - absDist * 0.35);
            const itemBlur = absDist > 0.4 ? `${Math.min(blur, absDist * 1.5)}px` : '0px';

            return (
              <button
                key={item}
                type="button"
                onClick={() => executeNavigation(index)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  flexDirection: 'row-reverse',
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                  transformOrigin: 'right center',
                  opacity: itemOpacity,
                  filter: `blur(${itemBlur})`,
                  transition: 'color 0.25s ease, opacity 0.25s ease, transform 0.2s ease',
                  outline: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: `${fontSize * 1.15}rem`,
                    fontWeight: isCurrent ? 400 : 300,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isCurrent ? activeColor : textColor,
                    whiteSpace: 'nowrap',
                    textShadow: isCurrent ? '0 0 25px rgba(255,255,255,0.4)' : 'none',
                  }}
                >
                  {item}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: isCurrent ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                  }}
                >
                  0{index + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explicit Confirm Button */}
        <div style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            onClick={() => executeNavigation(selectedIndex)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              background: '#ffffff',
              color: '#09090a',
              border: 'none',
              borderRadius: '100px',
              padding: '0.65rem 1.6rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Visit {items[selectedIndex]}</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
