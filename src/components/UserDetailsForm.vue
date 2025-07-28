<template>
  <div class="modern-form-container">
    <div class="form-header">
      <div class="form-icon" :class="{ 'animate-pulse': props.enableAnimations }">
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
      <h2 class="form-title">Get Your Portfolio</h2>
      <p class="form-subtitle">Let's create something amazing together</p>
    </div>

    <form @submit.prevent="submitForm" class="modern-form" ref="formRef">
      <div class="form-grid" :class="{ 'animate-stagger': props.enableAnimations }">
        <!-- First Name Field -->
        <div class="form-field">
          <div
            class="input-group"
            :class="{
              'has-value': form.firstName,
              'has-error': errors.firstName,
              'has-success': fieldTouched.firstName && fieldValidation.firstName.isValid,
              'is-focused': focusedField === 'firstName',
            }"
          >
            <input
              v-model="form.firstName"
              type="text"
              id="firstName"
              class="form-input"
              @focus="focusedField = 'firstName'"
              @blur="focusedField = null"
              :disabled="isSubmitting"
              autocomplete="given-name"
              :aria-describedby="errors.firstName ? 'firstName-error' : null"
              :aria-invalid="!!errors.firstName"
            />
            <label for="firstName" class="form-label">First Name</label>
            <div class="input-border"></div>
            <div v-if="isSubmitting && fieldTouched.firstName" class="field-loading">
              <div class="loading-spinner"></div>
            </div>
            <div
              v-if="fieldTouched.firstName && fieldValidation.firstName.isValid && !isSubmitting"
              class="field-success"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div v-if="errors.firstName" class="error-message" id="firstName-error" role="alert">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
            {{ errors.firstName }}
          </div>
        </div>

        <!-- Last Name Field -->
        <div class="form-field">
          <div
            class="input-group"
            :class="{
              'has-value': form.lastName,
              'has-error': errors.lastName,
              'has-success': fieldTouched.lastName && fieldValidation.lastName.isValid,
              'is-focused': focusedField === 'lastName',
            }"
          >
            <input
              v-model="form.lastName"
              type="text"
              id="lastName"
              class="form-input"
              @focus="focusedField = 'lastName'"
              @blur="focusedField = null"
              :disabled="isSubmitting"
              autocomplete="family-name"
              :aria-describedby="errors.lastName ? 'lastName-error' : null"
              :aria-invalid="!!errors.lastName"
            />
            <label for="lastName" class="form-label">Last Name</label>
            <div class="input-border"></div>
            <div v-if="isSubmitting && fieldTouched.lastName" class="field-loading">
              <div class="loading-spinner"></div>
            </div>
            <div
              v-if="fieldTouched.lastName && fieldValidation.lastName.isValid && !isSubmitting"
              class="field-success"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div v-if="errors.lastName" class="error-message" id="lastName-error" role="alert">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
            {{ errors.lastName }}
          </div>
        </div>

        <!-- Email Field -->
        <div class="form-field form-field--full">
          <div
            class="input-group"
            :class="{
              'has-value': form.email,
              'has-error': errors.email,
              'has-success': fieldTouched.email && fieldValidation.email.isValid,
              'is-focused': focusedField === 'email',
            }"
          >
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="form-input"
              @focus="focusedField = 'email'"
              @blur="focusedField = null"
              :disabled="isSubmitting"
              autocomplete="email"
              :aria-describedby="errors.email ? 'email-error' : null"
              :aria-invalid="!!errors.email"
            />
            <label for="email" class="form-label">Contact Email</label>
            <div class="input-border"></div>
            <div v-if="isSubmitting && fieldTouched.email" class="field-loading">
              <div class="loading-spinner"></div>
            </div>
            <div
              v-if="fieldTouched.email && fieldValidation.email.isValid && !isSubmitting"
              class="field-success"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div v-if="errors.email" class="error-message" id="email-error" role="alert">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
            {{ errors.email }}
          </div>
        </div>

        <!-- Resume Header Field -->
        <div class="form-field form-field--full">
          <div
            class="input-group"
            :class="{
              'has-value': form.resumeHeader,
              'has-error': errors.resumeHeader,
              'has-success': fieldTouched.resumeHeader && fieldValidation.resumeHeader.isValid,
              'is-focused': focusedField === 'resumeHeader',
            }"
          >
            <input
              v-model="form.resumeHeader"
              type="text"
              id="resumeHeader"
              class="form-input"
              @focus="focusedField = 'resumeHeader'"
              @blur="focusedField = null"
              :disabled="isSubmitting"
              placeholder="e.g. QA Lead, Frontend Developer"
              :aria-describedby="errors.resumeHeader ? 'resumeHeader-error' : null"
              :aria-invalid="!!errors.resumeHeader"
            />
            <label for="resumeHeader" class="form-label">Resume Header</label>
            <div class="input-border"></div>
            <div v-if="isSubmitting && fieldTouched.resumeHeader" class="field-loading">
              <div class="loading-spinner"></div>
            </div>
            <div
              v-if="
                fieldTouched.resumeHeader && fieldValidation.resumeHeader.isValid && !isSubmitting
              "
              class="field-success"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div
            v-if="errors.resumeHeader"
            class="error-message"
            id="resumeHeader-error"
            role="alert"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
            {{ errors.resumeHeader }}
          </div>
        </div>

        <!-- Skills Field -->
        <div class="form-field form-field--full">
          <div
            class="input-group"
            :class="{
              'has-value': form.skills,
              'has-error': errors.skills,
              'is-focused': focusedField === 'skills',
            }"
          >
            <textarea
              v-model="form.skills"
              id="skills"
              class="form-input form-textarea"
              @focus="focusedField = 'skills'"
              @blur="focusedField = null"
              :disabled="isSubmitting"
              rows="4"
              placeholder="JavaScript, Vue.js, Node.js, Python..."
            ></textarea>
            <label for="skills" class="form-label">Skills (comma separated)</label>
            <div class="input-border"></div>
            <div v-if="isSubmitting && fieldTouched.skills" class="field-loading">
              <div class="loading-spinner"></div>
            </div>
          </div>
          <div v-if="errors.skills" class="error-message">
            {{ errors.skills }}
          </div>
        </div>
      </div>

      <!-- Honeypot field for spam bots (hidden from users) -->
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
          class="submit-button"
          :class="{ 'is-loading': isSubmitting }"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting" class="button-content">
            <svg
              class="button-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
            </svg>
            Submit Request
          </span>
          <span v-else class="button-loading">
            <div class="loading-spinner"></div>
            Submitting...
          </span>
        </button>
      </div>
    </form>

    <!-- Success State -->
    <div v-if="success" class="form-status form-status--success animate-fade-in">
      <div class="status-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
        </svg>
      </div>
      <div class="status-content">
        <h3 class="status-title">Thank you!</h3>
        <p class="status-message">We'll contact you soon to discuss your portfolio.</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="form-status form-status--error animate-fade-in">
      <div class="status-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
