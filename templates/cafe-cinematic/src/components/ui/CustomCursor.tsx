'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [smoothPos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      setIsPointer(!!interactive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  const size = isPointer ? 48 : 8;
  const isDarkBg = false; // We can make this dynamic later if needed, but gold works on both

  return (
    <div
      ref={cursorRef}
      className="hidden md:block pointer-events-none fixed inset-0 z-[10050]"
    >
      <div
        className="pointer-events-none fixed top-0 left-0 z-[10050] rounded-full mix-blend-difference"
        style={{
          width: size,
          height: size,
          backgroundColor: isPointer ? 'rgba(255, 255, 255, 0.15)' : '#C4A77D',
          border: isPointer ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
          boxShadow: isPointer ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 8px rgba(196, 167, 125, 0.5)',
          transform: `translate(${smoothPos.x - size / 2}px, ${smoothPos.y - size / 2}px) scale(${isVisible ? 1 : 0})`,
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border 0.3s ease',
          willChange: 'transform, width, height',
        }}
      />
    </div>
  );
}
