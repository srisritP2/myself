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
            <div class="stat-icon">
              <v-icon color="primary" size="20">mdi-timer</v-icon>
            </div>
            <div class="stat-content">
              <span class="stat-number">{{ expYears }}+</span>
              <span class="stat-label">Years</span>
            </div>
          </div>

          <div class="floating-stat floating-stat--2">
            <div class="stat-icon">
              <v-icon color="secondary" size="20">mdi-briefcase-variant</v-icon>
            </div>
            <div class="stat-content">
              <span class="stat-number">{{ projects }}+</span>
              <span class="stat-label">Projects</span>
            </div>
          </div>

          <div class="floating-stat floating-stat--3">
            <div class="stat-icon">
              <v-icon color="accent" size="20">mdi-account-group</v-icon>
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
            <v-btn
              color="primary"
              size="large"
              class="hero-btn hero-btn--primary"
              :href="resumeUrl"
              download
              elevation="2"
            >
              <v-icon left>mdi-download</v-icon>
              Download Resume
            </v-btn>

            <v-btn
              variant="outlined"
              color="primary"
              size="large"
              class="hero-btn hero-btn--secondary"
              @click="scrollToContact"
            >
              <v-icon left>mdi-email</v-icon>
              Get In Touch
            </v-btn>
          </div>

          <!-- Social Links -->
          <div class="hero-socials">
            <span class="socials-label">Connect with me:</span>
            <div class="socials-list">
              <button
                v-for="social in socials"
                :key="social.icon"
                @click="openSocial(social.url, social.icon)"
                :aria-label="`Link to ${social.icon.replace('mdi-', '')}`"
                class="social-btn"
              >
                <v-icon size="20">{{ social.icon }}</v-icon>
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
        <v-icon color="primary" size="24">mdi-chevron-down</v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  const contactSection = document.querySelector('.user-details-cta-card')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* ===== MODERN HERO SECTION ===== */
.hero-section {
  background: var(--bg-primary);
  padding: var(--space-20) var(--space-6) var(--space-16);
  position: relative;
  overflow: hidden;
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
    rgba(var(--color-primary-500), 0.1) 0%,
    rgba(var(--color-secondary-500), 0.1) 50%,
    rgba(var(--color-accent-500), 0.1) 100%
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
  transition: transform var(--duration-normal) var(--ease-out);
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
  background: var(--bg-accent);
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-weight: 600;
  border-radius: var(--radius-xl);
  text-transform: none;
  letter-spacing: 0;
  transition: all var(--duration-fast) var(--ease-out);
}

.hero-btn--primary {
  background: var(--gradient-primary, var(--color-primary-500)) !important;
  color: var(--text-inverse) !important;
}

.hero-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero-btn--secondary {
  border-color: var(--color-primary-500);
  color: var(--color-primary-500);
}

.hero-btn--secondary:hover {
  background: var(--color-primary-500) !important;
  color: var(--text-inverse) !important;
  transform: translateY(-2px);
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
