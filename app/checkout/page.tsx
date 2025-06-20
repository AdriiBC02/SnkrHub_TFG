'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import { CreditCard, ShieldCheck, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface FieldErrors {
  [key: string]: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const totalWithShipping = total + shipping;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check for empty required fields
    const errors: FieldErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'postalCode', 'cardNumber', 'expiryDate', 'cvv'];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        errors[field] = 'This field is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare order data for database with existing structure
      const orderData = {
        user_id: null, // No user authentication in this version
        total: totalWithShipping,
        status: 'pending',
        items: cart,
        address: formData.address || null,
        city: formData.city || null,
        country: formData.country || null,
        zip_code: formData.postalCode || null
      };

      // Save order to database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const result = await response.json();

      if (result.success) {
        // Store order details for success page
        const orderDetails = {
          orderId: result.order.id,
          items: cart,
          total: totalWithShipping,
          shipping: shipping,
          customer: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
          },
          date: new Date().toISOString(),
        };

        sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        
        // Show success message
        toast.success('Order placed successfully!');
        
        // Redirect to success page
        await router.push('/checkout/success');
        
        // Clear cart after successful order (with delay to ensure redirect completes)
        setTimeout(() => {
          clearCart();
        }, 100);

      } else {
        throw new Error('Failed to create order');
      }

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const renderInput = (name: keyof typeof formData, label: string, placeholder: string = '', type: string = 'text') => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={isSubmitting}
        className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors ${
          fieldErrors[name] ? 'border-red-300' : ''
        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {fieldErrors[name] && (
        <p className="mt-1 text-sm text-red-600">{fieldErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Checkout Steps */}
        <div className="mb-12 flex justify-center space-x-16">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-500">Cart</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white mb-2">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-indigo-600">Payment & Shipping</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Shipping Information</h2>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {renderInput('firstName', 'First Name')}
                  {renderInput('lastName', 'Last Name')}
                  {renderInput('email', 'Email', '', 'email')}
                  {renderInput('address', 'Address')}
                  {renderInput('city', 'City')}
                  {renderInput('postalCode', 'Postal Code')}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">Payment Information</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {renderInput('cardNumber', 'Card Number', '**** **** **** ****')}
                    <div className="grid grid-cols-2 gap-6">
                      {renderInput('expiryDate', 'Expiry Date', 'MM/YY')}
                      {renderInput('cvv', 'CVV', '***')}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <ShoppingCart className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
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
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">€{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-900">€{total}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium text-gray-900">€{shipping}</p>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-lg font-medium text-indigo-600">€{totalWithShipping}</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`mt-8 w-full py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Purchase</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 