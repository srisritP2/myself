<template>
  <div class="hero-actions">
    <!-- Action Buttons -->
    <div class="hero-actions__buttons">
      <button
        class="hero-actions__btn hero-actions__btn--primary"
        @click="handlePrimaryAction"
        :disabled="primaryLoading"
      >
        <svg
          v-if="!primaryLoading && actions.primaryCTA.icon"
          class="hero-actions__btn-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill="currentColor" />
        </svg>
        <div v-if="primaryLoading" class="hero-actions__spinner"></div>
        <span>{{ actions.primaryCTA.label }}</span>
      </button>

      <button
        class="hero-actions__btn hero-actions__btn--secondary"
        @click="handleSecondaryAction"
        :disabled="secondaryLoading"
      >
        <svg
          v-if="!secondaryLoading && actions.secondaryCTA.icon"
          class="hero-actions__btn-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="currentColor"
          />
        </svg>
        <div v-if="secondaryLoading" class="hero-actions__spinner"></div>
        <span>{{ actions.secondaryCTA.label }}</span>
      </button>
    </div>

    <!-- Social Links -->
    <div v-if="showSocial && social.length > 0" class="hero-actions__social">
      <button
        v-for="socialItem in social"
        :key="socialItem.platform"
        class="hero-actions__social-btn"
        @click="handleSocialClick(socialItem.url, socialItem.platform)"
        :aria-label="`Visit ${socialItem.platform} profile`"
      >
        <svg
          class="hero-actions__social-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <!-- LinkedIn -->
          <path
            v-if="socialItem.icon === 'mdi-linkedin'"
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            fill="currentColor"
          />
          <!-- GitHub -->
          <path
            v-else-if="socialItem.icon === 'mdi-github'"
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
            fill="currentColor"
          />
          <!-- Email -->
          <path
            v-else-if="socialItem.icon === 'mdi-email'"
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="currentColor"
          />
          <!-- Phone -->
          <path
            v-else-if="socialItem.icon === 'mdi-phone'"
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
            fill="currentColor"
          />
          <!-- Default icon for other platforms -->
          <path
            v-else
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  actions: {
    type: Object,
    required: true,
  },
  social: {
    type: Array,
    default: () => [],
  },
  animated: {
    type: Boolean,
    default: true,
  },
  showSocial: {
    type: Boolean,
    default: true,
  },
})

// Loading states
const primaryLoading = ref(false)
const secondaryLoading = ref(false)

// Action handlers
const handlePrimaryAction = async () => {
  if (primaryLoading.value) return

  primaryLoading.value = true
  try {
    await props.actions.primaryCTA.action()
  } catch (error) {
    console.error('Primary action failed:', error)
  } finally {
    primaryLoading.value = false
  }
}

const handleSecondaryAction = async () => {
  if (secondaryLoading.value) return

  secondaryLoading.value = true
  try {
    await props.actions.secondaryCTA.action()
  } catch (error) {
    console.error('Secondary action failed:', error)
  } finally {
    secondaryLoading.value = false
  }
}

const handleSocialClick = (url, platform) => {
  if (platform === 'email') {
    window.location.href = `mailto:${url.replace('mailto:', '')}`
  } else if (platform === 'phone') {
    window.location.href = `tel:${url.replace('tel:', '')}`
  } else {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
/* ===== PREMIUM ACTIONS STYLES ===== */
.hero-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: flex-start;
  width: 100%;
}

.hero-actions__buttons {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  width: 100%;
}

.hero-actions__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-8);
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: 600;
  border-radius: var(--radius-xl);
  border: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  text-decoration: none;
  min-height: 56px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-lg);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-actions__btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--duration-normal) var(--ease-out);
}

.hero-actions__btn:hover::before {
  left: 100%;
}

.hero-actions__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.hero-actions__btn--primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--text-inverse);
  border: 1px solid var(--color-primary-400);
  box-shadow:
    var(--shadow-lg),
    0 0 20px rgba(var(--color-primary-500), 0.3);
}

.hero-actions__btn--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    var(--shadow-2xl),
    0 0 30px rgba(var(--color-primary-500), 0.4);
  border-color: var(--color-primary-300);
}

.hero-actions__btn--secondary {
  background: linear-gradient(135deg, transparent, rgba(var(--color-primary-500), 0.1));
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
  backdrop-filter: blur(20px);
}

.hero-actions__btn--secondary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--text-inverse);
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    var(--shadow-xl),
    0 0 25px rgba(var(--color-primary-500), 0.3);
  border-color: var(--color-primary-400);
}

.hero-actions__btn-icon {
  transition: transform var(--duration-fast) var(--ease-out);
}

.hero-actions__btn:hover .hero-actions__btn-icon {
  transform: translateX(2px);
}

.hero-actions__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.hero-actions__social {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.hero-actions__social-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-primary);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.hero-actions__social-btn:hover {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  border-color: var(--color-primary-500);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.hero-actions__social-icon {
  transition: transform var(--duration-fast) var(--ease-out);
}

.hero-actions__social-btn:hover .hero-actions__social-icon {
  transform: scale(1.1);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ===== THEME-SPECIFIC ENHANCEMENTS ===== */

/* Creative Gradient Theme */
:root[data-theme='creative-gradient'] .hero-actions__btn {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

:root[data-theme='creative-gradient'] .hero-actions__btn--primary {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
}

:root[data-theme='creative-gradient'] .hero-actions__btn--primary:hover:not(:disabled) {
  background: var(--cg-glass-bg-interactive) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-heavy) !important;
  transform: translateY(-3px) scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .hero-actions__btn--secondary {
  background: var(--cg-glass-bg-light) !important;
  border-color: var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
}

:root[data-theme='creative-gradient'] .hero-actions__btn--secondary:hover:not(:disabled) {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: translateY(-3px) scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .hero-actions__social-btn {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .hero-actions__social-btn:hover {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  color: var(--cg-text-primary) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: translateY(-2px) !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-actions {
    align-items: center;
    width: 100%;
  }

  .hero-actions__buttons {
    width: 100%;
    justify-content: center;
  }

  .hero-actions__btn {
    flex: 1;
    min-width: 140px;
    justify-content: center;
  }

  .hero-actions__social {
    justify-content: center;
  }
}
</style>
