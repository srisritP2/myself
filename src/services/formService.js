// Reusable form submission service
import { useUIStore } from '@/stores/ui'

class FormService {
  constructor() {
    this.baseURL = 'http://localhost:3001/api'
  }

  async submitPortfolioRequest(formData) {
    try {
      const response = await fetch(`${this.baseURL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        const uiStore = useUIStore()
        uiStore.showSuccess(
          'Submission Successful',
          'Thank you for your interest! We will contact you soon.'
        )
        return { success: true, data: result }
      } else {
        const uiStore = useUIStore()
        uiStore.showError(
          'Submission Failed',
          result.error || 'Submission failed. Please try again.'
        )
        return { success: false, error: result.error || 'Submission failed. Please try again.' }
      }
    } catch (err) {
      const uiStore = useUIStore()
      const errorMessage = 'Network error. Please check your connection and try again.'
      uiStore.showError('Connection Error', errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Generic form submission method for reusability
  async submitForm(
    endpoint,
    formData,
    successMessage = 'Form submitted successfully!',
    errorMessage = 'Submission failed. Please try again.'
  ) {
    try {
      const response = await fetch(`${this.baseURL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        const uiStore = useUIStore()
        uiStore.showSuccess('Success', successMessage)
        return { success: true, data: result }
      } else {
        const uiStore = useUIStore()
        uiStore.showError('Error', result.error || errorMessage)
        return { success: false, error: result.error || errorMessage }
      }
    } catch (err) {
      const uiStore = useUIStore()
      const networkError = 'Network error. Please check your connection and try again.'
      uiStore.showError('Connection Error', networkError)
      throw new Error(networkError)
    }
  }
}

export const formService = new FormService()
export default formService
