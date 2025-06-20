'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSideSupabaseClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthProvider';
import { Package, Plus, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, signOut } = useAuth();
  const supabase = createClientSideSupabaseClient();

  useEffect(() => {
    checkAuth();
  }, [user]);

  const checkAuth = async () => {
    if (!user) {
      router.push('/admin/login');
    } else {
      // Check if the user is an admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (adminError || !adminData) {
        console.error('Admin check error:', adminError);
        await handleLogout();
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      await supabase.auth.signOut(); // Explicitly sign out from Supabase
      
      // Clear any local storage or cookies
      localStorage.removeItem('supabase.auth.token');
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('sneakers')
        .insert([
          { name, brand, price: parseFloat(price), image, description },
        ]);

      if (error) throw error;

      toast.success('Sneaker added successfully');
      setName('');
      setBrand('');
      setPrice('');
      setImage('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to add sneaker');
      console.error('Error adding sneaker:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={() => router.push('/admin/orders')} variant="outline">
            <Package className="w-4 h-4 mr-2" />
            View Orders
          </Button>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Sneaker Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Plus className="w-5 h-5 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Add New Sneaker</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} required />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <Button type="submit" className="mt-6">
              <Plus className="w-4 h-4 mr-2" />
              Add Sneaker
            </Button>
          </form>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button 
              onClick={() => router.push('/admin/orders')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Package className="w-4 h-4 mr-2" />
              Manage Orders
            </Button>
            <Button 
              onClick={() => router.push('/sneakers')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Package className="w-4 h-4 mr-2" />
              View Products
            </Button>
            <Button 
              onClick={() => router.push('/')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Package className="w-4 h-4 mr-2" />
              View Store
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}