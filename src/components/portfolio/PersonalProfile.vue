<template>
  <section class="personal-profile-section">
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
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="section-title">Personal Profile</h2>
        <p class="section-subtitle">Get to know me beyond the professional realm</p>
      </div>

      <div class="profile-content">
        <!-- Main Profile Card -->
        <div class="main-profile-card glass-card">
          <div class="profile-avatar">
            <img
              :src="profileImageUrl"
              alt="Sri Sri Tummu Profile Photo"
              class="avatar-image"
              @error="handleImageError"
              @load="handleImageLoad"
            />
            <div v-if="imageLoading" class="image-loading">
              <div class="loading-spinner"></div>
            </div>
            <div v-if="imageError" class="image-fallback">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div class="avatar-status">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div class="profile-info">
            <h3 class="profile-name">{{ personalInfo.name }}</h3>
            <p class="profile-title">{{ personalInfo.title }}</p>
            <p class="profile-location">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z"
                  fill="currentColor"
                />
              </svg>
              {{ personalInfo.location }}
            </p>

            <div class="profile-bio">
              <p>{{ personalInfo.bio }}</p>
            </div>

            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">{{ personalInfo.stats.experience }}</span>
                <span class="stat-label">Years Experience</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ personalInfo.stats.projects }}</span>
                <span class="stat-label">Projects Completed</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ personalInfo.stats.certifications }}</span>
                <span class="stat-label">Certifications</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Details Grid -->
        <div class="details-grid">
          <div
            v-for="(detail, index) in personalDetails"
            :key="detail.id"
            class="detail-card glass-card"
            :class="{ 'animate-slide-up': enableAnimations }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="detail-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path :d="detail.iconPath" fill="currentColor" />
              </svg>
            </div>
            <div class="detail-content">
              <h4 class="detail-title">{{ detail.title }}</h4>
              <p class="detail-value">{{ detail.value }}</p>
              <p v-if="detail.description" class="detail-description">{{ detail.description }}</p>
            </div>
          </div>
        </div>

        <!-- Core Values Section -->
        <div class="values-section">
          <div class="values-card glass-card">
            <div class="values-header">
              <div class="values-icon">
                <svg
                  width="24"
                  height="24"
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
              <h3 class="values-title">Core Values</h3>
            </div>

            <div class="values-grid">
              <div
                v-for="(value, index) in coreValues"
                :key="value.title"
                class="value-item"
                :class="{ 'animate-slide-up': enableAnimations }"
                :style="{ animationDelay: `${index * 0.1 + 0.3}s` }"
              >
                <div class="value-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path :d="value.iconPath" fill="currentColor" />
                  </svg>
                </div>
                <div class="value-content">
                  <h4 class="value-title">{{ value.title }}</h4>
                  <p class="value-description">{{ value.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fun Facts Section -->
        <div class="fun-facts-section">
          <div class="fun-facts-card glass-card">
            <div class="fun-facts-header">
              <div class="fun-facts-icon">
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
              <h3 class="fun-facts-title">Fun Facts About Me</h3>
            </div>

            <div class="fun-facts-list">
              <div
                v-for="(fact, index) in funFacts"
                :key="index"
                class="fun-fact-item"
                :class="{ 'animate-slide-up': enableAnimations }"
                :style="{ animationDelay: `${index * 0.1 + 0.5}s` }"
              >
                <div class="fact-emoji">{{ fact.emoji }}</div>
                <p class="fact-text">{{ fact.text }}</p>
              </div>
            </div>
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

// Image handling
const imageLoading = ref(false)
const imageError = ref(false)
const profileImageUrl = ref(import.meta.env.BASE_URL + 'Sri.jpg')

const personalInfo = ref({
  name: 'Sri Sri T',
  title: 'Senior QA Engineer & Test Automation Specialist',
  location: 'Vzm, India',
  bio: 'Passionate quality assurance professional with a love for technology, continuous learning, and creating meaningful connections. I believe in the power of quality software to transform businesses and improve lives.',
  stats: {
    experience: '8+',
    projects: '50+',
    certifications: '5',
  },
})

const personalDetails = ref([
  {
    id: 1,
    title: 'Languages',
    value: 'English, Hindi, Telugu',
    description: 'Fluent in multiple languages enabling effective communication',
    iconPath:
      'M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H10V2H8V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L12.11 17.11L12.87 15.07Z',
  },
  {
    id: 2,
    title: 'Personality Type',
    value: 'INTJ - The Architect',
    description: 'Strategic thinker with a natural drive for implementing ideas',
    iconPath:
      'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L4.84 5.17L7.5 2.5L6 1L0 7V9H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9H21Z',
  },
  {
    id: 3,
    title: 'Work Style',
    value: 'Collaborative & Detail-Oriented',
    description: 'Thrives in team environments while maintaining high attention to detail',
    iconPath:
      'M16 4C16.5523 4 17 4.44772 17 5V9H20C20.5523 9 21 9.44772 21 10V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V10C3 9.44772 3.44772 9 4 9H7V5C7 4.44772 7.44772 4 8 4H16Z',
  },
  {
    id: 4,
    title: 'Time Zone',
    value: 'IST (UTC+5:30)',
    description: 'Available for collaboration across global time zones',
    iconPath:
      'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22S22 17.5 22 12S17.5 2 12 2ZM17 13H11V7H12.5V11.5H17V13Z',
  },
  {
    id: 5,
    title: 'Availability',
    value: 'Open to Opportunities',
    description: 'Actively seeking new challenges and growth opportunities',
    iconPath:
      'M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z',
  },
  {
    id: 6,
    title: 'Preferred Contact',
    value: 'Email & LinkedIn',
    description: 'Best reached through professional channels for opportunities',
    iconPath:
      'M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z',
  },
])

const coreValues = ref([
  {
    title: 'Quality Excellence',
    description: 'Committed to delivering the highest standards in everything I do',
    iconPath: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z',
  },
  {
    title: 'Continuous Learning',
    description: 'Always seeking to expand knowledge and improve skills',
    iconPath:
      'M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z',
  },
  {
    title: 'Team Collaboration',
    description: 'Believing that great results come from working together',
    iconPath:
      'M16 4C16.5523 4 17 4.44772 17 5V9H20C20.5523 9 21 9.44772 21 10V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V10C3 9.44772 3.44772 9 4 9H7V5C7 4.44772 7.44772 4 8 4H16Z',
  },
  {
    title: 'Innovation',
    description: 'Embracing new technologies and creative problem-solving approaches',
    iconPath:
      'M9.4 16.6L4.8 12L9.4 7.4L10.8 8.8L7.6 12L10.8 15.2L9.4 16.6ZM14.6 16.6L13.2 15.2L16.4 12L13.2 8.8L14.6 7.4L19.2 12L14.6 16.6Z',
  },
  {
    title: 'Integrity',
    description: 'Maintaining honesty and strong moral principles in all interactions',
    iconPath:
      'M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z',
  },
  {
    title: 'Work-Life Balance',
    description: 'Maintaining harmony between professional growth and personal well-being',
    iconPath:
      'M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z',
  },
])

const funFacts = ref([
  {
    emoji: '☕',
    text: 'I start every day with a perfect cup of coffee and a quick review of tech news',
  },
  {
    emoji: '🎯',
    text: "I've found over 1000 bugs in my career and celebrated each one as a victory",
  },
  {
    emoji: '📚',
    text: 'I read at least 2 technical books every month to stay current with industry trends',
  },
  {
    emoji: '🌱',
    text: 'I maintain a small herb garden and find parallels between nurturing plants and code',
  },
  {
    emoji: '🎮',
    text: 'I enjoy playing strategy games which help me think through complex testing scenarios',
  },
  {
    emoji: '🏃‍♂️',
    text: 'I run 5K every weekend and often get my best debugging ideas during these runs',
  },
  {
    emoji: '🎨',
    text: 'I believe that good code is like art - it should be both functional and beautiful',
  },
  {
    emoji: '🌍',
    text: "I've worked with teams across 4 different time zones and love the global perspective",
  },
])

function handleImageError(event) {
  console.warn('Profile image failed to load:', event.target.src)
  imageLoading.value = false
  imageError.value = true

  // Try fallback image
  if (event.target.src.includes('Sri.jpg')) {
    event.target.src = import.meta.env.BASE_URL + 'profile-photo.svg'
  }
}

function handleImageLoad() {
  imageLoading.value = false
  imageError.value = false
}
</script>

<style scoped>
.personal-profile-section {
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

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* Main Profile Card */
.main-profile-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
  display: flex;
  gap: var(--space-6);
  align-items: center;
  position: relative;
  overflow: hidden;
}

.main-profile-card::before {
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

.main-profile-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-4px);
  box-shadow: var(--glass-shadow-heavy);
}

.profile-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-xl);
  object-fit: cover;
  border: 3px solid var(--glass-border);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
}

