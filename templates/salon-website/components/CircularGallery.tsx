'use client';

import React, { useEffect, useRef } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

type GL = Renderer['gl'];

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: unknown, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: object): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    const val = (instance as Record<string, unknown>)[key];
    if (key !== 'constructor' && typeof val === 'function') {
      (instance as Record<string, unknown>)[key] = val.bind(instance);
    }
  });
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string = 'bold 30px Cormorant Garamond',
  color: string = '#ffffff'
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get 2d context');

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.4 || 40);

  canvas.width = textWidth + 24;
  canvas.height = textHeight + 24;

  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

interface Title {
  text: string;
  mesh?: Mesh;
}

interface MediaOptions {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
}

class Media {
  gl: GL;
  geometry: Plane;
  scene: Transform;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  image: string;
  text: string;
  index: number;
  length: number;
  renderer: Renderer;

  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  isBefore!: boolean;
  isAfter!: boolean;
  extra: number = 0;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font = '30px Cormorant Garamond',
  }: MediaOptions) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += sin(p.x * 4.0 + uTime) * (uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBox(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b + vec2(r);
          return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          vec2 p = vUv - vec2(0.5);
          vec2 halfSize = vec2(0.5);
          float d = roundedBox(p, halfSize, uBorderRadius);
          if (d > 0.0) discard;

          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = { text: this.text };
    const textRes = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const titleProgram = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: textRes.texture },
      },
      transparent: true,
      depthTest: false,
    });

    this.title.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: titleProgram,
    });
    this.title.mesh.setParent(this.scene);
  }

  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.max(x, -H), H);
      const arc = Math.asin(effectiveX / R);

      if (this.bend > 0) {
        this.plane.position.y = -R * (1 - Math.cos(arc));
        this.plane.rotation.z = -arc;
      } else {
        this.plane.position.y = R * (1 - Math.cos(arc));
        this.plane.rotation.z = arc;
      }
    }

    this.plane.position.z = -Math.abs(this.plane.position.x) * 0.15;

    if (this.title.mesh) {
      this.title.mesh.position.x = this.plane.position.x;
      this.title.mesh.position.y = this.plane.position.y - this.plane.scale.y * 0.58;
      this.title.mesh.position.z = this.plane.position.z + 0.05;
      this.title.mesh.rotation.z = this.plane.rotation.z;
    }

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
  }

  onResize(screen?: { width: number; height: number }, viewport?: { width: number; height: number }) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    if (this.title.mesh) {
      this.title.mesh.scale.x = this.plane.scale.x * 0.95;
      this.title.mesh.scale.y = this.plane.scale.y * 0.18;
    }

    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppOptions {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollEase?: number;
  font?: string;
  scrollSpeed?: number;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scrollEase: number;
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  items: { image: string; text: string }[];

  scroll: { ease: number; current: number; target: number; last: number; position: number };
  direction: 'right' | 'left';
  medias: Media[] = [];
  mediasImages: { image: string; text: string }[] = [];

  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };

  isDragging: boolean = false;
  startX: number = 0;
  rafId: number = 0;

  constructor(container: HTMLElement, options: AppOptions) {
    this.container = container;
    this.scrollSpeed = options.scrollSpeed || 2;
    this.scrollEase = options.scrollEase || 0.05;
    this.bend = options.bend ?? 1;
    this.textColor = options.textColor || '#ffffff';
    this.borderRadius = options.borderRadius || 0.05;
    this.font = options.font || 'bold 28px Cormorant Garamond';
    this.items = options.items || [];

    this.scroll = {
      ease: this.scrollEase,
      current: 0,
      target: 0,
      last: 0,
      position: 0,
    };
    this.direction = 'right';

    autoBind(this);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 40,
      widthSegments: 80,
    });
  }

  createMedias() {
    const galleryItems = this.items.length > 0 ? this.items : [
      { image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop', text: 'Sculpture & Ligne' },
      { image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop', text: 'Nuance Solaire' },
      { image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop', text: 'Soin Botanique' },
      { image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop', text: 'Atelier Privé' },
    ];

    this.mediasImages = galleryItems.concat(galleryItems);

    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend: this.bend,
        textColor: this.textColor,
        borderRadius: this.borderRadius,
        font: this.font,
      });
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.scroll.position = this.scroll.current;
    this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.startX - x) * 0.05;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDragging = false;
  }

  onWheel(e: WheelEvent) {
    const normalized = e.deltaY || e.deltaX;
    this.scroll.target += normalized * 0.015 * this.scrollSpeed;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };

    if (this.medias) {
      this.medias.forEach((media) => media.onResize(this.screen, this.viewport));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    if (this.scroll.current > this.scroll.last) {
      this.direction = 'right';
    } else if (this.scroll.current < this.scroll.last) {
      this.direction = 'left';
    }

    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, this.direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.rafId = requestAnimationFrame(this.update);
  }

  addEventListeners() {
    window.addEventListener('resize', debounce(this.onResize, 150));
    this.container.addEventListener('mousedown', this.onTouchDown);
    this.container.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);
    this.container.addEventListener('touchstart', this.onTouchDown, { passive: true });
    this.container.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchUp);
    this.container.addEventListener('wheel', this.onWheel, { passive: true });
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    this.container.removeEventListener('mousedown', this.onTouchDown);
    this.container.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);
    this.container.removeEventListener('touchstart', this.onTouchDown);
    this.container.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);
    this.container.removeEventListener('wheel', this.onWheel);
    if (this.gl && this.gl.canvas && this.gl.canvas.parentNode) {
      this.gl.canvas.parentNode.removeChild(this.gl.canvas);
    }
  }
}

interface CircularGalleryProps {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollEase?: number;
  font?: string;
  scrollSpeed?: number;
}

export default function CircularGallery({
  items,
  bend = 1,
  textColor = '#f5f3ef',
  borderRadius = 0.05,
  scrollEase = 0.05,
  font = '300 24px Cormorant Garamond',
  scrollSpeed = 2,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      scrollEase,
      font,
      scrollSpeed,
    });

    return () => app.destroy();
  }, [items, bend, textColor, borderRadius, scrollEase, font, scrollSpeed]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    />
  );
}
