<template>
  <nav
    class="modern-navigation"
    :class="{ 'is-sticky': isSticky, 'is-mobile-open': isMobileMenuOpen }"
  >
    <div class="nav-container">
      <!-- Logo/Brand -->
      <div class="nav-brand">
        <a href="#hero" @click="scrollToSection('hero')" class="brand-link">
          <div class="brand-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span class="brand-text">Sri Sri Tummu</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="nav-menu">
        <ul class="nav-list">
          <li v-for="item in navigationItems" :key="item.id" class="nav-item">
            <a
              :href="`#${item.id}`"
              @click="scrollToSection(item.id)"
              class="nav-link"
              :class="{ 'is-active': activeSection === item.id }"
            >
              <span class="nav-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path :d="item.icon" fill="currentColor" />
                </svg>
              </span>
              <span class="nav-text">{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <ul class="mobile-nav-list">
        <li v-for="item in navigationItems" :key="item.id" class="mobile-nav-item">
          <a
            :href="`#${item.id}`"
            @click="scrollToSection(item.id)"
            class="mobile-nav-link"
            :class="{ 'is-active': activeSection === item.id }"
          >
            <span class="mobile-nav-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path :d="item.icon" fill="currentColor" />
              </svg>
            </span>
            <span class="mobile-nav-text">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Navigation Progress Indicator -->
    <div class="nav-progress" :style="{ width: scrollProgress + '%' }"></div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  enableAnimations: {
    type: Boolean,
    default: true,
  },
})

// Navigation state
const isSticky = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')
const scrollProgress = ref(0)

// Navigation items
const navigationItems = [
  {
    id: 'hero',
    label: 'Home',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  },
  {
    id: 'about',
    label: 'About',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: 'M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19v2h-1.5v.5h-1V4H15v.5h-1V4h-1.5v.5h-1V4H10v.5H9V4H7.5v.5h-1V4H5v2H3.5C2.67 6 2 6.67 2 7.5v11C2 19.33 2.67 20 3.5 20h17c.83 0 1.5-.67 1.5-1.5v-11C22 6.67 21.33 6 20.5 6z',
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: 'M20 6h-2.5l-1.5-1.5h-5L9.5 6H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z',
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    icon: 'M7 9H2V7h5v2zm0 3H2v2h5v-2zm13.59 7L15 13.41 16.41 12 22 17.59 20.59 19zM1 18.27L2.28 17 11 25.72 9.72 27 1 18.27z',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
]

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Account for sticky nav height
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })
  }

  // Close mobile menu if open
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Handle scroll events
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  // Update sticky state
  isSticky.value = scrollTop > 100

  // Update scroll progress
  scrollProgress.value = (scrollTop / (documentHeight - windowHeight)) * 100

  // Update active section
  const sections = navigationItems.map(item => item.id)
  let currentSection = 'hero'

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = sectionId
        break
      }
    }
  }

  activeSection.value = currentSection
}

// Handle resize events
function handleResize() {
  if (window.innerWidth > 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Modern Navigation Container */
.modern-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(var(--bg-primary-rgb), 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-primary);
  transition: all var(--duration-fast) var(--ease-out);
}

.modern-navigation.is-sticky {
  background: rgba(var(--bg-primary-rgb), 0.98);
  box-shadow: var(--shadow-md);
}

.nav-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Brand/Logo */
.nav-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--text-lg);
  transition: all var(--duration-fast) var(--ease-out);
}

.brand-link:hover {
  color: var(--color-primary-500);
  transform: translateY(-1px);
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-primary-500);
  color: var(--text-inverse);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);
}

.brand-link:hover .brand-icon {
  background: var(--color-primary-600);
  transform: scale(1.05);
}

.brand-text {
  font-family: var(--font-primary);
  font-weight: 700;
}

/* Desktop Navigation */
.nav-menu {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(var(--color-primary-rgb), 0.1), transparent);
  transition: left var(--duration-normal) var(--ease-out);
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: var(--color-primary-500);
  background: rgba(var(--color-primary-rgb), 0.1);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--color-primary-rgb), 0.2);
}

