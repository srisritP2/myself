<script setup>
// Props for all hero section data
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';

// Props
const props = defineProps({
  profilePhotoUrl: String,
  defaultAvatar: String,
  expYears: Number,
  projects: Number,
  clients: Number,
  socials: Array,
  isDark: Boolean,
  toggleDark: Function,
  resumeUrl: String,
  onImgError: Function
});
</script>

<template>
  <section class="hero-section animate-section">
    <div class="hero-content">
      <v-avatar size="120" class="hero-avatar">
        <img :src="profilePhotoUrl" @error="onImgError" alt="Sri Sri Tummu" />
      </v-avatar>
      <h1 class="hero-title">
        Hi, I'm <span class="sri-sri">Sri Sri</span> Tummu
      </h1>
      <p class="hero-subtitle">QA Lead | Automation Specialist | Mentor</p>
      <div class="hero-counters">
        <div class="counter">
          <v-icon color="primary">mdi-timer</v-icon>
          <span class="count">{{ expYears }}</span>
          <span class="label">Years of Experience </span>
        </div>
        <div class="counter">
          <v-icon color="primary">mdi-briefcase-variant</v-icon>
          <span class="count">{{ projects }}</span>
          <span class="label">Projects Delivered</span>
        </div>
        <div class="counter">
          <v-icon color="primary">mdi-account-group</v-icon>
          <span class="count">{{ clients }}</span>
          <span class="label">Clients Served</span>
        </div>
      </div>
      <!-- Download Resume Button -->
      <v-btn color="primary" class="resume-btn" :href="resumeUrl" download>
        <v-icon left>mdi-download</v-icon>Download Resume
      </v-btn>
      <!-- Social and contact icons -->
      <div class="hero-contact">
        <span class="email">srisri.tummu@email.com</span>
        <div class="social-icons">
          <a v-for="s in socials" :key="s.icon" :href="s.url" target="_blank" rel="noopener" class="social-link">
            <v-icon size="28">{{ s.icon }}</v-icon>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ...existing hero section styles... */
</style>
