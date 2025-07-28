<template>
  <div class="skills-section">
    <div class="section-header">
      <div class="section-icon">
        <v-icon color="primary" size="32">mdi-tools</v-icon>
      </div>
      <h2 class="section-title">Technical Skills</h2>
      <p class="section-subtitle">Technologies and tools I work with</p>
    </div>

    <div class="skills-container">
      <div
        v-for="(category, categoryIndex) in skillCategories"
        :key="category.name"
        class="skill-category"
        :class="{ 'animate-in': shouldAnimate }"
        :style="{ animationDelay: `${categoryIndex * 0.1}s` }"
      >
        <div class="category-header">
          <div class="category-icon">
            <v-icon :color="category.color" size="20">{{ category.icon }}</v-icon>
          </div>
          <h3 class="category-title">{{ category.name }}</h3>
          <span class="category-count">{{ category.skills.length }}</span>
        </div>

        <div class="skills-chips">
          <div
            v-for="(skill, skillIndex) in category.skills"
            :key="skill.name"
            class="skill-chip"
            :class="{ 'animate-in': shouldAnimate }"
            :style="{ animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s` }"
            :title="`${skill.name} - ${skill.experience || 'Professional level'}`"
          >
            <div class="skill-chip-icon">
              <v-icon :color="skill.color || category.color" size="16">{{ skill.icon }}</v-icon>
            </div>
            <span class="skill-chip-name">{{ skill.name }}</span>
            <div
              v-if="skill.level"
              class="skill-chip-level"
              :style="{ backgroundColor: `var(--color-${category.color}-500)` }"
            >
              {{ skill.level }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  skills: {
    type: Array,
    required: true,
  },
  shouldAnimate: {
    type: Boolean,
    default: true,
  },
})

// Organize skills into categories with enhanced data
const skillCategories = computed(() => [
  {
    name: 'Testing & QA',
    icon: 'mdi-bug-check',
    color: 'primary',
    skills: [
      { name: 'Selenium WebDriver', icon: 'mdi-robot', level: 95, experience: '8+ years' },
      { name: 'Cucumber BDD', icon: 'mdi-leaf', level: 90, experience: '6+ years' },
      { name: 'JMeter', icon: 'mdi-speedometer', level: 85, experience: '5+ years' },
      {
        name: 'Manual Testing',
        icon: 'mdi-hand-pointing-right',
        level: 98,
        experience: '10+ years',
      },
      { name: 'Test Planning', icon: 'mdi-clipboard-list', level: 95, experience: '8+ years' },
      { name: 'API Testing', icon: 'mdi-api', level: 80, experience: '4+ years' },
    ],
  },
  {
    name: 'Programming',
    icon: 'mdi-code-tags',
    color: 'secondary',
    skills: [
      { name: 'Java', icon: 'mdi-language-java', level: 90, experience: '8+ years' },
      { name: 'JavaScript', icon: 'mdi-language-javascript', level: 75, experience: '4+ years' },
      { name: 'Python', icon: 'mdi-language-python', level: 70, experience: '3+ years' },
      { name: 'SQL', icon: 'mdi-database', level: 85, experience: '6+ years' },
    ],
  },
  {
    name: 'Tools & Platforms',
    icon: 'mdi-toolbox',
    color: 'accent',
    skills: [
      { name: 'JIRA', icon: 'mdi-jira', level: 95, experience: '8+ years' },
      { name: 'Git', icon: 'mdi-git', level: 85, experience: '6+ years' },
      { name: 'Jenkins', icon: 'mdi-pipe', level: 80, experience: '4+ years' },
      { name: 'Docker', icon: 'mdi-docker', level: 70, experience: '3+ years' },
      { name: 'Linux', icon: 'mdi-linux', level: 85, experience: '6+ years' },
    ],
  },
  {
    name: 'Web Technologies',
    icon: 'mdi-web',
    color: 'success',
    skills: [
      { name: 'HTML5', icon: 'mdi-language-html5', level: 90, experience: '6+ years' },
      { name: 'CSS3', icon: 'mdi-language-css3', level: 85, experience: '5+ years' },
      { name: 'REST APIs', icon: 'mdi-api', level: 80, experience: '4+ years' },
      { name: 'JSON', icon: 'mdi-code-json', level: 85, experience: '5+ years' },
    ],
  },
])
</script>

<style scoped>
.skills-section {
  max-width: 1200px;
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

/* ===== SKILLS CONTAINER ===== */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* ===== SKILL CATEGORIES ===== */
.skill-category {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--glass-shadow-medium);
  border: 1px solid var(--glass-border);
  transition: all var(--duration-normal) var(--ease-out);
}

.skill-category:hover {
  background: var(--glass-hover-bg);
  box-shadow: var(--glass-shadow-heavy);
  transform: translateY(-2px);
  border-color: var(--glass-focus-border);
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.category-icon {
  width: 32px;
  height: 32px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--glass-shadow-light);
  transition: all var(--duration-fast) var(--ease-out);
}

.category-icon:hover {
  background: var(--glass-hover-bg);
  transform: scale(1.1);
}

.category-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.category-count {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

/* ===== SKILLS CHIPS ===== */
.skills-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-3);
  box-shadow: var(--glass-shadow-light);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.skill-chip:hover {
  background: var(--glass-hover-bg);
  border-color: var(--glass-focus-border);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-medium);
}

.skill-chip-icon {
  width: 20px;
  height: 20px;
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--glass-border);
}