import { ref, reactive, onMounted, watch } from 'vue'
import { useUIStore } from '@/stores/ui'

const props = defineProps({
  enableAnimations: {
    type: Boolean,
    default: true,
  },
})

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
const focusedField = ref(null)

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  resumeHeader: '',
  skills: '',
})

// Track which fields have been touched for loading indicators and real-time validation
const fieldTouched = reactive({
  firstName: false,
  lastName: false,
  email: false,
  resumeHeader: false,
  skills: false,
})

// Track validation states for each field
const fieldValidation = reactive({
  firstName: { isValid: false, message: '' },
  lastName: { isValid: false, message: '' },
  email: { isValid: false, message: '' },
  resumeHeader: { isValid: false, message: '' },
  skills: { isValid: false, message: '' },
})

// Real-time field validation
function validateField(fieldName, value) {
  let isValid = true
  let message = ''

  switch (fieldName) {
    case 'firstName': {
      if (!value.trim()) {
        isValid = false
        message = 'First name is required'
      } else if (value.trim().length < 2) {
        isValid = false
        message = 'First name must be at least 2 characters'
      }
      break
    }

    case 'lastName': {
      if (!value.trim()) {
        isValid = false
        message = 'Last name is required'
      } else if (value.trim().length < 2) {
        isValid = false
        message = 'Last name must be at least 2 characters'
      }
      break
    }

    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) {
        isValid = false
        message = 'Email is required'
      } else if (!emailRegex.test(value)) {
        isValid = false
        message = 'Please enter a valid email address'
      }
      break
    }

    case 'resumeHeader': {
      if (!value.trim()) {
        isValid = false
        message = 'Resume header is required'
      } else if (value.trim().length < 3) {
        isValid = false
        message = 'Resume header must be at least 3 characters'
      }
      break
    }

    case 'skills': {
      if (!value.trim()) {
        isValid = false
        message = 'Please enter at least one skill'
      } else if (
        value
          .trim()
          .split(',')
          .filter(skill => skill.trim()).length < 1
      ) {
        isValid = false
        message = 'Please enter at least one valid skill'
      }
      break
    }
  }

  fieldValidation[fieldName] = { isValid, message }

  // Update errors for immediate feedback only if field has been touched
  if (fieldTouched[fieldName]) {
    errors.value[fieldName] = message
  }

  return isValid
}

