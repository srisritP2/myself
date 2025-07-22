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
            <v-icon :color="category.color" size="24">{{ category.icon }}</v-icon>
          </div>
          <h3 class="category-title">{{ category.name }}</h3>
          <span class="category-count">{{ category.skills.length }} skills</span>
        </div>

        <div class="skills-grid">
          <div
            v-for="(skill, skillIndex) in category.skills"
            :key="skill.name"
            class="skill-item"
            :class="{ 'animate-in': shouldAnimate }"
            :style="{ animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s` }"
          >
            <div class="skill-icon">
              <v-icon :color="skill.color || category.color" size="20">{{ skill.icon }}</v-icon>
            </div>
            <div class="skill-info">
              <span class="skill-name">{{ skill.name }}</span>
              <div v-if="skill.level" class="skill-level">
                <div class="skill-bar">
                  <div
                    class="skill-progress"
                    :style="{
                      width: skill.level + '%',
                      backgroundColor: `var(--color-${category.color}-500)`,
                    }"
                  ></div>
                </div>
                <span class="skill-percentage">{{ skill.level }}%</span>
              </div>
              <span v-if="skill.experience" class="skill-experience">
                {{ skill.experience }}
              </span>
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
  background: var(--bg-accent);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
  box-shadow: var(--shadow-md);
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

/* ===== SKILL CATEGORIES ===== */
.skill-category {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-primary);
  transition: all var(--duration-normal) var(--ease-out);
}

.skill-category:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  border-color: var(--color-primary-300);
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.category-icon {
  width: 40px;
  height: 40px;
  background: var(--bg-accent);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.category-count {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  background: var(--bg-secondary);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
}

/* ===== SKILLS GRID ===== */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skill-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.skill-item:hover {
  background: var(--bg-secondary);
  transform: translateX(4px);
}

.skill-icon {
  width: 32px;
  height: 32px;
  background: var(--bg-accent);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.skill-info {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
  display: block;
  margin-bottom: var(--space-1);
}

.skill-level {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-1);
}

.skill-bar {
  flex: 1;
  height: 4px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: var(--color-primary-500);
  border-radius: var(--radius-full);
  transition: width 1s var(--ease-out);
  position: relative;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 2s infinite;
}

.skill-percentage {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 35px;
  text-align: right;
}

.skill-experience {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  font-style: italic;
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .skills-section {
    padding: var(--space-6) var(--space-2);
  }

  .skills-container {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .skill-category {
    padding: var(--space-4);
  }

  .category-header {
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .category-icon {
    width: 32px;
    height: 32px;
  }

  .category-title {
    font-size: var(--text-lg);
  }

  .section-title {
    font-size: var(--text-2xl);
  }

  .section-subtitle {
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .skill-item {
    padding: var(--space-2);
    gap: var(--space-2);
  }

  .skill-icon {
    width: 28px;
    height: 28px;
  }

  .skill-name {
    font-size: var(--text-sm);
  }

  .skill-level {
    gap: var(--space-1);
  }

  .skill-percentage {
    min-width: 30px;
    font-size: 10px;
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

  .skill-item:hover {
    transform: none;
  }

  .skill-progress::after {
    animation: none;
  }
}

/* ===== THEME SPECIFIC STYLES ===== */
:root[data-theme='creative-gradient'] .skill-progress {
  background: var(--gradient-primary);
}

:root[data-theme='creative-gradient'] .category-icon {
  background: var(--gradient-secondary);
}
</style>
