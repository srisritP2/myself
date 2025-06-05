<template>
  <v-card class="main-card animate-section">
    <v-card-title>
      <v-icon left color="info">{{ icon }}</v-icon> {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup>
// DetailsSection.vue: A reusable card section for profile details
// Props: icon (mdi icon name), title (section title)
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
});
</script>

<!--
  Usage example:
  <DetailsSection icon="mdi-trophy" title="Achievements">
    ISTQB Certified, Best QA Lead 2022, Speaker at QA Summit 2023
  </DetailsSection>
-->
