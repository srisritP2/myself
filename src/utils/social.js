/**
 * Social Media Utilities
 *
 * This module provides utilities for handling social media interactions,
 * URL validation, and platform-specific behaviors.
 *
 * @author Portfolio Team
 * @version 1.0.0
 */

/**
 * Social media platform configurations
 * Contains platform-specific settings and validation rules
 */
export const SocialPlatforms = {
  LINKEDIN: {
    name: 'LinkedIn',
    icon: 'mdi-linkedin',
    baseUrl: 'https://linkedin.com/in/',
    color: '#0077B5',
    urlPattern: /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/,
  },
  GITHUB: {
    name: 'GitHub',
    icon: 'mdi-github',
    baseUrl: 'https://github.com/',
    color: '#333333',
    urlPattern: /^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/,
  },
  TWITTER: {
    name: 'Twitter',
    icon: 'mdi-twitter',
    baseUrl: 'https://twitter.com/',
    color: '#1DA1F2',
    urlPattern: /^https?:\/\/(www\.)?twitter\.com\/[\w-]+\/?$/,
  },
  FACEBOOK: {
    name: 'Facebook',
    icon: 'mdi-facebook',
    baseUrl: 'https://facebook.com/',
    color: '#1877F2',
    urlPattern: /^https?:\/\/(www\.)?facebook\.com\/[\w.-]+\/?$/,
  },
  INSTAGRAM: {
    name: 'Instagram',
    icon: 'mdi-instagram',
    baseUrl: 'https://instagram.com/',
    color: '#E4405F',
    urlPattern: /^https?:\/\/(www\.)?instagram\.com\/[\w.-]+\/?$/,
  },
  EMAIL: {
    name: 'Email',
    icon: 'mdi-email',
    color: '#EA4335',
    urlPattern: /^mailto:[\w.-]+@[\w.-]+\.\w+$/,
  },
  PHONE: {
    name: 'Phone',
    icon: 'mdi-phone',
    color: '#34A853',
    urlPattern: /^tel:\+?[\d\s()-]+$/,
  },
}

/**
 * Maps icon names to human-readable labels
 *
 * @param {string} iconName - Material Design icon name (e.g., 'mdi-linkedin')
 * @returns {string} Human-readable platform name
 *
 * @example
 * // Get platform name from icon
 * const platformName = getSocialLabel('mdi-linkedin') // Returns 'LinkedIn'
 */
export function getSocialLabel(iconName) {
  // Direct mapping for common icons
  const iconMap = {
    'mdi-linkedin': 'LinkedIn',
    'mdi-github': 'GitHub',
    'mdi-email': 'Email',
    'mdi-phone': 'Phone',
    'mdi-twitter': 'Twitter',
    'mdi-facebook': 'Facebook',
    'mdi-instagram': 'Instagram',
    'mdi-youtube': 'YouTube',
    'mdi-discord': 'Discord',
    'mdi-telegram': 'Telegram',
    'mdi-whatsapp': 'WhatsApp',
    'mdi-skype': 'Skype',
  }

  // Return mapped label or generate from icon name
  return (
    iconMap[iconName] ||
    iconName
      .replace('mdi-', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}

/**
 * Validates a social media URL format
 *
 * @param {string} url - URL to validate
 * @param {string} platform - Platform key from SocialPlatforms
 * @returns {boolean} True if URL format is valid
 *
 * @example
 * // Validate LinkedIn URL
 * const isValid = validateSocialUrl('https://linkedin.com/in/johndoe', 'LINKEDIN')
 */
export function validateSocialUrl(url, platform) {
  if (!url || !platform) return false

  const platformConfig = SocialPlatforms[platform.toUpperCase()]
  if (!platformConfig || !platformConfig.urlPattern) return false

  return platformConfig.urlPattern.test(url)
}

/**
 * Opens a social media link with appropriate handling for different platforms
 *
 * @param {string} url - Social media URL or contact info
 * @param {string} iconName - Material Design icon name to determine platform
 * @param {Object} options - Additional options
 * @param {boolean} options.newTab - Whether to open in new tab (default: true)
 * @param {string} options.windowFeatures - Window features for popup
 * @returns {boolean} True if link was opened successfully
 *
 * @example
 * // Open LinkedIn profile in new tab
 * openSocialLink('https://linkedin.com/in/johndoe', 'mdi-linkedin')
 *
 * // Send email
 * openSocialLink('mailto:john@example.com', 'mdi-email')
 *
 * // Make phone call
 * openSocialLink('tel:+1234567890', 'mdi-phone')
 */
export function openSocialLink(url, iconName, options = {}) {
  const { newTab = true, windowFeatures = 'noopener,noreferrer' } = options

  try {
    if (!url) {
      console.warn('openSocialLink: No URL provided')
      return false
    }

    // Handle email links
    if (iconName === 'mdi-email') {
      const emailUrl = url.startsWith('mailto:') ? url : `mailto:${url}`
      window.location.href = emailUrl
      return true
    }

    // Handle phone links
    if (iconName === 'mdi-phone') {
      const phoneUrl = url.startsWith('tel:') ? url : `tel:${url}`
      window.location.href = phoneUrl
      return true
    }

    // Handle web-based social platforms
    if (newTab) {
      const newWindow = window.open(url, '_blank', windowFeatures)
      if (!newWindow) {
        console.warn('openSocialLink: Popup blocked, trying location.href')
        window.location.href = url
      }
    } else {
      window.location.href = url
    }

    return true
  } catch (error) {
    console.error('openSocialLink: Error opening social link:', error)
    return false
  }
}

/**
 * Generates a complete social media profile URL from username
 *
 * @param {string} platform - Platform key from SocialPlatforms
 * @param {string} username - Username or handle
 * @returns {string} Complete profile URL
 *
 * @example
 * // Generate LinkedIn profile URL
 * const profileUrl = generateSocialUrl('LINKEDIN', 'johndoe')
 * // Returns: 'https://linkedin.com/in/johndoe'
 */
export function generateSocialUrl(platform, username) {
  if (!platform || !username) return ''

  const platformConfig = SocialPlatforms[platform.toUpperCase()]
  if (!platformConfig || !platformConfig.baseUrl) return ''

  return `${platformConfig.baseUrl}${username}`
}

/**
 * Extracts username from a social media URL
 *
 * @param {string} url - Social media profile URL
 * @param {string} platform - Platform key from SocialPlatforms
 * @returns {string} Extracted username or empty string
 *
 * @example
 * // Extract username from LinkedIn URL
 * const username = extractUsernameFromUrl('https://linkedin.com/in/johndoe', 'LINKEDIN')
 * // Returns: 'johndoe'
 */
export function extractUsernameFromUrl(url, platform) {
  if (!url || !platform) return ''

  const platformConfig = SocialPlatforms[platform.toUpperCase()]
  if (!platformConfig || !platformConfig.baseUrl) return ''

  try {
    const baseUrl = platformConfig.baseUrl
    if (url.startsWith(baseUrl)) {
      return url.replace(baseUrl, '').replace(/\/$/, '')
    }
    return ''
  } catch (error) {
    console.error('extractUsernameFromUrl: Error extracting username:', error)
    return ''
  }
}

/**
 * Gets the brand color for a social platform
 *
 * @param {string} iconName - Material Design icon name
 * @returns {string} Hex color code for the platform
 *
 * @example
 * // Get LinkedIn brand color
 * const color = getSocialColor('mdi-linkedin') // Returns '#0077B5'
 */
export function getSocialColor(iconName) {
  const platform = Object.values(SocialPlatforms).find(p => p.icon === iconName)

  return platform?.color || '#6B7280' // Default gray color
}
