<template>
  <v-card class="main-card animate-section user-details-form">
    <v-card-title>
      <v-icon left color="info">mdi-account-plus</v-icon> Get Your Portfolio
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm" ref="formRef">
        <v-text-field v-model="form.firstName" label="First Name" :error-messages="errors.firstName" required />
        <v-text-field v-model="form.lastName" label="Last Name" :error-messages="errors.lastName" required />
        <v-text-field v-model="form.email" label="Contact Email" :error-messages="errors.email" required type="email" />
        <v-text-field v-model="form.resumeHeader" label="Resume Header (e.g. QA Lead)" :error-messages="errors.resumeHeader" required />
        <v-textarea v-model="form.skills" label="Skills (comma separated)" :error-messages="errors.skills" required />
        <!-- Honeypot field for spam bots (hidden from users) -->
        <input v-model="form._gotcha" type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" />
        <v-btn type="submit" color="info" class="mt-4">Submit</v-btn>
      </v-form>
      <div v-if="success" class="form-success">Thank you! We'll contact you soon.</div>
      <div v-if="error" class="form-error">{{ errorMsg }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  resumeHeader: '',
  skills: '',
  _gotcha: '', // honeypot
});
const formRef = ref();
const success = ref(false);
const error = ref(false);
const errorMsg = ref('');
const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  resumeHeader: '',
  skills: '',
});

function validate() {
  let valid = true;
  errors.value = { firstName: '', lastName: '', email: '', resumeHeader: '', skills: '' };
  if (!form.value.firstName) {
    errors.value.firstName = 'First name is required.';
    valid = false;
  }
  if (!form.value.lastName) {
    errors.value.lastName = 'Last name is required.';
    valid = false;
  }
  if (!form.value.email) {
    errors.value.email = 'Email is required.';
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email address.';
    valid = false;
  }
  if (!form.value.resumeHeader) {
    errors.value.resumeHeader = 'Resume header is required.';
    valid = false;
  }
  if (!form.value.skills) {
    errors.value.skills = 'Skills are required.';
    valid = false;
  }
  return valid;
}

async function submitForm() {
  try {
    const response = await fetch('http://localhost:3001/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    const result = await response.json();
    if (result.success) {
      alert('Submission successful!');
      // Optionally reset the form here
    } else {
      alert(result.error || 'Submission failed.');
    }
  } catch (err) {
    alert('Network error. Please try again.');
  }
}
</script>

<style scoped>
.user-details-form {
  max-width: 500px;
  margin: 2rem auto;
}
.form-success {
  color: #388e3c;
  margin-top: 1rem;
}
.form-error {
  color: #d32f2f;
  margin-top: 1rem;
}
</style>
