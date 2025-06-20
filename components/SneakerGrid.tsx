'use client';

// Componente SneakerGrid - Grid de productos de zapatillas
// Este componente maneja la visualización de productos en formato de cuadrícula
// Incluye funcionalidades de filtrado, carga de datos y gestión del carrito

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Tipo TypeScript para definir la estructura de una zapatilla
// Esto asegura type safety en toda la aplicación
type Sneaker = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  featured: boolean;
};

// Props del componente - permite configurar el comportamiento
type SneakerGridProps = {
  limit?: number;        // Límite de productos a mostrar
  featuredOnly?: boolean; // Si mostrar solo productos destacados
};

export default function SneakerGrid({ limit, featuredOnly = false }: SneakerGridProps) {
  // Estado para almacenar los productos cargados desde la base de datos
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  // Estado de carga para mostrar spinner o skeleton
  const [loading, setLoading] = useState(true);
  // Hook para acceder a la función de añadir al carrito
  const { addToCart } = useCart();

  // Efecto que se ejecuta al montar el componente y cuando cambian las props
  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        // Inicia la consulta base a la tabla sneakers
        let query = supabase.from('sneakers').select('*');
        
        // Aplica filtro de productos destacados si se especifica
        if (featuredOnly) {
          query = query.eq('featured', true);
        }
        
        // Aplica límite de productos si se especifica
        if (limit) {
          query = query.limit(limit);
        }

        // Ejecuta la consulta y obtiene datos y posibles errores
        const { data, error } = await query;

        // Si hay error, lo lanza para ser capturado por el catch
        if (error) {
          throw error;
        }

        // Actualiza el estado con los datos obtenidos
        setSneakers(data || []);
      } catch (error) {
        // Manejo de errores con logging y notificación al usuario
        console.error('Error fetching sneakers:', error);
        toast.error('Failed to load sneakers');
      } finally {
        // Siempre marca como no cargando, independientemente del resultado
        setLoading(false);
      }
    };

    // Ejecuta la función de carga
    fetchSneakers();
  }, [limit, featuredOnly]); // Dependencias del useEffect

  // Función para añadir un producto al carrito
  const handleAddToCart = (sneaker: Sneaker) => {
    addToCart(sneaker);
    // Notificación de éxito para feedback al usuario
    toast.success(`Added ${sneaker.name} to cart`);
  };

  // Estado de carga - muestra mensaje mientras se cargan los datos
  if (loading) {
    return <div className="text-center py-12">Loading sneakers...</div>;
  }

  // Estado vacío - cuando no hay productos disponibles
  if (sneakers.length === 0) {
    return <div className="text-center py-12">No sneakers available at the moment.</div>;
  }

  return (
    // Grid responsive que se adapta a diferentes tamaños de pantalla
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sneakers.map((sneaker) => (
        <Card key={sneaker.id} className="overflow-hidden">
          <CardContent className="p-0">
            {/* Imagen optimizada con Next.js Image component */}
            <Image
              src={sneaker.image}
              alt={sneaker.name}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              {/* Información del producto */}
              <h3 className="text-xl font-semibold">{sneaker.name}</h3>
              <p className="text-gray-600">{sneaker.brand}</p>
              <p className="text-lg font-bold mt-2">€{sneaker.price}</p>
              {/* Badge para productos destacados */}
              {sneaker.featured && (
                <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Featured</span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {/* Botón para añadir al carrito */}
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => handleAddToCart(sneaker)}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}