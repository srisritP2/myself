# Design Document

## Overview

The HeroCard component redesign focuses on creating a single, centered card layout that displays user profile information, key statistics, and interactive elements in a visually appealing and responsive manner. The design emphasizes clean typography, proper spacing, and seamless theme integration, particularly with the Creative Gradient theme's glassmorphism effects.

## Architecture

### Component Structure
```
HeroCard.vue
├── Template Layer
│   ├── hero-section (container)
│   └── hero-card (main card)
│       ├── profile-image
│       └── hero-content (wrapper div)
│           ├── hero-name (h2)
│           ├── hero-title (h3)
│           ├── hero-description (p)
│           ├── hero-counters
│           │   ├── counter (with icon, count, label)
│           │   ├── divider (|)
│           │   └── counter (repeated)
│           ├── resume-btn (v-btn with Vuetify structure)
│           ├── socials (button container)
│           └── bouncing-arrow
├── Script Layer (Vue 3 Composition API)
│   ├── Props definition
│   ├── Social link handlers
│   └── Utility functions
└── Style Layer
    ├── Base styling
    ├── Responsive design
    └── Theme-specific overrides
```

### Target HTML Structure
Based on the provided HTML, the component should render:
```html
<div class="card hero-card">
  <img src="/myself/Sri.jpg" alt="Sri Sri Tummu profile photo">
  <div> <!-- hero-content wrapper -->
    <h2>SriSri T</h2>
    <h3>QA Lead | Automation Specialist | Mentor</h3>
    <p>Transforming ideas into realities, creating interfaces that inspire and engage users dreams.</p>
    <div class="hero-counters">
      <div class="counter">
        <i class="mdi-timer mdi v-icon..."></i>
        <span class="count">10</span>
        <span class="label">Yrs of Experience</span>
      </div>
      <span class="divider">|</span>
      <!-- More counters... -->
    </div>
    <a class="v-btn v-btn--elevated..." href="/myself/resume.pdf" download>
      <span class="v-btn__content">
        <i class="mdi-download mdi v-icon..."></i>
        Download Resume
      </span>
    </a>
    <div class="socials">
      <button aria-label="Link to linkedin">
        <i class="mdi-linkedin mdi v-icon..."></i>
      </button>
      <!-- More social buttons... -->
    </div>
    <div class="bouncing-arrow">
      <i class="mdi-chevron-down mdi v-icon..."></i>
    </div>
  </div>
</div>
```

## Components and Interfaces

### Props Interface
```typescript
interface HeroCardProps {
  profilePhotoUrl: string;     // Profile image source
  onImgError: Function;        // Image error handler
  name: string;                // User's display name
  title: string;               // Professional title/role
  description: string;         // Brief description/tagline
  expYears: number;           // Years of experience
  projects: number;           // Number of projects delivered
  clients: number;            // Number of clients served
  socials: SocialLink[];      // Array of social media links
  resumeUrl: string;          // Resume download URL
}

interface SocialLink {
  icon: string;               // MDI icon name
  url: string;                // Link URL or contact info
}
```

### Visual Layout Structure

#### Card Container
- **Structure**: Single card with `.card.hero-card` classes
- **Layout**: Vertical flow with centered content
- **Image**: Profile image at top, outside the content wrapper
- **Content**: All text and interactive elements in content wrapper div

#### Content Hierarchy
1. **Profile Image**: Circular image at top of card
2. **Name**: h2 element with user's name
3. **Title**: h3 element with professional title
4. **Description**: p element with brief description
5. **Counters**: Horizontal row with icons, counts, and labels
6. **Resume Button**: Vuetify button with proper structure
7. **Social Links**: Row of icon buttons
8. **Bouncing Arrow**: Animated chevron at bottom

## Data Models

### Counter Configuration
```javascript
const counters = [
  {
    icon: 'mdi-timer',
    value: expYears,
    label: 'Yrs of Experience'
  },
  {
    icon: 'mdi-briefcase-variant',
    value: projects,
    label: 'Projects Delivered'
  },
  {
    icon: 'mdi-account-group',
    value: clients,
    label: 'Clients Served'
  }
]
```

### Social Link Configuration
```javascript
const socialLinks = [
  { icon: 'mdi-linkedin', url: 'https://linkedin.com/in/...', label: 'LinkedIn' },
  { icon: 'mdi-github', url: 'https://github.com/...', label: 'GitHub' },
  { icon: 'mdi-email', url: 'mailto:...', label: 'Email' },
  { icon: 'mdi-phone', url: 'tel:...', label: 'Phone' }
]
```

## Styling Architecture

### CSS Structure
The component uses a single-card centered layout:

```css
.hero-section {
  /* Container for centering */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-8) var(--space-4);
}

.hero-card {
  /* Main card styling */
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
}

.profile-image {
  /* Circular profile image */
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
}

.hero-counters {
  /* Horizontal counter layout */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
```

### Theme Integration

#### Creative Gradient Theme
```css
:root[data-theme='creative-gradient'] .hero-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

:root[data-theme='creative-gradient'] .hero-name {
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

### Responsive Design
```css
@media (max-width: 768px) {
  .profile-image {
    width: 120px;
    height: 120px;
  }
  
  .hero-counters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .divider {
    display: none;
  }
}
```

## Interactive Elements

### Social Link Handlers
```javascript
function openSocial(url, icon) {
  if (icon === 'mdi-email') {
    window.location.href = `mailto:${url.replace('mailto:', '')}`;
  } else if (icon === 'mdi-phone') {
    window.location.href = `tel:${url.replace('tel:', '')}`;
  } else {
    window.open(url, '_blank', 'noopener');
  }
}
```

### Animation System
- **Bouncing Arrow**: CSS keyframe animation with 2s duration
- **Hover Effects**: Transform and shadow transitions
- **Social Icons**: Lift animation on hover

## Error Handling

### Image Loading
- Graceful error handling with onImgError prop
- Maintains layout integrity without image
- Proper alt text for accessibility

### Link Validation
- URL format validation for external links
- Protocol handling for email/phone
- Fallback behavior for invalid links

## Testing Strategy

### Unit Testing
1. **Component Rendering**: Verify proper HTML structure matches target
2. **Props Handling**: Test all prop types and validation
3. **Social Handlers**: Test different link types and formats
4. **Responsive Behavior**: Verify layout at different breakpoints
5. **Theme Integration**: Confirm styling across all themes

### Integration Testing
1. **Image Loading**: Test with valid and invalid URLs
2. **Download Functionality**: Verify resume download
3. **Social Links**: Test all platform integrations
4. **Animation Performance**: Ensure smooth animations

### Accessibility Testing
1. **Screen Reader**: Verify ARIA labels and semantic HTML
2. **Keyboard Navigation**: Test tab order and activation
3. **Color Contrast**: Validate readability across themes
4. **Motion Preferences**: Respect reduced motion settings

This design provides a comprehensive foundation for implementing a modern, accessible hero card that matches the target HTML structure while maintaining theme compatibility and responsive behavior.