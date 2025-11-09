// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
      '@nuxt/eslint',
      '@nuxt/fonts',
      '@nuxt/icon',
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
      '@vite-pwa/nuxt'
    ],
    tailwindcss: {
        editorSupport: true,
    }
})