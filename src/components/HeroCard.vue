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
                <!-- LinkedIn -->
                <svg
                  v-if="social.icon === 'mdi-linkedin'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                    fill="currentColor"
                  />
                </svg>

                <!-- GitHub -->
                <svg
                  v-if="social.icon === 'mdi-github'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
                    fill="currentColor"
                  />
                </svg>

                <!-- Email -->
                <svg
                  v-if="social.icon === 'mdi-email'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                    fill="currentColor"
                  />
                </svg>

                <!-- Phone -->
                <svg
                  v-if="social.icon === 'mdi-phone'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    fill="currentColor"
                  />
                </svg>

                <!-- Twitter -->
                <svg
                  v-if="social.icon === 'mdi-twitter'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                    fill="currentColor"
                  />
                </svg>

                <!-- Facebook -->
                <svg
                  v-if="social.icon === 'mdi-facebook'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    fill="currentColor"
                  />
                </svg>

                <!-- Instagram -->
                <svg
                  v-if="social.icon === 'mdi-instagram'"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
/* ===== MODERN HERO SECTION ===== */
.hero-section {
  background: var(--bg-primary);
  padding: var(--space-16) var(--space-4) var(--space-12);
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
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-lg);
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  min-height: 40px;
  justify-content: center;
  white-space: nowrap;
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
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
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
