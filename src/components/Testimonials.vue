<template>
  <div class="testimonials-section">
    <div class="section-header">
      <div class="section-icon" :class="{ 'animate-pulse': enableAnimations }">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14,17H7L2,22V4A2,2 0 0,1 4,2H20A2,2 0 0,1 22,4V15A2,2 0 0,1 20,17H16L14,19V17Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h2 class="section-title">What People Say</h2>
      <p class="section-subtitle">Testimonials from colleagues and clients</p>
    </div>

    <div
      class="testimonials-carousel"
      :class="{ 'animate-in': enableAnimations }"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="carousel-container">
        <!-- Main Testimonial Display -->
        <div
          class="testimonial-main"
          :key="testimonialIndex"
          :class="{ 'slide-in': enableAnimations }"
        >
          <div class="quote-decoration">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14,17H7L2,22V4A2,2 0 0,1 4,2H20A2,2 0 0,1 22,4V15A2,2 0 0,1 20,17H16L14,19V17Z"
                fill="currentColor"
                opacity="0.1"
              />
            </svg>
          </div>

          <div class="testimonial-content">
            <blockquote class="testimonial-text">
              {{ currentTestimonial.text }}
            </blockquote>

            <div class="testimonial-author">
              <div class="author-avatar">
                <img
                  :src="currentTestimonial.avatar"
                  :alt="currentTestimonial.name"
                  @error="handleAvatarError"
                  loading="lazy"
                />
                <div class="avatar-ring"></div>
              </div>
              <div class="author-info">
                <h4 class="author-name">{{ currentTestimonial.name }}</h4>
                <p class="author-title">{{ currentTestimonial.title }}</p>
                <div class="author-rating">
                  <div class="stars">
                    <svg
                      v-for="n in 5"
                      :key="n"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Navigation Controls -->
        <div class="carousel-controls">
          <button
            class="control-btn control-btn--prev"
            @click="prevTestimonial"
            :disabled="testimonials.length <= 1"
            aria-label="Previous testimonial"
            :class="{ pulse: isAutoPlaying && !isPaused }"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <div class="carousel-indicators">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              class="indicator"
              :class="{
                active: index === testimonialIndex,
                'animate-scale': enableAnimations && index === testimonialIndex,
              }"
              @click="goToTestimonial(index)"
              :aria-label="`Go to testimonial ${index + 1}`"
            >
              <div
                class="indicator-progress"
                v-if="index === testimonialIndex && isAutoPlaying && !isPaused"
              ></div>
            </button>
          </div>

          <button
            class="control-btn control-btn--next"
            @click="nextTestimonial"
            :disabled="testimonials.length <= 1"
            aria-label="Next testimonial"
            :class="{ pulse: isAutoPlaying && !isPaused }"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <!-- Auto-play Controls -->
        <div class="autoplay-controls">
          <button
            class="autoplay-btn"
            @click="toggleAutoPlay"
            :aria-label="isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'"
          >
            <svg
              v-if="!isAutoPlaying"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8,5.14V19.14L19,12.14L8,5.14Z" fill="currentColor" />
            </svg>
            <svg
              v-else
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14,19H18V5H14M6,19H10V5H6V19Z" fill="currentColor" />
            </svg>
            <span class="autoplay-text">{{ isAutoPlaying ? 'Pause' : 'Play' }}</span>
          </button>
        </div>
      </div>

      <!-- Enhanced Testimonial Thumbnails -->
      <div class="testimonial-thumbnails">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="thumbnail"
          :class="{
            active: index === testimonialIndex,
            'animate-in': enableAnimations,
          }"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="goToTestimonial(index)"
          @mouseenter="pauseAutoPlay"
          @mouseleave="resumeAutoPlay"
        >
          <div class="thumbnail-avatar">
            <img
              :src="testimonial.avatar"
              :alt="testimonial.name"
              @error="handleAvatarError"
              loading="lazy"
            />
            <div class="thumbnail-overlay">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8,5.14V19.14L19,12.14L8,5.14Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div class="thumbnail-info">
            <span class="thumbnail-name">{{ testimonial.name }}</span>
            <span class="thumbnail-role">{{ testimonial.title.split(',')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
  },
  testimonialIndex: {
    type: Number,
    required: true,
  },
  nextTestimonial: {
    type: Function,
    required: true,
  },
  prevTestimonial: {
    type: Function,
    required: true,
  },
  enableAnimations: {
    type: Boolean,
    default: true,
  },
})

// Auto-play functionality
const isAutoPlaying = ref(false)
const isPaused = ref(false)
const autoPlayInterval = ref(null)
const autoPlayDelay = 5000 // 5 seconds

const currentTestimonial = computed(() => {
  return props.testimonials[props.testimonialIndex] || props.testimonials[0]
})

