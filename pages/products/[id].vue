<template>
  <div>
    <TheHeader />
    <div class="product-container">
      <div v-if="loading" class="loading">
        Loading...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="grid-container">
        <!-- Product Image Slider Section -->
        <div class="product-slider-section">
          <div class="slider-container">
            <!-- Navigation Arrows -->
            <div class="nav-arrow nav-prev" @click="previousSlide">
              <svg viewBox="0 0 24 24">
          <path fill="#A6A6A6" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </svg>
            </div>

            <!-- Main Image -->
            <div class="main-image-container">
              <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(image, index) in productImages" :key="index" class="slide">
            <figure class="image-figure">
              <picture>
                <source :srcset="image.large">
                <img :src="image.large" :alt="product?.name" class="product-image">
              </picture>
            </figure>
          </div>
              </div>
            </div>

            <!-- Navigation Arrows -->
            <div class="nav-arrow nav-next" @click="nextSlide">
              <svg viewBox="0 0 24 24">
          <path fill="#000000" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Product Details Section -->
        <div class="product-details-section">
          <div class="product-header">
            <h1 class="product-title">{{ product?.name }}</h1>
          </div>

          <!-- Price Section -->
          <div class="price-section">
            <div class="price-container">
              <span class="discounted-price">{{ formatPrice(product?.discountedPrice ?? 0) }} TL</span>
              <span class="original-price">{{ formatPrice(product?.originalPrice ?? 0) }} TL</span>
            </div>
            <div class="discount-badge">
              <p>İndirim %{{ discountPercentage }}</p>
            </div>
          </div>

          <!-- Color Selection -->
          <div class="color-section">
            <div class="color-label">
              <p>Renk: {{ selectedColor?.name }}</p>
            </div>
            <div class="color-options">
              <div v-for="color in product?.colors" 
                   :key="color.id" 
                   :class="['color-option', { active: color.id === selectedColor?.id }]"
                   @click="selectColor(color)">
                <img :src="color.image" :alt="color.name" />
              </div>
            </div>
          </div>

          <!-- Size Selection -->
          <div class="size-section">
            <div class="size-options">
              <button v-for="size in sizes" 
                      :key="size"
                      :class="['size-btn', { active: size === selectedSize }]"
                      @click="selectSize(size)">
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Add to Cart Section -->
          <div class="cart-section">
            <button class="add-to-cart-btn" @click="addToCart">Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product, ProductColor, ProductImage } from '~/types/product'
import { useCartStore } from '~/stores/cart'


const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

// Typed reactive refs
const product = ref<Product | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const currentSlide = ref<number>(0)
const selectedSize = ref<string>('M')
const selectedColor = ref<ProductColor | null>(null)
const sizes = ref<string[]>(['XS', 'S', 'M', 'L', 'XL', '2XL'])
const discountPercentage = ref<number>(45)
const productImages = ref<ProductImage[]>([])

// Type-safe methods
const selectColor = (color: ProductColor): void => {
  selectedColor.value = color
}

const selectSize = (size: string): void => {
  selectedSize.value = size
}

const addToCart = async (): Promise<void> => {
  if (!product.value || !selectedColor.value) return;
  
  try {
    const productToAdd = {
      name: product.value.name,
      image: productImages.value[0]?.large || '',
      color: selectedColor.value.name, 
      size: selectedSize.value,
      code: product.value.code || '',
      price: product.value.discountedPrice,
      quantity: 1
    };
    
    // Firebase store güncellemesi
    await cartStore.addItem(productToAdd);
    // Başarılı ekleme sonrası sepet sayfasına yönlendirme
    navigateTo('/cart');
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

const previousSlide = (): void => {
  currentSlide.value = (currentSlide.value - 1 + productImages.value.length) % productImages.value.length
}

const nextSlide = (): void => {
  currentSlide.value = (currentSlide.value + 1) % productImages.value.length
}

const setSlide = (index: number): void => {
  currentSlide.value = index
}

const formatPrice = (price: number): string => {
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Fetch product data with type safety
onMounted(async () => {
  try {
    const productId = parseInt(route.params.id as string)
    const productData = await productStore.fetchProductById(productId)
    
    if (productData) {
      product.value = productData
      selectedColor.value = productData.colors[0]
      
      // Ana ürün resmini ve renk küçük resmini kullanarak resim array'ini oluştur
      productImages.value = [{
        large: productData.image,
        thumb: selectedColor.value.image
      }]

      // Eğer ürünün ek resimleri varsa onları da ekle
      if (productData.images?.length) {
        productImages.value = [...productImages.value, ...productData.images]
      }
    }
  } catch (err) {
    error.value = 'Ürün yüklenirken bir hata oluştu'
  } finally {
    loading.value = false
  }
})
</script>

<!-- Rest of your template remains the same -->

<style scoped>
.product-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.product-slider-section {
  position: relative;
  width: 100%;
}

.slider-container {
  position: relative;
  overflow: hidden;
}

.nav-arrow {
  display: flex;
  background: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
}

.nav-prev {
  left: -80px;
}

.nav-next {
  right: -80px;
}

.main-image-container {
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.3s ease;
}

.slide {
  min-width: 100%;
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.thumbnail-container {
  margin-top: 20px;
}

.thumbnail-list {
  display: flex;
  justify-content: center;
  gap: 35px;
  padding: 0;
  list-style: none;
}

.thumbnail-image {
  width: 45px;
  aspect-ratio: 262/275;
  height: auto;
  border: none;
  margin-top: 10px;
  cursor: pointer;
}

.active .thumbnail-image {
  border: 1px solid black;
}

.product-details-section {
  padding: 1rem;
}

.product-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.share-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
}

.share-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.discounted-price {
  font-size: 1.25rem;
  font-weight: bold;
}

.original-price {
  text-decoration: line-through;
  color: #666;
}

.color-section,
.size-section {
  margin: 1.5rem 0;
}

.color-options,
.size-options {
  display: flex;
  gap: 0.5rem;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.color-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.color-option.active {
  border-color: #000;
}

.size-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: none;
  cursor: pointer;
}

.size-btn.active {
  border-color: #000;
  background: #000;
  color: #fff;
}

.add-to-cart-btn {
  width: 100%;
  padding: 1rem;
  background: #006394;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 1rem 0;
}

.price-alert-btn,
.store-stock-btn {
  width: 100%;
  padding: 0.75rem;
  background: none;
  border: 1px solid #000;
  cursor: pointer;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.store-stock-btn {
  background: white;
  color: #000;
}

.member-discount {
  color: #0085CA;
}

.price-container {
  color: red;
}

.discount-badge {
  color: #900;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>