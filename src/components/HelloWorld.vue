<script setup>
// Import Vue's ref for reactivity
import { ref } from 'vue'

// Define props for the component
defineProps({
  msg: String,
})

// Reactive counter for demonstration
const count = ref(0)
</script>

<template>
  <!--
    HelloWorld component: displays a message, a personal objective, and a counter button.
    Includes links to Vue resources for learning and testing HMR.
  -->
  <h1>{{ msg }}</h1>

  <div class="objective">
    I am seeking challenging assignments where my technical, creative skills and abilities as certified Scrum fundamentals, QA Lead(SDET) with functional and automation can be effectively utilized with industrial best Quality analysis practices.
  </div>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
/*
  Styles for the HelloWorld component.
  Includes custom card, objective, and documentation link styles.
*/
.objective {
  background: #ede7f6;
  color: #4527a0;
  padding: 1.2em;
  border-radius: 10px;
  margin-bottom: 1.5em;
  font-size: 1.1em;
  font-weight: 500;
  box-shadow: 0 2px 8px #7c4dff22;
}
.read-the-docs {
  color: #888;
}
</style>
