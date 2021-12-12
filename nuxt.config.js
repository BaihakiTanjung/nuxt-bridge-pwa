import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-bridge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  bridge: {

    // Use Vite as the bundler instead of Webpack 4
    vite: true,

    // Enable Nuxt 3 compatible useMeta
    meta: true,

  },

  pwa: {
    meta: {
      title: 'My PWA',
      author: 'Me',
    },
    manifest: {
      name: 'Nuxt.js PWAs are so easy',
      short_name: 'Nuxt.js PWA',
      description : 'Nuxt.js PWA is a Nuxt.js module that makes it easy to create progressive web apps.',
      lang: 'en',
    },

    icon   : {
      fileName : 'nuxtLogo.jpeg',
      sizes : [64, 120, 144, 152, 192, 384, 512],
    }
  },

})
