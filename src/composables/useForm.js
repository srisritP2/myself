// Reusable form composable
import { ref, reactive, onMounted, watch } from 'vue'
import { validateField, validateForm } from '@/utils/formValidation'

export function useForm(initialData, fieldConfigs, submitHandler) {
  // Form state
  const form = ref({ ...initialData })
  const formRef = ref()
  const isSubmitting = ref(false)
  const focusedField = ref(null)
  const success = ref(false)
  const error = ref(false)
  const errorMsg = ref('')

  // Validation state
  const errors = ref({})
  const fieldTouched = reactive({})
  const fieldValidation = reactive({})

  // Initialize reactive objects
  Object.keys(fieldConfigs).forEach(fieldName => {
    errors.value[fieldName] = ''
    fieldTouched[fieldName] = false
    fieldValidation[fieldName] = { isValid: false, message: '' }
  })

  // Real-time field validation
  function validateSingleField(fieldName, value) {
    const config = fieldConfigs[fieldName]
    const validation = validateField(fieldName, value, config)

    fieldValidation[fieldName] = validation

    // Update errors for immediate feedback only if field has been touched
    if (fieldTouched[fieldName]) {
      errors.value[fieldName] = validation.message
    }

    return validation.isValid
  }

  // Track field changes for real-time validation
  function trackFieldChanges() {
    Object.keys(fieldConfigs).forEach(fieldName => {
      watch(
        () => form.value[fieldName],
        newValue => {
          fieldTouched[fieldName] = true
          validateSingleField(fieldName, newValue)
        }
      )
    })
  }

  // Validate entire form
  function validateEntireForm() {
    const validation = validateForm(form.value, fieldConfigs)
    errors.value = validation.errors
    return validation.isValid
  }

  // Submit form
  async function handleSubmit() {
    // Reset status
    success.value = false
    error.value = false
    errorMsg.value = ''

    // Validate form
    if (!validateEntireForm()) {
      return
    }

    // Check honeypot if present
    if (form.value._gotcha) {
      console.log('Bot submission detected')
      return
    }

    isSubmitting.value = true

    try {
      const result = await submitHandler(form.value)

      if (result.success) {
        success.value = true
        resetForm()
      } else {
        error.value = true
        errorMsg.value = result.error || 'Submission failed. Please try again.'
      }
    } catch (err) {
      error.value = true
      errorMsg.value = err.message || 'An error occurred. Please try again.'
    } finally {
      isSubmitting.value = false
    }
  }

  // Reset form
  function resetForm() {
    // Reset form data
    Object.keys(initialData).forEach(key => {
      form.value[key] = initialData[key]
    })

    // Reset touched state
    Object.keys(fieldTouched).forEach(field => {
      fieldTouched[field] = false
    })

    // Reset validation state
    Object.keys(fieldValidation).forEach(field => {
      fieldValidation[field] = { isValid: false, message: '' }
    })

    // Reset errors
    Object.keys(errors.value).forEach(field => {
      errors.value[field] = ''
    })
  }

  // Initialize on mount
  onMounted(() => {
    trackFieldChanges()
  })

  return {
    // Form state
    form,
    formRef,
    isSubmitting,
    focusedField,
    success,
    error,
    errorMsg,

    // Validation state
    errors,
    fieldTouched,
    fieldValidation,

    // Methods
    handleSubmit,
    resetForm,
    validateSingleField,
    validateEntireForm,
  }
}
