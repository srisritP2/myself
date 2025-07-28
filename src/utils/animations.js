/**
 * Animation Utilities
 *
 * This module provides reusable animation functions for creating smooth,
 * performant animations throughout the application.
 *
 * @author Portfolio Team
 * @version 1.0.0
 */

/**
 * Checks if the user prefers reduced motion
 *
 * @returns {boolean} True if user prefers reduced motion
 *
 * @example
 * // Check if animations should be disabled
 * if (prefersReducedMotion()) {
 *   // Skip animations
 * }
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false

  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (error) {
    console.warn('prefersReducedMotion: Error checking motion preference:', error)
    return false
  }
}

/**
 * Easing functions for smooth animations
 * These functions provide different animation curves for various use cases
 */
export const EasingFunctions = {
  /**
   * Ease out quart - Starts fast, ends slow (good for counters)
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased progress value
   */
  easeOutQuart: t => 1 - Math.pow(1 - t, 4),

  /**
   * Ease in out cubic - Smooth acceleration and deceleration
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased progress value
   */
  easeInOutCubic: t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),

  /**
   * Ease out bounce - Bouncy ending effect
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased progress value
   */
  easeOutBounce: t => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
    }
  },
}

/**
 * Animates a reactive reference from start value to target value
 *
 * @param {import('vue').Ref<number>} reactiveRef - Vue reactive reference to animate
 * @param {number} targetValue - Final value to animate to
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} easingFunction - Easing function to use (default: easeOutQuart)
 * @param {number} startValue - Starting value (default: 0)
 * @returns {Promise<void>} Promise that resolves when animation completes
 *
 * @example
 * // Animate a counter from 0 to 100 over 2 seconds
 * const counter = ref(0)
 * await animateNumber(counter, 100, 2000)
 */
export function animateNumber(
  reactiveRef,
  targetValue,
  duration = 1000,
  easingFunction = EasingFunctions.easeOutQuart,
  startValue = 0
) {
  return new Promise(resolve => {
    // Validate inputs
    if (!reactiveRef || typeof reactiveRef.value !== 'number') {
      console.warn('animateNumber: Invalid reactive reference provided')
      resolve()
      return
    }

    if (typeof targetValue !== 'number' || typeof duration !== 'number') {
      console.warn('animateNumber: Invalid target value or duration')
      resolve()
      return
    }

    const startTime = Date.now()
    let animationId

    /**
     * Animation update function called on each frame
     */
    function update() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Apply easing function
      const easedProgress = easingFunction(progress)

      // Calculate current value
      const currentValue = startValue + (targetValue - startValue) * easedProgress
      reactiveRef.value = Math.floor(currentValue)

      // Continue animation or resolve
      if (progress < 1) {
        animationId = requestAnimationFrame(update)
      } else {
        reactiveRef.value = targetValue // Ensure final value is exact
        resolve()
      }
    }

    // Start animation
    animationId = requestAnimationFrame(update)

    // Return cleanup function for potential cancellation
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  })
}

/**
 * Creates a staggered animation sequence for multiple elements
 *
 * @param {Array<{ref: import('vue').Ref<number>, target: number}>} animations - Array of animation configs
 * @param {number} staggerDelay - Delay between each animation start (ms)
 * @param {number} duration - Duration for each animation (ms)
 * @param {Function} easingFunction - Easing function to use
 * @returns {Promise<void>} Promise that resolves when all animations complete
 *
 * @example
 * // Animate multiple counters with staggered timing
 * await animateNumbersStaggered([
 *   { ref: yearsRef, target: 8 },
 *   { ref: projectsRef, target: 50 },
 *   { ref: clientsRef, target: 25 }
 * ], 200, 2000)
 */
export async function animateNumbersStaggered(
  animations,
  staggerDelay = 100,
  duration = 1000,
  easingFunction = EasingFunctions.easeOutQuart
) {
  const promises = animations.map((animation, index) => {
    return new Promise(resolve => {
      setTimeout(() => {
        animateNumber(animation.ref, animation.target, duration, easingFunction).then(resolve)
      }, index * staggerDelay)
    })
  })

  return Promise.all(promises)
}

/**
 * Creates a mouse tracking utility for parallax effects
 *
 * @param {string} containerSelector - CSS selector for the container element
 * @param {import('vue').Ref<{x: number, y: number}>} positionRef - Reactive reference for position
 * @returns {Function} Cleanup function to remove event listener
 *
 * @example
 * // Track mouse position relative to hero section
 * const mousePos = ref({ x: 0, y: 0 })
 * const cleanup = createMouseTracker('.hero-section', mousePos)
 * // Call cleanup() when component unmounts
 */
export function createMouseTracker(containerSelector, positionRef) {
  /**
   * Mouse move event handler
   * @param {MouseEvent} event - Mouse event
   */
  function handleMouseMove(event) {
    const container = document.querySelector(containerSelector)
    if (!container) return

    const rect = container.getBoundingClientRect()
    positionRef.value = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    }
  }

  // Add event listener
  document.addEventListener('mousemove', handleMouseMove, { passive: true })

  // Return cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove)
  }
}
