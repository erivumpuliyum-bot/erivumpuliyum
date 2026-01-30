import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Image, MapPin, Star, Users } from 'lucide-react';

interface DashboardStats {
  menuItems: number;
  bestSellers: number;
  galleryImages: number;
  locations: number;
  testimonials: number;
  adminUsers: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    menuItems: 0,
    bestSellers: 0,
    galleryImages: 0,
    locations: 0,
    testimonials: 0,
    adminUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [menuRes, galleryRes, locationsRes, testimonialsRes, adminRes] = await Promise.all([
        supabase.from('menu_items').select('id, is_best_seller', { count: 'exact' }),
        supabase.from('gallery_images').select('id', { count: 'exact' }),
        supabase.from('locations').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('user_roles').select('id', { count: 'exact' }).eq('role', 'admin'),
      ]);

      const bestSellers = menuRes.data?.filter(item => item.is_best_seller).length || 0;

      setStats({
        menuItems: menuRes.count || 0,
        bestSellers,
        galleryImages: galleryRes.count || 0,
        locations: locationsRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        adminUsers: adminRes.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Menu Items', value: stats.menuItems, icon: Utensils, color: 'text-primary' },
    { title: 'Best Sellers', value: stats.bestSellers, icon: Star, color: 'text-yellow-500' },
    { title: 'Gallery Images', value: stats.galleryImages, icon: Image, color: 'text-blue-500' },
    { title: 'Locations', value: stats.locations, icon: MapPin, color: 'text-green-500' },
    { title: 'Testimonials', value: stats.testimonials, icon: Star, color: 'text-purple-500' },
    { title: 'Admin Users', value: stats.adminUsers, icon: Users, color: 'text-orange-500' },
  ];

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your restaurant website</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Mark menu items as "Best Seller" to feature them on the homepage carousel</p>
          <p>• Keep gallery images high quality for best display</p>
          <p>• Update location hours during holidays</p>
          <p>• Add customer testimonials to build trust</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
