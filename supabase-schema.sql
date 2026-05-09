-- Run this in your Supabase SQL editor

-- Products table
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  price integer not null,
  original_price integer,
  images text[] default '{}',
  sizes text[] default '{}',
  category text not null,
  description text,
  in_stock boolean default true,
  featured boolean default false,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc', now())
);

-- Orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  items jsonb not null,
  total integer not null,
  payment_method text default 'cod',
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable Row Level Security
alter table products enable row level security;
alter table orders enable row level security;

-- Allow anyone to read products
create policy "Products are viewable by all"
  on products for select using (true);

-- Allow anyone to insert orders (customers)
create policy "Anyone can place orders"
  on orders for insert with check (true);

-- Seed some sample products
insert into products (name, slug, price, original_price, images, sizes, category, description, in_stock, featured, tags)
values
  ('Linen Oversized Shirt', 'linen-oversized-shirt', 4500, 5500,
   array['https://images.unsplash.com/photo-1594938298603-c8148c4b4c3e?w=800'],
   array['XS','S','M','L','XL'], 'tops',
   'Relaxed fit linen shirt. Perfect for the warm Sri Lankan climate.', true, true,
   array['linen','oversized']),

  ('Wide Leg Trousers', 'wide-leg-trousers', 5800, null,
   array['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800'],
   array['S','M','L','XL'], 'bottoms',
   'High-waisted wide leg trousers. Tailored but relaxed.', true, true,
   array['trousers','minimal']);
