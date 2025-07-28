<template>
  <div class="portfolio-view">
    <!-- Modern Navigation -->
    <ModernNavigation :enableAnimations="shouldEnableAnimations" />

    <!-- Theme Switcher -->
    <div class="global-theme-switcher-wrapper">
      <ThemeSwitcher />
    </div>

    <!-- Hero Section: Profile, counters, resume, social links -->
    <section id="hero" v-motion="shouldEnableAnimations ? 'fadeIn' : null">
      <PremiumHeroSection
        :profile="profileData"
        :stats="statsData"
        :actions="actionsData"
        :social="socialData"
        theme="gradient"
        layout="centered"
        :animations-enabled="shouldEnableAnimations"
        class="transition-transform hover-lift"
      />
    </section>

    <!-- What I Help Section -->
    <section
      id="about"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <WhatIHelp :enableAnimations="shouldEnableAnimations" />
    </section>

    <!-- Professional Summary -->
    <section
      id="professional-summary"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <ProfessionalSummary :enableAnimations="shouldEnableAnimations" />
    </section>

    <!-- Technical Skills -->
    <section
      id="skills"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <SkillsSection :skills="techStack" :shouldAnimate="shouldEnableAnimations" />
    </section>

    <!-- Achievements -->
    <section
      id="achievements"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <Achievements :enableAnimations="shouldEnableAnimations" />
    </section>

    <!-- Work Experience -->
    <section
      id="experience"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <WorkExperience :experiences="experience" :shouldAnimate="shouldEnableAnimations" />
    </section>

    <!-- Education -->
    <section
      id="education"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <Education :enableAnimations="shouldEnableAnimations" />
    </section>

    <!-- Co-Curricular Activities -->
    <section
      id="cocurricular"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <CoCurricularActivities :enableAnimations="shouldEnableAnimations" />
    </section>

    <!-- Hobbies & Interests -->
    <section
      id="hobbies"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <HobbiesInterests :enableAnimations="shouldEnableAnimations" />
    </section>

    <!-- Personal Profile -->
    <section
      id="personal-profile"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <PersonalProfile :enableAnimations="shouldEnableAnimations" />
    </section>

    <!-- Testimonials Carousel -->
    <section
      id="testimonials"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <div class="main-card card-hover">
        <Testimonials
          :testimonials="testimonials"
          :testimonialIndex="testimonialIndex"
          :nextTestimonial="nextTestimonial"
          :prevTestimonial="prevTestimonial"
          :enableAnimations="shouldEnableAnimations"
        />
      </div>
    </section>

    <!-- User Details CTA & Form Section -->
    <section
      id="contact"
      v-motion="shouldEnableAnimations ? 'slideInUp' : null"
      class="section-wrapper"
    >
      <div class="main-card card-hover user-details-cta-card">
        <div class="cta-header">
          <v-icon
            color="primary"
            size="32"
            class="mr-2 transition-transform"
            :class="{ 'animate-pulse': shouldEnableAnimations }"
            >mdi-account-plus</v-icon
          >
          <span class="cta-title">Get Your Own Portfolio</span>
        </div>
        <div class="cta-desc">Share your details and get a stunning portfolio like this!</div>
        <UserDetailsForm :enableAnimations="shouldEnableAnimations" />
      </div>
    </section>

    <!-- Section Divider -->
    <hr class="section-divider" />

    <!-- Footer -->
    <footer class="site-footer">
      &copy; {{ new Date().getFullYear() }} Sri Sri Tummu &mdash; All rights reserved.<br />
      <span style="font-size: 0.95em"
        >Connect:
        <a href="mailto:srisri.tummu@email.com" style="color: #185a9d"
          >srisri.tummu@email.com</a
        ></span
      >
    </footer>

    <!-- Scroll to Top Button -->
    <transition name="fade">
      <v-btn
        v-if="showScrollTop"
        class="scroll-top-btn"
        color="primary"
        icon
        @click="scrollToTop"
        aria-label="Scroll to top"
        tabindex="0"
        role="button"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </transition>

    <!-- Animation Settings Button -->
    <AnimationSettings />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUIStore } from '@/stores/ui'
