import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Flame, Upload, X } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  spice_level: string | null;
  category: string;
  image_url: string | null;
  is_best_seller: boolean | null;
  display_order: number | null;
  is_active: boolean | null;
}

const categories = ['Non-Veg', 'Seafood', 'Rice', 'Breakfast', 'Vegetarian', 'Desserts'];
const spiceLevels = ['Mild', 'Medium', 'Spicy'];

const MenuManager = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    spice_level: 'Medium',
    category: 'Non-Veg',
    image_url: '',
    is_best_seller: false,
    is_active: true,
  });

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch menu items');
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
      description: '',
      spice_level: 'Medium',
      category: 'Non-Veg',
      image_url: '',
      is_best_seller: false,
      is_active: true,
    });
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      toast.error('Failed to upload image');
      return null;
    }

    const { data } = supabase.storage
      .from('menu-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image_url: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      spice_level: item.spice_level || 'Medium',
      category: item.category,
      image_url: item.image_url || '',
      is_best_seller: item.is_best_seller || false,
      is_active: item.is_active ?? true,
    });
    setImagePreview(item.image_url || null);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      toast.error('Please fill in required fields');
      return;
    }

    setUploading(true);
    let imageUrl = formData.image_url;

    // Upload new image if selected
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        setUploading(false);
        return;
      }
    }

    const submitData = { ...formData, image_url: imageUrl || null };

    if (editingItem) {
      const { error } = await supabase
        .from('menu_items')
        .update(submitData)
        .eq('id', editingItem.id);

      if (error) {
        toast.error('Failed to update item');
        setUploading(false);
        return;
      }
      toast.success('Item updated successfully');
    } else {
      const { error } = await supabase
        .from('menu_items')
        .insert([{ ...submitData, display_order: items.length }]);

      if (error) {
        toast.error('Failed to create item');
        setUploading(false);
        return;
      }
      toast.success('Item created successfully');
    }

    setUploading(false);
    setIsDialogOpen(false);
    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete item');
      return;
    }

    toast.success('Item deleted successfully');
    fetchItems();
  };

  if (loading) {
    return <div className="text-center py-12">Loading menu items...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Menu Items</h2>
          <p className="text-muted-foreground">Manage your restaurant's menu</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
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
                <div className="space-y-2">
                  <Label>Spice Level</Label>
                  <Select value={formData.spice_level} onValueChange={(v) => setFormData({ ...formData, spice_level: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {spiceLevels.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                {imagePreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={removeImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-32 border-dashed flex flex-col gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload image</span>
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_best_seller}
                    onCheckedChange={(v) => setFormData({ ...formData, is_best_seller: v })}
                  />
                  <Label>Best Seller</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary" disabled={uploading}>
                {uploading ? 'Uploading...' : editingItem ? 'Update Item' : 'Add Item'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border">
          <p className="text-muted-foreground">No menu items yet. Add your first item!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`card-kerala p-4 flex items-center gap-4 ${!item.is_active ? 'opacity-60' : ''}`}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  {item.is_best_seller && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      Best Seller
                    </span>
                  )}
                  {!item.is_active && (
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {item.spice_level}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuManager;
