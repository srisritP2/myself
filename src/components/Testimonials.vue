<template>
  <div class="testimonials-section">
    <div class="section-header">
      <div class="section-icon">
        <v-icon color="primary" size="32">mdi-comment-quote</v-icon>
      </div>
      <h2 class="section-title">What People Say</h2>
      <p class="section-subtitle">Testimonials from colleagues and clients</p>
    </div>

    <div class="testimonials-carousel">
      <div class="carousel-container">
        <!-- Main Testimonial Display -->
        <div class="testimonial-main" :key="testimonialIndex">
          <div class="quote-icon">
            <v-icon color="primary" size="48">mdi-format-quote-open</v-icon>
          </div>

          <div class="testimonial-content">
            <p class="testimonial-text">{{ currentTestimonial.text }}</p>

            <div class="testimonial-author">
              <div class="author-avatar">
                <img
                  :src="currentTestimonial.avatar"
                  :alt="currentTestimonial.name"
                  @error="handleAvatarError"
                />
              </div>
              <div class="author-info">
                <h4 class="author-name">{{ currentTestimonial.name }}</h4>
                <p class="author-title">{{ currentTestimonial.title }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Controls -->
        <div class="carousel-controls">
          <button
            class="control-btn control-btn--prev"
            @click="prevTestimonial"
            :disabled="testimonials.length <= 1"
            aria-label="Previous testimonial"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </button>

          <div class="carousel-indicators">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              class="indicator"
              :class="{ active: index === testimonialIndex }"
              @click="goToTestimonial(index)"
              :aria-label="`Go to testimonial ${index + 1}`"
            ></button>
          </div>

          <button
            class="control-btn control-btn--next"
            @click="nextTestimonial"
            :disabled="testimonials.length <= 1"
            aria-label="Next testimonial"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </button>
        </div>
      </div>

      <!-- Testimonial Thumbnails -->
      <div class="testimonial-thumbnails">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="thumbnail"
          :class="{ active: index === testimonialIndex }"
          @click="goToTestimonial(index)"
        >
          <div class="thumbnail-avatar">
            <img :src="testimonial.avatar" :alt="testimonial.name" @error="handleAvatarError" />
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
import { computed } from 'vue'

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

const currentTestimonial = computed(() => {
  return props.testimonials[props.testimonialIndex] || props.testimonials[0]
})

function goToTestimonial(index) {
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

function handleAvatarError(event) {
  event.target.src = 'https://via.placeholder.com/64/cccccc/666666?text=?'
}
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

/* ===== TESTIMONIALS CAROUSEL ===== */
.testimonials-carousel {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-primary);
}

.carousel-container {
  position: relative;
}

/* ===== MAIN TESTIMONIAL ===== */
.testimonial-main {
  text-align: center;
  margin-bottom: var(--space-8);
  animation: fadeIn 0.5s var(--ease-out);
}

.quote-icon {
  margin-bottom: var(--space-4);
  opacity: 0.3;
}

.testimonial-content {
  max-width: 600px;
  margin: 0 auto;
}

.testimonial-text {
  font-size: var(--text-xl);
  line-height: 1.6;
  color: var(--text-primary);
  font-style: italic;
  margin: 0 0 var(--space-6) 0;
  position: relative;
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
  border: 3px solid var(--color-primary-500);
  box-shadow: var(--shadow-md);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin: 0;
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
  border: 1px solid var(--border-primary);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.control-btn:hover:not(:disabled) {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  border-color: var(--color-primary-500);
  transform: scale(1.05);
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
}

.thumbnail:hover {
  background: var(--bg-secondary);
  border-color: var(--border-primary);
}

.thumbnail.active {
  background: var(--bg-accent);
  border-color: var(--color-primary-300);
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

/* ===== ANIMATIONS ===== */
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

/* ===== THEME SPECIFIC STYLES ===== */
:root[data-theme='creative-gradient'] .testimonials-carousel {
  background: var(--bg-gradient, var(--bg-primary));
  color: var(--text-inverse);
}

:root[data-theme='creative-gradient'] .testimonial-text {
  color: var(--text-inverse);
}

:root[data-theme='creative-gradient'] .author-name {
  color: var(--text-inverse);
}
</style>
