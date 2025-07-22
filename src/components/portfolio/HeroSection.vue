<template>
  <section class="hero-section">
    <div class="hero-container">
      <!-- Compact Profile Card -->
      <div class="profile-card">
        <div class="profile-image-wrapper">
          <img
            :src="profilePhotoUrl"
            @error="onImgError"
            alt="Profile photo"
            class="profile-image"
            loading="eager"
          />
        </div>

        <!-- Inline Stats -->
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-number">{{ expYears }}+</span>
            <span class="stat-label">Years</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ projects }}+</span>
            <span class="stat-label">Projects</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ clients }}+</span>
            <span class="stat-label">Clients</span>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="hero-content">
        <!-- Name and Title -->
        <div class="hero-header">
          <h1 class="hero-name">{{ name }}</h1>
          <h2 class="hero-title">{{ title }}</h2>
        </div>

        <!-- Description -->
        <p class="hero-description">{{ description }}</p>

        <!-- Actions Row -->
        <div class="hero-actions">
          <div class="action-buttons">
            <a :href="resumeUrl" download class="hero-btn hero-btn--primary">
              <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill="currentColor" />
              </svg>
              Resume
            </a>
            <button class="hero-btn hero-btn--secondary" @click="scrollToContact">
              <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  fill="currentColor"
                />
              </svg>
              Contact
            </button>
          </div>

          <!-- Social Links -->
          <div class="social-links">
            <button
              v-for="social in socials"
              :key="social.icon"
              @click="openSocial(social.url, social.icon)"
              :aria-label="`Link to ${getSocialLabel(social.icon)}`"
              class="social-btn"
            >
              <!-- LinkedIn -->
              <svg
                v-if="social.icon === 'mdi-linkedin'"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                  fill="currentColor"
                />
              </svg>
              <!-- GitHub -->
              <svg
                v-if="social.icon === 'mdi-github'"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
                  fill="currentColor"
                />
              </svg>
              <!-- Email -->
              <svg
                v-if="social.icon === 'mdi-email'"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  fill="currentColor"
                />
              </svg>
              <!-- Phone -->
              <svg
                v-if="social.icon === 'mdi-phone'"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                  fill="currentColor"
                />
              </svg>
              <!-- Twitter -->
              <svg
                v-if="social.icon === 'mdi-twitter'"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  fill="currentColor"
                />
              </svg>
              <!-- Facebook -->
              <svg
                v-if="social.icon === 'mdi-facebook'"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="currentColor"
                />
              </svg>
              <!-- Instagram -->
              <svg
                v-if="social.icon === 'mdi-instagram'"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No h import needed since we're using direct SVG rendering

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

// getSocialIcon function removed - now using direct SVG rendering
</script>

<style scoped>
/* ===== COMPACT HERO SECTION ===== */
.hero-section {
  background: var(--bg-primary);
  padding: var(--space-8) var(--space-4) var(--space-6);
  position: relative;
  min-height: auto;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-8);
  align-items: start;
}

/* ===== COMPACT PROFILE CARD ===== */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  min-width: 200px;
}

.profile-image-wrapper {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: var(--bg-secondary);
  flex-shrink: 0;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-normal) var(--ease-out);
}

.profile-image:hover {
  transform: scale(1.05);
}

/* ===== INLINE STATS ===== */
.stats-row {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 50px;
}

.stat-number {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary-500);
  line-height: 1;
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: var(--space-1);
}

/* ===== CONTENT SECTION ===== */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-width: 0;
}

.hero-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.hero-name {
  font-size: var(--text-4xl);
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  color: var(--text-primary);
  background: var(
    --gradient-primary,
    linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.3;
}

.hero-description {
  font-size: var(--text-base);
  color: var(--text-tertiary);
  line-height: 1.5;
  margin: 0;
  max-width: 600px;
}

/* ===== ACTIONS ROW ===== */
.hero-actions {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.action-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-md);
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  min-height: 36px;
  white-space: nowrap;
}

.hero-btn--primary {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  border-color: var(--color-primary-500);
}

