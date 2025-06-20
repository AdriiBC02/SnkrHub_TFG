'use client';

// Provider de Autenticación - Gestión de Estado de Usuario
// Este archivo maneja la autenticación global usando Supabase Auth
// Proporciona contexto de usuario y funciones de autenticación a toda la app

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSideSupabaseClient } from './supabase';

// Tipo para el contexto de autenticación
type AuthContextType = {
  user: any | null;           // Usuario actual o null si no está autenticado
  signOut: () => Promise<void>; // Función para cerrar sesión
};

// Creación del contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider principal que envuelve toda la aplicación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado del usuario actual
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();
  const supabase = createClientSideSupabaseClient();

  // Efecto para manejar cambios en el estado de autenticación
  useEffect(() => {
    // Suscripción a cambios de autenticación en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Usuario autenticado - actualiza el estado
        setUser(session.user);
      } else {
        // Usuario no autenticado - limpia el estado
        setUser(null);
      }
      // Refresca la página para actualizar el estado del servidor
      router.refresh();
    });

    // Verifica si hay una sesión existente al cargar la página
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });

    // Cleanup: cancela la suscripción cuando el componente se desmonta
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Función para cerrar sesión
  const signOut = async () => {
    try {
      // Cierra sesión en Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Limpia el estado local
      setUser(null);
      
      // Limpia cualquier token almacenado localmente
      localStorage.removeItem('supabase.auth.token');
      
      // Limpia todas las cookies relacionadas con la autenticación
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Redirige al login
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Proporciona el contexto con el usuario y la función de logout
  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};