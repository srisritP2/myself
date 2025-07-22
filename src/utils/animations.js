/**
 * Animation utilities for smooth transitions and motion
 * Includes support for reduced motion preferences
 */

/**
 * Check if the user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Animation timing functions for different effects
 */
export const timingFunctions = {
  // Standard easing curves
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design standard
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)', // For elements entering the screen
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // For elements leaving the screen
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)', // For elements that quickly accelerate and decelerate

  // Custom easing curves for more dynamic feel
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Slight overshoot with bounce back
  spring: 'cubic-bezier(0.5, 1.5, 0.5, 0.8)', // Spring-like motion
  smooth: 'cubic-bezier(0.25, 0.8, 0.5, 1)', // Smooth, natural motion
}

/**
 * Animation durations in milliseconds
 */
export const durations = {
  veryFast: 150,
  fast: 225,
  normal: 300,
  slow: 450,
  verySlow: 600,
}

/**
 * Get appropriate animation duration based on motion preference
 * @param {number} duration - Original duration in ms
 * @returns {number} Adjusted duration based on user preference
 */
export function getAnimationDuration(duration) {
  if (prefersReducedMotion()) {
    return Math.min(duration, durations.fast) // Cap at fast duration for reduced motion
  }
  return duration
}

/**
 * Create CSS transition string with appropriate duration
 * @param {string} properties - CSS properties to animate
 * @param {number} duration - Duration in ms
 * @param {string} easing - Timing function
 * @returns {string} CSS transition value
 */
export function createTransition(properties, duration, easing = timingFunctions.easeInOut) {
  const adjustedDuration = getAnimationDuration(duration)
  return `${properties} ${adjustedDuration}ms ${easing}`
}

/**
 * Animation presets for common UI patterns
 */
export const animationPresets = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    transition: createTransition('opacity', durations.normal, timingFunctions.easeOut),
  },

  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
    transition: createTransition('opacity', durations.normal, timingFunctions.easeIn),
  },

  slideInUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    transition: createTransition('transform, opacity', durations.normal, timingFunctions.easeOut),
  },

  slideInDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    transition: createTransition('transform, opacity', durations.normal, timingFunctions.easeOut),
  },

  slideInLeft: {
    from: { transform: 'translateX(-20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
    transition: createTransition('transform, opacity', durations.normal, timingFunctions.easeOut),
  },

  slideInRight: {
    from: { transform: 'translateX(20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
    transition: createTransition('transform, opacity', durations.normal, timingFunctions.easeOut),
  },

  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    transition: createTransition('transform, opacity', durations.normal, timingFunctions.easeOut),
  },

  scaleOut: {
    from: { transform: 'scale(1)', opacity: 1 },
    to: { transform: 'scale(0.95)', opacity: 0 },
    transition: createTransition('transform, opacity', durations.normal, timingFunctions.easeIn),
  },

  // More complex animations
  cardHover: {
    from: { transform: 'translateY(0) scale(1)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    to: { transform: 'translateY(-5px) scale(1.01)', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' },
    transition: createTransition('transform, box-shadow', durations.fast, timingFunctions.easeOut),
  },

  buttonPress: {
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(0.98)' },
    transition: createTransition('transform', durations.veryFast, timingFunctions.easeOut),
  },

  pulse: {
    keyframes: [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(1.05)', opacity: 0.8 },
      { transform: 'scale(1)', opacity: 1 },
    ],
    options: {
      duration: getAnimationDuration(durations.slow),
      easing: timingFunctions.easeInOut,
      iterations: 1,
    },
  },
}

/**
 * Create a Vue directive for applying animations
 * @param {Object} app - Vue app instance
 */
export function registerAnimationDirectives(app) {
  // v-animate directive for applying animation presets
  app.directive('animate', {
    mounted(el, binding) {
      if (prefersReducedMotion() && binding.modifiers.skip) {
        return // Skip animation if user prefers reduced motion and skip modifier is present
      }

      const preset = binding.value || 'fadeIn'
      const delay = binding.modifiers.delay ? 100 : 0

      // Apply initial state
      if (animationPresets[preset]) {
        Object.entries(animationPresets[preset].from).forEach(([prop, value]) => {
          el.style[prop] = value
        })

        // Apply transition
        el.style.transition = animationPresets[preset].transition

        // Apply final state after delay
        setTimeout(() => {
          Object.entries(animationPresets[preset].to).forEach(([prop, value]) => {
            el.style[prop] = value
          })
        }, delay)
      }
    },
  })

  // v-motion directive for intersection observer based animations
  app.directive('motion', {
    mounted(el, binding) {
      if (prefersReducedMotion() && binding.modifiers.skip) {
        // If reduced motion is preferred and skip modifier is present, apply final state immediately
        const preset = binding.value || 'fadeIn'
        if (animationPresets[preset]) {
          Object.entries(animationPresets[preset].to).forEach(([prop, value]) => {
            el.style[prop] = value
          })
        }
        return
      }

      const preset = binding.value || 'fadeIn'
      const threshold = binding.modifiers.eager ? 0.1 : 0.2

      // Apply initial state
      if (animationPresets[preset]) {
        Object.entries(animationPresets[preset].from).forEach(([prop, value]) => {
          el.style[prop] = value
        })

        // Apply transition
        el.style.transition = animationPresets[preset].transition

        // Create intersection observer
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Apply final state when element enters viewport
                Object.entries(animationPresets[preset].to).forEach(([prop, value]) => {
                  el.style[prop] = value
                })
                observer.unobserve(el)
              }
            })
          },
          { threshold }
        )

        observer.observe(el)
      }
    },
  })
}

/**
 * Apply Web Animation API animation
 * @param {HTMLElement} element - Element to animate
 * @param {string} preset - Animation preset name
 * @param {Object} options - Animation options
 * @returns {Animation} Web Animation instance
 */
export function applyAnimation(element, preset, options = {}) {
  if (prefersReducedMotion() && options.skipOnReducedMotion) {
    return null
  }

  const animationPreset = animationPresets[preset]
  if (!animationPreset || !animationPreset.keyframes) {
    console.warn(`Animation preset "${preset}" not found or doesn't have keyframes`)
    return null
  }

  const animationOptions = {
    ...animationPreset.options,
    ...options,
  }

  return element.animate(animationPreset.keyframes, animationOptions)
}
