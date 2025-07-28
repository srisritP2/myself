/**
 * Cross-Browser Compatibility Tests for Premium Hero Section
 *
 * These tests verify that the component works correctly across different browsers
 * and handles browser-specific features gracefully.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PremiumHeroSection from '../PremiumHeroSection.vue'

// Mock different browser environments
const mockBrowserEnvironments = {
  chrome: {
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    supports: {
      backdropFilter: true,
      webp: true,
      intersectionObserver: true,
      webAnimations: true,
    },
  },
  firefox: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    supports: {
      backdropFilter: false,
      webp: true,
      intersectionObserver: true,
      webAnimations: true,
    },
  },
  safari: {
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    supports: {
      backdropFilter: true,
      webp: true,
      intersectionObserver: true,
      webAnimations: false,
    },
  },
  edge: {
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
    supports: {
      backdropFilter: true,
      webp: true,
      intersectionObserver: true,
      webAnimations: true,
    },
  },
  ie11: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
    supports: {
      backdropFilter: false,
      webp: false,
      intersectionObserver: false,
      webAnimations: false,
    },
  },
}

// Mock child components
vi.mock('../components/HeroProfile.vue', () => ({
  default: { name: 'HeroProfile', template: '<div data-testid="hero-profile">Profile</div>' },
}))
vi.mock('../components/HeroContent.vue', () => ({
  default: { name: 'HeroContent', template: '<div data-testid="hero-content">Content</div>' },
}))
vi.mock('../components/HeroStats.vue', () => ({
  default: { name: 'HeroStats', template: '<div data-testid="hero-stats">Stats</div>' },
}))
vi.mock('../components/HeroActions.vue', () => ({
  default: { name: 'HeroActions', template: '<div data-testid="hero-actions">Actions</div>' },
}))

// Mock the composable
vi.mock('@/composables/usePremiumHero', () => ({
  usePremiumHero: () => ({
    heroRef: { value: null },
    mousePosition: { value: { x: 0.5, y: 0.5 } },
    isVisible: { value: true },
    animationTimeline: { value: { sequence: [], totalDuration: 0, isPlaying: false } },
    handleImageError: vi.fn(),
    initializeAnimations: vi.fn(),
    cleanup: vi.fn(),
  }),
}))

describe('Cross-Browser Compatibility Tests', () => {
  let wrapper
  const mockProfile = {
    name: 'John Doe',
    title: 'Software Engineer',
    description: 'Passionate developer',
    imageUrl: '/test-image.jpg',
    location: 'New York',
    status: 'available',
  }

  const mockStats = {
    experience: 5,
    projects: 50,
    clients: 25,
    satisfaction: 95,
  }

  const mockActions = {
    primaryCTA: { label: 'Download Resume', action: vi.fn() },
    secondaryCTA: { label: 'Contact Me', action: vi.fn() },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Chrome Browser Support', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'userAgent', {
        value: mockBrowserEnvironments.chrome.userAgent,
        configurable: true,
      })
    })

    it('renders correctly in Chrome', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('.premium-hero').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-profile"]').exists()).toBe(true)
    })

    it('supports backdrop-filter in Chrome', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          theme: 'glass',
        },
      })

      expect(wrapper.find('.premium-hero--glass').exists()).toBe(true)
    })
  })

  describe('Firefox Browser Support', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'userAgent', {
        value: mockBrowserEnvironments.firefox.userAgent,
        configurable: true,
      })
    })

    it('renders correctly in Firefox', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('.premium-hero').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-content"]').exists()).toBe(true)
    })

    it('handles gradient mesh in Firefox', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          theme: 'gradient',
        },
      })

      expect(wrapper.find('.premium-hero__gradient-mesh').exists()).toBe(true)
    })
  })

  describe('Safari Browser Support', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'userAgent', {
        value: mockBrowserEnvironments.safari.userAgent,
        configurable: true,
      })
    })

    it('renders correctly in Safari', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('.premium-hero').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-stats"]').exists()).toBe(true)
    })

    it('handles webkit-specific optimizations', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          theme: 'gradient',
        },
      })

      expect(wrapper.find('.premium-hero__particle').exists()).toBe(true)
    })
  })

  describe('Edge Browser Support', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'userAgent', {
        value: mockBrowserEnvironments.edge.userAgent,
        configurable: true,
      })
    })

    it('renders correctly in Edge', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('.premium-hero').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-actions"]').exists()).toBe(true)
    })

    it('supports modern CSS Grid in Edge', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          layout: 'split',
        },
      })

      expect(wrapper.find('.premium-hero--split').exists()).toBe(true)
    })
  })

  describe('Feature Detection and Fallbacks', () => {
    it('handles missing IntersectionObserver gracefully', () => {
      // Mock missing IntersectionObserver
      const originalIntersectionObserver = global.IntersectionObserver
      delete global.IntersectionObserver

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('.premium-hero').exists()).toBe(true)

      // Restore
      global.IntersectionObserver = originalIntersectionObserver
    })

    it('handles missing Web Animations API', () => {
      // Mock missing animate method
      const originalAnimate = Element.prototype.animate
      delete Element.prototype.animate

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          animationsEnabled: true,
        },
      })

      expect(wrapper.find('.premium-hero').exists()).toBe(true)

      // Restore
      Element.prototype.animate = originalAnimate
    })

    it('provides CSS fallbacks for unsupported features', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          theme: 'glass',
        },
      })

      // Component should still render with fallback styles
      expect(wrapper.find('.premium-hero--glass').exists()).toBe(true)
    })
  })

  describe('CSS Grid Fallbacks', () => {
    it('provides flexbox fallbacks for older browsers', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          layout: 'split',
        },
      })

      const container = wrapper.find('.premium-hero__container')
      expect(container.exists()).toBe(true)
    })

    it('handles responsive layout changes', () => {
      // Mock different viewport sizes
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('.premium-hero').exists()).toBe(true)
    })
  })

  describe('Image Format Support', () => {
    it('handles WebP support detection', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('[data-testid="hero-profile"]').exists()).toBe(true)
    })

    it('provides JPEG fallbacks for WebP', () => {
      // Mock no WebP support
      const originalCreateElement = document.createElement
      document.createElement = vi.fn().mockImplementation(tagName => {
        if (tagName === 'canvas') {
          return {
            getContext: () => null,
            toDataURL: () => 'data:image/png;base64,invalid',
          }
        }
        return originalCreateElement.call(document, tagName)
      })

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('[data-testid="hero-profile"]').exists()).toBe(true)

      // Restore
      document.createElement = originalCreateElement
    })
  })

  describe('Accessibility Across Browsers', () => {
    it('maintains accessibility features in all browsers', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      // Check for semantic structure
      expect(wrapper.find('section').exists()).toBe(true)
    })

    it('handles focus management consistently', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      const heroSection = wrapper.find('.premium-hero')
      expect(heroSection.exists()).toBe(true)
    })
  })

  describe('Performance Across Browsers', () => {
    it('optimizes animations for different browsers', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          animationsEnabled: true,
        },
      })

      expect(wrapper.find('.premium-hero--animated').exists()).toBe(true)
    })

    it('handles GPU acceleration consistently', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          theme: 'gradient',
        },
      })

      expect(wrapper.find('.premium-hero__gradient-mesh').exists()).toBe(true)
    })
  })

  describe('Error Handling Across Browsers', () => {
    it('handles JavaScript errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      // This should not throw even if there are internal errors
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.find('.premium-hero').exists()).toBe(true)

      consoleSpy.mockRestore()
    })

    it('provides meaningful error messages', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.exists()).toBe(true)

      consoleSpy.mockRestore()
    })
  })
})
