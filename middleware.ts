// Middleware de Autenticación y Autorización
// Este archivo protege las rutas del panel de administración
// Se ejecuta en cada request para verificar autenticación y permisos de admin

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// Función principal del middleware que se ejecuta en cada request
export async function middleware(req: NextRequest) {
  // Crea la respuesta base que se puede modificar
  const res = NextResponse.next();
  
  // Crea el cliente de Supabase para el middleware
  // Permite acceder a la autenticación en el contexto del servidor
  const supabase = createMiddlewareClient({ req, res });

  // Obtiene la sesión actual del usuario
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protección de rutas de administración
  // Verifica si la ruta comienza con /admin pero no es /admin/login
  if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
    // Si no hay sesión activa, redirige al login
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Verificación adicional: comprueba si el usuario es admin
    // Consulta la tabla admin_users para verificar permisos
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', session.user.id)
      .single();

    // Si no es admin o hay error, redirige al login
    // No se hace logout automático para evitar problemas de UX
    if (adminError || !adminData) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Si todo está bien, continúa con la request
  return res;
}

// Configuración del middleware - define qué rutas debe interceptar
export const config = {
  matcher: ['/admin/:path*'], // Solo se ejecuta en rutas que empiecen con /admin
};