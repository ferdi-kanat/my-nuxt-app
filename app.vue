<script setup lang="ts">
import DiscoverMore from './components/DiscoverMore.vue';
import MembershipPromotion from './components/MembershipPromotion.vue';
import TheCarousel from './components/TheCarousel.vue';
import TheParallax from './components/TheParallax.vue';
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    
    <TheCarousel />
    <TheParallax />
    <MembershipPromotion />
    <DiscoverMore /> 
  </div>
</template>