// Track field changes to mark as touched and validate in real-time
function trackFieldChanges() {
  Object.keys(form.value).forEach(field => {
    if (field !== '_gotcha') {
      watch(
        () => form.value[field],
        newValue => {
          fieldTouched[field] = true
          validateField(field, newValue)
        }
      )
    }
  })
}

// Initialize field tracking on mount
onMounted(() => {
  trackFieldChanges()
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

  // Reset touched state
  Object.keys(fieldTouched).forEach(field => {
    fieldTouched[field] = false
  })

  // Reset validation
  if (formRef.value) {
    formRef.value.resetValidation()
  }
}
</script>

<style scoped>
/* Modern Form Container */
.modern-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-8);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border-radius: var(--radius-xl);
  box-shadow: var(--glass-shadow-medium);
  border: 1px solid var(--glass-border);
  transition: all var(--duration-normal) var(--ease-out);
}

.modern-form-container:hover {
  background: var(--glass-hover-bg);
  box-shadow: var(--glass-shadow-heavy);
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
  background: var(--color-primary-500);
  color: var(--text-inverse);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-4);
  transition: all var(--duration-normal) var(--ease-out);
}

.form-icon.animate-pulse {
  animation: pulse 2s infinite;
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

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.form-grid.animate-stagger .form-field {
  animation: slideUp var(--duration-slow) var(--ease-out);
}

.form-grid.animate-stagger .form-field:nth-child(1) {
  animation-delay: 0.1s;
}

.form-grid.animate-stagger .form-field:nth-child(2) {
  animation-delay: 0.2s;
}

.form-grid.animate-stagger .form-field:nth-child(3) {
  animation-delay: 0.3s;
}

.form-grid.animate-stagger .form-field:nth-child(4) {
  animation-delay: 0.4s;
}

.form-grid.animate-stagger .form-field:nth-child(5) {
  animation-delay: 0.5s;
}

/* Form Fields */
.form-field {
  position: relative;
}

.form-field--full {
  grid-column: 1 / -1;
}

/* Input Groups with Floating Labels */
.input-group {
  position: relative;
  margin-bottom: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-4) var(--space-4) var(--space-3) var(--space-4);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(var(--glass-blur-light));
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  line-height: 1.5;
  transition: all var(--duration-fast) var(--ease-out);
  outline: none;
  box-shadow: var(--glass-shadow-light);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  padding-top: var(--space-5);
}

.form-input:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--glass-focus-border);
  box-shadow:
    var(--glass-shadow-medium),
    0 0 0 3px rgba(var(--color-primary-500), 0.1);
}

.form-input:disabled {
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-tertiary);
  cursor: not-allowed;
}

.form-input:disabled {
  background: var(--bg-secondary);
  color: var(--text-tertiary);
  cursor: not-allowed;
}

/* Placeholder Styling - Hide when not focused to prevent overlap with floating labels */
.form-input::placeholder {
  color: transparent;
  transition: color var(--duration-fast) var(--ease-out);
}

.form-input:focus::placeholder {
  color: var(--text-tertiary);
  opacity: 0.7;
}