.avatar-image::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(45deg, var(--color-primary-500), var(--color-secondary-500));
  border-radius: var(--radius-xl);
  z-index: -1;
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.image-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border-radius: var(--radius-xl);
  border: 3px solid var(--glass-border);
}

.image-fallback {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border-radius: var(--radius-xl);
  border: 3px solid var(--glass-border);
  color: var(--text-secondary);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--glass-border);
  border-top: 2px solid var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.main-profile-card:hover .avatar-image {
  transform: scale(1.05);
  box-shadow: var(--glass-shadow-heavy);
}

.main-profile-card:hover .avatar-image::before {
  opacity: 1;
}

.avatar-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 2px solid var(--bg-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-success-500);
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
  line-height: 1.2;
}

.profile-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-primary-600);
  margin: 0 0 var(--space-2) 0;
}

.profile-location {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-base);
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.profile-bio {
  margin-bottom: var(--space-6);
}

.profile-bio p {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.profile-stats {
  display: flex;
  gap: var(--space-6);
}

.stat-item {
  text-align: center;
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  min-width: 80px;
  transition: all var(--duration-fast) var(--ease-out);
}

.stat-item:hover {
  background: var(--glass-medium-bg);
  transform: translateY(-2px);
}

.stat-value {
  display: block;
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-primary-500);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.2;
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--cg-space-md, var(--space-4));
}

