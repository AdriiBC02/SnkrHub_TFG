// Página About - Información sobre SneakerHub
// Esta página presenta la empresa, su historia, valores y ventajas competitivas
// Utiliza un diseño modular con diferentes secciones para mejor organización

import { Award, Heart, Package, Truck, Users, Star, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sección Hero - Introducción principal */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Título principal con branding */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              About <span className="text-gray-900">Sneaker</span><span className="text-indigo-600">Hub</span>
            </h1>
            {/* Descripción de la empresa */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Your premier destination for authentic, high-quality sneakers. We're more than just a store - we're a community of passionate sneaker enthusiasts.
            </p>
          </div>
        </div>
      </div>

      {/* Sección Nuestra Historia - Story de la empresa */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto de la historia */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2023, SneakerHub emerged from a simple yet powerful vision: to create a space where sneaker culture thrives and authenticity reigns supreme.
                </p>
                <p>
                  What started as a passion project by a group of sneaker enthusiasts has evolved into a trusted platform serving thousands of customers worldwide.
                </p>
                <p>
                  Our journey is defined by our commitment to quality, authenticity, and community. Every pair of sneakers we offer is carefully selected to ensure it meets our high standards.
                </p>
              </div>
            </div>
            
            {/* Estadísticas de la empresa */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-600/10 p-6 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-indigo-600/10 p-6 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
                <div className="text-gray-600">Brand Partners</div>
              </div>
              <div className="bg-indigo-600/10 p-6 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 mb-2">100%</div>
                <div className="text-gray-600">Authentic Products</div>
              </div>
              <div className="bg-indigo-600/10 p-6 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Valores Fundamentales */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de la sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          {/* Grid de valores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Valor 1: Autenticidad */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authenticity Guaranteed</h3>
              <p className="text-gray-600">Every product we sell is 100% authentic, verified by our expert team.</p>
            </div>
            
            {/* Valor 2: Pasión */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Passion for Sneakers</h3>
              <p className="text-gray-600">We live and breathe sneaker culture, sharing our expertise with our community.</p>
            </div>
            
            {/* Valor 3: Comunidad */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600">Building and nurturing a community of sneaker enthusiasts worldwide.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Por Qué Elegirnos - Ventajas competitivas */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de la sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose SneakerHub</h2>
            <p className="mt-4 text-lg text-gray-600">What sets us apart from the rest</p>
          </div>
          
          {/* Grid de ventajas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Ventaja 1: Selección Premium */}
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Selection</h3>
              <p className="text-gray-600">Curated collection of the finest sneakers</p>
            </div>
            
            {/* Ventaja 2: Envío Rápido */}
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick and secure worldwide delivery</p>
            </div>
            
            {/* Ventaja 3: Mejores Precios */}
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices on all products</p>
            </div>
            
            {/* Ventaja 4: Empaquetado Seguro */}
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Packaging</h3>
              <p className="text-gray-600">Premium packaging for safe delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}