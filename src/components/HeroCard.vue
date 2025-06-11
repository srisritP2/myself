<template>
  <div class="card hero-card">
    <img :src="profilePhotoUrl" @error="onImgError" alt="Sri Sri Tummu profile photo" />
    <div>
      <h2>SriSri T</h2>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="hero-counters">
        <div class="counter">
          <v-icon color="primary">mdi-timer</v-icon>
          <span class="count">{{ expYears }}</span> <span class="label">Yrs of Experience</span>
        </div>
        <span class="divider">|</span>
        <div class="counter">
          <v-icon color="primary">mdi-briefcase-variant</v-icon>
          <span class="count">{{ projects }}</span> <span class="label">Projects Delivered</span>
        
        </div>
        <span class="divider">|</span>
        <div class="counter">
          <v-icon color="primary">mdi-account-group</v-icon>
          <span class="count">{{ clients }}</span> <span class="label">Clients Served</span>
          
        </div>
      </div>
      <v-btn color="primary" class="resume-btn" :href="resumeUrl" download>
        <v-icon left>mdi-download</v-icon>Download Resume
      </v-btn>
      <div class="socials">
        <button v-for="social in socials" :key="social.icon" @click="openSocial(social.url, social.icon)" :aria-label="`Link to ${social.icon.replace('mdi-','')}`">
          <v-icon :color="social.color || 'primary'" size="32">{{ social.icon }}</v-icon>
        </button>
      </div>
      <!-- Bouncing Down Arrow Icon -->
      <div class="bouncing-arrow">
        <v-icon color="primary" size="40">mdi-chevron-down</v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  profilePhotoUrl: String,
  onImgError: Function,
  name: String,
  title: String,
  description: String,
  expYears: Number,
  projects: Number,
  clients: Number,
  socials: Array,
  resumeUrl: String
});
function openSocial(url, icon) {
  if (icon === 'mdi-email') {
    window.location.href = `mailto:${url.replace('mailto:', '')}`;
  } else if (icon === 'mdi-phone') {
    window.location.href = `tel:${url.replace('tel:', '')}`;
  } else {
    window.open(url, '_blank', 'noopener');
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

:root {
  --gradient: linear-gradient(45deg, #ff7c7d, #ffda67);
  --card: #272524;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  height: 100vh;
  background: var(--gradient);
  color: #fdfcfd;
  font-family: "Euclid Circular A", "Poppins";
}

#app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.card {
  margin: 0 auto;
}

.card {
  display: flex;
  align-items: center;
  width: 75vw;
  max-width: 850px;
  padding: 44px 30px 44px 20px;
  background: var(--card);
  border-radius: 24px;
}

.card.hero-card {
  background: var(--card);
  box-shadow: 0 60px 40px rgb(0 0 0 / 8%);
  border-radius: 24px;
  color: #fdfcfd;
  padding: 44px 30px 44px 20px;
  border: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transition: box-shadow 0.2s, background 0.2s;
}

.card.hero-card:hover {
  box-shadow: 0 80px 60px 0 rgba(0,0,0,0.12);
  background: var(--card);
}

.card.hero-card img {
  border: none;
  outline: none;
  box-shadow: 0 30px 24px rgb(0 0 0 / 8%);
  background: #fff;
}

.card img {
  max-width: 280px;
  width: 36vw;
  height: 300px;
  object-fit: cover;
  margin-left: -60px;
  margin-right: 30px;
  border-radius: inherit;
  box-shadow: 0 60px 40px rgb(0 0 0 / 8%);
  transition: border-radius 0.3s;
}

.card h2 {
  font-size: 22px;
  font-weight: 400;
  margin-top: 0;
  margin-right: 30px;
  margin-bottom: 10px;
}

.card h3 {
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.75;
}

.card p {
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 30px;
  opacity: 0.5;
}

.card.hero-card h2, .card.hero-card h3, .card.hero-card p {
  text-shadow: none;
}

.card.hero-card .resume-btn {
  background: var(--gradient);
  color: #272524;
  font-weight: 700;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(255,218,103,0.10);
  transition: background 0.2s, color 0.2s;
}

.card.hero-card .resume-btn:hover {
  background: linear-gradient(90deg, #ff7c7d 0%, #ffda67 100%);
  color: #fff;
}

.socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
  width: 100%;
}

.socials > button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.socials > button > .v-icon {
  font-size: 1.6rem;
  width: 2.5em;
  height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #23201e;
  color: #ffda67;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
}

.socials > button > .v-icon:hover {
  background: #ffda67;
  color: #23201e;
}

.hero-counters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.counter {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1.08rem;
  font-weight: 600;
  min-width: 0;
}
.divider {
  color: #46547e;
  font-size: 1.5em;
  font-weight: 500;
  margin: 0 10px;
  user-select: none;
}

.bouncing-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  animation: bounce 1.4s infinite;
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(10px);
  }
}

