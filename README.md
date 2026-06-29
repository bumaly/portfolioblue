# boolu.art

Personal portfolio for BOOLU — creative technologist based in Barcelona.

**Stack:** Next.js 16 · React 19 · TypeScript · Sanity v5 · Neon (PostgreSQL) · Drizzle ORM · Resend · Vercel  
**Design:** Windows 95 / NT aesthetic — light mode default, dark mode via Start button toggle

---

## Update Log

### 2026-06-29
- **Scroll reset fixed** — navigating to a new project or blog post now loads at the top, not where you left off (`ScrollReset.tsx` was targeting old layout selectors)
- **Sanity fetch cache disabled** — projects and blog always load in the correct order, no stale Next.js cache
- **Projects sorted by date** — Sanity query now orders by `publishedAt desc`
- **Light mode default** — site loads in light mode; dark mode toggled via Start button
- **Dark mode link color fixed** — links in dark mode now use `#7EB8F7` (was near-invisible `#0000AA`)
- **Sanity Studio publish button restored** — `overflow` clip on studio layout was blocking the publish dropdown

### 2026-06-29 (v2 launch)
- Full redesign: CRT terminal aesthetic replaced with Windows 95 / NT chrome
- Win95 layout: file pane + app window + taskbar
- Dark mode via CSS token overrides, persisted in `localStorage`
- Sanity CMS: `project` and `post` types with image sizing, video embeds
- Guestbook via Neon PostgreSQL + Drizzle ORM
- Contact form via Resend
- Sanity Studio unblocked in production (`/studio`)
