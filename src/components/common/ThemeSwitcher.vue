<template>
  <div class="theme-switcher">
    <!-- Theme Selection Button -->
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon
          class="theme-toggle-btn"
          :color="currentTheme.primaryColor"
          aria-label="Change theme"
        >
          <v-icon>mdi-palette</v-icon>
        </v-btn>
      </template>

      <v-card class="theme-menu" min-width="280">
        <v-card-title class="text-h6 pb-2"> Choose Theme </v-card-title>

        <v-card-text class="pt-0">
          <div class="theme-options">
            <div
              v-for="themeOption in availableThemes"
              :key="themeOption.name"
              @click="selectTheme(themeOption.name)"
              :class="['theme-option', { 'theme-option--active': theme === themeOption.name }]"
            >
              <!-- Theme Preview Colors -->
              <div class="theme-preview">
                <div
                  class="color-swatch color-swatch--primary"
                  :style="{ backgroundColor: themeOption.primaryColor }"
                ></div>
                <div
                  class="color-swatch color-swatch--secondary"
                  :style="{ backgroundColor: themeOption.secondaryColor }"
                ></div>
                <div
                  class="color-swatch color-swatch--accent"
                  :style="{ backgroundColor: themeOption.accentColor }"
                ></div>
              </div>

              <!-- Theme Info -->
              <div class="theme-info">
                <div class="theme-name">{{ themeOption.displayName }}</div>
                <div class="theme-description">{{ themeOption.description }}</div>
              </div>

              <!-- Active Indicator -->
              <div v-if="theme === themeOption.name" class="theme-active-indicator">
                <v-icon color="primary" size="20">mdi-check-circle</v-icon>
              </div>
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <v-divider class="my-4"></v-divider>

          <div class="dark-mode-toggle">
            <div class="toggle-info">
              <div class="toggle-label">Dark Mode</div>
              <div class="toggle-description">Toggle between light and dark variants</div>
            </div>
            <v-switch
              v-model="darkMode"
              @change="toggleDarkMode"
              color="primary"
              hide-details
              inset
            ></v-switch>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

// Computed properties
const theme = computed(() => uiStore.theme)
const darkMode = computed({
  get: () => uiStore.darkMode,
  set: value => uiStore.setDarkMode(value),
})
const availableThemes = computed(() => uiStore.availableThemes)
const currentTheme = computed(() => uiStore.currentTheme)

// Methods
function selectTheme(themeName) {
  uiStore.setTheme(themeName)
  uiStore.showSuccess('Theme Changed', `Switched to ${uiStore.currentTheme.displayName}`)
}

function toggleDarkMode() {
  uiStore.toggleDarkMode()
  const mode = uiStore.darkMode ? 'Dark' : 'Light'
  uiStore.showInfo('Mode Changed', `Switched to ${mode} mode`)
}
</script>

<style scoped>
.theme-switcher {
  position: relative;
}

.theme-toggle-btn {
  transition: all var(--duration-fast) var(--ease-out);
}

.theme-toggle-btn:hover {
  transform: scale(1.05);
}

.theme-menu {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-primary);
}

.theme-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.theme-option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  border: 1px solid transparent;
  position: relative;
}

.theme-option:hover {
  background-color: var(--bg-secondary);
  transform: translateY(-1px);
}

.theme-option--active {
  background-color: var(--bg-accent);
  border-color: var(--border-accent);
}

.theme-preview {
  display: flex;
  gap: var(--space-1);
  flex-shrink: 0;
}

.color-swatch {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.theme-info {
  flex: 1;
  min-width: 0;
}

.theme-name {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--text-primary);
  line-height: 1.2;
}

.theme-description {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  line-height: 1.3;
  margin-top: 2px;
}

.theme-active-indicator {
  flex-shrink: 0;
}

.dark-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.toggle-info {
  flex: 1;
}

.toggle-label {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--text-primary);
  line-height: 1.2;
}

.toggle-description {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  line-height: 1.3;
  margin-top: 2px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .theme-menu {
    min-width: 260px;
  }

  .theme-option {
    padding: var(--space-2);
    gap: var(--space-2);
  }

  .color-swatch {
    width: 14px;
    height: 14px;
  }
}
</style>
