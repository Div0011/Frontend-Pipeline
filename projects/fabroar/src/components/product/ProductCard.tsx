"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus } from "lucide-react";
import { Product } from "@/lib/products";
import { useCartStore } from "@/hooks/useCartStore";

interface ProductCardProps {
  product: Product;
  dark?: boolean;
}

export default function ProductCard({ product, dark = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [selectedColor] = useState<string>(product.colors[0] || "Black");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirmAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: `${product.id}-${selectedSize}-${selectedColor}`,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
      });
    }
    setIsModalOpen(false);
    openCart();
  };

  const modalContent = isModalOpen && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={() => setIsModalOpen(false)}
        style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div
          className="bg-[var(--color-surface-2)] border border-[#D4654A]/40 text-[var(--color-ink)] rounded-md max-w-sm w-[92vw] sm:w-[380px] p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-3.5 right-3.5 p-1.5 text-[var(--color-ink)]/70 hover:text-[#D4654A] transition-colors rounded-full hover:bg-[#D4654A]/10"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="flex gap-3.5 mb-5 items-center">
            <div className="relative w-16 h-20 bg-[var(--color-surface)] rounded-sm overflow-hidden flex-shrink-0 border border-[#D4654A]/30">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-ui text-[10px] tracking-widest uppercase text-[var(--color-sand)] font-bold block">
                Quick Purchase
              </span>
              <h4 className="font-display text-base sm:text-lg leading-snug mt-0.5 mb-1 text-[var(--color-ink)] truncate font-bold">
                {product.name}
              </h4>
              <p className="font-ui text-sm sm:text-base font-bold text-[#D4654A]">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2.5">
              <label className="font-ui text-xs tracking-wider uppercase text-[var(--color-sand)] font-semibold">
                Select Size
              </label>
              <span className="font-ui text-xs font-bold text-[#F5F0E8] bg-[#D4654A] px-2 py-0.5 rounded shadow-xs">
                {selectedSize}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 px-1 text-xs font-ui tracking-wider font-bold rounded-sm transition-all ${
                    selectedSize === s
                      ? "bg-[#D4654A] text-[#F5F0E8] shadow-md scale-105"
                      : "border border-[#D4654A]/30 bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[#D4654A] hover:text-[#F5F0E8]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-5 flex items-center justify-between bg-[var(--color-surface)] p-2.5 rounded border border-[#D4654A]/30">
            <span className="font-ui text-xs tracking-wider uppercase text-[var(--color-sand)] font-semibold">
              Quantity
            </span>
            <div className="flex items-center border border-[#D4654A]/40 rounded bg-[var(--color-surface-2)]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-[var(--color-ink)] hover:text-[#D4654A] transition-colors active:scale-95"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 py-1 font-ui text-xs min-w-[2rem] text-center font-bold text-[var(--color-ink)]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-[var(--color-ink)] hover:text-[#D4654A] transition-colors active:scale-95"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleConfirmAddToCart}
            className="w-full py-3.5 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs tracking-widest uppercase font-bold hover:bg-[#E07A60] transition-all flex items-center justify-center gap-2 rounded-sm shadow-lg active:scale-[0.99]"
          >
            <ShoppingBag size={16} />
            Add to Cart — ₹{(product.price * quantity).toLocaleString("en-IN")}
          </button>
        </div>
      </div>
  );

  return (
    <>
      <article
        className="product-card group flex flex-col justify-between h-full relative z-10 transition-transform duration-500 ease-out hover:-translate-y-1.5"
        data-cursor-product
      >
        <Link href={`/product/${product.slug}`} className="flex flex-col justify-between flex-1">
          <div className="relative z-10 aspect-[4/5] overflow-hidden bg-[var(--color-surface-2)] mb-3 rounded-sm border border-[#D4654A]/30 group-hover:border-[#D4654A] group-hover:shadow-[0_8px_25px_rgba(212,101,74,0.25)] transition-all duration-500">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              loading="lazy"
              className="duotone object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/85 flex items-center justify-center z-20">
                <span className="font-ui text-sm tracking-widest uppercase text-[#D4654A] font-bold">
                  Sold Out
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-transparent group-hover:bg-[#D4654A]/10 transition-colors duration-500 z-10" />
          </div>

          <div className="flex-1 flex flex-col justify-between space-y-1.5 p-1 rounded-sm backdrop-blur-xs bg-[var(--color-surface)]/60 border border-transparent group-hover:border-[#D4654A]/20 transition-all duration-300">
            <h3 className="font-display text-base md:text-lg leading-tight transition-colors duration-300 text-[var(--color-ink)] font-semibold group-hover:text-[#D4654A] group-hover:underline line-clamp-2 min-h-[2.8rem] flex items-center">
              {product.name}
            </h3>
            <div className="flex items-center justify-between pt-1">
              <p className="font-ui text-sm font-bold text-[#D4654A]">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              {product.rating && (
                <span className="font-ui text-xs text-[var(--color-sand)] font-semibold">
                  ★ {product.rating}
                </span>
              )}
            </div>
          </div>
        </Link>

        <button
          onClick={handleOpenModal}
          disabled={!product.inStock}
          className="mt-3 w-full py-2.5 font-ui text-xs tracking-widest uppercase transition-all duration-300 border border-[#D4654A]/40 text-[var(--color-ink)] hover:bg-[#D4654A] hover:text-[#F5F0E8] font-bold active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed rounded-sm shadow-sm relative z-10 bg-[var(--color-surface-2)]"
        >
          {product.inStock ? "Select Size & Add" : "Sold Out"}
        </button>
      </article>

      {/* Portal modal directly under document.body for viewport-centered positioning */}
      {mounted && isModalOpen && createPortal(modalContent, document.body)}
    </>
  );
}
