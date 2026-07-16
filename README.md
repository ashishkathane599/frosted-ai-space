# Ashish Kathane — Portfolio

Multi-page personal portfolio for an AI/ML engineer, built with an Apple-inspired
Liquid Glass design system.

## Stack

- Frontend: hand-written semantic markup + Tailwind v4 tokens defined in
  `src/styles.css`. Zero framework UI kit — everything is glass utilities.
- Routing / SSR: [TanStack Start](https://tanstack.com/start) on Vite. Routes
  live in `src/routes/`, one file per page (`index.tsx`, `projects.tsx`, …).
- Backend: file-based server routes under `src/routes/api/` implement the
  same endpoints an Express server would expose:
  - `GET  /api/projects`
  - `GET  /api/blog`
  - `GET  /api/blog/:id`
  - `POST /api/contact`
  - `POST /api/admin/blog`  (bearer-token protected)
- Data: seed JSON under `src/data/` (`projects.json`, `blog.json`). Update
  these to change what appears on the site.

## Design system

- Deep navy backdrop + animated multi-radial gradient mesh (visible through
  every glass panel).
- Frosted glass surfaces: `background: rgba(255,255,255,0.06–0.10)`,
  `backdrop-filter: blur(20–28px) saturate(180%)`, 1px inner border,
  soft multi-layer shadow, 20–28px continuous corners.
- Apple accents used **sparingly**: electric blue `#0A84FF` and violet
  `#5E5CE6` combined as `--gradient-accent` for CTAs, active nav pills,
  and skill dots. Never as background wallpaper.
- Typography: SF Pro Display / SF Pro Text via `-apple-system`, with Inter
  fallback. Tight tracking on headings, generous letter-spacing on eyebrows.
- Motion: gentle `.reveal` fade/slide-in driven by IntersectionObserver in
  `src/components/site/Layout.tsx`. All transitions use
  `cubic-bezier(0.2, 0.8, 0.2, 1)` for the Apple-y feel.
- Fully responsive; navbar collapses into a glass slide-down menu below `lg`.

## Local development

```bash
bun install
bun run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Content editing

- **Projects:** edit `src/data/projects.json`.
- **Blog:** either edit `src/data/blog.json` directly (permanent), or use the
  `/admin` page (session-only — see below).
- **Identity, socials, skills, experience, certifications:** edit
  `src/lib/site.ts`.
- **Profile photo:** drop a square image at `public/assets/img/profile.jpg`.
  Until then, a gradient glass placeholder is shown.

## Environment variables

Create a `.env` file at the repo root:

```env
# Blog admin form (POST /api/admin/blog)
ADMIN_TOKEN=change-me-to-a-long-random-string

# Contact form email delivery (optional — omit to log submissions instead)
CONTACT_TO=kathaneashish599@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user@example.com
SMTP_PASS=your-app-password
```

If SMTP env vars are absent, `/api/contact` still returns 200 and logs the
submission to server stdout — useful in local development.

## Admin blog form

`/admin` posts to `POST /api/admin/blog` with `Authorization: Bearer <ADMIN_TOKEN>`.
Posts added this way live in-memory for the running server session — perfect
for drafting, but **not** durable across deploys. To keep a post, copy its
JSON into `src/data/blog.json` and commit.

## Deployment

The app is deploy-ready on Render as a Node service:

1. Push to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Build command: `bun install && bun run build`
   Start command: `bun run start`
4. Add the environment variables above under **Environment** in the Render dashboard.

Vercel works too — the TanStack Start Vite plugin builds a serverless-compatible
output. On Vercel the session-only admin store resets between invocations, so
edit `src/data/blog.json` directly for that host.
