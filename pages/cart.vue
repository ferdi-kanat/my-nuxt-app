<template>
  <div>
    <TheHeader />
    <div class="cart-page">
      <div class="cart-container">
        <div class="cart-content">
          <div v-if="loading" class="loading">
            <p>Yükleniyor...</p>
          </div>
          <div v-else>
            <div v-if="cartItems.length === 0" class="empty-cart">
              <p>Sepetinizde ürün bulunmamaktadır.</p>
            </div>
            <div v-else class="cart-details">
              <div class="cart-table">
                <table aria-label="basket table">
                  <thead>
                    <tr>
                      <th>Ürün ({{ cartItems.length }})</th>
                      <th></th>
                      <th>Fiyat</th>
                      <th>Adet</th>
                      <th>Toplam</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cartItems" :key="item.id">
                      <td>
                        <a :href="`/products/${item.id}`">
                          <img :src="item.image" :alt="item.name" class="cart-item-image" />
                        </a>
                      </td>
                      <td>
                        <div class="cart-item-details">
                          <a :href="`/products/${item.id}`">
                            <h2>{{ item.name }}</h2>
                          </a>
                          <p>Renk: {{ item.color }}</p>
                          <p>Beden: {{ item.size }}</p>
                          <p>Ürün Kodu: {{ item.code }}</p>
                          <div class="cart-item-actions">
                            <button @click="editItem(item.id)">Düzenle</button>
                            <button @click="addToFavorites(item.id)">Favorilere Ekle</button>
                            <button 
  @click="removeFromCart(item.id)"
  class="remove-button"
  :disabled="loading"
>
  {{ loading ? 'Siliniyor...' : 'Sil' }}
</button>
                          </div>
                        </div>
                      </td>
                      <td>{{ formatPrice(item.price) }} TL</td>
                      <td>
                        <div class="quantity-controls">
                          <button @click="decreaseQuantity(item.id)">-</button>
                          <span>{{ item.quantity }}</span>
                          <button @click="increaseQuantity(item.id)">+</button>
                        </div>
                      </td>
                      <td>{{ formatPrice(item.price * item.quantity) }} TL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="summary-section">
        <div class="summary-content">
          <p>Kupon veya promosyon kodu uygula</p>
          <div class="summary-line">
            <span>Ara Toplam</span>
            <span>{{ formatPrice(subtotal) }} TL</span>
          </div>
          <div class="summary-line">
            <span>Kargo Tutarı</span>
            <span>Ücretsiz</span>
          </div>
          <div class="summary-line total">
            <span>Toplam Tutar</span>
            <span>{{ formatPrice(total) }} TL</span>
          </div>
          <button class="confirm-button">Sepeti Onayla</button>
          <button class="continue-button">Üye Olmadan Devam Et</button>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const cartItems = ref(cartStore.items);
const loading = ref(true);

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const total = computed(() => {
  return subtotal.value; // Add any additional calculations for total here
});

const formatPrice = (price: number) => {
  return price.toFixed(2).replace('.', ',');
};

const removeFromCart = async (itemId: string) => {
  try {
    // Loading state'i aktif et
    loading.value = true;
    
    // Store'dan silme işlemini çağır
    await cartStore.removeItem(itemId);
    
    // Local state'i güncelle
    cartItems.value = cartItems.value.filter(item => item.id !== itemId);
    
  } catch (error) {
    console.error('Error removing item:', error);
    // Kullanıcıya hata mesajı göster
    alert('Ürün silinirken bir hata oluştu');
  } finally {
    // Loading state'i kapat
    loading.value = false;
  }
};

const editItem = (itemId: string) => {
  // Implement edit item functionality
};

const addToFavorites = (itemId: string) => {
  // Implement add to favorites functionality
};

// pages/cart.vue
const decreaseQuantity = async (itemId: string) => {
  const item = cartItems.value.find(item => item.id === itemId);
  if (item && item.quantity > 1) {
    await cartStore.updateQuantity(itemId, item.quantity - 1);
  }
};

const increaseQuantity = async (itemId: string) => {
  const item = cartItems.value.find(item => item.id === itemId);
  if (item) {
    await cartStore.updateQuantity(itemId, item.quantity + 1);
  }
};

const addItemToCart = (item: { name: string, image: string, color: string, size: string, price: number, quantity: number, code: string }) => {
  cartStore.addItem(item);
};

onMounted(async () => {
  loading.value = true;
  try {
    await cartStore.fetchItems(); // Sepeti yeniden yükle
    cartItems.value = cartStore.items; // Store'dan verileri al
  } catch (error) {
    console.error('Error loading cart:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.cart-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin: 2rem auto;
  padding: 1rem;
  max-width: 1200px;
}
.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #666;
}
.cart-container {
  flex: 2;
}

.cart-content {
  display: flex;
  width: 100%;
  gap: 2rem;
}

.cart-table {
  flex: 2;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  font-size: 0.9rem;
  color: #333;
}

.cart-item-image {
  width: 80px;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cart-item-details h2 {
  margin: 0;
  font-size: 1rem;
  color: #007bff;
}

.cart-item-details p {
  margin: 0;
  font-size: 0.85rem;
  color: #555;
}

.cart-item-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cart-item-actions button {
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85rem;
}

.cart-item-actions button:hover {
  background-color: #f0f0f0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  padding: 0.5rem;
  border: 1px solid #ddd;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-controls button:hover {
  background-color: #f0f0f0;
}

.summary-section {
  flex: 0 0 300px; /* Sabit genişlik */
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
}

.summary-content {
  position: sticky;
  top: 1rem;
  margin: 0 auto;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.summary-line.total {
  font-weight: bold;
  font-size: 1.2rem;
}

.confirm-button,
.continue-button {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.confirm-button {
  background-color: #007bff;
  color: #fff;
}

.continue-button {
  background-color: #6c757d;
  color: #fff;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.continue-button:hover {
  background-color: #5a6268;
}
.remove-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
