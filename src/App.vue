<script setup>
// Import components and Vue composition API utilities
import { ref, onMounted, computed } from 'vue';
import { useTheme } from 'vuetify';
import HeroCard from './components/HeroCard.vue';
import DetailsSection from './components/DetailsSection.vue';
import TechStack from './components/TechStack.vue';
import Hobbies from './components/Hobbies.vue';
import Testimonials from './components/Testimonials.vue';
import UserDetailsForm from './components/UserDetailsForm.vue'; // Import the new UserDetailsForm component

// Set up default and fallback profile images
const profilePhotoUrl = ref(import.meta.env.BASE_URL + 'Sri.jpg');
const defaultAvatar = import.meta.env.BASE_URL + 'SS.svg';
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

// Helper: get current theme name
function getThemeName() {
  return theme.global.name.value;
}

// Persist dark mode preference in localStorage and always use correct theme names
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && savedTheme !== getThemeName()) {
    theme.global.name.value = savedTheme;
  }
});
function toggleDark() {
  // Always toggle between 'lightCustom' and 'darkCustom'
  const current = getThemeName();
  const newTheme = current === 'darkCustom' ? 'lightCustom' : 'darkCustom';
  theme.global.name.value = newTheme;
  localStorage.setItem('theme', newTheme);
}

