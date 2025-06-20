'use client';

import { useState, useEffect } from 'react';
import { createClientSideSupabaseClient } from '@/lib/supabase';
import { toast } from 'sonner';

//Esta página se creo como ejemplo para ver como se puede hacer una página con datos extraídos de la base de datos

interface Sneaker {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
}

export default function Ofertas() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientSideSupabaseClient();

  useEffect(() => {
    fetchSneakers();
  }, []);

  const fetchSneakers = async () => {
    try {
      const { data, error } = await supabase
        .from('sneakers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSneakers(data || []);
    } catch (error) {
      console.error('Error fetching sneakers:', error);
      toast.error('Failed to load sneakers');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ofertas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sneakers.map((sneaker) => (
          <div key={sneaker.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={sneaker.image} 
                alt={sneaker.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                -25%
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{sneaker.name}</h2>
              <p className="text-gray-600 mb-2">{sneaker.brand}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-green-600">€ {(sneaker.price * 0.75).toFixed(2)}</p>
                <p className="text-sm text-gray-500 line-through">€ {sneaker.price.toFixed(2)}</p>
              </div>
              <p className="text-gray-700 mt-2 line-clamp-2">{sneaker.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
