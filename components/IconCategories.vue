<template>
  <div class="icon-categories">
    <div class="category" v-for="(category, index) in categories" :key="index">
      <a :href="category.url" target="_blank" rel="noopener noreferrer">
        <div class="icon-wrapper">
          <img :src="category.icon" :alt="category.label" />
        </div>
        <p class="category-label">{{ category.label }}</p>
      </a>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IconCategories',
  setup() {
    const categories = [
      { label: 'Sana Özel', icon:'/icons/sanaozel.webp', url: 'https://www.columbia.com.tr/size-ozel' },
      { label: 'Peşin Fiyatına 4 Taksit', icon: '/icons/pesinfiyatına.webp', url: 'https://www.columbia.com.tr/tum-urunler' },
      { label: 'Yeni Gelenler', icon: '/icons/yeni.webp', url: 'https://www.columbia.com.tr/kis-sezonu' },
      { label: 'Ayakkabı', icon: '/icons/ayakkabı.webp', url: 'https://www.columbia.com.tr/ayakkabi' },
      { label: 'Mont', icon: '/icons/mont.webp', url: 'https://www.columbia.com.tr/tum-urunler?defaultMinPrice=7424&pageIndex=0&defaultMaxPrice=40000&lastSelectedFilter=%C3%9Cr%C3%BCn%20Cinsi&slug=tum-urunler&%C3%9Cr%C3%BCn%20Cinsi=3894%2C91%2C241%2C223%2C85%2C2' },
      { label: 'Bot', icon: '/icons/bot.webp', url: 'https://www.columbia.com.tr/tum-urunler?defaultMinPrice=3684&pageIndex=0&defaultMaxPrice=17000&lastSelectedFilter=%C3%9Cr%C3%BCn%20Cinsi&slug=tum-urunler&%C3%9Cr%C3%BCn%20Cinsi=10400%2C102%2C316' },
      { label: 'Polar', icon: '/icons/polar.webp', url: 'https://www.columbia.com.tr/tum-urunler?defaultMinPrice=384&pageIndex=0&defaultMaxPrice=40000&lastSelectedFilter=%C3%9Cr%C3%BCn%20Cinsi&slug=tum-urunler&%C3%9Cr%C3%BCn%20Cinsi=50' },
      { label: 'Yağmurluk', icon: '/icons/yagmurluk.webp', url: 'https://www.columbia.com.tr/yagmurluk' },
      { label: 'Omni Max', icon: '/icons/omnimax.webp', url: 'https://www.columbia.com.tr/omni-max' },
      { label: 'Gömlek', icon: '/icons/gomlek.webp', url: 'https://www.columbia.com.tr/gomlek' },
    ];

    return {
      categories,
    };
  },
});
</script>

<style scoped>
.icon-categories {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin: 20px 0;
}

.category {
  text-align: center;
  width: 80px;
}

.category a {
  text-decoration: none;
  color: inherit;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  background-color: #00a8e8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.icon-wrapper img {
  width: 70px;
  height: 70px;
}

.category-label {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}
</style>
