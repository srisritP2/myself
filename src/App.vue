<script setup>
// Import components and Vue composition API utilities
import { ref, onMounted, computed } from 'vue';
import { useTheme } from 'vuetify';
import HeroSection from './components/HeroSection.vue';
import DetailsSection from './components/DetailsSection.vue';
import TechStack from './components/TechStack.vue';
import Hobbies from './components/Hobbies.vue';
import Testimonials from './components/Testimonials.vue';

// Set up default and fallback profile images
const defaultAvatar = import.meta.env.BASE_URL + 'vite.svg';
const profilePhotoUrl = ref(import.meta.env.BASE_URL + 'SS.svg');
function onImgError(e) {
  e.target.onerror = null;
  e.target.src = defaultAvatar;
}

// Animated counters for experience, projects, and clients
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

// Scroll to top button logic
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

// Dark mode toggle using Vuetify theme
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
function toggleDark() {
  theme.global.name.value = isDark.value ? 'light' : 'dark';
  document.body.classList.toggle('dark', !isDark.value);
}

// Social/contact icons for quick access
const socials = [
  { icon: 'mdi-linkedin', url: 'https://linkedin.com/in/srisri-tummu' },
  { icon: 'mdi-github', url: 'https://github.com/srisritummu' },
  { icon: 'mdi-email', url: 'mailto:srisri.tummu@email.com' },
  { icon: 'mdi-phone', url: 'tel:+919999999999' },
];

// Testimonials carousel data and logic
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

// Tech stack and hobbies/interests arrays for display
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
const hobbies = [
  { name: 'Painting', icon: 'mdi-palette' },
  { name: 'Music', icon: 'mdi-music' },
  { name: 'Travel', icon: 'mdi-airplane' },
  { name: 'Volunteering', icon: 'mdi-hand-heart' },
  { name: 'Reading', icon: 'mdi-book-open-page-variant' },
  { name: 'Preaching', icon: 'mdi-church' },
];

// Animate sections on scroll for entrance effect
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

// Resume download URL (placed in public/ for static serving)
const resumeUrl = import.meta.env.BASE_URL + 'resume.pdf';
</script>

