<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted, computed } from 'vue';
import { useTheme } from 'vuetify';

const defaultAvatar = import.meta.env.BASE_URL + 'vite.svg';
const profilePhotoUrl = ref(import.meta.env.BASE_URL + 'SS.svg');
function onImgError(e) {
  e.target.onerror = null;
  e.target.src = defaultAvatar;
}

// Animated counters
const expYears = ref(0);
const projects = ref(0);
const clients = ref(0);

function animateCounter(refVar, target, duration = 1200) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const interval = setInterval(() => {
    start += step;
    if (start >= target) {
      refVar.value = target;
      clearInterval(interval);
    } else {
      refVar.value = start;
    }
  }, 16);
}

onMounted(() => {
  animateCounter(expYears, 10);
  animateCounter(projects, 285);
  animateCounter(clients, 190);
});

// Scroll to top button
const showScrollTop = ref(false);
function handleScroll() {
  showScrollTop.value = window.scrollY > 200;
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dark mode toggle
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
function toggleDark() {
  theme.global.name.value = isDark.value ? 'light' : 'dark';
  document.body.classList.toggle('dark', !isDark.value);
}

// Social/contact icons
const socials = [
  { icon: 'mdi-linkedin', url: 'https://linkedin.com/in/srisri-tummu' },
  { icon: 'mdi-github', url: 'https://github.com/srisritummu' },
  { icon: 'mdi-email', url: 'mailto:srisri.tummu@email.com' },
  { icon: 'mdi-phone', url: 'tel:+919999999999' },
];

// Testimonials
const testimonials = [
  {
    name: 'John Doe',
    text: 'Sri Sri is a fantastic QA Lead who brings energy and expertise to every project. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Project Manager, XTG Global',
  },
  {
    name: 'Jane Smith',
    text: 'A true professional in QA and automation. Sri Sri helped us deliver quality software on time.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'QA Director, Kairos Technologies',
  },
  {
    name: 'Ravi Kumar',
    text: 'His leadership and technical skills are top-notch. Our team learned a lot from him.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    title: 'Team Lead, Amzur Technologies',
  },
];
const testimonialIndex = ref(0);
function nextTestimonial() {
  testimonialIndex.value = (testimonialIndex.value + 1) % testimonials.length;
}
function prevTestimonial() {
  testimonialIndex.value = (testimonialIndex.value - 1 + testimonials.length) % testimonials.length;
}
let testimonialInterval;
onMounted(() => {
  testimonialInterval = setInterval(nextTestimonial, 6000);
});

// Tech stack
const techStack = [
  { name: 'Selenium', icon: 'mdi-language-java' },
  { name: 'Cucumber', icon: 'mdi-leaf' },
  { name: 'JMeter', icon: 'mdi-speedometer' },
  { name: 'Java', icon: 'mdi-language-java' },
  { name: 'Jira', icon: 'mdi-bug' },
  { name: 'Oracle SQL', icon: 'mdi-database' },
  { name: 'Git', icon: 'mdi-git' },
  { name: 'Linux', icon: 'mdi-linux' },
  { name: 'HTML5', icon: 'mdi-language-html5' },
  { name: 'CSS3', icon: 'mdi-language-css3' },
];

// Hobbies & Interests
const hobbies = [
  { name: 'Painting', icon: 'mdi-palette' },
  { name: 'Music', icon: 'mdi-music' },
  { name: 'Travel', icon: 'mdi-airplane' },
  { name: 'Volunteering', icon: 'mdi-hand-heart' },
  { name: 'Reading', icon: 'mdi-book-open-page-variant' },
  { name: 'Preaching', icon: 'mdi-church' },
];

// Section animation observer
function animateOnScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}
onMounted(() => {
  const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.15 });
  document.querySelectorAll('.animate-section').forEach(el => observer.observe(el));
});
// Resume download
const resumeUrl = import.meta.env.BASE_URL + 'resume.pdf';
</script>

