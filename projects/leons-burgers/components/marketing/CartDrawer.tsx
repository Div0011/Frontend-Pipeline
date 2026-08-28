"use client";


import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (name: string, delta: number) => void;
  currency?: string;
  primaryColor?: string;
  textOnPrimary?: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  currency = "₹",
  primaryColor = "#B12727",
  textOnPrimary = "#FFFFFF",
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#0e0e11] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="type-display text-2xl font-bold tracking-wide">
                    YOUR ORDER SELECTIONS
                  </h2>
                  <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} Items Added
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 space-y-3">
                    <span className="text-4xl">🛍️</span>
                    <p className="font-mono text-xs uppercase tracking-wider">
                      Your order drawer is currently empty
                    </p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-sm font-mono text-xs font-bold uppercase tracking-wider border"
                      style={{ borderColor: `${primaryColor}40`, color: primaryColor }}
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.name}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <h4 className="font-mono font-bold text-sm text-white">
                          {item.name}
                        </h4>
                        <p className="font-mono text-xs" style={{ color: primaryColor }}>
                          {currency}{item.price} each
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.name, -1)}
                          className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-mono text-sm font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.name, 1)}
                          className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#070709] space-y-4">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-xs text-stone-400 uppercase tracking-wider">
                      Estimated Subtotal
                    </span>
                    <span className="text-xl font-bold" style={{ color: primaryColor }}>
                      {currency}{subtotal}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      alert("Redirecting to online order checkout...");
                    }}
                    className="w-full py-3.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-98"
                    style={{
                      backgroundColor: primaryColor,
                      color: textOnPrimary,
                    }}
                  >
                    Proceed to Order Online ({currency}{subtotal}) →
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
