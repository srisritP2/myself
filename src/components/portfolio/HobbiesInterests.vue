<template>
  <section class="hobbies-section">
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
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="section-title">Hobbies & Interests</h2>
        <p class="section-subtitle">Personal passions that fuel creativity and balance</p>
      </div>

      <div class="hobbies-grid">
        <div
          v-for="(hobby, index) in hobbies"
          :key="hobby.id"
          class="hobby-card glass-card"
          :class="{ 'animate-slide-up': enableAnimations }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="hobby-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="hobby.iconPath" fill="currentColor" />
            </svg>
          </div>

          <div class="hobby-content">
            <h3 class="hobby-title">{{ hobby.title }}</h3>
            <p class="hobby-description">{{ hobby.description }}</p>

            <div v-if="hobby.highlights && hobby.highlights.length" class="hobby-highlights">
              <div class="highlights-grid">
                <div v-for="highlight in hobby.highlights" :key="highlight" class="highlight-item">
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
                  <span>{{ highlight }}</span>
                </div>
              </div>
            </div>

            <div v-if="hobby.skills && hobby.skills.length" class="hobby-skills">
              <div class="skills-tags">
                <span v-for="skill in hobby.skills" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <div class="hobby-level">
            <div class="level-indicator">
              <div class="level-fill" :style="{ width: `${hobby.level}%` }"></div>
            </div>
            <span class="level-text">{{ hobby.levelText }}</span>
          </div>
        </div>
      </div>

      <!-- Personal Philosophy Section -->
      <div class="philosophy-section">
        <div class="philosophy-card glass-card">
          <div class="philosophy-icon">
            <svg
              width="24"
              height="24"
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
          <h3 class="philosophy-title">Personal Philosophy</h3>
          <p class="philosophy-text">
            "I believe in continuous learning and maintaining a healthy work-life balance. My
            hobbies not only provide relaxation but also enhance my professional skills through
            improved creativity, problem-solving abilities, and stress management. Each interest
            contributes to my growth as both a professional and an individual."
          </p>
          <div class="philosophy-values">
            <span class="value-tag">Continuous Learning</span>
            <span class="value-tag">Work-Life Balance</span>
            <span class="value-tag">Creative Problem Solving</span>
            <span class="value-tag">Personal Growth</span>
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

