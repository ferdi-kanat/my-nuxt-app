/**
 * @fileoverview Product store implementation using Pinia and Firebase Firestore.
 * This store manages product data and provides functionality to fetch products.
 * 
 * @requires pinia - State management library
 * @requires firebase/firestore - Firebase Firestore for database operations
 * 
 * @typedef {Object} Product - Product type defined in ~/types/product
 * 
 * @state products - Array of products with details like id, name, code, images, prices, colors and sizes
 * @state loading - Boolean flag indicating loading state
 * @state error - String containing error message if any
 * 
 * @actions
 * fetchProductById - Fetches a single product by ID
 * - First checks local state
 * - Falls back to Firebase if not found locally
 * - Returns Product object or null if not found
 * 
 * @example
 * // Using the store
 * const productStore = useProductStore()
 * const product = await productStore.fetchProductById(123)
 * 
 * @firebase
 * Uses Firestore collection 'products' with document IDs matching product IDs
 */
import { defineStore } from 'pinia'
import { db } from '~/firebaseConfig'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import type { Product } from '~/types/product'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: "CSC NATURE AND BACK™ ERKEK SWEATSHIRT",
        code: "CS0175-023",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/CS0329_756-0-240924074019781.jpg",
        discountedPrice: 719.40,
        originalPrice: 1199,
        colors: [
          {
            id: 1,
            name: "Gri",
            image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/gri_842-231107193110579.jpeg"
          },
          {
            id: 2,
            name: "Bordo", 
            image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/bordo_842-231107193110579.jpeg"
          },
          {
            id: 3,
            name: "Yeşil",
            image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/yesil_1274-231107194205159.jpeg"
          },
          {
            id: 4,
            name: "Lacivert",
            image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/lacivert_1295-231107194226557.jpeg" 
          },
          {
            id: 5,
            name: "Koyu Gri",
            image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/koyu-gri_853-231107193114393.jpeg"
          }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL']
      },
      {
        id: 2,
        name: "Youth Drainmaker XTR Çocuk Ayakkabı Siyah",
        code: "BY1156_010",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/BY1156_010-0-240924071924960.jpg",
        discountedPrice: 2914.95,
  originalPrice: 5299.90,
        colors: [
          {
            id: 1,
            name: "Siyah",
            image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/siyah_823-231107193058852.jpeg"
          }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL']
      },
      {
        id: 3,
        name: "Alpine Chill Zero Erkek Kısa Kollu T-Shirt Yeşil",
        code: "AO3561_349",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/AO3561_349-0-240927071057988.jpg",
        discountedPrice: 1649.95,
  originalPrice: 2999.90,
        colors: [
          {
            id: 1,
            name: "PFG Gri",
            image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/pfg-gri_1256-231107194153565.jpeg"
          },
          {
              id: 2,
              name: "Lacivert",
              image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/lacivert_851-231107193113920.jpeg"
            },
            {
              id: 3,
              name: "Beyaz",
              image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/beyaz_1021-231107193126654.jpeg"
            },
            {
              id: 4,
              name: "Siyah",
              image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/siyah_823-231107193058852.jpeg"
            },
            {
              id: 5,
              name: "Yeşil",
              image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/yesil_1704-240215080120005.jpeg"
            }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL']
      },
      {
        id: 4,
        name: "Columbia Hike Crew Erkek Kısa Kollu T-Shirt Siyah",
        code: "AO1419_011",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/AO1419_011-0-240927070949534.jpg",
        discountedPrice: 989.95,
  originalPrice: 1799.90,
        colors: [
          {
            id: 1,
            name: "Lacivert",
            image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/lacivert_851-231107193113920.jpeg"
          },
            {
              id: 2,
              name: "Bordo",
              image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/bordo_842-231107193110579.jpeg"
            },
            {
              id: 3,
              name: "Yeşil",
              image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/yesil_1274-231107194205159.jpeg"
            },
            {
              id: 4,
              name: "Lacivert",
              image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/lacivert_1295-231107194226557.jpeg"
            },
            {
              id: 5,
              name: "Koyu Gri",
              image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/koyu-gri_853-231107193114393.jpeg"
            }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL']
      },
      // Diğer ürünler buraya eklenecek
    ] as Product[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchProductById(id: number): Promise<Product | null> {
      try {
        const product = this.products.find(p => p.id === id)
        if (product) return product
        
        const docRef = doc(db, 'products', id.toString())
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          return { id: parseInt(docSnap.id), ...docSnap.data() } as Product
        }
        return null
      } catch (error) {
        console.error('Error fetching product:', error)
        return null
      }
    }
  }
})