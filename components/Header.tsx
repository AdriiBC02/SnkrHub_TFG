'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          SneakerHub
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
            <li><Link href="/sneakers" className="text-gray-600 hover:text-gray-800">Sneakers</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link></li>
          </ul>
        </nav>
        <Link href="/cart" className="text-gray-600 hover:text-gray-800 relative">
          <ShoppingCart />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}