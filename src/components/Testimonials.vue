<script setup>
// Receives testimonials, testimonialIndex, nextTestimonial, prevTestimonial as props
import { defineProps } from 'vue';
const props = defineProps({
  testimonials: {
    type: Array,
    required: true
  },
  testimonialIndex: {
    type: Number,
    required: true
  },
  nextTestimonial: {
    type: Function,
    required: true
  },
  prevTestimonial: {
    type: Function,
    required: true
  }
});
</script>

<template>
  <v-card class="main-card animate-section testimonial-card">
    <v-card-title>
      <v-icon left color="primary">mdi-comment-quote</v-icon> Testimonials
    </v-card-title>
    <v-card-text>
      <div class="testimonial-carousel">
        <v-avatar size="56" class="testimonial-avatar">
          <img :src="testimonials[testimonialIndex].avatar" alt="Testimonial" />
        </v-avatar>
        <div class="testimonial-text">"{{ testimonials[testimonialIndex].text }}"</div>
        <div class="testimonial-author">- {{ testimonials[testimonialIndex].name }}, <span class="testimonial-title">{{ testimonials[testimonialIndex].title }}</span></div>
        <div class="testimonial-controls">
          <v-btn icon @click="prevTestimonial"><v-icon>mdi-chevron-left</v-icon></v-btn>
          <v-btn icon @click="nextTestimonial"><v-icon>mdi-chevron-right</v-icon></v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
