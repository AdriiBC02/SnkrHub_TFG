// Configuración del Cliente de Supabase
// Este archivo establece la conexión con Supabase para autenticación y base de datos
// Utiliza variables de entorno para mantener las credenciales seguras

import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Obtiene las credenciales desde las variables de entorno
// Estas variables deben estar definidas en .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validación de seguridad - verifica que las credenciales estén presentes
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Cliente principal de Supabase para operaciones del lado del servidor
// Se usa en API routes y Server Components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente del lado del cliente para operaciones en el navegador
// Se usa en componentes del cliente para autenticación y consultas
export const createClientSideSupabaseClient = () => createClientComponentClient();