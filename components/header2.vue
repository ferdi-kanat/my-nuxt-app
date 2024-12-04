<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">
        <NuxtLink to="/">
          <!-- Logo -->
          <svg width="116" height="22" viewBox="0 0 116 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="..." fill="#007AB8"></path></svg>
        </NuxtLink>
      </div>
      <ul class="nav-links">
        <!-- Erkek Dropdown Menu -->
        <li class="dropdown" @mouseover="showDropdown" @mouseleave="hideDropdown">
          <NuxtLink :to="links[0].path" :class="{ highlight: links[0].highlight }">{{ links[0].name }}</NuxtLink>
          <div v-if="isDropdownVisible" class="dropdown-menu">
            <div class="dropdown-section">
              <h3>Yeni Gelenler</h3>
              <img src="/path/to/image.jpg" alt="Yeni Gelenler" class="menu-image" />
            </div>
            <div class="dropdown-section">
              <h3>Tekstil</h3>
              <ul>
                <li v-for="item in textileItems" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="dropdown-section">
              <h3>Ayakkabı</h3>
              <ul>
                <li v-for="item in shoeItems" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="dropdown-section">
              <h3>Aksesuar</h3>
              <ul>
                <li v-for="item in accessoryItems" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="dropdown-section">
              <h3>Ekipman</h3>
              <ul>
                <li v-for="item in equipmentItems" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </li>

        <!-- Other Links -->
        <li v-for="(link, index) in links.slice(1)" :key="link.name">
          <NuxtLink :to="link.path" :class="{ highlight: link.highlight }">{{ link.name }}</NuxtLink>
        </li>
      </ul>
      <div class="search-bar">
        <input type="text" placeholder="Arama yapın" class="search-input" />
      </div>
      <div class="icons">
        <NuxtLink to="/account"><i class="fas fa-user"></i></NuxtLink>
        <NuxtLink to="/wishlist">
          <i class="fas fa-heart"></i><span class="badge">0</span>
        </NuxtLink>
        <NuxtLink to="/cart">
          <i class="fas fa-shopping-cart"></i><span class="badge">10</span>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Navigation links
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

// Dropdown data
const isDropdownVisible = ref(false);
const textileItems = ref(["Mont", "Polar Üst", "Yağmurluk", "Pantolon", "Gömlek", "Sweatshirt", "Yelek", "Tümünü Gör"]);
const shoeItems = ref(["Ayakkabı", "Bot ve Çizme", "Sandalet", "Terlik", "Tümünü Gör"]);
const accessoryItems = ref(["Şapka", "Eldiven", "Boyunluk", "Bere", "Çorap", "Tümünü Gör"]);
const equipmentItems = ref(["Çanta", "Tümünü Gör"]);

// Show/Hide Dropdown
const showDropdown = () => (isDropdownVisible.value = true);
const hideDropdown = () => (isDropdownVisible.value = false);
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

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links li {
  position: relative;
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

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-section {
  flex: 1;
}

.dropdown-section h3 {
  font-size: 14px;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.dropdown-section ul {
  list-style: none;
  padding: 0;
}

.dropdown-section ul li {
  margin-bottom: 0.3rem;
  font-size: 13px;
  cursor: pointer;
}

.dropdown-section ul li:hover {
  text-decoration: underline;
}

.menu-image {
  width: 100px;
  height: auto;
  object-fit: cover;
}

.search-bar {
  display: flex;
  justify-content: center;
  flex: 1;
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
