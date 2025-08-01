<template>
  <div class="work-experience-section">
    <div class="section-header">
      <div class="section-icon">
        <v-icon color="primary" size="32">mdi-briefcase</v-icon>
      </div>
      <h2 class="section-title">Work Experience</h2>
      <p class="section-subtitle">My professional journey and key achievements</p>
    </div>

    <div class="experience-timeline">
      <div
        v-for="(job, index) in experiences"
        :key="job.company + job.role"
        class="experience-card"
        :class="{ 'animate-in': shouldAnimate }"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Company Logo -->
        <div class="company-logo">
          <img
            :src="job.logo"
            :alt="job.company + ' logo'"
            loading="lazy"
            @error="handleLogoError"
          />
        </div>

        <!-- Experience Content -->
        <div class="experience-content">
          <!-- Header: Role, Company, Duration -->
          <div class="experience-header">
            <div class="role-company">
              <h3 class="role-title">{{ job.role }}</h3>
              <a
                :href="job.companyUrl"
                class="company-name"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ job.company }}
              </a>
              <span class="employment-type">Full-time</span>
            </div>
            <div class="duration-location">
              <span class="duration">{{ job.years }}</span>
              <span class="location">{{ job.location }}</span>
            </div>
          </div>

          <!-- Description -->
          <div class="experience-description">
            <div v-if="!isLongDescription(job.description)" class="description-text">
              {{ job.description }}
            </div>
            <div v-else class="description-expandable">
              <div class="description-text" :class="{ collapsed: !expandedJobs[index] }">
                <template v-if="!expandedJobs[index]">
                  {{ job.description.split('\n')[0] }}
                  <span v-if="job.description.split('\n').length > 1">...</span>
                </template>
                <template v-else>
                  <span v-for="(line, i) in job.description.split('\n')" :key="i">
                    {{ line }}<br v-if="i < job.description.split('\n').length - 1" />
                  </span>
                </template>
              </div>
              <button class="expand-btn" @click="toggleExpand(index)">
                {{ expandedJobs[index] ? 'Show less' : 'Show more' }}
                <v-icon size="16" class="expand-icon">
                  {{ expandedJobs[index] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </button>
            </div>
          </div>

          <!-- Skills Tags -->
          <div class="skills-section">
            <div class="skills-grid">
              <span v-for="skill in job.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

defineProps({
  experiences: {
    type: Array,
    required: true,
  },
  shouldAnimate: {
    type: Boolean,
    default: true,
  },
})

// Reactive state for expanded job descriptions
const expandedJobs = reactive({})

// Check if description is long enough to need expansion
function isLongDescription(description) {
  return description && (description.length > 150 || description.includes('\n'))
}

// Toggle expand/collapse for job descriptions
function toggleExpand(index) {
  expandedJobs[index] = !expandedJobs[index]
}

// Handle logo loading errors
function handleLogoError(event) {
  event.target.style.display = 'none'
}
</script>

<style scoped>
.work-experience-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
}

/* ===== SECTION HEADER ===== */
.section-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.section-icon {
  width: 64px;
  height: 64px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
  color: var(--color-primary-600);
}

.section-icon:hover {
  background: var(--glass-hover-bg);
  transform: scale(1.05);
  box-shadow: var(--glass-shadow-heavy);
  color: var(--color-primary-700);
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
}

.section-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin: 0;
}

/* ===== EXPERIENCE TIMELINE ===== */
.experience-timeline {
  position: relative;
}

.experience-timeline::before {
  content: '';
  position: absolute;
  left: 32px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-primary);
  z-index: 1;
}

/* ===== EXPERIENCE CARDS ===== */
.experience-card {
  display: flex;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--glass-shadow-medium);
  border: 1px solid var(--glass-border);
  transition: all var(--duration-normal) var(--ease-out);
}

.experience-card:hover {
  background: var(--glass-hover-bg);
  box-shadow: var(--glass-shadow-heavy);
  transform: translateY(-4px);
  border-color: var(--glass-focus-border);
}

.experience-card::before {
  content: '';
  position: absolute;
  left: -44px;
  top: var(--space-6);
  width: 12px;
  height: 12px;
  background: var(--color-primary-500);
  border-radius: var(--radius-full);
  border: 3px solid var(--bg-primary);
  z-index: 2;
}

/* ===== COMPANY LOGO ===== */
.company-logo {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-out);
  box-shadow: var(--glass-shadow-light);
}

.company-logo:hover {
  background: var(--glass-hover-bg);
  border-color: var(--glass-focus-border);
  box-shadow: var(--glass-shadow-medium);
  transform: scale(1.05);
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-fast) var(--ease-out);
}

.company-logo:hover img {
  transform: scale(1.1);
}

/* ===== EXPERIENCE CONTENT ===== */
.experience-content {
  flex: 1;
  min-width: 0;
}

.experience-header {
  margin-bottom: var(--space-4);
}

.role-company {
  margin-bottom: var(--space-2);
}

.role-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
  line-height: 1.3;
}

.company-name {
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--color-primary-600);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
  display: inline-block;
  margin-bottom: var(--space-1);
}

.company-name:hover {
  color: var(--color-primary-700);
  text-decoration: underline;
}

.employment-type {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  font-weight: 400;
  margin-left: var(--space-2);
}

