<template>
  <div class="hero-stats">
    <div class="hero-stats__grid">
      <div v-for="(stat, key) in displayStats" :key="key" class="hero-stats__item">
        <div class="hero-stats__number">{{ animatedStats[key] || 0 }}{{ stat.suffix || '' }}</div>
        <div class="hero-stats__label">{{ stat.label }}</div>
        <div class="hero-stats__progress" v-if="stat.showProgress">
          <div
            class="hero-stats__progress-fill"
            :style="{ width: getProgressWidth(stat.value, stat.max) }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
  animated: {
    type: Boolean,
    default: true,
  },
  animationDuration: {
    type: Number,
    default: 2000,
  },
  animationDelay: {
    type: Number,
    default: 300,
  },
  animationEasing: {
    type: String,
    default: 'easeOutQuart',
    validator: value =>
      ['linear', 'easeOutQuart', 'easeOutCubic', 'easeInOutQuart'].includes(value),
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Number,
    default: null,
  },
  customStats: {
    type: Array,
    default: null,
  },
})

// Animated counters
const animatedStats = ref({})

// Computed display stats with customization support
const displayStats = computed(() => {
  // If custom stats are provided, use them
  if (props.customStats && props.customStats.length > 0) {
    const customStatsObj = {}
    props.customStats.forEach((stat, index) => {
      const key = stat.key || `custom_${index}`
      customStatsObj[key] = {
        label: stat.label || 'Custom Stat',
        value: stat.value || 0,
        suffix: stat.suffix || '',
        max: stat.max || 100,
        showProgress: stat.showProgress !== undefined ? stat.showProgress : props.showProgress,
        color: stat.color || null,
        icon: stat.icon || null,
      }
    })
    return customStatsObj
  }

  // Default stats configuration
  const defaultStats = {
    experience: {
      label: 'Years Experience',
      value: props.stats.experience || 0,
      suffix: '+',
      max: 15,
      showProgress: props.showProgress,
    },
    projects: {
      label: 'Projects Completed',
      value: props.stats.projects || 0,
      suffix: '+',
      max: 100,
      showProgress: props.showProgress,
    },
    clients: {
      label: 'Happy Clients',
      value: props.stats.clients || 0,
      suffix: '+',
      max: 50,
      showProgress: props.showProgress,
    },
    satisfaction: {
      label: 'Satisfaction Rate',
      value: props.stats.satisfaction || 0,
      suffix: '%',
      max: 100,
      showProgress: props.showProgress,
    },
  }

  // Filter out stats that don't have values (unless explicitly set to 0)
  const filteredStats = {}
  Object.entries(defaultStats).forEach(([key, stat]) => {
    if (props.stats[key] !== undefined || stat.value > 0) {
      filteredStats[key] = stat
    }
  })

  return filteredStats
})

// Easing functions
const easingFunctions = {
  linear: t => t,
  easeOutQuart: t => 1 - Math.pow(1 - t, 4),
  easeOutCubic: t => 1 - Math.pow(1 - t, 3),
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
}

// Enhanced animation function with configurable easing
const animateNumber = (key, target, duration = null) => {
  if (!props.animated) {
    animatedStats.value[key] = target
    return
  }

  const animDuration = duration || props.animationDuration
  const easingFn = easingFunctions[props.animationEasing] || easingFunctions.easeOutQuart
  const start = 0
  const startTime = Date.now()

  const update = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / animDuration, 1)
    const easedProgress = easingFn(progress)

    animatedStats.value[key] = Math.floor(start + (target - start) * easedProgress)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// Progress width calculation
const getProgressWidth = (value, max) => {
  const percentage = Math.min((value / max) * 100, 100)
  return `${percentage}%`
}

// Grid columns configuration
const gridColumns = computed(() => {
  if (props.columns) {
    return `repeat(${props.columns}, 1fr)`
  }
  return 'repeat(auto-fit, minmax(180px, 1fr))'
})

// Initialize animations with configurable timing
onMounted(() => {
  Object.entries(displayStats.value).forEach(([key, stat], index) => {
    setTimeout(() => {
      animateNumber(key, stat.value, props.animationDuration + index * 200)
    }, index * props.animationDelay)
  })
})

// Watch for stats changes
watch(
  () => props.stats,
  () => {
    Object.entries(displayStats.value).forEach(([key, stat]) => {
      animateNumber(key, stat.value, 1000)
    })
  },
  { deep: true }
)
</script>

<style scoped>
/* ===== PREMIUM STATS STYLES ===== */
.hero-stats {
  width: 100%;
}

.hero-stats__grid {
  display: grid;
  grid-template-columns: v-bind(gridColumns);
  gap: var(--space-6);
}

.hero-stats__item {
  text-align: center;
  padding: var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-primary);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-lg);
}

.hero-stats__item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-primary-500),
    var(--color-secondary-500),
    var(--color-accent-500)
  );
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.hero-stats__item:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-2xl);
  border-color: var(--color-primary-300);
}

.hero-stats__item:hover::before {
  opacity: 1;
}

.hero-stats__number {
  font-size: var(--text-4xl);
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: var(--space-3);
  transition: all var(--duration-normal) var(--ease-out);
}

.hero-stats__label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-stats__progress {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.hero-stats__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500));
  border-radius: var(--radius-full);
  transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.hero-stats__progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* ===== THEME-SPECIFIC ENHANCEMENTS ===== */

/* Creative Gradient Theme */
:root[data-theme='creative-gradient'] .hero-stats__item {
  background: var(--cg-glass-bg-medium);
  backdrop-filter: var(--cg-glass-blur);
  -webkit-backdrop-filter: var(--cg-glass-blur);
  border: 1px solid var(--cg-glass-border);
  box-shadow: var(--cg-shadow-medium);
}

:root[data-theme='creative-gradient'] .hero-stats__item:hover {
  background: var(--cg-glass-bg-strong);
  border-color: var(--cg-glass-border-hover);
  box-shadow: var(--cg-shadow-interactive);
}

:root[data-theme='creative-gradient'] .hero-stats__number {
  color: var(--cg-text-primary);
  text-shadow: var(--cg-text-shadow);
  background: none;
  -webkit-text-fill-color: var(--cg-text-primary);
}

:root[data-theme='creative-gradient'] .hero-stats__label {
  color: var(--cg-text-secondary);
  text-shadow: var(--cg-text-shadow-light);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .hero-stats__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .hero-stats__item {
    padding: var(--space-4);
  }

  .hero-stats__number {
    font-size: var(--text-3xl);
  }
}

@media (max-width: 480px) {
  .hero-stats__grid {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .hero-stats__number {
    font-size: var(--text-2xl);
  }
}
</style>
