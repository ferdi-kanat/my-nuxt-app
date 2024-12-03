<template>
    <div class="product-card">
      <div class="image-container" @mouseover="toggleHover" @mouseleave="toggleHover">
        <img :src="isHovered ? product.imageHover : product.image" alt="Product Image" />
      </div>
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <p class="description">{{ product.description }}</p>
      </div>
      <button @click="addToCart" class="add-to-cart">Sepete Ekle</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'ProductCard',
    props: {
      product: {
        type: Object as () => {
          name: string;
          price: number;
          description: string;
          image: string;
          imageHover: string;
        },
        required: true,
      },
    },
    setup() {
      const isHovered = ref(false);
  
      const toggleHover = () => {
        isHovered.value = !isHovered.value;
      };
  
      const addToCart = () => {
        console.log('Product added to cart!');
        alert('Ürün sepete eklendi!');
      };
  
      const formatPrice = (price: number) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
      };
  
      return {
        isHovered,
        toggleHover,
        addToCart,
        formatPrice,
      };
    },
  });
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 16px;
    max-width: 300px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  .product-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  .image-container img {
    width: 100%;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  .image-container img:hover {
    transform: scale(1.05);
  }
  .product-info h3 {
    margin: 12px 0 8px;
    font-size: 18px;
  }
  .product-info .price {
    color: #007BFF;
    font-weight: bold;
  }
  .product-info .description {
    color: #555;
    font-size: 14px;
    margin: 8px 0;
  }
  .add-to-cart {
    background-color: #007BFF;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .add-to-cart:hover {
    background-color: #0056b3;
  }
  </style>
  