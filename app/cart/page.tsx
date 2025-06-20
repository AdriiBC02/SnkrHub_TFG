'use client';

// Página del Carrito de Compras
// Esta página permite a los usuarios ver, gestionar y proceder con sus compras
// Incluye estados vacío y con productos, cálculo de totales y navegación al checkout

import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, CreditCard, Trash2, ArrowRight } from 'lucide-react';

export default function Cart() {
  // Hook para acceder al carrito y funciones de gestión
  const { cart, removeFromCart } = useCart();

  // Cálculo del total sumando precio * cantidad de cada item
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Estado vacío - cuando no hay productos en el carrito
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Icono de carrito vacío */}
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            {/* Mensaje informativo */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-8">Looks like you haven't added any sneakers to your cart yet.</p>
            {/* Botón para continuar comprando */}
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/sneakers">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Estado con productos - muestra el carrito completo
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Indicador de pasos del proceso de compra */}
        <div className="mb-12 flex justify-center space-x-16">
          {/* Paso actual - Carrito */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white mb-2">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-indigo-600">Cart</span>
          </div>
          {/* Siguiente paso - Pago y envío */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-500">Payment & Shipping</span>
          </div>
        </div>

        {/* Contenedor principal del carrito */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            {/* Header del carrito */}
            <div className="flex items-center space-x-2 mb-6">
              <ShoppingCart className="w-6 h-6 text-indigo-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
            </div>

            {/* Lista de productos en el carrito */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  {/* Imagen del producto */}
                  <div className="relative h-24 w-24 rounded-md overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Información del producto */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>Quantity: {item.quantity}</span>
                      <span className="mx-2">•</span>
                      <span>€{item.price} each</span>
                    </div>
                  </div>
                  
                  {/* Precio total del item y botón de eliminar */}
                  <div className="text-right">
                    <p className="text-lg font-medium text-indigo-600">€{item.price * item.quantity}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen y botones de acción */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              {/* Total y información de envío */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-sm text-gray-500">Shipping calculated at checkout</p>
                </div>
                <p className="text-2xl font-semibold text-indigo-600">€{total}</p>
              </div>

              {/* Botones de acción */}
              <div className="mt-6 space-y-3">
                {/* Botón principal - Proceder al checkout */}
                <Button 
                  asChild 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6 flex items-center justify-center space-x-2"
                >
                  <Link href="/checkout">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                {/* Botón secundario - Continuar comprando */}
                <Button 
                  asChild 
                  className="w-full bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20 border-0"
                >
                  <Link href="/sneakers">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}