.hero-btn--primary:hover {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.hero-btn--secondary {
  background: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.hero-btn--secondary:hover {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.btn-icon {
  transition: transform var(--duration-fast) var(--ease-out);
  flex-shrink: 0;
}

.hero-btn:hover .btn-icon {
  transform: translateX(1px);
}

/* ===== SOCIAL LINKS ===== */
.social-links {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.social-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-primary);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  padding: 0;
}

.social-btn:hover {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  border-color: var(--color-primary-500);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
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
    gap: var(--space-6);
    text-align: center;
  }

  .profile-card {
    order: -1;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--space-6) var(--space-4) var(--space-4);
  }

  .hero-container {
    gap: var(--space-4);
  }

  .profile-image-wrapper {
    width: 100px;
    height: 100px;
  }

  .stats-row {
    gap: var(--space-3);
  }

  .stat-item {
    min-width: 45px;
  }

  .stat-number {
    font-size: var(--text-base);
  }

  .hero-name {
    font-size: var(--text-3xl);
  }

  .hero-title {
    font-size: var(--text-base);
  }

  .hero-description {
    font-size: var(--text-sm);
  }

  .hero-actions {
    gap: var(--space-4);
    justify-content: center;
  }

  .action-buttons {
    gap: var(--space-2);
  }

  .social-links {
    gap: var(--space-1);
  }

  .social-btn {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: var(--space-4) var(--space-3) var(--space-3);
  }

  .profile-image-wrapper {
    width: 80px;
    height: 80px;
  }

  .stats-row {
    gap: var(--space-2);
  }

  .stat-item {
    min-width: 40px;
  }

  .stat-number {
    font-size: var(--text-sm);
  }

  .stat-label {
    font-size: 10px;
  }

  .hero-name {
    font-size: var(--text-2xl);
  }

  .hero-title {
    font-size: var(--text-sm);
  }

  .hero-description {
    font-size: var(--text-xs);
  }

  .hero-actions {
    flex-direction: column;
    gap: var(--space-3);
  }

  .action-buttons {
    width: 100%;
    justify-content: center;
  }

  .hero-btn {
    flex: 1;
    min-width: 100px;
  }

  .social-links {
    justify-content: center;
  }

  .social-btn {
    width: 24px;
    height: 24px;
  }
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  .profile-image:hover {
    transform: none;
  }

  .hero-btn--primary:hover,
  .hero-btn--secondary:hover,
  .social-btn:hover {
    transform: none;
  }
}

/* ===== CREATIVE GRADIENT THEME ===== */
:root[data-theme='creative-gradient'] .hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

:root[data-theme='creative-gradient'] .hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.8) 0%,
    rgba(118, 75, 162, 0.9) 50%,
    rgba(102, 126, 234, 0.7) 100%
  );
  z-index: 0;
}

:root[data-theme='creative-gradient'] .hero-container {
  position: relative;
  z-index: 1;
}

/* Glass Morphism Profile Card */
:root[data-theme='creative-gradient'] .profile-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: var(--space-6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

:root[data-theme='creative-gradient'] .profile-image-wrapper {
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Glass Morphism Stats */
:root[data-theme='creative-gradient'] .stat-item {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: var(--space-2) var(--space-3);
  min-width: 60px;
}

:root[data-theme='creative-gradient'] .stat-number {
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

:root[data-theme='creative-gradient'] .stat-label {
  color: rgba(255, 255, 255, 0.8);
}

/* Content Styling */
:root[data-theme='creative-gradient'] .hero-name {
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root[data-theme='creative-gradient'] .hero-title {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

:root[data-theme='creative-gradient'] .hero-description {
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Glass Morphism Buttons */
:root[data-theme='creative-gradient'] .hero-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

:root[data-theme='creative-gradient'] .hero-btn--primary {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
}

:root[data-theme='creative-gradient'] .hero-btn--primary:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

:root[data-theme='creative-gradient'] .hero-btn--secondary {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

:root[data-theme='creative-gradient'] .hero-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Glass Morphism Social Buttons */
:root[data-theme='creative-gradient'] .social-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

:root[data-theme='creative-gradient'] .social-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* ===== DARK MODE ENHANCEMENTS ===== */
:root[data-theme='professional-dark'] .floating-stat {
  background: rgba(var(--bg-primary-rgb), 0.95);
  backdrop-filter: blur(20px);
  border-color: var(--border-secondary);
}

:root[data-theme='professional-dark'] .profile-image-overlay {
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb), 0.2) 0%,
    rgba(var(--color-secondary-rgb), 0.2) 50%,
    rgba(var(--color-accent-rgb), 0.2) 100%
  );
}
</style>
