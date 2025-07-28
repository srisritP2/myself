<template>
  <section class="what-i-help-section">
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
            <path
              d="M5 15L6.09 18.26L10 19L6.09 19.74L5 23L3.91 19.74L0 19L3.91 18.26L5 15Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="section-title">What I Help With</h2>
        <p class="section-subtitle">Transforming ideas into exceptional digital experiences</p>
      </div>

      <div class="services-grid">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="service-card glass-card"
          :class="{ 'animate-slide-up': enableAnimations }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="service-icon">
            <div v-html="service.icon"></div>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
          <ul class="service-features">
            <li v-for="feature in service.features" :key="feature" class="feature-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
              </svg>
              {{ feature }}
            </li>
          </ul>
          <div class="service-technologies">
            <span v-for="tech in service.technologies" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
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

const services = ref([
  {
    id: 1,
    title: 'Frontend Development',
    description:
      'Creating responsive, interactive, and performant user interfaces that deliver exceptional user experiences.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`,
    features: [
      'Responsive Web Design',
      'Single Page Applications',
      'Progressive Web Apps',
      'Cross-browser Compatibility',
      'Performance Optimization',
    ],
    technologies: ['Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 2,
    title: 'Full-Stack Development',
    description:
      'Building complete web applications from database design to user interface, ensuring seamless integration.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M2 10H22" stroke="currentColor" stroke-width="2"/>
      <path d="M8 14H16" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    features: [
      'RESTful API Development',
      'Database Design & Optimization',
      'Authentication & Authorization',
      'Real-time Features',
      'Cloud Deployment',
    ],
    technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS'],
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description:
      'Designing intuitive and visually appealing interfaces that prioritize user experience and accessibility.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
    </svg>`,
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Design Systems',
      'Accessibility Compliance',
      'Usability Testing',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
  },
  {
    id: 4,
    title: 'Quality Assurance',
    description:
      'Ensuring software quality through comprehensive testing strategies and automated testing solutions.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`,
    features: [
      'Test Strategy Development',
      'Automated Testing',
      'Performance Testing',
      'Security Testing',
      'CI/CD Integration',
    ],
    technologies: ['Cypress', 'Jest', 'Playwright', 'Selenium', 'Postman'],
  },
  {
    id: 5,
    title: 'Technical Consulting',
    description:
      'Providing expert guidance on technology choices, architecture decisions, and best practices.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M7 10H17" stroke="currentColor" stroke-width="2"/>
      <path d="M7 14H13" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    features: [
      'Technology Assessment',
      'Architecture Planning',
      'Code Review & Optimization',
      'Team Training & Mentoring',
      'Project Management',
    ],
    technologies: ['Agile', 'Scrum', 'DevOps', 'Git', 'Docker'],
  },
  {
    id: 6,
    title: 'Digital Transformation',
    description:
      'Helping businesses modernize their digital presence and optimize their workflows for better efficiency.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
    </svg>`,
    features: [
      'Process Automation',
      'Legacy System Migration',
      'Digital Strategy Planning',
      'Performance Analytics',
      'Scalability Solutions',
    ],
    technologies: ['Microservices', 'APIs', 'Cloud', 'Analytics', 'Automation'],
  },
])
</script>

<style scoped>
.what-i-help-section {
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

/* Services Grid */
/* Services Grid - Responsive 3→2→1 Column Layout */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.service-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.service-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-8px);
  box-shadow: var(--glass-shadow-heavy);
}

.service-card:hover::before {
  opacity: 1;
}

.service-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-primary-500);
  margin-bottom: var(--space-6);
  transition: all var(--duration-normal) var(--ease-out);
}

.service-card:hover .service-icon {
  background: var(--glass-medium-bg);
  transform: scale(1.1);
}

.service-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-4) 0;
  line-height: 1.3;
}

.service-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-6) 0;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-6) 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
  line-height: 1.4;
}

.feature-item svg {
  color: var(--color-success-500);
  flex-shrink: 0;
}

.service-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text-primary);
  transition: all var(--duration-fast) var(--ease-out);
}

.tech-tag:hover {
  background: var(--glass-medium-bg);
  transform: translateY(-2px);
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
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .service-card {
    padding: var(--space-6);
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

  .service-card {
    padding: var(--space-4);
  }

  .section-icon {
    width: 64px;
    height: 64px;
  }
}

/* Accessibility */
/* ===== CREATIVE GRADIENT THEME V2.0 GLASS MORPHISM ===== */

:root[data-theme='creative-gradient'] .section-title {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow) !important;
}

:root[data-theme='creative-gradient'] .section-subtitle {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .service-card {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .service-card:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) !important;
}

:root[data-theme='creative-gradient'] .service-icon {
  background: var(--cg-glass-bg-strong) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .service-icon:hover {
  background: var(--cg-glass-bg-interactive) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-2px) scale(1.05) !important;
}

:root[data-theme='creative-gradient'] .service-title {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .service-description {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

/* Enhanced Tech Tag Glass Effects */
:root[data-theme='creative-gradient'] .tech-tag {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  box-shadow: var(--cg-shadow-light) !important;
  transition: all var(--cg-transition-fast) !important;
  position: relative !important;
  overflow: hidden !important;
}

:root[data-theme='creative-gradient'] .tech-tag::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: -100% !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent) !important;
  transition: left var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .tech-tag:hover::before {
  left: 100% !important;
}

:root[data-theme='creative-gradient'] .tech-tag:hover {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: translateY(-2px) scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .tech-tag:active {
  transform: translateY(-1px) scale(1.01) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .tech-tag:focus {
  outline: none !important;
  box-shadow:
    var(--cg-shadow-medium),
    0 0 0 3px rgba(255, 255, 255, 0.15) !important;
}

/* Touch-friendly enhancements for mobile */
@media (pointer: coarse) {
  :root[data-theme='creative-gradient'] .tech-tag {
    min-height: 36px !important;
    padding: var(--cg-space-sm) var(--cg-space-md) !important;
  }

  :root[data-theme='creative-gradient'] .tech-tag:hover {
    transform: translateY(-1px) scale(1.01) !important;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
  }

  .service-card,
  .service-icon,
  .tech-tag {
    transition: none;
  }
}
</style>
