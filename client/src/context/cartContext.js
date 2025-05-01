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
      const exists = prev.some(item => item._id === trip._id);
      if (exists) {
        alert("This trip is already in your picked trips.");
        return prev;
      }
      return [...prev, trip];
    });
  };
  
  
  

  const removeFromCart = (tripId) => {
    setCart(prev => prev.filter(trip => trip._id !== tripId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

