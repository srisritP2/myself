<template>
  <div class="premium-form-container">
    <div class="form-header">
      <div class="form-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h2 class="form-title">Share Your Details</h2>
      <p class="form-subtitle">Let's create something amazing together</p>
    </div>

    <form @submit.prevent="submitForm" class="premium-form" ref="formRef">
      <div class="form-fields">
        <!-- First Name -->
        <div class="form-field">
          <label for="firstName" class="field-label">First Name</label>
          <input
            v-model="form.firstName"
            type="text"
            id="firstName"
            class="field-input"
            placeholder="Enter your first name"
            :disabled="isSubmitting"
            autocomplete="given-name"
          />
          <div v-if="errors.firstName" class="field-error">{{ errors.firstName }}</div>
        </div>

        <!-- Last Name -->
        <div class="form-field">
          <label for="lastName" class="field-label">Last Name</label>
          <input
            v-model="form.lastName"
            type="text"
            id="lastName"
            class="field-input"
            placeholder="Enter your last name"
            :disabled="isSubmitting"
            autocomplete="family-name"
          />
          <div v-if="errors.lastName" class="field-error">{{ errors.lastName }}</div>
        </div>

        <!-- Email -->
        <div class="form-field form-field--full">
          <label for="email" class="field-label">Contact Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="field-input"
            placeholder="Enter your email address"
            :disabled="isSubmitting"
            autocomplete="email"
          />
          <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
        </div>

        <!-- Resume Header -->
        <div class="form-field form-field--full">
          <label for="resumeHeader" class="field-label">Resume Header</label>
          <input
            v-model="form.resumeHeader"
            type="text"
            id="resumeHeader"
            class="field-input"
            placeholder="e.g. QA Lead, Frontend Developer"
            :disabled="isSubmitting"
          />
          <div v-if="errors.resumeHeader" class="field-error">{{ errors.resumeHeader }}</div>
        </div>

        <!-- Skills -->
        <div class="form-field form-field--full">
          <label for="skills" class="field-label">Skills</label>
          <textarea
            v-model="form.skills"
            id="skills"
            class="field-input field-textarea"
            placeholder="JavaScript, Vue.js, Node.js, Python..."
            :disabled="isSubmitting"
            rows="4"
          ></textarea>
          <div v-if="errors.skills" class="field-error">{{ errors.skills }}</div>
        </div>
      </div>

      <!-- Honeypot field -->
      <input
        v-model="form._gotcha"
        type="text"
        name="_gotcha"
        style="display: none"
        tabindex="-1"
        autocomplete="off"
      />

      <!-- Submit Button -->
      <div class="form-actions">
        <button
          type="submit"
          class="submit-btn"
          :class="{ 'submit-btn--loading': isSubmitting }"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting" class="btn-content">
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
            </svg>
            Submit Request
          </span>
          <span v-else class="btn-loading">
            <div class="loading-spinner"></div>
            Submitting...
          </span>
        </button>
      </div>
    </form>

    <!-- Success State -->
    <div v-if="success" class="form-status form-status--success">
      <div class="status-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
        </svg>
      </div>
      <div class="status-content">
        <h3 class="status-title">Thank you!</h3>
        <p class="status-message">We'll contact you soon to discuss your portfolio.</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="form-status form-status--error">
      <div class="status-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div class="status-content">
        <h3 class="status-title">Submission Failed</h3>
        <p class="status-message">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  resumeHeader: '',
  skills: '',
  _gotcha: '', // honeypot
})

const formRef = ref()
const success = ref(false)
const error = ref(false)
const errorMsg = ref('')
const isSubmitting = ref(false)

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  resumeHeader: '',
  skills: '',
})

// Validate form fields
function validateForm() {
  let isValid = true
  errors.value = {
    firstName: '',
    lastName: '',
    email: '',
    resumeHeader: '',
    skills: '',
  }

  // First name validation
  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }

  // Last name validation
  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  // Resume header validation
  if (!form.value.resumeHeader.trim()) {
    errors.value.resumeHeader = 'Resume header is required'
    isValid = false
  }

  // Skills validation
  if (!form.value.skills.trim()) {
    errors.value.skills = 'Please enter at least one skill'
    isValid = false
  }

  return isValid
}

async function submitForm() {
  // Reset status
  success.value = false
  error.value = false
  errorMsg.value = ''

  // Validate form
  if (!validateForm()) {
    return
  }

  // Check honeypot
  if (form.value._gotcha) {
    console.log('Bot submission detected')
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch('http://localhost:3001/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    const result = await response.json()

    if (result.success) {
      success.value = true
      resetForm()
      uiStore.showSuccess(
        'Submission Successful',
        'Thank you for your interest! We will contact you soon.'
      )
    } else {
      error.value = true
      errorMsg.value = result.error || 'Submission failed. Please try again.'
      uiStore.showError('Submission Failed', errorMsg.value)
    }
  } catch (err) {
    error.value = true
    errorMsg.value = 'Network error. Please check your connection and try again.'
    uiStore.showError('Connection Error', errorMsg.value)
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    resumeHeader: '',
    skills: '',
    _gotcha: '',
  }
}
</script>

<style scoped>
/* Premium Form Container */
.premium-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-8);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Form Header */
.form-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.form-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(99, 102, 241, 0.15);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
  color: #6366f1;
  margin-bottom: var(--space-4);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.form-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
  line-height: 1.2;
}

.form-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* Form Fields */
.form-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-field--full {
  grid-column: 1 / -1;
}

.field-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: var(--space-1);
}

.field-input {
  width: 100%;
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: var(--text-base);
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
}

.field-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow:
    0 0 0 3px rgba(99, 102, 241, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.1);
}

.field-input::placeholder {
  color: white;
  opacity: 0.8;
}

.field-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.field-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.field-error {
  font-size: var(--text-sm);
  color: #ef4444;
  margin-top: var(--space-1);
}

/* Submit Button */
.form-actions {
  display: flex;
  justify-content: center;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
  min-height: 48px;
  box-shadow:
    0 4px 12px rgba(99, 102, 241, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #5855eb, #7c3aed);
  transform: translateY(-2px);
  box-shadow:
    0 6px 20px rgba(99, 102, 241, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.15);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-content,
.btn-loading {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.btn-icon {
  transition: transform 0.2s ease;
}

.submit-btn:hover .btn-icon {
  transform: translateX(2px);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Status Messages */
.form-status {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  margin-top: var(--space-6);
  backdrop-filter: blur(10px);
}

.form-status--success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.form-status--error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
}

.status-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-content {
  flex: 1;
}

.status-title {
  font-size: var(--text-lg);
  font-weight: 600;
  margin: 0 0 var(--space-1) 0;
}

.status-message {
  font-size: var(--text-base);
  margin: 0;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .premium-form-container {
    margin: var(--space-4);
    padding: var(--space-6);
  }

  .form-fields {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .form-field--full {
    grid-column: 1;
  }

  .form-title {
    font-size: var(--text-2xl);
  }

  .form-subtitle {
    font-size: var(--text-base);
  }

  .submit-btn {
    width: 100%;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .premium-form-container {
    margin: var(--space-2);
    padding: var(--space-4);
  }

  .form-header {
    margin-bottom: var(--space-6);
  }

  .form-icon {
    width: 56px;
    height: 56px;
  }
}

/* Theme Support */
:root[data-theme='creative-gradient'] .premium-form-container {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

:root[data-theme='professional-dark'] .premium-form-container {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}
</style>
