"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-[150]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--color-surface)] text-[var(--color-ink)] z-[160] shadow-2xl flex flex-col border-l border-[#D4654A]/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D4654A]/30">
              <h2 className="font-display text-xl font-bold text-[var(--color-ink)]">Your Cart</h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 text-[var(--color-ink)]/80 hover:text-[#D4654A] transition-colors duration-300 rounded-full hover:bg-[#D4654A]/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag size={48} className="text-[var(--color-sand)]/60 mb-4" />
                  <p className="font-body text-[var(--color-ink)]/90 mb-2">Your cart is empty</p>
                  <Link
                    href="/men"
                    onClick={closeCart}
                    className="font-ui text-sm text-[#D4654A] underline underline-offset-4 hover:opacity-80 transition-opacity font-semibold"
                  >
                    Start exploring →
                  </Link>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-6"
                >
                  {items.map((item, idx) => (
                    <motion.div
                      key={`${item.productId}-${item.size}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 p-3 bg-[var(--color-surface-2)] rounded-sm border border-[#D4654A]/30"
                    >
                      <div className="relative w-20 h-24 bg-[var(--color-surface)] flex-shrink-0 rounded-sm overflow-hidden border border-[#D4654A]/20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm leading-tight mb-1 truncate font-semibold text-[var(--color-ink)]">
                          {item.name}
                        </h3>
                        <p className="font-ui text-xs text-[var(--color-sand)] mb-2">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-[#D4654A]/40 rounded bg-[var(--color-surface)]">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 text-[var(--color-ink)] hover:text-[#D4654A] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1.5 font-ui text-xs min-w-[2rem] text-center font-bold text-[var(--color-ink)]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 text-[var(--color-ink)] hover:text-[#D4654A] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.size)}
                            className="font-ui text-xs text-[var(--color-sand)] hover:text-[#D4654A] underline transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="font-ui text-sm mt-2 font-bold text-[#D4654A]">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 border-t border-[#D4654A]/30 space-y-4 bg-[var(--color-surface-2)]"
              >
                <div className="flex justify-between font-ui text-sm font-semibold text-[var(--color-ink)]">
                  <span className="text-[var(--color-sand)]">Subtotal</span>
                  <span className="text-[#D4654A]">₹{subtotal().toLocaleString("en-IN")}</span>
                </div>
                <p className="font-body text-xs text-[var(--color-ink)]/70">
                  Delivery calculated at checkout. Free over ₹499.
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-sm font-bold tracking-widest uppercase hover:bg-[#E07A60] transition-colors duration-300 flex items-center justify-center gap-2 rounded-sm shadow-lg"
                >
                  Checkout
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
