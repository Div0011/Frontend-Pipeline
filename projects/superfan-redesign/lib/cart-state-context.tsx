'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from './data';

export interface CartItem {
  product: Product;
  selectedFinish: string;
  quantity: number;
}

interface CartStateType {
  cart: CartItem[];
  addToCart: (product: Product, finishName?: string, quantity?: number) => void;
  removeFromCart: (productId: string, finishName: string) => void;
  updateQuantity: (productId: string, finishName: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartStateContext = createContext<CartStateType | undefined>(undefined);

export const CartStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, finishName?: string, quantity = 1) => {
    const selectedFinish = finishName || product.finishes[0]?.name || 'Default';
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id && item.selectedFinish === selectedFinish);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      }
      return [...prev, { product, selectedFinish, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, finishName: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedFinish === finishName)));
  }, []);

  const updateQuantity = useCallback((productId: string, finishName: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedFinish === finishName) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartStateContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const ctx = useContext(CartStateContext);
  if (!ctx) throw new Error('useCartState must be used within CartStateProvider');
  return ctx;
};
