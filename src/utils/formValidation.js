// Reusable form validation utilities
export const validationRules = {
  required: (value, fieldName) => {
    if (!value?.trim()) {
      return `${fieldName} is required`
    }
    return null
  },

  minLength: min => (value, fieldName) => {
    if (value?.trim().length < min) {
      return `${fieldName} must be at least ${min} characters`
    }
    return null
  },

  email: value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  skillsList: value => {
    const skills = value
      ?.trim()
      .split(',')
      .filter(skill => skill.trim())
    if (skills.length < 1) {
      return 'Please enter at least one valid skill'
    }
    return null
  },
}

// Field configuration for reusability
export const fieldConfigs = {
  firstName: {
    label: 'First Name',
    type: 'text',
    autocomplete: 'given-name',
    rules: [validationRules.required, validationRules.minLength(2)],
  },

  lastName: {
    label: 'Last Name',
    type: 'text',
    autocomplete: 'family-name',
    rules: [validationRules.required, validationRules.minLength(2)],
  },

  email: {
    label: 'Contact Email',
    type: 'email',
    autocomplete: 'email',
    fullWidth: true,
    rules: [validationRules.required, validationRules.email],
  },

  resumeHeader: {
    label: 'Resume Header',
    type: 'text',
    placeholder: 'e.g. QA Lead, Frontend Developer',
    fullWidth: true,
    rules: [validationRules.required, validationRules.minLength(3)],
  },

  skills: {
    label: 'Skills (comma separated)',
    type: 'textarea',
    placeholder: 'JavaScript, Vue.js, Node.js, Python...',
    fullWidth: true,
    rows: 4,
    rules: [validationRules.required, validationRules.skillsList],
  },
}

// Reusable validation function
export function validateField(fieldName, value, config) {
  const rules = config.rules || []
  const fieldLabel = config.label || fieldName

  for (const rule of rules) {
    const error = rule(value, fieldLabel)
    if (error) {
      return { isValid: false, message: error }
    }
  }

  return { isValid: true, message: '' }
}

// Validate entire form
export function validateForm(formData, fieldConfigs) {
  const errors = {}
  let isValid = true

  Object.keys(fieldConfigs).forEach(fieldName => {
    const config = fieldConfigs[fieldName]
    const value = formData[fieldName]
    const validation = validateField(fieldName, value, config)

    if (!validation.isValid) {
      errors[fieldName] = validation.message
      isValid = false
    } else {
      errors[fieldName] = ''
    }
  })

  return { isValid, errors }
}
