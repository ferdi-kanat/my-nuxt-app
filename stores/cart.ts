import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Array<{ id: number, name: string, image: string, color: string, size: string, price: number, quantity: number }>
  }),
  actions: {
    addItem(item: { id: number, name: string, image: string, color: string, size: string, price: number, quantity: number }) {
      const existingItem = this.items.find(i => i.id === item.id && i.color === item.color && i.size === item.size)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push(item)
      }
    },
    removeItem(itemId: number) {
      this.items = this.items.filter(item => item.id !== itemId)
    },
    clearCart() {
      this.items = []
    },

    updateQuantity(itemId: number, quantity: number) {

      const item = this.items.find(item => item.id === itemId)

      if (item) {

        item.quantity = quantity

      }

    }
  }
})