.skill-chip-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
}

.skill-chip-level {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-inverse);
  background: var(--color-primary-500);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  min-width: 32px;
  text-align: center;
  margin-left: var(--space-1);
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
  .skills-section {
    padding: var(--space-6) var(--space-2);
  }

  .skills-container {
    gap: var(--space-4);
  }

  .skill-category {
    padding: var(--space-4);
  }

  .category-header {
    gap: var(--space-2);
    margin-bottom: var(--space-3);
  }

  .category-icon {
    width: 28px;
    height: 28px;
  }

  .category-title {
    font-size: var(--text-base);
  }

  .section-title {
    font-size: var(--text-2xl);
  }

  .section-subtitle {
    font-size: var(--text-base);
  }

  .skills-chips {
    gap: var(--space-1);
  }

  .skill-chip {
    padding: var(--space-1) var(--space-2);
    gap: var(--space-1);
  }

  .skill-chip-icon {
    width: 18px;
    height: 18px;
  }

  .skill-chip-name {
    font-size: var(--text-xs);
  }

  .skill-chip-level {
    font-size: 10px;
    padding: 2px var(--space-1);
    min-width: 28px;
  }
}

@media (max-width: 480px) {
  .skill-category {
    padding: var(--space-3);
  }

  .category-header {
    gap: var(--space-1);
  }

  .category-icon {
    width: 24px;
    height: 24px;
  }

  .category-title {
    font-size: var(--text-sm);
  }

  .skill-chip {
    padding: var(--space-1);
    gap: var(--space-1);
  }

  .skill-chip-icon {
    width: 16px;
    height: 16px;
  }

  .skill-chip-name {
    font-size: 11px;
  }

  .skill-chip-level {
    font-size: 9px;
    padding: 1px 4px;
    min-width: 24px;
  }
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .skill-category:hover {
    transform: none;
  }

  .skill-chip:hover {
    transform: none;
  }

  .section-icon:hover,
  .category-icon:hover {
    transform: none;
  }
}

/* ===== CREATIVE GRADIENT THEME V2.0 GLASS MORPHISM ===== */

:root[data-theme='creative-gradient'] .skills-section {
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
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-2px) scale(1.05) !important;
}

:root[data-theme='creative-gradient'] .skill-category {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .skill-category:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) !important;
}

:root[data-theme='creative-gradient'] .category-title {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .category-icon {
  background: var(--cg-glass-bg-strong) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-light) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .category-icon:hover {
  background: var(--cg-glass-bg-interactive) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: scale(1.1) translateY(-1px) !important;
}

:root[data-theme='creative-gradient'] .category-count {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

/* Enhanced Skill Chip Glass Effects */
:root[data-theme='creative-gradient'] .skill-chip {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-light) !important;
  transition: all var(--cg-transition-fast) !important;
  position: relative !important;
  overflow: hidden !important;
}

:root[data-theme='creative-gradient'] .skill-chip::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: -100% !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent) !important;
  transition: left var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .skill-chip:hover::before {
  left: 100% !important;
}

:root[data-theme='creative-gradient'] .skill-chip:hover {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  transform: translateY(-2px) scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .skill-chip:active {
  transform: translateY(-1px) scale(1.01) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .skill-chip-name {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  position: relative !important;
  z-index: 1 !important;
}

:root[data-theme='creative-gradient'] .skill-chip-icon {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
  position: relative !important;
  z-index: 1 !important;
}

:root[data-theme='creative-gradient'] .skill-chip-level {
  background: var(--cg-gradient-accent) !important;
  color: white !important;
  border: 1px solid var(--cg-glass-border) !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
  box-shadow: var(--cg-shadow-light) !important;
  position: relative !important;
  z-index: 1 !important;
}

/* Interactive Focus States for Accessibility */
:root[data-theme='creative-gradient'] .skill-chip:focus {
  outline: none !important;
  box-shadow:
    var(--cg-shadow-medium),
    0 0 0 3px rgba(255, 255, 255, 0.15) !important;
}

/* Touch-friendly enhancements for mobile */
@media (pointer: coarse) {
  :root[data-theme='creative-gradient'] .skill-chip {
    min-height: 44px !important;
    padding: var(--cg-space-sm) var(--cg-space-md) !important;
  }

  :root[data-theme='creative-gradient'] .skill-chip:hover {
    transform: translateY(-1px) scale(1.01) !important;
  }
}

/* Professional Dark Theme - Dark Mode */
:root[data-theme='professional-dark'][data-mode='dark'] .skill-category {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .skill-category:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

:root[data-theme='professional-dark'][data-mode='dark'] .skill-chip {
  background: rgba(20, 184, 166, 0.08);
  border: 1px solid rgba(20, 184, 166, 0.15);
  color: var(--color-secondary-400);
}

:root[data-theme='professional-dark'][data-mode='dark'] .skill-chip:hover {
  background: rgba(20, 184, 166, 0.12);
  border-color: rgba(20, 184, 166, 0.25);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .skill-category {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .skill-category:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

:root[data-theme='minimal-elegant'] .skill-chip {
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.12);
}

:root[data-theme='minimal-elegant'] .skill-chip:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .skill-category {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .skill-category:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}

:root[data-theme='warm-professional'] .skill-chip {
  background: rgba(249, 115, 22, 0.06);
  border: 1px solid rgba(249, 115, 22, 0.12);
}

:root[data-theme='warm-professional'] .skill-chip:hover {
  background: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.2);
}
</style>