.nav-link.is-active {
  color: var(--color-primary-500);
  background: rgba(var(--color-primary-rgb), 0.15);
  box-shadow: 0 2px 8px rgba(var(--color-primary-rgb), 0.15);
}

.nav-link.is-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px;
  height: 2px;
  background: var(--color-primary-500);
  border-radius: 1px;
  animation: slideInScale var(--duration-normal) var(--ease-out) forwards;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.nav-link:hover .nav-icon,
.nav-link.is-active .nav-icon {
  opacity: 1;
}

.nav-text {
  font-family: var(--font-secondary);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: background-color var(--duration-fast) var(--ease-out);
}

.mobile-menu-toggle:hover {
  background: rgba(var(--color-primary-rgb), 0.1);
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  margin: 2px 0;
  transition: all var(--duration-fast) var(--ease-out);
  border-radius: 1px;
}

.hamburger-line.is-active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-line.is-active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.is-active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}

.mobile-menu.is-open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: var(--space-4);
}

.mobile-nav-item {
  margin-bottom: var(--space-2);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: var(--text-base);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);
  min-height: 48px;
  /* Touch-friendly */
}

.mobile-nav-link:hover,
.mobile-nav-link.is-active {
  color: var(--color-primary-500);
  background: rgba(var(--color-primary-rgb), 0.1);
}

.mobile-nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.mobile-nav-text {
  font-family: var(--font-secondary);
  font-weight: 500;
}

/* Navigation Progress Indicator */
.nav-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--color-primary-500);
  transition: width var(--duration-fast) var(--ease-out);
  border-radius: 1px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .brand-text {
    display: none;
  }

  .nav-container {
    height: 60px;
    padding: 0 var(--space-3);
  }

  .brand-icon {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 var(--space-2);
  }

  .mobile-nav-list {
    padding: var(--space-3);
  }

  .mobile-nav-link {
    padding: var(--space-3);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .modern-navigation,
  .nav-link,
  .mobile-menu,
  .hamburger-line,
  .nav-progress {
    transition: none;
  }
}

/* Animation Keyframes */
@keyframes slideInScale {
  0% {
    transform: translateX(-50%) scaleX(0);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

/* Enhanced Mobile Menu Animations */
.mobile-nav-item {
  opacity: 0;
  transform: translateY(10px);
  transition: all var(--duration-fast) var(--ease-out);
}

.mobile-menu.is-open .mobile-nav-item {
  opacity: 1;
  transform: translateY(0);
}

.mobile-menu.is-open .mobile-nav-item:nth-child(1) {
  transition-delay: 0.1s;
}

.mobile-menu.is-open .mobile-nav-item:nth-child(2) {
  transition-delay: 0.15s;
}

.mobile-menu.is-open .mobile-nav-item:nth-child(3) {
  transition-delay: 0.2s;
}

.mobile-menu.is-open .mobile-nav-item:nth-child(4) {
  transition-delay: 0.25s;
}

.mobile-menu.is-open .mobile-nav-item:nth-child(5) {
  transition-delay: 0.3s;
}

.mobile-menu.is-open .mobile-nav-item:nth-child(6) {
  transition-delay: 0.35s;
}

/* Enhanced Icon Animations */
.nav-icon svg,
.mobile-nav-icon svg {
  transition: transform var(--duration-fast) var(--ease-out);
}

.nav-link:hover .nav-icon svg {
  transform: scale(1.1);
}

.mobile-nav-link:hover .mobile-nav-icon svg {
  transform: scale(1.1);
}

/* Progress Bar Animation */
.nav-progress {
  background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
  box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.3);
}

/* Sticky Navigation Enhanced Animation */
.modern-navigation.is-sticky {
  animation: slideDown var(--duration-normal) var(--ease-out);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

/* Focus States for Keyboard Navigation */
.nav-link:focus,
.mobile-nav-link:focus,
.brand-link:focus,
.mobile-menu-toggle:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .modern-navigation {
    border-bottom-width: 2px;
  }

  .nav-link.is-active::after {
    height: 3px;
  }

  .nav-progress {
    height: 3px;
  }

  .nav-link:focus,
  .mobile-nav-link:focus,
  .brand-link:focus,
  .mobile-menu-toggle:focus {
    outline-width: 3px;
  }
}
</style>
