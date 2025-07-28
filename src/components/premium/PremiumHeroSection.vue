<template>
  <section class="premium-hero" :class="heroClasses" ref="heroRef">
    <!-- Background Elements -->
    <div class="premium-hero__background">
      <div class="premium-hero__gradient-mesh" :style="gradientMeshStyle"></div>
      <div class="premium-hero__particles" v-if="showParticles">
        <div
          v-for="n in 8"
          :key="n"
          class="premium-hero__particle"
          :style="getParticleStyle(n)"
        ></div>
      </div>
    </div>

    <!-- Glass Effect Container -->
    <div class="premium-hero__glass-container">
      <!-- Main Content Container -->
      <div class="premium-hero__container">
        <!-- Profile Section -->
        <div class="premium-hero__profile">
          <HeroProfile
            :profile="profile"
            :animated="animationsEnabled"
            @image-error="handleImageError"
          />
        </div>

        <!-- Content Section -->
        <div class="premium-hero__content">
          <HeroContent
            :profile="profile"
            :animated="animationsEnabled"
            :show-location="displayConfig.showLocation"
            :show-status="displayConfig.showStatus"
          />

          <!-- Stats Section -->
          <HeroStats
            v-if="displayConfig.showStats"
            :stats="stats"
            :animated="animationsEnabled"
            class="premium-hero__stats"
          />

          <!-- Actions Section -->
          <HeroActions
            :actions="actions"
            :social="social"
            :animated="animationsEnabled"
            :show-social="displayConfig.showSocial"
            class="premium-hero__actions"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { usePremiumHero } from '@/composables/usePremiumHero'
import HeroProfile from './components/HeroProfile.vue'
import HeroContent from './components/HeroContent.vue'
import HeroStats from './components/HeroStats.vue'
import HeroActions from './components/HeroActions.vue'

// Props definition
const props = defineProps({
  profile: {
    type: Object,
    required: true,
    validator: value => {
      return value.name && value.title && value.description && value.imageUrl
    },
  },
  stats: {
    type: Object,
    default: () => ({
      experience: 8,
      projects: 50,
      clients: 25,
      satisfaction: 98,
    }),
  },
  actions: {
    type: Object,
    required: true,
    validator: value => {
      return value.primaryCTA && value.secondaryCTA
    },
  },
  social: {
    type: Array,
    default: () => [],
  },
  theme: {
    type: String,
    default: 'minimal',
    validator: value => ['minimal', 'gradient', 'glass'].includes(value),
  },
  layout: {
    type: String,
    default: 'split',
    validator: value => ['centered', 'split', 'minimal'].includes(value),
  },
  displayConfig: {
    type: Object,
    default: () => ({
      showStats: true,
      showStatus: true,
      showLocation: true,
      showSocial: true,
    }),
  },
  animationsEnabled: {
    type: Boolean,
    default: true,
  },
})

// Composable usage
const {
  heroRef,
  mousePosition,
  isVisible,
  animationTimeline,
  handleImageError,
  initializeAnimations,
  cleanup,
} = usePremiumHero(props)

// Computed properties
const heroClasses = computed(() => [
  `premium-hero--${props.theme}`,
  `premium-hero--${props.layout}`,
  {
    'premium-hero--animated': props.animationsEnabled,
    'premium-hero--visible': isVisible.value,
  },
])

const gradientMeshStyle = computed(() => ({
  background: `radial-gradient(circle at ${mousePosition.value.x * 100}% ${mousePosition.value.y * 100}%, 
    rgba(var(--color-primary-500), 0.1) 0%, 
    rgba(var(--color-secondary-500), 0.05) 50%, 
    transparent 100%)`,
}))

const showParticles = computed(() => {
  return props.theme === 'gradient' && props.animationsEnabled
})

// Particle styling function
const getParticleStyle = index => ({
  animationDelay: `${index * 0.5}s`,
  left: `${10 + index * 12}%`,
  animationDuration: `${8 + index}s`,
})

// Lifecycle hooks
onMounted(() => {
  // Performance monitoring
  const startTime = performance.now()

  initializeAnimations()

  // Measure initialization time
  const endTime = performance.now()
  if (endTime - startTime > 100) {
    console.warn(`Premium Hero initialization took ${(endTime - startTime).toFixed(2)}ms`)
  }
})

onUnmounted(() => {
  cleanup()
})

// Expose for template refs
defineExpose({
  heroRef,
  animationTimeline,
})
</script>

<style>
@import './styles/premium-hero.css';
</style>
