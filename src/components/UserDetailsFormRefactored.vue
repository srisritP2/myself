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

    <form @submit.prevent="handleSubmit" class="modern-form" ref="formRef">
      <div class="form-grid" :class="{ 'animate-stagger': props.enableAnimations }">
        <!-- Dynamic Form Fields -->
        <FormField
          v-for="(config, fieldName) in fieldConfigs"
          :key="fieldName"
          :field-name="fieldName"
          :config="config"
          :model-value="form[fieldName]"
          :error="errors[fieldName]"
          :validation="fieldValidation[fieldName]"
          :touched="fieldTouched[fieldName]"
          :focused="focusedField === fieldName"
          :disabled="isSubmitting"
          :loading="isSubmitting"
          @update:model-value="form[fieldName] = $event"
          @focus="focusedField = fieldName"
          @blur="focusedField = null"
        />
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
import { fieldConfigs } from '@/utils/formValidation'
import { useForm } from '@/composables/useForm'
import { formService } from '@/services/formService'
import FormField from '@/components/common/FormField.vue'

const props = defineProps({
  enableAnimations: {
    type: Boolean,
    default: true,
  },
})

// Initial form data
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  resumeHeader: '',
  skills: '',
  _gotcha: '', // honeypot
}

// Submit handler
async function submitHandler(formData) {
  return await formService.submitPortfolioRequest(formData)
}

// Use the reusable form composable
const {
  form,
  formRef,
  isSubmitting,
  focusedField,
  success,
  error,
  errorMsg,
  errors,
  fieldTouched,
  fieldValidation,
  handleSubmit,
} = useForm(initialFormData, fieldConfigs, submitHandler)
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

  .submit-button,
  .button-icon {
    transition: none;
  }
}
</style>
