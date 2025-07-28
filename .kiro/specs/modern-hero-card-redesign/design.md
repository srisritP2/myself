# Design Document

## Overview

This design transforms the hero card from a traditional, oversized layout to a modern, compact, and premium-feeling component. The new design emphasizes visual hierarchy, contemporary spacing, and refined interactions while maintaining all functional requirements.

## Architecture

### Layout System
- **Container**: Max-width 900px (reduced from 1200px) with smart responsive breakpoints
- **Grid System**: 8px base unit for consistent spacing throughout
- **Aspect Ratio**: Optimized for 16:10 or 4:3 proportions instead of full-width
- **Viewport Usage**: Maximum 80vh on desktop, adaptive on mobile

### Visual Hierarchy
1. **Primary**: Profile image and name (hero identity)
2. **Secondary**: Title and brief description (professional context)
3. **Tertiary**: Skills, stats, and location info (supporting details)
4. **Action**: CTA buttons (conversion focus)

## Components and Interfaces

### Modern Card Structure
```
hero-section (container)
├── hero-card-modern (main card - 900px max)
│   ├── hero-content-grid (2-column on desktop, 1-column mobile)
│   │   ├── hero-primary (left/top - profile & identity)
│   │   │   ├── profile-image-modern (120px, refined styling)
│   │   │   ├── identity-block
│   │   │   │   ├── name (h1, larger, refined typography)
│   │   │   │   ├── title (h2, modern weight)
│   │   │   │   └── description (refined, limited lines)
│   │   │   └── status-location-compact
│   │   └── hero-secondary (right/bottom - details & actions)
│   │       ├── skills-modern-grid (compact 2x2 or 3x2 layout)
│   │       ├── stats-horizontal-compact (inline, modern counters)
│   │       ├── action-buttons-modern (refined, equal prominence)
│   │       └── social-links-minimal
│   └── hero-background-subtle (refined particles/gradient)
```

### Modern Spacing System
- **Base unit**: 8px
- **Component spacing**: 16px, 24px, 32px
- **Section spacing**: 40px, 48px
- **Card padding**: 32px desktop, 24px mobile
- **Element gaps**: 12px, 16px, 20px

## Data Models

### Hero Content Model
```typescript
interface ModernHeroData {
  profile: {
    image: string;
    name: string;
    title: string;
    description: string; // Max 2 lines
    status: 'available' | 'busy' | 'unavailable';
    location: string;
    timezone: string;
  };
  skills: {
    name: string;
    level: number;
    category: 'primary' | 'secondary';
  }[]; // Max 6 skills
  stats: {
    experience: number;
    projects: number;
    clients: number;
  };
  actions: {
    primary: { text: string; action: string; };
    secondary: { text: string; action: string; };
  };
  social: SocialLink[];
}
```

## Modern Design Patterns

### 1. Compact Profile Section
- **Image**: 120px circular with modern border treatment
- **Typography**: Refined hierarchy with optimal line-height
- **Status**: Subtle indicator with modern styling
- **Location**: Inline with timezone, compact presentation

### 2. Skills Grid Modernization
- **Layout**: 2x3 or 3x2 grid instead of horizontal scroll
- **Chips**: Smaller, more refined with subtle progress indicators
- **Colors**: Muted, professional palette
- **Spacing**: Tight, organized grid with consistent gaps

### 3. Stats Redesign
- **Layout**: Horizontal inline instead of card grid
- **Typography**: Modern number styling with refined labels
- **Separators**: Subtle dividers or spacing
- **Animation**: Subtle counter animation on load

### 4. Modern Action Buttons
- **Size**: Slightly smaller but still prominent (160px width)
- **Styling**: Refined gradients, subtle shadows
- **Spacing**: Optimal gap for visual balance
- **States**: Smooth hover transitions with modern feedback

### 5. Background Refinement
- **Particles**: Fewer, more subtle floating elements
- **Gradients**: Softer, more sophisticated color transitions
- **Blur**: Refined glassmorphism with better performance
- **Layers**: Proper z-index management for depth

## Responsive Behavior

### Desktop (1024px+)
- Two-column layout with profile left, details right
- Full feature set with optimal spacing
- Hover states and micro-interactions active

### Tablet (768px - 1023px)
- Single column with optimized spacing
- Maintained visual hierarchy
- Touch-friendly interactions

### Mobile (< 768px)
- Compact single column
- Reduced spacing but maintained proportions
- Essential information prioritized

## Performance Optimizations

### CSS Optimizations
- Reduced animation complexity
- Optimized glassmorphism effects
- Efficient responsive breakpoints
- Minimal DOM manipulation

### Loading Strategy
- Progressive enhancement
- Staggered animations with reduced duration
- Optimized image loading
- Efficient event handling

## Accessibility Enhancements

### Modern A11Y Features
- Improved focus indicators with modern styling
- Better color contrast ratios
- Semantic HTML structure
- Screen reader optimizations
- Keyboard navigation improvements

## Theme Integration

### Enhanced Theme Support
- Better variable usage for consistency
- Refined theme-specific overrides
- Improved dark mode support
- Modern color palette integration