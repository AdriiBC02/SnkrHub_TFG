'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

interface OrderDetails {
  orderId: string;
  items: any[];
  total: number;
  shipping: number;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  date: string;
}

const CheckoutSuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('orderDetails');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p>No order details found. Please complete checkout first.</p>
          <Link
            href="/cart"
            className="mt-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="rounded-full bg-green-100 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Thank you for your order!
          </h2>
          <p className="text-lg text-gray-600">
            Your order has been successfully placed. You will receive a confirmation email shortly.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
              </div>
              <p className="text-sm text-gray-500">Order {orderDetails.orderId}</p>
            </div>

            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">€{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-900">€{orderDetails.total - orderDetails.shipping}</p>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium text-gray-900">€{orderDetails.shipping}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold mt-4">
                <p className="text-gray-900">Total</p>
                <p className="text-indigo-600">€{orderDetails.total}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Shipping Details</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>{orderDetails.customer.name}</p>
              <p>{orderDetails.customer.email}</p>
              <p>{orderDetails.customer.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/sneakers"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage; 