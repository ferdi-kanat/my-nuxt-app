export interface ProductImage {
    large: string
    thumb: string
  }
  
  export interface ProductColor {
    id: number
    name: string
    image: string
  }
  
  export interface Product {
    id: number
    name: string
    code: string
    image: string
    price: number
    discountedPrice: number
    originalPrice: number
    colors: ProductColor[]
    images: ProductImage[]
    sizes: string[]
  }