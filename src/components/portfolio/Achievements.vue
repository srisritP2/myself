<template>
  <section class="achievements-section">
    <div class="section-container">
      <div class="section-header">
        <div class="section-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
              fill="currentColor"
            />
            <path
              d="M5 15L6.09 18.26L10 19L6.09 19.74L5 23L3.91 19.74L0 19L3.91 18.26L5 15Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="section-title">Achievements</h2>
        <p class="section-subtitle">Recognition and milestones in my professional journey</p>
      </div>

      <div class="achievements-grid">
        <div
          v-for="(achievement, index) in achievements"
          :key="achievement.id"
          class="achievement-card glass-card"
          :class="{ 'animate-slide-up': enableAnimations }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="achievement-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="achievement.iconPath" fill="currentColor" />
            </svg>
          </div>

          <div class="achievement-content">
            <h3 class="achievement-title">{{ achievement.title }}</h3>
            <p class="achievement-description">{{ achievement.description }}</p>
            <div class="achievement-meta">
              <span class="achievement-date">{{ achievement.date }}</span>
              <span v-if="achievement.organization" class="achievement-org">{{
                achievement.organization
              }}</span>
            </div>
            <div v-if="achievement.impact" class="achievement-impact">
              <span class="impact-label">Impact:</span>
              <span class="impact-value">{{ achievement.impact }}</span>
            </div>
          </div>

          <div v-if="achievement.badge" class="achievement-badge">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  enableAnimations: {
    type: Boolean,
    default: true,
  },
})

const achievements = ref([
  {
    id: 1,
    title: 'Quality Excellence Award',
    description:
      'Recognized for maintaining 99.5% defect detection rate across all managed projects and implementing innovative testing strategies.',
    date: '2023',
    organization: 'TechCorp Solutions',
    impact: 'Reduced production bugs by 85%',
    badge: true,
    iconPath:
      'M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z',
  },
  {
    id: 2,
    title: 'Automation Champion',
    description:
      'Led the implementation of comprehensive test automation framework, reducing testing time by 60% and increasing test coverage.',
    date: '2022',
    organization: 'Innovation Labs',
    impact: 'Saved 240+ hours monthly',
    badge: true,
    iconPath: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z',
  },
  {
    id: 3,
    title: 'Team Leadership Excellence',
    description:
      'Successfully managed and mentored a cross-functional QA team of 10 members across multiple high-priority projects.',
    date: '2022',
    organization: 'Global Tech Inc',
    impact: 'Improved team productivity by 45%',
    badge: true,
    iconPath:
      'M16 4C16.5523 4 17 4.44772 17 5V9H20C20.5523 9 21 9.44772 21 10V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V10C3 9.44772 3.44772 9 4 9H7V5C7 4.44772 7.44772 4 8 4H16Z',
  },
  {
    id: 4,
    title: 'Process Innovation Award',
    description:
      'Designed and implemented new QA processes that became the standard across the organization, improving overall quality metrics.',
    date: '2021',
    organization: 'TechCorp Solutions',
    impact: 'Adopted by 5+ departments',
    badge: false,
    iconPath:
      'M9.4 16.6L4.8 12L9.4 7.4L10.8 8.8L7.6 12L10.8 15.2L9.4 16.6ZM14.6 16.6L13.2 15.2L16.4 12L13.2 8.8L14.6 7.4L19.2 12L14.6 16.6Z',
  },
  {
    id: 5,
    title: 'Certified Scrum Master',
    description:
      'Achieved professional certification in Agile methodologies, enhancing project management and team collaboration skills.',
    date: '2021',
    organization: 'Scrum Alliance',
    impact: 'Improved sprint velocity by 30%',
    badge: false,
    iconPath:
      'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L4.84 5.17L7.5 2.5L6 1L0 7V9H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9H21Z',
  },
  {
    id: 6,
    title: 'Client Satisfaction Excellence',
    description:
      'Achieved 98% client satisfaction rating through exceptional service delivery and proactive communication.',
    date: '2020',
    organization: 'Multiple Clients',
    impact: '100% client retention rate',
    badge: false,
    iconPath:
      'M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z',
  },
])
</script>

