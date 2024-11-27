<template>
    <div class="carousel-container">
      <div class="carousel" :style="{ transform: `translateX(-${slide * 100}%)` }">
        <div class="carousel-item" v-for="(item, index) in items" :key="index">
          <img :src="item.src" :alt="item.alt" />
        </div>
      </div>
      <div class="controls">
        <button @click="prevSlide">←</button>
        <button @click="nextSlide">→</button>
      </div>
      <div class="navigation">
        <span v-for="(item, index) in items" :key="index" @click="goToSlide(index)" :class="{ active: index === slide }"></span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const slide = ref(0)
  const items = ref([
    { src: '/images/black-desktop.webp', alt: 'Image 1' },
    { src: '/images/ohi-desktop.webp', alt: 'Image 2' },
    { src: '/images/landroumer-desktop.webp', alt: 'Image 3' },
    { src: '/images/arthic-desktop1.webp', alt: 'Image 4' },
    { src: '/images/outlet-desktop.webp', alt: 'Image 5' },
  ])
  
  const prevSlide = () => {
    slide.value = (slide.value - 1 + items.value.length) % items.value.length
  }
  
  const nextSlide = () => {
    slide.value = (slide.value + 1) % items.value.length
  }
  
  const goToSlide = (index) => {
    slide.value = index
  }
  </script>
  
  <style scoped>
  .carousel-container {
    position: relative;
    width: 100%;
    
    margin: auto;
    overflow: hidden;
    background-color: #f1f1f1;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .carousel {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .carousel-item {
    min-width: 100%;
    box-sizing: border-box;
  }
  
  .carousel-item img {
    width: 100%;
    height: 480px;
    object-fit: cover;
  }
  
  .controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
  }
  
  .controls button {
    background-color: black;
    color: white;
    border: none;
    padding: 20px;
    cursor: pointer;
  }
  
  .navigation {
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .navigation span {
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
  }
  
  .navigation .active {
    background-color: white;
  }
  </style>