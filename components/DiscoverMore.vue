<template>
  <div class="cmp_cad578f106000">
    <h2 class="seg-hero-title">Daha Fazlasını Keşfet</h2>
    <div class="seg-hero-body">
      <a
        v-for="(item, index) in items"
        :key="index"
        :href="item.link"
        class="seg-hero-item-link"
        :class="{ 'icon-only': item.text === '' }"
      >
        <img :src="item.icon" alt="" class="seg-icon" />
        <span v-if="item.text">{{ item.text }}</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Item {
  text: string;
  icon: string;
  link: string;
}

const items: Item[] = [
  { text: "Her Gün İçin İdeal", icon: "/icons/1.webp", link: "https://www.columbia.com.tr/essentials-urunleri" },
  { text: "Doğa Yürüyüşü", icon: "/icons/2.webp", link: "https://www.columbia.com.tr/lets-hike" },
  { text: "Mont Rehberi", icon: "/icons/3.webp", link: "https://www.columbia.com.tr/mont-rehberi" },
  { text: "Sıcak Kal", icon: "/icons/4.webp", link: "https://www.columbia.com.tr/columbiateknolojileri/sicak/yalitim" },
  { text: "Kuru Kal", icon: "/icons/5.webp", link: "https://www.columbia.com.tr/columbiateknolojileri/kuru/su-gecirmez" },
  { text: "Kar Ve Kayak", icon: "/icons/6.webp", link: "https://www.columbia.com.tr/aktivite-kayak" },
  { text: "Tüm Teknolojiler", icon: "/icons/7.webp", link: "https://www.columbia.com.tr/columbiateknolojileri" },
  { text: "", icon: "/icons/8.webp", link: "#" }, // Son item
];
</script>

<style scoped>
.cmp_cad578f106000 {
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.seg-hero-title {
  font-family: 'OpenSans', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  text-rendering: optimizeLegibility;
}

.seg-hero-body {
  width: fit-content;
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 500px) {
  .seg-hero-body {
    grid-template-columns: repeat(2, 1fr);
  }
}

.seg-hero-item-link {
  flex-direction: row;
  padding: 1.5rem;
  white-space: normal;
  color: #000;
  background-color: #eaebed;
  background-image: none;
  border-color: #eaebed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  border: 0.0625rem;
  padding: 0.75rem 1.8rem;
  font-size: 0.75rem;
  line-height: 0.9;
  border-radius: 3.125rem;
  transition: all 0.3s ease-in-out;

}

.seg-hero-item-link:hover {
  background-color: #bbbcbd;
  border-color: #b7bbc2;
}

.seg-icon {
  width: 25px;
  height: auto;
}

.icon-only .seg-icon {
  width: 94px;
  height: 25px;
}
</style>
