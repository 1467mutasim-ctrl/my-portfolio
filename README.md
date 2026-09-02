# Mutasim Billah — Portfolio

**BUILD. COMPETE. EXPLORE.**

## Overview

A personal portfolio for Mutasim Billah — robotics enthusiast, programmer, problem
solver and explorer. It's a static, single-page site with no backend, no database
and no authentication: everything ships as pre-built HTML, CSS and JavaScript and
can be hosted anywhere that serves files.

The design is a dark, editorial engineering system — restrained accent colour,
hairline borders, technical monospace metadata and purposeful motion — built to
read as a personal engineering brand rather than a generic developer template.

**Sections:** Hero · Selected Missions · The Journey · Who Is Mutasim? · Tech Stack ·
How I Think · Beyond the Circuits · Contact (with an interactive terminal).

## Tech Stack

- **React** 18
- **TypeScript** (strict)
- **Vite** 5
- **Tailwind CSS** 3
- **Framer Motion** — animation
- **Lucide React** — icons

## Development

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`).

## Production Build

```bash
npm run build
```

Output goes to `dist/`. Type checking runs as part of the build, so a build failure
is also a type failure.

## Preview

```bash
npm run preview
```

Serves the contents of `dist/` locally, exactly as a static host would.

## Customization

Almost everything is data-driven. **`src/data/portfolio.ts` is the single source of
truth** — edit it and the whole site updates. You should rarely need to touch a
component.

| What you want to change | Where |
| --- | --- |
| Name, tagline, roles, statement, location | `personal` in `src/data/portfolio.ts` |
| Navigation labels and targets | `navItems` |
| The three identity cards | `identityCards` |
| Achievements + timeline | `achievements` (set `featured: true` to make one dominant) |
| Hero achievement highlights | `heroHighlights` |
| Projects, tags, links, case studies | `projects` |
| Tech stack groups | `skillGroups` |
| Process steps and the quote | `philosophySteps`, `philosophyQuote` |
| Interests | `passions`, `loves` |
| Photo list and categories | `photos`, `photoCategories` |
| Email / GitHub / LinkedIn | `socials` |
| Footer year and "built with" list | `siteMeta` |
| Page title, description, Open Graph tags | `index.html` |
| Colours, fonts, spacing scale | `tailwind.config.ts` |

### Placeholders to replace

Fields marked `TODO:` in `src/data/portfolio.ts` are intentionally empty — nothing
has been invented on your behalf.

- **Contact links.** `socials` ships with placeholder handles and `href: null`.
  A `null` href renders the row as visibly inactive instead of linking somewhere
  wrong. Set both `handle` (what visitors see) and `href` (where it goes; use
  `mailto:` for email).
- **Project links.** `githubUrl` and `demoUrl` are `null`. Until you set them, the
  buttons render as non-interactive "pending" chips rather than dead links.
- **Case studies.** Each project has an empty `caseStudy` object with fields for
  Overview, Problem, Solution, Hardware, Software, My Contribution, Challenges and
  Result. While they're empty the expander shows an outline of what's coming; fill
  any field and it renders for real. Blank fields stay hidden.
- **Resume.** Replace `public/resume.pdf` with your real file, keeping the name.

### Images

Drop files into `public/images/` — see `public/images/README.md` for the layout.

**Aspect ratios don't matter.** Every image renders inside a fixed frame and is
centre-cropped to fill it (`object-fit: cover`), so photos shot at 3:2, 4:3, 16:9
or vertical 4:5 all sit correctly side by side — no letterboxing, no stretching,
no layout shift. If a file is missing or fails to load, the frame draws an elegant
engineered placeholder instead of a broken image, so the page never breaks while
you're still collecting photos.

Expected paths:

```
public/images/profile/profile.jpg
public/images/projects/robosoccer/cover.jpg   01.jpg   02.jpg
public/images/projects/lfr/cover.jpg          01.jpg   02.jpg
public/images/projects/aqua-guard/cover.jpg   01.jpg   02.jpg
public/images/photography/photography-01.jpg … photography-06.jpg
```

Recommended: JPG or WebP, longest edge ~1600–2000px, ~200–400 KB each. All images
below the fold are lazy-loaded.

To change a photo's frame shape, set `span` on that entry in `photos`:
`'tall'`, `'wide'` or `'square'`.

## Accessibility & motion

Semantic landmarks and heading order, a skip link, visible focus rings, labelled
controls, and `aria-current` on the active nav item. All animation respects
`prefers-reduced-motion` — the site drops to opacity-only transitions and instant
scrolling when the OS requests reduced motion.

## Deployment

Any static host works. Build with `npm run build` and serve `dist/`.

- **Vercel / Netlify** — framework preset "Vite"; build `npm run build`, output `dist`.
- **GitHub Pages** — serve `dist/`. If the site lives at
  `https://<user>.github.io/<repo>/` rather than a domain root, set
  `base: '/<repo>/'` in `vite.config.ts` first.

## License

Content and images are © Mutasim Billah. The source code is free to reference.
