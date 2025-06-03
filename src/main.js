// Import the createApp function from Vue to initialize the app
import { createApp } from 'vue'
// Import the root App component
import App from './App.vue'
// Import global styles
import './style.css'

// Vuetify imports for Material Design UI
import 'vuetify/styles' // Import Vuetify's base styles
import { createVuetify } from 'vuetify' // Vuetify plugin
import * as components from 'vuetify/components' // All Vuetify components
import * as directives from 'vuetify/directives' // All Vuetify directives
import '@mdi/font/css/materialdesignicons.css' // Import Material Design Icons
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

// Create a Vuetify instance with all components and directives
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'lightCustom',
    themes: {
      lightCustom: {
        dark: false,
        colors: {
          background: '#ffe066', // Rich yellow
          surface: '#fffbe6',    // Soft off-white
          primary: '#185a9d',    // Navy blue
          secondary: '#f9c846',  // Accent yellow
          error: '#d32f2f',
          info: '#1976d2',
          success: '#388e3c',
          warning: '#ffa000',
          onBackground: '#185a9d',
          onSurface: '#185a9d',
        },
      },
      darkCustom: {
        dark: true,
        colors: {
          background: '#10131a', // Deep black/navy
          surface: '#18213a',    // Rich navy blue
          primary: '#fff',       // White text
          secondary: '#43cea2',  // Teal accent
          error: '#ef9a9a',
          info: '#90caf9',
          success: '#a5d6a7',
          warning: '#ffe082',
          onBackground: '#fff',
          onSurface: '#fff',
        },
      },
    },
  },
})

// Create the Vue app, register Vuetify, and mount it to the #app element in index.html
createApp(App).use(vuetify).mount('#app')
