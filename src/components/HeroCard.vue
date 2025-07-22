<template>
  <div class="hero-section">
    <div class="hero-container">
      <!-- Left Side - Profile Image with Floating Elements -->
      <div class="hero-left">
        <div class="profile-image-container">
          <div class="profile-image-wrapper">
            <img
              :src="profilePhotoUrl"
              @error="onImgError"
              alt="Sri Sri Tummu profile photo"
              class="profile-image"
              loading="eager"
            />
            <div class="profile-image-overlay"></div>
          </div>

          <!-- Floating Stats -->
          <div class="floating-stat floating-stat--1">
            <div class="stat-icon stat-icon--primary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">{{ expYears }}+</span>
              <span class="stat-label">Years</span>
            </div>
          </div>

          <div class="floating-stat floating-stat--2">
            <div class="stat-icon stat-icon--secondary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V8A2,2 0 0,1 4,6H8V4A2,2 0 0,1 10,2M14,6V4H10V6H14Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">{{ projects }}+</span>
              <span class="stat-label">Projects</span>
            </div>
          </div>

          <div class="floating-stat floating-stat--3">
            <div class="stat-icon stat-icon--accent">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16,4C16.88,4 17.67,4.5 18,5.26L19,7H20A2,2 0 0,1 22,9V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V9A2,2 0 0,1 4,7H5L6,5.26C6.33,4.5 7.12,4 8,4H16M8.5,5.5A0.5,0.5 0 0,0 8,6A0.5,0.5 0 0,0 8.5,6.5A0.5,0.5 0 0,0 9,6A0.5,0.5 0 0,0 8.5,5.5M15.5,5.5A0.5,0.5 0 0,0 15,6A0.5,0.5 0 0,0 15.5,6.5A0.5,0.5 0 0,0 16,6A0.5,0.5 0 0,0 15.5,5.5M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">{{ clients }}+</span>
              <span class="stat-label">Clients</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Content -->
      <div class="hero-right">
        <div class="hero-content">
          <!-- Name with Gradient Effect -->
          <h1 class="hero-name">
            <span class="name-primary">{{ name }}</span>
          </h1>

          <!-- Title -->
          <h2 class="hero-title">{{ title }}</h2>

          <!-- Description -->
          <p class="hero-description">{{ description }}</p>

          <!-- Action Buttons -->
          <div class="hero-actions">
            <a :href="resumeUrl" download class="hero-btn hero-btn--primary">
              <svg
                class="btn-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill="currentColor" />
              </svg>
              Download Resume
            </a>

            <button class="hero-btn hero-btn--secondary" @click="scrollToContact">
              <svg
                class="btn-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  fill="currentColor"
                />
              </svg>
              Get In Touch
            </button>
          </div>

          <!-- Social Links -->
          <div class="hero-socials">
            <span class="socials-label">Connect with me:</span>
            <div class="socials-list">
              <button
                v-for="social in socials"
                :key="social.icon"
                @click="openSocial(social.url, social.icon)"
                :aria-label="`Link to ${getSocialLabel(social.icon)}`"
                class="social-btn"
              >
                <component :is="getSocialIcon(social.icon)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="scroll-text">Scroll to explore</div>
      <div class="scroll-arrow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

defineProps({
  profilePhotoUrl: String,
  onImgError: Function,
  name: String,
  title: String,
  description: String,
  expYears: Number,
  projects: Number,
  clients: Number,
  socials: Array,
  resumeUrl: String,
})

function openSocial(url, icon) {
  if (icon === 'mdi-email') {
    window.location.href = `mailto:${url.replace('mailto:', '')}`
  } else if (icon === 'mdi-phone') {
    window.location.href = `tel:${url.replace('tel:', '')}`
  } else {
    window.open(url, '_blank', 'noopener')
  }
}

function scrollToContact() {
  const contactSection = document.querySelector('#contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

function getSocialLabel(icon) {
  const labels = {
    'mdi-linkedin': 'LinkedIn',
    'mdi-github': 'GitHub',
    'mdi-email': 'Email',
    'mdi-phone': 'Phone',
    'mdi-twitter': 'Twitter',
    'mdi-facebook': 'Facebook',
    'mdi-instagram': 'Instagram',
  }
  return labels[icon] || icon.replace('mdi-', '').replace('-', ' ')
}

function getSocialIcon(icon) {
  const icons = {
    'mdi-linkedin': () =>
      h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none' }, [
        h('path', {
          d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
          fill: 'currentColor',
        }),
      ]),
    'mdi-github': () =>
      h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none' }, [
        h('path', {
          d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
          fill: 'currentColor',
        }),
      ]),
    'mdi-email': () =>
      h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none' }, [
        h('path', {
          d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
          fill: 'currentColor',
        }),
      ]),
    'mdi-phone': () =>
      h('svg', { width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none' }, [
        h('path', {
          d: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
          fill: 'currentColor',
        }),
      ]),
  }
  return icons[icon] || (() => h('div', { style: 'width: 20px; height: 20px;' }))
}
</script>

<style scoped>
/* ===== MODERN HERO SECTION ===== */
.hero-section {
  background: var(--bg-primary);
  padding: var(--space-20) var(--space-6) var(--space-16);
  position: relative;
  overflow: hidden;
  transition: background-color var(--duration-normal) var(--ease-out);
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-16);
  align-items: center;
  min-height: 70vh;
}

