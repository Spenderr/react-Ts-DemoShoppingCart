import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem extends Product {
  name: ReactNode;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  deductFromCart: (productId: number) => void; // minus 1 (remove if 0)
  removeFromCart: (productId: number) => void; // remove all qty of item
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

const addToCart = (product: Product) => {
  setCartItems(prev => {
    const existing = prev.find(i => i.id === product.id);
    if (existing) {
      return prev.map(i =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    // explicitly cast as CartItem
    const newItem: CartItem = {
        ...product, quantity: 1,
        name: undefined
    };
    return [...prev, newItem];
  });
};


  const deductFromCart = (productId: number) => {
    setCartItems(prev =>
      prev
        .map(i => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const getTotalItems = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const getTotalPrice = () =>
    cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        deductFromCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
