<script setup>
// Receives hobbies as a prop and displays the hobbies icons and names
import { defineProps } from 'vue';
const props = defineProps({
  hobbies: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <v-card class="main-card animate-section">
    <v-card-title>
      <v-icon left color="primary">mdi-emoticon-happy</v-icon> Hobbies & Interests
    </v-card-title>
    <v-card-text>
      <div class="hobbies-list">
        <div v-for="hobby in hobbies" :key="hobby.name" class="hobby-item">
          <v-icon size="28" color="primary">{{ hobby.icon }}</v-icon>
          <span>{{ hobby.name }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
