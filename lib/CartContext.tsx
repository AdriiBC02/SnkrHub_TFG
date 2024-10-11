'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage or cookies on initial load
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      const cookieCart = Cookies.get('cart');

      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error parsing cart data from localStorage:', error);
        }
      } else if (cookieCart) {
        try {
          setCart(JSON.parse(cookieCart));
        } catch (error) {
          console.error('Error parsing cart data from cookie:', error);
        }
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage and cookies whenever the cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      // Only save if cart is not empty
      const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Expires in 7 days
      };

      saveCart();
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear the entire cart, both from state and storage
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    Cookies.remove('cart');
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
