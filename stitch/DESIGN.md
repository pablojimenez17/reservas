---
name: ReservaHub Visual Language
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered for high-performance enterprise environments. It projects an aura of **reliability and technical mastery**, specifically targeting developers and infrastructure architects. The aesthetic is rooted in **Modern Minimalism** with a **Technical** edge, utilizing high-contrast typography and precise alignment to communicate scalability.

The visual narrative avoids unnecessary decoration, favoring structural integrity and functional clarity. It uses subtle gradients only to signify depth or motion in architectural diagrams, while the rest of the UI remains grounded in a crisp, utility-first framework. The emotional response is one of trust—users should feel they are interacting with a robust, "bulletproof" engine.

## Colors

This design system utilizes a high-contrast palette to distinguish between structural containers and actionable data.

- **Primary (Deep Tech Blue):** Used for heavy structural elements, navigation sidebars, and primary headings to ground the interface in authority.
- **Accent (Electric Indigo):** Reserved strictly for primary call-to-actions, active states, and focus indicators. It provides a vibrant "pulse" against the darker primary tones.
- **Success (Emerald):** Specifically deployed for growth metrics (e.g., "91% margin") and system-up states.
- **Neutral (Slate):** A tiered system of slates is used to create hierarchy in data-heavy views. The background sits at the lightest tier (#F8FAFC), while secondary text utilizes mid-tones (#94A3B8) to reduce visual noise.

## Typography

The typography strategy focuses on legibility and technical precision. **Geist** is used for headlines to provide a sharp, modern sans-serif feel that scales perfectly. **Inter** handles the bulk of body content due to its exceptional readability in dense layouts.

For technical metadata, code snippets, and system labels, **JetBrains Mono** is employed to maintain the developer-centric narrative. Use tighter letter spacing on display headings to create a "locked-in" professional look. Use `body-sm` for secondary data in tables and `label-mono` for all status indicators and numerical units.

## Layout & Spacing

The design system follows a rigid **8px spacing grid** to ensure mathematical harmony. 

- **Grid:** A 12-column fluid grid for desktop with 24px gutters. For data dashboards, use a "sidebar-main" layout where the sidebar is fixed at 280px and the main content area expands.
- **Rhythm:** Vertical rhythm should be maintained using the `md` (24px) unit for section spacing.
- **Mobile:** Transition to a 4-column grid with 16px margins. Complex data tables should horizontally scroll rather than stack to maintain data integrity.
- **Density:** High-density layouts are preferred. Use `sm` (16px) padding for cards and container internals to maximize information density without sacrificing clarity.

## Elevation & Depth

This design system avoids traditional shadows in favor of **Structural Layering** and **Low-Contrast Outlines**.

- **Layers:** Use a background color of Slate-50 (#F8FAFC). Elements like cards and panels use a pure White background with a 1px border (#E2E8F0).
- **Active Elevation:** Instead of a shadow, an elevated or "active" card is indicated by a 1px border stroke of the Accent color (#6366F1) or a subtle 2px offset "hard" shadow (0 opacity blur) to mimic a technical blueprint style.
- **Depth:** Use Tonal Layers for navigation. The primary sidebar should be #0F172A, creating a clear vertical anchor that feels deeper than the content canvas.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the "edge" off the brutalist structure, making the interface feel premium and modern rather than dated.

- **Standard Elements:** Inputs, buttons, and chips use a 4px (0.25rem) radius.
- **Large Containers:** Cards and modals use 8px (0.5rem) to provide a softer frame for dense internal data.
- **Interactive States:** Buttons do not change shape on hover; they should only change fill color or border intensity to maintain structural stability.

## Components

- **Buttons:** Primary buttons use a solid Electric Indigo (#6366F1) fill with white text. Secondary buttons use a transparent background with a 1px Slate-200 border. Use `label-mono` for button text to enhance the technical feel.
- **Code Blocks:** Use a dark theme (Slate-900) for code blocks regardless of the main UI mode. Syntax highlighting should use the Emerald and Indigo accents. Include a "Copy" utility in the top-right corner using `body-sm`.
- **Data Tables:** Headers must be Slate-100 background with `label-mono` text in all-caps. Rows should have a subtle hover state (#F1F5F9) and use 1px horizontal dividers only.
- **Cards:** Cards are the primary container. They feature a 1px border (#E2E8F0), no shadow, and a 24px internal padding. 
- **Status Chips:** Small, condensed labels with a low-opacity background tint of the status color (e.g., 10% Emerald for "Success") and high-contrast text.
- **Architectural Diagrams:** Lines should be 1px solid Slate-300. Use the Accent color to highlight the "active path" or current selection within the flow.