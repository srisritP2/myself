import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { prefersReducedMotion } from '@/utils/animations'

/**
 * UI store for managing global UI state
 */
export const useUIStore = defineStore('ui', () => {
  // State
  const theme = ref(localStorage.getItem('theme') || 'professional-dark')
  const darkMode = ref(localStorage.getItem('darkMode') === 'true' || false)
  const notifications = ref([])
  const modals = ref([])
  const loading = ref(false)
  const loadingMessage = ref('')

  // Available themes
  const availableThemes = ref([
    {
      name: 'professional-dark',
      displayName: 'Professional Dark',
      description: 'Deep navy with teal and amber accents',
      primaryColor: '#2d3e50',
      secondaryColor: '#14b8a6',
      accentColor: '#f59e0b',
    },
    {
      name: 'creative-gradient',
      displayName: 'Creative Gradient',
      description: 'Purple and blue gradients with pink accents',
      primaryColor: '#8b5cf6',
      secondaryColor: '#3b82f6',
      accentColor: '#ec4899',
    },
    {
      name: 'minimal-elegant',
      displayName: 'Minimal Elegant',
      description: 'Clean slate with blue and red accents',
      primaryColor: '#475569',
      secondaryColor: '#3b82f6',
      accentColor: '#ef4444',
    },
    {
      name: 'warm-professional',
      displayName: 'Warm Professional',
      description: 'Warm grays with orange and amber',
      primaryColor: '#78716c',
      secondaryColor: '#ea580c',
      accentColor: '#d97706',
    },
  ])

  // Animation settings
  const animationSettings = ref(
    JSON.parse(localStorage.getItem('animationSettings')) || {
      enabled: !prefersReducedMotion(),
      speed: 1, // 0: Slow, 1: Normal, 2: Fast
    }
  )

  // Actions
  /**
   * Toggle between light and dark mode for current theme
   */
  function toggleTheme() {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', darkMode.value.toString())
    applyTheme()
  }

  /**
   * Set specific theme
   * @param {string} themeName - Theme name to set
   */
  function setTheme(themeName) {
    if (availableThemes.value.find(t => t.name === themeName)) {
      theme.value = themeName
      localStorage.setItem('theme', themeName)
      applyTheme()
    }
  }

  /**
   * Toggle dark mode for current theme
   */
  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', darkMode.value.toString())
    applyTheme()
  }

  /**
   * Set dark mode state
   * @param {boolean} isDark - Whether to enable dark mode
   */
  function setDarkMode(isDark) {
    darkMode.value = isDark
    localStorage.setItem('darkMode', isDark.toString())
    applyTheme()
  }

  /**
   * Apply the current theme to the document
   */
  function applyTheme() {
    // Add theme switching class to prevent transitions during theme change
    document.documentElement.classList.add('theme-switching')

    // Set theme attribute
    document.documentElement.setAttribute('data-theme', theme.value)

    // Set dark mode attribute
    if (darkMode.value) {
      document.documentElement.setAttribute('data-mode', 'dark')
    } else {
      document.documentElement.removeAttribute('data-mode')
    }

    // Remove theme switching class after a brief delay
    setTimeout(() => {
      document.documentElement.classList.remove('theme-switching')
    }, 50)
  }

  /**
   * Initialize theme system
   */
  function initializeTheme() {
    // Check for system preference if no saved preference
    if (!localStorage.getItem('theme')) {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemDark) {
        setDarkMode(true)
      }
    }

    // Apply the current theme
    applyTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', e => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('darkMode')) {
        setDarkMode(e.matches)
      }
    })
  }

  /**
   * Get current theme object
   */
  const currentTheme = computed(() => {
    return availableThemes.value.find(t => t.name === theme.value) || availableThemes.value[0]
  })

  /**
   * Show notification
   * @param {Object} notification - Notification object
   * @param {string} notification.type - Notification type (success, error, warning, info)
   * @param {string} notification.title - Notification title
   * @param {string} [notification.message] - Notification message
   * @param {number} [notification.duration] - Auto-dismiss duration in ms
   */
  function showNotification(notification) {
    const id = Date.now().toString()
    const newNotification = {
      id,
      type: notification.type || 'info',
      title: notification.title,
      message: notification.message,
      duration: notification.duration || 5000,
      persistent: notification.persistent || false,
    }

    notifications.value.push(newNotification)

    // Auto-dismiss if not persistent
    if (!newNotification.persistent && newNotification.duration > 0) {
      setTimeout(() => {
        dismissNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  /**
   * Dismiss notification by ID
   * @param {string} id - Notification ID
   */
  function dismissNotification(id) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  /**
   * Clear all notifications
   */
  function clearNotifications() {
    notifications.value = []
  }

  /**
   * Show success notification
   * @param {string} title - Success title
   * @param {string} [message] - Success message
   */
  function showSuccess(title, message) {
    return showNotification({
      type: 'success',
      title,
      message,
    })
  }

  /**
   * Show error notification
   * @param {string} title - Error title
   * @param {string} [message] - Error message
   */
  function showError(title, message) {
    return showNotification({
      type: 'error',
      title,
      message,
      duration: 8000, // Longer duration for errors
    })
  }

  /**
   * Show warning notification
   * @param {string} title - Warning title
   * @param {string} [message] - Warning message
   */
  function showWarning(title, message) {
    return showNotification({
      type: 'warning',
      title,
      message,
    })
  }

  /**
   * Show info notification
   * @param {string} title - Info title
   * @param {string} [message] - Info message
   */
  function showInfo(title, message) {
    return showNotification({
      type: 'info',
      title,
      message,
    })
  }

  /**
   * Open modal
   * @param {Object} modal - Modal configuration
   * @param {string} modal.component - Component name to render
   * @param {Object} [modal.props] - Props to pass to component
   * @param {boolean} [modal.persistent] - Whether modal is persistent
   */
  function openModal(modal) {
    const id = Date.now().toString()
    const newModal = {
      id,
      component: modal.component,
      props: modal.props || {},
      persistent: modal.persistent || false,
    }

    modals.value.push(newModal)
    return id
  }

  /**
   * Close modal by ID
   * @param {string} id - Modal ID
   */
  function closeModal(id) {
    const index = modals.value.findIndex(m => m.id === id)
    if (index > -1) {
      modals.value.splice(index, 1)
    }
  }

  /**
   * Close all modals
   */
  function closeAllModals() {
    modals.value = []
  }

  /**
   * Set global loading state
   * @param {boolean} isLoading - Loading state
   * @param {string} [message] - Loading message
   */
  function setLoading(isLoading, message = '') {
    loading.value = isLoading
    loadingMessage.value = message
  }

  /**
   * Set animation settings
   * @param {Object} settings - Animation settings
   * @param {boolean} settings.enabled - Whether animations are enabled
   * @param {number} settings.speed - Animation speed (0: Slow, 1: Normal, 2: Fast)
   */
  function setAnimationSettings(settings) {
    animationSettings.value = {
      ...animationSettings.value,
      ...settings,
    }
    localStorage.setItem('animationSettings', JSON.stringify(animationSettings.value))

    // Apply animation speed to CSS variables
    document.documentElement.style.setProperty(
      '--animation-speed-multiplier',
      getSpeedMultiplier(animationSettings.value.speed)
    )
  }

  /**
   * Get animation speed multiplier based on speed setting
   * @param {number} speed - Speed setting (0: Slow, 1: Normal, 2: Fast)
   * @returns {number} Speed multiplier
   */
  function getSpeedMultiplier(speed) {
    switch (speed) {
      case 0:
        return 1.5 // Slow
      case 2:
        return 0.65 // Fast
      default:
        return 1 // Normal
    }
  }

  /**
   * Check if animations should be enabled based on settings and system preferences
   * @returns {boolean} Whether animations should be enabled
   */
  const shouldEnableAnimations = computed(() => {
    // If system prefers reduced motion, respect that unless explicitly overridden
    if (prefersReducedMotion() && !animationSettings.value.overrideReducedMotion) {
      return false
    }

    // Otherwise use user setting
    return animationSettings.value.enabled
  })

  // Initialize animation speed CSS variable
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(
      '--animation-speed-multiplier',
      getSpeedMultiplier(animationSettings.value.speed)
    )
  }

  return {
    // State
    theme,
    darkMode,
    availableThemes,
    currentTheme,
    notifications,
    modals,
    loading,
    loadingMessage,
    animationSettings,
    shouldEnableAnimations,
    // Actions
    toggleTheme,
    toggleDarkMode,
    setTheme,
    setDarkMode,
    applyTheme,
    initializeTheme,
    showNotification,
    dismissNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    openModal,
    closeModal,
    closeAllModals,
    setLoading,
    setAnimationSettings,
  }
})
