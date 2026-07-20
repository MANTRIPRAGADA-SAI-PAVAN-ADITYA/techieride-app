import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GH Pages needs '/techieride-app/', Capacitor/Android needs './'
  base: process.env.BUILD_TARGET === 'android' ? './' : '/techieride-app/',
})
