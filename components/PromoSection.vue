<template>
    <div class="promo-background">
      <div class="promo-actions">
        <button class="btn login-btn">GİRİŞ YAP</button>
        <button class="btn signup-btn">ÜYE ÖL</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'PromoBackground',
  });
  </script>
  
  <style scoped>
  .promo-background {
  background-image: url('/public/images/Anasayfa_desk.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px;
  position: relative;
}
  
  .promo-actions {
  display: flex;
  gap: 30px;
}
  
  .btn {
  border: none;
  padding: 12px 24px;
  font-size: 10px;
  border-radius: 25px;
  font-family: 'OpenSans', sans-serif;

  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #000;
  font-weight: bold;
}
  
  .btn:hover {
    background: #000;
    color: white;
  }
  </style>