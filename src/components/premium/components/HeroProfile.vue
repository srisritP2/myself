<template>
  <div class="hero-profile">
    <!-- Profile Image -->
    <div class="hero-profile__image-container" ref="imageContainer">
      <!-- Loading Skeleton -->
      <div
        v-if="isLoading"
        class="hero-profile__skeleton"
        :class="{ 'hero-profile__skeleton--animated': animated }"
      >
        <div class="hero-profile__skeleton-circle"></div>
      </div>

      <!-- Profile Image -->
      <img
        :src="profileImageUrl"
        :alt="`${profile.name} profile photo`"
        class="hero-profile__image hero-profile__image--loaded"
        @load="handleImageLoad"
        @error="handleImageError"
        :loading="lazyLoad ? 'lazy' : 'eager'"
        :decoding="'async'"
        :fetchpriority="lazyLoad ? 'low' : 'high'"
      />

      <!-- Status Indicator -->
      <div
        v-if="profile.status && !isLoading"
        class="hero-profile__status"
        :class="`hero-profile__status--${profile.status}`"
        :title="getStatusLabel(profile.status)"
      >
        <div class="hero-profile__status-dot"></div>
      </div>

      <!-- Error State -->
      <div
        v-if="hasError && !isLoading"
        class="hero-profile__error"
        :title="'Failed to load profile image'"
      >
        <svg
          class="hero-profile__error-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>

    <!-- Profile Info (only for minimal layout) -->
    <div class="hero-profile__info" v-if="showProfileInfo">
      <h1 class="hero-profile__name">{{ profile.name }}</h1>
      <h2 class="hero-profile__title">{{ profile.title }}</h2>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  animated: {
    type: Boolean,
    default: true,
  },
  lazyLoad: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['image-error', 'image-load'])

// Reactive state
const imageError = ref(false)
const imageLoaded = ref(false)
const isLoading = ref(false)
const hasError = ref(false)

// Image loading is now simplified without WebP detection

// Computed profile image URL with fallback
const profileImageUrl = computed(() => {
  let imageUrl
  if (imageError.value || hasError.value) {
    imageUrl = import.meta.env.BASE_URL + 'profile-photo.svg' // Fallback to SVG
  } else {
    imageUrl = props.profile.imageUrl || import.meta.env.BASE_URL + 'Sri.jpg' // Use Sri.jpg as primary image
  }
  console.log('Hero profile image URL:', imageUrl)
  return imageUrl
})

// Handle successful image load
const handleImageLoad = event => {
  isLoading.value = false
  imageLoaded.value = true
  hasError.value = false
  emit('image-load', event)
}

// Handle image loading errors
const handleImageError = event => {
  console.error('Hero profile image failed to load:', event.target.src)
  isLoading.value = false
  imageError.value = true
  hasError.value = true

  // Try fallback image
  const img = event.target
  if (img && !img.src.includes('profile-photo.svg')) {
    img.src = import.meta.env.BASE_URL + 'profile-photo.svg'
    console.warn('Profile image failed to load, using fallback:', img.src)
  } else {
    console.error('All image fallbacks failed for hero profile')
  }

  emit('image-error', event)
}

// Show profile info only for minimal layout (not for split/centered layouts)
const showProfileInfo = computed(() => {
  // Only show profile info in minimal layout, not in split or centered
  return false // We'll handle name/title in HeroContent instead
})

// Get status label for accessibility
const getStatusLabel = status => {
  const labels = {
    available: 'Available for opportunities',
    busy: 'Currently busy',
    offline: 'Offline',
  }
  return labels[status] || status
}

// Preload critical images
const preloadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = src
  })
}

// Intersection Observer for lazy loading optimization
const imageContainer = ref(null)
const isIntersecting = ref(false)

// Initialize image loading with intersection observer
onMounted(async () => {
  // Always start with loading false for immediate display
  isLoading.value = false

  // Set up intersection observer for lazy loading
  if (props.lazyLoad && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isIntersecting.value = true
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1,
      }
    )

    if (imageContainer.value) {
      observer.observe(imageContainer.value)
    }
  } else {
    isIntersecting.value = true
  }

  // Preload critical images (non-lazy)
  if (!props.lazyLoad && props.profile.imageUrl) {
    try {
      await preloadImage(props.profile.imageUrl)
    } catch (error) {
      console.warn('Failed to preload profile image:', error)
      handleImageError({ target: { src: props.profile.imageUrl } })
    }
  }
})
</script>

