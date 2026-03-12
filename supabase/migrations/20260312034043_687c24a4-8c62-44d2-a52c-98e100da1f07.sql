
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: Only admins can read user_roles
CREATE POLICY "Admins can read user_roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL DEFAULT '',
  customer_email TEXT NOT NULL DEFAULT '',
  customer_phone TEXT NOT NULL DEFAULT '',
  payment_method TEXT NOT NULL DEFAULT 'pix',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  shipping_address TEXT DEFAULT '',
  tracking_code TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Only admins can read/update orders
CREATE POLICY "Admins can read orders"
ON public.orders FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders"
ON public.orders FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow edge functions (anon) to insert orders
CREATE POLICY "Anyone can insert orders"
ON public.orders FOR INSERT
WITH CHECK (true);

-- Admins can delete orders
CREATE POLICY "Admins can delete orders"
ON public.orders FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