import PremiumHeroSection from '@/components/premium/PremiumHeroSection.vue'
import WorkExperience from '@/components/portfolio/WorkExperience.vue'
import SkillsSection from '@/components/portfolio/SkillsSection.vue'
import WhatIHelp from '@/components/portfolio/WhatIHelp.vue'
import ProfessionalSummary from '@/components/portfolio/ProfessionalSummary.vue'
import Achievements from '@/components/portfolio/Achievements.vue'
import Education from '@/components/portfolio/Education.vue'
import CoCurricularActivities from '@/components/portfolio/CoCurricularActivities.vue'
import HobbiesInterests from '@/components/portfolio/HobbiesInterests.vue'
import PersonalProfile from '@/components/portfolio/PersonalProfile.vue'
import Testimonials from '@/components/Testimonials.vue'
import UserDetailsForm from '@/components/UserDetailsForm.vue'
import AnimationSettings from '@/components/common/AnimationSettings.vue'
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'
import ModernNavigation from '@/components/common/ModernNavigation.vue'

const uiStore = useUIStore()

// Animation settings
const shouldEnableAnimations = computed(() => uiStore.shouldEnableAnimations)

// Set up default and fallback profile images
const profilePhotoUrl = ref(import.meta.env.BASE_URL + 'Sri.jpg')

// Animated counters for experience, projects, and clients
const expYears = ref(0)
const projects = ref(0)
const clients = ref(0)
function animateCounter(refVar, target, duration = 1200) {
  let start = 0
  const step = Math.ceil(target / (duration / 16))
  const interval = setInterval(() => {
    start += step
    if (start >= target) {
      refVar.value = target
      clearInterval(interval)
    } else {
      refVar.value = start
    }
  }, 16)
}

onMounted(() => {
  animateCounter(expYears, 10)
  animateCounter(projects, 285)
  animateCounter(clients, 190)
})

