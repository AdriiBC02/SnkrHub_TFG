# Guía Personal SneakerHub Pro 🚀

## Preguntas Frecuentes (FAQ)

### 1. ¿Cómo está estructurado el proyecto?
El proyecto sigue la estructura de Next.js App Router:
- `app/`: Páginas y rutas
- `components/`: Componentes reutilizables
- `lib/`: Utilidades y configuraciones
- `public/`: Archivos estáticos

### 2. ¿Cómo funciona el sistema de estado?
Utilizamos React Context para el estado global:
- `CartContext`: Gestiona el carrito
- `AuthProvider`: Maneja la autenticación
- Estado local con `useState` para componentes específicos

### 3. ¿Cómo se manejan los estilos?
Tailwind CSS es nuestro framework principal:
- Clases utility-first
- Responsive design con prefijos (sm:, md:, lg:)
- Componentes personalizados en /components/ui

### 4. ¿Cómo se implementa el diseño responsive?
Seguimos un enfoque mobile-first:
- Breakpoints: sm(640px), md(768px), lg(1024px)
- Menú hamburguesa en móvil
- Grid adaptativo para productos
- Imágenes optimizadas

## Tutorial: Crear una Nueva Página

### Ejemplo Práctico: Crear una Página "Ofertas"

1. **Crear el archivo de la página**
```typescript
// app/offers/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  
  useEffect(() => {
    // Fetch offers from Supabase
    const fetchOffers = async () => {
      const { data } = await supabase
        .from('sneakers')
        .select('*')
        .eq('on_sale', true);
      setOffers(data);
    };
    
    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center">
            Ofertas Especiales
          </h1>
          <p className="mt-4 text-gray-600 text-center">
            Descubre nuestras mejores ofertas
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl shadow-sm p-6">
              {/* Offer Card Content */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

2. **Añadir la ruta al Header**
```typescript
// components/Header.tsx
const navigationLinks = [
  // ... existing links
  { href: '/offers', label: 'Ofertas' },
];
```

3. **Crear componentes necesarios**
```typescript
// components/OfferCard.tsx
export default function OfferCard({ offer }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Card content */}
    </div>
  );
}
```

### Pasos Generales para Crear Nuevas Páginas

1. **Planificación**
   - Definir el propósito de la página
   - Identificar componentes necesarios
   - Planear la estructura de datos

2. **Implementación**
   - Crear el archivo en app/
   - Implementar componentes necesarios
   - Conectar con la base de datos si es necesario

3. **Estilización**
   - Aplicar estilos Tailwind
   - Asegurar diseño responsive
   - Mantener consistencia visual

4. **Testing**
   - Probar en diferentes dispositivos
   - Verificar funcionalidad
   - Optimizar rendimiento

## Consejos y Trucos

### 1. Tailwind CSS
```typescript
// Ejemplo de clases comunes
className="
  px-4 py-2                    // Padding
  bg-indigo-600                // Color de fondo
  hover:bg-indigo-700          // Estado hover
  text-white                   // Color de texto
  rounded-lg                   // Bordes redondeados
  transition-colors            // Transiciones suaves
  duration-200                 // Duración de transición
"
```

### 2. Componentes Reutilizables
```typescript
// Ejemplo de componente Button
export function Button({ 
  children, 
  variant = 'primary',
  ...props 
}) {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  return (
    <button 
      className={`px-4 py-2 rounded-lg transition-colors ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 3. Gestión de Estado
```typescript
// Ejemplo de hook personalizado
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

## Solución de Problemas Comunes

### 1. Problemas de Renderizado
```typescript
// Error: Hydration failed
// Solución: Usar useEffect para código del cliente
useEffect(() => {
  // Código que depende del navegador
}, []);
```

### 2. Problemas de Rendimiento
```typescript
// Optimizar re-renders
const MemoizedComponent = memo(MyComponent);

// Usar useCallback para funciones
const handleClick = useCallback(() => {
  // Lógica
}, [dependencies]);
```

### 3. Problemas de Diseño Responsive
```typescript
// Solución común para diseño responsive
<div className="
  grid
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-3
  gap-4
  sm:gap-6
  lg:gap-8
">
  {/* Contenido */}
</div>
```

## Recursos Útiles

### Documentación
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase](https://supabase.com/docs)

### Herramientas
- [VS Code Extensions](https://marketplace.visualstudio.com/)
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - GitHub Copilot

### Comunidad
- [Next.js Discord](https://discord.gg/nextjs)
- [Tailwind CSS Discord](https://discord.gg/tailwindcss)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

*Esta guía está en constante evolución. Siéntete libre de añadir tus propias notas y aprendizajes.* 