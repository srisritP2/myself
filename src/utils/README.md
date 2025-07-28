# Portfolio Utilities Documentation

This directory contains reusable utility functions and composables that follow excellent coding standards and provide comprehensive functionality for the portfolio application.

## 📁 Structure Overview

```
src/utils/
├── animations.js      # Animation utilities and easing functions
├── dom.js            # DOM manipulation and interaction utilities
├── social.js         # Social media platform utilities
├── time.js           # Time formatting and timezone utilities
└── README.md         # This documentation file

src/composables/
└── usePremiumHero.js    # Premium hero composable with complete functionality
```

## 🎯 Design Principles

### Code Quality Standards
- **Comprehensive JSDoc documentation** for all functions
- **TypeScript-style type annotations** in comments
- **Error handling** with graceful fallbacks
- **Performance optimization** with cleanup functions
- **Accessibility compliance** built-in
- **Memory leak prevention** with proper cleanup
- **Validation** for all inputs with meaningful warnings

### Architecture Patterns
- **Single Responsibility Principle** - Each utility has one clear purpose
- **Dependency Injection** - Configurable options for flexibility
- **Composable Pattern** - Vue 3 composition API best practices
- **Factory Pattern** - Builder classes for complex configurations
- **Observer Pattern** - Reactive state management

## 📚 Utility Modules

### 🎬 animations.js

Provides smooth, performant animations with multiple easing functions.

```javascript
import { animateNumber, animateNumbersStaggered, EasingFunctions } from '@/utils/animations'

// Animate a single counter
const counter = ref(0)
await animateNumber(counter, 100, 2000, EasingFunctions.easeOutQuart)

// Animate multiple counters with stagger
await animateNumbersStaggered([
  { ref: yearsRef, target: 8 },
  { ref: projectsRef, target: 50 },
  { ref: clientsRef, target: 25 }
], 200, 2000)
```

**Key Features:**
- Multiple easing functions (easeOutQuart, easeInOutCubic, easeOutBounce)
- Promise-based API for chaining
- Staggered animations for multiple elements
- Mouse tracking for parallax effects
- Performance optimized with requestAnimationFrame

### 🌐 dom.js

Safe DOM manipulation with comprehensive error handling.

```javascript
import { scrollToElement, downloadFile, isElementVisible } from '@/utils/dom'

// Smooth scroll to element
scrollToElement('#contact', 'smooth', 'start')

// Download file with fallback
downloadFile('/resume.pdf', 'John_Doe_Resume.pdf', true)

// Check element visibility
if (isElementVisible('.hero-section', 0.5)) {
  // Element is 50% visible
}
```

**Key Features:**
- Safe element querying with null checks
- File download with fallback options
- Visibility detection with threshold support
- Debounce and throttle utilities
- Performance optimized operations

### 📱 social.js

Comprehensive social media platform handling.

```javascript
import { openSocialLink, getSocialLabel, validateSocialUrl } from '@/utils/social'

// Open social media link
openSocialLink('https://linkedin.com/in/johndoe', 'mdi-linkedin')

// Get platform label
const label = getSocialLabel('mdi-linkedin') // Returns 'LinkedIn'

// Validate URL format
const isValid = validateSocialUrl('https://linkedin.com/in/johndoe', 'LINKEDIN')
```

**Key Features:**
- Platform-specific URL validation
- Automatic email/phone handling
- Brand color extraction
- Username extraction from URLs
- Comprehensive platform support

### ⏰ time.js

Advanced time formatting and timezone management.

```javascript
import { formatTime, createReactiveTime, getTimezoneInfo } from '@/utils/time'

// Format time for specific timezone
const timeString = formatTime(new Date(), {
  timeZone: 'Asia/Kolkata',
  hour12: true
})

// Create auto-updating time
const { timeRef, cleanup } = createReactiveTime({
  timeZone: 'Asia/Kolkata',
  updateInterval: 60000
})
```

**Key Features:**
- Internationalization support
- Automatic cleanup for memory management
- Timezone information extraction
- Relative time calculations
- Real-time updates with intervals

## 🎛️ Composables

### 🦸 usePremiumHero.js

Complete premium hero functionality in a reusable composable.

```javascript
import { usePremiumHero, createPremiumHeroConfig } from '@/composables/usePremiumHero'

// Basic usage
const {
  heroRef,
  mousePosition,
  isVisible,
  animationTimeline,
  handleImageError,
  initializeAnimations
} = usePremiumHero(props, {
  animations: { enabled: true, duration: 800, stagger: 200 },
  mouse: { enabled: true, sensitivity: 0.5 }
})

// Advanced configuration with builder pattern
const config = createPremiumHeroConfig()
  .setAnimationDuration(1000)
  .setAnimationStagger(300)
  .enableMouse(true)
  .setParticleCount(8)
  .build()

const premiumHero = usePremiumHero(props, config)
```

**Key Features:**
- Complete animation system with Web Animations API
- Mouse tracking for parallax effects
- Intersection Observer for visibility detection
- Performance monitoring and optimization
- Accessibility support with reduced motion
- Builder pattern for complex configurations

## 🚀 Usage Examples

### Complete Hero Card Implementation

