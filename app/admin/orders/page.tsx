'use client';

// Página de Gestión de Pedidos - Panel de Administración
// Esta página permite a los administradores ver y gestionar todos los pedidos
// Incluye autenticación, listado de pedidos, actualización de estados y detalles

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSideSupabaseClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthProvider';
import { Package, Eye, Calendar, MapPin, DollarSign, EuroIcon } from 'lucide-react';

// Interfaz para definir la estructura de un pedido
interface Order {
  id: string;
  user_id: string | null;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  items: any[] | string; // Puede ser array o string JSON
  address: string | null;
  city: string | null;
  country: string | null;
  zip_code: string | null;
}

export default function AdminOrders() {
  // Estados para manejar los pedidos y la interfaz
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClientSideSupabaseClient();

  // Efecto para verificar autenticación al cargar el componente
  useEffect(() => {
    checkAuth();
  }, [user]);

  // Función para verificar si el usuario está autenticado y es administrador
  const checkAuth = async () => {
    if (!user) {
      router.push('/admin/login');
    } else {
      // Verificar si el usuario es administrador en la tabla admin_users
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (adminError || !adminData) {
        console.error('Admin check error:', adminError);
        router.push('/admin/login');
      } else {
        fetchOrders();
      }
    }
  };

  // Función para obtener todos los pedidos desde la base de datos
  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para actualizar el estado de un pedido
  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast.success('Order status updated successfully');
      fetchOrders(); // Actualizar la lista de pedidos
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  // Función para obtener el color del badge según el estado del pedido
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para formatear fechas en formato español
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para generar un ID de pedido legible
  const getOrderId = (order: Order) => {
    return `#${order.id.slice(0, 8).toUpperCase()}`;
  };

  // Función para parsear los items del pedido (pueden venir como array o JSON string)
  const parseItems = (items: any[] | string): any[] => {
    if (Array.isArray(items)) {
      return items;
    }
    if (typeof items === 'string') {
      try {
        return JSON.parse(items);
      } catch (error) {
        console.error('Error parsing items JSON:', error);
        return [];
      }
    }
    return [];
  };

  // Estado de carga - mostrar indicador mientras se obtienen los datos
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con título y botón de regreso */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <Button onClick={() => router.push('/admin/dashboard')}>
          Back to Dashboard
        </Button>
      </div>

      {/* Contenido principal - Lista de pedidos o mensaje de no hay pedidos */}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500">Orders will appear here once customers make purchases.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border p-6">
              {/* Header del pedido con información básica */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order {getOrderId(order)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Badge de estado del pedido */}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {/* Botón para ver/ocultar detalles */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedOrder?.id === order.id ? 'Hide' : 'View'}
                  </Button>
                </div>
              </div>

              {/* Información básica del pedido en grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Ciudad */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {order.city || 'No city specified'}
                  </span>
                </div>
                {/* Dirección */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {order.address ? `${order.address.slice(0, 30)}...` : 'No address specified'}
                  </span>
                </div>
                {/* Total del pedido */}
                <div className="flex items-center space-x-2">
                  <EuroIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{order.total}</span>
                </div>
              </div>

              {selectedOrder?.id === order.id && (
                <div className="border-t pt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shipping Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {order.address && <p>Address: {order.address}</p>}
                      {order.city && <p>City: {order.city}</p>}
                      {order.country && <p>Country: {order.country}</p>}
                      {order.zip_code && <p>ZIP Code: {order.zip_code}</p>}
                      {!order.address && !order.city && !order.country && !order.zip_code && (
                        <p className="text-gray-400">No shipping details provided</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {parseItems(order.items).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>€{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>€{order.total}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Update Status</h4>
                    <div className="flex space-x-2">
                      {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                        <Button
                          key={status}
                          variant={order.status === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, status)}
                          disabled={order.status === status}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 