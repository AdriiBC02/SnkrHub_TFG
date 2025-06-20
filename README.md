# 🏀 SneakerHub - Tienda Online de Zapatillas

## 📋 Descripción del Proyecto

**SneakerHub** es una aplicación web de comercio electrónico desarrollada como Trabajo de Fin de Grado (TFG) que permite a los usuarios explorar, comprar y gestionar zapatillas deportivas de diferentes marcas. La aplicación está construida con tecnologías modernas y sigue las mejores prácticas de desarrollo web.

### 🎯 Objetivos del Proyecto

- Desarrollar una plataforma de e-commerce completa y funcional
- Implementar un sistema de autenticación seguro
- Crear una experiencia de usuario intuitiva y responsive
- Gestionar inventario y pedidos de forma eficiente
- Demostrar competencias en desarrollo full-stack

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework de React para aplicaciones web
- **TypeScript** - Tipado estático para mayor robustez del código
- **Tailwind CSS** - Framework de CSS utility-first para diseño responsive
- **Radix UI** - Componentes de interfaz accesibles y personalizables

### Backend y Base de Datos
- **Supabase** - Backend-as-a-Service con base de datos PostgreSQL
- **PostgreSQL** - Base de datos relacional robusta
- **Row Level Security (RLS)** - Seguridad a nivel de fila

### Herramientas Adicionales
- **Lucide React** - Iconografía moderna
- **Sonner** - Notificaciones toast elegantes

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
SneakerHub/
├── app/                    # App Router de Next.js 14
│   ├── admin/             # Panel de administración
│   ├── api/               # API Routes
│   ├── cart/              # Página del carrito
│   ├── checkout/          # Proceso de compra
│   ├── sneakers/          # Catálogo de zapatillas
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (Radix UI)
│   ├── Header.tsx        # Navegación principal
│   ├── Footer.tsx        # Pie de página
│   └── SneakerGrid.tsx   # Grid de productos
├── lib/                  # Utilidades y configuraciones
│   ├── supabase.ts       # Cliente de Supabase
│   └── CartContext.tsx   # Contexto del carrito
├── hooks/                # Custom hooks
```

## 🚀 Funcionalidades Implementadas

### 🛍️ Catálogo de Productos
- **Grid de Zapatillas**: Visualización en cuadrícula responsive
- **Productos Destacados**: Sección de productos especiales

### 🛒 Sistema de Carrito
- **Carrito Persistente**: Los productos se mantienen entre sesiones
- **Gestión de Cantidades**: Añadir, eliminar y modificar cantidades
- **Cálculo Automático**: Total y subtotales actualizados en tiempo real
- **Almacenamiento Local**: Persistencia en localStorage y cookies

### 💳 Proceso de Compra
- **Checkout Seguro**: Formulario de compra con validaciones
- **Gestión de Pedidos**: Creación y seguimiento de órdenes
- **Confirmación de Compra**: Email de confirmación automático

### 🔧 Panel de Administración
- **Gestión de Productos**: CRUD completo de zapatillas
- **Gestión de Pedidos**: Visualización y actualización de órdenes

## 🗄️ Base de Datos

### Tablas Principales

```sql

-- Tabla de zapatillas
sneakers (
  id, name, brand, price, image, 
  description, featured, stock, 
  created_at, updated_at
)

-- Tabla de pedidos
orders (
  id, user_id, total_amount, status,
  shipping_address, created_at
)

```

### Seguridad
- **Row Level Security (RLS)**: Políticas de seguridad a nivel de fila

## 🎨 Diseño y UX

### Principios de Diseño
- **Responsive Design**: Adaptable a todos los dispositivos
- **Performance**: Optimización de imágenes y carga
- **Consistencia Visual**: Sistema de diseño unificado

### Componentes UI
- **Sistema de Componentes**: Biblioteca de componentes reutilizables
- **Animaciones**: Transiciones suaves y feedback visual
- **Iconografía**: Iconos consistentes con Lucide React

## 🔒 Seguridad

### Medidas Implementadas
- **Autenticación Segura**: Supabase Auth
- **Variables de Entorno**: Configuración segura de credenciales

## 📱 Características Técnicas

### Performance
- **Server-Side Rendering (SSR)**: Mejor SEO y rendimiento inicial
- **Static Generation**: Páginas estáticas cuando es posible
- **Image Optimization**: Optimización automática de imágenes
- **Code Splitting**: Carga diferida de componentes

### SEO
- **Meta Tags**: Optimización para motores de búsqueda
- **Structured Data**: Datos estructurados para productos
- **URLs Amigables**: Rutas SEO-friendly

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd SneakerHub
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales de Supabase:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   npm start
   ```

## 🎓 Aprendizajes del TFG

### Competencias Desarrolladas
- **Desarrollo Full-Stack**: Frontend y backend integrados
- **Gestión de Base de Datos**: Diseño y optimización
- **Arquitectura de Software**: Patrones y mejores prácticas
- **DevOps**: Despliegue y configuración
- **UX/UI Design**: Experiencia de usuario

### Desafíos Superados
- **Integración de APIs**: Supabase y servicios externos
- **Gestión de Estado**: Context API y estado global
- **Responsive Design**: Adaptación multi-dispositivo
- **Performance**: Optimización de rendimiento
- **Testing**: Cobertura de pruebas completa

## 👨‍💻 Autor

**Adrián Buenaño Cañas** - Estudiante de Grado Superior de Desarrollo de Aplicaciones Web

---

*Desarrollado con ❤️ para el TFG de Grado Superior de Desarrollo de Aplicaciones Web* 