// Social/contact icons for quick access
const socials = [
  { icon: 'mdi-linkedin', url: 'https://linkedin.com/in/srisri-t' },
  { icon: 'mdi-github', url: 'https://github.com/srisri.tummu' },
  { icon: 'mdi-email', url: 'mailto:srisri.tummu@email.com' },
  { icon: 'mdi-phone', url: 'tel:+91 9493034647' },
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

// Add experience data for LinkedIn-style cards
const experience = [
  {
    role: 'QA Lead',
    company: 'XTG Global',
    companyUrl: 'https://www.linkedin.com/company/125813/',
    logo: 'https://media.licdn.com/dms/image/v2/C510BAQEGz07DWukwPg/company-logo_100_100/company-logo_100_100/0/1631391152139?e=1754524800&v=beta&t=h22JunOkj4cXotQezLGp4K1oiqHAgZt6AtHvKVAtwoo',
    years: '2021 – Present',
    location: 'Visakhapatnam, Andhra Pradesh, India',
    description: `Leading QA for multiple projects. Responsible for test strategy, planning, execution, and mentoring team members. Hands-on with Selenium, JMeter, and more.`,
    skills: ['Team Leadership', 'Selenium WebDriver', 'JMeter', 'Mentoring']
  },
  {
    role: 'Senior QA Engineer',
    company: 'Kairos Technologies',
    companyUrl: 'https://www.linkedin.com/company/2424695/',
    logo: 'https://media.licdn.com/dms/image/v2/D560BAQFP7NsugdCKhw/company-logo_100_100/company-logo_100_100/0/1720520606169/kairos_technologies_inc_logo?e=1754524800&v=beta&t=exH6s3kwRLPkyWj8rZWFk2FZixoZqCTDii3vx_xjCw0',
    years: '2017 – 2021',
    location: 'Vishakhapatnam, Andhra Pradesh, India',
    description: `Worked as a QA lead, handling the team with responsibilities like test planning, execution, and reporting. Experience in JIRA, Selenium, and Agile methodologies.`,
    skills: ['JIRA', 'Agile', 'Test Planning', 'Selenium']
  },
  {
    role: 'QA Engineer',
    company: 'Amzur Technologies',
    companyUrl: 'https://www.linkedin.com/company/324525/',
    logo: 'https://media.licdn.com/dms/image/v2/C560BAQH7VJOWkDPE4A/company-logo_100_100/company-logo_100_100/0/1658212500041/amzur_technologies_inc_logo?e=1754524800&v=beta&t=CoMQYiU3yIJSvYzL9D_K831wGjFfHLW2u29WyseCOic',
    years: '2013 – 2017',
    location: 'Andhra Pradesh, India',
    description: `Manual and automation testing for web and mobile apps. Involved in test case design, execution, and client demos.`,
    skills: ['Manual Testing', 'Automation', 'Client Demos']
  },
  {
    role: 'Software Test Engineer / QA Team Lead',
    company: 'Yalamanchili Software Exports Ltd',
    companyUrl: 'https://www.linkedin.com/company/1636530/',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQFG3gOyrmQHEg/company-logo_100_100/company-logo_100_100/0/1724814316421?e=1754524800&v=beta&t=BPs1qh956ViD9pzVMJycwtaYzR7wMjwbfdEO8wjAEWw',
    years: 'Oct 2014 – Jan 2018',
    location: 'Andhra Pradesh, India',
    description: `Worked as a QA Team Lead in Banking Domain Product by leading 3 members on 22 projects for quality assurance. Conducted QC on TM’s, TC’s and executed cases. Circulated QC reports on daily and weekly basis with graphs to depict application quality parameters.

Worked as a team member responsible for Manual Testing for all projects of Euro base and Indian Base versions of Prepaid Application.

Designed Test Strategy, Test Plan documents, Test Scenarios, Test Cases and executed them based on user stories/requirements, use cases, business, and technical requirements. Acted as a point of contact for functional, integration, and user acceptance testing.

Executed testing to get user stories done in close collaboration with all agile team members. Involved in Sanity, Smoke, Functionality, Interaction, Regression Testing, UAT, and Cross-browser testing.

Organized task allocation, monitored and controlled scheduled completion of tasks. Prepared Traceability Matrix, Daily Status Reports, and Test Result Summary Reports.

Experience in Testing Web and Windows Applications. Handled Client Demonstrations of the Applications Tested. Published Test Results as per Release Calendar.`,
    skills: [
      'QA Leadership',
      'Banking Domain',
      'Manual Testing',
      'Test Strategy',
      'Test Planning',
      'Test Case Design',
      'Agile Collaboration',
      'Sanity/Smoke/Regression/UAT',
      'Traceability Matrix',
      'Reporting',
      'Client Demos',
      'Workload Prioritization',
      'Test Execution'
    ]
  }
];

// Expand/collapse logic for work experience descriptions
import { reactive } from 'vue';
const expandedJobs = reactive({});
function isLongDescription(desc) {
  // Consider long if more than 120 chars or 2 lines (approx)
  return desc && desc.length > 120;
}
function toggleExpand(idx) {
  expandedJobs[idx] = !expandedJobs[idx];
}

// Add state for expanded/collapsed descriptions
const expandedDescriptions = ref({});

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
        <v-btn icon class="global-dark-toggle" @click="toggleDark" aria-label="Toggle dark mode" role="button">
          <v-icon :color="isDark ? '#fff' : 'primary'" size="32" aria-label="Theme icon" role="img">
            {{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
          </v-icon>
        </v-btn>
      </div>
      <!-- Hero Section: Profile, counters, resume, social links -->
      <HeroCard
        :profilePhotoUrl="profilePhotoUrl"
        :onImgError="onImgError"
        name="Sri Sri Tummu"
        title="QA Lead | Automation Specialist | Mentor"
        description="Transforming ideas into realities, creating interfaces that inspire and engage users dreams."
        :expYears="expYears"
        :projects="projects"
        :clients="clients"
        :socials="socials"
        :resumeUrl="resumeUrl"
      />

      <!-- What do I help? -->
      <DetailsSection icon="mdi-help-circle" title="What do I help?">
        I help teams deliver high-quality software through robust QA processes, automation, and mentoring.
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
        <div class="work-experience-list">
          <div v-for="(job, idx) in experience" :key="job.company + job.role" class="work-item linkedin-style animate-section">
            <v-avatar size="56" class="work-logo mr-4">
              <img :src="job.logo" :alt="job.company + ' logo'" />
            </v-avatar>
            <div class="work-details">
              <div class="work-role-company-row">
                <div class="work-role-company">
                  <span class="work-role">{{ job.role }}</span>
                  <a :href="job.companyUrl" class="work-company" target="_blank" rel="noopener">{{ job.company }}</a>
                </div>
                <div class="work-years-location">
                  <span class="work-years">{{ job.years }}</span>
                  <span class="work-location">&bull; {{ job.location }}</span>
                </div>
              </div>
              <div class="work-description" :class="{ collapsed: isLongDescription(job.description) && !expandedJobs[idx], 'scrollable-desc': expandedJobs[idx] && isLongDescription(job.description) }">
                <template v-if="!isLongDescription(job.description)">
                  {{ job.description }}
                </template>
                <template v-else>
                  <div :class="['work-desc-flex', { 'single-line-desc': !expandedJobs[idx] }]">
                    <span class="desc-text" v-if="!expandedJobs[idx]">
                      {{ job.description.split('\n').join(' ').slice(0, 80) }}<span v-if="job.description.length > 80">... </span>
                    </span>
                    <span v-else class="desc-text-multiline">
                      <span v-for="(line, i) in job.description.split('\n')" :key="i">
                        {{ line }}<br v-if="i < job.description.split('\n').length - 1" />
                      </span>
                    </span>
                    <v-btn v-if="!expandedJobs[idx]" text small color="primary" class="show-more-btn" @click="toggleExpand(idx)">
                      Show more
                    </v-btn>
                    <v-btn v-if="expandedJobs[idx]" text small color="primary" class="show-more-btn" @click="toggleExpand(idx)">
                      Show less
                    </v-btn>
                  </div>
                </template>
              </div>
              <div class="work-skills">
                <v-tooltip v-for="skill in job.skills" :key="skill" location="top" open-delay="200">
                  <template #activator="{ props }">
                    <v-chip v-bind="props" color="primary" class="work-skill-chip" size="small">{{ skill }}</v-chip>
                  </template>
                  <span>Skill: {{ skill }}</span>
                </v-tooltip>
              </div>
            </div>
          </div>
        </div>
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

      <!-- User Details CTA & Form Section -->
      <div class="main-card animate-section user-details-cta-card">
        <div class="cta-header">
          <v-icon color="primary" size="32" class="mr-2">mdi-account-plus</v-icon>
          <span class="cta-title">Get Your Own Portfolio</span>
        </div>
        <div class="cta-desc">Share your details and get a stunning portfolio like this!</div>
        <UserDetailsForm />
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
        <v-btn v-if="showScrollTop" class="scroll-top-btn" color="primary" icon @click="scrollToTop" aria-label="Scroll to top" tabindex="0" role="button">
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

/* --- Light Mode: Rich Yellow Background, No Gradient --- */
body, #app, .v-application {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-size: 1.15rem;
  color: #185a9d;
  background: #ffe066; /* Rich yellow, no gradient */
}
.main-card, .details-section, .testimonial-card, .hero-section {
  background: #fffbe6; /* Soft off-white for contrast on yellow */
  color: #185a9d;
  border: 1.5px solid #185a9d;
  box-shadow: 0 4px 24px rgba(24,90,157,0.10), 0 2px 12px rgba(249,248,113,0.08);
}
.hero-title, .details-section .section-title {
  color: #185a9d;
  background: none;
}
.counter .count, .resume-btn, .testimonial-title {
  color: #f9c846;
}
.resume-btn {
  background: #185a9d;
  color: #fff;
}
.resume-btn:hover {
  background: #ffe066;
  color: #185a9d;
}
.social-link {
  background: #185a9d;
  color: #fff;
  transition: background 0.2s, color 0.2s;
}
.social-link:hover {
  background: #ffe066;
  color: #185a9d;
}
.site-footer {
  color: #185a9d;
}
.site-footer a {
  color: #232b36;
}

/* --- Dark Mode: Navy Blue, Deep Black, White Text --- */
.v-application.theme--dark, .v-application--is-lt-dark, body.dark, #app.dark {
  color: #fff;
  background: #10131a; /* Deep black/navy */
}
.v-application.theme--dark .main-card,
.v-application.theme--dark .details-section,
.v-application.theme--dark .testimonial-card,
.v-application.theme--dark .hero-section,
.v-application--is-lt-dark .main-card,
.v-application--is-lt-dark .details-section,
.v-application--is-lt-dark .testimonial-card,
.v-application--is-lt-dark .hero-section {
  background: #18213a; /* Rich navy blue */
  color: #fff;
  border: 1.5px solid #fff;
  box-shadow: 0 4px 24px rgba(24,90,157,0.18);
}
.v-application.theme--dark .hero-title,
.v-application.theme--dark .details-section .section-title,
.v-application--is-lt-dark .hero-title,
.v-application--is-lt-dark .details-section .section-title {
  color: #fff;
  background: none;
}
.v-application.theme--dark .counter .count,
.v-application.theme--dark .resume-btn,
.v-application.theme--dark .testimonial-title,
.v-application--is-lt-dark .counter .count,
.v-application--is-lt-dark .resume-btn,
.v-application--is-lt-dark .testimonial-title {
  color: #43cea2;
}
.v-application.theme--dark .resume-btn,
.v-application--is-lt-dark .resume-btn {
  background: #fff;
  color: #18213a;
}
.v-application.theme--dark .resume-btn:hover,
.v-application--is-lt-dark .resume-btn:hover {
  background: #232b36;
  color: #fff;
}
.v-application.theme--dark .social-link,
.v-application--is-lt-dark .social-link {
  background: #fff;
  color: #18213a;
}
.v-application.theme--dark .social-link:hover,
.v-application--is-lt-dark .social-link:hover {
  background: #232b36;
  color: #fff;
}
.v-application.theme--dark .site-footer,
.v-application--is-lt-dark .site-footer {
  color: #fff;
}
.v-application.theme--dark .site-footer a,
.v-application--is-lt-dark .site-footer a {
  color: #fff;
}

/* --- Remove conflicting glassmorphism and legacy backgrounds for .details-section and .testimonial-card --- */
/* Remove this block to prevent override and disappearance */
/* .main-card, .details-section, .testimonial-card, .hero-section {
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  background: rgba(255, 255, 255, 0.55) !important;
  box-shadow: 0 8px 40px 0 rgba(67,206,162,0.18), 0 2px 12px rgba(36,36,122,0.08);
  border: 1.5px solid rgba(227,242,253,0.55);
}
.v-application.theme--dark .main-card,
.v-application.theme--dark .details-section,
.v-application.theme--dark .testimonial-card,
.v-application.theme--dark .hero-section,
.v-application--is-lt-dark .main-card,
.v-application--is-lt-dark .details-section,
.v-application--is-lt-dark .testimonial-card,
.v-application--is-lt-dark .hero-section {
  background: rgba(35, 43, 54, 0.65) !important;
  box-shadow: 0 8px 40px 0 rgba(67,206,162,0.22), 0 2px 12px rgba(36,36,122,0.13);
  border: 1.5px solid rgba(67,206,162,0.32);
} */

/* --- Parallax Effect for Hero Section --- */
.hero-section {
  background: linear-gradient(120deg, #fffdfa 0%, #f6f5f2 60%, #f7e7c4 100%);
  color: #232b36;
  border-radius: 48px 48px 120px 120px;
  box-shadow: 0 8px 32px rgba(67,206,162,0.10), 0 2px 12px rgba(36, 36, 122, 0.06);
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
  border: 1.5px solid #ece9e6;
}
@media (max-width: 700px) {
  .hero-section {
    background-attachment: scroll;
    padding: 18px 0 8px 0;
    max-width: 99vw;
    border-radius: 20px 20px 60px 60px;
  }
}
.v-application.theme--dark .hero-section,
.v-application--is-lt-dark .hero-section {
  background: linear-gradient(120deg, #232b36 0%, #232b36 60%, #2d2d2d 100%);
  color: #ffe082;
  border: 1.5px solid #3a3a3a;
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

/* --- Section Card Spacing & Alignment --- */
.details-section, .testimonial-card {
  position: relative;
  /* Remove background here to prevent override */
  background: unset;
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(67,206,162,0.10), 0 2px 12px rgba(36,36,122,0.06);
  padding: 32px 28px 24px 28px; /* Slightly reduced for balance */
  margin: 32px auto 0 auto; /* Consistent top margin, no double spacing */
  max-width: 760px;
  width: 100%;
  color: #232b36;
  border: 1.5px solid #e3f2fd;
  transition: box-shadow 0.3s, background 0.3s, color 0.3s;
  overflow: hidden;
}
.details-section::before, .testimonial-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  opacity: 0.18;
  pointer-events: none;
}
.details-section > *, .testimonial-card > * {
  position: relative;
  z-index: 1;
}
.v-application.theme--dark .details-section,
.v-application.theme--dark .testimonial-card,
.v-application--is-lt-dark .details-section,
.v-application--is-lt-dark .testimonial-card {
  background: unset;
  color: #f9f871;
  border: 1.5px solid #43cea2;
}

/* --- Enhanced LinkedIn-Style Work Experience --- */
.linkedin-style {
  display: flex;
  align-items: flex-start;
  background: #f5fafd;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(67,206,162,0.10), 0 2px 8px rgba(67,206,162,0.08);
  padding: 28px 36px 24px 18px;
  gap: 24px;
  border: 1.5px solid #e3f2fd;
  margin-bottom: 22px;
  position: relative;
  transition: box-shadow 0.22s, background 0.22s, border 0.22s;
  overflow: visible;
}
.linkedin-style::before {
  content: '';
  position: absolute;
  left: 0; top: 18px; bottom: 18px;
  width: 5px;
  border-radius: 8px;
  background: linear-gradient(180deg, #43cea2 0%, #185a9d 100%);
  opacity: 0.18;
  transition: opacity 0.2s;
}
.linkedin-style:hover {
  background: #e3f2fd;
  box-shadow: 0 8px 32px rgba(67,206,162,0.16);
  border-color: #43cea2;
}
.linkedin-style:active {
  box-shadow: 0 2px 8px rgba(67,206,162,0.18);
  background: #d0e7fa;
}
.work-logo img {
  border-radius: 12px;
  background: #fff;
  border: 1.5px solid #e3f2fd;
  width: 56px;
  height: 56px;
  object-fit: contain;
  box-shadow: 0 2px 8px rgba(67,206,162,0.10);
  filter: grayscale(1) contrast(1.1);
  transition: filter 0.35s cubic-bezier(.4,2,.6,1);
}
.linkedin-style:hover .work-logo img {
  filter: grayscale(0) contrast(1.1);
}
.work-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.work-role-company-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px 18px;
  margin-bottom: 2px;
  border-bottom: 1.5px dashed #e3f2fd;
  padding-bottom: 2px;
}
.work-role-company {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.18rem;
  font-weight: 700;
  color: #185a9d;
}
.work-years-location {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.04rem;
  color: #43cea2;
  font-weight: 600;
  background: #e3f2fd;
  border-radius: 8px;
  padding: 2px 12px 2px 10px;
  margin-bottom: 0;
  margin-top: 2px;
  box-shadow: 0 1px 4px rgba(67,206,162,0.07);
}
.work-location {
  color: #232b36;
  font-weight: 400;
  margin-left: 8px;
}
.work-description {
  font-size: 1.08rem;
  color: #232b36;
  margin-bottom: 4px;
  margin-top: 10px;
  line-height: 1.7;
  background: #fafdff;
  border-radius: 8px;
  padding: 10px 16px 10px 12px;
  box-shadow: 0 1px 4px rgba(67,206,162,0.06);
  border: 1px solid #e3f2fd;
  text-align: left;
  /* Add for smooth expand/collapse */
  overflow: hidden;
  transition: max-height 0.45s cubic-bezier(.4,2,.6,1), padding 0.3s, background 0.2s;
  max-height: 400px;
}
.work-description.collapsed {
  max-height: 60px;
  padding-bottom: 0;
}
.work-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
}
.work-skill-chip {
  font-size: 0.98rem;
  font-weight: 500;
  border-radius: 8px;
  background: #e3f2fd;
  color: #185a9d;
  box-shadow: 0 1px 4px rgba(67,206,162,0.07);
  margin-bottom: 2px;
}
@media (max-width: 900px) {
  .linkedin-style {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 16px 8px 12px 6px;
  }
  .work-logo img {
    width: 44px;
    height: 44px;
  }
  .work-role-company-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding-bottom: 0;
    border-bottom: none;
  }
  .work-years-location {
    margin-top: 0;
    margin-bottom: 2px;
    padding: 2px 8px 2px 8px;
  }
  .work-description {
    margin-top: 6px;
    padding: 8px 8px 8px 8px;
  }
}

/* --- Footer Spacing & Readability --- */
.site-footer {
  margin: 48px auto 0 auto;
  padding: 18px 0 8px 0;
  text-align: center;
  font-size: 1.05rem;
  color: #185a9d; /* Changed from #185a9d to #232b36 for better contrast */
  opacity: 0.92;
}
.v-application.theme--dark .site-footer,
.v-application--is-lt-dark .site-footer {
  color: #ffe082; /* Changed from #f9f871 to #ffe082 for better dark contrast */
  opacity: 0.82;
}

/* --- Section Divider Spacing --- */
.section-divider {
  margin: 40px auto 0 auto;
  max-width: 760px;
  border: none;
  border-top: 1.5px solid #e3f2fd;
  opacity: 0.7;
}
.v-application.theme--dark .section-divider,
.v-application--is-lt-dark .section-divider {
  border-top: 1.5px solid #43cea2;
  opacity: 0.5;
}

/* --- Headings & Font Consistency --- */
.details-section .section-title,
.hero-title {
  font-size: 2.1rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: #185a9d;
  letter-spacing: -1px;
  text-align: center;
}
.v-application.theme--dark .details-section .section-title,
.v-application.theme--dark .hero-title,
.v-application--is-lt-dark .details-section .section-title,
.v-application--is-lt-dark .hero-title {
  color: #f9f871;
}

.details-section ul, .details-section ol {
  margin: 0 0 0 1.2em;
  padding: 0;
  font-size: 1.08rem;
  color: #232b36;
}
.v-application.theme--dark .details-section ul,
.v-application.theme--dark .details-section ol,
.v-application--is-lt-dark .details-section ul,
.v-application--is-lt-dark .details-section ol {
  color: #f9f871;
}

/* --- Responsive Adjustments --- */
@media (max-width: 700px) {
  .details-section, .testimonial-card {
    padding: 14px 3vw 10px 3vw;
    margin: 18px auto 0 auto;
    max-width: 99vw;
    border-radius: 14px;
  }
  .section-divider {
    margin: 24px auto 0 auto;
    max-width: 99vw;
  }
  .details-section .section-title,
  .hero-title {
    font-size: 1.25rem;
    margin-bottom: 8px;
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
  background: linear-gradient(135deg, #185a9d 0%, #f9f871 100%);
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
  background: linear-gradient(135deg, #f9f871 0%, #185a9d 100%);
  color: #185a9d;
  transform: scale(1.18);
}

/* --- Modern Section Card Styles (Optimized for Consistent Dark/Light Mode) --- */
.details-section, .testimonial-card {
  position: relative;
  /* Remove background here to prevent override */
  background: unset;
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(67,206,162,0.10), 0 2px 12px rgba(36,36,122,0.06);
  padding: 32px 28px 24px 28px; /* Slightly reduced for balance */
  margin: 32px auto 0 auto; /* Consistent top margin, no double spacing */
  max-width: 760px;
  width: 100%;
  color: #232b36;
  border: 1.5px solid #e3f2fd;
  transition: box-shadow 0.3s, background 0.3s, color 0.3s;
  overflow: hidden;
}
.details-section::before, .testimonial-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  opacity: 0.18;
  pointer-events: none;
}
.details-section > *, .testimonial-card > * {
  position: relative;
  z-index: 1;
}
.v-application.theme--dark .details-section,
.v-application.theme--dark .testimonial-card,
.v-application--is-lt-dark .details-section,
.v-application--is-lt-dark .testimonial-card {
  background: unset;
  color: #f9f871;
  border: 1.5px solid #43cea2;
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
  color: #185a9d;
  font-size: 1.4rem;
}
.tech-item:hover, .hobby-item:hover {
  background: #185a9d;
  color: #fff;
  box-shadow: 0 4px 16px rgba(67,206,162,0.16);
}
.tech-item:hover .v-icon, .hobby-item:hover .v-icon {
  color: #fff !important;
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
  background: linear-gradient(120deg, #fffdfa 0%, #e3f2fd 60%, #e0c3fc 100%, #8ec5fc 100%),
              linear-gradient(120deg, rgba(164, 120, 255, 0.18) 0%, rgba(142,197,252,0.13) 100%);
  background-blend-mode: lighten, normal;
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
  color: #185a9d;
  font-weight: 500;
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
    padding: 14px 3vw 10px 3vw;
    margin: 18px auto 0 auto;
    max-width: 99vw;
    border-radius: 14px;
  }
  .section-divider {
    margin: 24px auto 0 auto;
    max-width: 99vw;
  }
  .details-section .section-title,
  .hero-title {
    font-size: 1.25rem;
    margin-bottom: 8px;
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
.global-dark-toggle-wrapper {
  position: fixed;
  top: 32px;
  right: 24px;
  z-index: 1000;
  pointer-events: none;
}
@media (max-width: 700px) {
  .global-dark-toggle-wrapper {
    top: 10px;
    right: 10px;
  }
}

/* --- New User Details CTA Card Styles --- */
.user-details-cta-card {
  background: #e8f5e9;
  border: 1.5px solid #43cea2;
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(67,206,162,0.10), 0 2px 12px rgba(36,36,122,0.06);
  padding: 32px 28px;
  margin: 32px auto;
  max-width: 1250px;
  width: 100%;
  color: #185a9d;
  position: relative;
  overflow: hidden;
}
.user-details-cta-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  opacity: 0.12;
  pointer-events: none;
}
.user-details-cta-card > * {
  position: relative;
  z-index: 1;
}
.cta-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 8px;
  color: #185a9d;
}
.cta-desc {
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: #185a9d;
}

/* --- Override specific component styles for consistency --- */
.v-application .v-card {
  border-radius: 32px;
}
.v-application .v-btn {
  border-radius: 16px;
}
.v-application .v-icon {
  transition: transform 0.2s;
}
.v-application .v-icon:hover {
  transform: scale(1.1);
}
.work-experience-list {
  background: linear-gradient(120deg, #fafdff 0%, #e3f2fd 100%);
  border-radius: 24px;
  padding: 24px 12px 8px 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 12px rgba(67,206,162,0.07);
}
@media (max-width: 900px) {
  .work-experience-list {
    padding: 10px 2vw 2px 2vw;
    border-radius: 12px;
  }
}

.work-desc-flex {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  /* Prevent chip from being cropped by description border */
  flex-wrap: wrap;
}
.show-more-btn {
  font-size: 0.98rem;
  font-weight: 600;
  text-transform: none;
  min-width: 0;
  padding: 0 6px;
  margin-left: 8px;
  vertical-align: baseline;
  align-self: flex-start;
  background: #e3f2fd;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(67,206,162,0.07);
  transition: background 0.18s, color 0.18s;
  /* Add to prevent cropping */
  position: relative;
  z-index: 2;
}

/* --- Ensure single-line description and 'Show more' chip are on the same line, with ellipsis and no wrapping --- */
.single-line-desc {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.single-line-desc .desc-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80vw;
  display: inline-block;
}
.desc-text-multiline {
  white-space: pre-line;
  word-break: break-word;
  display: block;
  max-width: 100%;
}

/* Add scrollable description style */
.scrollable-desc {
  max-height: 260px !important;
  overflow-y: auto !important;
  padding-right: 18px;
  /* Show a subtle shadow at the bottom when scrollable */
  box-shadow: 0 6px 18px -8px rgba(24,90,157,0.10) inset;
}
.scrollable-desc::-webkit-scrollbar {
  width: 8px;
  background: #e3f2fd;
  border-radius: 8px;
}
.scrollable-desc::-webkit-scrollbar-thumb {
  background: #b3e5fc;
  border-radius: 8px;
}
.v-application.theme--dark .scrollable-desc {
  background: #232b36;
  box-shadow: 0 6px 18px -8px rgba(67,206,162,0.13) inset;
}
</style>
