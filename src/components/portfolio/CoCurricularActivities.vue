<template>
  <section class="cocurricular-section">
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
              d="M16 4C16.5523 4 17 4.44772 17 5V9H20C20.5523 9 21 9.44772 21 10V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V10C3 9.44772 3.44772 9 4 9H7V5C7 4.44772 7.44772 4 8 4H16Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="section-title">Co-Curricular Activities</h2>
        <p class="section-subtitle">
          Leadership, community involvement, and professional development
        </p>
      </div>

      <div class="activities-grid">
        <div
          v-for="(activity, index) in activities"
          :key="activity.id"
          class="activity-card glass-card"
          :class="{ 'animate-slide-up': enableAnimations }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="activity-header">
            <div class="activity-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path :d="activity.iconPath" fill="currentColor" />
              </svg>
            </div>
            <div class="activity-category">{{ activity.category }}</div>
          </div>

          <div class="activity-content">
            <h3 class="activity-title">{{ activity.title }}</h3>
            <div class="activity-organization">{{ activity.organization }}</div>
            <div class="activity-duration">{{ activity.duration }}</div>

            <p class="activity-description">{{ activity.description }}</p>

            <div
              v-if="activity.responsibilities && activity.responsibilities.length"
              class="activity-responsibilities"
            >
              <h4 class="responsibilities-title">Key Responsibilities:</h4>
              <ul class="responsibilities-list">
                <li
                  v-for="responsibility in activity.responsibilities"
                  :key="responsibility"
                  class="responsibility-item"
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
                  {{ responsibility }}
                </li>
              </ul>
            </div>

            <div
              v-if="activity.achievements && activity.achievements.length"
              class="activity-achievements"
            >
              <h4 class="achievements-title">Achievements:</h4>
              <div class="achievements-tags">
                <span
                  v-for="achievement in activity.achievements"
                  :key="achievement"
                  class="achievement-tag"
                >
                  {{ achievement }}
                </span>
              </div>
            </div>

            <div v-if="activity.skills && activity.skills.length" class="activity-skills">
              <h4 class="skills-title">Skills Developed:</h4>
              <div class="skills-tags">
                <span v-for="skill in activity.skills" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="activity.impact" class="activity-impact">
            <div class="impact-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
              </svg>
            </div>
            <span class="impact-text">{{ activity.impact }}</span>
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

const activities = ref([
  {
    id: 1,
    category: 'Leadership',
    title: 'QA Team Lead & Mentor',
    organization: 'TechCorp Solutions',
    duration: '2020 - Present',
    description:
      'Leading a team of 8 QA professionals while mentoring junior testers and establishing quality standards across multiple projects.',
    responsibilities: [
      'Mentored 15+ junior QA engineers in testing methodologies',
      'Established QA best practices and coding standards',
      'Conducted technical interviews and performance reviews',
      'Organized knowledge sharing sessions and workshops',
    ],
    achievements: [
      'Team Productivity +45%',
      'Mentee Promotion Rate 80%',
      'Knowledge Base Articles: 25+',
    ],
    skills: ['Team Leadership', 'Mentoring', 'Technical Training', 'Performance Management'],
    impact: 'Improved overall team efficiency and knowledge retention',
    iconPath:
      'M16 4C16.5523 4 17 4.44772 17 5V9H20C20.5523 9 21 9.44772 21 10V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V10C3 9.44772 3.44772 9 4 9H7V5C7 4.44772 7.44772 4 8 4H16Z',
  },
  {
    id: 2,
    category: 'Community',
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    duration: '2019 - Present',
    description:
      'Active contributor to open source testing frameworks and tools, helping improve software quality in the developer community.',
    responsibilities: [
      'Contributed to Selenium WebDriver documentation',
      'Developed testing utilities for popular frameworks',
      'Reviewed and tested community-submitted code',
      'Participated in technical discussions and issue resolution',
    ],
    achievements: ['50+ Pull Requests Merged', '3 Testing Tools Created', '500+ GitHub Stars'],
    skills: ['Open Source Development', 'Code Review', 'Technical Writing', 'Community Engagement'],
    impact: 'Enhanced testing capabilities for thousands of developers',
    iconPath:
      'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L4.84 5.17L7.5 2.5L6 1L0 7V9H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9H21Z',
  },
  {
    id: 3,
    category: 'Professional Development',
    title: 'Technical Speaker & Workshop Facilitator',
    organization: 'Industry Conferences',
    duration: '2018 - Present',
    description:
      'Regular speaker at testing conferences and workshops, sharing knowledge on automation frameworks and QA best practices.',
    responsibilities: [
      'Delivered 20+ technical presentations at conferences',
      'Conducted hands-on workshops on test automation',
      'Created educational content for testing communities',
      'Participated in panel discussions on QA trends',
    ],
    achievements: [
      'Speaker at 5 Major Conferences',
      'Workshop Attendees: 500+',
      'Average Rating: 4.8/5',
    ],
    skills: ['Public Speaking', 'Technical Presentation', 'Workshop Design', 'Content Creation'],
    impact: 'Educated 500+ professionals in modern testing practices',
    iconPath: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z',
  },
  {
    id: 4,
    category: 'Volunteer Work',
    title: 'Tech Education Volunteer',
    organization: 'Local Coding Bootcamps',
    duration: '2017 - Present',
    description:
      'Volunteering to teach software testing concepts to career changers and new developers entering the tech industry.',
    responsibilities: [
      'Taught testing fundamentals to bootcamp students',
      'Provided career guidance and mentorship',
      'Developed curriculum for QA training modules',
      'Conducted mock interviews and resume reviews',
    ],
    achievements: ['Students Mentored: 100+', 'Job Placement Rate: 85%', 'Curriculum Modules: 8'],
    skills: ['Teaching', 'Curriculum Development', 'Career Counseling', 'Community Service'],
    impact: 'Helped 100+ individuals transition into tech careers',
    iconPath:
      'M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z',
  },
  {
    id: 5,
    category: 'Innovation',
    title: 'Internal Innovation Committee',
    organization: 'TechCorp Solutions',
    duration: '2019 - 2022',
    description:
      "Member of the company's innovation committee, driving process improvements and technology adoption initiatives.",
    responsibilities: [
      'Evaluated new testing tools and technologies',
      'Proposed and implemented process improvements',
      'Led cross-departmental collaboration initiatives',
      'Organized innovation challenges and hackathons',
    ],
    achievements: [
      'Process Improvements: 12',
      'Cost Savings: $50K annually',
      'Hackathon Winner: 2x',
    ],
    skills: [
      'Innovation Management',
      'Process Improvement',
      'Technology Evaluation',
      'Cross-functional Collaboration',
    ],
    impact: 'Drove company-wide adoption of modern testing practices',
    iconPath:
      'M9.4 16.6L4.8 12L9.4 7.4L10.8 8.8L7.6 12L10.8 15.2L9.4 16.6ZM14.6 16.6L13.2 15.2L16.4 12L13.2 8.8L14.6 7.4L19.2 12L14.6 16.6Z',
  },
  {
    id: 6,
    category: 'Professional Organization',
    title: 'Quality Assurance Society Member',
    organization: 'International QA Association',
    duration: '2016 - Present',
    description:
      'Active member contributing to industry standards and best practices in software quality assurance.',
    responsibilities: [
      'Participated in standards development committees',
      'Contributed to industry research and publications',
      'Networked with QA professionals globally',
      'Attended annual conferences and training sessions',
    ],
    achievements: [
      'Committee Contributions: 5',
      'Research Papers: 3',
      'Professional Network: 200+',
    ],
    skills: [
      'Industry Standards',
      'Research & Analysis',
      'Professional Networking',
      'Technical Writing',
    ],
    impact: 'Contributed to industry-wide quality improvement initiatives',
    iconPath:
      'M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z',
  },
])
</script>