const hobbies = ref([
  {
    id: 1,
    title: 'Photography',
    description:
      'Capturing moments and exploring creative composition through digital and film photography. Specializing in landscape and street photography.',
    level: 85,
    levelText: 'Advanced',
    highlights: [
      '500+ photos in personal portfolio',
      'Featured in local photography exhibition',
      'Instagram: 2K+ followers',
    ],
    skills: ['Adobe Lightroom', 'Photoshop', 'Composition', 'Color Theory'],
    iconPath:
      'M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 7C14.76 7 17 9.24 17 12S14.76 17 12 17S7 14.76 7 12S9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15S15 13.66 15 12S13.66 9 12 9Z',
  },
  {
    id: 2,
    title: 'Cooking & Culinary Arts',
    description:
      'Exploring diverse cuisines and experimenting with fusion recipes. Passionate about understanding the science behind cooking techniques.',
    level: 75,
    levelText: 'Intermediate+',
    highlights: [
      'Mastered 5 international cuisines',
      'Host monthly dinner parties',
      'Created 50+ original recipes',
    ],
    skills: ['Recipe Development', 'Flavor Pairing', 'Presentation', 'Kitchen Management'],
    iconPath:
      'M8.1 13.34L3.91 9.16C2.35 7.59 2.35 5.06 3.91 3.5L10.93 10.5L8.1 13.34ZM14.88 11.53C16.32 12.97 16.32 15.24 14.88 16.68L11.05 20.5L15.29 16.25C16.73 14.81 16.73 12.54 15.29 11.1L14.88 11.53ZM5.41 20.5C4.95 20.5 4.55 20.1 4.55 19.64S4.95 18.78 5.41 18.78S6.27 19.18 6.27 19.64S5.87 20.5 5.41 20.5Z',
  },
  {
    id: 3,
    title: 'Reading & Literature',
    description:
      'Avid reader with interests spanning technology, philosophy, fiction, and personal development. Maintaining a goal of 24 books per year.',
    level: 90,
    levelText: 'Expert',
    highlights: [
      '200+ books read in last 5 years',
      'Active member of 2 book clubs',
      'Goodreads: 4.2 average rating',
    ],
    skills: ['Critical Analysis', 'Speed Reading', 'Note Taking', 'Discussion Leading'],
    iconPath:
      'M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C5.33 4.5 4.11 4.65 3 5V18.5C4.11 18.15 5.33 18 6.5 18C8.45 18 10.55 18.4 12 19.5C13.45 18.4 15.55 18 17.5 18C18.67 18 19.89 18.15 21 18.5V5ZM12 17.5V7.5C13.1 6.9 14.7 6.5 16.5 6.5S19.9 6.9 21 7.5V16C19.9 15.65 18.7 15.5 17.5 15.5C15.8 15.5 14.2 15.9 12.8 16.7L12 17.5Z',
  },
  {
    id: 4,
    title: 'Fitness & Wellness',
    description:
      'Committed to maintaining physical and mental health through regular exercise, yoga, and mindfulness practices.',
    level: 80,
    levelText: 'Advanced',
    highlights: [
      '5+ years consistent workout routine',
      'Completed 3 half-marathons',
      'Certified in basic yoga instruction',
    ],
    skills: ['Strength Training', 'Cardio Endurance', 'Yoga', 'Meditation'],
    iconPath:
      'M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z',
  },
  {
    id: 5,
    title: 'Technology Exploration',
    description:
      'Staying current with emerging technologies, experimenting with new programming languages, and building personal projects.',
    level: 95,
    levelText: 'Expert',
    highlights: [
      '10+ personal coding projects',
      'Active on GitHub and Stack Overflow',
      'Tech blog with 50+ articles',
    ],
    skills: [
      'New Language Learning',
      'Project Architecture',
      'Technical Writing',
      'Open Source Contribution',
    ],
    iconPath:
      'M9.4 16.6L4.8 12L9.4 7.4L10.8 8.8L7.6 12L10.8 15.2L9.4 16.6ZM14.6 16.6L13.2 15.2L16.4 12L13.2 8.8L14.6 7.4L19.2 12L14.6 16.6Z',
  },
  {
    id: 6,
    title: 'Travel & Cultural Exploration',
    description:
      'Exploring different cultures, cuisines, and perspectives through travel. Documenting experiences and learning from diverse communities.',
    level: 70,
    levelText: 'Intermediate',
    highlights: [
      'Visited 15+ countries',
      'Fluent in 3 languages',
      'Cultural exchange program participant',
    ],
    skills: ['Cultural Adaptation', 'Language Learning', 'Travel Planning', 'Photography'],
    iconPath: 'M14.4 6L14 4H5V21H7V14H12.6L13 16H20V6H14.4Z',
  },
])
</script>

<style scoped>
.hobbies-section {
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

/* Hobbies Grid - Responsive 3→2→1 Column Layout */
.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: var(--cg-space-3xl, var(--space-12));
}

.hobby-card {
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

.hobby-card::before {
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

.hobby-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-6px);
  box-shadow: var(--glass-shadow-heavy);
}

.hobby-card:hover::before {
  opacity: 1;
}

.hobby-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-primary-500);
  transition: all var(--duration-normal) var(--ease-out);
  align-self: flex-start;
}

.hobby-card:hover .hobby-icon {
  background: var(--glass-medium-bg);
  transform: scale(1.1);
}

.hobby-content {
  flex: 1;
}

.hobby-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-3) 0;
  line-height: 1.3;
}

.hobby-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.hobby-highlights {
  margin-bottom: var(--space-4);
}

.highlights-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-2) var(--space-3);
  transition: all var(--duration-fast) var(--ease-out);
}

.highlight-item:hover {
  background: var(--glass-medium-bg);
  transform: translateX(4px);
}

.highlight-item svg {
  color: var(--color-warning-500);
  flex-shrink: 0;
}

.hobby-skills {
  margin-bottom: var(--space-4);
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-tag {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text-primary);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  transition: all var(--duration-fast) var(--ease-out);
}

.skill-tag:hover {
  background: var(--glass-medium-bg);
  transform: translateY(-2px);
}

.hobby-level {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: auto;
}

.level-indicator {
  flex: 1;
  height: 8px;
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.level-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
  border-radius: var(--radius-full);
  transition: width var(--duration-slow) var(--ease-out);
}

.level-text {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-primary-600);
  white-space: nowrap;
}

/* Philosophy Section */
.philosophy-section {
  margin-top: var(--space-12);
}

