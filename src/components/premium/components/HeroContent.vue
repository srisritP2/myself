<template>
  <div class="hero-content">
    <!-- Main Content -->
    <div class="hero-content__main">
      <h1 class="hero-content__name">{{ profile.name }}</h1>
      <h2 class="hero-content__title">{{ profile.title }}</h2>
      <p class="hero-content__description">{{ profile.description }}</p>
    </div>

    <!-- Skills/Expertise Chips -->
    <div v-if="profile.skills && profile.skills.length > 0" class="hero-content__skills">
      <div class="hero-content__skills-grid">
        <span
          v-for="skill in profile.skills.slice(0, 6)"
          :key="skill"
          class="hero-content__skill-chip"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- Location & Status Info -->
    <div class="hero-content__meta" v-if="showLocation || showStatus">
      <div v-if="showLocation && profile.location" class="hero-content__location">
        <svg class="hero-content__icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="currentColor"
          />
        </svg>
        <span>{{ profile.location }}</span>
      </div>

      <div v-if="showStatus && profile.status" class="hero-content__status">
        <div
          class="hero-content__status-indicator"
          :class="`hero-content__status-indicator--${profile.status}`"
        ></div>
        <span>{{ getStatusText(profile.status) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true,
  },
  animated: {
    type: Boolean,
    default: true,
  },
  showLocation: {
    type: Boolean,
    default: true,
  },
  showStatus: {
    type: Boolean,
    default: true,
  },
})

const getStatusText = status => {
  const texts = {
    available: 'Available for opportunities',
    busy: 'Currently busy',
    offline: 'Offline',
  }
  return texts[status] || status
}
</script>

<style scoped>
/* ===== PREMIUM CONTENT STYLES ===== */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 100%;
  position: relative;
}

/* ===== MAIN CONTENT SECTION ===== */
.hero-content__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  position: relative;
}

/* ===== TYPOGRAPHY SYSTEM ===== */
.hero-content__name {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  position: relative;
  background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all var(--duration-normal) var(--ease-out);
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out 0.2s forwards;
}

.hero-content__name::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
  border-radius: var(--radius-full);
  transition: width var(--duration-slow) var(--ease-out);
  animation: underlineExpand 1.2s ease-out 1s forwards;
}

@keyframes underlineExpand {
  to {
    width: 60px;
  }
}

.hero-content__title {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 600;
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.4;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out 0.4s forwards;
  position: relative;
}

.hero-content__description {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.6;
  margin: var(--space-2) 0 0 0;
  color: var(--text-tertiary);
  max-width: 600px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out 0.6s forwards;
  font-weight: 400;
}

/* ===== SKILLS SECTION ===== */
.hero-content__skills {
  margin: var(--space-3) 0 var(--space-2) 0;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out 0.8s forwards;
}

.hero-content__skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

.hero-content__skill-chip {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--duration-normal) var(--ease-out);
  cursor: default;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}

.hero-content__skill-chip::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left var(--duration-normal) var(--ease-out);
}

.hero-content__skill-chip:hover {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  border-color: var(--color-primary-500);
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--shadow-lg);
}

.hero-content__skill-chip:hover::before {
  left: 100%;
}

/* ===== META INFORMATION ===== */
.hero-content__meta {
  display: flex;
  gap: var(--space-6);
  flex-wrap: wrap;
  margin-top: var(--space-4);
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out 1s forwards;
}

.hero-content__location,
.hero-content__status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-primary);
  transition: all var(--duration-fast) var(--ease-out);
  backdrop-filter: blur(10px);
}

.hero-content__location:hover,
.hero-content__status:hover {
  background: var(--bg-tertiary);
  border-color: var(--color-primary-300);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.hero-content__icon {
  color: var(--color-primary-500);
  flex-shrink: 0;
  transition: transform var(--duration-fast) var(--ease-out);
}

.hero-content__location:hover .hero-content__icon,
.hero-content__status:hover .hero-content__icon {
  transform: scale(1.1);
}

/* ===== STATUS INDICATORS ===== */
.hero-content__status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-success);
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 0 0 2px var(--bg-secondary);
}

.hero-content__status-indicator::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.3;
  animation: pulse-ring 2s infinite;
}

.hero-content__status-indicator--available {
  background: var(--color-success);
}

.hero-content__status-indicator--busy {
  background: var(--color-warning);
}

.hero-content__status-indicator--offline {
  background: var(--color-neutral-400);
}