<template>
  <v-app>
    <v-main>
      <!-- Hero Section -->
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
              <span class="label">Years Experience</span>
            </div>
            <div class="counter">
              <v-icon color="primary">mdi-briefcase-variant</v-icon>
              <span class="count">{{ projects }}</span>
              <span class="label">Projects</span>
            </div>
            <div class="counter">
              <v-icon color="primary">mdi-account-group</v-icon>
              <span class="count">{{ clients }}</span>
              <span class="label">Clients</span>
            </div>
          </div>
          <v-btn color="primary" class="resume-btn" :href="resumeUrl" download>
            <v-icon left>mdi-download</v-icon>Download Resume
          </v-btn>
          <div class="hero-contact">
            <span class="email">srisri.tummu@email.com</span>
            <div class="social-icons">
              <a v-for="s in socials" :key="s.icon" :href="s.url" target="_blank" rel="noopener" class="social-link">
                <v-icon size="28">{{ s.icon }}</v-icon>
              </a>
            </div>
          </div>
          <v-btn icon class="dark-toggle" @click="toggleDark">
            <v-icon :color="isDark ? '#fff' : 'primary'" size="28">
              {{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
            </v-icon>
          </v-btn>
        </div>
      </section>

      <!-- What do I help? -->
      <v-card class="main-card animate-section">
        <v-card-title>
          <v-icon left color="primary">mdi-help-circle</v-icon> What do I help?
        </v-card-title>
        <v-card-text>
          I help teams deliver high-quality software through robust QA processes, automation, and mentoring.
        </v-card-text>
      </v-card>

      <!-- Software Skills -->
      <v-card class="main-card animate-section">
        <v-card-title>
          <v-icon left color="primary">mdi-laptop</v-icon> Software Skills
        </v-card-title>
        <v-card-text>
          Selenium, Cucumber, JMeter, Java, Jira, Oracle SQL, Git, Linux, HTML5, CSS3
        </v-card-text>
      </v-card>

      <!-- Tech Stack -->
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

      <!-- Achievements -->
      <v-card class="main-card animate-section">
        <v-card-title>
          <v-icon left color="primary">mdi-trophy</v-icon> Achievements
        </v-card-title>
        <v-card-text>
          ISTQB Certified, Best QA Lead 2022, Speaker at QA Summit 2023
        </v-card-text>
      </v-card>

      <!-- Professional Summary -->
      <v-card class="main-card animate-section">
        <v-card-title>
          <v-icon left color="primary">mdi-account-tie</v-icon> Professional Summary
        </v-card-title>
        <v-card-text>
          Over 10 years of experience in QA, automation, and team leadership across multiple domains.
        </v-card-text>
      </v-card>

      <!-- Work Experience -->
      <v-card class="main-card animate-section">
        <v-card-title>
          <v-icon left color="primary">mdi-briefcase</v-icon> Work Experience
        </v-card-title>
        <v-card-text>
          <ul>
            <li>QA Lead, XTG Global (2021-Present)</li>
            <li>Senior QA Engineer, Kairos Technologies (2017-2021)</li>
            <li>QA Engineer, Amzur Technologies (2013-2017)</li>
          </ul>
        </v-card-text>
      </v-card>

      <!-- Education -->
      <v-card class="main-card animate-section">
        <v-card-title>
          <v-icon left color="primary">mdi-school</v-icon> Education
        </v-card-title>
        <v-card-text>
          B.Tech in Computer Science, JNTU Hyderabad
        </v-card-text>
      </v-card>

      <!-- Co-Curricular Activities -->
      <v-card class="main-card animate-section">
        <v-card-title>
          <v-icon left color="primary">mdi-run-fast</v-icon> Co-Curricular Activities
        </v-card-title>
        <v-card-text>
          Speaker at QA events, Hackathon mentor, Volunteer for tech-for-good initiatives
        </v-card-text>
      </v-card>

      <!-- Hobbies & Interests -->
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

      <!-- Personal Profile -->
      <v-card class="main-card animate-section">
        <v-card-title>
          <v-icon left color="primary">mdi-account-circle</v-icon> Personal Profile
        </v-card-title>
        <v-card-text>
          Passionate about quality, technology, and helping others grow in their careers.
        </v-card-text>
      </v-card>

      <!-- Testimonials Carousel -->
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

      <!-- Scroll to Top Button -->
      <transition name="fade">
        <v-btn v-if="showScrollTop" class="scroll-top-btn" color="primary" icon @click="scrollToTop">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </transition>
    </v-main>
  </v-app>
</template>

<style scoped>
body, #app, .v-application {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #f7b733;
}
body.dark, #app.dark, .v-application.theme--dark, .v-application--is-lt-dark {
  background: #181818 !important;
}
.main-bg {
  background: #f7b733;
  min-height: 100vh;
  padding-bottom: 40px;
  transition: background 0.3s;
}
.main-bg.dark {
  background: #181818;
}
.sri-sri {
  color: #0a2342 !important;
}
.hero-section {
  background: linear-gradient(135deg, #e3f2fd 0%, #f5f7fa 100%);
  padding: 48px 0 32px 0;
  text-align: center;
  position: relative;
  margin-bottom: 32px;
  border-radius: 0 0 32px 32px;
  box-shadow: 0 4px 24px rgba(10,35,66,0.08);
}
.v-application.theme--dark .hero-section,
.v-application--is-lt-dark .hero-section {
  background: linear-gradient(135deg, #232b36 0%, #181818 100%) !important;
  color: #fff;
}
.hero-avatar {
  margin-bottom: 16px;
  border: 4px solid #fff;
  box-shadow: 0 2px 12px rgba(10,35,66,0.10);
}
.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.hero-subtitle {
  font-size: 1.2rem;
  color: #1976d2;
  margin-bottom: 24px;
}
.hero-counters {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 20px;
}
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem;
}
.counter .count {
  font-size: 2rem;
  font-weight: 700;
  color: #1976d2;
  margin: 4px 0;
  transition: color 0.3s;
}
.counter .label {
  font-size: 0.95rem;
  color: #555;
}
.resume-btn {
  margin: 12px 0 0 0;
  font-weight: 600;
}
.hero-contact {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-contact .email {
  font-size: 1.1rem;
  color: #0a2342;
  margin-bottom: 6px;
}
.social-icons {
  display: flex;
  gap: 16px;
  margin-top: 2px;
}
.social-link {
  color: #1976d2;
  transition: color 0.2s;
}
.social-link:hover {
  color: #0a2342;
}
.v-application.theme--dark .social-link {
  color: #ffd600 !important;
}
.v-application.theme--dark .social-link:hover {
  color: #fff !important;
}
.dark-toggle {
  position: absolute;
  top: 18px;
  right: 18px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(10,35,66,0.10);
}

.main-card {
  max-width: 700px;
  margin: 32px auto 0 auto;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(10,35,66,0.07);
  transition: box-shadow 0.3s;
  background: #fff;
  color: #222;
}
.v-application.theme--dark .main-card,
.v-application--is-lt-dark .main-card {
  background: #232b36 !important;
  color: #fff !important;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
}
.main-card:hover {
  box-shadow: 0 6px 32px rgba(10,35,66,0.13);
}
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 32px;
  margin-top: 8px;
}
.tech-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
}
.hobbies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 32px;
  margin-top: 8px;
}
.hobby-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
}

.testimonial-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #e3f2fd 100%);
  margin-bottom: 32px;
}
.v-application.theme--dark .testimonial-card,
.v-application--is-lt-dark .testimonial-card {
  background: linear-gradient(135deg, #232b36 0%, #181818 100%) !important;
}
.testimonial-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}
.testimonial-avatar {
  margin-bottom: 6px;
}
.testimonial-text {
  font-size: 1.1rem;
  font-style: italic;
  color: #1976d2;
}
.testimonial-author {
  font-weight: 600;
  color: #0a2342;
}
.testimonial-title {
  font-weight: 400;
  color: #555;
}
.testimonial-controls {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.scroll-top-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(10,35,66,0.15);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Section entrance animation */
.animate-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.animate-section.in-view {
  opacity: 1;
  transform: none;
}

@media (max-width: 600px) {
  .main-card {
    margin: 20px 8px 0 8px;
  }
  .hero-section {
    padding: 32px 0 18px 0;
  }
  .hero-title {
    font-size: 1.5rem;
  }
  .hero-counters {
    gap: 12px;
  }
  .scroll-top-btn {
    bottom: 16px;
    right: 16px;
  }
}
</style>