.detail-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--glass-shadow-light);
  transition: all var(--duration-normal) var(--ease-out);
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
}

.detail-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-medium);
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-primary-500);
  flex-shrink: 0;
  transition: all var(--duration-fast) var(--ease-out);
}

.detail-card:hover .detail-icon {
  background: var(--glass-medium-bg);
  transform: scale(1.1);
}

.detail-content {
  flex: 1;
  min-width: 0;
}

.detail-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

.detail-value {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-primary-600);
  margin: 0 0 var(--space-1) 0;
}

.detail-description {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin: 0;
  line-height: 1.4;
}

/* Values Section */
.values-section {
  margin-top: var(--space-4);
}

.values-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
}

.values-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-heavy);
}

.values-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.values-icon {
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
}

.values-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
}

.value-item {
  display: flex;
  gap: var(--space-3);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: all var(--duration-fast) var(--ease-out);
}

.value-item:hover {
  background: var(--glass-medium-bg);
  transform: translateY(-2px);
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-primary-500);
  flex-shrink: 0;
}

.value-content {
  flex: 1;
}

.value-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

.value-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* Fun Facts Section */
.fun-facts-section {
  margin-top: var(--space-4);
}

.fun-facts-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--glass-shadow-medium);
  transition: all var(--duration-normal) var(--ease-out);
}

.fun-facts-card:hover {
  background: var(--glass-hover-bg);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-heavy);
}

.fun-facts-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.fun-facts-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--glass-accent-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-warning-500);
}

.fun-facts-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.fun-facts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-3);
}

.fun-fact-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--glass-subtle-bg);
  backdrop-filter: blur(var(--glass-blur-light));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  transition: all var(--duration-fast) var(--ease-out);
}

.fun-fact-item:hover {
  background: var(--glass-medium-bg);
  transform: translateX(4px);
}

.fact-emoji {
  font-size: var(--text-xl);
  flex-shrink: 0;
}

.fact-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
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
  .personal-profile-section {
    padding: var(--space-12) 0;
    background: var(--bg-primary);
  }

  .section-container {
    padding: 0 var(--space-4);
  }

  .main-profile-card {
    flex-direction: column;
    text-align: center;
    padding: var(--space-6);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur-medium));
  }

  .profile-stats {
    justify-content: center;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .stat-item {
    min-width: 70px;
    background: var(--glass-subtle-bg);
    backdrop-filter: blur(var(--glass-blur-light));
  }

  .details-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .detail-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur-medium));
  }

  .values-grid,
  .fun-facts-list {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .values-card,
  .fun-facts-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur-medium));
  }

  .section-title {
    font-size: var(--text-3xl);
  }

  .section-subtitle {
    font-size: var(--text-lg);
  }

  .profile-name {
    font-size: var(--text-2xl);
  }

  .avatar-image {
    width: 100px;
    height: 100px;
  }

  .image-loading,
  .image-fallback {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .section-container {
    padding: 0 var(--space-4);
  }

  .main-profile-card {
    padding: var(--space-4);
  }

  .values-card,
  .fun-facts-card {
    padding: var(--space-4);
  }

  .section-icon {
    width: 64px;
    height: 64px;
  }

  .avatar-image {
    width: 100px;
    height: 100px;
  }

  .profile-stats {
    gap: var(--space-2);
  }

  .stat-item {
    min-width: 70px;
    padding: var(--space-2);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
  }

  .main-profile-card,
  .detail-card,
  .value-item,
  .fun-fact-item {
    transition: none;
  }

  .avatar-image {
    transition: none;
  }
}

