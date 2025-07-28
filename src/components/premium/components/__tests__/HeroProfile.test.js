/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroProfile from '../HeroProfile.vue'

describe('HeroProfile', () => {
  let wrapper
  const mockProfile = {
    name: 'John Doe',
    title: 'Software Engineer',
    imageUrl: '/test-image.jpg',
    status: 'available',
  }

  beforeEach(() => {
    wrapper = mount(HeroProfile, {
      props: {
        profile: mockProfile,
      },
    })
  })

  describe('Component Structure', () => {
    it('renders the profile container', () => {
      expect(wrapper.find('.hero-profile').exists()).toBe(true)
    })

    it('renders the image container', () => {
      expect(wrapper.find('.hero-profile__image-container').exists()).toBe(true)
    })

    it('renders the profile info', () => {
      expect(wrapper.find('.hero-profile__info').exists()).toBe(true)
      expect(wrapper.find('.hero-profile__name').text()).toBe('John Doe')
      expect(wrapper.find('.hero-profile__title').text()).toBe('Software Engineer')
    })
  })

  describe('Image Handling', () => {
    it('renders the picture element with sources', () => {
      expect(wrapper.find('.hero-profile__picture').exists()).toBe(true)
      expect(wrapper.find('source[type="image/webp"]').exists()).toBe(true)
      expect(wrapper.find('source[type="image/jpeg"]').exists()).toBe(true)
    })

    it('renders the main image with correct attributes', () => {
      const img = wrapper.find('.hero-profile__image')
      expect(img.exists()).toBe(true)
      expect(img.attributes('alt')).toBe('John Doe profile photo')
      expect(img.attributes('loading')).toBe('eager')
      expect(img.attributes('decoding')).toBe('async')
    })

    it('handles image load event', async () => {
      const img = wrapper.find('.hero-profile__image')
      await img.trigger('load')

      expect(wrapper.emitted('image-load')).toBeTruthy()
    })

    it('handles image error event', async () => {
      const img = wrapper.find('.hero-profile__image')
      await img.trigger('error')

      expect(wrapper.emitted('image-error')).toBeTruthy()
    })

    it('shows loading skeleton initially', () => {
      expect(wrapper.find('.hero-profile__skeleton').exists()).toBe(true)
    })
  })

  describe('Status Indicator', () => {
    it('renders status indicator when status is provided', () => {
      expect(wrapper.find('.hero-profile__status').exists()).toBe(true)
      expect(wrapper.find('.hero-profile__status--available').exists()).toBe(true)
      expect(wrapper.find('.hero-profile__status-dot').exists()).toBe(true)
    })

    it('applies correct status class', async () => {
      await wrapper.setProps({
        profile: { ...mockProfile, status: 'busy' },
      })

      expect(wrapper.find('.hero-profile__status--busy').exists()).toBe(true)
    })

    it('has proper accessibility attributes', () => {
      const status = wrapper.find('.hero-profile__status')
      expect(status.attributes('title')).toBe('Available for opportunities')
    })

    it('does not render status when not provided', async () => {
      await wrapper.setProps({
        profile: { ...mockProfile, status: null },
      })

      expect(wrapper.find('.hero-profile__status').exists()).toBe(false)
    })
  })

  describe('Error State', () => {
    it('shows error state when image fails to load', async () => {
      // Simulate image error
      const img = wrapper.find('.hero-profile__image')
      await img.trigger('error')

      // Wait for reactive updates
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.hero-profile__error').exists()).toBe(true)
      expect(wrapper.find('.hero-profile__error-icon').exists()).toBe(true)
    })
  })

  describe('Lazy Loading', () => {
    it('sets lazy loading attributes when lazyLoad is true', () => {
      wrapper = mount(HeroProfile, {
        props: {
          profile: mockProfile,
          lazyLoad: true,
        },
      })

      const img = wrapper.find('.hero-profile__image')
      expect(img.attributes('loading')).toBe('lazy')
      expect(img.attributes('fetchpriority')).toBe('low')
    })

    it('sets eager loading attributes when lazyLoad is false', () => {
      wrapper = mount(HeroProfile, {
        props: {
          profile: mockProfile,
          lazyLoad: false,
        },
      })

      const img = wrapper.find('.hero-profile__image')
      expect(img.attributes('loading')).toBe('eager')
      expect(img.attributes('fetchpriority')).toBe('high')
    })
  })

  describe('Animation Support', () => {
    it('applies animated class to skeleton when animated is true', () => {
      wrapper = mount(HeroProfile, {
        props: {
          profile: mockProfile,
          animated: true,
        },
      })

      expect(wrapper.find('.hero-profile__skeleton--animated').exists()).toBe(true)
    })

    it('does not apply animated class when animated is false', () => {
      wrapper = mount(HeroProfile, {
        props: {
          profile: mockProfile,
          animated: false,
        },
      })

      expect(wrapper.find('.hero-profile__skeleton--animated').exists()).toBe(false)
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      expect(wrapper.find('h1').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(true)
    })

    it('provides proper alt text for image', () => {
      const img = wrapper.find('.hero-profile__image')
      expect(img.attributes('alt')).toBe('John Doe profile photo')
    })

    it('provides proper title for status indicator', () => {
      const status = wrapper.find('.hero-profile__status')
      expect(status.attributes('title')).toBeTruthy()
    })
  })

  describe('Responsive Behavior', () => {
    it('maintains proper structure across different screen sizes', () => {
      // Test that essential elements are present for responsive design
      expect(wrapper.find('.hero-profile__image-container').exists()).toBe(true)
      expect(wrapper.find('.hero-profile__info').exists()).toBe(true)
    })
  })
})