/* Floating Labels */
.form-label {
  position: absolute;
  left: var(--space-4);
  top: var(--space-4);
  color: var(--text-secondary);
  font-size: var(--text-base);
  font-weight: 400;
  pointer-events: none;
  transition: all var(--duration-fast) var(--ease-out);
  background: transparent;
  padding: 0 var(--space-1);
  z-index: 1;
}

/* Label Animation States */
.input-group.has-value .form-label,
.input-group.is-focused .form-label {
  top: -8px;
  left: var(--space-3);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-primary-500);
}

.input-group.has-error .form-label {
  color: var(--color-error-500);
}

/* Input Border Animation */
.input-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary-500);
  transform: scaleX(0);
  transition: transform var(--duration-fast) var(--ease-out);
}

.input-group.is-focused .input-border {
  transform: scaleX(1);
}

.input-group.has-error .input-border {
  background: var(--color-error-500);
  transform: scaleX(1);
}

/* Error States */
.input-group.has-error .form-input {
  border-color: var(--color-error-500);
  box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
}

.error-message {
  color: var(--color-error-500);
  font-size: var(--text-sm);
  margin-top: var(--space-1);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

/* Field Loading Indicator */
.field-loading {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
}

/* Field Success Indicator */
.field-success {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-success-500);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn var(--duration-normal) var(--ease-out);
}

/* Success States */
.input-group.has-success .form-input {
  border-color: var(--color-success-500);
  box-shadow: 0 0 0 3px rgba(var(--color-success-rgb), 0.1);
}

.input-group.has-success .form-label {
  color: var(--color-success-600);
}

.input-group.has-success .input-border {
  background: var(--color-success-500);
  transform: scaleX(1);
}

/* Submit Button */
.form-actions {
  display: flex;
  justify-content: center;
  margin-top: var(--space-6);
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  color: var(--color-primary-600);
  border: 1px solid var(--glass-focus-border);
  border-radius: var(--radius-md);
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  min-width: 180px;
  min-height: 48px;
  box-shadow: var(--glass-shadow-medium);
}

.submit-button:hover:not(:disabled) {
  background: var(--glass-hover-bg);
  color: var(--color-primary-700);
  border-color: var(--color-primary-500);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-heavy);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.submit-button.is-loading {
  pointer-events: none;
}

