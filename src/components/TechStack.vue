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
      <v-icon left color="primary">mdi-tools</v-icon> Tech Stack
    </v-card-title>
    <v-card-text>
      <div class="tech-stack">
        <div v-for="tech in techStack" :key="tech.name" class="tech-item">
          <v-icon size="32" color="primary">{{ tech.icon }}</v-icon>
          <span>{{ tech.name }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