.duration-location {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.duration {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.location {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.location::before {
  content: '📍';
  font-size: var(--text-xs);
}

/* ===== DESCRIPTION ===== */
.experience-description {
  margin-bottom: var(--space-4);
}

.description-text {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text-secondary);
  transition: all var(--duration-normal) var(--ease-out);
}

.description-text.collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.expand-btn {
  background: none;
  border: none;
  color: var(--color-primary-600);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-2);
  padding: var(--space-1) 0;
  transition: color var(--duration-fast) var(--ease-out);
}

.expand-btn:hover {
  color: var(--color-primary-700);
}

.expand-icon {
  transition: transform var(--duration-fast) var(--ease-out);
}

/* ===== SKILLS SECTION ===== */
.skills-section {
  margin-top: var(--space-4);
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-tag {
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  color: var(--text-primary);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow-light);
  transition: all var(--duration-fast) var(--ease-out);
}

.skill-tag:hover {
  background: var(--glass-hover-bg);
  color: var(--color-primary-600);
  border-color: var(--glass-focus-border);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-medium);
}

/* ===== ANIMATIONS ===== */
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s var(--ease-out) forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .work-experience-section {
    padding: var(--space-6) var(--space-2);
  }

  .experience-timeline::before {
    display: none;
  }

  .experience-card {
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4);
    margin-left: 0;
  }

  .experience-card::before {
    display: none;
  }

  .company-logo {
    width: 56px;
    height: 56px;
    align-self: flex-start;
  }

  .role-title {
    font-size: var(--text-lg);
  }

  .company-name {
    font-size: var(--text-base);
  }

  .duration-location {
    flex-direction: row;
    gap: var(--space-3);
  }

  .section-title {
    font-size: var(--text-2xl);
  }

  .section-subtitle {
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .experience-card {
    padding: var(--space-3);
    gap: var(--space-3);
  }

  .company-logo {
    width: 48px;
    height: 48px;
  }

  .role-title {
    font-size: var(--text-base);
  }

  .company-name {
    font-size: var(--text-sm);
  }

  .skills-grid {
    gap: var(--space-1);
  }

  .skill-tag {
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-2);
  }
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .experience-card:hover {
    transform: none;
  }

  .skill-tag:hover {
    transform: none;
  }
}

/* ===== THEME-SPECIFIC GLASS MORPHISM ENHANCEMENTS ===== */

/* Creative Gradient Theme v2.0 - Using Global System */
:root[data-theme='creative-gradient'] .work-experience-section {
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

:root[data-theme='creative-gradient'] .experience-card {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .experience-card:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) !important;
}

:root[data-theme='creative-gradient'] .job-title,
:root[data-theme='creative-gradient'] .company-name {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .job-description,
:root[data-theme='creative-gradient'] .job-duration {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

/* Enhanced Skill Tag Glass Effects */
:root[data-theme='creative-gradient'] .skill-tag {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  border-radius: var(--cg-radius-full) !important;
  transition: all var(--cg-transition-fast) !important;
  box-shadow: var(--cg-shadow-light) !important;
  position: relative !important;
  overflow: hidden !important;
}

:root[data-theme='creative-gradient'] .skill-tag::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: -100% !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent) !important;
  transition: left var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .skill-tag:hover::before {
  left: 100% !important;
}

:root[data-theme='creative-gradient'] .skill-tag:hover {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: translateY(-2px) scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .skill-tag:active {
  transform: translateY(-1px) scale(1.01) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .skill-tag:focus {
  outline: none !important;
  box-shadow:
    var(--cg-shadow-medium),
    0 0 0 3px rgba(255, 255, 255, 0.15) !important;
}

/* Professional Dark Theme - Dark Mode */
:root[data-theme='professional-dark'][data-mode='dark'] .experience-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:root[data-theme='professional-dark'][data-mode='dark'] .experience-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(20, 184, 166, 0.3);
}

:root[data-theme='professional-dark'][data-mode='dark'] .company-logo {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .skill-tag {
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(20, 184, 166, 0.2);
  color: var(--color-secondary-400);
}

:root[data-theme='professional-dark'][data-mode='dark'] .skill-tag:hover {
  background: rgba(20, 184, 166, 0.15);
  border-color: rgba(20, 184, 166, 0.3);
  color: var(--color-secondary-300);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .experience-card {
  background: rgba(100, 116, 139, 0.08);
  border: 1px solid rgba(100, 116, 139, 0.15);
}

:root[data-theme='minimal-elegant'] .experience-card:hover {
  background: rgba(100, 116, 139, 0.12);
  border-color: rgba(59, 130, 246, 0.25);
}

:root[data-theme='minimal-elegant'] .skill-tag {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  color: var(--color-secondary-600);
}

:root[data-theme='minimal-elegant'] .skill-tag:hover {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.25);
  color: var(--color-secondary-700);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .experience-card {
  background: rgba(120, 113, 108, 0.08);
  border: 1px solid rgba(120, 113, 108, 0.15);
}

:root[data-theme='warm-professional'] .experience-card:hover {
  background: rgba(120, 113, 108, 0.12);
  border-color: rgba(249, 115, 22, 0.25);
}

:root[data-theme='warm-professional'] .skill-tag {
  background: rgba(249, 115, 22, 0.08);
  border: 1px solid rgba(249, 115, 22, 0.15);
  color: var(--color-secondary-600);
}

:root[data-theme='warm-professional'] .skill-tag:hover {
  background: rgba(249, 115, 22, 0.12);
  border-color: rgba(249, 115, 22, 0.25);
  color: var(--color-secondary-700);
}

/* Enhanced Timeline for Glass Morphism */
.experience-timeline::before {
  background: var(--glass-border);
  backdrop-filter: blur(var(--glass-blur-light));
  box-shadow: var(--glass-shadow-light);
}

.experience-card::before {
  background: var(--color-primary-500);
  border: 3px solid var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  box-shadow: var(--glass-shadow-light);
}
</style>
