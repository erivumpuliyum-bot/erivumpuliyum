-- Drop existing restrictive policy for user_roles insert
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Create policy to allow authenticated users to insert their own role (with admin key validation in app)
CREATE POLICY "Users can insert their own role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Admins can manage all roles (update/delete)
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));