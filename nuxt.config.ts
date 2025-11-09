// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    devServer: {
        host: 'localhost',
        port: 3000,
    },
    vite: {
        server: {
            allowedHosts: [
                '.ngrok-free.dev'
            ]
        }
    },
    modules: [
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@vite-pwa/nuxt'
    ],

    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Interval',
            short_name: 'Interval',
            description: 'My free interval workout app',
            theme_color: '#211d20',
            background_color: '#211d20',
            display: 'standalone',
            start_url: '/',
            icons: [
                {
                    src: '/pwa-icon-192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '/pwa-icon-512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
        },
    },
    tailwindcss: {
        editorSupport: true,
    }
})