@media (max-width: 900px) {
  .card.hero-card {
    padding: 32px 10px 32px 10px;
    border-radius: 18px;
  }

  .socials {
    gap: 10px;
    margin-top: 14px;
  }

  .socials > button > .v-icon {
    font-size: 1.3rem;
    width: 2em;
    height: 2em;
  }
}
@media (max-width: 600px) {
  .card.hero-card {
    padding: 16px 2vw 16px 2vw;
    border-radius: 12px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .socials {
    gap: 8px;
    margin-top: 10px;
  }

  .socials > button > .v-icon {
    font-size: 1.1rem;
    width: 1.5em;
    height: 1.5em;
  }

  .hero-counters {
    gap: 0.2em;
    margin-bottom: 10px;
  }
  .divider {
    margin: 0 4px;
    font-size: 1.1em;
  }
  .counter {
    font-size: 0.98rem;
    gap: 3px;
  }
  .card.hero-card img {
    margin: 0 0 16px 0;
    width: 60vw;
    max-width: 220px;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: 50%;
  }
}
@media (max-width: 400px) {
  .card.hero-card {
    width: 100vw;
    max-width: 100vw;
    border-radius: 0;
    padding: 4px 0 4px 0;
  }
  .card.hero-card img {
    width: 38px;
    height: 38px;
    margin-bottom: 6px;
  }
  .card.hero-card h2 {
    font-size: 0.98rem;
  }
  .card.hero-card h3 {
    font-size: 0.9rem;
  }
  .card.hero-card p {
    font-size: 0.88rem;
    margin-bottom: 6px;
  }
  .resume-btn {
    font-size: 0.88rem;
    padding: 4px 8px;
    margin-top: 6px;
  }
  .socials {
    margin-top: 6px;
    gap: 0.3em;
    width: auto;
  }
  .socials > button > .v-icon {
    font-size: 1rem;
    width: 1.2em;
    height: 1.2em;
  }
  .socials > button > .fa-linkedin,
  .socials > button > .fa-github,
  .socials > button > .fa-envelope,
  .socials > button > .fa-phone,
  .socials > button > .v-icon {
    width: 1.2em;
    height: 1.2em;
  }
}
@media (width <= 600px) {
  .card {
    margin: 0 40px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 60px;
    width: 100%;
    text-align: center;
    flex-direction: column;
  }

  .card h2 {
    margin-right: 0;
    font-size: 26px;
  }

  .card img {
    margin: -100px 0 30px 0;
    width: 100%;
    max-width: 1000px;
    height: 250px;
  }

  .card p {
    max-width: 360px;
  }

  .socials {
    justify-content: center;
  }
}

@media (width <= 440px) {
  .card img {
    height: 50vw;
    width: 50vw;
    border-radius: 50%;
    border: 12px solid var(--card);
    box-shadow: none;
    margin: -140px 0 30px 0;
  }
}
</style>
