/**
 * Premium Hero Composable
 *
 * This composable provides all the functionality needed for the premium hero section,
 * including animations, mouse tracking, visibility detection, and user interactions.
 *
 * @author Portfolio Team
 * @version 2.0.0
 */

import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// Simple intersection observer implementation (fallback for VueUse)
const useIntersectionObserver = (target, callback, options = {}) => {
  let observer = null

  onMounted(() => {
    if (target.value && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(callback, options)
      observer.observe(target.value)
    }
  })

  const stop = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onUnmounted(stop)

  return { stop }
}

// Simple reduced motion detection
const usePreferredReducedMotion = () => {
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion.value = mediaQuery.matches

      const handler = e => {
        prefersReducedMotion.value = e.matches
      }

      mediaQuery.addEventListener('change', handler)

      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handler)
      })
    }
  })

  return prefersReducedMotion
}

/**
 * Default configuration for premium hero
 */
const DEFAULT_CONFIG = {
  animations: {
    enabled: true,
    duration: 800,
    stagger: 200,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  particles: {
    count: 8,
    speed: 8,
    opacity: 0.6,
  },
  mouse: {
    enabled: true,
    sensitivity: 0.5,
  },
}

/**
 * Premium Hero Composable
 *
 * @param {Object} props - Component props
 * @param {Object} config - Configuration options
 * @returns {Object} Reactive state and methods for premium hero
 */
export function usePremiumHero(props = {}, config = {}) {
  // Merge configuration with defaults
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  // ===== REACTIVE STATE =====

  /**
   * Template refs
   */
  const heroRef = ref(null)

  /**
   * Mouse position for parallax effects
   */
  const mousePosition = ref({ x: 0.5, y: 0.5 })

  /**
   * Visibility state for animations
   */
  const isVisible = ref(false)

  /**
   * Animation timeline state
   */
  const animationTimeline = ref({
    sequence: [],
    totalDuration: 0,
    isPlaying: false,
  })

  /**
   * Performance and accessibility
   */
  const prefersReducedMotion = usePreferredReducedMotion()
  const animationsEnabled = computed(() => {
    return props.animationsEnabled && !prefersReducedMotion.value
  })

  // ===== INTERSECTION OBSERVER =====

  /**
   * Intersection observer for visibility detection
   */
  const { stop: stopIntersectionObserver } = useIntersectionObserver(
    heroRef,
    ([{ isIntersecting }]) => {
      isVisible.value = isIntersecting
      if (isIntersecting && animationsEnabled.value) {
        nextTick(() => {
          playEntranceAnimations()
        })
      }
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    }
  )

  // ===== MOUSE TRACKING =====

  /**
   * Mouse move handler for parallax effects
   */
  const handleMouseMove = event => {
    if (!finalConfig.mouse.enabled || !heroRef.value) return

    const rect = heroRef.value.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    mousePosition.value = {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
    }
  }

  // ===== ANIMATION SYSTEM =====

  /**
   * Create animation timeline
   */
  const createAnimationTimeline = () => {
    const timeline = [
      {
        element: '.premium-hero__profile',
        delay: 0,
        duration: finalConfig.animations.duration,
        animation: 'fadeInUp',
        easing: finalConfig.animations.easing,
      },
      {
        element: '.premium-hero__content h1',
        delay: finalConfig.animations.stagger,
        duration: finalConfig.animations.duration,
        animation: 'fadeInUp',
        easing: finalConfig.animations.easing,
      },
      {
        element: '.premium-hero__content h2',
        delay: finalConfig.animations.stagger * 2,
        duration: finalConfig.animations.duration,
        animation: 'fadeInUp',
        easing: finalConfig.animations.easing,
      },
      {
        element: '.premium-hero__content p',
        delay: finalConfig.animations.stagger * 3,
        duration: finalConfig.animations.duration,
        animation: 'fadeInUp',
        easing: finalConfig.animations.easing,
      },
      {
        element: '.premium-hero__stats',
        delay: finalConfig.animations.stagger * 4,
        duration: finalConfig.animations.duration,
        animation: 'fadeInUp',
        easing: finalConfig.animations.easing,
      },
      {
        element: '.premium-hero__actions',
        delay: finalConfig.animations.stagger * 5,
        duration: finalConfig.animations.duration,
        animation: 'fadeInUp',
        easing: finalConfig.animations.easing,
      },
    ]

    animationTimeline.value = {
      sequence: timeline,
      totalDuration: Math.max(...timeline.map(item => item.delay + item.duration)),
      isPlaying: false,
    }
  }

  /**
   * Play entrance animations
   */
  const playEntranceAnimations = async () => {
    if (!animationsEnabled.value || !heroRef.value || animationTimeline.value.isPlaying) {
      return
    }

    animationTimeline.value.isPlaying = true

    try {
      const promises = animationTimeline.value.sequence.map(async item => {
        const elements = heroRef.value.querySelectorAll(item.element)

        if (elements.length === 0) return

        // Wait for delay
        await new Promise(resolve => setTimeout(resolve, item.delay))

        // Animate each element
        const animationPromises = Array.from(elements).map(element => {
          return animateElement(element, item.animation, {
            duration: item.duration,
            easing: item.easing,
          })
        })

        return Promise.all(animationPromises)
      })

      await Promise.all(promises)
    } catch (error) {
      console.warn('Animation failed:', error)
    } finally {
      animationTimeline.value.isPlaying = false
    }
  }

  /**
   * Animate individual element
   */
  const animateElement = (element, animationType, options) => {
    return new Promise(resolve => {
      if (!element || !animationsEnabled.value) {
        resolve()
        return
      }

      const animations = {
        fadeInUp: [
          { opacity: 0, transform: 'translateY(30px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        fadeIn: [{ opacity: 0 }, { opacity: 1 }],
        scaleIn: [
          { opacity: 0, transform: 'scale(0.95)' },
          { opacity: 1, transform: 'scale(1)' },
        ],
      }

      const keyframes = animations[animationType] || animations.fadeInUp

      try {
        const animation = element.animate(keyframes, {
          duration: options.duration,
          easing: options.easing,
          fill: 'forwards',
        })

        animation.addEventListener('finish', resolve)
        animation.addEventListener('cancel', resolve)
      } catch (error) {
        // Fallback to CSS transitions
        element.style.transition = `all ${options.duration}ms ${options.easing}`
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
        setTimeout(resolve, options.duration)
      }
    })
  }

  // ===== ERROR HANDLING =====

  /**
   * Handle image loading errors
   */
  const handleImageError = event => {
    const img = event.target
    if (img && !img.src.includes('profile-photo.svg')) {
      img.src = '/profile-photo.svg'
      console.warn('Profile image failed to load, using fallback')
    }
  }

  // ===== INITIALIZATION =====

  /**
   * Initialize animations and event listeners
   */
  const initializeAnimations = () => {
    createAnimationTimeline()

    if (finalConfig.mouse.enabled && heroRef.value) {
      heroRef.value.addEventListener('mousemove', handleMouseMove, { passive: true })
    }
  }

  /**
   * Cleanup function
   */
  const cleanup = () => {
    stopIntersectionObserver()

    if (heroRef.value) {
      heroRef.value.removeEventListener('mousemove', handleMouseMove)
    }
  }

  // ===== UTILITY FUNCTIONS =====

  /**
   * Get current theme from document
   */
  const getCurrentTheme = () => {
    return document.documentElement.dataset.theme || 'professional-dark'
  }

  /**
   * Check if animations should be enabled
   */
  const shouldAnimate = () => {
    return animationsEnabled.value && isVisible.value
  }

  /**
   * Performance monitoring
   */
  const performanceMetrics = ref({
    loadTime: 0,
    animationTime: 0,
    renderTime: 0,
  })

  const measurePerformance = (metric, startTime) => {
    const endTime = performance.now()
    performanceMetrics.value[metric] = endTime - startTime

    // Log performance warnings if needed
    if (performanceMetrics.value[metric] > 100) {
      console.warn(`Premium Hero ${metric} took ${performanceMetrics.value[metric].toFixed(2)}ms`)
    }
  }

  /**
   * Optimize images for current viewport
   */
  const getOptimalImageSize = () => {
    const width = window.innerWidth
    if (width >= 1280) return '140w'
    if (width >= 1024) return '120w'
    if (width >= 768) return '100w'
    return '80w'
  }

  // ===== RETURN API =====

  return {
    // Reactive state
    heroRef,
    mousePosition,
    isVisible,
    animationTimeline,
    animationsEnabled,
    performanceMetrics,

    // Methods
    handleImageError,
    initializeAnimations,
    playEntranceAnimations,
    cleanup,

    // Utilities
    getCurrentTheme,
    shouldAnimate,
    measurePerformance,
    getOptimalImageSize,

    // Configuration
    config: finalConfig,
  }
}

/**
 * Animation configuration builder
 */
export class PremiumHeroConfigBuilder {
  constructor() {
    this.config = { ...DEFAULT_CONFIG }
  }

  setAnimationDuration(duration) {
    this.config.animations.duration = duration
    return this
  }

  setAnimationStagger(stagger) {
    this.config.animations.stagger = stagger
    return this
  }

  setAnimationEasing(easing) {
    this.config.animations.easing = easing
    return this
  }

  enableMouse(enabled = true) {
    this.config.mouse.enabled = enabled
    return this
  }

  setParticleCount(count) {
    this.config.particles.count = count
    return this
  }

  build() {
    return { ...this.config }
  }
}

/**
 * Factory function for creating premium hero configurations
 */
export function createPremiumHeroConfig() {
  return new PremiumHeroConfigBuilder()
}
