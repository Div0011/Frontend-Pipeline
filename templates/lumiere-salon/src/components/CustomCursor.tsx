"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const cursorText = cursorTextRef.current;
    if (!dot || !ring || !cursorText) return;

    // Hide system cursor on desktop
    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      // Dot follows immediately
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      // Ring lags behind — cinematic feel
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const attachCursorEvents = () => {
      document.querySelectorAll("[data-cursor]").forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.dataset.cursorAttached) return; // don't double-attach
        htmlEl.dataset.cursorAttached = "1";

        htmlEl.addEventListener("mouseenter", () => {
          const state = htmlEl.dataset.cursor || "hover";
          const label = htmlEl.dataset.cursorLabel || "";

          if (state === "hidden") {
            gsap.to(dot, { scale: 0, duration: 0.2 });
            gsap.to(ring, { scale: 0, duration: 0.2 });
            return;
          }

          gsap.to(dot, { scale: 0.3, duration: 0.3, ease: "power2.out" });
          gsap.to(ring, {
            scale: 3,
            borderColor: "#d4a574",
            backgroundColor: "rgba(212,165,116,0.08)",
            duration: 0.4,
            ease: "back.out(1.4)",
          });

          if (label) {
            cursorText.textContent = label;
            gsap.to(cursorText, { opacity: 1, duration: 0.2 });
          }
        });

        htmlEl.addEventListener("mouseleave", () => {
          gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(ring, {
            scale: 1,
            borderColor: "rgba(212,165,116,0.6)",
            backgroundColor: "transparent",
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });
          gsap.to(cursorText, { opacity: 0, duration: 0.15 });
        });

        htmlEl.addEventListener("mousedown", () => {
          gsap.to(dot, { scale: 0.5, duration: 0.1 });
          gsap.to(ring, { scale: 0.8, duration: 0.1 });
        });

        htmlEl.addEventListener("mouseup", () => {
          gsap.to(dot, { scale: 0.3, duration: 0.3, ease: "elastic.out(1, 0.5)" });
          gsap.to(ring, { scale: 3, duration: 0.3, ease: "elastic.out(1, 0.5)" });
        });
      });
    };

    // Initial attach
    attachCursorEvents();

    // Re-attach when DOM changes (handles dynamic elements like modal)
    const observer = new MutationObserver(attachCursorEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Dot — follows cursor instantly, mix-blend-mode difference */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#d4a574",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      >
        <div
          ref={cursorTextRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 font-mono whitespace-nowrap"
          style={{ fontSize: "5px", color: "#000", letterSpacing: "0.1em", textTransform: "uppercase" }}
        />
      </div>

      {/* Ring — lags behind dot, scales on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid rgba(212,165,116,0.6)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
