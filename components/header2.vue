<template>
    <header class="header">
      <nav class="navbar">
        <div class="logo">
          <NuxtLink to="/">
            <svg width="116" height="22" viewBox="0 0 116 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- SVG logosu burada -->
            </svg>
          </NuxtLink>
        </div>
        <ul class="nav-links">
          <li v-for="link in links" :key="link.name">
            <!-- Erkek linki dropdown içeriyor -->
            <DropdownMenu v-if="link.name === 'Erkek'">
              <template #trigger>
                <NuxtLink :to="link.path" :class="{ highlight: link.highlight }">{{ link.name }}</NuxtLink>
              </template>
            </DropdownMenu>
  
            <!-- Diğer linkler -->
            <template v-else>
              <NuxtLink :to="link.path" :class="{ highlight: link.highlight }">{{ link.name }}</NuxtLink>
            </template>
          </li>
        </ul>
        <div class="search-bar">
          <input type="text" placeholder="Arama yapın" class="search-input" />
        </div>
        <div class="icons">
          <NuxtLink to="/account">
            <i class="fas fa-user"></i>
          </NuxtLink>
          <NuxtLink to="/wishlist">
            <i class="fas fa-heart"></i>
            <span class="badge">0</span>
          </NuxtLink>
          <NuxtLink to="/cart">
            <i class="fas fa-shopping-cart"></i>
            <span class="badge">10</span>
          </NuxtLink>
        </div>
      </nav>
    </header>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import DropdownMenu from '@/components/DropdownMenu.vue';
  
  const links = ref([
    { name: 'Erkek', path: '/erkek' },
    { name: 'Kadın', path: '/kadin' },
    { name: 'Çocuk', path: '/cocuk' },
    { name: 'Ayakkabı', path: '/ayakkabi' },
    { name: 'Aktivite', path: '/aktivite' },
    { name: 'İndirim', path: '/indirim', highlight: true },
    { name: 'Öne Çıkanlar', path: '/one-cikanlar' },
    { name: 'Kış Sezonu', path: '/kis-sezonu', highlight: true },
    { name: 'Outdoor Rehberi', path: '/outdoor-rehberi' },
  ]);
  </script>
  
  <style scoped>
  .header {
    background-color: #fff;
    padding: 1rem 2rem;
    border-bottom: 1px solid #ddd;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo img {
    max-height: 40px;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-links li a {
    text-decoration: none;
    color: #000;
    font-weight: 500;
  }
  
  .nav-links li a.highlight {
    color: #007bff;
    font-weight: bold;
  }
  
  .search-bar {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .search-input {
    width: 50%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  .icons {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .icons a {
    position: relative;
    color: #000;
    font-size: 1.2rem;
  }
  
  .badge {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 0.3rem;
    font-size: 0.8rem;
  }
  </style>
  