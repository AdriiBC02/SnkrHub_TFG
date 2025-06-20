// API Route para Orders - Gestión de Pedidos
// Esta API maneja la creación y consulta de pedidos
// Endpoint: /api/orders

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Función POST - Crear un nuevo pedido
export async function POST(request: Request) {
  try {
    // Obtener los datos del pedido del cuerpo de la petición
    const orderData = await request.json();

    // Validar campos requeridos
    const requiredFields = ['items', 'total'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Insertar pedido en la base de datos con la estructura existente
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: orderData.user_id || null,
        total: orderData.total,
        status: orderData.status || 'pending',
        items: orderData.items,
        address: orderData.address || null,
        city: orderData.city || null,
        country: orderData.country || null,
        zip_code: orderData.zip_code || null
      }])
      .select();

    // Si hay error en la inserción, retornar error
    if (error) {
      console.error('Error creating order:', error);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Retornar respuesta exitosa con los datos del pedido creado
    return NextResponse.json({ 
      success: true, 
      order: data[0] 
    });

  } catch (error) {
    console.error('Error in orders API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Función GET - Obtener pedidos con filtros opcionales
export async function GET(request: Request) {
  try {
    // Obtener parámetros de consulta de la URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const status = searchParams.get('status');

    // Construir consulta base ordenada por fecha de creación
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    // Aplicar filtro por usuario si se proporciona
    if (userId) {
      query = query.eq('user_id', userId);
    }

    // Aplicar filtro por estado si se proporciona
    if (status) {
      query = query.eq('status', status);
    }

    // Ejecutar la consulta
    const { data, error } = await query;

    // Si hay error en la consulta, retornar error
    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    // Retornar los pedidos encontrados
    return NextResponse.json({ orders: data });

  } catch (error) {
    console.error('Error in orders API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 