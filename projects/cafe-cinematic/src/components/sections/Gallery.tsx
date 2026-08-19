'use client';

import { useState } from 'react';
import { X, ZoomIn, Camera, Sparkles } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    src: '/images/gallery-1.jpg',
    title: 'Single-Origin Hand Pour',
    subtitle: 'Ceramic cup with whole bean aroma',
    category: 'Coffee Ritual',
    spanClass: 'md:col-span-1 md:row-span-2',
  },
  {
    src: '/images/gallery-2.jpg',
    title: 'Dawn-Laminated Pastries',
    subtitle: '72-layer butter croissants and berry tarts',
    category: 'Oven Bakery',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/gallery-3.jpg',
    title: 'Minimalist Ceramic Ware',
    subtitle: 'Hand-thrown matte stoneware',
    category: 'Tableware',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/gallery-4.jpg',
    title: 'Sunlit Reading Solarium',
    subtitle: 'Natural ambient light and cozy greenery',
    category: 'Atmosphere',
    spanClass: 'md:col-span-2 md:row-span-1',
  },
  {
    src: '/images/gallery-5.jpg',
    title: 'Atelier Wood Architecture',
    subtitle: 'Reclaimed oak joinery and warm lighting',
    category: 'Architecture',
    spanClass: 'md:col-span-1 md:row-span-2',
  },
  {
    src: '/images/gallery-6.jpg',
    title: 'Tableside Espresso Service',
    subtitle: 'Tiger-stripe crema in handmade porcelain',
    category: 'Craft',
    spanClass: 'md:col-span-2 md:row-span-1',
  },
];

export function Gallery() {
  const [activeImage, setActiveImage] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  return (
    <section id="gallery" className="py-28 bg-cafe-warm border-b-2 border-cafe-text">
      <div className="max-w-content mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="chapter-tag justify-center">[05 / THE ATELIER IN FRAMES]</span>
          <h2 className="section-title">
            The Cozy <em>Gallery</em>
          </h2>
          <p className="text-cafe-text-muted mt-3 text-base">
            Morning bakes, manual pours, and the space between.
          </p>
        </div>

        {/* 2D Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px] reveal reveal-delay-1">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.title}
              onClick={() => setActiveImage(item)}
              className={`group relative overflow-hidden rounded-3xl border-2 border-cafe-text shadow-[5px_5px_0px_#2A1A12] bg-white cursor-pointer transition-all duration-300 hover:shadow-[7px_7px_0px_#2A1A12] hover:-translate-y-1 ${item.spanClass}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-cafe-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <span className="badge-2d badge-2d-accent text-[0.65rem]">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/40">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-white/75">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className="fixed inset-0 z-[10008] flex items-center justify-center p-4 md:p-8">
            <div
              className="absolute inset-0 bg-cafe-dark/80 backdrop-blur-sm"
              onClick={() => setActiveImage(null)}
            />
            <div className="relative z-10 max-w-3xl w-full bg-white rounded-3xl overflow-hidden border-2 border-cafe-text shadow-[10px_10px_0px_#2A1A12]">
              <div className="aspect-[16/10] bg-cafe-bg overflow-hidden relative">
                <img
                  src={activeImage.src}
                  alt={activeImage.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white border-2 border-cafe-text shadow-[2px_2px_0px_#2A1A12] text-cafe-text"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 flex justify-between items-center bg-white border-t-2 border-cafe-text">
                <div>
                  <span className="badge-2d badge-2d-accent text-xs mb-1.5">{activeImage.category}</span>
                  <h3 className="font-display text-2xl font-bold text-cafe-text">{activeImage.title}</h3>
                  <p className="text-xs text-cafe-text-muted mt-1">{activeImage.subtitle}</p>
                </div>
                <button
                  onClick={() => setActiveImage(null)}
                  className="btn-2d-primary text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
