export interface Product {
  _id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  stock?: number
  unit?: string          // e.g. "kg", "crate", "piece"
  vendorName?: string
  location?: string
  isFeatured?: boolean
  createdAt?: string
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface CartItem {
  product: Product
  quantity: number
}