<template>
  <section class="professional-summary-section">
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
              d="M19 15L20.09 18.26L24 19L20.09 19.74L19 23L17.91 19.74L14 19L17.91 18.26L19 15Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="section-title">Professional Summary</h2>
        <p class="section-subtitle">Experienced professional with a passion for excellence</p>
      </div>

      <div class="summary-content">
        <div class="summary-card glass-card">
          <div class="summary-text">
            <p class="summary-paragraph">
              {{ summary.introduction }}
            </p>
            <p class="summary-paragraph">
              {{ summary.experience }}
            </p>
            <p class="summary-paragraph">
              {{ summary.expertise }}
            </p>
          </div>

          <div class="summary-highlights">
            <h3 class="highlights-title">Key Highlights</h3>
            <div class="highlights-grid">
              <div
                v-for="(highlight, index) in summary.highlights"
                :key="highlight.title"
                class="highlight-item"
                :class="{ 'animate-slide-up': enableAnimations }"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="highlight-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path :d="highlight.iconPath" fill="currentColor" />
                  </svg>
                </div>
                <div class="highlight-content">
                  <h4 class="highlight-title">{{ highlight.title }}</h4>
                  <p class="highlight-description">{{ highlight.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="summary-stats">
            <div
              v-for="(stat, index) in summary.stats"
              :key="stat.label"
              class="stat-item"
              :class="{ 'animate-slide-up': enableAnimations }"
              :style="{ animationDelay: `${index * 0.15}s` }"
            >
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
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

const summary = ref({
  introduction:
    'Dedicated Quality Assurance professional with over 8 years of experience in software testing, automation, and quality management. Proven track record of delivering high-quality software solutions across diverse industries including healthcare, finance, and e-commerce.',

  experience:
    'Expertise in both manual and automated testing methodologies, with strong proficiency in test planning, execution, and defect management. Experienced in leading QA teams and implementing best practices to ensure optimal software quality and performance.',

  expertise:
    'Passionate about continuous learning and staying current with emerging technologies and testing frameworks. Strong advocate for quality-driven development processes and collaborative team environments.',

  highlights: [
    {
      title: 'Leadership Excellence',
      description: 'Led cross-functional QA teams of 5-10 members across multiple projects',
      iconPath:
        'M16 4C16.5523 4 17 4.44772 17 5V9H20C20.5523 9 21 9.44772 21 10V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V10C3 9.44772 3.44772 9 4 9H7V5C7 4.44772 7.44772 4 8 4H16Z',
    },
    {
      title: 'Process Innovation',
      description: 'Implemented automated testing frameworks reducing testing time by 60%',
      iconPath: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z',
    },
    {
      title: 'Quality Assurance',
      description: 'Maintained 99.5% defect detection rate across all managed projects',
      iconPath:
        'M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z',
    },
    {
      title: 'Technical Expertise',
      description: 'Proficient in 10+ testing tools and programming languages',
      iconPath:
        'M9.4 16.6L4.8 12L9.4 7.4L10.8 8.8L7.6 12L10.8 15.2L9.4 16.6ZM14.6 16.6L13.2 15.2L16.4 12L13.2 8.8L14.6 7.4L19.2 12L14.6 16.6Z',
    },
  ],

  stats: [
    { value: '8+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '99.5%', label: 'Quality Rate' },
    { value: '15+', label: 'Technologies' },
  ],
})
</script>

<style scoped>
.professional-summary-section {
  padding: var(--space-16) 0;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.section-container {
  max-width: 1000px;
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
}

/* Summary Content */
.summary-content {
  display: flex;
  justify-content: center;
}

.summary-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
  width: 100%;
  max-width: 900px;
}

.summary-card:hover {
  background: var(--glass-hover-bg);
  box-shadow: var(--glass-shadow-heavy);
  transform: translateY(-4px);
}

.summary-text {
  margin-bottom: var(--space-8);
}

.summary-paragraph {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 var(--space-4) 0;
  text-align: justify;
}

.summary-paragraph:last-child {
  margin-bottom: 0;
}

/* Highlights Section */
.summary-highlights {
  margin-bottom: var(--space-8);
}

.highlights-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-6) 0;
  text-align: center;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--cg-space-md, var(--space-4));
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: all var(--duration-normal) var(--ease-out);
}

