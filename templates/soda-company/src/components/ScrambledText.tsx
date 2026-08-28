"use client";

import { useEffect, useRef, useState, useMemo } from "react";

type ScrambledTextProps = {
  children?: string;
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
};

type CharState = {
  char: string;
  target: string;
  start: string;
  startTime: number;
  duration: number;
};

const pick = (chars: string[], rand: (min: number, max: number) => number) =>
  chars[Math.floor(rand(0, chars.length))];

const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const ScrambledText = ({
  children = "",
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style,
}: ScrambledTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  const chars = useMemo(
    () => scrambleChars.split(""),
    [scrambleChars]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = String(children || "");
    const nodes: HTMLElement[] = [];
    const states: CharState[] = [];

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.willChange = "transform";
      el.appendChild(span);
      nodes.push(span);

      const target = text[i];
      const start = target === " " ? " " : pick(chars, rand);
      states.push({
        char: start,
        target,
        start,
        startTime: performance.now() + rand(0, radius),
        duration: rand(duration * 0.6, duration),
      });
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) {
      nodes.forEach((node, i) => {
        node.textContent = states[i].target;
      });
      setReady(true);
      return () => {
        cancelAnimationFrame(rafRef.current);
        nodes.forEach((n) => n.remove());
      };
    }

    setReady(true);

    const render = (now: number) => {
      let complete = true;
      for (let i = 0; i < nodes.length; i++) {
        const state = states[i];
        const local = (now - state.startTime) / Math.max(1, state.duration);
        const progress = easeOutCubic(Math.min(1, Math.max(0, local)));

        if (progress < 1) complete = false;

        const shouldReveal = progress >= 1;
        const current = shouldReveal
          ? state.target
          : state.target === " "
          ? " "
          : pick(chars, rand);

        state.char = current;
        nodes[i].textContent = current;

        if (!shouldReveal && state.target !== " ") {
          const dx = rand(-1, 1);
          const dy = rand(-1, 1);
          nodes[i].style.transform = `translate(${dx}px, ${dy}px)`;
        } else {
          nodes[i].style.transform = "translate(0,0)";
        }
      }

      if (!complete) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      nodes.forEach((n) => n.remove());
    };
  }, [children, radius, duration, speed, scrambleChars, chars]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={style}
      aria-label={String(children)}
    >
      {ready ? null : String(children || "").split("").map((_, i) => (
        <span key={i} style={{ display: "inline-block" }} />
      ))}
    </span>
  );
};

export default ScrambledText;
