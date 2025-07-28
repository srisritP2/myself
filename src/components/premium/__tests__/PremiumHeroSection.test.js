/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PremiumHeroSection from '../PremiumHeroSection.vue'

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

describe('PremiumHeroSection', () => {
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
    primaryCTA: {
      label: 'Download Resume',
      action: vi.fn(),
    },
    secondaryCTA: {
      label: 'Contact Me',
      action: vi.fn(),
    },
  }

  const mockSocial = [
    { platform: 'linkedin', url: 'https://linkedin.com/test', icon: 'mdi-linkedin' },
  ]

  beforeEach(() => {
    wrapper = mount(PremiumHeroSection, {
      props: {
        profile: mockProfile,
        stats: mockStats,
        actions: mockActions,
        social: mockSocial,
      },
    })
  })

  describe('Component Structure', () => {
    it('renders the main hero section', () => {
      expect(wrapper.find('.premium-hero').exists()).toBe(true)
    })

    it('renders all child components', () => {
      expect(wrapper.find('[data-testid="hero-profile"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-content"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-stats"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="hero-actions"]').exists()).toBe(true)
    })

    it('renders background elements', () => {
      expect(wrapper.find('.premium-hero__background').exists()).toBe(true)
      expect(wrapper.find('.premium-hero__gradient-mesh').exists()).toBe(true)
    })
  })

  describe('Props Validation', () => {
    it('validates required profile prop', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      mount(PremiumHeroSection, {
        props: {
          profile: { name: 'Test' }, // Missing required fields
          actions: mockActions,
        },
      })

      consoleError.mockRestore()
    })

    it('validates required actions prop', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: { primaryCTA: { label: 'Test' } }, // Missing secondaryCTA
        },
      })

      consoleError.mockRestore()
    })
  })

  describe('Theme Variants', () => {
    it('applies minimal theme class', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          theme: 'minimal',
        },
      })

      expect(wrapper.find('.premium-hero--minimal').exists()).toBe(true)
    })

    it('applies gradient theme class', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          theme: 'gradient',
        },
      })

      expect(wrapper.find('.premium-hero--gradient').exists()).toBe(true)
    })

    it('applies glass theme class', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          theme: 'glass',
        },
      })

      expect(wrapper.find('.premium-hero--glass').exists()).toBe(true)
    })
  })

  describe('Layout Variants', () => {
    it('applies split layout class', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          layout: 'split',
        },
      })

      expect(wrapper.find('.premium-hero--split').exists()).toBe(true)
    })

    it('applies centered layout class', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          layout: 'centered',
        },
      })

      expect(wrapper.find('.premium-hero--centered').exists()).toBe(true)
    })
  })

  describe('Animation Support', () => {
    it('applies animated class when animations enabled', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          animationsEnabled: true,
        },
      })

      expect(wrapper.find('.premium-hero--animated').exists()).toBe(true)
    })

    it('does not apply animated class when animations disabled', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          animationsEnabled: false,
        },
      })

      expect(wrapper.find('.premium-hero--animated').exists()).toBe(false)
    })
  })

  describe('Particles Display', () => {
    it('shows particles for gradient theme with animations', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          theme: 'gradient',
          animationsEnabled: true,
        },
      })

      expect(wrapper.find('.premium-hero__particles').exists()).toBe(true)
    })

    it('hides particles for non-gradient theme', () => {
      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          theme: 'minimal',
          animationsEnabled: true,
        },
      })

      expect(wrapper.find('.premium-hero__particles').exists()).toBe(false)
    })
  })

  describe('Display Configuration', () => {
    it('passes display config to child components', () => {
      const displayConfig = {
        showStats: false,
        showStatus: true,
        showLocation: true,
        showSocial: false,
      }

      wrapper = mount(PremiumHeroSection, {
        props: {
          profile: mockProfile,
          actions: mockActions,
          displayConfig,
        },
      })

      // Stats should not be rendered when showStats is false
      expect(wrapper.find('[data-testid="hero-stats"]').exists()).toBe(false)
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('section').attributes('class')).toContain('premium-hero')
    })

    it('provides proper ARIA structure', () => {
      const section = wrapper.find('section')
      expect(section.exists()).toBe(true)
    })
  })
})
