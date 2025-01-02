import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@fortawesome/fontawesome-free/css/all.min.css'],
  modules: [
    '@pinia/nuxt'
  ]
})
