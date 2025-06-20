'use client';

// Página de Contacto - Formulario y Información de Contacto
// Esta página permite a los usuarios contactar con la empresa
// Incluye formulario de contacto, información de la empresa y FAQ

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  // Estado del formulario de contacto
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Estado para manejar el estado del envío del formulario
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí normalmente enviarías los datos del formulario al backend
    // Por ahora, simulamos un envío exitoso
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sección Hero - Título principal */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Have questions about our products or services? We're here to help! Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </div>

      {/* Tarjetas de Información de Contacto */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tarjeta de Email */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">info@sneakerhub.com</p>
            <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
          </div>

          {/* Tarjeta de Teléfono */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">(123) 456-7890</p>
            <p className="text-sm text-gray-500 mt-2">Mon-Fri from 9am to 6pm</p>
          </div>

          {/* Tarjeta de Dirección */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Sneaker Street</p>
            <p className="text-sm text-gray-500 mt-2">Shoe City, SC 12345</p>
          </div>

          {/* Tarjeta de Horarios */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
            <p className="text-gray-600">Mon - Fri: 9am - 6pm</p>
            <p className="text-sm text-gray-500 mt-2">Sat - Sun: 10am - 4pm</p>
          </div>
        </div>
      </div>

      {/* Sección del Formulario de Contacto */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8">
              {/* Header del formulario */}
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
              </div>

              {/* Formulario de contacto */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos de nombre y email */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Campo de asunto */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                {/* Campo de mensaje */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                {/* Botón de envío */}
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </Button>
                </div>

                {/* Mensajes de estado del formulario */}
                {formStatus === 'success' && (
                  <div className="bg-green-50 text-green-800 rounded-lg p-4">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="bg-red-50 text-red-800 rounded-lg p-4">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Preguntas Frecuentes */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header de la sección FAQ */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">Find quick answers to common questions</p>
          </div>

          {/* Lista de preguntas frecuentes */}
          <div className="space-y-6">
            {/* FAQ 1: Tiempos de envío */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are your shipping times?</h3>
              <p className="text-gray-600">We typically process and ship orders within 1-2 business days. Delivery times vary by location but usually take 3-5 business days for domestic orders.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer returns?</h3>
              <p className="text-gray-600">Yes, we offer a 30-day return policy for unworn items in their original packaging. Shipping costs for returns are the responsibility of the customer.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are your products authentic?</h3>
              <p className="text-gray-600">Absolutely! We guarantee 100% authenticity on all our products. Each item goes through a rigorous verification process before being listed on our site.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}