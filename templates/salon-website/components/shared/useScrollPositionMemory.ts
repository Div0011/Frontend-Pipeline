'use client';

import { useRef, useCallback } from 'react';
import { useLenis } from '../LenisProvider';

interface SavedScrollPosition {
  y: number;
  videoIndex: number;
  frame: number;
}

export function useScrollPositionMemory() {
  const lenisRef = useLenis();
  const savedPositionRef = useRef<SavedScrollPosition | null>(null);

  const savePosition = useCallback(() => {
    savedPositionRef.current = {
      y: window.scrollY,
      videoIndex: 0,
      frame: 0,
    };
  }, []);

  const restorePosition = useCallback(() => {
    const saved = savedPositionRef.current;
    if (!saved) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(saved.y, {
        immediate: false,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo(0, saved.y);
    }

    savedPositionRef.current = null;
  }, [lenisRef]);

  const clearPosition = useCallback(() => {
    savedPositionRef.current = null;
  }, []);

  return {
    savePosition,
    restorePosition,
    clearPosition,
  };
}