<template>
  <v-app>
    <v-main>
      <div class="global-dark-toggle-wrapper">
        <v-btn icon class="global-dark-toggle" @click="toggleDark">
          <v-icon :color="isDark ? '#fff' : 'primary'" size="32">
            {{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
          </v-icon>
        </v-btn>
      </div>
      <!-- Hero Section: Profile, counters, resume, social links -->
      <HeroSection
        :profilePhotoUrl="profilePhotoUrl"
        :defaultAvatar="defaultAvatar"
        :expYears="expYears"
        :projects="projects"
        :clients="clients"
        :socials="socials"
        :isDark="isDark"
        :toggleDark="toggleDark"
        :resumeUrl="resumeUrl"
        :onImgError="onImgError"
      />

      <!-- What do I help? -->
      <DetailsSection icon="mdi-help-circle" title="What do I help?">
        I help teams deliver high-quality software through robust QA processes, automation, and mentoring.
      </DetailsSection>

      <!-- Software Skills -->
      <DetailsSection icon="mdi-laptop" title="Software Skills">
        Selenium, Cucumber, JMeter, Java, Jira, Oracle SQL, Git, Linux, HTML5, CSS3
      </DetailsSection>

      <!-- Tech Stack -->
      <DetailsSection icon="mdi-tools" title="Tech Stack">
        <div class="tech-stack">
          <div v-for="tech in techStack" :key="tech.name" class="tech-item">
            <v-icon size="32" color="primary">{{ tech.icon }}</v-icon>
            <span>{{ tech.name }}</span>
          </div>
        </div>
      </DetailsSection>

      <!-- Achievements -->
      <DetailsSection icon="mdi-trophy" title="Achievements">
        ISTQB Certified, Best QA Lead 2022, Speaker at QA Summit 2023
      </DetailsSection>

      <!-- Professional Summary -->
      <DetailsSection icon="mdi-account-tie" title="Professional Summary">
        Over 10 years of experience in QA, automation, and team leadership across multiple domains.
      </DetailsSection>

      <!-- Work Experience -->
      <DetailsSection icon="mdi-briefcase" title="Work Experience">
        <ul>
          <li>QA Lead, XTG Global (2021-Present)</li>
          <li>Senior QA Engineer, Kairos Technologies (2017-2021)</li>
          <li>QA Engineer, Amzur Technologies (2013-2017)</li>
        </ul>
      </DetailsSection>

      <!-- Education -->
      <DetailsSection icon="mdi-school" title="Education">
        B.Tech in Computer Science, JNTU Hyderabad
      </DetailsSection>

      <!-- Co-Curricular Activities -->
      <DetailsSection icon="mdi-run-fast" title="Co-Curricular Activities">
        Speaker at QA events, Hackathon mentor, Volunteer for tech-for-good initiatives
      </DetailsSection>

      <!-- Hobbies & Interests -->
      <DetailsSection icon="mdi-emoticon-happy" title="Hobbies & Interests">
        <div class="hobbies-list">
          <div v-for="hobby in hobbies" :key="hobby.name" class="hobby-item">
            <v-icon size="28" color="primary">{{ hobby.icon }}</v-icon>
            <span>{{ hobby.name }}</span>
          </div>
        </div>
      </DetailsSection>

      <!-- Personal Profile -->
      <DetailsSection icon="mdi-account-circle" title="Personal Profile">
        Passionate about quality, technology, and helping others grow in their careers.
      </DetailsSection>

      <!-- Testimonials Carousel -->
      <div class="main-card animate-section">
        <Testimonials
          :testimonials="testimonials"
          :testimonialIndex="testimonialIndex"
          :nextTestimonial="nextTestimonial"
          :prevTestimonial="prevTestimonial"
        />
      </div>

      <!-- Section Divider -->
      <hr class="section-divider" />

      <!-- Footer -->
      <footer class="site-footer">
        &copy; {{ new Date().getFullYear() }} Sri Sri Tummu &mdash; All rights reserved.<br>
        <span style="font-size:0.95em;">Connect: <a href="mailto:srisri.tummu@email.com" style="color:#185a9d;">srisri.tummu@email.com</a></span>
      </footer>
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
/*
  Custom styles for layout, theming, and responsive design.
  Use clear class names and comments for maintainability.
*/
body, #app, .v-application {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-size: 1.15rem; /* Increased base font size */
  /* Modern gradient: deep blue to teal to light yellow */
  background: linear-gradient(135deg, #232b36 0%, #43cea2 60%, #f9f871 100%);
}
body.dark, #app.dark, .v-application.theme--dark, .v-application--is-lt-dark {
  background: linear-gradient(135deg, #181818 0%, #232b36 60%, #43cea2 100%) !important;
}
.main-bg {
  background: transparent;
  min-height: 100vh;
  padding-bottom: 40px;
  transition: background 0.3s;
}
.main-bg.dark {
  background: transparent;
}
.main-card {
  position: relative;
  background: #fffdfa !important; /* Soft off-white for cards */
  color: #232b36;
  border: 1.5px solid #e0e7ef;
  box-shadow: 0 4px 24px rgba(67,206,162,0.08);
  max-width: 850px; /* Increased from 770px */
  font-size: 1.08rem; /* Slightly larger text in cards */
}
.main-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: 18px;
  background: linear-gradient(120deg, #e3f2fd 0%, #f9f871 100%);
  opacity: 0.32;
  pointer-events: none;
}
.main-card::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
  border-radius: 14px;
  z-index: 0;
  background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
  opacity: 0.10;
  pointer-events: none;
}
.main-card > * {
  position: relative;
  z-index: 1;
}
.v-application.theme--dark .main-card,
.v-application--is-lt-dark .main-card {
  background: #232b36 !important; /* Deep blue for cards in dark mode */
  color: #f9f871 !important;
  border: 1.5px solid #43cea2;
  box-shadow: 0 4px 24px rgba(67, 206, 162, 0.18);
}

/* --- Glassmorphism Effect for Cards & Hero --- */
.main-card, .details-section, .testimonial-card, .hero-section {
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  background: rgba(255, 255, 255, 0.55) !important;
  box-shadow: 0 8px 40px 0 rgba(67,206,162,0.18), 0 2px 12px rgba(36,36,122,0.08);
  border: 1.5px solid rgba(227,242,253,0.55);
}
.v-application.theme--dark .main-card,
.v-application.theme--dark .details-section,
.v-application.theme--dark .testimonial-card,
.v-application.theme--dark .hero-section {
  background: rgba(35, 43, 54, 0.65) !important;
  box-shadow: 0 8px 40px 0 rgba(67,206,162,0.22), 0 2px 12px rgba(36,36,122,0.13);
  border: 1.5px solid rgba(67,206,162,0.32);
}

/* --- Parallax Effect for Hero Section --- */
.hero-section {
  background-attachment: fixed;
}
@media (max-width: 700px) {
  .hero-section {
    background-attachment: scroll;
  }
}

/* --- Micro-interactions: Button & Chip Animations --- */
.resume-btn, .tech-item, .hobby-item, .social-link {
  will-change: transform, box-shadow;
}
.resume-btn:active {
  transform: scale(0.97);
  box-shadow: 0 2px 8px rgba(67,206,162,0.18);
}
.tech-item:active, .hobby-item:active {
  transform: scale(0.96) rotate(-2deg);
  box-shadow: 0 2px 8px rgba(67,206,162,0.18);
}
.social-link:active {
  transform: scale(0.93) rotate(2deg);
  box-shadow: 0 2px 8px rgba(67,206,162,0.18);
}

/* --- Further Animation: Floating Decorative Elements --- */
.hero-section::before, .hero-section::after {
  animation: floatY 6s ease-in-out infinite alternate;
}
@keyframes floatY {
  0% { transform: translateY(0px); }
  100% { transform: translateY(24px); }
}

/* --- Section Entrance Animation: Fade+Slide --- */
.animate-section {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  transition: opacity 0.7s cubic-bezier(.4,2,.6,1), transform 0.7s cubic-bezier(.4,2,.6,1);
}
.animate-section.in-view {
  opacity: 1;
  transform: none;
}

.sri-sri {
  color: #185a9d !important;
}
.hero-section {
  background: linear-gradient(120deg, #f9f871 0%, #43cea2 60%, #185a9d 100%);
  color: #232b36;
  border-radius: 48px 48px 120px 120px;
  box-shadow: 0 12px 48px rgba(67,206,162,0.22), 0 4px 32px rgba(36, 36, 122, 0.13);
  padding: 64px 0 56px 0;
  max-width: 720px;
  width: 100%;
  margin: 48px auto 56px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s, background 0.3s;
  border: 2.5px solid #e3f2fd;
}
.hero-section::before {
  content: '';
  position: absolute;
  top: -100px;
  left: -100px;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, #fffdfa 0%, #f9f871 60%, transparent 100%);
  opacity: 0.18;
  z-index: 0;
}
.hero-section::after {
  content: '';
  position: absolute;
  bottom: -80px;
  right: -80px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #43cea2 0%, #185a9d 80%, transparent 100%);
  opacity: 0.15;
  z-index: 0;
}
.hero-avatar {
  margin-bottom: 28px;
  border: 7px solid #fffdfa;
  box-shadow: 0 8px 32px rgba(67,206,162,0.22);
  border-radius: 50%;
  width: 148px;
  height: 148px;
  object-fit: cover;
  background: #fffdfa;
  transition: box-shadow 0.3s;
}
.hero-title {
  font-size: 3.2rem;
  font-weight: 900;
  margin-bottom: 12px;
  letter-spacing: -2px;
  text-align: center;
  background: linear-gradient(90deg, #185a9d 0%, #43cea2 60%, #f9f871 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 4px 16px rgba(67,206,162,0.13);
}
.hero-subtitle {
  font-size: 1.22rem;
  color: #185a9d;
  margin-bottom: 36px;
  text-align: center;
  font-weight: 700;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 8px #fffdfa44;
}
.hero-counters {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 32px;
  margin-bottom: 36px;
}
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  background: rgba(255,255,255,0.22);
  border-radius: 20px;
  padding: 18px 28px;
  box-shadow: 0 4px 18px rgba(67,206,162,0.13);
  min-width: 120px;
  min-height: 100px;
  transition: background 0.2s;
  border: 1.5px solid #e3f2fd;
}
.counter .count {
  font-size: 2.6rem;
  font-weight: 900;
  color: #185a9d;
  margin: 4px 0 2px 0;
  transition: color 0.3s;
  text-shadow: 0 2px 8px #f9f87144;
}
.counter .label {
  font-size: 1.08rem;
  color: #232b36;
  opacity: 0.85;
}
.counter .expert {
  font-size: 1.02rem;
  color: #43cea2;
  font-weight: 700;
  margin-top: 2px;
  letter-spacing: 0.5px;
}
@media (max-width: 700px) {
  .hero-counters {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  .counter {
    min-width: 90vw;
    min-height: 60px;
    padding: 10px 0;
  }
}

/* --- Resume Button --- */
.resume-btn {
  background: linear-gradient(90deg, #43cea2 0%, #f9f871 100%);
  color: #185a9d;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(67, 206, 162, 0.15);
  margin: 40px auto 0 auto;
  font-weight: 900;
  font-size: 1.13rem;
  padding: 16px 44px;
  letter-spacing: 1px;
  border: none;
  display: block;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.resume-btn:hover {
  background: linear-gradient(90deg, #185a9d 0%, #43cea2 100%);
  color: #fff;
  box-shadow: 0 8px 28px rgba(67,206,162,0.22);
}
.hero-contact {
  margin-top: 32px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.hero-contact .email {
  font-size: 1.18rem;
  color: #185a9d;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 0.2px;
}
.social-icons {
  display: flex;
  gap: 32px;
  margin-top: 12px;
  justify-content: center;
  width: 100%;
}
.social-link {
  color: #fff;
  background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.85rem;
  box-shadow: 0 4px 18px rgba(67,206,162,0.18);
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.social-link:hover {
  background: linear-gradient(135deg, #f9f871 0%, #43cea2 100%);
  color: #185a9d;
  transform: scale(1.18);
}

/* --- Modern Section Card Styles --- */
.details-section {
  background: linear-gradient(120deg, #fffdfa 0%, #e3f2fd 100%);
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(67,206,162,0.10), 0 2px 12px rgba(36,36,122,0.06);
  padding: 36px 36px 28px 36px;
  margin: 36px auto 36px auto;
  max-width: 780px;
  width: 100%;
  color: #232b36;
  position: relative;
  transition: box-shadow 0.3s, background 0.3s;
  border: 1.5px solid #e3f2fd;
}
.details-section:hover {
  box-shadow: 0 8px 36px rgba(67,206,162,0.16), 0 4px 24px rgba(36,36,122,0.10);
  background: linear-gradient(120deg, #e3f2fd 0%, #fffdfa 100%);
}
.details-section .section-title {
  display: flex;
  align-items: center;
  font-size: 1.45rem;
  font-weight: 800;
  color: #185a9d;
  margin-bottom: 18px;
  letter-spacing: -0.5px;
}
.details-section .section-title .v-icon {
  margin-right: 12px;
  color: #43cea2;
  font-size: 2rem;
}
.details-section ul, .details-section p {
  font-size: 1.13rem;
  color: #232b36;
  margin: 0 0 8px 0;
  line-height: 1.7;
}
.details-section ul {
  padding-left: 22px;
}
.details-section li {
  margin-bottom: 6px;
}

/* --- Tech Stack & Hobbies --- */
.tech-stack, .hobbies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 12px;
  margin-top: 12px;
  justify-content: center;
}
.tech-item, .hobby-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1.08rem;
  background: #e3f2fd;
  color: #185a9d;
  border-radius: 12px;
  padding: 8px 18px;
  box-shadow: 0 2px 8px rgba(67,206,162,0.08);
  font-weight: 600;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.tech-item .v-icon, .hobby-item .v-icon {
  color: #43cea2;
  font-size: 1.4rem;
}
.tech-item:hover, .hobby-item:hover {
  background: #43cea2;
  color: #fff;
  box-shadow: 0 4px 16px rgba(67,206,162,0.16);
}
.tech-item:hover .v-icon, .hobby-item:hover .v-icon {
  color: #fffdfa;
}

/* --- Testimonials --- */
.testimonial-card {
  background: linear-gradient(120deg, #fffdfa 0%, #e3f2fd 100%);
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(67,206,162,0.10), 0 2px 12px rgba(36,36,122,0.06);
  padding: 36px 36px 28px 36px;
  margin: 36px auto 36px auto;
  max-width: 780px;
  width: 100%;
  color: #232b36;
  border: 1.5px solid #e3f2fd;
  text-align: center;
  position: relative;
}
.testimonial-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.testimonial-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
  border: 3px solid #43cea2;
  box-shadow: 0 2px 8px rgba(67,206,162,0.10);
}
.testimonial-text {
  font-size: 1.18rem;
  font-style: italic;
  color: #185a9d;
  margin-bottom: 6px;
}
.testimonial-author {
  font-weight: 700;
  color: #232b36;
}
.testimonial-title {
  font-weight: 500;
  color: #43cea2;
  font-size: 1.05rem;
}
.testimonial-controls {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}
.testimonial-controls .v-btn {
  background: #43cea2;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(67,206,162,0.10);
  transition: background 0.2s, color 0.2s;
}
.testimonial-controls .v-btn:hover {
  background: #185a9d;
  color: #f9f871;
}

/* --- Upgraded Section Card Gradient Backgrounds --- */
.details-section, .testimonial-card {
  background: linear-gradient(120deg, #f9f871 0%, #43cea2 60%, #185a9d 100%) !important;
  color: #232b36;
}
.v-application.theme--dark .details-section,
.v-application.theme--dark .testimonial-card {
  background: linear-gradient(120deg, #232b36 0%, #185a9d 60%, #43cea2 100%) !important;
  color: #f9f871;
}

@media (max-width: 700px) {
  .hero-section {
    padding: 18px 0 8px 0;
    max-width: 99vw;
    border-radius: 20px 20px 60px 60px;
  }
  .hero-title {
    font-size: 1.25rem;
  }
  .hero-avatar {
    width: 70px;
    height: 70px;
  }
  .hero-counters {
    gap: 8px;
  }
  .resume-btn {
    padding: 10px 18px;
    font-size: 1em;
  }
  .social-link {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
  .details-section, .testimonial-card {
    padding: 18px 6vw 14px 6vw;
    border-radius: 18px;
    max-width: 99vw;
  }
  .tech-stack, .hobbies-list {
    gap: 8px 4px;
  }
  .tech-item, .hobby-item {
    font-size: 0.98rem;
    padding: 6px 10px;
  }
  .testimonial-avatar {
    width: 48px;
    height: 48px;
  }
}

/* --- Global Dark Toggle Button --- */
.global-dark-toggle {
  pointer-events: auto;
  background: rgba(255,255,255,0.18) !important;
  box-shadow: 0 2px 8px rgba(67,206,162,0.13);
  border-radius: 50%;
  transition: background 0.2s;
}
.global-dark-toggle:hover {
  background: rgba(67,206,162,0.18) !important;
}
@media (max-width: 700px) {
  .global-dark-toggle-wrapper {
    top: 10px;
    right: 10px;
  }
}
.global-dark-toggle-wrapper {
  position: absolute;
  top: 32px;
  right: 10px;
  z-index: 1000;
  pointer-events: none;
}
</style>
