/**
 * DOM Utilities
 *
 * This module provides reusable DOM manipulation functions with proper
 * error handling and performance optimizations.
 *
 * @author Portfolio Team
 * @version 1.0.0
 */

/**
 * Safely scrolls to an element with smooth behavior
 *
 * @param {string} selector - CSS selector for the target element
 * @param {ScrollBehavior} behavior - Scroll behavior ('smooth' | 'instant' | 'auto')
 * @param {string} block - Vertical alignment ('start' | 'center' | 'end' | 'nearest')
 * @returns {boolean} True if scroll was successful, false otherwise
 *
 * @example
 * // Scroll to contact section smoothly
 * scrollToElement('#contact', 'smooth', 'start')
 */
export function scrollToElement(selector, behavior = 'smooth', block = 'start') {
  try {
    const element = document.querySelector(selector)

    if (!element) {
      console.warn(`scrollToElement: Element with selector "${selector}" not found`)
      return false
    }

    element.scrollIntoView({
      behavior,
      block,
      inline: 'nearest',
    })

    return true
  } catch (error) {
    console.error('scrollToElement: Error occurred during scroll:', error)
    return false
  }
}

/**
 * Creates and triggers a file download
 *
 * @param {string} url - URL of the file to download
 * @param {string} filename - Desired filename for the download
 * @param {boolean} openInNewTab - Whether to open in new tab if download fails
 * @returns {boolean} True if download was triggered successfully
 *
 * @example
 * // Download resume PDF
 * downloadFile('/resume.pdf', 'John_Doe_Resume.pdf')
 */
export function downloadFile(url, filename, openInNewTab = false) {
  try {
    if (!url) {
      console.warn('downloadFile: No URL provided')
      return false
    }

    // Create temporary anchor element
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'download'
    link.style.display = 'none'

    // Add to DOM, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return true
  } catch (error) {
    console.error('downloadFile: Error occurred during download:', error)

    // Fallback: open in new tab
    if (openInNewTab && url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    return false
  }
}

/**
 * Safely gets element dimensions and position
 *
 * @param {string} selector - CSS selector for the element
 * @returns {DOMRect | null} Element's bounding rectangle or null if not found
 *
 * @example
 * // Get hero section dimensions
 * const heroRect = getElementRect('.hero-section')
 * if (heroRect) {
 *   console.log('Width:', heroRect.width)
 * }
 */
export function getElementRect(selector) {
  try {
    const element = document.querySelector(selector)
    return element ? element.getBoundingClientRect() : null
  } catch (error) {
    console.error('getElementRect: Error getting element rect:', error)
    return null
  }
}

/**
 * Checks if an element is visible in the viewport
 *
 * @param {string} selector - CSS selector for the element
 * @param {number} threshold - Percentage of element that must be visible (0-1)
 * @returns {boolean} True if element is visible
 *
 * @example
 * // Check if hero section is 50% visible
 * const isVisible = isElementVisible('.hero-section', 0.5)
 */
export function isElementVisible(selector, threshold = 0) {
  try {
    const element = document.querySelector(selector)
    if (!element) return false

    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth

    const verticalVisible = rect.top < windowHeight && rect.bottom > 0
    const horizontalVisible = rect.left < windowWidth && rect.right > 0

    if (!verticalVisible || !horizontalVisible) return false

    // Calculate visible percentage
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0)
    const visibleArea = visibleHeight * visibleWidth
    const totalArea = rect.height * rect.width

    return visibleArea / totalArea >= threshold
  } catch (error) {
    console.error('isElementVisible: Error checking visibility:', error)
    return false
  }
}

/**
 * Debounces a function to prevent excessive calls
 *
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 *
 * @example
 * // Debounce scroll handler
 * const debouncedScroll = debounce(handleScroll, 100)
 * window.addEventListener('scroll', debouncedScroll)
 */
export function debounce(func, delay) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * Throttles a function to limit execution frequency
 *
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 *
 * @example
 * // Throttle mouse move handler
 * const throttledMouseMove = throttle(handleMouseMove, 16) // ~60fps
 * document.addEventListener('mousemove', throttledMouseMove)
 */
export function throttle(func, limit) {
  let inThrottle

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
