'use client';

// Contexto del Carrito de Compras - Gestión de Estado Global
// Este archivo implementa un sistema completo de gestión del carrito usando React Context
// Incluye persistencia en localStorage y cookies, y sincronización entre componentes

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Tipo TypeScript para definir la estructura de un item del carrito
// Asegura consistencia en toda la aplicación
type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
};

// Tipo para el contexto del carrito - define todas las funciones disponibles
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

// Creación del contexto con valor inicial undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider del contexto - envuelve toda la aplicación
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado principal del carrito
  const [cart, setCart] = useState<CartItem[]>([]);

  // Efecto para cargar el carrito desde el almacenamiento al inicializar
  useEffect(() => {
    const loadCart = () => {
      // Intenta cargar desde localStorage primero (más rápido)
      const savedCart = localStorage.getItem('cart');
      // Si no hay localStorage, intenta con cookies como fallback
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

  // Efecto para guardar el carrito cuando cambia el estado
  useEffect(() => {
    if (cart.length > 0) {
      // Solo guarda si hay items en el carrito para optimizar
      const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        // Cookies expiran en 7 días para persistencia a largo plazo
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
      };

      saveCart();
    }
  }, [cart]);

  // Función para añadir un item al carrito
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      // Busca si el item ya existe en el carrito
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Si existe, incrementa la cantidad en lugar de duplicar
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // Si no existe, añade el nuevo item con cantidad 1
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Función para eliminar un item del carrito por ID
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Función para limpiar completamente el carrito
  const clearCart = () => {
    setCart([]);
    // También limpia el almacenamiento local
    localStorage.removeItem('cart');
    Cookies.remove('cart');
  };

  // Proporciona el contexto con todos los valores y funciones
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
