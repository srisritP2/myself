/**
 * Time Utilities
 *
 * This module provides utilities for time formatting, timezone handling,
 * and real-time updates with proper cleanup.
 *
 * @author Portfolio Team
 * @version 1.0.0
 */

import { ref } from 'vue'

/**
 * Timezone configurations for common locations
 */
export const Timezones = {
  IST: {
    name: 'India Standard Time',
    abbreviation: 'IST',
    offset: '+05:30',
    timezone: 'Asia/Kolkata',
  },
  EST: {
    name: 'Eastern Standard Time',
    abbreviation: 'EST',
    offset: '-05:00',
    timezone: 'America/New_York',
  },
  PST: {
    name: 'Pacific Standard Time',
    abbreviation: 'PST',
    offset: '-08:00',
    timezone: 'America/Los_Angeles',
  },
  GMT: {
    name: 'Greenwich Mean Time',
    abbreviation: 'GMT',
    offset: '+00:00',
    timezone: 'Europe/London',
  },
  JST: {
    name: 'Japan Standard Time',
    abbreviation: 'JST',
    offset: '+09:00',
    timezone: 'Asia/Tokyo',
  },
}

/**
 * Formats time according to specified options
 *
 * @param {Date} date - Date object to format
 * @param {Object} options - Formatting options
 * @param {string} options.locale - Locale string (default: 'en-US')
 * @param {string} options.timeZone - IANA timezone identifier
 * @param {boolean} options.hour12 - Use 12-hour format (default: true)
 * @param {string} options.hourCycle - Hour cycle ('h11', 'h12', 'h23', 'h24')
 * @returns {string} Formatted time string
 *
 * @example
 * // Format current time in IST
 * const timeString = formatTime(new Date(), {
 *   timeZone: 'Asia/Kolkata',
 *   hour12: true
 * })
 */
export function formatTime(date = new Date(), options = {}) {
  const {
    locale = 'en-US',
    timeZone = 'UTC',
    hour12 = true,
    hourCycle = hour12 ? 'h12' : 'h23',
  } = options

  try {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
      hour12,
      hourCycle,
    }).format(date)
  } catch (error) {
    console.error('formatTime: Error formatting time:', error)
    return date.toLocaleTimeString()
  }
}

/**
 * Formats date according to specified options
 *
 * @param {Date} date - Date object to format
 * @param {Object} options - Formatting options
 * @param {string} options.locale - Locale string (default: 'en-US')
 * @param {string} options.timeZone - IANA timezone identifier
 * @param {string} options.dateStyle - Date style ('full', 'long', 'medium', 'short')
 * @returns {string} Formatted date string
 *
 * @example
 * // Format current date
 * const dateString = formatDate(new Date(), {
 *   dateStyle: 'medium',
 *   timeZone: 'Asia/Kolkata'
 * })
 */
export function formatDate(date = new Date(), options = {}) {
  const { locale = 'en-US', timeZone = 'UTC', dateStyle = 'medium' } = options

  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle,
      timeZone,
    }).format(date)
  } catch (error) {
    console.error('formatDate: Error formatting date:', error)
    return date.toLocaleDateString()
  }
}

/**
 * Creates a reactive time reference that updates automatically
 *
 * @param {Object} options - Configuration options
 * @param {number} options.updateInterval - Update interval in milliseconds (default: 60000)
 * @param {string} options.timeZone - IANA timezone identifier
 * @param {string} options.locale - Locale string
 * @param {boolean} options.hour12 - Use 12-hour format
 * @returns {Object} Object containing reactive time ref and cleanup function
 *
 * @example
 * // Create auto-updating time display
 * const { timeRef, cleanup } = createReactiveTime({
 *   updateInterval: 1000, // Update every second
 *   timeZone: 'Asia/Kolkata',
 *   hour12: true
 * })
 *
 * // Use in template: {{ timeRef }}
 * // Call cleanup() when component unmounts
 */
export function createReactiveTime(options = {}) {
  const {
    updateInterval = 60000, // 1 minute default
    timeZone = 'UTC',
    locale = 'en-US',
    hour12 = true,
  } = options

  const timeRef = ref(new Date())

  // Update time immediately
  const updateTime = () => {
    timeRef.value = new Date()
  }

  // Set up interval
  const intervalId = setInterval(updateTime, updateInterval)

  // Cleanup function
  const cleanup = () => {
    clearInterval(intervalId)
  }

  return {
    timeRef,
    cleanup,
    // Computed formatted time string
    formattedTime: () => formatTime(timeRef.value, { timeZone, locale, hour12 }),
  }
}

/**
 * Gets timezone information for a given timezone identifier
 *
 * @param {string} timezoneId - IANA timezone identifier
 * @returns {Object} Timezone information object
 *
 * @example
 * // Get IST timezone info
 * const tzInfo = getTimezoneInfo('Asia/Kolkata')
 * console.log(tzInfo.abbreviation) // 'IST'
 */
export function getTimezoneInfo(timezoneId) {
  try {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone: timezoneId,
      timeZoneName: 'short',
    })

    const parts = formatter.formatToParts(now)
    const timeZoneName = parts.find(part => part.type === 'timeZoneName')?.value

    // Calculate offset
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))
    const localDate = new Date(now.toLocaleString('en-US', { timeZone: timezoneId }))
    const offsetMs = localDate.getTime() - utcDate.getTime()
    const offsetHours = offsetMs / (1000 * 60 * 60)
    const offsetSign = offsetHours >= 0 ? '+' : '-'
    const offsetFormatted = `${offsetSign}${Math.abs(offsetHours).toString().padStart(2, '0')}:00`

    return {
      timezone: timezoneId,
      abbreviation: timeZoneName || 'UTC',
      offset: offsetFormatted,
      offsetHours,
    }
  } catch (error) {
    console.error('getTimezoneInfo: Error getting timezone info:', error)
    return {
      timezone: timezoneId,
      abbreviation: 'UTC',
      offset: '+00:00',
      offsetHours: 0,
    }
  }
}

/**
 * Calculates relative time (e.g., "2 hours ago", "in 3 days")
 *
 * @param {Date} date - Target date
 * @param {Date} baseDate - Base date to compare against (default: now)
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Relative time string
 *
 * @example
 * // Get relative time
 * const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
 * const relativeTime = getRelativeTime(pastDate) // "2 hours ago"
 */
export function getRelativeTime(date, baseDate = new Date(), locale = 'en-US') {
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
    const diffMs = date.getTime() - baseDate.getTime()

    const units = [
      { unit: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
      { unit: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
      { unit: 'day', ms: 1000 * 60 * 60 * 24 },
      { unit: 'hour', ms: 1000 * 60 * 60 },
      { unit: 'minute', ms: 1000 * 60 },
      { unit: 'second', ms: 1000 },
    ]

    for (const { unit, ms } of units) {
      const diff = Math.round(diffMs / ms)
      if (Math.abs(diff) >= 1) {
        return rtf.format(diff, unit)
      }
    }

    return rtf.format(0, 'second')
  } catch (error) {
    console.error('getRelativeTime: Error calculating relative time:', error)
    return 'now'
  }
}

/**
 * Checks if a date is today
 *
 * @param {Date} date - Date to check
 * @param {string} timeZone - Timezone to use for comparison
 * @returns {boolean} True if date is today
 */
export function isToday(date, timeZone = 'UTC') {
  const today = new Date()
  const dateStr = date.toLocaleDateString('en-CA', { timeZone }) // YYYY-MM-DD format
  const todayStr = today.toLocaleDateString('en-CA', { timeZone })
  return dateStr === todayStr
}
