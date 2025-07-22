<template>
  <div class="loading-spinner-container" :class="{ 'with-message': message }">
    <div class="spinner" :class="size">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div v-if="message" class="loading-message">{{ message }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value),
  },
  message: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.with-message {
  min-height: 80px;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner > div {
  width: 12px;
  height: 12px;
  margin: 0 4px;
  background-color: var(--v-primary-base, #185a9d);
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner.small > div {
  width: 8px;
  height: 8px;
  margin: 0 3px;
}

.spinner.large > div {
  width: 16px;
  height: 16px;
  margin: 0 5px;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

.loading-message {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--v-primary-base, #185a9d);
  text-align: center;
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .spinner > div {
    animation: sk-bouncedelay 2s infinite ease-in-out both;
  }
}
</style>
