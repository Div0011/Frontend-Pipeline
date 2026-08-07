"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, Minus, Ruler, PenLine, Maximize2, X, ZoomIn, ZoomOut, ShoppingBag, ArrowLeft } from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { useCartStore } from "@/hooks/useCartStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import NavigationBar from "@/components/ui/NavigationBar";
import Footer from "@/components/sections/Footer";
import DoodleBackground from "@/components/ui/DoodleBackground";

interface ProductDetailProps {
  params: { slug: string };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const product = getProductBySlug(params.slug);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const prefersReducedMotion = useReducedMotion();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-[#F5F0E8] flex flex-col items-center justify-center p-6">
        <h2 className="font-display text-3xl font-bold mb-4">Product Not Found</h2>
        <p className="font-body text-[#C4A77D] mb-6">The requested graphic tee could not be found.</p>
        <Link
          href="/men"
          className="px-6 py-3 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs font-bold uppercase rounded shadow hover:bg-[#E07A60] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: product.colors[0] || "Black",
    });
    openCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)] relative overflow-x-hidden">
      <NavigationBar />

      {/* Breadcrumb & Navigation */}
      <nav className="pt-28 pb-6 md:pt-36 relative z-10">
        <div className="container-custom">
          <Link
            href={`/${product.category}`}
            className="inline-flex items-center gap-2 font-ui text-xs md:text-sm tracking-wider uppercase text-[#C4A77D] hover:text-[#F5F0E8] transition-colors duration-300 bg-[#181514] px-4 py-2 rounded-sm border border-[#D4654A]/30"
          >
            <ArrowLeft size={16} />
            Back to {product.category === "men" ? "Men's Collection" : "Women's Collection"}
          </Link>
        </div>
      </nav>

      {/* Main Full Page View Container */}
      <div className="container-custom pb-20 md:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Main Gallery Section (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Interactive Image Container */}
            <div
              onClick={() => setIsFullScreenOpen(true)}
              className="relative aspect-[3/4] bg-black/20 rounded-md overflow-hidden border border-[#D4654A]/30 cursor-zoom-in group shadow-2xl"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className={`object-cover ${!prefersReducedMotion ? "transition-transform duration-700 group-hover:scale-105" : ""}`}
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />

              {/* Fullscreen Expand Hint Badge */}
              <div className="absolute top-4 right-4 bg-[#0F0F0F]/80 backdrop-blur-md border border-[#D4654A]/30 text-[#F5F0E8] px-3 py-1.5 rounded-sm font-ui text-xs font-bold tracking-wider uppercase flex items-center gap-2 group-hover:bg-[#D4654A] group-hover:text-[#F5F0E8] transition-colors shadow">
                <Maximize2 size={14} />
                <span>Click for Full Screen View</span>
              </div>

              {/* Tag pill */}
              <div className="absolute bottom-4 left-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs font-bold px-3 py-1 uppercase rounded-sm shadow">
                {product.category} • Pure Cotton
              </div>

              {isAdded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                  <div className="bg-[#D4654A] text-[#F5F0E8] px-8 py-4 font-ui text-sm font-bold tracking-widest uppercase shadow-2xl rounded-sm">
                    Added to Cart! ✓
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Selector Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-24 sm:w-24 sm:h-30 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === idx ? "border-[#D4654A] scale-105 shadow-lg" : "border-[#D4654A]/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Sidebar (5 Cols) */}
          <div className="lg:col-span-5 bg-[#181514] border border-[#D4654A]/30 p-6 md:p-8 rounded-md shadow-2xl backdrop-blur-sm">
            <span className="font-ui text-xs tracking-[0.25em] uppercase text-[#C4A77D] block mb-2 font-bold">
              FABROAR ORIGINAL
            </span>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight text-[#F5F0E8]">
              {product.name}
            </h1>

            <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#D4654A]/20">
              <p className="font-display text-3xl font-bold text-[#D4654A]">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              {product.rating && (
                <div className="flex items-center gap-1.5 bg-[#D4654A]/15 border border-[#D4654A]/40 text-[#C4A77D] px-3 py-1 rounded-sm font-ui text-xs font-bold shadow">
                  ★ {product.rating} / 5.0
                </div>
              )}
            </div>

            <p className="font-body text-base text-[#F5F0E8]/90 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-ui text-xs tracking-widest uppercase text-[#F5F0E8]/90 font-bold">
                  Select Size
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="font-ui text-xs text-[#C4A77D] hover:text-[#D4654A] underline transition-colors flex items-center gap-1 font-semibold"
                >
                  <Ruler size={14} />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 font-ui text-sm font-bold tracking-wider rounded-sm transition-all ${
                      selectedSize === sz
                        ? "bg-[#D4654A] text-[#F5F0E8] shadow-lg scale-105"
                        : "border border-[#D4654A]/30 bg-[#0F0F0F] text-[#F5F0E8] hover:border-[#D4654A]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="font-ui text-xs tracking-widest uppercase text-[#F5F0E8]/90 font-bold block mb-3">
                Quantity
              </span>
              <div className="inline-flex items-center border border-[#D4654A]/30 bg-[#0F0F0F] rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#F5F0E8] hover:text-[#D4654A] transition-colors active:scale-95"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 py-3 font-ui text-sm min-w-[3rem] text-center font-bold text-[#F5F0E8]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#F5F0E8] hover:text-[#D4654A] transition-colors active:scale-95"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Main CTA */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#E07A60] transition-all rounded-sm shadow-xl flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-40"
              >
                <ShoppingBag size={18} />
                {product.inStock ? (isAdded ? "Added to Cart! ✓" : `Add to Cart — ₹${(product.price * quantity).toLocaleString("en-IN")}`) : "Sold Out"}
              </button>

              <Link
                href="/customize"
                className="w-full py-3.5 border border-[#D4654A]/40 text-[#F5F0E8] font-ui text-xs tracking-[0.18em] uppercase font-semibold hover:bg-[#D4654A] hover:text-[#F5F0E8] transition-all rounded-sm flex items-center justify-center gap-2 text-center"
              >
                <PenLine size={16} />
                Customize In Studio
              </Link>
            </div>

            {/* Product Details & Care */}
            <div className="border-t border-[#D4654A]/20 pt-6 space-y-4 font-body text-xs text-[#F5F0E8]/85">
              <div>
                <strong className="font-ui uppercase tracking-wider text-[#C4A77D] block mb-1">
                  Product Details:
                </strong>
                <ul className="list-disc list-inside space-y-1">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong className="font-ui uppercase tracking-wider text-[#C4A77D] block mb-1">
                  Wash Care:
                </strong>
                <ul className="list-disc list-inside space-y-1">
                  {product.careInstructions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN PAGE VIEW MODAL */}
      {isFullScreenOpen && (
        <div
          className="fixed inset-0 z-[999999] bg-[#0F0F0F]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 md:p-8 animate-fade-in"
          onClick={() => {
            setIsFullScreenOpen(false);
            setZoomScale(1);
          }}
        >
          {/* Top Bar */}
          <div
            className="w-full flex items-center justify-between text-[#F5F0E8] z-10 max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-display text-lg sm:text-2xl font-bold">{product.name}</h3>
              <p className="font-ui text-xs text-[#C4A77D]">Full Screen High-Res View</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoomScale((z) => Math.max(1, z - 0.3))}
                className="p-2 bg-[#181514] border border-[#D4654A]/30 hover:bg-[#D4654A] rounded-full text-[#F5F0E8] transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <span className="font-mono text-xs font-bold text-[#C4A77D] min-w-[3rem] text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale((z) => Math.min(2.5, z + 0.3))}
                className="p-2 bg-[#181514] border border-[#D4654A]/30 hover:bg-[#D4654A] rounded-full text-[#F5F0E8] transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>

              <button
                onClick={() => {
                  setIsFullScreenOpen(false);
                  setZoomScale(1);
                }}
                className="p-2 bg-[#D4654A] text-[#F5F0E8] rounded-full hover:bg-[#E07A60] transition-colors ml-2 shadow-lg"
                aria-label="Close full view"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Center Image Canvas */}
          <div
            className="relative w-full flex-1 max-w-5xl my-4 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {product.images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-[#0F0F0F]/80 hover:bg-[#D4654A] hover:text-[#F5F0E8] text-[#F5F0E8] rounded-full transition-all z-20 shadow-xl border border-[#D4654A]/30"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomScale})` }}
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-contain select-none"
                priority
              />
            </div>

            {product.images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#0F0F0F]/80 hover:bg-[#D4654A] hover:text-[#F5F0E8] text-[#F5F0E8] rounded-full transition-all z-20 shadow-xl border border-[#D4654A]/30"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Controls Bar */}
          <div
            className="w-full max-w-xl bg-[#181514] border border-[#D4654A]/30 p-4 rounded-md flex items-center justify-between gap-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-10 h-12 relative rounded-xs overflow-hidden border ${
                    activeImage === idx ? "border-[#D4654A] scale-110" : "border-[#D4654A]/20 opacity-50"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setIsFullScreenOpen(false);
                handleAddToCart();
              }}
              className="px-6 py-3 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs font-bold uppercase rounded shadow hover:bg-[#E07A60] transition-colors flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              Add to Cart — ₹{product.price}
            </button>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div
            className="bg-[#0F0F0F] border border-[#D4654A]/40 max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto rounded-md shadow-2xl text-[#F5F0E8]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-[#C4A77D] hover:text-[#D4654A] transition-colors"
              aria-label="Close size guide"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-2xl font-bold mb-6 text-[#F5F0E8]">Size Guide (cm)</h3>
            <table className="w-full font-body text-sm text-left">
              <thead>
                <tr className="border-b border-[#D4654A]/30">
                  <th className="py-2 font-ui text-xs uppercase text-[#C4A77D]">Size</th>
                  <th className="py-2 font-ui text-xs uppercase text-[#C4A77D]">Chest</th>
                  <th className="py-2 font-ui text-xs uppercase text-[#C4A77D]">Length</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: "XS", chest: "86 cm", length: "66 cm" },
                  { size: "S", chest: "91 cm", length: "69 cm" },
                  { size: "M", chest: "96 cm", length: "72 cm" },
                  { size: "L", chest: "101 cm", length: "75 cm" },
                  { size: "XL", chest: "106 cm", length: "78 cm" },
                  { size: "XXL", chest: "111 cm", length: "81 cm" },
                ].map((row) => (
                  <tr key={row.size} className="border-b border-[#D4654A]/15">
                    <td className="py-3 font-ui font-bold text-[#D4654A]">{row.size}</td>
                    <td className="py-3 text-[#F5F0E8]/90">{row.chest}</td>
                    <td className="py-3 text-[#F5F0E8]/90">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
