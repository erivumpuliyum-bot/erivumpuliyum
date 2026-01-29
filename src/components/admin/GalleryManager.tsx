import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const categories = ['Food', 'Ambience', 'Kitchen', 'Events'];

const GalleryManager = () => {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    category: 'Food',
    is_active: true,
  });

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch gallery images');
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
      title: '',
      image_url: '',
      category: 'Food',
      is_active: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: GalleryImage) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image_url: item.image_url,
      category: item.category || 'Food',
      is_active: item.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.image_url) {
      toast.error('Please fill in required fields');
      return;
    }

    if (editingItem) {
      const { error } = await supabase
        .from('gallery_images')
        .update(formData)
        .eq('id', editingItem.id);

      if (error) {
        toast.error('Failed to update image');
        return;
      }
      toast.success('Image updated successfully');
    } else {
      const { error } = await supabase
        .from('gallery_images')
        .insert([{ ...formData, display_order: items.length }]);

      if (error) {
        toast.error('Failed to add image');
        return;
      }
      toast.success('Image added successfully');
    }

    setIsDialogOpen(false);
    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete image');
      return;
    }

    toast.success('Image deleted successfully');
    fetchItems();
  };

  if (loading) {
    return <div className="text-center py-12">Loading gallery images...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Gallery Images</h2>
          <p className="text-muted-foreground">Manage your restaurant's gallery</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Gallery Image' : 'Add Gallery Image'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                />
                <Label>Active</Label>
              </div>
              <Button type="submit" className="w-full bg-primary">
                {editingItem ? 'Update Image' : 'Add Image'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border">
          <p className="text-muted-foreground">No gallery images yet. Add your first image!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`card-kerala overflow-hidden ${!item.is_active ? 'opacity-60' : ''}`}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <span className="text-sm text-muted-foreground">{item.category}</span>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
