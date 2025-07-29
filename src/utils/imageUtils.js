/**
 * Image utility functions for consistent image handling across the application
 */

// Default profile images in order of preference
export const PROFILE_IMAGES = {
  primary: '/Sri.jpg',
  fallback: '/profile-photo.svg',
  placeholder:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMiAxMkMxNC4yMSAxMiAxNiAxMC4yMSAxNiA4QzE2IDUuNzkgMTQuMjEgNCAxMiA0QzkuNzkgNCA4IDUuNzkgOCA4QzggMTAuMjEgOS43OSAxMiAxMiAxMlpNMTIgMTRDOS4zMyAxNCA0IDE1LjM0IDQgMThWMjBIMjBWMThDMjAgMTUuMzQgMTQuNjcgMTQgMTIgMTRaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz48L3N2Zz4=',
}

/**
 * Get the appropriate profile image URL with fallback handling
 * @param {string} preferredImage - Preferred image URL
 * @returns {string} Image URL to use
 */
export function getProfileImageUrl(preferredImage = null) {
  return preferredImage || PROFILE_IMAGES.primary
}

/**
 * Handle image loading errors with progressive fallbacks
 * @param {Event} event - Image error event
 * @param {Function} onError - Callback when all fallbacks fail
 */
export function handleImageError(event, onError = null) {
  const img = event.target
  const currentSrc = img.src

  console.warn('Image failed to load:', currentSrc)

  // Try fallbacks in order
  if (currentSrc.includes('Sri.jpg')) {
    img.src = PROFILE_IMAGES.fallback
  } else if (currentSrc.includes('profile-photo.svg')) {
    img.src = PROFILE_IMAGES.placeholder
  } else {
    // All fallbacks failed
    if (onError) {
      onError(event)
    } else {
      // Default behavior - hide image
      img.style.display = 'none'
    }
  }
}

/**
 * Preload images to improve loading performance
 * @param {string[]} imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}

// Preload profile images on module load
preloadImages([PROFILE_IMAGES.primary, PROFILE_IMAGES.fallback])
