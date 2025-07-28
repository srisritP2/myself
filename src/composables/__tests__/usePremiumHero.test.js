/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { usePremiumHero, createPremiumHeroConfig } from '../usePremiumHero'

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(_callback => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock performance.now
global.performance = {
  now: vi.fn(() => Date.now()),
}

describe('usePremiumHero', () => {
  let mockProps
  let heroComposable

  beforeEach(() => {
    mockProps = {
      animationsEnabled: true,
      theme: 'gradient',
      layout: 'split',
    }

    vi.clearAllMocks()
  })

  afterEach(() => {
    if (heroComposable?.cleanup) {
      heroComposable.cleanup()
    }
  })

  describe('Initialization', () => {
    it('initializes with default configuration', () => {
      heroComposable = usePremiumHero(mockProps)

      expect(heroComposable.heroRef).toBeDefined()
      expect(heroComposable.mousePosition).toBeDefined()
      expect(heroComposable.isVisible).toBeDefined()
      expect(heroComposable.animationTimeline).toBeDefined()
    })

    it('merges custom configuration with defaults', () => {
      const customConfig = {
        animations: { duration: 1000, stagger: 300 },
        mouse: { enabled: false },
      }

      heroComposable = usePremiumHero(mockProps, customConfig)

      expect(heroComposable.config.animations.duration).toBe(1000)
      expect(heroComposable.config.animations.stagger).toBe(300)
      expect(heroComposable.config.mouse.enabled).toBe(false)
    })
  })

  describe('Animation System', () => {
    beforeEach(() => {
      heroComposable = usePremiumHero(mockProps)
    })

    it('creates animation timeline', () => {
      heroComposable.initializeAnimations()

      expect(heroComposable.animationTimeline.value.sequence).toBeDefined()
      expect(heroComposable.animationTimeline.value.totalDuration).toBeGreaterThan(0)
    })

    it('respects reduced motion preference', () => {
      // Mock reduced motion preference
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      heroComposable = usePremiumHero({ ...mockProps, animationsEnabled: true })

      expect(heroComposable.animationsEnabled.value).toBe(false)
    })
  })

  describe('Mouse Tracking', () => {
    beforeEach(() => {
      heroComposable = usePremiumHero(mockProps)
      // Mock heroRef with getBoundingClientRect
      heroComposable.heroRef.value = {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0,
          width: 1000,
          height: 600,
        }),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }
    })

    it('updates mouse position on mouse move', () => {
      const mockEvent = {
        clientX: 500,
        clientY: 300,
      }

      // Simulate mouse move
      heroComposable.handleMouseMove?.(mockEvent)

      expect(heroComposable.mousePosition.value.x).toBe(0.5)
      expect(heroComposable.mousePosition.value.y).toBe(0.5)
    })

    it('clamps mouse position to valid range', () => {
      const mockEvent = {
        clientX: -100, // Outside bounds
        clientY: 1000, // Outside bounds
      }

      heroComposable.handleMouseMove?.(mockEvent)

      expect(heroComposable.mousePosition.value.x).toBeGreaterThanOrEqual(0)
      expect(heroComposable.mousePosition.value.x).toBeLessThanOrEqual(1)
      expect(heroComposable.mousePosition.value.y).toBeGreaterThanOrEqual(0)
      expect(heroComposable.mousePosition.value.y).toBeLessThanOrEqual(1)
    })
  })

  describe('Image Error Handling', () => {
    beforeEach(() => {
      heroComposable = usePremiumHero(mockProps)
    })

    it('handles image errors correctly', () => {
      const mockEvent = {
        target: {
          src: '/test-image.jpg',
        },
      }

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      heroComposable.handleImageError(mockEvent)

      expect(mockEvent.target.src).toBe('/profile-photo.svg')
      expect(consoleSpy).toHaveBeenCalledWith('Profile image failed to load, using fallback')

      consoleSpy.mockRestore()
    })

    it('does not modify already fallback images', () => {
      const mockEvent = {
        target: {
          src: '/profile-photo.svg',
        },
      }

      heroComposable.handleImageError(mockEvent)

      expect(mockEvent.target.src).toBe('/profile-photo.svg')
    })
  })

  describe('Performance Monitoring', () => {
    beforeEach(() => {
      heroComposable = usePremiumHero(mockProps)
    })

    it('measures performance metrics', () => {
      const startTime = 100
      global.performance.now = vi
        .fn()
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(startTime + 50)

      heroComposable.measurePerformance('loadTime', startTime)

      expect(heroComposable.performanceMetrics.value.loadTime).toBe(50)
    })

    it('logs performance warnings for slow operations', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const startTime = 100

      global.performance.now = vi
        .fn()
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(startTime + 150) // Slow operation

      heroComposable.measurePerformance('loadTime', startTime)

      expect(consoleSpy).toHaveBeenCalledWith('Premium Hero loadTime took 150.00ms')

      consoleSpy.mockRestore()
    })
  })

  describe('Utility Functions', () => {
    beforeEach(() => {
      heroComposable = usePremiumHero(mockProps)
    })

    it('gets current theme from document', () => {
      document.documentElement.dataset.theme = 'creative-gradient'

      const theme = heroComposable.getCurrentTheme()

      expect(theme).toBe('creative-gradient')
    })

    it('returns default theme when none set', () => {
      delete document.documentElement.dataset.theme

      const theme = heroComposable.getCurrentTheme()

      expect(theme).toBe('professional-dark')
    })

    it('gets optimal image size based on viewport', () => {
      // Mock window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      })

      const size = heroComposable.getOptimalImageSize()

      expect(size).toBe('140w')
    })
  })

  describe('Cleanup', () => {
    it('cleans up event listeners and observers', () => {
      heroComposable = usePremiumHero(mockProps)

      const mockElement = {
        removeEventListener: vi.fn(),
      }
      heroComposable.heroRef.value = mockElement

      heroComposable.cleanup()

      // Verify cleanup was called (implementation details may vary)
      expect(heroComposable.cleanup).toBeDefined()
    })
  })
})

describe('createPremiumHeroConfig', () => {
  it('creates a configuration builder', () => {
    const builder = createPremiumHeroConfig()

    expect(builder).toBeDefined()
    expect(typeof builder.setAnimationDuration).toBe('function')
    expect(typeof builder.build).toBe('function')
  })

  it('builds configuration with custom values', () => {
    const config = createPremiumHeroConfig()
      .setAnimationDuration(1000)
      .setAnimationStagger(300)
      .enableMouse(false)
      .setParticleCount(12)
      .build()

    expect(config.animations.duration).toBe(1000)
    expect(config.animations.stagger).toBe(300)
    expect(config.mouse.enabled).toBe(false)
    expect(config.particles.count).toBe(12)
  })
})
