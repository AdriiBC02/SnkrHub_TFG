// Componente FeaturedSneakers - Sección de productos destacados
// Este componente reutiliza SneakerGrid para mostrar solo productos destacados
// Se usa en la página principal para captar la atención del usuario

import SneakerGrid from '@/components/SneakerGrid';

export default function FeaturedSneakers() {
  return (
    <section className="py-12">
      {/* Título de la sección */}
      <h2 className="text-3xl font-bold text-center mb-8">Featured Sneakers</h2>
      
      {/* Grid de productos destacados - máximo 6 productos */}
      <SneakerGrid limit={6} featuredOnly={true} />
    </section>
  );
}