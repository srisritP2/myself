<template>
  <section class="education-section">
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
              d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="section-title">Education</h2>
        <p class="section-subtitle">Academic foundation and continuous learning journey</p>
      </div>

      <div class="education-timeline">
        <div
          v-for="(education, index) in educationList"
          :key="education.id"
          class="education-card glass-card"
          :class="{ 'animate-slide-up': enableAnimations }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="education-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="education.iconPath" fill="currentColor" />
            </svg>
          </div>

          <div class="education-content">
            <div class="education-header">
              <h3 class="education-degree">{{ education.degree }}</h3>
              <span class="education-duration">{{ education.duration }}</span>
            </div>

            <div class="education-institution">
              <span class="institution-name">{{ education.institution }}</span>
              <span class="institution-location">{{ education.location }}</span>
            </div>

            <div v-if="education.description" class="education-description">
              {{ education.description }}
            </div>

            <div
              v-if="education.achievements && education.achievements.length"
              class="education-achievements"
            >
              <h4 class="achievements-title">Key Achievements:</h4>
              <ul class="achievements-list">
                <li
                  v-for="achievement in education.achievements"
                  :key="achievement"
                  class="achievement-item"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                      fill="currentColor"
                    />
                  </svg>
                  {{ achievement }}
                </li>
              </ul>
            </div>

            <div
              v-if="education.relevantCourses && education.relevantCourses.length"
              class="relevant-courses"
            >
              <h4 class="courses-title">Relevant Coursework:</h4>
              <div class="courses-tags">
                <span v-for="course in education.relevantCourses" :key="course" class="course-tag">
                  {{ course }}
                </span>
              </div>
            </div>

            <div v-if="education.gpa" class="education-gpa">
              <span class="gpa-label">GPA:</span>
              <span class="gpa-value">{{ education.gpa }}</span>
            </div>
          </div>

          <div v-if="education.honors" class="education-honors">
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
            <span>{{ education.honors }}</span>
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

const educationList = ref([
  {
    id: 1,
    degree: 'Master of Computer Applications (MCA)',
    institution: 'University of Technology',
    location: 'Bangalore, India',
    duration: '2014 - 2016',
    description:
      'Specialized in software engineering, database management, and advanced programming concepts with focus on quality assurance methodologies.',
    gpa: '8.5/10',
    honors: 'First Class with Distinction',
    achievements: [
      "Thesis on 'Automated Testing Frameworks for Web Applications'",
      'Led student project on mobile app testing strategies',
      'Recipient of Academic Excellence Award for 2 consecutive years',
    ],
    relevantCourses: [
      'Software Testing & QA',
      'Database Management Systems',
      'Web Technologies',
      'Software Engineering',
      'Data Structures & Algorithms',
      'Project Management',
    ],
    iconPath:
      'M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z',
  },
  {
    id: 2,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'State University',
    location: 'Chennai, India',
    duration: '2011 - 2014',
    description:
      'Comprehensive foundation in computer science fundamentals, programming languages, and software development principles.',
    gpa: '8.2/10',
    achievements: [
      "Final year project on 'E-commerce Testing Automation'",
      'Active member of Computer Science Society',
      'Participated in inter-university programming competitions',
    ],
    relevantCourses: [
      'Programming in Java',
      'Web Development',
      'Computer Networks',
      'Operating Systems',
      'Software Engineering Principles',
      'Mathematics for Computing',
    ],
    iconPath:
      'M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z',
  },
  {
    id: 3,
    degree: 'Certified Scrum Master (CSM)',
    institution: 'Scrum Alliance',
    location: 'Online Certification',
    duration: '2021',
    description:
      'Professional certification in Agile methodologies and Scrum framework, enhancing project management and team leadership skills.',
    achievements: [
      'Completed advanced Scrum Master training',
      'Applied Agile principles in QA processes',
      'Improved team velocity by 30% post-certification',
    ],
    iconPath:
      'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L4.84 5.17L7.5 2.5L6 1L0 7V9H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9H21Z',
  },
  {
    id: 4,
    degree: 'ISTQB Certified Tester',
    institution: 'International Software Testing Qualifications Board',
    location: 'Professional Certification',
    duration: '2019',
    description:
      'Foundation level certification in software testing principles, techniques, and best practices.',
    achievements: [
      'Scored 95% in foundation level examination',
      'Applied ISTQB principles in daily testing activities',
      'Mentored junior testers for ISTQB certification',
    ],
    iconPath:
      'M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z',
  },
])
</script>

