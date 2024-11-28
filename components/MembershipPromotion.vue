<template>
  <div class="container">
    <h2 class="title">Üyelikten Daha Fazlası!</h2>
    <p class="description">
      Tüm alışverişlerinde geçerli %5 İNDİRİM,
      özel indirim kuponları, doğum gününe özel 500 TL hediye çeki ve daha fazlası için üye ol!
    </p>
    <div style="display: flex; justify-content: center;">
      <nuxt-link to="https://www.columbia.com.tr/auth?action=register" class="join-button" style="text-decoration: none;">ÜYE OL</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MembershipPromotion',
  methods: {
    joinMembership() {
      alert('Üyelik sayfasına yönlendiriliyorsunuz!');
    },
  },
});
</script>

<style scoped>
.container {
  background-color: #007bff; /* Mavi arka plan */
  text-align: center;
  padding: 20px 0;
}

.title {
  display: block;
  color: rgb(255, 255, 255);
  font-family: 'OpenSans', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 27.2px;
  height: 27.1875px;
  width: 370.922px;
  margin: 0 auto 20px;
}

.description {
  color: #fff;
  font-size: 18px;
  margin-bottom: 20px;
  font-family: 'OpenSans', sans-serif;
}


.join-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34.7969px;
  width: 74.7344px;
  background-color: #000;
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 60px;
  cursor: pointer;
  font-family: 'OpenSans', sans-serif;
  font-size: 12px;
  line-height: 0.9;
  text-transform: uppercase;
}

.join-button:hover {
  background-color: #333;
  text-align: center;
}
</style>
