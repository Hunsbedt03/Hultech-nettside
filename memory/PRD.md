# Hultech — Product Requirements Document

## Original Problem Statement
Professional, high-end website for Hultech, a Norwegian engineering firm based in
Kristiansand, serving industrial and maritime clients across the Agder region.
Dark industrial aesthetic (Kongsberg/Aker feel), steel-blue accent, grid-based
layout, Space Grotesk + Inter typography, no hero image — geometric/blueprint
backgrounds only. Single page: Hero, Services, Why Hultech, About, Contact, Footer.

## Tech Stack
- Backend: FastAPI + Motor (MongoDB) + Resend (email)
- Frontend: React 19 (CRA) + Tailwind + framer-motion + sonner + lucide-react
- DB: MongoDB (collection `contact_messages`)

## Architecture / Routes
### Backend (`/app/backend/server.py`)
- `GET  /api/`           → service status
- `GET  /api/health`     → returns `{status, email_configured, timestamp}`
- `POST /api/contact`    → validates payload, sends email via Resend (if key set), persists doc, returns `ContactMessageResponse`
- `GET  /api/contact`    → list all messages (admin), excludes `_id`

### Frontend (`/app/frontend/src/`)
- `App.js`            → BrowserRouter + Sonner Toaster
- `components/Nav.jsx` → sticky nav, mobile hamburger
- `components/Hero.jsx`
- `components/Services.jsx`     (5 services, flat 1px-divider rows)
- `components/WhyHultech.jsx`   (5 differentiators, 2-col)
- `components/About.jsx`
- `components/Contact.jsx`      (form posts to /api/contact)
- `components/Footer.jsx`

## Implemented (2026-04-27)
- Dark industrial design system (#0F0F0F base, #4A90D9 accent, Space Grotesk + Inter + JetBrains Mono mono)
- Sticky responsive nav with mobile menu
- Hero with technical SVG circle motif + blueprint grid background, stats column, spec-strip
- 5 services with icon, index tag, tags, hover state, blue accent on hover
- "Hvorfor Hultech" 2-column grid of 5 differentiators
- About section with metadata table + bold display paragraph
- Contact form (Name, Company, Email optional, Message) with Sonner toasts in Bokmål
- Big Hultech wordmark footer with contact info + accepting-projects pulse
- Subtle framer-motion fade-up entrance animations (~300ms)
- Backend `/api/contact` POST + GET, MongoDB persistence with ISO datetime
- Resend integration wired (graceful skip when `RESEND_API_KEY` empty)
- Norwegian Bokmål translation across entire site (UI, copy, validation, toasts, footer)
- "Made with Emergent" badge removed (HTML deleted + CSS hide rule for re-injection)
- Mobile responsiveness: padding/typography breakpoints, flex stacking, hamburger
- All interactive elements carry `data-testid`

## Verified
- Backend pytest 9/9 passing (root, health, contact CRUD, validation)
- Frontend manual + automated smoke: hero, sections, contact submit success/empty
- Norwegian validation toast displays correctly (form has `noValidate`)
- No `_id` leakage from MongoDB

## Known / Deferred (P1)
- **Email delivery off**: `RESEND_API_KEY` is empty by user choice. To enable: drop key in `/app/backend/.env`, decide on sender (`onboarding@resend.dev` or verified `hultech.no` domain), restart backend. Code is already wired.
- **CORS**: `allow_origins='*'` with credentials — fine for marketing site, tighten for prod if any auth added.

## Backlog (P2)
- Admin UI to view contact submissions (auth + table)
- SEO: Open Graph image + sitemap.xml + robots.txt
- Analytics (Plausible / GA4) on CTA clicks
- Norwegian/English language toggle if international clients matter
- Case studies / project gallery section once references are public
- DNS verification of `hultech.no` in Resend for production deliverability

## Test Credentials
n/a — no auth in this app.
