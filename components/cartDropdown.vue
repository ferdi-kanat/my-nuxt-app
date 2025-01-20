<template>
  <div class="cart-dropdown">
    <button class="cart-button" @click="toggleDropdown" ref="cartButton">
      <span class="cart-icon">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 4H12C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4H2C0.9 4 0 4.9 0 6V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6C16 4.9 15.1 4 14 4ZM8 2C9.1 2 10 2.9 10 4H6C6 2.9 6.9 2 8 2ZM14 18H2V6H4V8C4 8.55 4.45 9 5 9C5.55 9 6 8.55 6 8V6H10V8C10 8.55 10.45 9 11 9C11.55 9 12 8.55 12 8V6H14V18Z" 
            fill="currentColor"/>
        </svg>
      </span>
      <span class="cart-count">{{ cartItemCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown-content">
      <div v-if="!cartItems.length" class="empty-cart">
        <p>Sepetinizde ürün bulunmamaktadır.</p>
      </div>
      <div v-else class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="item-image">
          <div class="item-details">
            <h4>{{ item.name }}</h4>
            <p class="item-color">{{ item.color }}</p>
            <p class="item-size">Beden: {{ item.size }}</p>
            <p class="item-price">{{ formatPrice(item.price) }} TL</p>
          </div>
        </div>
        <div class="cart-footer">
          <div class="total">
            <span>Toplam:</span>
            <span>{{ formatPrice(total) }} TL</span>
          </div>
          <NuxtLink to="/cart" class="checkout-button">
            Sepete Git
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const isOpen = ref(false);
const cartButton = ref(null);

const cartItems = computed(() => cartStore.items);
const cartItemCount = computed(() => cartItems.value.length);
const total = computed(() => 
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const formatPrice = (price) => {
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Click outside to close
const handleClickOutside = (event) => {
  if (cartButton.value && !cartButton.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.cart-dropdown {
  position: relative;
  display: inline-block;
}

.cart-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
}

.cart-count {
  position: relative; /* Change from absolute to relative */
  background-color: white;
  color: black;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  min-width: 16px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  width: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
  padding: 16px;
}

.empty-cart {
  text-align: center;
  padding: 20px;
  color: #666;
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 12px;
}

.item-details h4 {
  margin: 0 0 4px;
  font-size: 14px;
}

.item-color, .item-size, .item-price {
  margin: 2px 0;
  font-size: 12px;
  color: #666;
}

.cart-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-weight: bold;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 12px;
  background: #000;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.checkout-button:hover {
  background: #333;
}
</style>