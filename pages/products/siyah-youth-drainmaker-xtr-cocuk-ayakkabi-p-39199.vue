<template>
  <div>
    <TheHeader />
    <div class="product-container">
      <div class="grid-container">
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
                      <img :src="image.large" :alt="product.name" class="product-image">
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

            <!-- Thumbnails -->
            <div class="thumbnail-container">
              <ul class="thumbnail-list">
                <li v-for="(image, index) in productImages" 
                    :key="index" 
                    :class="{ active: currentSlide === index }"
                    @click="setSlide(index)">
                  <img :src="image.thumb" 
                       :alt="product.name" 
                       class="thumbnail-image">
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right side - Product Details Section -->
        <div class="product-details-section">
          <!-- Product Title and Share -->
          <div class="product-header">
            <h1 class="product-title">{{ product.name }}</h1>
          </div>
          <!-- Price Section -->
          <div class="price-section">
            <div class="price-container">
              <span class="discounted-price">{{ formatPrice(product.discountedPrice) }} TL</span>
              <span class="original-price">{{ formatPrice(product.originalPrice) }} TL</span>
            </div>
            <div class="discount-badge">
              <p>İndirim %{{ discountPercentage }}</p>
            </div>
          </div>

          <!-- Member Discount Info -->
          <div class="member-discount">
            <p>Columbia Dünyası Üyelerine Sepette Ek %10 İndirim</p>
          </div>

          <!-- Color Selection -->
          <div class="color-section">
            <div class="color-label">
              <p>Renk: {{ selectedColor.name }}</p>
            </div>
            <div class="color-options">
              <div v-for="color in product.colors" 
                   :key="color.id" 
                   :class="['color-option', { active: color.id === selectedColor.id }]"
                   @click="selectColor(color)">
                <img :src="color.image" :alt="color.name" />
              </div>
            </div>
          </div>

          <!-- Size Selection -->
          <div class="size-section">
            <div class="size-header">
              <p>Beden:</p>
              
            </div>
            
            <div class="size-options">
              <button v-for="size in sizes" 
                      :key="size"
                      :class="['size-btn', { active: size === selectedSize }]"
                      @click="selectSize(size)">
                {{ size }}
              </button>
            </div>
            <div class="size-guide">
              <img src="/icons/ruler.PNG" alt="Size guide" />
              <a href="#">Beden Tablosu</a>
            </div>
          </div>

          <!-- Add to Cart Section -->
          <div class="cart-section">
            <div class="cart-notification">
              <p>Bu ürün {{ cartCount }} kişinin sepetinde!</p>
            </div>
            <button class="add-to-cart-btn" @click="addToCart">Sepete Ekle</button>
            <button class="price-alert-btn">Fiyatı Düşünce Haber Ver</button>
          </div>

          <!-- Store Stock Check -->
          <div class="store-stock">
            <button class="store-stock-btn">
                <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
                </svg>
              <span>Mağaza Stoklarını Görüntüle</span>
            </button>
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
const currentSlide = ref(0)
const product = ref({
  id: 39199,
  name: "Youth Drainmaker XTR Çocuk Ayakkabı Siyah",
  image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/BY1156_010-0-240924071924960.jpg",
  colors: [
    {
      id: 1,
      name: "Siyah",
      image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/siyah_823-231107193058852.jpeg"
    }
  ],
  discountedPrice: 2914.95,
  originalPrice: 5299.90,
  discount: true
})
const productImages = ref([
  { large: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/BY1156_010-0-240924071924960.jpg", thumb: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/siyah_823-231107193058852.jpeg" }
])
const discountPercentage = 45
const selectedSize = ref('M')
const stockCount = ref(5)
const cartCount = ref(34)

const selectedColor = ref(product.value.colors[0])

const sizes = ref(['XS', 'S', 'M', 'L', 'XL', '2XL'])

const selectSize = (size: string) => {
  selectedSize.value = size
}

const selectColor = (color: { id: number, name: string, image: string }) => {
  selectedColor.value = color
}

const addToCart = () => {
  const productToAdd = {
    id: Date.now(), // Benzersiz bir ID
    name: product.value.name,
    image: productImages.value[0].large,
    color: selectedColor.value.name,
    size: selectedSize.value,
    code: 'BY1156_010', // Ürün kodunu dinamik olarak alabilirsiniz
    price: product.value.discountedPrice, // Fiyatı dinamik olarak alabilirsiniz
    quantity: 1
  }
  
  cartStore.addItem(productToAdd)
  navigateTo('/cart')
}

const previousSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + productImages.value.length) % productImages.value.length
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % productImages.value.length
}

const setSlide = (index: number) => {
  currentSlide.value = index
}

const formatPrice = (price: number) => {
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

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