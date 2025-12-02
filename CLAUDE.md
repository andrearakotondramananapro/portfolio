# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern full-stack developer portfolio website built with React 18+ and Vite. The project follows a 2026 design philosophy with glassmorphism effects, micro-animations, and a storytelling approach. All code comments must be written in French.

## Tech Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion + React Intersection Observer
- **Icons**: lucide-react
- **Data**: JSON files only (no database)
- **Languages**: Trilingual support (French, English, Malagasy)

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
```

## Architecture

```
src/
├── components/      # React components (Hero, About, Education, Skills, Projects, etc.)
├── data/            # JSON data files (translations, projects, skills, certifications)
├── hooks/           # Custom hooks (useLanguage.js for i18n)
└── utils/           # Helper functions
public/
├── images/          # Profile photo, project screenshots, certification logos
└── resume.pdf       # Downloadable CV
```

## Key Design Specifications

**Color Palette:**
- `#322d29` - Deep charcoal (backgrounds, text)
- `#72383d` - Sophisticated bordeaux (accents, CTAs)
- `#5B7B5B` - Sage green (accent color with character)
- `#7A9A7A` - Light sage (hover states)
- `#4A6A4A` - Dark sage (emphasis)
- `#ac9c8d` - Warm taupe (secondary elements)
- `#d1c7bd` - Rose beige (light backgrounds)
- `#d9d9d9` - Pearl gray (separators)
- `#efe9e1` - Cream (light backgrounds, text on dark)

**Glassmorphism Effects:**
- `backdrop-filter: blur(10-20px)`
- Subtle borders with opacity
- Soft, multiple shadows
- Variable transparency

**Typography:**
- Display font: Playfair Display (headings)
- Body font: Space Grotesk (paragraphs)
- Mono font: JetBrains Mono (code)
- Generous line-height (1.7)

## Data Structure

All content is trilingual. JSON structure follows:
```json
{
  "fr": { "section": {...} },
  "en": { "section": {...} },
  "mg": { "section": {...} }
}
```

Projects use category filtering: `all | frontend | backend | fullstack | mobile`

## Conventions

- All code comments in French
- Modular, reusable components
- Scroll-triggered animations using Intersection Observer
- GPU-accelerated animations (transform, opacity only)
- Responsive breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- Touch-friendly buttons (min 44px)
- Lighthouse score target: >90