function goToTestimonial(index) {
  // Stop auto-play temporarily when user manually navigates
  if (isAutoPlaying.value) {
    pauseAutoPlay()
    setTimeout(() => resumeAutoPlay(), 2000) // Resume after 2 seconds
  }

  // Calculate how many steps to move
  const currentIndex = props.testimonialIndex
  const targetIndex = index
  const steps = targetIndex - currentIndex

  if (steps > 0) {
    for (let i = 0; i < steps; i++) {
      setTimeout(() => props.nextTestimonial(), i * 100)
    }
  } else if (steps < 0) {
    for (let i = 0; i < Math.abs(steps); i++) {
      setTimeout(() => props.prevTestimonial(), i * 100)
    }
  }
}

function toggleAutoPlay() {
  if (isAutoPlaying.value) {
    stopAutoPlay()
  } else {
    startAutoPlay()
  }
}

function startAutoPlay() {
  if (props.testimonials.length <= 1) return

  isAutoPlaying.value = true
  isPaused.value = false

  autoPlayInterval.value = setInterval(() => {
    if (!isPaused.value) {
      props.nextTestimonial()
    }
  }, autoPlayDelay)
}

function stopAutoPlay() {
  isAutoPlaying.value = false
  isPaused.value = false

  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

function pauseAutoPlay() {
  isPaused.value = true
}

function resumeAutoPlay() {
  if (isAutoPlaying.value) {
    isPaused.value = false
  }
}

function handleAvatarError(event) {
  event.target.src = 'https://via.placeholder.com/64/cccccc/666666?text=?'
}

// Touch/Swipe functionality for mobile
const touchStartX = ref(0)
const touchEndX = ref(0)
const minSwipeDistance = 50

function handleTouchStart(event) {
  touchStartX.value = event.changedTouches[0].screenX
}

function handleTouchEnd(event) {
  touchEndX.value = event.changedTouches[0].screenX
  handleSwipe()
}

function handleSwipe() {
  const swipeDistance = touchStartX.value - touchEndX.value

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swipe left - next testimonial
      props.nextTestimonial()
    } else {
      // Swipe right - previous testimonial
      props.prevTestimonial()
    }

    // Pause auto-play briefly after swipe
    if (isAutoPlaying.value) {
      pauseAutoPlay()
      setTimeout(() => resumeAutoPlay(), 3000)
    }
  }
}

// Keyboard navigation
function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      props.prevTestimonial()
      break
    case 'ArrowRight':
      event.preventDefault()
      props.nextTestimonial()
      break
    case ' ':
    case 'Enter':
      event.preventDefault()
      toggleAutoPlay()
      break
    case 'Escape':
      event.preventDefault()
      stopAutoPlay()
      break
  }
}

