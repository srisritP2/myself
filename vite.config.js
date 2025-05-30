// Vite configuration file for the Vue + Vuetify portfolio project
// - Defines build and dev server settings
// - Sets the base path for GitHub Pages deployment
// - Registers Vue plugin for SFC support

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/myself/', // Set base path for GitHub Pages deployment
  plugins: [vue()], // Register Vue plugin
})
