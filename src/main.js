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

// Create a Vuetify instance with all components and directives
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

// Create the Vue app, register Vuetify, and mount it to the #app element in index.html
createApp(App).use(vuetify).mount('#app')
