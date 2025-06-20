// Layout principal de la aplicación SneakerHub
// Este archivo define la estructura base que se aplica a todas las páginas
// Utiliza el nuevo App Router de Next.js 14 para mejor performance y SEO

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/CartContext';
import { AuthProvider } from '@/lib/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

// Configuración de la fuente Inter de Google Fonts
// Se optimiza automáticamente por Next.js para mejor performance
const inter = Inter({ subsets: ['latin'] });

// Metadatos de la aplicación para SEO
// Estos datos aparecen en los motores de búsqueda y redes sociales
export const metadata: Metadata = {
  title: 'SneakerHub - Your Ultimate Sneaker Store',
  description: 'Find the latest and greatest sneakers at SneakerHub. Discover authentic, high-quality sneakers from top brands with fast shipping and excellent customer service.',
  keywords: 'sneakers, shoes, footwear, athletic shoes, running shoes, basketball shoes, authentic sneakers, sneaker store',
  authors: [{ name: 'SneakerHub Team' }],
  creator: 'SneakerHub',
  publisher: 'SneakerHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sneakerhub.com'), // Cambia esto por tu dominio real
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SneakerHub - Your Ultimate Sneaker Store',
    description: 'Find the latest and greatest sneakers at SneakerHub. Discover authentic, high-quality sneakers from top brands.',
    url: 'https://sneakerhub.com',
    siteName: 'SneakerHub',
    images: [
      {
        url: '/og-image.png', // Crea una imagen para redes sociales
        width: 1200,
        height: 630,
        alt: 'SneakerHub - Premium Sneaker Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SneakerHub - Your Ultimate Sneaker Store',
    description: 'Find the latest and greatest sneakers at SneakerHub. Discover authentic, high-quality sneakers from top brands.',
    images: ['/og-image.png'],
    creator: '@sneakerhub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Añade tu código de verificación de Google
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#667eea' },
    ],
  },
  manifest: '/manifest.json', // Para PWA (Progressive Web App)
};

// Componente RootLayout - Estructura principal de la aplicación
// Este layout se aplica a todas las páginas de la aplicación
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AuthProvider: Proporciona contexto de autenticación a toda la app */}
        <AuthProvider>
          {/* CartProvider: Proporciona contexto del carrito de compras */}
          <CartProvider>
            {/* Estructura principal con flexbox para sticky footer */}
            <div className="flex flex-col min-h-screen">
              {/* Header: Navegación principal y carrito */}
              <Header />
              {/* Main: Contenido principal que crece para ocupar el espacio disponible */}
              <main className="flex-grow">{children}</main>
              {/* Footer: Pie de página siempre al final */}
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
        {/* Toaster: Sistema de notificaciones toast para feedback al usuario */}
        <Toaster />
      </body>
    </html>
  );
}