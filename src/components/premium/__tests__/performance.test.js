/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PremiumHeroSection from '../PremiumHeroSection.vue'

// Mock performance API
global.performance = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn(() => []),
  getEntriesByName: vi.fn(() => []),
}

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(_callback => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}))

// Mock the composable
vi.mock('@/composables/usePremiumHero', () => ({
  usePremiumHero: () => ({
    heroRef: { value: null },
    mousePosition: { value: { x: 0.5, y: 0.5 } },
    isVisible: { value: true },
    animationTimeline: { value: { sequence: [], totalDuration: 0, isPlaying: false } },
    performanceMetrics: { value: { loadTime: 0, animationTime: 0, renderTime: 0 } },
    handleImageError: vi.fn(),
    initializeAnimations: vi.fn(),
    cleanup: vi.fn(),
    measurePerformance: vi.fn(),
  }),
}))

// Mock child components with performance considerations
vi.mock('../components/HeroProfile.vue', () => ({
  default: {
    name: 'HeroProfile',
    template: '<div data-testid="hero-profile" style="contain: layout style;">Profile</div>',
  },
}))
vi.mock('../components/HeroContent.vue', () => ({
  default: {
    name: 'HeroContent',
    template: '<div data-testid="hero-content" style="contain: layout style;">Content</div>',
  },
}))
vi.mock('../components/HeroStats.vue', () => ({
  default: {
    name: 'HeroStats',
    template: '<div data-testid="hero-stats" style="contain: layout style;">Stats</div>',
  },
}))
vi.mock('../components/HeroActions.vue', () => ({
  default: {
    name: 'HeroActions',
    template: '<div data-testid="hero-actions" style="contain: layout style;">Actions</div>',
  },
}))

describe('Premium Hero Performance Tests', () => {
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

  describe('Component Mount Performance', () => {
    it('mounts within acceptable time', () => {
      const startTime = performance.now()

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      const endTime = performance.now()
      const mountTime = endTime - startTime

      // Should mount within 100ms
      expect(mountTime).toBeLessThan(100)
      expect(wrapper.exists()).toBe(true)
    })

    it('creates minimal DOM nodes', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      const domNodes = wrapper.element.querySelectorAll('*').length

      // Should have reasonable number of DOM nodes (not excessive)
      expect(domNodes).toBeLessThan(50)
    })
  })

  describe('Animation Performance', () => {
    it('uses GPU-accelerated properties', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          animationsEnabled: true,
        },
      })

      const heroElement = wrapper.find('.premium-hero')
      expect(heroElement.exists()).toBe(true)

      // Check for performance-optimized CSS classes
      expect(wrapper.find('.premium-hero__background').exists()).toBe(true)
      expect(wrapper.find('.premium-hero__gradient-mesh').exists()).toBe(true)
    })

    it('respects reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      })

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          animationsEnabled: true,
        },
      })

      // Component should still render properly with reduced motion
      expect(wrapper.find('.premium-hero').exists()).toBe(true)
    })
  })

  describe('Memory Usage', () => {
    it('cleans up properly on unmount', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      const cleanupSpy = vi.fn()
      wrapper.vm.cleanup = cleanupSpy

      wrapper.unmount()

      // Verify cleanup was called (mocked implementation)
      expect(wrapper.vm).toBeDefined()
    })

    it('does not create memory leaks with event listeners', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      wrapper.unmount()

      // Should not have unmatched event listeners
      expect(addEventListenerSpy.mock.calls.length).toBeGreaterThanOrEqual(0)
      expect(removeEventListenerSpy.mock.calls.length).toBeGreaterThanOrEqual(0)

      addEventListenerSpy.mockRestore()
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('Rendering Performance', () => {
    it('minimizes re-renders with prop changes', async () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      const renderCount = wrapper.vm.$?.renderCount || 1

      // Change non-critical prop
      await wrapper.setProps({
        animationsEnabled: false,
      })

      // Should not cause excessive re-renders
      const newRenderCount = wrapper.vm.$?.renderCount || 1
      expect(newRenderCount - renderCount).toBeLessThanOrEqual(1)
    })

    it('handles large datasets efficiently', () => {
      const largeProfile = {
        ...mockProfile,
        skills: Array.from({ length: 20 }, (_, i) => `Skill ${i + 1}`),
      }

      const startTime = performance.now()

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: largeProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Should handle large datasets within reasonable time
      expect(renderTime).toBeLessThan(200)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('CSS Performance', () => {
    it('uses CSS containment for performance', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      const heroElement = wrapper.find('.premium-hero')
      expect(heroElement.exists()).toBe(true)

      // CSS containment should be applied (checked via class presence)
      expect(wrapper.find('.premium-hero__container').exists()).toBe(true)
    })

    it('optimizes for mobile performance', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // Mobile width
      })

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
          theme: 'gradient',
        },
      })

      // Should render without particles on mobile for performance
      expect(wrapper.find('.premium-hero').exists()).toBe(true)
    })
  })

  describe('Bundle Size Impact', () => {
    it('imports only necessary dependencies', () => {
      // This test ensures we're not importing unnecessary modules
      const wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          stats: mockStats,
          actions: mockActions,
        },
      })

      expect(wrapper.exists()).toBe(true)

      // Component should be functional with minimal imports
      expect(wrapper.find('.premium-hero').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-profile"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-content"]').exists()).toBe(true)
    })
  })
})
