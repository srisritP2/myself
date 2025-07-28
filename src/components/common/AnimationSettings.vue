<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="bottom end"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" class="animation-settings-btn" aria-label="Animation settings">
        <v-icon>{{
          animationEnabled ? 'mdi-animation-play' : 'mdi-animation-play-outline'
        }}</v-icon>
      </v-btn>
    </template>
    <v-card min-width="300" class="animation-settings-menu">
      <v-card-title class="d-flex align-center">
        <v-icon color="primary" class="mr-2">mdi-animation</v-icon>
        Animation Settings
      </v-card-title>
      <v-card-text>
        <v-switch
          v-model="animationEnabled"
          color="primary"
          label="Enable animations"
          hide-details
          @change="updateAnimationSettings"
        ></v-switch>

        <v-divider class="my-3"></v-divider>

        <div class="text-subtitle-2 mb-2">Animation Speed</div>
        <v-slider
          v-model="animationSpeed"
          :disabled="!animationEnabled"
          color="primary"
          track-color="grey-lighten-3"
          :min="0"
          :max="2"
          :step="1"
          :ticks="speedTicks"
          show-ticks="always"
          :tick-size="4"
          thumb-label
          :thumb-size="20"
          @change="updateAnimationSettings"
        >
          <template v-slot:tick-label="{ value }">
            {{ speedLabels[value] }}
          </template>
        </v-slider>

        <v-divider class="my-3"></v-divider>

        <div class="text-subtitle-2 mb-2">Reduced Motion</div>
        <div class="text-caption mb-2">
          Your system is currently set to
          <strong>{{ prefersReducedMotion ? 'prefer' : 'allow' }}</strong>
          animations.
        </div>
        <v-btn variant="outlined" color="primary" size="small" block @click="openSystemSettings">
          Open System Settings
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUIStore } from '@/stores/ui'
// Utility function to check if user prefers reduced motion
function checkReducedMotion() {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (error) {
    return false
  }
}

const uiStore = useUIStore()
const menu = ref(false)

// Animation settings
const animationEnabled = ref(true)
const animationSpeed = ref(1) // 0: Slow, 1: Normal, 2: Fast
const prefersReducedMotion = ref(false)

// Speed labels and ticks
const speedLabels = {
  0: 'Slow',
  1: 'Normal',
  2: 'Fast',
}
const speedTicks = {
  0: 'Slow',
  1: 'Normal',
  2: 'Fast',
}

// Initialize settings from store or localStorage
onMounted(() => {
  // Check system preference for reduced motion
  prefersReducedMotion.value = checkReducedMotion()

  // Load saved settings
  const savedSettings = uiStore.animationSettings
  if (savedSettings) {
    animationEnabled.value = savedSettings.enabled
    animationSpeed.value = savedSettings.speed
  }

  // Add listener for prefers-reduced-motion changes
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', handleReducedMotionChange)
})

// Handle system preference change
function handleReducedMotionChange(e) {
  prefersReducedMotion.value = e.matches

  // If system prefers reduced motion, update our settings accordingly
  if (e.matches) {
    animationEnabled.value = false
    updateAnimationSettings()
  }
}

// Update animation settings in store
function updateAnimationSettings() {
  uiStore.setAnimationSettings({
    enabled: animationEnabled.value,
    speed: animationSpeed.value,
  })
}

// Open system settings for accessibility/motion
function openSystemSettings() {
  // Different approach based on OS
  if (navigator.userAgent.indexOf('Windows') !== -1) {
    // For Windows
    uiStore.showInfo(
      'System Settings',
      'On Windows: Go to Settings > Ease of Access > Display > Show animations'
    )
  } else if (navigator.userAgent.indexOf('Mac') !== -1) {
    // For macOS
    uiStore.showInfo(
      'System Settings',
      'On macOS: Go to System Preferences > Accessibility > Display > Reduce motion'
    )
  } else {
    // Generic instructions
    uiStore.showInfo(
      'System Settings',
      'Check your system settings for accessibility options related to motion and animations'
    )
  }
}
</script>

<style scoped>
.animation-settings-btn {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 100;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.animation-settings-btn:hover {
  opacity: 1;
}

.animation-settings-menu {
  border-radius: 12px;
  overflow: hidden;
}
</style>
