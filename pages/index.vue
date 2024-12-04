<template>
  <div class="layout-container">
    <!-- Sol Taraf: Navigation Bar -->
    <nav class="nav-bar">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        @click="setActiveComponent(index)"
      >
        Button {{ index + 1 }}
      </button>
    </nav>

    <!-- Sağ Taraf: Main Content -->
    <main class="main-bar">
      <component
        v-for="(component, index) in components"
        :key="index"
        :is="component"
        v-show="activeComponent === index"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import DiscoverMore from '~/components/DiscoverMore.vue';
import MembershipPromotion from '~/components/MembershipPromotion.vue';
import TheCarousel from '~/components/TheCarousel.vue';
import TheParallax from '~/components/TheParallax.vue';

import { ref } from 'vue';
import PromoSection from '~/components/PromoSection.vue';
import TheHeader from '~/components/TheHeader.vue';
import TheFooter from '~/components/TheFooter.vue';
import IconCategories from '~/components/IconCategories.vue';


const activeComponent = ref(0);
const buttons = Array.from({ length: 10 }, (_, i) => `Button ${i + 1}`);
const components = [DiscoverMore, MembershipPromotion, TheCarousel, TheParallax, PromoSection, TheHeader, TheFooter, IconCategories];

const setActiveComponent = (index: number) => {
  console.log('Tıklanan buton:', index); // Kontrol için log
  activeComponent.value = index;
};
</script>

<style scoped>
.layout-container {
  display: flex;
}

.nav-bar {
  width: 20%;
  background-color: #f4f4f4;
  padding: 10px;
}

.main-bar {
  flex: 1;
  padding: 20px;
}
</style>import PromoSection from '~/components/PromoSection.vue';

