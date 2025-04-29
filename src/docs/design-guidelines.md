
# Design Guidelines

This document outlines the design system, UI patterns, and visual language used throughout the application. It serves as a reference for maintaining consistency when implementing new features or making UI changes.

## Table of Contents

1. [Design System](#design-system)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Responsive Design](#responsive-design)
7. [Accessibility](#accessibility)
8. [Icons & Images](#icons--images)
9. [Animation & Transitions](#animation--transitions)

---

## Design System

The application uses a component-based design system built on [shadcn/ui](https://ui.shadcn.com/), which provides consistent, accessible components following the Radix UI primitives with Tailwind CSS styling.

**Key Principles:**
1. Consistency across all interfaces
2. Accessibility as a priority
3. Responsive design for all screen sizes
4. Clear visual hierarchy
5. Purposeful use of color and contrast

---

## Color Palette

The application uses a color palette centered around blues, indigos, and neutral grays, with accent colors for specific states and indicators.

### Primary Colors
- Primary: `#0000FF` (Blue)
- Primary Foreground: `#FFFFFF` (White)
- Primary Hover: `#0000DD` (Darker Blue)

### Secondary Colors
- Secondary: `#F1F5F9` (Light Blue Gray)
- Secondary Foreground: `#1E293B` (Dark Blue Gray)

### Accent Colors
- Accent: `#F9FAFB` (Very Light Gray)
- Accent Foreground: `#111827` (Nearly Black)

### Semantic Colors
- Destructive: `#EF4444` (Red)
- Destructive Foreground: `#FFFFFF` (White)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Info: `#3B82F6` (Blue)

### Neutral Colors
- Background: `#FFFFFF` (White)
- Foreground: `#020617` (Nearly Black)
- Muted: `#F1F5F9` (Light Gray)
- Muted Foreground: `#64748B` (Medium Gray)
- Border: `#E2E8F0` (Light Gray)

### Status Colors
- `#E5E5FF`: Light blue for selected state
- `#AEAEF6`: Border for selected items

### Usage Guidelines
- Use primary color for main actions and focus states
- Use semantic colors consistently for their intended purposes
- Maintain sufficient contrast for text readability
- Use the muted colors for secondary elements and backgrounds
- Status colors should be used consistently for their specific states

---

## Typography

### Font Family
- Primary: System font stack
- Monospace: Consolas, Monaco, monospace (for code blocks)

### Font Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px) - default body text
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px) - page headings
- 3xl: 1.875rem (30px) - large headings

### Font Weights
- normal: 400
- medium: 500
- semibold: 600
- bold: 700

### Line Heights
- Tight: 1.25
- Base: 1.5
- Relaxed: 1.75

### Headings
- h1: 2xl/3xl font size, bold weight
- h2: xl/2xl font size, bold weight
- h3: lg/xl font size, semibold weight
- h4: base/lg font size, medium/semibold weight

### Text Elements
- Paragraph: base font size, normal weight, relaxed line height
- Small text: sm font size
- Helper text: sm font size, muted foreground color

---

## Spacing & Layout

The application uses a consistent spacing system based on 0.25rem (4px) increments.

### Spacing Scale
- px: 1px
- 0.5: 0.125rem (2px)
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 3: 0.75rem (12px)
- 4: 1rem (16px)
- 5: 1.25rem (20px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)
- 10: 2.5rem (40px)
- 12: 3rem (48px)
- 16: 4rem (64px)

### Layout Guidelines
- Consistent padding of 6 (24px) for card and content containers
- Sidebar width: 260px (expanded), 80px (collapsed)
- Content area should have padding of 4 to 6 (16px-24px) on all sides
- Use gap-4 (16px) for grid and flex layouts by default
- Form fields should have space-y-2 (8px) between label and input
- Groups of form fields should have space-y-4 (16px) between them

### Grid System
- Use Tailwind's grid classes for page layouts
- Default to `grid grid-cols-1 md:grid-cols-2 gap-6` for two-column layouts
- Use `grid grid-cols-1 lg:grid-cols-3 gap-6` for three-column layouts
- Tables should have full width with appropriate cell padding
- Consider mobile layouts with stacked content

---

## Components

### Cards
Cards are the primary containers for content and should follow these guidelines:
- White background
- Light border
- Subtle shadow
- Rounded corners (lg)
- Consistent padding with CardHeader, CardContent, and CardFooter components
- Clear visual hierarchy with titles and content

### Buttons
Buttons have several variants for different purposes:
- Default: Primary color for main actions
- Secondary: Muted styling for secondary actions
- Destructive: Red for dangerous actions
- Outline: Bordered version for less emphasis
- Ghost: Minimal styling for the lowest emphasis
- Link: Text-only with underline on hover

Sizes:
- Default: Standard size for most uses
- Small (sm): For compact UIs
- Large (lg): For call-to-action buttons
- Icon: Square button with just an icon

### Inputs & Form Controls
Form controls should follow these patterns:
- Consistent height (40px, h-10)
- Clear focus states
- Visible labels above inputs
- Helper text below when needed
- Error messages in red
- Disabled states with reduced opacity

### Tables
Tables should be designed with:
- Subtle alternating row colors
- Clear header styling
- Consistent cell padding
- Proper text alignment (left for text, right for numbers)
- Hover states for rows
- Mobile-friendly patterns (cards or stacked layout on small screens)

### Dialogs & Modals
Dialogs should follow these patterns:
- Centered on screen with overlay backdrop
- Clear titles and descriptions
- Focused action buttons
- Close button or method
- Appropriate size for content
- Responsive sizing for mobile

---

## Responsive Design

The application follows a mobile-first approach with responsive breakpoints:

- sm: 640px (Small devices)
- md: 768px (Medium devices)
- lg: 1024px (Large devices)
- xl: 1280px (Extra large devices)
- 2xl: 1536px (Extra extra large devices)

### Responsive Patterns
1. **Sidebar Navigation:**
   - Collapses to icon-only on smaller screens
   - Shows as overlay on mobile with toggle button

2. **Tabbed Interfaces:**
   - Keep tabs horizontal where possible
   - Stack vertically if space is limited
   - Use dropdown selector on very small screens

3. **Tables:**
   - Horizontal scroll on small screens for complex tables
   - Or transform to card layout on mobile

4. **Forms:**
   - Stack form fields vertically on mobile
   - Full-width inputs on small screens
   - Consider multi-step forms for complex inputs

5. **Grid Layouts:**
   - Adjust column counts at breakpoints
   - Single column on mobile, multiple columns on larger screens

---

## Accessibility

The application prioritizes accessibility with these guidelines:

### Color & Contrast
- Maintain WCAG AA compliance (minimum 4.5:1 contrast for normal text)
- Don't rely solely on color to convey information
- Test color combinations for color blindness compatibility

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus states on all interactive elements
- Logical tab order following visual layout
- Skip links for main content

### Screen Readers
- Semantic HTML elements
- Proper ARIA attributes when needed
- Alternative text for images
- Form labels connected to inputs
- Alert messages for important notifications

### Reduced Motion
- Respect user's reduced motion preferences
- Alternative non-animated versions of transitions

---

## Icons & Images

### Icons
- The application uses [Lucide Icons](https://lucide.dev/) for consistent iconography
- Icons should be 16px/20px (h-4/h-5) for inline use
- Icons should be 24px (h-6) for buttons and larger UI elements
- Use the same icon for the same action across the application
- Icons should have accessible labels or be properly labeled with aria-label

### Images
- Company logos should be square format with minimum 100x100px size
- Use aspect-ratio classes to maintain image proportions
- Always include alt text for images
- Consider lazy loading for performance
- Use appropriate image formats (SVG for icons, WebP/JPEG for photos)

---

## Animation & Transitions

The application uses subtle animations to enhance user experience:

### Transitions
- Button hover/focus states: 150ms transition
- Modal/dialog entrances: 200ms transition
- Tab changes: 150ms transition
- Form control focus: 100ms transition

### Animation Types
- Fade in/out for appearing/disappearing elements
- Slight scale for emphasis
- Slide transitions for panels and drawers
- Progress indicators for loading states

### Guidelines
- Keep animations subtle and purposeful
- Limit duration to 300ms for most transitions
- Use easing functions for natural movement
- Ensure animations don't block user interaction
- Respect user preferences for reduced motion
