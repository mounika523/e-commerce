
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (itemIndex === -1) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      updatedCart[itemIndex].quantity += 1;
    }

    setCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity = quantity;
      setCart(updatedCart);
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
