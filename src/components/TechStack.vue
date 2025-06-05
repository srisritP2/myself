<script setup>
// Receives techStack as a prop and displays the tech stack icons and names
import { defineProps } from 'vue';
const props = defineProps({
  techStack: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <v-card class="main-card animate-section">
    <v-card-title>
      <v-icon left color="info">mdi-tools</v-icon> Tech Stack
    </v-card-title>
    <v-card-text>
      <div class="tech-stack">
        <div v-for="tech in techStack" :key="tech.name" class="tech-item">
          <v-icon size="32" color="info">{{ tech.icon }}</v-icon>
          <span>{{ tech.name }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.tech-stack__icon {
  color: var(--v-theme-info);
}
.tech-stack__item-icon {
  color: var(--v-theme-info);
}
</style>