.highlight-item:hover {
  background: var(--glass-medium-bg);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-medium);
}

.highlight-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-primary-500);
  flex-shrink: 0;
  transition: all var(--duration-fast) var(--ease-out);
}

.highlight-item:hover .highlight-icon {
  background: var(--glass-hover-bg);
  transform: scale(1.1);
}

.highlight-content {
  flex: 1;
}

.highlight-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
  line-height: 1.3;
}

.highlight-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* Stats Section */
.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid var(--glass-border);
}

.stat-item {
  text-align: center;
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: all var(--duration-normal) var(--ease-out);
}

.stat-item:hover {
  background: var(--glass-medium-bg);
  transform: translateY(-4px);
  box-shadow: var(--glass-shadow-medium);
}

.stat-value {
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--color-primary-500);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.2;
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

/* Responsive Design */
@media (max-width: 768px) {
  .section-container {
    padding: 0 var(--space-4);
  }

  .summary-card {
    padding: var(--space-6);
  }

  .section-title {
    font-size: var(--text-3xl);
  }

  .section-subtitle {
    font-size: var(--text-lg);
  }

  .summary-paragraph {
    font-size: var(--text-base);
  }

  .highlights-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .summary-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
  }
}

@media (max-width: 480px) {
  .summary-card {
    padding: var(--space-4);
  }

  .section-icon {
    width: 64px;
    height: 64px;
  }

  .stat-value {
    font-size: var(--text-2xl);
  }

  .summary-stats {
    grid-template-columns: 1fr;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
  }

  .summary-card,
  .highlight-item,
  .stat-item {
    transition: none;
  }
}

/* Theme-Specific Glass Morphism Enhancements */

/* Creative Gradient Theme v2.0 - Using Global System */
:root[data-theme='creative-gradient'] .professional-summary-section {
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

:root[data-theme='creative-gradient'] .summary-card {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .summary-card:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) !important;
}

:root[data-theme='creative-gradient'] .summary-title,
:root[data-theme='creative-gradient'] .highlight-title,
:root[data-theme='creative-gradient'] .stat-label {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .summary-text,
:root[data-theme='creative-gradient'] .highlight-description,
:root[data-theme='creative-gradient'] .stat-value {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

/* Enhanced Highlight Item Glass Effects */
:root[data-theme='creative-gradient'] .highlight-item {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-light) !important;
  border-radius: var(--cg-radius-lg) !important;
  transition: all var(--cg-transition-fast) !important;
  position: relative !important;
  overflow: hidden !important;
}

:root[data-theme='creative-gradient'] .highlight-item::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: -100% !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent) !important;
  transition: left var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .highlight-item:hover::before {
  left: 100% !important;
}

:root[data-theme='creative-gradient'] .highlight-item:hover {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: translateY(-2px) !important;
}

:root[data-theme='creative-gradient'] .highlight-icon {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-light) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .highlight-item:hover .highlight-icon {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: scale(1.1) !important;
}

/* Enhanced Stat Item Glass Effects */
:root[data-theme='creative-gradient'] .stat-item {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
  position: relative !important;
  overflow: hidden !important;
}

:root[data-theme='creative-gradient'] .stat-item::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 3px !important;
  background: var(--cg-gradient-accent) !important;
  opacity: 0 !important;
  transition: opacity var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .stat-item:hover::before {
  opacity: 1 !important;
}

:root[data-theme='creative-gradient'] .stat-item:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .stat-value {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow) !important;
}

:root[data-theme='creative-gradient'] .stat-label {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

/* Professional Dark Theme */
:root[data-theme='professional-dark'][data-mode='dark'] .summary-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .summary-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .summary-card {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .summary-card:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .summary-card {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .summary-card:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}
</style>
