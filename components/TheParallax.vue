<template>
    <div>
      <div class="pa-md gutter-md">
        <div class="row justify-between">
          <div class="parallax-container">
            <a href="https://columbiahikesociety.com.tr/">
              <img src="/images/hike-desktop.webp" alt="Öne Çıkanlar" class="parallax-image" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  .pa-md {
    padding: 1rem;
  }
  
  .gutter-md {
    gap: 1rem;
  }
  
  .row {
    display: flex;
    justify-content: space-between;
  }
  
  .parallax-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px;
  }
  
  .parallax-image {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  </style>