.philosophy-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.philosophy-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--color-primary-500),
    var(--color-secondary-500),
    var(--color-accent-500)
  );
  opacity: 0.8;
}

.philosophy-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-4px);
  box-shadow: var(--glass-shadow-heavy);
}

.philosophy-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  color: var(--color-primary-500);
  margin-bottom: var(--space-4);
  transition: all var(--duration-normal) var(--ease-out);
}

.philosophy-card:hover .philosophy-icon {
  background: var(--glass-medium-bg);
  transform: scale(1.1);
}

.philosophy-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-4) 0;
  line-height: 1.3;
}

.philosophy-text {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-6);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-style: italic;
}

.philosophy-values {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}

.value-tag {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary-700);
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  transition: all var(--duration-fast) var(--ease-out);
}

.value-tag:hover {
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
  .hobbies-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hobbies-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hobby-card {
    padding: var(--space-4);
  }

  .philosophy-card {
    padding: var(--space-6);
  }

  .section-title {
    font-size: var(--text-3xl);
  }

  .section-subtitle {
    font-size: var(--text-lg);
  }

  .philosophy-values {
    gap: var(--space-2);
  }
}

@media (max-width: 480px) {
  .section-container {
    padding: 0 var(--space-4);
  }

  .hobby-card {
    padding: var(--space-3);
  }

  .philosophy-card {
    padding: var(--space-4);
  }

  .section-icon {
    width: 64px;
    height: 64px;
  }

  .hobby-icon {
    width: 56px;
    height: 56px;
  }

  .philosophy-icon {
    width: 56px;
    height: 56px;
  }

  .philosophy-text {
    font-size: var(--text-base);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
  }

  .hobby-card,
  .hobby-icon,
  .skill-tag,
  .value-tag,
  .highlight-item {
    transition: none;
  }

  .level-fill {
    transition: none;
  }
}

/* Creative Gradient Theme v2.0 - Using Global System */
:root[data-theme='creative-gradient'] .hobbies-section {
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

:root[data-theme='creative-gradient'] .hobby-card,
:root[data-theme='creative-gradient'] .philosophy-card {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .hobby-card:hover,
:root[data-theme='creative-gradient'] .philosophy-card:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) !important;
}

:root[data-theme='creative-gradient'] .hobby-title,
:root[data-theme='creative-gradient'] .philosophy-title {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .hobby-description,
:root[data-theme='creative-gradient'] .philosophy-text {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .hobby-icon,
:root[data-theme='creative-gradient'] .philosophy-icon {
  background: var(--cg-glass-bg-strong) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-light) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .hobby-card:hover .hobby-icon,
:root[data-theme='creative-gradient'] .philosophy-card:hover .philosophy-icon {
  background: var(--cg-glass-bg-interactive) !important;
  transform: scale(1.1) !important;
}

/* Enhanced Highlight Item Glass Effects */
:root[data-theme='creative-gradient'] .highlight-item {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  border-radius: var(--cg-radius-lg) !important;
  box-shadow: var(--cg-shadow-light) !important;
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
  transform: translateX(4px) scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .skill-tag {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  border-radius: var(--cg-radius-full) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .skill-tag:hover {
  background: var(--cg-glass-bg-medium) !important;
  transform: translateY(-2px) !important;
}

:root[data-theme='creative-gradient'] .value-tag {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  border-radius: var(--cg-radius-full) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .value-tag:hover {
  background: var(--cg-glass-bg-medium) !important;
  transform: translateY(-2px) !important;
}

:root[data-theme='creative-gradient'] .level-indicator {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  border-radius: var(--cg-radius-full) !important;
}

:root[data-theme='creative-gradient'] .level-text {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .level-fill {
  background: var(--cg-gradient-accent) !important;
  border-radius: var(--cg-radius-full) !important;
}

/* Professional Dark Theme */
:root[data-theme='professional-dark'][data-mode='dark'] .hobby-card,
:root[data-theme='professional-dark'][data-mode='dark'] .philosophy-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .hobby-card:hover,
:root[data-theme='professional-dark'][data-mode='dark'] .philosophy-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .hobby-card,
:root[data-theme='minimal-elegant'] .philosophy-card {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .hobby-card:hover,
:root[data-theme='minimal-elegant'] .philosophy-card:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .hobby-card,
:root[data-theme='warm-professional'] .philosophy-card {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .hobby-card:hover,
:root[data-theme='warm-professional'] .philosophy-card:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}
</style>
