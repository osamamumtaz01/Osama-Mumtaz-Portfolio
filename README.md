<p align="center">
  <img src="src/assets/om-black.svg" alt="Logo" width="80" height="80">
</p>

<h1 align="center">Osama Mumtaz — Personal Portfolio</h1>

<p align="center">
  <b>A fast, single-page portfolio built with React, Vite, Tailwind CSS and Framer Motion</b>
</p>

<p align="center">
  <a href="https://osamamumtaz.com">osamamumtaz.com</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-4.1-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.2-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer%20Motion-9.0-FF0055?logo=framer&logoColor=white" alt="Framer Motion" />
</p>

---

## 🚀 Overview

A single-page portfolio showcasing my professional background, technical skills and shipped
products. The site is a static SPA — no backend, no routing — with anchor-based navigation
between sections, scroll-triggered animations, and a contact form wired directly to EmailJS.

The design is a dark glassmorphic theme: layered translucent cards, subtle gradient glows,
and a warm amber/coral accent.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Glass hero card** | Profile card with live availability status, key stats and stack pills |
| **Scroll animations** | Staggered entrance animations on every section via Framer Motion |
| **Data-driven content** | Every section renders from `src/constants/index.js` — no component edits needed |
| **Testimonials** | Paginated testimonial grid with expandable full-text modal |
| **Contact form** | EmailJS-backed form with success modal and graceful unconfigured state |
| **Responsive design** | Tuned across mobile, tablet and desktop breakpoints |
| **SEO ready** | Meta description, canonical, Open Graph / Twitter cards, JSON-LD `Person`, sitemap and robots.txt |
| **Optimized media** | WebP imagery, lazy loading below the fold, preloaded hero image |

---

## 📂 Project Structure

```
Osama-Mumtaz-Portfolio/
├── public/
│   ├── favicon.svg              # Site icon
│   ├── og-image.jpg             # 1200×630 social share card
│   ├── profile.webp             # Hero portrait
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/                  # Images, tech icons, static media
│   ├── components/
│   │   ├── Navbar.jsx           # Fixed nav with scroll-aware background
│   │   ├── Hero.jsx             # Hero section + glass profile card
│   │   ├── About.jsx            # Role / service cards
│   │   ├── Experience.jsx       # Work experience timeline
│   │   ├── Education.jsx        # Academic background
│   │   ├── Tech.jsx             # Technology stack grid
│   │   ├── Works.jsx            # Featured projects gallery
│   │   ├── Feedbacks.jsx        # Testimonials with modal
│   │   ├── Contact.jsx          # EmailJS contact form
│   │   ├── Footer.jsx           # Footer with social links
│   │   ├── WhatsAppFloat.jsx    # Floating WhatsApp button
│   │   ├── SectionHeader.jsx    # Shared section heading
│   │   └── index.js             # Barrel export
│   ├── constants/
│   │   └── index.js             # All site data (services, experience, projects, testimonials)
│   ├── hoc/
│   │   └── SectionWrapper.jsx   # HOC for consistent section layout + anchor target
│   ├── utils/
│   │   └── motion.js            # Framer Motion animation variants
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   ├── styles.js                # Reusable Tailwind class groups
│   └── index.css                # Global styles and custom CSS
├── index.html                   # HTML entry point + SEO metadata
├── tailwind.config.cjs
├── postcss.config.cjs
├── vite.config.js
└── package.json
```

---

## 🛠️ Tech Stack

### Core
- **React 18** — UI library with functional components & hooks
- **Vite 4** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first CSS, with a custom color and font theme
- **PostCSS + Autoprefixer** — CSS processing pipeline

### Animation & UI
- **Framer Motion** — Scroll-triggered and layout animations
- **React Icons** — Icon set used in contact, footer and the WhatsApp button

### Integrations
- **EmailJS** — Sends the contact form without a backend
- **Google Analytics (gtag.js)** — Traffic analytics

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 16
- **npm**

### Installation

```bash
git clone https://github.com/osamamumtaz01/osama-mumtaz-portfolio.git
cd Osama-Mumtaz-Portfolio
npm install
```

### Environment variables

The contact form needs EmailJS credentials. Copy the example file and fill it in:

```bash
cp .env.example .env
```

```
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Without these the form stays visible but shows a clear "not configured" message on submit.

### Development

```bash
npm run dev
```

Available at `http://localhost:5173`.

### Production build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

---

## 🎨 Customization

All portfolio content lives in one file — **`src/constants/index.js`**:

| Export | Controls |
|---|---|
| `navLinks` | Navigation items (each `id` must match a section anchor) |
| `heroStats` / `heroStack` / `heroProfile` | Hero card content |
| `services` | Role cards in the About section |
| `technologies` | Tech stack grid |
| `experiences` | Work experience timeline |
| `educations` | Education entries |
| `projects` | Featured projects gallery |
| `testimonials` | Testimonials |

Section anchors are set where each component is exported, e.g.
`export default SectionWrapper(Works, "projects")`. When adding a nav link, make sure its
`id` matches the anchor passed to `SectionWrapper`.

Theme colors and fonts are defined in `tailwind.config.cjs`; custom classes such as
`glass-card`, `hero-glass` and `hero-cta-primary` live in `src/index.css`.

---

## 🔍 SEO notes

- Update `<link rel="canonical">`, the `og:url` / `og:image` values and `public/sitemap.xml`
  if the domain ever changes.
- `public/og-image.jpg` is the social share card (1200×630). Regenerate it whenever the
  headline stats or job title change.

---

## 📄 License

This project is open source and available for personal use and reference.

---

<p align="center">
  Built with ❤️ by <b>Osama Mumtaz</b>
</p>
