// API Route para Sneakers - Gestión de Productos
// Esta API maneja las operaciones CRUD para los sneakers
// Endpoint: /api/sneakers

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Función GET - Obtener todos los sneakers
export async function GET() {
  try {
    // Consulta a la tabla sneakers para obtener todos los registros
    const { data, error } = await supabase
      .from('sneakers')
      .select('*');

    // Si hay error en la consulta, lanzar excepción
    if (error) {
      throw error;
    }

    // Retornar los datos en formato JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sneakers:', error);
    return NextResponse.json({ error: 'Failed to fetch sneakers' }, { status: 500 });
  }
}

// Función POST - Crear un nuevo sneaker
export async function POST(request: Request) {
  try {
    // Obtener los datos del sneaker del cuerpo de la petición
    const sneaker = await request.json();

    // Insertar el nuevo sneaker en la base de datos
    const { data, error } = await supabase
      .from('sneakers')
      .insert(sneaker)
      .select();

    // Si hay error en la inserción, lanzar excepción
    if (error) {
      throw error;
    }

    // Retornar el sneaker creado
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating sneaker:', error);
    return NextResponse.json({ error: 'Failed to create sneaker' }, { status: 500 });
  }
}