.button-content,
.button-loading {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.button-icon {
  transition: transform var(--duration-fast) var(--ease-out);
}

.submit-button:hover .button-icon {
  transform: translateX(2px);
}

/* Status Messages */
.form-status {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  margin-top: var(--space-6);
}

.form-status--success {
  background: rgba(var(--color-success-rgb), 0.1);
  border: 1px solid var(--color-success-200);
  color: var(--color-success-700);
}

.form-status--error {
  background: rgba(var(--color-error-rgb), 0.1);
  border: 1px solid var(--color-error-200);
  color: var(--color-error-700);
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
  line-height: 1.3;
}

.status-message {
  font-size: var(--text-base);
  margin: 0;
  line-height: 1.4;
  opacity: 0.9;
}

/* Loading Spinner */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeIn var(--duration-slow) var(--ease-out);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modern-form-container {
    margin: var(--space-4);
    padding: var(--space-6);
  }

  .form-grid {
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

  .submit-button {
    width: 100%;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .modern-form-container {
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

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .form-icon.animate-pulse,
  .form-grid.animate-stagger .form-field,
  .loading-spinner {
    animation: none;
  }

  .form-input,
  .form-label,
  .input-border,
  .submit-button,
  .button-icon {
    transition: none;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .form-input {
    border-width: 3px;
  }

  .form-input:focus {
    box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.3);
  }

  .submit-button {
    border: 2px solid var(--color-primary-700);
  }
}

/* ===== THEME-SPECIFIC GLASS MORPHISM ENHANCEMENTS ===== */

/* Creative Gradient Theme v2.0 - Using Global System */
:root[data-theme='creative-gradient'] .modern-form-container {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-heavy) !important;
  border-radius: var(--cg-radius-2xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .modern-form-container:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-2px) !important;
}

:root[data-theme='creative-gradient'] .form-section-title {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow) !important;
  font-weight: 600 !important;
  margin-bottom: var(--cg-space-lg) !important;
}

:root[data-theme='creative-gradient'] .form-input,
:root[data-theme='creative-gradient'] .input-modern {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  border-radius: var(--cg-radius-lg) !important;
  transition: all var(--cg-transition-fast) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .form-input:focus,
:root[data-theme='creative-gradient'] .input-modern:focus {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  outline: none !important;
}

:root[data-theme='creative-gradient'] .form-input::placeholder,
:root[data-theme='creative-gradient'] .input-modern::placeholder {
  color: var(--cg-text-tertiary) !important;
  opacity: 0.8 !important;
}

:root[data-theme='creative-gradient'] .form-label {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  font-weight: 500 !important;
  margin-bottom: var(--cg-space-sm) !important;
}

:root[data-theme='creative-gradient'] .submit-button,
:root[data-theme='creative-gradient'] .btn-primary {
  background: var(--cg-gradient-primary) !important;
  border: none !important;
  color: white !important;
  text-shadow: none !important;
  border-radius: var(--cg-radius-xl) !important;
  padding: var(--cg-space-lg) var(--cg-space-2xl) !important;
  font-weight: 600 !important;
  transition: all var(--cg-transition-fast) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

:root[data-theme='creative-gradient'] .submit-button:hover:not(:disabled),
:root[data-theme='creative-gradient'] .btn-primary:hover:not(:disabled) {
  background: var(--cg-gradient-secondary) !important;
  transform: translateY(-2px) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
}

:root[data-theme='creative-gradient'] .submit-button:disabled,
:root[data-theme='creative-gradient'] .btn-primary:disabled {
  opacity: 0.6 !important;
  cursor: not-allowed !important;
  transform: none !important;
}

:root[data-theme='creative-gradient'] .btn-secondary {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-fast) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .btn-secondary:hover:not(:disabled) {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  transform: translateY(-2px) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

:root[data-theme='creative-gradient'] .form-error {
  color: var(--cg-error-text) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  font-size: 0.875rem !important;
  margin-top: var(--cg-space-xs) !important;
}

:root[data-theme='creative-gradient'] .form-success {
  color: var(--cg-success-text) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  font-size: 0.875rem !important;
  margin-top: var(--cg-space-xs) !important;
}

/* Professional Dark Theme - Dark Mode */
:root[data-theme='professional-dark'][data-mode='dark'] .modern-form-container {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .modern-form-container:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

:root[data-theme='professional-dark'][data-mode='dark'] .form-input {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:root[data-theme='professional-dark'][data-mode='dark'] .form-input:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(20, 184, 166, 0.3);
}

:root[data-theme='professional-dark'][data-mode='dark'] .submit-button {
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(20, 184, 166, 0.2);
  color: var(--color-secondary-400);
}

:root[data-theme='professional-dark'][data-mode='dark'] .submit-button:hover:not(:disabled) {
  background: rgba(20, 184, 166, 0.15);
  border-color: rgba(20, 184, 166, 0.3);
  color: var(--color-secondary-300);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .modern-form-container {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .modern-form-container:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

:root[data-theme='minimal-elegant'] .form-input {
  background: rgba(59, 130, 246, 0.02);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

:root[data-theme='minimal-elegant'] .form-input:focus {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

:root[data-theme='minimal-elegant'] .submit-button {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  color: var(--color-secondary-600);
}

:root[data-theme='minimal-elegant'] .submit-button:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.25);
  color: var(--color-secondary-700);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .modern-form-container {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .modern-form-container:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}

:root[data-theme='warm-professional'] .form-input {
  background: rgba(249, 115, 22, 0.02);
  border: 1px solid rgba(249, 115, 22, 0.1);
}

:root[data-theme='warm-professional'] .form-input:focus {
  background: rgba(249, 115, 22, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}

:root[data-theme='warm-professional'] .submit-button {
  background: rgba(249, 115, 22, 0.08);
  border: 1px solid rgba(249, 115, 22, 0.15);
  color: var(--color-secondary-600);
}

:root[data-theme='warm-professional'] .submit-button:hover:not(:disabled) {
  background: rgba(249, 115, 22, 0.12);
  border-color: rgba(249, 115, 22, 0.25);
  color: var(--color-secondary-700);
}
</style>