<style scoped>
.education-section {
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
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Education Timeline */
.education-timeline {
  position: relative;
}

.education-timeline::before {
  content: '';
  position: absolute;
  left: 32px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--glass-border);
  backdrop-filter: blur(var(--glass-blur-light));
  box-shadow: var(--glass-shadow-light);
  z-index: 1;
}

.education-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  margin-bottom: var(--space-8);
  margin-left: var(--space-16);
  display: flex;
  gap: var(--space-4);
}

.education-card::before {
  content: '';
  position: absolute;
  left: -44px;
  top: var(--space-6);
  width: 12px;
  height: 12px;
  background: var(--color-primary-500);
  border-radius: var(--radius-full);
  border: 3px solid var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  box-shadow: var(--glass-shadow-light);
  z-index: 2;
}

.education-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-4px);
  box-shadow: var(--glass-shadow-heavy);
  border-color: var(--glass-focus-border);
}

.education-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-primary-500);
  flex-shrink: 0;
  transition: all var(--duration-normal) var(--ease-out);
}

.education-card:hover .education-icon {
  background: var(--glass-medium-bg);
  transform: scale(1.1);
}

.education-content {
  flex: 1;
  min-width: 0;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-3);
  gap: var(--space-4);
}

.education-degree {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.education-duration {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary-600);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.education-institution {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-bottom: var(--space-4);
}

.institution-name {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.institution-location {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.institution-location::before {
  content: '📍';
  font-size: var(--text-xs);
}

.education-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.education-achievements {
  margin-bottom: var(--space-4);
}

.achievements-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
  line-height: 1.4;
}

.achievement-item svg {
  color: var(--color-success-500);
  flex-shrink: 0;
  margin-top: 2px;
}

.relevant-courses {
  margin-bottom: var(--space-4);
}

.courses-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-3) 0;
}

.courses-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.course-tag {
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

.course-tag:hover {
  background: var(--glass-medium-bg);
  transform: translateY(-2px);
}

.education-gpa {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  margin-bottom: var(--space-3);
}

.gpa-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.gpa-value {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary-600);
}

.education-honors {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-warning-600);
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
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

/* Responsive Design */
@media (max-width: 768px) {
  .education-timeline::before {
    display: none;
  }

  .education-card {
    margin-left: 0;
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4);
  }

  .education-card::before {
    display: none;
  }

  .education-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }

  .education-duration {
    align-self: flex-start;
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

  .education-card {
    padding: var(--space-3);
  }

  .section-icon {
    width: 64px;
    height: 64px;
  }

  .education-icon {
    width: 48px;
    height: 48px;
  }

  .education-honors {
    position: static;
    margin-top: var(--space-3);
    align-self: flex-start;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
  }

  .education-card,
  .education-icon,
  .course-tag {
    transition: none;
  }
}

/* Theme-Specific Glass Morphism Enhancements */

/* Creative Gradient Theme */
:root[data-theme='creative-gradient'] .education-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
  pointer-events: none;
  z-index: -1;
}

:root[data-theme='creative-gradient'] .education-card {
  background: var(--glass-gradient-overlay, var(--glass-bg));
  border: 1px solid rgba(255, 255, 255, 0.15);
}

:root[data-theme='creative-gradient'] .education-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.15);
}

/* Professional Dark Theme */
:root[data-theme='professional-dark'][data-mode='dark'] .education-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .education-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .education-card {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .education-card:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .education-card {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .education-card:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}
</style>
