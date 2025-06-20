'use client';

// Página de Login de Administración - Autenticación de Administradores
// Esta página permite a los administradores iniciar sesión en el panel de administración
// Incluye verificación de permisos de administrador y redirección automática

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createClientSideSupabaseClient } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthProvider';

export default function AdminLogin() {
  // Estados para el formulario de login y manejo de carga
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientSideSupabaseClient();
  const { user } = useAuth();

  // Efecto para verificar autenticación al cargar el componente
  useEffect(() => {
    checkAuth();
  }, [user]);

  // Función para verificar si el usuario ya está autenticado y es administrador
  const checkAuth = async () => {
    if (user) {
      // Verificar si el usuario es administrador en la tabla admin_users
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (adminData) {
        // Si es administrador, redirigir al dashboard
        router.push('/admin/dashboard');
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  // Función para manejar el proceso de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Intentar iniciar sesión con Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Verificar si el usuario es administrador después del login
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', data.user.id)
          .single();

        if (adminError || !adminData) {
          console.error('Admin check error:', adminError);
          // Si no es administrador, cerrar sesión y mostrar error
          await supabase.auth.signOut();
          throw new Error('Not authorized as admin');
        }

        // Login exitoso - mostrar mensaje y redirigir al dashboard
        toast.success('Logged in successfully');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      toast.error('Failed to log in');
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Estado de carga - mostrar indicador mientras se verifica autenticación
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Contenedor del formulario de login */}
      <div className="p-8 bg-white rounded shadow-md w-96">
        {/* Título de la página */}
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        
        {/* Formulario de login */}
        <form onSubmit={handleLogin}>
          {/* Campo de email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Campo de contraseña */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {/* Botón de envío */}
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}