<style scoped>
/* ===== PREMIUM PROFILE STYLES ===== */
.hero-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  position: relative;
}

/* ===== PROFILE IMAGE CONTAINER ===== */
.hero-profile__image-container {
  position: relative;
  width: 220px;
  height: 280px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  padding: 4px;
  transition: all var(--duration-normal) var(--ease-out);
  box-shadow:
    var(--shadow-lg),
    0 0 0 4px rgba(var(--color-primary-500), 0.2),
    0 0 20px rgba(var(--color-primary-500), 0.3),
    inset 0 0 0 3px rgba(255, 255, 255, 0.3);
  cursor: pointer;
  will-change: transform, box-shadow;
  border: 2px solid var(--color-primary-400);
}

.hero-profile__image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  border-radius: inherit;
  transition: left 0.9s ease-out;
  pointer-events: none;
  z-index: 2;
}

.hero-profile__image-container:hover {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    var(--shadow-2xl),
    0 0 0 4px rgba(var(--color-primary-500), 0.3),
    0 0 30px rgba(var(--color-primary-500), 0.4),
    inset 0 0 0 3px rgba(255, 255, 255, 0.4);
  border-color: var(--color-primary-300);
}

.hero-profile__image-container:hover::before {
  left: 100%;
}

/* Add a secondary flash effect */
.hero-profile__image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
  border-radius: inherit;
  transition: left 0.4s ease-out 0.1s;
  pointer-events: none;
  z-index: 3;
}

.hero-profile__image-container:hover::after {
  left: 100%;
}

.hero-profile__image-container:active {
  transform: scale(1.02);
  transition-duration: var(--duration-fast);
}

/* ===== PROFILE IMAGE ===== */
.hero-profile__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-xl);
  background: var(--bg-secondary);
  transition: all var(--duration-normal) var(--ease-out);
  filter: brightness(1) contrast(1.05) saturate(1.1);
}

.hero-profile__image-container:hover .hero-profile__image {
  filter: brightness(1.1) contrast(1.1) saturate(1.2);
  transform: scale(1.02);
}

/* Add a subtle pulse animation to draw attention */
@keyframes profilePulse {
  0%,
  100% {
    box-shadow:
      var(--shadow-lg),
      0 0 0 4px rgba(var(--color-primary-500), 0.2),
      0 0 20px rgba(var(--color-primary-500), 0.3),
      inset 0 0 0 3px rgba(255, 255, 255, 0.3);
  }

  50% {
    box-shadow:
      var(--shadow-lg),
      0 0 0 4px rgba(var(--color-primary-500), 0.3),
      0 0 25px rgba(var(--color-primary-500), 0.4),
      inset 0 0 0 3px rgba(255, 255, 255, 0.4);
  }
}

.hero-profile__image-container {
  animation: profilePulse 3s ease-in-out infinite;
}

/* ===== LOADING SKELETON ===== */
.hero-profile__skeleton {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  z-index: 1;
}

.hero-profile__skeleton-circle {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-xl);
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 25%,
    var(--bg-tertiary) 50%,
    var(--bg-secondary) 75%
  );
  background-size: 200% 100%;
}

.hero-profile__skeleton--animated .hero-profile__skeleton-circle {
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

/* ===== PICTURE ELEMENT ===== */
.hero-profile__picture {
  width: 100%;
  height: 100%;
  display: block;
}

/* ===== IMAGE LOADING STATES ===== */
.hero-profile__image {
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.hero-profile__image--loaded {
  opacity: 1 !important;
}

/* Loading state for image */
.hero-profile__image[src=''] {
  background: linear-gradient(45deg, var(--bg-secondary), var(--bg-tertiary));
  background-size: 200% 200%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% -200%;
  }

  100% {
    background-position: 200% 200%;
  }
}

/* ===== ERROR STATE ===== */
.hero-profile__error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  color: var(--text-tertiary);
  z-index: 1;
  transition: all var(--duration-normal) var(--ease-out);
}

.hero-profile__error:hover {
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.hero-profile__error-icon {
  width: 32px;
  height: 32px;
  opacity: 0.6;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.hero-profile__error:hover .hero-profile__error-icon {
  opacity: 0.8;
}

/* ===== STATUS INDICATOR ===== */
.hero-profile__status {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  border: 2px solid var(--bg-primary);
  transition: all var(--duration-fast) var(--ease-out);
  z-index: 2;
}

.hero-profile__status:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-lg);
}

.hero-profile__status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-success);
  transition: all var(--duration-fast) var(--ease-out);
  position: relative;
}

