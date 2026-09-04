## Project Goal

Website for Pick It Up

The primary goal is to build a fast, modern website that highlights:
- The mission and identity of PickItUp
- Real-time impact statistics
- Event history and upcoming opportunities
- Blog and storytelling content
- Easy ways for visitors to connect or sign up

---

## Website Features

### Must Have
- **Mission statement**
- **Live statistics** (e.g., garbage collected, member count, event count)
- **Events timeline** (past + future events)
- **Blog posts / articles**
- **Contact info** (footer: email, Instagram, etc.)

### Nice to Have
- **Meet the team**
- **Sign-up section** (Google Form embed or native in-site signup)

---

## Mood Board / Experience Direction

### General Layout
- Logo in top-left (clickable, routes to homepage)
- Navigation links in top-right
- Footer contact info on all pages (Instagram, email, etc.)

### Home Page
- Video loop background
- Mission statement overlay/content section
- Live statistics block (API/database powered)
- 3 recent/upcoming events preview (click-through to Events page)
- Meet the Team section
- Sign-up call-to-action

### Events Page
- Timeline/list of all events (upcoming + past)
- Event media and details pulled from Sanity (images, text, optional videos)

### Blog Page
- Gallery/list view of blog posts and articles
- Content managed in Sanity and rendered in Next.js

---

## Technology Layout

### Sanity (Content Layer)
Sanity acts as the content dashboard for non-developers.  
It stores and manages:
- Videos
- Images
- Blog posts
- Event entries
- Live statistics
- Team member profiles
- Site settings/contact details

The frontend queries this content using **GROQ** and renders it dynamically.

### Vercel (Hosting + Runtime Layer)
Vercel hosts and runs the production website.  
It is responsible for:
- Deploying the Next.js app
- Build and deployment pipelines
- Analytics and runtime monitoring
- API routes/serverless functions (if needed)
- Pulling and serving content fetched from Sanity

### Next.js (Application Layer)
Next.js is the React framework used to build the website.  
It provides:
- File-based routing
- Data fetching patterns for static/dynamic rendering
- SEO-friendly performance
- Production-ready architecture integrated with Vercel

### Tailwind CSS (Styling Layer, Optional)
Tailwind can be used for fast, utility-first styling directly in components.  
It helps keep styling consistent and scalable across pages.

---

## How Developers Work with Sanity + Vercel

### 1) Local setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Configure environment variables (`.env.local`) for Sanity project access
4. Run development servers with:
   - `npm run dev` (both frontend + Studio), or
   - `npm run dev:next` and `npm run dev:studio`

### 2) Content modeling in Sanity
Developers define schema types in the Studio (e.g., events, posts, team, stats).  
Non-developers then create/edit content in the Sanity Studio UI.

### 3) Querying content with GROQ
Frontend pages/components query Sanity data using GROQ.  
Typical flow:
- Define query
- Fetch data in Next.js page/server component
- Render structured content (cards, timelines, stats blocks, etc.)

### 4) Previewing and testing
- Test local rendering for all core pages (Home, Events, Blog)
- Validate responsive behavior and performance
- Run quality checks (`npm run lint`, `npm run type-check`)

### 5) Deploying with Vercel
- Push changes to GitHub
- Vercel auto-builds and deploys from connected branch
- Verify production environment variables
- Confirm fresh Sanity content appears correctly in production

---

## Suggested Directory Guide

> Note: adjust this section if folder names differ in your current repo structure.

- `frontend/`  
  Next.js application code (routes, pages, components, utilities, styles)

- `studio/`  
  Sanity Studio configuration and schema definitions for content editing

- `frontend/src/app/`  
  App Router pages/layouts (home, events, blog, etc.)

- `frontend/src/components/`  
  Reusable UI components (nav, footer, cards, timeline items, stats blocks)

- `frontend/src/lib/` or `frontend/src/sanity/`  
  Sanity client setup, GROQ queries, and data-fetching helpers

- `frontend/public/`  
  Static assets served directly (icons, fallback images, etc.)

- `studio/src/schemaTypes/`  
  Sanity content schemas (post, event, team member, stats, settings, etc.)

- `.github/`  
  GitHub workflows, issue templates, and pull request templates

- `CONTRIBUTING.md`  
  Contribution workflow and development standards

- `README.md`  
  Project overview, setup instructions, architecture, and feature goals

---

## Recommended Sanity Content Types

For this project’s goals, include schema types such as:
- `siteSettings` (mission statement, footer contact links)
- `statistic` (label, value, lastUpdated)
- `event` (title, date, description, media, status)
- `post` (title, slug, coverImage, body, publishDate)
- `teamMember` (name, role, bio, image, social links)
- `signupSection` (CTA text, form URL/embed)

This keeps all frequently updated website content editable without code changes.
