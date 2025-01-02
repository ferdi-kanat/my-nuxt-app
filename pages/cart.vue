<template>
  <div>
    <TheHeader />
    <div class="cart-container">
      <h1>Sepetim</h1>
      <div v-if="cartItems.length === 0">
        <p>Sepetinizde ürün bulunmamaktadır.</p>
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item-image" />
          <div class="cart-item-details">
            <h2>{{ item.name }}</h2>
            <p>Renk: {{ item.color }}</p>
            <p>Beden: {{ item.size }}</p>
            <p>Fiyat: {{ formatPrice(item.price) }} TL</p>
            <p>Adet: {{ item.quantity }}</p>
            <button @click="removeFromCart(item.id)">Kaldır</button>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const cartItems = ref(cartStore.items)

const removeFromCart = (itemId: number) => {
  cartStore.removeItem(itemId)
}

const formatPrice = (price: number) => {
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.cart-item-image {
  width: 100px;
  height: auto;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h2 {
  margin: 0;
  font-size: 1.25rem;
}

.cart-item-details p {
  margin: 5px 0;
}

.cart-item-details button {
  padding: 0.5rem 1rem;
  background: #ff0000;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>