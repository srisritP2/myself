import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Authentication store for managing user login state
 */
export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token'))
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  /**
   * Login user with credentials
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   */
  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      token.value = data.token
      user.value = data.user
      localStorage.setItem('auth_token', data.token)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Register new user
   * @param {Object} userData - Registration data
   */
  async function register(userData) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Auto-login after registration
      token.value = data.token
      user.value = data.user
      localStorage.setItem('auth_token', data.token)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Logout current user
   */
  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
    } catch (err) {
      console.warn('Logout request failed:', err)
    } finally {
      // Clear local state regardless of API response
      user.value = null
      token.value = null
      localStorage.removeItem('auth_token')
    }
  }

  /**
   * Fetch current user profile
   */
  async function fetchProfile() {
    if (!token.value) return

    loading.value = true

    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      user.value = data.user
    } catch (err) {
      console.error('Profile fetch failed:', err)
      // If token is invalid, logout
      await logout()
    } finally {
      loading.value = false
    }
  }

  /**
   * Clear error state
   */
  function clearError() {
    error.value = null
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    // Actions
    login,
    register,
    logout,
    fetchProfile,
    clearError,
  }
})
