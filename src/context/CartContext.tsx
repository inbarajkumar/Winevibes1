'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { type Wine } from '@/lib/wine-data';

interface CartContextType {
  cart: Wine[];
  addToCart: (wine: Wine) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Wine[]>([]);

  const addToCart = (wine: Wine) => {
    setCart((prevCart) => [...prevCart, wine]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
