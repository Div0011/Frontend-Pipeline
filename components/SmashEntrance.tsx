"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function SmashEntrance({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"idle" | "hover" | "burst" | "exit">("idle");
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        boxRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleHover = (e: React.MouseEvent) => {
    if (phase !== "idle") return;
    setPhase("hover");
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const newStars = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }));
    setStars(newStars);

    gsap.to(boxRef.current, {
      rotation: 8,
      duration: 0.15,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut",
    });

    setTimeout(() => {
      setPhase("idle");
      setStars([]);
    }, 600);
  };

  const handleClick = () => {
    if (phase === "burst" || phase === "exit") return;
    setPhase("burst");

    gsap.to(balloonRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    setTimeout(() => {
      setPhase("exit");
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(leftDoorRef.current, {
        x: "-100%",
        duration: 1,
        ease: "power4.inOut",
      })
        .to(
          rightDoorRef.current,
          { x: "100%", duration: 1, ease: "power4.inOut" },
          "<"
        )
        .to(
          containerRef.current,
          { opacity: 0, duration: 0.4, delay: 0.2 },
          "<"
        );
    }, 800);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#FFC72C" }}
    >
      {/* Checkerboard doors */}
      <div
        ref={leftDoorRef}
        className="absolute inset-0 checkerboard"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      />
      <div
        ref={rightDoorRef}
        className="absolute inset-0 checkerboard"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      />

      {/* Center box */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={boxRef}
          onMouseEnter={handleHover}
          onClick={handleClick}
          className="relative w-64 h-64 bg-white border-4 border-black rounded-3xl flex items-center justify-center cursor-pointer shadow-[8px_8px_0px_rgba(0,0,0,0.15)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.2)] transition-shadow"
          style={{ transform: "scale(0.8)", opacity: 0 }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">★</div>
            <p className="text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
              Smash Guys
            </p>
            <p className="text-sm mt-2 opacity-60">Click to enter</p>
          </div>

          {/* Floating stars on hover */}
          {stars.map((star) => (
            <span
              key={star.id}
              className="absolute text-2xl pointer-events-none"
              style={{
                left: star.x,
                top: star.y,
                color: "#FFC72C",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* SMASH balloon */}
      <div
        ref={balloonRef}
        className="absolute z-20 pointer-events-none"
        style={{
          scale: 0,
          opacity: 0,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative bg-black text-white px-12 py-6 rounded-full border-4 border-black shadow-[8px_8px_0px_rgba(255,199,44,0.5)]">
          <span
            className="text-5xl font-black uppercase tracking-widest"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SMASH!
          </span>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-black" />
        </div>
      </div>
    </div>
  );
}
