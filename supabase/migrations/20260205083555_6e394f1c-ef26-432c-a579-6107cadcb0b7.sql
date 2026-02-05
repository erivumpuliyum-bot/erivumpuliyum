-- Update the trigger function to assign admin role to all new signups
-- Since signup is protected by a code, anyone who signs up should be an admin
CREATE OR REPLACE FUNCTION public.assign_first_user_admin()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- All users who sign up get admin role (signup is protected by code)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'admin');
  
  RETURN NEW;
END;
$function$;