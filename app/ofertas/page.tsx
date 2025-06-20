'use client';

// Página de Ofertas - Productos con Descuentos
// Esta página muestra productos con descuentos aplicados
// Ejemplo de integración con Supabase para obtener datos dinámicos

import { useState, useEffect } from 'react';
import { createClientSideSupabaseClient } from '@/lib/supabase';
import { toast } from 'sonner';

// Interfaz para definir la estructura de un sneaker
interface Sneaker {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
}

export default function Ofertas() {
  // Estados para manejar los datos y carga
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Cliente de Supabase para operaciones de base de datos
  const supabase = createClientSideSupabaseClient();

  // Efecto para cargar los sneakers al montar el componente
  useEffect(() => {
    fetchSneakers();
  }, []);

  // Función para obtener sneakers desde la base de datos
  const fetchSneakers = async () => {
    try {
      // Consulta a la tabla sneakers ordenada por fecha de creación
      const { data, error } = await supabase
        .from('sneakers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Actualizar estado con los datos obtenidos
      setSneakers(data || []);
    } catch (error) {
      console.error('Error fetching sneakers:', error);
      toast.error('Failed to load sneakers');
    } finally {
      setIsLoading(false);
    }
  };

  // Estado de carga - mostrar indicador mientras se obtienen los datos
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold mb-8">Ofertas</h1>
      
      {/* Grid de productos con descuentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sneakers.map((sneaker) => (
          <div key={sneaker.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Contenedor de la imagen con badge de descuento */}
            <div className="relative">
              <img 
                src={sneaker.image} 
                alt={sneaker.name}
                className="w-full h-64 object-cover"
              />
              {/* Badge de descuento del 25% */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                -25%
              </div>
            </div>
            
            {/* Información del producto */}
            <div className="p-4">
              {/* Nombre y marca del sneaker */}
              <h2 className="text-xl font-semibold mb-2">{sneaker.name}</h2>
              <p className="text-gray-600 mb-2">{sneaker.brand}</p>
              
              {/* Precios: precio con descuento y precio original tachado */}
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-green-600">€ {(sneaker.price * 0.75).toFixed(2)}</p>
                <p className="text-sm text-gray-500 line-through">€ {sneaker.price.toFixed(2)}</p>
              </div>
              
              {/* Descripción del producto */}
              <p className="text-gray-700 mt-2 line-clamp-2">{sneaker.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
