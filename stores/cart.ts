import { defineStore } from 'pinia';
import { db } from '~/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc, writeBatch } from 'firebase/firestore';

// Cart Store: Manages shopping cart state using Pinia and Firebase integration
// Handles cart items, loading states and Firebase sync operations
interface CartItem {
  id: string;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  code: string;
}

export const useCartStore = defineStore('cart', {
  // State: Manages cart items array, loading status and initialization flag
  state: () => ({
    items: [] as CartItem[], // Holds cart items from Firebase
    isLoading: false, // Tracks async operations
    initialized: false // Prevents multiple Firebase fetches
  }),

  actions: {
    // Fetches cart items from Firebase collection
    // Only runs once thanks to initialized flag
    async fetchItems() {
      if (this.initialized) return;
      
      this.isLoading = true;
      try {
        // Firebase query to get all cart items
        const querySnapshot = await getDocs(collection(db, 'cartItems'));
        // Map Firebase docs to CartItem objects
        this.items = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as CartItem[];
        this.initialized = true;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        this.isLoading = false;
      }
    },
    // Adds new item to both Firebase and local Pinia state
    // Omit<CartItem, 'id'> ensures ID is handled by Firebase
    async addItem(item: Omit<CartItem, 'id'>) {
      this.isLoading = true;
      try {
        // Önce Firebase'e ekle
        const docRef = await addDoc(collection(db, 'cartItems'), item);
        
        // Başarılı olursa local state'e ekle
        const newItem = { 
          id: docRef.id, 
          ...item 
        };
        
        // Aynı ürünün zaten sepette olup olmadığını kontrol et
        const existingItem = this.items.find(i => 
          i.code === item.code && 
          i.color === item.color && 
          i.size === item.size
        );
    
        if (existingItem) {
          // Varsa miktarını güncelle
          await this.updateQuantity(existingItem.id, existingItem.quantity + item.quantity);
        } else {
          // Yoksa yeni ekle
          this.items.push(newItem);
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async removeItem(itemId: string) {
      this.isLoading = true;
      try {
        const docRef = doc(db, 'cartItems', itemId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          throw new Error('Ürün bulunamadı');
        }

        await deleteDoc(docRef);
        this.items = this.items.filter(item => item.id !== itemId);
      } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    // Mevcut updateQuantity action'ı Firebase güncellemesi yapmalı
    async updateQuantity(itemId: string, quantity: number) {
      this.isLoading = true;
      try {
        // Önce local state'i güncelliyoruz
        const item = this.items.find(item => item.id === itemId)
        if (item) {
          item.quantity = quantity;
          
          // Firebase'i güncelliyoruz
          const cartItemRef = doc(db, 'cartItems', itemId.toString());
          await updateDoc(cartItemRef, {
            quantity: quantity
          });
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateItemQuantity(itemId: string, quantity: number) {
      this.isLoading = true;
      try {
        const docRef = doc(db, 'cartItems', itemId);
        await updateDoc(docRef, { quantity });
        
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          this.items[itemIndex].quantity = quantity;
        }
      } catch (error) {
        console.error('Error updating item quantity:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async clearCart() {
      this.isLoading = true;
      try {
        const batch = writeBatch(db);
        this.items.forEach(item => {
          const docRef = doc(db, 'cartItems', item.id);
          batch.delete(docRef);
        });
        await batch.commit();
        this.items = [];
      } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  },

  getters: {
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    cartItemsCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0);
    }
  }
});