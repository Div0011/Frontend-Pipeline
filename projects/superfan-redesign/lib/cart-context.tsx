'use client';

import React from 'react';
import { CartStateProvider, useCartState } from './cart-state-context';
import { ModalStateProvider, useModalState } from './modal-state-context';
import { SoundProvider, useSound } from './sound-context';
import { Product } from './data';

export interface CartItem {
  product: Product;
  selectedFinish: string;
  quantity: number;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartStateProvider>
      <ModalStateProvider>
        <SoundProvider>
          {children}
        </SoundProvider>
      </ModalStateProvider>
    </CartStateProvider>
  );
};

export const useCart = () => {
  const cart = useCartState();
  const modal = useModalState();
  const sound = useSound();
  return {
    ...cart,
    ...modal,
    ...sound,
  };
};
