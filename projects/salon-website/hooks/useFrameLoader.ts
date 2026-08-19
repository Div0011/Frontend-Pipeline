import { useState, useEffect } from 'react';
import { useReducedMotion } from '../components/shared/useReducedMotion';

const FOLDERS = [
  'Entering_hair_salon_reception_space_202608100125_frames',
  'Camera_panning_salon_reception_l…_202608100125_frames',
  'Camera_moving_past_hair_salon_202608100125_frames',
  'Camera_tracking_hair_salon_interior_202608100125_frames',
];

// Persistent module-level cache across client-side route transitions
let globalVideoBuffers: HTMLImageElement[][] = [[], [], [], []];
let globalIsReady = false;
let globalLoadProgress = 0;
let isPreloadingInitiated = false;

export function useFrameLoader() {
  const [videoBuffers, setVideoBuffers] = useState<HTMLImageElement[][]>(globalVideoBuffers);
  const [isReady, setIsReady] = useState(globalIsReady);
  const [loadProgress, setLoadProgress] = useState(globalLoadProgress);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsReady(true);
      return;
    }

    // If already loaded in memory, restore instantly at 0ms
    if (globalIsReady && globalVideoBuffers[0].length > 0) {
      setVideoBuffers(globalVideoBuffers);
      setIsReady(true);
      setLoadProgress(100);
      return;
    }

    if (isPreloadingInitiated) {
      // If preloading is already in progress, listen for updates
      const checkInterval = setInterval(() => {
        if (globalIsReady) {
          setVideoBuffers(globalVideoBuffers);
          setIsReady(true);
          setLoadProgress(100);
          clearInterval(checkInterval);
        } else {
          setLoadProgress(globalLoadProgress);
        }
      }, 50);
      return () => clearInterval(checkInterval);
    }

    isPreloadingInitiated = true;
    const abortController = new AbortController();

    async function loadAllFrames() {
      try {
        const mod = await import('../lib/frame-manifest.json');
        const manifest = (mod.default || mod) as Record<string, string[]>;
        const buffers: HTMLImageElement[][] = [[], [], [], []];
        let totalLoaded = 0;
        let totalExpected = 0;

        for (const folder of FOLDERS) {
          totalExpected += (manifest[folder] || []).length;
        }

        for (let vIdx = 0; vIdx < FOLDERS.length; vIdx++) {
          const folder = FOLDERS[vIdx];
          const paths = manifest[folder] || [];
          const imgArr: HTMLImageElement[] = new Array(paths.length);
          let loaded = 0;

          paths.forEach((p, i) => {
            const img = new Image();
            img.decoding = 'async';
            img.src = p;

            img.onload = () => {
              imgArr[i] = img;
              loaded++;
              totalLoaded++;
              const progress = Math.round((totalLoaded / Math.max(1, totalExpected)) * 100);
              globalLoadProgress = progress;
              setLoadProgress(progress);

              if (vIdx === 0 && loaded === 1) {
                globalIsReady = true;
                setIsReady(true);
              }
            };

            img.onerror = () => {
              loaded++;
              totalLoaded++;
              const progress = Math.round((totalLoaded / Math.max(1, totalExpected)) * 100);
              globalLoadProgress = progress;
              setLoadProgress(progress);
            };
          });
          buffers[vIdx] = imgArr;
        }

        globalVideoBuffers = buffers;
        setVideoBuffers(buffers);

        if (totalExpected === 0) {
          globalIsReady = true;
          setIsReady(true);
        }
      } catch (err) {
        console.error('Error preloading video frames:', err);
        globalIsReady = true;
        setIsReady(true);
      }
    }

    loadAllFrames();

    return () => {
      // Do not destroy global cache on unmount!
    };
  }, [prefersReduced]);

  return { isReady, videoBuffers, loadProgress };
}
