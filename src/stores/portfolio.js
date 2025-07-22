import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Portfolio store for managing portfolio data and requests
 */
export const usePortfolioStore = defineStore('portfolio', () => {
  // State
  const currentPortfolio = ref(null)
  const portfolioRequests = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Actions
  /**
   * Submit portfolio request
   * @param {Object} formData - Portfolio request data
   */
  async function submitPortfolioRequest(formData) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request')
      }

      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch portfolio requests (admin only)
   */
  async function fetchPortfolioRequests() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch requests')
      }

      portfolioRequests.value = data.data || []
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update portfolio request status
   * @param {string} requestId - Request ID
   * @param {string} status - New status
   */
  async function updateRequestStatus(requestId, status) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ status }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status')
      }

      // Update local state
      const requestIndex = portfolioRequests.value.findIndex(r => r.id === requestId)
      if (requestIndex > -1) {
        portfolioRequests.value[requestIndex] = { ...portfolioRequests.value[requestIndex], status }
      }

      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete portfolio request
   * @param {string} requestId - Request ID
   */
  async function deleteRequest(requestId) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete request')
      }

      // Remove from local state
      portfolioRequests.value = portfolioRequests.value.filter(r => r.id !== requestId)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch portfolio by slug
   * @param {string} slug - Portfolio slug
   */
  async function fetchPortfolio(slug) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/portfolios/${slug}`)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Portfolio not found')
      }

      currentPortfolio.value = data.data
      return data.data
    } catch (err) {
      error.value = err.message
      throw err
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

  /**
   * Reset store state
   */
  function reset() {
    currentPortfolio.value = null
    portfolioRequests.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    currentPortfolio,
    portfolioRequests,
    loading,
    error,
    // Actions
    submitPortfolioRequest,
    fetchPortfolioRequests,
    updateRequestStatus,
    deleteRequest,
    fetchPortfolio,
    clearError,
    reset,
  }
})