/* Theme-Specific Glass Morphism Enhancements */

/* Creative Gradient Theme v2.0 - Using Global System */
:root[data-theme='creative-gradient'] .personal-profile-section {
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

:root[data-theme='creative-gradient'] .main-profile-card,
:root[data-theme='creative-gradient'] .values-card,
:root[data-theme='creative-gradient'] .fun-facts-card {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-xl) !important;
  transition: all var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .main-profile-card:hover,
:root[data-theme='creative-gradient'] .values-card:hover,
:root[data-theme='creative-gradient'] .fun-facts-card:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-4px) !important;
}

:root[data-theme='creative-gradient'] .profile-name,
:root[data-theme='creative-gradient'] .values-title,
:root[data-theme='creative-gradient'] .fun-facts-title {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow) !important;
}

:root[data-theme='creative-gradient'] .profile-title,
:root[data-theme='creative-gradient'] .profile-bio p,
:root[data-theme='creative-gradient'] .value-description,
:root[data-theme='creative-gradient'] .fact-text {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

/* Enhanced Stat Item Glass Effects */
:root[data-theme='creative-gradient'] .stat-item {
  background: var(--cg-glass-bg-medium) !important;
  backdrop-filter: var(--cg-glass-blur) !important;
  -webkit-backdrop-filter: var(--cg-glass-blur) !important;
  border: 1px solid var(--cg-glass-border) !important;
  box-shadow: var(--cg-shadow-medium) !important;
  border-radius: var(--cg-radius-lg) !important;
  transition: all var(--cg-transition-normal) !important;
  position: relative !important;
  overflow: hidden !important;
}

:root[data-theme='creative-gradient'] .stat-item::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 3px !important;
  background: var(--cg-gradient-accent) !important;
  opacity: 0 !important;
  transition: opacity var(--cg-transition-normal) !important;
}

:root[data-theme='creative-gradient'] .stat-item:hover::before {
  opacity: 1 !important;
}

:root[data-theme='creative-gradient'] .stat-item:hover {
  background: var(--cg-glass-bg-strong) !important;
  border-color: var(--cg-glass-border-hover) !important;
  box-shadow: var(--cg-shadow-interactive) !important;
  transform: translateY(-2px) scale(1.02) !important;
}

:root[data-theme='creative-gradient'] .stat-value {
  color: var(--cg-text-primary) !important;
  text-shadow: var(--cg-text-shadow) !important;
}

:root[data-theme='creative-gradient'] .stat-label {
  color: var(--cg-text-secondary) !important;
  text-shadow: var(--cg-text-shadow-light) !important;
}

/* Professional Dark Theme */
:root[data-theme='professional-dark'][data-mode='dark'] .main-profile-card,
:root[data-theme='professional-dark'][data-mode='dark'] .values-card,
:root[data-theme='professional-dark'][data-mode='dark'] .fun-facts-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

:root[data-theme='professional-dark'][data-mode='dark'] .main-profile-card:hover,
:root[data-theme='professional-dark'][data-mode='dark'] .values-card:hover,
:root[data-theme='professional-dark'][data-mode='dark'] .fun-facts-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(20, 184, 166, 0.25);
}

/* Minimal Elegant Theme */
:root[data-theme='minimal-elegant'] .main-profile-card,
:root[data-theme='minimal-elegant'] .values-card,
:root[data-theme='minimal-elegant'] .fun-facts-card {
  background: rgba(100, 116, 139, 0.06);
  border: 1px solid rgba(100, 116, 139, 0.12);
}

:root[data-theme='minimal-elegant'] .main-profile-card:hover,
:root[data-theme='minimal-elegant'] .values-card:hover,
:root[data-theme='minimal-elegant'] .fun-facts-card:hover {
  background: rgba(100, 116, 139, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Warm Professional Theme */
:root[data-theme='warm-professional'] .main-profile-card,
:root[data-theme='warm-professional'] .values-card,
:root[data-theme='warm-professional'] .fun-facts-card {
  background: rgba(120, 113, 108, 0.06);
  border: 1px solid rgba(120, 113, 108, 0.12);
}

:root[data-theme='warm-professional'] .main-profile-card:hover,
:root[data-theme='warm-professional'] .values-card:hover,
:root[data-theme='warm-professional'] .fun-facts-card:hover {
  background: rgba(120, 113, 108, 0.08);
  border-color: rgba(249, 115, 22, 0.2);
}
</style>
