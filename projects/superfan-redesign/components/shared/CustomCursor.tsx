'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

type CursorVariant = 'default' | 'hover' | 'play' | 'drag' | 'loading';

export const CustomCursor: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorLabel, setCursorLabel] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [trailingRing, setTrailingRing] = useState({ x: -100, y: -100, scale: 1 });
  const lastPos = useRef({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    const fine = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
    setIsFinePointer(fine);
  }, []);

  useEffect(() => {
    if (prefersReduced || !isFinePointer) return;
    let anim: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      setVelocity(Math.min(speed / 2, 20));

      if (speed > 6) {
        setTrailingRing((prev) => ({
          x: prev.x + dx * 0.6,
          y: prev.y + dy * 0.6,
          scale: 1 + speed / 60,
        }));
      } else {
        setTrailingRing((prev) => ({
          x: prev.x + (e.clientX - prev.x) * 0.15,
          y: prev.y + (e.clientY - prev.y) * 0.15,
          scale: 1,
        }));
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [prefersReduced, isFinePointer]);

  useEffect(() => {
    if (prefersReduced || !isFinePointer) return;
    let animationFrameId: number;
    const updateTrailingPos = () => {
      setTrailingPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrailingPos);
    };
    animationFrameId = requestAnimationFrame(updateTrailingPos);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, prefersReduced, isFinePointer]);

  useEffect(() => {
    if (!isFinePointer) return;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor], button, a, input, select, video');
      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor');
        if (customText) {
          setVariant('hover');
          setCursorLabel(customText);
          return;
        }
        if (interactiveEl.tagName === 'VIDEO') {
          setVariant('play');
          setCursorLabel('PLAY');
          return;
        }
        if (interactiveEl.closest('[data-cursor-drag]') || interactiveEl.getAttribute('draggable') === 'true') {
          setVariant('drag');
          setCursorLabel('DRAG');
          return;
        }
        setVariant('hover');
        setCursorLabel('');
      } else {
        setVariant('default');
        setCursorLabel('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [isFinePointer]);

  if (!isMounted || !isFinePointer || prefersReduced) return null;

  const dotScale = 1 + velocity / 10;
  const isInteractive = variant !== 'default';
  const ringSize = variant === 'play' ? '56px' : isInteractive ? (cursorLabel ? '92px' : '52px') : isClicking ? '28px' : '40px';
  const trailingSize = variant === 'play' ? '44px' : isInteractive ? (cursorLabel ? '70px' : '38px') : isClicking ? '18px' : '28px';
  const ringBorder = isInteractive ? 'rgba(0, 212, 255, 0.85)' : 'rgba(255, 255, 255, 0.5)';
  const ringGlow = isInteractive ? '0 0 25px rgba(0, 212, 255, 0.5)' : '0 0 8px rgba(0, 212, 255, 0.4)';

  return (
    <div style={{ pointerEvents: 'none', zIndex: 999999, position: 'fixed', inset: 0 }}>
      {!prefersReduced && (
        <div
          style={{
            position: 'fixed',
            top: trailingRing.y,
            left: trailingRing.x,
            width: parseFloat(trailingSize) * trailingRing.scale,
            height: parseFloat(trailingSize) * trailingRing.scale,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '1px solid rgba(0, 82, 204, 0.25)',
            backgroundColor: 'rgba(0, 82, 204, 0.08)',
            opacity: Math.max(0.2, 1 - velocity / 20),
            transition: 'border-color 0.25s var(--ease-expo-out), background-color 0.25s ease',
            pointerEvents: 'none',
            zIndex: 999998,
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: ringSize,
          height: ringSize,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: `1.5px solid ${ringBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0052cc',
          fontSize: variant === 'play' ? '16px' : '10px',
          fontWeight: 700,
          fontFamily: 'var(--font-ui)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          textAlign: 'center',
          transition: 'width 0.25s var(--ease-expo-out), height 0.25s var(--ease-expo-out), border-color 0.25s ease',
          pointerEvents: 'none',
        }}
      >
        {variant === 'play' ? (
          <span style={{ marginLeft: '3px' }}>▶</span>
        ) : isInteractive && cursorLabel ? (
          <span>{cursorLabel}</span>
        ) : null}
      </div>

      {variant !== 'play' && (
        <div
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            width: `${8 * dotScale}px`,
            height: `${8 * dotScale}px`,
            backgroundColor: '#00d4ff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.1s ease, height 0.1s ease, background-color 0.15s ease',
            pointerEvents: 'none',
            boxShadow: isInteractive ? '0 0 20px rgba(0, 212, 255, 0.7)' : ringGlow,
          }}
        />
      )}

      {!prefersReduced && (
        <div
          style={{
            position: 'fixed',
            top: trailingPos.y,
            left: trailingPos.x,
            width: trailingSize,
            height: trailingSize,
            border: '1px solid rgba(0, 82, 204, 0.9)',
            backgroundColor: isInteractive ? 'rgba(0, 82, 204, 0.15)' : 'transparent',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0052cc',
            fontSize: '10px',
            fontWeight: 700,
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textAlign: 'center',
            transition: 'width 0.25s var(--ease-expo-out), height 0.25s var(--ease-expo-out), background-color 0.25s, border-color 0.25s',
            pointerEvents: 'none',
            boxShadow: isInteractive ? '0 0 25px rgba(0, 212, 255, 0.3)' : 'none',
          }}
        >
          {isInteractive && cursorLabel ? <span>{cursorLabel}</span> : null}
        </div>
      )}
    </div>
  );
};
