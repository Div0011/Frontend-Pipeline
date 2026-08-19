'use client';

import React, { useEffect, useRef } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

type GL = Renderer['gl'];

interface FlyingPostersProps {
  items: string[];
  planeWidth?: number;
  planeHeight?: number;
  distortion?: number;
  scrollEase?: number;
  cameraFov?: number;
  cameraZ?: number;
}

export default function FlyingPosters({
  items,
  planeWidth = 320,
  planeHeight = 420,
  distortion = 3,
  scrollEase = 0.04,
  cameraFov = 45,
  cameraZ = 20,
}: FlyingPostersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let renderer: Renderer;
    let gl: GL;
    let camera: Camera;
    let scene: Transform;

    try {
      renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
      gl = renderer.gl;
      container.appendChild(gl.canvas);

      camera = new Camera(gl, { fov: cameraFov });
      camera.position.z = cameraZ;

      scene = new Transform();

      const geometry = new Plane(gl, {
        widthSegments: 32,
        heightSegments: 32,
      });

      const vertexShader = `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uDistortion;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 p = position;
          float wave = sin(p.x * 2.0 + uTime * 2.0) * cos(p.y * 2.0 + uTime * 1.5);
          p.z += wave * (uSpeed * 0.4 + uDistortion * 0.15);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `;

      const fragmentShader = `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `;

      const meshes: { mesh: Mesh; program: Program; baseX: number; baseY: number; baseZ: number; speed: number }[] = [];

      const posterList = items.length > 0 ? items : [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop',
      ];

      posterList.forEach((src, idx) => {
        const texture = new Texture(gl, { generateMipmaps: false });
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => {
          texture.image = img;
        };

        const program = new Program(gl, {
          vertex: vertexShader,
          fragment: fragmentShader,
          uniforms: {
            tMap: { value: texture },
            uTime: { value: Math.random() * 100 },
            uSpeed: { value: 0 },
            uDistortion: { value: distortion },
          },
          transparent: true,
          depthTest: true,
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);

        const count = posterList.length;
        const angle = (idx / count) * Math.PI * 2;
        const radius = 9;
        const baseX = Math.cos(angle) * radius;
        const baseY = Math.sin(angle) * 3;
        const baseZ = Math.sin(angle) * 5;

        mesh.position.set(baseX, baseY, baseZ);
        mesh.scale.set(planeWidth / 65, planeHeight / 65, 1);

        meshes.push({
          mesh,
          program,
          baseX,
          baseY,
          baseZ,
          speed: 0.6 + (idx % 3) * 0.2,
        });
      });

      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      container.addEventListener('mousemove', onMouseMove);

      const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.perspective({ aspect: w / h });
      };

      window.addEventListener('resize', resize);
      resize();

      let clock = 0;

      const update = () => {
        clock += 0.015;
        mouse.x += (mouse.targetX - mouse.x) * scrollEase;
        mouse.y += (mouse.targetY - mouse.y) * scrollEase;

        scene.rotation.y = mouse.x * 0.35;
        scene.rotation.x = -mouse.y * 0.25;

        const deltaSpeed = Math.abs(mouse.targetX - mouse.x) + Math.abs(mouse.targetY - mouse.y);

        meshes.forEach((item, i) => {
          item.program.uniforms.uTime.value = clock * item.speed;
          item.program.uniforms.uSpeed.value = deltaSpeed * 10;
          item.mesh.position.y = item.baseY + Math.sin(clock + i) * 0.4;
        });

        renderer.render({ scene, camera });
        rafId = requestAnimationFrame(update);
      };

      rafId = requestAnimationFrame(update);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        container.removeEventListener('mousemove', onMouseMove);
        if (gl.canvas && gl.canvas.parentNode) {
          gl.canvas.parentNode.removeChild(gl.canvas);
        }
      };
    } catch (err) {
      console.error('FlyingPosters OGL Error:', err);
    }
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    />
  );
}
