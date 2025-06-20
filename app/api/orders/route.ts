import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // Validate required fields
    const requiredFields = ['items', 'total'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Insert order into database with existing structure
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

    if (error) {
      console.error('Error creating order:', error);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      order: data[0] 
    });

  } catch (error) {
    console.error('Error in orders API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const status = searchParams.get('status');

    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json({ orders: data });

  } catch (error) {
    console.error('Error in orders API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 