```vue
<template>
  <div class="hero-section">
    <div class="hero-card">
      <img :src="profilePhoto" class="profile-image" />
      <h1>{{ name }}</h1>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      
      <!-- Animated Statistics -->
      <div class="stats">
        <div class="stat">
          <span class="number">{{ animatedStats.experience }}+</span>
          <span class="label">Years Experience</span>
        </div>
        <div class="stat">
          <span class="number">{{ animatedStats.projects }}+</span>
          <span class="label">Projects</span>
        </div>
        <div class="stat">
          <span class="number">{{ animatedStats.clients }}+</span>
          <span class="label">Clients</span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="actions">
        <button @click="handleDownloadResume">Download Resume</button>
        <button @click="handleScrollToContact">Contact Me</button>
      </div>
      
      <!-- Social Links -->
      <div class="social-links">
        <button 
          v-for="social in socials" 
          :key="social.icon"
          @click="handleSocialClick(social.url, social.icon)"
          :aria-label="getSocialPlatformLabel(social.icon)"
        >
          <i :class="social.icon"></i>
        </button>
      </div>
      
      <!-- Real-time Clock -->
      <div class="time-info">
        <span>{{ getFormattedTime() }}</span>
        <span>{{ locationInfo.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHeroCard } from '@/composables/useHeroCard'

const props = defineProps({
  profilePhoto: String,
  name: String,
  title: String,
  description: String,
  expYears: Number,
  projects: Number,
  clients: Number,
  socials: Array,
  resumeUrl: String
})

const {
  animatedStats,
  locationInfo,
  handleDownloadResume,
  handleScrollToContact,
  handleSocialClick,
  getSocialPlatformLabel,
  getFormattedTime
} = useHeroCard(props, {
  location: 'Hyderabad, India',
  timezone: 'Asia/Kolkata',
  skills: [
    { name: 'Test Automation', level: 95 },
    { name: 'Quality Assurance', level: 98 },
    { name: 'Team Leadership', level: 90 },
    { name: 'Process Improvement', level: 88 }
  ]
})
</script>
```

## 🔧 Configuration Options

### Animation Configuration
```javascript
const animationConfig = {
  staggerDelay: 200,    // Delay between staggered animations (ms)
  duration: 2000,       // Animation duration (ms)
  easing: 'easeOutQuart' // Easing function name
}
```

### Time Configuration
```javascript
const timeConfig = {
  updateInterval: 60000,  // Update frequency (ms)
  timeZone: 'Asia/Kolkata', // IANA timezone identifier
  locale: 'en-US',        // Locale for formatting
  hour12: true            // 12-hour format
}
```

### Social Media Configuration
```javascript
const socialConfig = {
  newTab: true,           // Open links in new tab
  windowFeatures: 'noopener,noreferrer', // Window features
  validateUrls: true      // Validate URL formats
}
```

## 🧪 Testing Examples

```javascript
// Test animation utility
import { animateNumber } from '@/utils/animations'

test('animateNumber should animate from 0 to target', async () => {
  const counter = ref(0)
  await animateNumber(counter, 100, 1000)
  expect(counter.value).toBe(100)
})

// Test social utility
import { getSocialLabel } from '@/utils/social'

test('getSocialLabel should return correct platform name', () => {
  expect(getSocialLabel('mdi-linkedin')).toBe('LinkedIn')
  expect(getSocialLabel('mdi-github')).toBe('GitHub')
})

// Test time utility
import { formatTime } from '@/utils/time'

test('formatTime should format time correctly', () => {
  const date = new Date('2023-01-01T12:00:00Z')
  const formatted = formatTime(date, { timeZone: 'UTC', hour12: true })
  expect(formatted).toBe('12:00 PM')
})
```

## 📈 Performance Considerations

### Memory Management
- All utilities include proper cleanup functions
- Event listeners are automatically removed
- Intervals and timeouts are cleared on unmount
- Reactive references are properly disposed

### Optimization Techniques
- Debounced and throttled event handlers
- RequestAnimationFrame for smooth animations
- Passive event listeners where appropriate
- Efficient DOM queries with caching

### Bundle Size
- Tree-shakeable exports
- No unnecessary dependencies
- Minimal runtime overhead
- Optimized for production builds

## 🔒 Security Considerations

### Safe DOM Operations
- Null checks for all DOM queries
- XSS prevention in dynamic content
- Safe URL validation for external links
- Proper error boundaries

### Data Validation
- Input validation for all functions
- Type checking with meaningful warnings
- Sanitization of user-provided data
- Graceful error handling

## 🚀 Future Enhancements

### Planned Features
- WebGL-based animations for advanced effects
- Service Worker integration for offline support
- Advanced accessibility features
- Performance monitoring utilities
- Internationalization helpers

### Extension Points
- Custom easing function support
- Plugin system for additional utilities
- Theme system integration
- Analytics integration helpers

## 📝 Contributing Guidelines

### Code Standards
- Follow JSDoc documentation standards
- Include comprehensive error handling
- Write unit tests for all functions
- Use TypeScript-style annotations
- Follow Vue 3 composition API patterns

### Testing Requirements
- Unit tests for all utilities
- Integration tests for composables
- Performance benchmarks
- Accessibility testing
- Cross-browser compatibility

This utilities system provides a solid foundation for building modern, performant, and maintainable Vue.js applications with excellent developer experience and user experience.