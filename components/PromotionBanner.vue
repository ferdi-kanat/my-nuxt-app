<template>
    <div class="promotion-banner">
      <div
        class="banner-item"
        v-for="(banner, index) in banners"
        :key="index"
        :style="{ backgroundColor: banner.backgroundColor }"
      >
        <div class="banner-content">
          <span class="banner-title">
            {{ banner.title }}
          </span>
          <span class="banner-link">
            {{ banner.linkText }} →
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "PromotionBanner",
    data() {
      return {
        banners: [
          {
            title: "Outlet Ürünlerinde %45'e varan İndirim!",
            linkText: "Alışverişe Başla",
            backgroundColor: "#14213d", // Koyu mavi
          },
          {
            title: "Sezon Ürünlerinde Üyelere Özel Sepette %5 İndirim",
            linkText: "Keşfet",
            backgroundColor: "#007BFF", // Mavi
          },
        ],
      };
    },
  });
  </script>
  
  <style scoped>
  .promotion-banner {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 16px 0;
  }
  
  .banner-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-width: 300px;
    max-width: 600px;
    padding: 20px;
    border-radius: 4px;
    color: white;
    font-family: Arial, sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .banner-item:hover {
    transform: translateY(-2px);
  }
  
  .banner-content {
    text-align: center;
  }
  
  .banner-title {
    font-size: 16px;
    font-weight: bold;
  }
  
  .banner-link {
    font-size: 14px;
    font-weight: 300; /* Daha ince yazı stili */
    margin-left: 8px;
    display: inline-block;
  }
  </style>
  