/* Status dot animations */
.hero-profile__status--available .hero-profile__status-dot {
  background: var(--color-success);
  animation: pulse-available 2s infinite;
}

.hero-profile__status--busy .hero-profile__status-dot {
  background: var(--color-warning);
  animation: pulse-busy 1.5s infinite;
}

.hero-profile__status--offline .hero-profile__status-dot {
  background: var(--color-neutral-400);
}

/* Status animations */
@keyframes pulse-available {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

@keyframes pulse-busy {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

/* ===== PROFILE INFO ===== */
.hero-profile__info {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out 0.3s forwards;
}

.hero-profile__name {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all var(--duration-normal) var(--ease-out);
}

.hero-profile__name:hover {
  transform: scale(1.02);
}

.hero-profile__title {
  font-size: var(--text-lg);
  font-weight: 500;
  margin: var(--space-1) 0 0 0;
  color: var(--text-secondary);
  transition: color var(--duration-normal) var(--ease-out);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .hero-profile__image-container {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 768px) {
  .hero-profile {
    gap: var(--space-4);
  }

  .hero-profile__image-container {
    width: 120px;
    height: 120px;
  }

  .hero-profile__status {
    width: 20px;
    height: 20px;
    bottom: 8px;
    right: 8px;
  }

  .hero-profile__status-dot {
    width: 8px;
    height: 8px;
  }

  .hero-profile__name {
    font-size: var(--text-xl);
  }

  .hero-profile__title {
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .hero-profile__image-container {
    width: 100px;
    height: 100px;
  }

  .hero-profile__name {
    font-size: var(--text-lg);
  }

  .hero-profile__title {
    font-size: var(--text-sm);
  }
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  .hero-profile__image-container:hover {
    transform: none;
  }

  .hero-profile__status--available .hero-profile__status-dot,
  .hero-profile__status--busy .hero-profile__status-dot {
    animation: none;
  }

  .hero-profile__info {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .hero-profile__image[src=''] {
    animation: none;
  }
}

/* Focus states for accessibility */
.hero-profile__image-container:focus {
  outline: 3px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* ===== THEME-SPECIFIC ENHANCEMENTS ===== */

/* Creative Gradient Theme */
:root[data-theme='creative-gradient'] .hero-profile__image-container {
  background: var(--cg-glass-bg-medium);
  backdrop-filter: var(--cg-glass-blur);
  -webkit-backdrop-filter: var(--cg-glass-blur);
  border: 2px solid var(--cg-glass-border-hover);
  box-shadow: var(--cg-shadow-interactive);
}

:root[data-theme='creative-gradient'] .hero-profile__image-container:hover {
  background: var(--cg-glass-bg-strong);
  border-color: var(--cg-glass-border-hover);
  box-shadow: var(--cg-shadow-heavy);
  transform: scale(1.05);
}

:root[data-theme='creative-gradient'] .hero-profile__name {
  color: var(--cg-text-primary);
  text-shadow: var(--cg-text-shadow);
  background: none;
  -webkit-text-fill-color: var(--cg-text-primary);
}

:root[data-theme='creative-gradient'] .hero-profile__title {
  color: var(--cg-text-secondary);
  text-shadow: var(--cg-text-shadow-light);
}

:root[data-theme='creative-gradient'] .hero-profile__status {
  background: var(--cg-glass-bg-light);
  backdrop-filter: var(--cg-glass-blur-light);
  -webkit-backdrop-filter: var(--cg-glass-blur-light);
  border: 1px solid var(--cg-glass-border);
}

/* Professional Dark Theme */
:root[data-theme='professional-dark'] .hero-profile__image-container {
  box-shadow:
    var(--shadow-xl),
    0 0 0 4px rgba(var(--color-primary-500), 0.2);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .hero-profile__image-container {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .hero-profile__image-container {
  background: linear-gradient(135deg, var(--color-secondary-500), var(--color-accent-500));
}

/* ===== ANIMATIONS ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Profile entrance animation */
.hero-profile {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Staggered animation for child elements */
.hero-profile__image-container {
  animation: fadeInUp 0.8s ease-out 0.1s forwards;
  opacity: 0;
}

/* ===== HIGH CONTRAST SUPPORT ===== */
@media (prefers-contrast: high) {
  .hero-profile__image-container {
    border: 3px solid var(--text-primary);
    background: var(--bg-primary);
  }

  .hero-profile__status {
    border: 2px solid var(--text-primary);
  }
}
</style>
