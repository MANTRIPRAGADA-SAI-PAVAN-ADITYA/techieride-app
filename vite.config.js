import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const isPWA     = process.env.BUILD_TARGET === 'pwa'
const isAndroid = process.env.BUILD_TARGET === 'android'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // PWA plugin only active when building for PWA
    ...(isPWA ? [VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'TechieRide – Community Carpooling NGO',
        short_name: 'TechieRide',
        description: 'Hyderabad carpooling community & social welfare NGO since 2014',
        theme_color: '#14a1af',
        background_color: '#0d3c55',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
        categories: ['travel', 'social', 'lifestyle'],
        shortcuts: [
          { name: 'Find a Ride',    url: '/carpooling', description: 'Browse available carpool rides' },
          { name: 'Our Activities', url: '/activities', description: 'NGO welfare activities' },
          { name: 'Donate',         url: '/donate',     description: 'Support TechieRide NGO' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
    })] : []),
  ],
  // GH Pages → '/techieride-app/'  |  Android/PWA → './'
  base: isAndroid ? './' : isPWA ? '/' : '/techieride-app/',
})