// Scroll to top button logic
const showScrollTop = ref(false)
function handleScroll() {
  showScrollTop.value = window.scrollY > 200
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Theme system is now handled by ThemeSwitcher component

// Note: Social links are now handled by socialData for the premium hero section

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
]
const testimonialIndex = ref(0)
function nextTestimonial() {
  testimonialIndex.value = (testimonialIndex.value + 1) % testimonials.length
}
function prevTestimonial() {
  testimonialIndex.value = (testimonialIndex.value - 1 + testimonials.length) % testimonials.length
}
onMounted(() => {})

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
]
// Note: hobbies data moved to HobbiesInterests component

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
    skills: ['Team Leadership', 'Selenium WebDriver', 'JMeter', 'Mentoring'],
  },
  {
    role: 'Senior QA Engineer',
    company: 'Kairos Technologies',
    companyUrl: 'https://www.linkedin.com/company/2424695/',
    logo: 'https://media.licdn.com/dms/image/v2/D560BAQFP7NsugdCKhw/company-logo_100_100/company-logo_100_100/0/1720520606169/kairos_technologies_inc_logo?e=1754524800&v=beta&t=exH6s3kwRLPkyWj8rZWFk2FZixoZqCTDii3vx_xjCw0',
    years: '2017 – 2021',
    location: 'Vishakhapatnam, Andhra Pradesh, India',
    description: `Worked as a QA lead, handling the team with responsibilities like test planning, execution, and reporting. Experience in JIRA, Selenium, and Agile methodologies.`,
    skills: ['JIRA', 'Agile', 'Test Planning', 'Selenium'],
  },
  {
    role: 'QA Engineer',
    company: 'Amzur Technologies',
    companyUrl: 'https://www.linkedin.com/company/324525/',
    logo: 'https://media.licdn.com/dms/image/v2/C560BAQH7VJOWkDPE4A/company-logo_100_100/company-logo_100_100/0/1658212500041/amzur_technologies_inc_logo?e=1754524800&v=beta&t=CoMQYiU3yIJSvYzL9D_K831wGjFfHLW2u29WyseCOic',
    years: '2013 – 2017',
    location: 'Andhra Pradesh, India',
    description: `Manual and automation testing for web and mobile apps. Involved in test case design, execution, and client demos.`,
    skills: ['Manual Testing', 'Automation', 'Client Demos'],
  },
  {
    role: 'Software Test Engineer / QA Team Lead',
    company: 'Yalamanchili Software Exports Ltd',
    companyUrl: 'https://www.linkedin.com/company/1636530/',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQFG3gOyrmQHEg/company-logo_100_100/company-logo_100_100/0/1724814316421?e=1754524800&v=beta&t=BPs1qh956ViD9pzVMJycwtaYzR7wMjwbfdEO8wjAEWw',
    years: 'Oct 2014 – Jan 2018',
    location: 'Andhra Pradesh, India',
    description: `Worked as a QA Team Lead in Banking Domain Product by leading 3 members on 22 projects for quality assurance. Conducted QC on TM's, TC's and executed cases. Circulated QC reports on daily and weekly basis with graphs to depict application quality parameters.

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
      'Test Execution',
    ],
  },
]

// Expand/collapse logic for work experience descriptions (handled in WorkExperience component)

// Resume download URL (placed in public/ for static serving)
const resumeUrl = import.meta.env.BASE_URL + 'resume.pdf'

// Premium Hero Section Data Structure
const profileData = ref({
  name: 'Sri Sri Tummu',
  title: 'QA Lead | Automation Specialist | Mentor',
  description:
    'Passionate about delivering high-quality software through comprehensive testing strategies, automation frameworks, and continuous improvement. Experienced in leading QA teams and implementing robust testing processes.',
  imageUrl: profilePhotoUrl.value,
  location: 'Hyderabad, India',
  status: 'available',
  skills: [
    'Test Automation',
    'Quality Assurance',
    'Selenium WebDriver',
    'Team Leadership',
    'API Testing',
    'Performance Testing',
    'CI/CD Integration',
    'Test Strategy',
  ],
})

const statsData = ref({
  experience: 10,
  projects: 285,
  clients: 190,
  satisfaction: 98,
})

const actionsData = ref({
  primaryCTA: {
    label: 'Download Resume',
    icon: 'mdi-download',
    action: () => {
      const link = document.createElement('a')
      link.href = resumeUrl
      link.download = 'Sri_Sri_Tummu_Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  },
  secondaryCTA: {
    label: 'Contact Me',
    icon: 'mdi-email',
    action: () => {
      const contactSection = document.querySelector('#contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
  resumeUrl: resumeUrl,
})

const socialData = ref([
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/srisri-t',
    icon: 'mdi-linkedin',
  },
  {
    platform: 'github',
    url: 'https://github.com/srisri.tummu',
    icon: 'mdi-github',
  },
  {
    platform: 'email',
    url: 'mailto:srisri.tummu@email.com',
    icon: 'mdi-email',
  },
  {
    platform: 'phone',
    url: 'tel:+91 9493034647',
    icon: 'mdi-phone',
  },
])

// Animate sections on scroll for entrance effect
function animateOnScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view')
      observer.unobserve(entry.target)
    }
  })
}
onMounted(() => {
  const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.15 })
  document.querySelectorAll('.animate-section').forEach(el => observer.observe(el))
})
</script>

<style scoped>
/* Import the existing styles from App.vue */
@import '@/style.css';

/* Portfolio View Specific Styles */
.portfolio-view {
  padding-top: 70px;
  /* Account for fixed navigation */
}

/* Section spacing adjustments for navigation */
section {
  scroll-margin-top: 80px;
  /* Offset for smooth scrolling */
}

/* Adjust theme switcher position to not conflict with navigation */
.global-theme-switcher-wrapper {
  top: 80px;
  /* Move below navigation */
  z-index: 999;
  /* Below navigation */
}

/* Section wrapper improvements */
.section-wrapper {
  margin-bottom: var(--space-8);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .portfolio-view {
    padding-top: 60px;
    /* Smaller navigation on mobile */
  }

  section {
    scroll-margin-top: 70px;
  }

  .global-theme-switcher-wrapper {
    top: 70px;
  }
}
</style>
