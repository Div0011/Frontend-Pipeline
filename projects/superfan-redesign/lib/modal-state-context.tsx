'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from './data';

interface ModalStateType {
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const ModalStateContext = createContext<ModalStateType | undefined>(undefined);

export const ModalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ModalStateContext.Provider value={{ quickViewProduct, setQuickViewProduct, isComparisonOpen, setIsComparisonOpen, isCartOpen, setIsCartOpen }}>
      {children}
    </ModalStateContext.Provider>
  );
};

export const useModalState = () => {
  const ctx = useContext(ModalStateContext);
  if (!ctx) throw new Error('useModalState must be used within ModalStateProvider');
  return ctx;
};
