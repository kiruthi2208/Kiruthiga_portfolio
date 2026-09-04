# Kiruthiga S — Portfolio Website

A premium, production-quality portfolio for Kiruthiga S, a Full-Stack Web Developer specializing in PHP, MySQL, JavaScript and AI-assisted development.

## Tech Stack

- **Next.js 13** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **Resend** for email delivery
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | For contact form | Resend API key to send inquiry emails. Get a free key at [resend.com](https://resend.com). Without this, the contact form will show an error message directing visitors to email directly. |
| `CONTACT_EMAIL` | No (defaults to kiruthigas2208@gmail.com) | Email address that receives project inquiry notifications. |
| `AI_API_KEY` | For AI chatbot | OpenAI-compatible API key for intelligent Kiri AI responses. Without this, the chatbot uses a built-in FAQ system that works with no configuration. |

### Without API Keys

The website is fully functional without any API keys configured:

- **Contact form**: Shows a friendly error message asking the visitor to email directly
- **Chatbot**: Uses a deterministic FAQ system that answers questions about Kiruthiga's skills, projects, services, and contact info
- **All other features**: Work normally (navigation, theme toggle, project modals, WhatsApp, LinkedIn, copy-to-clipboard)

## Resume

To enable the "Download Resume" button in the hero section, place a `resume.pdf` file in the `public/` folder. The button automatically detects the file and becomes clickable.

## Features

- Premium dark/light theme with localStorage persistence
- Custom desktop cursor with hover states (disabled on mobile)
- Scroll progress indicator
- Animated hero with mouse parallax
- Interactive project cards with detail modals
- AI & Prompt Engineering workflow section
- Kiri AI chatbot with lead generation flow
- Working contact form with server-side validation
- WhatsApp, LinkedIn, email, and phone integration
- Fully responsive (360px to 1440px+)
- SEO metadata, Open Graph, sitemap, robots.txt
- Accessibility: semantic HTML, ARIA labels, keyboard nav, reduced-motion support

## Build

```bash
npm run build
```

## Project Structure

```
app/
  api/contact/route.ts    — Contact form email API (Resend)
  api/chat/route.ts       — Kiri AI chatbot API (OpenAI + FAQ fallback)
  layout.tsx              — Root layout, fonts, metadata
  page.tsx                — Main page assembling all sections
components/
  navbar.tsx              — Sticky navbar with mobile menu
  hero.tsx                — Hero section with animated visuals
  about.tsx               — About section
  services.tsx            — Services cards
  projects.tsx            — Projects grid
  project-card.tsx        — Individual project card
  project-modal.tsx       — Project detail modal
  skills.tsx              — Skills badges
  ai-section.tsx          — AI & Prompt Engineering section
  experience.tsx          — Experience timeline + certifications
  process.tsx             — How I Work process
  contact.tsx             — Contact form + freelance CTA
  chatbot.tsx             — Kiri AI floating chatbot
  footer.tsx              — Footer
  custom-cursor.tsx       — Desktop cursor
  scroll-progress.tsx     — Scroll progress bar
  theme-provider.tsx      — Theme provider wrapper
lib/
  portfolio-data.ts       — All verified portfolio content
```

## License

© 2026 Kiruthiga S. All rights reserved.
