// Página de Catálogo de Zapatillas
// Esta página muestra todos los productos disponibles en la tienda
// Reutiliza el componente SneakerGrid sin filtros para mostrar todo el catálogo

import SneakerGrid from '@/components/SneakerGrid';

export default function SneakersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título principal de la página */}
      <h1 className="text-3xl font-bold text-center mb-8">Our Sneakers Collection</h1>
      
      {/* Grid completo de productos - sin límites ni filtros */}
      <SneakerGrid />
    </div>
  );
}