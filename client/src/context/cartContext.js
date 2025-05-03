//This file gives you:
// A global cart state
// Easy functions to add/remove items
// Access to cart data from any component

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (trip) => {
    setCart(prev => {
      if (prev.some(t => t._id === trip._id)) return prev;
      return [...prev, trip];
    });
  };

  const removeFromCart = (tripId) => {
    setCart(prev => prev.filter(t => t._id !== tripId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);