/* ===== LEFT SIDE - PROFILE IMAGE ===== */
.hero-left {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.profile-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  background: var(--bg-secondary);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.profile-image:hover {
  transform: scale(1.05);
}

.profile-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb), 0.1) 0%,
    rgba(var(--color-secondary-rgb), 0.1) 50%,
    rgba(var(--color-accent-rgb), 0.1) 100%
  );
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.profile-image-wrapper:hover .profile-image-overlay {
  opacity: 1;
}

/* ===== FLOATING STATS ===== */
.floating-stat {
  position: absolute;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-3) var(--space-4);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  backdrop-filter: blur(10px);
  transition: all var(--duration-normal) var(--ease-out);
}

.floating-stat:hover {
  transform: translateY(-4px);
}

.floating-stat--1 {
  top: 10%;
  right: -10%;
  animation: float 6s ease-in-out infinite;
}

.floating-stat--2 {
  bottom: 30%;
  left: -15%;
  animation: float 6s ease-in-out infinite 2s;
}

.floating-stat--3 {
  top: 60%;
  right: -5%;
  animation: float 6s ease-in-out infinite 4s;
}

.stat-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-out);
}

.stat-icon--primary {
  background: var(--color-primary-500);
  color: var(--text-inverse);
}

.stat-icon--secondary {
  background: var(--color-secondary-500);
  color: var(--text-inverse);
}

.stat-icon--accent {
  background: var(--color-accent-500);
  color: var(--text-inverse);
}

.stat-content {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.stat-number {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== RIGHT SIDE - CONTENT ===== */
.hero-right {
  padding-left: var(--space-8);
}

.hero-content {
  max-width: 600px;
}

.hero-name {
  font-size: var(--text-6xl);
  font-weight: 800;
  line-height: 0.9;
  margin: 0 0 var(--space-4) 0;
  color: var(--text-primary);
  font-family: var(--font-primary);
}

.name-primary {
  background: var(
    --gradient-primary,
    linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0 0 var(--space-6) 0;
  line-height: 1.3;
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--text-tertiary);
  line-height: 1.6;
  margin: 0 0 var(--space-8) 0;
  max-width: 500px;
}

/* ===== ACTION BUTTONS ===== */
.hero-actions {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: 600;
  border-radius: var(--radius-xl);
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  min-height: 48px;
  justify-content: center;
}

.hero-btn--primary {
  background: var(--gradient-primary, var(--color-primary-500));
  color: var(--text-inverse);
  border-color: var(--color-primary-500);
}

.hero-btn--primary:hover {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero-btn--secondary {
  background: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.hero-btn--secondary:hover {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-icon {
  transition: transform var(--duration-fast) var(--ease-out);
}

.hero-btn:hover .btn-icon {
  transform: translateX(2px);
}

/* ===== SOCIAL LINKS ===== */
.hero-socials {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.socials-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.socials-list {
  display: flex;
  gap: var(--space-3);
}

.social-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-primary);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.social-btn:hover {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  border-color: var(--color-primary-500);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ===== SCROLL INDICATOR ===== */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  opacity: 0.7;
}

.scroll-text {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

.scroll-arrow {
  animation: bounce 2s infinite;
}

/* ===== ANIMATIONS ===== */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: var(--space-12);
    text-align: center;
  }

  .hero-right {
    padding-left: 0;
  }

  .floating-stat--1 {
    top: 5%;
    right: 5%;
  }

  .floating-stat--2 {
    bottom: 20%;
    left: 5%;
  }

  .floating-stat--3 {
    top: 50%;
    right: 10%;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--space-16) var(--space-4) var(--space-12);
  }

  .hero-container {
    min-height: auto;
    gap: var(--space-8);
  }

  .hero-name {
    font-size: var(--text-4xl);
  }

  .hero-title {
    font-size: var(--text-xl);
  }

  .hero-description {
    font-size: var(--text-base);
  }

  .hero-actions {
    justify-content: center;
    gap: var(--space-3);
  }

  .hero-socials {
    justify-content: center;
  }

  .profile-image-container {
    max-width: 300px;
  }

  .floating-stat {
    padding: var(--space-2) var(--space-3);
  }

  .stat-number {
    font-size: var(--text-base);
  }

  .floating-stat--1,
  .floating-stat--2,
  .floating-stat--3 {
    position: static;
    margin: var(--space-2);
    display: inline-flex;
  }

  .hero-left::after {
    content: '';
    display: flex;
    justify-content: center;
    gap: var(--space-2);
    margin-top: var(--space-4);
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: var(--text-3xl);
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-btn {
    width: 100%;
    max-width: 280px;
  }

  .hero-socials {
    flex-direction: column;
    gap: var(--space-2);
  }

  .profile-image-container {
    max-width: 250px;
  }
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  .floating-stat--1,
  .floating-stat--2,
  .floating-stat--3 {
    animation: none;
  }

  .scroll-arrow {
    animation: none;
  }

  .profile-image:hover {
    transform: none;
  }

  .floating-stat:hover,
  .hero-btn--primary:hover,
  .hero-btn--secondary:hover,
  .social-btn:hover {
    transform: none;
  }
}

/* ===== THEME-SPECIFIC ENHANCEMENTS ===== */
:root[data-theme='creative-gradient'] .hero-section {
  background: var(--bg-gradient, var(--bg-primary));
}

:root[data-theme='creative-gradient'] .name-primary {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
