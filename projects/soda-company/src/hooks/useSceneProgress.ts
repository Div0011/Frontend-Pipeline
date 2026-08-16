"use client";

import { useEffect, useState } from "react";
import { useSceneStore } from "@/stores/sceneStore";
import { SCENE_SECTIONS } from "@/config/sceneConfig";

export function useSceneProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useState(0)[0];
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress);
  const setActiveSection = useSceneStore((s) => s.setActiveSection);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const value = scrollHeight > 0 ? Math.max(0, Math.min(1, scrollTop / scrollHeight)) : 0;
      setProgress(value);
      setScrollProgress(value);

      const sectionIndex = Math.min(
        SCENE_SECTIONS.length - 1,
        Math.floor(value * SCENE_SECTIONS.length)
      );
      const section = SCENE_SECTIONS[sectionIndex];
      setActiveSection(section);

      return value;
    };

    const raf = requestAnimationFrame(function loop() {
      update();
      requestAnimationFrame(loop);
    });

    return () => cancelAnimationFrame(raf);
  }, [setScrollProgress, setActiveSection]);

  return progress;
}