.hero-content__status-indicator--offline::after {
  animation: none;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* ===== ANIMATIONS ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== THEME-SPECIFIC ENHANCEMENTS ===== */

/* Creative Gradient Theme */
:root[data-theme='creative-gradient'] .hero-content__name {
  background: var(--cg-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

:root[data-theme='creative-gradient'] .hero-content__title {
  color: var(--cg-text-primary);
  text-shadow: var(--cg-text-shadow-light);
}

:root[data-theme='creative-gradient'] .hero-content__description {
  color: var(--cg-text-secondary);
  text-shadow: var(--cg-text-shadow-light);
}

:root[data-theme='creative-gradient'] .hero-content__skill-chip {
  background: var(--cg-glass-bg-light);
  backdrop-filter: var(--cg-glass-blur-light);
  -webkit-backdrop-filter: var(--cg-glass-blur-light);
  border: 1px solid var(--cg-glass-border);
  color: var(--cg-text-primary);
  box-shadow: var(--cg-shadow-light);
}

:root[data-theme='creative-gradient'] .hero-content__skill-chip:hover {
  background: var(--cg-glass-bg-medium);
  border-color: var(--cg-glass-border-hover);
  color: var(--cg-text-primary);
  box-shadow: var(--cg-shadow-medium);
}

:root[data-theme='creative-gradient'] .hero-content__location,
:root[data-theme='creative-gradient'] .hero-content__status {
  background: var(--cg-glass-bg-light);
  backdrop-filter: var(--cg-glass-blur-light);
  -webkit-backdrop-filter: var(--cg-glass-blur-light);
  border: 1px solid var(--cg-glass-border);
  color: var(--cg-text-primary);
  box-shadow: var(--cg-shadow-light);
}

:root[data-theme='creative-gradient'] .hero-content__location:hover,
:root[data-theme='creative-gradient'] .hero-content__status:hover {
  background: var(--cg-glass-bg-medium);
  border-color: var(--cg-glass-border-hover);
  box-shadow: var(--cg-shadow-medium);
}

/* ===== RESPONSIVE DESIGN ===== */

/* Large Desktop (1280px+) */
@media (min-width: 1280px) {
  .hero-content {
    gap: var(--space-8);
  }

  .hero-content__main {
    gap: var(--space-4);
  }

  .hero-content__description {
    margin-top: var(--space-6);
    max-width: 700px;
  }
}

/* Desktop (1024px - 1279px) */
@media (max-width: 1279px) {
  .hero-content__name {
    font-size: clamp(2rem, 4vw, 3.5rem);
  }
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) {
  .hero-content {
    text-align: center;
    gap: var(--space-5);
  }

  .hero-content__description {
    max-width: 100%;
  }

  .hero-content__meta {
    justify-content: center;
  }

  .hero-content__skills-grid {
    justify-content: center;
  }
}

/* Mobile (640px - 767px) */
@media (max-width: 767px) {
  .hero-content {
    gap: var(--space-4);
  }

  .hero-content__main {
    gap: var(--space-2);
  }

  .hero-content__name {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
  }

  .hero-content__title {
    font-size: clamp(1rem, 3vw, 1.25rem);
  }

  .hero-content__description {
    font-size: var(--text-base);
    margin-top: var(--space-3);
  }

  .hero-content__skills {
    margin: var(--space-4) 0;
  }

  .hero-content__meta {
    gap: var(--space-3);
    flex-direction: column;
    align-items: center;
  }

  .hero-content__location,
  .hero-content__status {
    width: fit-content;
  }
}

/* Small Mobile (< 640px) */
@media (max-width: 639px) {
  .hero-content__name {
    font-size: clamp(1.5rem, 8vw, 2rem);
    letter-spacing: -0.01em;
  }

  .hero-content__skill-chip {
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-xs);
  }

  .hero-content__meta {
    gap: var(--space-2);
  }
}

/* ===== ACCESSIBILITY ===== */

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .hero-content__name,
  .hero-content__title,
  .hero-content__description,
  .hero-content__skills,
  .hero-content__meta {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .hero-content__name::after {
    width: 60px;
    animation: none;
  }

  .hero-content__status-indicator::after {
    animation: none;
  }

  .hero-content__skill-chip:hover {
    transform: none;
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  .hero-content__name {
    background: none;
    -webkit-text-fill-color: var(--text-primary);
    color: var(--text-primary);
  }

  .hero-content__skill-chip {
    border-width: 2px;
  }

  .hero-content__location,
  .hero-content__status {
    border-width: 2px;
  }
}

/* Focus states for accessibility */
.hero-content__skill-chip:focus {
  outline: 3px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .hero-content__name,
  .hero-content__title,
  .hero-content__description,
  .hero-content__skills,
  .hero-content__meta {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .hero-content__name {
    background: none;
    -webkit-text-fill-color: black;
    color: black;
  }

  .hero-content__skill-chip {
    background: white;
    border: 1px solid #ccc;
    color: black;
    box-shadow: none;
  }
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */

/* GPU acceleration for animations */
.hero-content__name,
.hero-content__title,
.hero-content__description,
.hero-content__skills,
.hero-content__meta {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* Contain layout and paint */
.hero-content {
  contain: layout style;
}
</style>
