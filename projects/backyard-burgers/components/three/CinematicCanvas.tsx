"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = Math.floor(canvas.offsetWidth * dpr));
    let height = (canvas.height = Math.floor(canvas.offsetHeight * dpr));

    // Particle class representing dynamic embers on the grill
    class Particle {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      origX: number;
      origY: number;
      origZ: number;
      color: string;
      size: number;

      constructor(x: number, y: number, z: number, color: string) {
        this.origX = x;
        this.origY = y;
        this.origZ = z;
        this.color = color;
        this.size = (Math.random() * 1.5 + 0.5) * dpr;
        this.reset();
      }

      reset() {
        this.x = this.origX;
        this.y = this.origY;
        this.z = this.origZ;
      }

      // Rotate coordinates on Y and X axis
      rotate(angleY: number, angleX: number) {
        let cosY = Math.cos(angleY);
        let sinY = Math.sin(angleY);
        let x1 = this.x * cosY - this.z * sinY;
        let z1 = this.z * cosY + this.x * sinY;

        let cosX = Math.cos(angleX);
        let sinX = Math.sin(angleX);
        let y2 = this.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + this.y * sinX;

        this.x = x1;
        this.y = y2;
        this.z = z2;
      }
    }

    const particles: Particle[] = [];
    const numParticles = 600;

    for (let i = 0; i < numParticles; i++) {
      let theta = Math.random() * Math.PI * 2;
      let phi = Math.acos(Math.random() * 2 - 1);
      let r = (180 + Math.random() * 40) * dpr;

      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      let z = r * Math.cos(phi);

      let colorType = Math.random();
      let color = "rgba(196, 169, 98, 0.4)";
      if (colorType < 0.3) {
        color = "rgba(224, 122, 95, 0.5)";
      } else if (colorType < 0.6) {
        color = "rgba(235, 94, 40, 0.4)";
      }

      particles.push(new Particle(x, y, z, color));
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let scrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = Math.floor(canvas.offsetWidth * dpr);
      height = canvas.height = Math.floor(canvas.offsetHeight * dpr);
    };

    window.addEventListener("resize", handleResize);

    const tick = () => {
      ctx.fillStyle = "rgba(12, 12, 13, 0.15)";
      ctx.fillRect(0, 0, width, height);

      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.4;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;

      const timeRotationY = 0.002 + scrollProgress * 0.02;

      particles.forEach((p) => {
        p.reset();
        
        const scale = 1 + scrollProgress * 0.8;
        p.x *= scale;
        p.y *= scale;
        p.z *= scale;

        p.rotate(currentRotationY + timeRotationY * Date.now() * 0.05, currentRotationX);

        const perspective = 400 * dpr;
        const scalePerspective = perspective / (perspective + p.z);
        const projX = p.x * scalePerspective + width / 2;
        const projY = p.y * scalePerspective + height / 2;

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          ctx.beginPath();
          ctx.arc(projX, projY, p.size * scalePerspective, 0, Math.PI * 2);
          
          if (scrollProgress > 0.5) {
            ctx.fillStyle = "rgba(224, 122, 95, " + (0.4 + (1 - scalePerspective) * 0.4) + ")";
          } else {
            ctx.fillStyle = p.color;
          }
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      scrollTrigger.kill();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
}
