<template>
  <div class="premium-hero-demo">
    <PremiumHeroSection
      :profile="profileData"
      :stats="statsData"
      :actions="actionsData"
      :social="socialData"
      :theme="selectedTheme"
      :layout="selectedLayout"
      :display-config="displayConfig"
      :animations-enabled="animationsEnabled"
    />

    <!-- Demo Controls -->
    <div class="demo-controls">
      <h3>Demo Controls</h3>

      <div class="control-group">
        <label>Theme:</label>
        <select v-model="selectedTheme">
          <option value="minimal">Minimal</option>
          <option value="gradient">Gradient</option>
          <option value="glass">Glass</option>
        </select>
      </div>

      <div class="control-group">
        <label>Layout:</label>
        <select v-model="selectedLayout">
          <option value="split">Split</option>
          <option value="centered">Centered</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="animationsEnabled" />
          Enable Animations
        </label>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="displayConfig.showStats" />
          Show Statistics
        </label>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="displayConfig.showSocial" />
          Show Social Links
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import PremiumHeroSection from './PremiumHeroSection.vue'

// Demo state
const selectedTheme = ref('minimal')
const selectedLayout = ref('split')
const animationsEnabled = ref(true)

const displayConfig = reactive({
  showStats: true,
  showStatus: true,
  showLocation: true,
  showSocial: true,
})

// Sample data
const profileData = reactive({
  name: 'Sri Sai Teja',
  title: 'Senior QA Engineer & Test Automation Specialist',
  description:
    'Passionate about delivering high-quality software through comprehensive testing strategies, automation frameworks, and continuous improvement. Experienced in leading QA teams and implementing robust testing processes.',
  imageUrl: '/profile-photo.svg',
  location: 'Hyderabad, India',
  status: 'available',
  skills: [
    'Test Automation',
    'Quality Assurance',
    'Selenium WebDriver',
    'API Testing',
    'Performance Testing',
    'Team Leadership',
    'CI/CD Integration',
    'Test Strategy',
  ],
})

const statsData = reactive({
  experience: 8,
  projects: 50,
  clients: 25,
  satisfaction: 98,
})

const actionsData = reactive({
  primaryCTA: {
    label: 'Download Resume',
    icon: 'mdi-download',
    action: () => {
      console.log('Downloading resume...')
      // Simulate download
      const link = document.createElement('a')
      link.href = '/resume.pdf'
      link.download = 'Sri_Sai_Teja_Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  },
  secondaryCTA: {
    label: 'Contact Me',
    icon: 'mdi-email',
    action: () => {
      console.log('Opening contact...')
      // Scroll to contact section or open email
      const contactSection = document.querySelector('#contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = 'mailto:contact@example.com'
      }
    },
  },
  resumeUrl: '/resume.pdf',
})

const socialData = reactive([
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/example',
    icon: 'mdi-linkedin',
  },
  {
    platform: 'github',
    url: 'https://github.com/example',
    icon: 'mdi-github',
  },
  {
    platform: 'email',
    url: 'mailto:contact@example.com',
    icon: 'mdi-email',
  },
  {
    platform: 'phone',
    url: 'tel:+1234567890',
    icon: 'mdi-phone',
  },
])
</script>

<style scoped>
.premium-hero-demo {
  min-height: 100vh;
  position: relative;
}

.demo-controls {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  min-width: 200px;
}

.demo-controls h3 {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--text-lg);
  color: var(--text-primary);
}

.control-group {
  margin-bottom: var(--space-3);
}

.control-group label {
  display: block;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.control-group select {
  width: 100%;
  padding: var(--space-2);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.control-group input[type='checkbox'] {
  margin-right: var(--space-2);
}

/* Hide controls on mobile */
@media (max-width: 768px) {
  .demo-controls {
    display: none;
  }
}
</style>
