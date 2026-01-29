-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles (only admins can view/manage roles)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create menu_items table
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    spice_level TEXT CHECK (spice_level IN ('Mild', 'Medium', 'Spicy')) DEFAULT 'Medium',
    category TEXT NOT NULL,
    image_url TEXT,
    is_best_seller BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on menu_items
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Menu items are publicly readable
CREATE POLICY "Menu items are publicly readable"
ON public.menu_items
FOR SELECT
USING (true);

-- Only admins can manage menu items
CREATE POLICY "Admins can manage menu items"
ON public.menu_items
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create gallery_images table
CREATE TABLE public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'Food',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Gallery images are publicly readable
CREATE POLICY "Gallery images are publicly readable"
ON public.gallery_images
FOR SELECT
USING (true);

-- Only admins can manage gallery images
CREATE POLICY "Admins can manage gallery images"
ON public.gallery_images
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create locations table
CREATE TABLE public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    hours TEXT NOT NULL,
    days_open TEXT DEFAULT 'Monday – Sunday',
    maps_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on locations
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Locations are publicly readable
CREATE POLICY "Locations are publicly readable"
ON public.locations
FOR SELECT
USING (true);

-- Only admins can manage locations
CREATE POLICY "Admins can manage locations"
ON public.locations
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON public.menu_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
    BEFORE UPDATE ON public.gallery_images
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON public.locations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();