// Lifecycle hooks
onMounted(() => {
  // Auto-start slideshow if there are multiple testimonials
  if (props.testimonials.length > 1) {
    startAutoPlay()
  }

  // Add keyboard event listener
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  stopAutoPlay()
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.testimonials-section {
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

/* ===== TESTIMONIALS CAROUSEL ===== */
.testimonials-carousel {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--glass-shadow-medium);
  border: 1px solid var(--glass-border);
  transition: all var(--duration-normal) var(--ease-out);
}

.testimonials-carousel:hover {
  background: var(--glass-hover-bg);
  box-shadow: var(--glass-shadow-heavy);
}

.carousel-container {
  position: relative;
}

/* ===== MAIN TESTIMONIAL ===== */
.testimonial-main {
  text-align: center;
  margin-bottom: var(--space-8);
  position: relative;
}

.testimonial-main.slide-in {
  animation: slideInFade 0.6s var(--ease-out);
}

.quote-decoration {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-primary-500);
  opacity: 0.1;
  z-index: 0;
}

.testimonial-content {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.testimonial-text {
  font-size: var(--text-xl);
  line-height: 1.6;
  color: var(--text-primary);
  font-style: italic;
  margin: 0 0 var(--space-6) 0;
  position: relative;
  padding: 0 var(--space-4);
}

.testimonial-text::before,
.testimonial-text::after {
  content: '"';
  font-size: var(--text-2xl);
  color: var(--color-primary-500);
  font-weight: bold;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.author-avatar {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-md);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-fast) var(--ease-out);
}

.author-avatar:hover img {
  transform: scale(1.05);
}

.avatar-ring {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 3px solid var(--color-primary-500);
  border-radius: var(--radius-full);
  background: linear-gradient(45deg, var(--color-primary-500), var(--color-secondary-500));
  padding: 3px;
  z-index: -1;
}

.author-info {
  text-align: left;
}

.author-name {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

.author-title {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--space-2) 0;
}

.author-rating {
  display: flex;
  align-items: center;
}

.stars {
  display: flex;
  gap: 2px;
  color: var(--color-accent-500, #fbbf24);
}

/* ===== CAROUSEL CONTROLS ===== */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.control-btn {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  box-shadow: var(--glass-shadow-light);
}

.control-btn:hover:not(:disabled) {
  background: var(--glass-hover-bg);
  color: var(--color-primary-600);
  border-color: var(--glass-focus-border);
  transform: scale(1.05);
  box-shadow: var(--glass-shadow-medium);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  gap: var(--space-2);
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  border: none;
  background: var(--border-primary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.indicator.active {
  background: var(--color-primary-500);
  transform: scale(1.2);
}

.indicator:hover {
  background: var(--color-primary-400);
}

/* ===== TESTIMONIAL THUMBNAILS ===== */
.testimonial-thumbnails {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.thumbnail {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  border: 1px solid transparent;
  min-width: 0;
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
}

.thumbnail:hover {
  background: var(--glass-hover-bg);
  border-color: var(--glass-border);
  box-shadow: var(--glass-shadow-light);
}

.thumbnail.active {
  background: var(--glass-accent-bg);
  border-color: var(--glass-focus-border);
  box-shadow: var(--glass-shadow-medium);
}

.thumbnail-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 2px solid var(--border-primary);
  flex-shrink: 0;
}

.thumbnail.active .thumbnail-avatar {
  border-color: var(--color-primary-500);
}

.thumbnail-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.thumbnail-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thumbnail-role {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== AUTO-PLAY CONTROLS ===== */
.autoplay-controls {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-4);
}

.autoplay-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  box-shadow: var(--glass-shadow-light);
}

.autoplay-btn:hover {
  background: var(--glass-hover-bg);
  color: var(--color-primary-600);
  border-color: var(--glass-focus-border);
  box-shadow: var(--glass-shadow-medium);
}

.autoplay-text {
  font-family: var(--font-secondary);
  font-weight: 500;
}

/* ===== ENHANCED INDICATORS ===== */
.indicator {
  position: relative;
  overflow: hidden;
}

.indicator-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-primary-300);
  border-radius: var(--radius-full);
  animation: progressFill 5s linear infinite;
}

@keyframes progressFill {
  from {
    transform: scaleX(0);
    transform-origin: left;
  }

  to {
    transform: scaleX(1);
    transform-origin: left;
  }
}

/* ===== ENHANCED THUMBNAILS ===== */
.thumbnail-avatar {
  position: relative;
  overflow: hidden;
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(var(--color-primary-rgb), 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-inverse);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.thumbnail:hover .thumbnail-overlay {
  opacity: 1;
}

/* ===== ENHANCED ANIMATIONS ===== */
.animate-pulse {
  animation: pulse 2s infinite;
}

.animate-in {
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s var(--ease-out) forwards;
}

.animate-scale {
  animation: scaleIn 0.3s var(--ease-out);
}

.pulse {
  animation: pulseGlow 1.5s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFade {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
  }

  to {
    transform: scale(1.2);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(var(--color-primary-rgb), 0.3);
  }

  50% {
    box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.6);
  }
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .testimonials-section {
    padding: var(--space-6) var(--space-2);
  }

  .testimonials-carousel {
    padding: var(--space-6);
  }

  .testimonial-text {
    font-size: var(--text-lg);
  }

  .testimonial-author {
    flex-direction: column;
    gap: var(--space-3);
  }

  .author-info {
    text-align: center;
  }

  .carousel-controls {
    gap: var(--space-4);
  }

  .control-btn {
    width: 40px;
    height: 40px;
  }

  .testimonial-thumbnails {
    gap: var(--space-2);
  }

  .thumbnail {
    padding: var(--space-2);
    gap: var(--space-2);
  }

  .thumbnail-avatar {
    width: 32px;
    height: 32px;
  }

  .section-title {
    font-size: var(--text-2xl);
  }

  .section-subtitle {
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .testimonials-carousel {
    padding: var(--space-4);
  }

  .testimonial-text {
    font-size: var(--text-base);
  }

  .author-avatar {
    width: 56px;
    height: 56px;
  }

  .thumbnail {
    flex-direction: column;
    text-align: center;
    padding: var(--space-2);
  }

  .thumbnail-info {
    align-items: center;
  }
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  .testimonial-main {
    animation: none;
  }

  .control-btn:hover:not(:disabled) {
    transform: none;
  }

  .indicator.active {
    transform: none;
  }
}

/* ===== THEME-SPECIFIC GLASS MORPHISM ENHANCEMENTS ===== */

/* Creative Gradient Theme v2.0 - Using Global System */
:root[data-theme='creative-gradient'] .testimonials-section {
  position: relative;
  padding: var(--cg-space-3xl) 0 !important;
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

:root[data-theme='creative-gradient'] .testimonials-carousel {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-heavy) !important;
  border-radius: var(--cg-radius-2xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .testimonials-carousel:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-2px) !important;
}

:root[data-theme='creative-gradient'] .testimonial-card {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .testimonial-card:hover {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) !important;
}

:root[data-theme='creative-gradient'] .testimonial-text {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  font-style: italic !important;
  font-size: 1.125rem !important;
  line-height: 1.6 !important;
}

:root[data-theme='creative-gradient'] .testimonial-author {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  font-weight: 600 !important;
}

:root[data-theme='creative-gradient'] .testimonial-role {
  color: var(--cg-text-tertiary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
  font-size: 0.875rem !important;
}

:root[data-theme='creative-gradient'] .testimonial-avatar {
  border: 2px solid var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .testimonial-avatar:hover {
  transform: scale(1.05) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
}

:root[data-theme='creative-gradient'] .rating-stars {
  color: var(--cg-accent-primary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .control-btn {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  border-radius: var(--cg-radius-lg) !important;
  transition: all var(--cg-transition-fast) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .control-btn:hover:not(:disabled) {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  color: var(--cg-text-primary) !important;
  transform: translateY(-2px) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

:root[data-theme='creative-gradient'] .control-btn:disabled {
  opacity: 0.5 !important;
  cursor: not-allowed !important;
}

:root[data-theme='creative-gradient'] .thumbnail {
  background: var(--cg-glass-bg-light) !important;
  backdrop-filter: var(--cg-glass-blur-light) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur-light) !important;
  border: 1px solid var(--cg-glass-border) !important;
  border-radius: var(--cg-radius-md) !important;
  transition: all var(--cg-transition-fast) !important;
}

:root[data-theme='creative-gradient'] .thumbnail:hover {
  background: var(--cg-glass-bg-medium) !important;
  border-color: var(--cg-glass-border-hover) !important;
  transform: scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .thumbnail.active {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

:root[data-theme='creative-gradient'] .autoplay-btn {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  color: var(--cg-text-primary) !important;
  border-radius: var(--cg-radius-lg) !important;
  transition: all var(--cg-transition-fast) !important;
  box-shadow: var(--cg-shadow-light) !important;
}

:root[data-theme='creative-gradient'] .autoplay-btn:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  transform: translateY(-2px) !important;
  box-shadow: var(--cg-shadow-medium) !important;
}

/* Professional Dark Theme - Dark Mode */
:root[data-theme='professional-dark'][data-mode='dark'] .testimonials-carousel {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .testimonials-carousel:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

:root[data-theme='professional-dark'][data-mode='dark'] .control-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:root[data-theme='professional-dark'][data-mode='dark'] .control-btn:hover:not(:disabled) {
  background: rgba(20, 184, 166, 0.15);
  border-color: rgba(20, 184, 166, 0.3);
  color: var(--color-secondary-300);
}

:root[data-theme='professional-dark'][data-mode='dark'] .thumbnail {
  background: rgba(20, 184, 166, 0.08);
  border: 1px solid rgba(20, 184, 166, 0.15);
}

:root[data-theme='professional-dark'][data-mode='dark'] .thumbnail:hover {
  background: rgba(20, 184, 166, 0.12);
  border-color: rgba(20, 184, 166, 0.25);
}

:root[data-theme='professional-dark'][data-mode='dark'] .thumbnail.active {
  background: rgba(20, 184, 166, 0.15);
  border-color: rgba(20, 184, 166, 0.3);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .testimonials-carousel {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .testimonials-carousel:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

:root[data-theme='minimal-elegant'] .control-btn {
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.12);
}

:root[data-theme='minimal-elegant'] .control-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
  color: var(--color-secondary-600);
}

:root[data-theme='minimal-elegant'] .thumbnail {
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

:root[data-theme='minimal-elegant'] .thumbnail:hover {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.15);
}

:root[data-theme='minimal-elegant'] .thumbnail.active {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .testimonials-carousel {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .testimonials-carousel:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}

:root[data-theme='warm-professional'] .control-btn {
  background: rgba(249, 115, 22, 0.06);
  border: 1px solid rgba(249, 115, 22, 0.12);
}

:root[data-theme='warm-professional'] .control-btn:hover:not(:disabled) {
  background: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.2);
  color: var(--color-secondary-600);
}

:root[data-theme='warm-professional'] .thumbnail {
  background: rgba(249, 115, 22, 0.05);
  border: 1px solid rgba(249, 115, 22, 0.1);
}

:root[data-theme='warm-professional'] .thumbnail:hover {
  background: rgba(249, 115, 22, 0.08);
  border-color: rgba(249, 115, 22, 0.15);
}

:root[data-theme='warm-professional'] .thumbnail.active {
  background: rgba(249, 115, 22, 0.12);
  border-color: rgba(249, 115, 22, 0.2);
}
</style>
