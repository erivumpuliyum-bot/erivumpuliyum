-- Add is_vegetarian column to menu_items table
ALTER TABLE public.menu_items 
ADD COLUMN IF NOT EXISTS is_vegetarian boolean DEFAULT false;