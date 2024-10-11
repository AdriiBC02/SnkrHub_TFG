'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';

const featuredSneakers = [
  {
    id: 1,
    name: 'Air Max 90',
    brand: 'Nike',
    price: 120,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Ultraboost 21',
    brand: 'Adidas',
    price: 180,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 75,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
];

export default function FeaturedSneakers() {
  const { addToCart } = useCart();

  const handleAddToCart = (sneaker) => {
    addToCart(sneaker);
    toast.success(`Added ${sneaker.name} to cart`);
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Sneakers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredSneakers.map((sneaker) => (
          <Card key={sneaker.id} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={sneaker.image}
                alt={sneaker.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{sneaker.name}</h3>
                <p className="text-gray-600">{sneaker.brand}</p>
                <p className="text-lg font-bold mt-2">${sneaker.price}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(sneaker)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}