<style scoped>
.achievements-section {
  padding: var(--space-16) 0;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.section-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  color: var(--color-primary-500);
  margin-bottom: var(--space-6);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
}

.section-icon:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-4px);
  box-shadow: var(--glass-shadow-heavy);
}

.section-title {
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 var(--space-4) 0;
  line-height: 1.2;
}

.section-subtitle {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Achievements Grid - Responsive 3→2→1 Column Layout */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.achievement-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.achievement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.achievement-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-6px);
  box-shadow: var(--glass-shadow-heavy);
}

.achievement-card:hover::before {
  opacity: 1;
}

.achievement-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-primary-500);
  transition: all var(--duration-normal) var(--ease-out);
  flex-shrink: 0;
}

.achievement-card:hover .achievement-icon {
  background: var(--glass-medium-bg);
  transform: scale(1.1);
}

.achievement-content {
  flex: 1;
}

.achievement-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-3) 0;
  line-height: 1.3;
}

.achievement-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-4) 0;
}

.achievement-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.achievement-date {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary-600);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}

.achievement-org {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}

.achievement-impact {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
}

.impact-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.impact-value {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-success-600);
}

.achievement-badge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 32px;
  height: 32px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-warning-500);
  box-shadow: var(--glass-shadow-light);
}

/* Animations */
.animate-slide-up {
  animation: slideUp var(--duration-slow) var(--ease-out) both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design - 3→2→1 Column Layout */
@media (max-width: 1024px) {
  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .achievement-card {
    padding: var(--space-4);
  }

  .section-title {
    font-size: var(--text-3xl);
  }

  .section-subtitle {
    font-size: var(--text-lg);
  }
}

@media (max-width: 480px) {
  .section-container {
    padding: 0 var(--space-4);
  }

  .achievement-card {
    padding: var(--space-3);
  }

  .section-icon {
    width: 64px;
    height: 64px;
  }

  .achievement-icon {
    width: 48px;
    height: 48px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
  }

  .achievement-card,
  .achievement-icon {
    transition: none;
  }
}

/* Creative Gradient Theme v2.0 - Using Global System */
:root[data-theme='creative-gradient'] .achievements-section {
  position: relative;
}

:root[data-theme='creative-gradient'] .section-title {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow) !important;
}

:root[data-theme='creative-gradient'] .section-subtitle {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .section-icon {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .section-icon:hover {
  background: var(--cg-glass-bg-strong) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-2px) !important;
}

:root[data-theme='creative-gradient'] .achievement-card {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .achievement-card:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) !important;
}

:root[data-theme='creative-gradient'] .achievement-title {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .achievement-description {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .achievement-icon {
  background: var(--cg-glass-bg-strong) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-light) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .achievement-card:hover .achievement-icon {
  background: var(--cg-glass-bg-interactive) !important;
  transform: scale(1.1) !important;
}

:root[data-theme='creative-gradient'] .achievement-date {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  border-radius: var(--cg-radius-full) !important;
}

:root[data-theme='creative-gradient'] .achievement-org {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  border-radius: var(--cg-radius-full) !important;
}

:root[data-theme='creative-gradient'] .achievement-impact {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  border-radius: var(--cg-radius-lg) !important;
}

:root[data-theme='creative-gradient'] .impact-label {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .impact-value {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .achievement-badge {
  background: var(--cg-glass-bg-strong) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-light) !important;
  border-radius: var(--cg-radius-full) !important;
}

/* Professional Dark Theme */
:root[data-theme='professional-dark'][data-mode='dark'] .achievement-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .achievement-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .achievement-card {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .achievement-card:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .achievement-card {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .achievement-card:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}
</style>
