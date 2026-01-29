import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, MapPin, Phone, Clock } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  days_open: string | null;
  maps_url: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const LocationManager = () => {
  const [items, setItems] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    hours: '',
    days_open: 'Monday – Sunday',
    maps_url: '',
    is_active: true,
  });

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch locations');
      return;
    }

    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      hours: '',
      days_open: 'Monday – Sunday',
      maps_url: '',
      is_active: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: Location) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      address: item.address,
      phone: item.phone,
      hours: item.hours,
      days_open: item.days_open || 'Monday – Sunday',
      maps_url: item.maps_url || '',
      is_active: item.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone || !formData.hours) {
      toast.error('Please fill in required fields');
      return;
    }

    if (editingItem) {
      const { error } = await supabase
        .from('locations')
        .update(formData)
        .eq('id', editingItem.id);

      if (error) {
        toast.error('Failed to update location');
        return;
      }
      toast.success('Location updated successfully');
    } else {
      const { error } = await supabase
        .from('locations')
        .insert([{ ...formData, display_order: items.length }]);

      if (error) {
        toast.error('Failed to add location');
        return;
      }
      toast.success('Location added successfully');
    }

    setIsDialogOpen(false);
    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;

    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete location');
      return;
    }

    toast.success('Location deleted successfully');
    fetchItems();
  };

  if (loading) {
    return <div className="text-center py-12">Loading locations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Locations</h2>
          <p className="text-muted-foreground">Manage your restaurant locations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Location' : 'Add Location'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Location Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Marathahalli"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 90082 38101"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours *</Label>
                  <Input
                    id="hours"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    placeholder="11:30 AM – 11:00 PM"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="days_open">Days Open</Label>
                <Input
                  id="days_open"
                  value={formData.days_open}
                  onChange={(e) => setFormData({ ...formData, days_open: e.target.value })}
                  placeholder="Monday – Sunday"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maps_url">Google Maps URL</Label>
                <Input
                  id="maps_url"
                  value={formData.maps_url}
                  onChange={(e) => setFormData({ ...formData, maps_url: e.target.value })}
                  placeholder="https://maps.google.com/..."
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                />
                <Label>Active</Label>
              </div>
              <Button type="submit" className="w-full bg-primary">
                {editingItem ? 'Update Location' : 'Add Location'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border">
          <p className="text-muted-foreground">No locations yet. Add your first location!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`card-kerala p-6 ${!item.is_active ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{item.name}</h3>
                    <span className="text-sm text-muted-foreground">EP Kitchen</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                  {item.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" />
                  {item.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  {item.hours} ({item.days_open})
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationManager;
