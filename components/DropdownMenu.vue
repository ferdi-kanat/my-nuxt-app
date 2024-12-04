<template>
    <div class="dropdown-menu">
      <div
        class="dropdown-trigger"
        @mouseover="showMenu"
        @mouseleave="hideMenu"
      >
        <slot name="trigger">Erkek</slot>
      </div>
      <div
        v-if="isMenuVisible"
        class="dropdown-content"
        @mouseover="showMenu"
        @mouseleave="hideMenu"
      >
        <div class="dropdown-section">
          <h3>Yeni Gelenler</h3>
          <img
            src="/path/to/your/image.jpg"
            alt="Yeni Gelenler"
            class="menu-image"
          />
        </div>
        <div class="dropdown-section">
          <h3>Tekstil</h3>
          <ul>
            <li v-for="item in textileItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h3>Ayakkabı</h3>
          <ul>
            <li v-for="item in shoeItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h3>Aksesuar</h3>
          <ul>
            <li v-for="item in accessoryItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h3>Ekipman</h3>
          <ul>
            <li v-for="item in equipmentItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuVisible: false,
        textileItems: [
          "Mont",
          "Polar Üst",
          "Yağmurluk",
          "Pantolon",
          "Gömlek",
          "Sweatshirt",
          "Yelek",
          "Softshell",
          "Rüzgarlık",
          "Tulum",
          "T-Shirt",
          "Polo T-Shirt",
          "Şort",
          "İçlik",
          "İç Giyim",
          "Tümünü Gör",
        ],
        shoeItems: ["Ayakkabı", "Bot ve Çizme", "Sandalet", "Terlik", "Tümünü Gör"],
        accessoryItems: ["Şapka", "Eldiven", "Boyunluk", "Bere", "Çorap", "Tümünü Gör"],
        equipmentItems: ["Çanta", "Tümünü Gör"],
      };
    },
    methods: {
      showMenu() {
        this.isMenuVisible = true;
      },
      hideMenu() {
        this.isMenuVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .dropdown-menu {
    position: relative;
  }
  
  .dropdown-trigger {
    cursor: pointer;
    font-weight: bold;
  }
  
  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    display: flex;
    gap: 20px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .dropdown-section {
    flex: 1;
  }
  
  .dropdown-section h3 {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .dropdown-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .dropdown-section ul li {
    margin-bottom: 5px;
    font-size: 14px;
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
  </style>
  