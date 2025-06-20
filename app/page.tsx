// Página principal (Home) de SneakerHub
// Esta es la primera página que ven los usuarios al entrar a la aplicación
// Utiliza una estructura simple con Hero y productos destacados

import FeaturedSneakers from '@/components/FeaturedSneakers';
import Hero from '@/components/Hero';

// Componente Home - Página principal de la tienda
// Contiene el hero section y los productos destacados
export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section: Banner principal con call-to-action */}
      <Hero />
      {/* Featured Sneakers: Productos destacados para captar atención */}
      <FeaturedSneakers />
    </div>
  );
}