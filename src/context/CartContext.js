import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Update quantity of a specific item in the cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent setting quantity less than 1
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