<style scoped>
.cocurricular-section {
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

/* Activities Grid - Responsive 3→2→1 Column Layout */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.activity-card {
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

.activity-card::before {
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

.activity-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-6px);
  box-shadow: var(--glass-shadow-heavy);
}

.activity-card:hover::before {
  opacity: 1;
}

.activity-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-primary-500);
  transition: all var(--duration-normal) var(--ease-out);
}

.activity-card:hover .activity-icon {
  background: var(--glass-medium-bg);
  transform: scale(1.1);
}

.activity-category {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-primary-600);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
  line-height: 1.3;
}

.activity-organization {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
}

.activity-duration {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.activity-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.activity-responsibilities {
  margin-bottom: var(--space-4);
}

.responsibilities-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
}

.responsibilities-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibility-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
  line-height: 1.4;
}

.responsibility-item svg {
  color: var(--color-success-500);
  flex-shrink: 0;
  margin-top: 2px;
}

.activity-achievements,
.activity-skills {
  margin-bottom: var(--space-4);
}

.achievements-title,
.skills-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-3) 0;
}

.achievements-tags,
.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.achievement-tag {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-success-700);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--color-success-200);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  transition: all var(--duration-fast) var(--ease-out);
}

.achievement-tag:hover {
  background: var(--glass-medium-bg);
  transform: translateY(-2px);
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

.activity-impact {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  margin-top: auto;
}

.impact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--color-warning-500);
  flex-shrink: 0;
}

.impact-text {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  font-style: italic;
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
  .activities-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .activities-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .activity-card {
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

  .activity-card {
    padding: var(--space-3);
  }

  .section-icon {
    width: 64px;
    height: 64px;
  }

  .activity-icon {
    width: 40px;
    height: 40px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
  }

  .activity-card,
  .activity-icon,
  .achievement-tag,
  .skill-tag {
    transition: none;
  }
}

/* Theme-Specific Glass Morphism Enhancements */

/* Creative Gradient Theme */
:root[data-theme='creative-gradient'] .cocurricular-section::before {
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

:root[data-theme='creative-gradient'] .activity-card {
  background: var(--glass-gradient-overlay, var(--glass-bg));
  border: 1px solid rgba(255, 255, 255, 0.15);
}

:root[data-theme='creative-gradient'] .activity-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.15);
}

/* Professional Dark Theme */
:root[data-theme='professional-dark'][data-mode='dark'] .activity-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .activity-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .activity-card {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .activity-card:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .activity-card {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .activity-card:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}
</style>
