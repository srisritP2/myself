// Vite configuration file for the Vue + Vuetify portfolio project
// - Defines build and dev server settings
// - Sets the base path for GitHub Pages deployment
// - Registers Vue plugin for SFC support
// - Configures TypeScript and path aliases

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/myself/', // Set base path for GitHub Pages deployment
  plugins: [vue()], // Register Vue plugin
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vuetify'],
          router: ['vue-router', 'pinia'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
