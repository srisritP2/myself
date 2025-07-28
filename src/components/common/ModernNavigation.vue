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
    label: 'What I Help',
    icon: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z',
  },
  {
    id: 'professional-summary',
    label: 'Summary',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: 'M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19v2h-1.5v.5h-1V4H15v.5h-1V4h-1.5v.5h-1V4H10v.5H9V4H7.5v.5h-1V4H5v2H3.5C2.67 6 2 6.67 2 7.5v11C2 19.33 2.67 20 3.5 20h17c.83 0 1.5-.67 1.5-1.5v-11C22 6.67 21.33 6 20.5 6z',
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z',
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: 'M20 6h-2.5l-1.5-1.5h-5L9.5 6H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z',
  },
  {
    id: 'education',
    label: 'Education',
    icon: 'M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z',
  },
  {
    id: 'cocurricular',
    label: 'Activities',
    icon: 'M16 4C16.5523 4 17 4.44772 17 5V9H20C20.5523 9 21 9.44772 21 10V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V10C3 9.44772 3.44772 9 4 9H7V5C7 4.44772 7.44772 4 8 4H16Z',
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    icon: 'M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z',
  },
  {
    id: 'personal-profile',
    label: 'Profile',
    icon: 'M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z',
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
  const scrollTop = window.scrollY || document.documentElement.scrollTop
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
  z-index: var(--cg-z-fixed, 1030);
  background: rgba(var(--bg-primary-rgb), 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-primary);
  transition: all var(--duration-fast) var(--ease-out);
}

.modern-navigation.is-sticky {
  background: rgba(var(--bg-primary-rgb), 0.98);
  box-shadow: var(--shadow-md);
}

/* Creative Gradient Theme Navigation - Using v2.0 System */
:root[data-theme='creative-gradient'] .modern-navigation {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border-bottom: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  z-index: var(--cg-z-fixed) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .modern-navigation.is-sticky {
  background: var(--cg-glass-bg-strong) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  border-bottom-color: var(--cg-glass-border-hover) !important;
}

.nav-container {
  width: 100%;
  margin: 0;
  padding: 0 var(--cg-space-xl, var(--space-4));
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

/* Creative Gradient Theme Brand Overrides */
:root[data-theme='creative-gradient'] .brand-link {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow) !important;
}

:root[data-theme='creative-gradient'] .brand-icon {
  background: var(--cg-glass-bg-strong) !important;
  color: var(--cg-text-primary) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

:root[data-theme='creative-gradient'] .brand-link:hover .brand-icon {
  background: var(--cg-glass-bg-interactive) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: scale(1.05) translateY(-1px) !important;
}

/* Desktop Navigation */
.nav-menu {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--cg-space-sm, var(--space-2));
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--cg-space-xs, var(--space-1));
  padding: var(--cg-space-sm, var(--space-2)) var(--cg-space-md, var(--space-3));
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: var(--text-xs);
  border-radius: var(--cg-radius-md, var(--radius-md));
  transition: all var(--cg-transition-fast, var(--duration-fast)) var(--ease-out);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
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

/* Creative Gradient Theme Navigation Links */
:root[data-theme='creative-gradient'] .nav-link {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  background: var(--cg-glass-bg-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .nav-link:hover {
  color: var(--cg-text-primary) !important;
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  transform: translateY(-2px) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

:root[data-theme='creative-gradient'] .nav-link.is-active {
  color: var(--cg-text-primary) !important;
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
}

:root[data-theme='creative-gradient'] .nav-link.is-active::after {
  background: var(--cg-text-primary) !important;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4) !important;
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

/* Creative Gradient Theme Mobile Menu */
:root[data-theme='creative-gradient'] .mobile-menu {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border-bottom: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

:root[data-theme='creative-gradient'] .mobile-nav-link {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  background: var(--cg-glass-bg-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .mobile-nav-link:hover,
:root[data-theme='creative-gradient'] .mobile-nav-link.is-active {
  color: var(--cg-text-primary) !important;
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: translateY(-1px) !important;
}

:root[data-theme='creative-gradient'] .mobile-menu-toggle {
  background: var(--cg-glass-bg-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .mobile-menu-toggle:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .hamburger-line {
  background: var(--cg-text-primary) !important;
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

/* Creative Gradient Theme Progress Indicator */
:root[data-theme='creative-gradient'] .nav-progress {
  background: var(--cg-gradient-accent) !important;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4) !important;
  height: 3px !important;
  border-radius: var(--cg-radius-sm) !important;
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
