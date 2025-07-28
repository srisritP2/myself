<template>
  <v-app>
    <v-main>
      <!-- Router view will render the current route component -->
      <router-view />
    </v-main>

    <!-- Global notification system -->
    <NotificationToast />
  </v-app>
</template>

<script setup>
// Main App component - now uses Vue Router for navigation
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import NotificationToast from '@/components/common/NotificationToast.vue'

const authStore = useAuthStore()
const uiStore = useUIStore()

// Initialize app on mount
onMounted(async () => {
  // Initialize theme system
  uiStore.initializeTheme()

  // Try to fetch user profile if token exists
  if (authStore.token) {
    try {
      await authStore.fetchProfile()
    } catch (error) {
      console.warn('Failed to fetch user profile:', error)
    }
  }
})
</script>

<style>
/* Global styles that apply to the entire app */
body,
#app,
.v-application {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text-primary);
  /* background removed to allow theme system to work */
  transition:
    background-color var(--duration-normal) var(--ease-out),
    color var(--duration-normal) var(--ease-out);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure Creative Gradient theme background is applied */
[data-theme='creative-gradient'] body,
[data-theme='creative-gradient'] #app,
[data-theme='creative-gradient'] .v-application {
  background: transparent !important;
  background-attachment: fixed !important;
}

/* Typography Improvements */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-primary);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0 0 var(--space-4) 0;
}

h1 {
  font-size: var(--text-4xl);
  font-weight: 800;
}

h2 {
  font-size: var(--text-3xl);
  font-weight: 700;
}

h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
}

h4 {
  font-size: var(--text-xl);
  font-weight: 600;
}

h5 {
  font-size: var(--text-lg);
  font-weight: 500;
}

h6 {
  font-size: var(--text-base);
  font-weight: 500;
}

p {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 var(--space-4) 0;
}

/* Responsive Typography */
@media (max-width: 768px) {
  h1 {
    font-size: var(--text-3xl);
  }

  h2 {
    font-size: var(--text-2xl);
  }

  h3 {
    font-size: var(--text-xl);
  }

  body,
  #app,
  .v-application {
    font-size: var(--text-sm);
  }
}

/* Global card styles using new theme system */
.main-card,
.details-section,
.testimonial-card,
.hero-section {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-2xl);
  padding: var(--space-8) var(--space-6) var(--space-6) var(--space-6);
  margin: var(--space-8) auto 0 auto;
  max-width: 900px;
  width: calc(100% - var(--space-8));
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    background-color var(--duration-normal) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out);
}

/* Card hover effects */
.main-card:hover,
.details-section:hover,
.testimonial-card:hover,
.hero-section:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Animation classes */
.animate-section {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  transition:
    opacity 0.7s cubic-bezier(0.4, 2, 0.6, 1),
    transform 0.7s cubic-bezier(0.4, 2, 0.6, 1);
}

.animate-section.in-view {
  opacity: 1;
  transform: none;
}

/* Global theme switcher */
.global-theme-switcher-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
