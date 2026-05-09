export type Product = {
  id: string
  name: string
  slug: string
  price: number
  original_price?: number
  images: string[]
  sizes: string[]
  category: string
  description: string
  in_stock: boolean
  featured: boolean
  tags: string[]
}

export type CartItem = {
  product: Product
  size: string
  quantity: number
}

export type Order = {
  id?: string
  customer_name: string
  phone: string
  address: string
  city: string
  items: CartItem[]
  total: number
  payment_method: 'cod' | 'card'
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  created_at?: string
}
