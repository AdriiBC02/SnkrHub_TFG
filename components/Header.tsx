'use client';

// Componente Header - Navegación principal de SneakerHub
// Este componente maneja la navegación, logo, carrito y menú móvil
// Utiliza un diseño responsive que se adapta a diferentes tamaños de pantalla

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  // Hook para acceder al carrito desde el contexto global
  const { cart } = useCart();
  // Estado para controlar la apertura/cierre del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Hook para obtener la ruta actual y resaltar la navegación activa
  const pathname = usePathname();
  // Calcula el total de items en el carrito sumando todas las cantidades
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Función helper para determinar si un enlace está activo
  const isActive = (path: string) => pathname === path;

  // Array de enlaces de navegación - fácil de mantener y extender
  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/sneakers', label: 'Sneakers' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo de la marca - enlace a la página principal */}
          <Link href="/" className="text-2xl font-bold z-50">
            <span className="text-gray-800">Sneaker</span>
            <span className="text-indigo-600">Hub</span>
          </Link>

          {/* Navegación Desktop - visible solo en pantallas medianas y grandes */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Carrito y botón de menú móvil - lado derecho del header */}
          <div className="flex items-center space-x-4 z-50">
            {/* Icono del carrito con contador de items */}
            <Link
              href="/cart"
              className="text-gray-600 hover:text-indigo-600 transition-colors relative p-2"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {/* Badge que muestra el número de items en el carrito */}
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Botón hamburguesa para móvil - cambia entre menú y X */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil - overlay completo que se desliza desde la derecha */}
        <div
          className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="pt-20 px-6">
            <nav>
              <ul className="space-y-6">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-lg font-medium transition-colors ${
                        isActive(link.href)
                          ? 'text-indigo-600'
                          : 'text-gray-600 hover:text-indigo-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}