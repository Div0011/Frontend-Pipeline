"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PackageCheck, Filter, X, Send } from "lucide-react";
import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import NavigationBar from "@/components/ui/NavigationBar";
import Footer from "@/components/sections/Footer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SortOption = "featured" | "price-asc" | "price-desc";

gsap.registerPlugin(ScrollTrigger);

export default function WomenPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [sort, setSort] = useState<SortOption>("featured");
  const [selectedSize, setSelectedSize] = useState<string>("ALL");
  const [bulkFilterActive, setBulkFilterActive] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [bulkFormSubmitted, setBulkFormSubmitted] = useState<boolean>(false);

  const baseProducts = getProductsByCategory("women");
  const SIZES = ["ALL", "XS", "S", "M", "L", "XL", "XXL"];

  const sortedProducts = [...baseProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    if (selectedSize !== "ALL" && !product.sizes.includes(selectedSize)) {
      return false;
    }
    if (bulkFilterActive && !product.inStock) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        stagger: 0.08,
        ease: "expo.out",
        duration: 0.8,
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion, sort, selectedSize, bulkFilterActive]);

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBulkFormSubmitted(true);
    setTimeout(() => {
      setIsBulkModalOpen(false);
      setBulkFormSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <NavigationBar />

      <section ref={sectionRef} className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[var(--color-surface)] text-[var(--color-ink)]">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-display-lg tracking-tight">
                  Women&apos;s Collection
                </h1>
                <p className="font-body text-ink-light-muted mt-2">
                  {filteredProducts.length} styles — pure cotton, graphic prints
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-ui text-xs tracking-widest uppercase text-ink-dim">Sort:</span>
                {[
                  { key: "featured", label: "Featured" },
                  { key: "price-asc", label: "Price: Low to High" },
                  { key: "price-desc", label: "Price: High to Low" },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setSort(option.key as SortOption)}
                    className={`font-ui text-xs tracking-widest uppercase transition-colors duration-300 border-b pb-1 ${
                      sort === option.key
                        ? "text-ember border-ember font-semibold"
                        : "text-ink-light-muted hover:text-ink-light border-transparent"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Bar: Size Filtration & Bulk Order Option */}
            <div className="p-4 bg-[var(--color-surface-2)]/90 backdrop-blur-md border border-[#D4654A]/30 rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 shadow-md">
              {/* Size Filter */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-ui text-xs tracking-widest uppercase text-[var(--color-sand)] flex items-center gap-1.5 mr-1 font-semibold">
                  <Filter size={14} className="text-[#D4654A]" /> Size:
                </span>
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 font-ui text-xs tracking-wider transition-all rounded-sm ${
                      selectedSize === size
                        ? "bg-[#D4654A] text-[#F5F0E8] font-bold shadow-sm"
                        : "bg-[var(--color-surface)] border border-[#D4654A]/30 text-[var(--color-sand)] hover:border-[#D4654A] hover:text-[#D4654A]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Bulk Order Filter & Modal Trigger */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBulkFilterActive(!bulkFilterActive)}
                  className={`px-4 py-2 border font-ui text-xs tracking-wider uppercase flex items-center gap-2 transition-all rounded-sm ${
                    bulkFilterActive
                      ? "border-[#D4654A] bg-[#D4654A]/15 text-[#D4654A] font-bold"
                      : "border-[#D4654A]/30 text-[var(--color-sand)] hover:border-[#D4654A] hover:text-[#D4654A]"
                  }`}
                >
                  <PackageCheck size={16} />
                  Bulk Order Eligible (5+ pcs)
                </button>

                <button
                  onClick={() => setIsBulkModalOpen(true)}
                  className="px-4 py-2 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs tracking-wider uppercase hover:bg-[#E07A60] transition-colors rounded-sm font-bold shadow"
                >
                  Bulk Inquiry
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Order Banner Callout */}
          <div className="mb-10 p-4 border border-[#D4654A]/30 bg-[var(--color-surface-2)]/90 backdrop-blur-md rounded-sm flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 shadow-md">
            <div className="flex items-center gap-3">
              <PackageCheck size={24} className="text-[#D4654A] flex-shrink-0" />
              <div>
                <h4 className="font-ui text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]">
                  Planning a Team or College Order?
                </h4>
                <p className="font-body text-xs text-[var(--color-sand)] mt-0.5">
                  Get custom printing & up to 25% off on bulk orders of 10+ T-Shirts.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsBulkModalOpen(true)}
              className="px-5 py-2.5 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs tracking-widest uppercase font-bold hover:bg-[#E07A60] transition-colors whitespace-nowrap rounded-sm shadow"
            >
              Get Bulk Quote
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-ink-light-muted">No products match your selected filters.</p>
              <button
                onClick={() => { setSelectedSize("ALL"); setBulkFilterActive(false); }}
                className="mt-4 px-6 py-2.5 bg-ember text-white font-ui text-xs tracking-widest uppercase font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bulk Order Modal */}
      {isBulkModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsBulkModalOpen(false)}
        >
          <div
            className="bg-[#141414] border border-ember/30 text-white rounded-md max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsBulkModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-white/50 hover:text-ember transition-colors"
            >
              <X size={20} />
            </button>

            {bulkFormSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-ember text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  ✓
                </div>
                <h3 className="font-display text-2xl mb-2 text-ember">Inquiry Received!</h3>
                <p className="font-body text-sm text-white/70">
                  Our corporate & bulk team will get back to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <PackageCheck size={22} className="text-ember" />
                  <h3 className="font-display text-2xl text-white">Bulk Order Request</h3>
                </div>
                <p className="font-body text-xs text-white/60 mb-4">
                  Fill in your details for custom team/corporate volume pricing and personalized graphics.
                </p>

                <div>
                  <label className="font-ui text-xs tracking-widest uppercase text-white/60 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded font-body text-sm focus:border-ember focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-ui text-xs tracking-widest uppercase text-white/60 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded font-body text-sm focus:border-ember focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-ui text-xs tracking-widest uppercase text-white/60 block mb-1">Estimated Quantity</label>
                    <input
                      type="number"
                      min="5"
                      defaultValue="10"
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded font-body text-sm focus:border-ember focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-ui text-xs tracking-widest uppercase text-white/60 block mb-1">Preferred Sizes & Notes</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 5 Small, 5 Medium. Oversized fit preferred."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded font-body text-sm focus:border-ember focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-ember text-white font-ui text-xs tracking-widest uppercase font-bold hover:bg-ember-light transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={16} /> Submit Bulk Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
