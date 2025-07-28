<template>
  <div class="form-field" :class="{ 'form-field--full': config.fullWidth }">
    <div
      class="input-group"
      :class="{
        'has-value': modelValue,
        'has-error': error,
        'has-success': touched && validation.isValid,
        'is-focused': focused,
      }"
    >
      <!-- Input or Textarea -->
      <component
        :is="config.type === 'textarea' ? 'textarea' : 'input'"
        :id="fieldName"
        :type="config.type === 'textarea' ? undefined : config.type"
        :rows="config.rows"
        :placeholder="config.placeholder"
        :autocomplete="config.autocomplete"
        :disabled="disabled"
        :aria-describedby="error ? `${fieldName}-error` : null"
        :aria-invalid="!!error"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        class="form-input"
        :class="{ 'form-textarea': config.type === 'textarea' }"
      />

      <!-- Floating Label -->
      <label :for="fieldName" class="form-label">{{ config.label }}</label>

      <!-- Input Border Animation -->
      <div class="input-border"></div>

      <!-- Loading Indicator -->
      <div v-if="loading && touched" class="field-loading">
        <div class="loading-spinner"></div>
      </div>

      <!-- Success Indicator -->
      <div v-if="touched && validation.isValid && !loading" class="field-success">
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

    <!-- Error Message -->
    <div v-if="error" class="error-message" :id="`${fieldName}-error`" role="alert">
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
      {{ error }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  fieldName: {
    type: String,
    required: true,
  },
  config: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  validation: {
    type: Object,
    default: () => ({ isValid: false, message: '' }),
  },
  touched: {
    type: Boolean,
    default: false,
  },
  focused: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue', 'focus', 'blur'])
</script>

<style scoped>
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

/* Loading Spinner */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
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
</style>
