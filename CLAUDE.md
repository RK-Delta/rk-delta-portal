# RK Delta — Project Context

## What this is
Corporate/organization website for RK Delta. Sections: Home/Landing with Modern Navbar,
Viblooop - launching soon section, About, Services, Ventures (companies we're launching),
Future Goals Timeline, Feedback Form, Contact, Custom Animated success/failure modal.
Use our @SPEC.md for other related details.

## Stack
Next.js 16 App Router, TypeScript, Tailwind v4, shadcn/ui, Framer Motion, next-themes
(dark/light toggle), react-hook-form + zod, lucide-react (the only icon library — don't
mix in a second icon set).

## Typography

- **Font: Geist Sans** (free, Vercel) as the single typeface site-wide — display, body, and UI.
  Use `-apple-system, BlinkMacSystemFont` first in the stack so Apple devices render real SF Pro,
  with Geist as the fallback everyone else sees. Do not mix in a second sans-serif family.
```css
  --font-sans: -apple-system, BlinkMacSystemFont, "Geist", "Inter", "Helvetica Neue", Arial, sans-serif;
```
  If a display/monospace accent is ever needed (code snippets, stats), use **Geist Mono** — same family, not a stylistic clash.

- **Type scale — one fixed scale, used everywhere, no ad-hoc sizes:**

  | Token          | Desktop         | Mobile          | Weight | Tracking | Use                |
  | -------------- | --------------- | --------------- | ------ | -------- | ------------------ |
  | `text-display` | 3.5rem / 56px   | 2.25rem / 36px  | 600    | -0.03em  | Hero headline only |
  | `text-h1`      | 2.5rem / 40px   | 1.875rem / 30px | 600    | -0.02em  | Section titles     |
  | `text-h2`      | 1.75rem / 28px  | 1.5rem / 24px   | 600    | -0.015em | Sub-section titles |
  | `text-h3`      | 1.25rem / 20px  | 1.125rem / 18px | 500    | -0.01em  | Card titles        |
  | `text-body`    | 1rem / 16px     | 1rem / 16px     | 400    | 0        | Paragraph copy     |
  | `text-small`   | 0.875rem / 14px | 0.875rem / 14px | 400    | 0        | Captions, labels   |

  Line-height: 1.1 for display/h1, 1.25 for h2/h3, 1.6 for body. Never hardcode a font-size outside this
  table — extend the Tailwind theme instead so it's enforced, not just documented:
```js
  // tailwind.config.ts
  fontSize: {
    display: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '600' }],
    h1: ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
    h2: ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
    h3: ['1.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' }],
    body: ['1rem', { lineHeight: '1.6' }],
    small: ['0.875rem', { lineHeight: '1.5' }],
  }
```

## Color & contrast (dark + light, toggleable)

- Single accent across both modes — a "positive delta" green, distinct from the generic
  blue/purple SaaS accents and from the overused warm-clay AI-default:
```css
  /* Dark mode */
  --bg: #0a0a0c;
  --surface: #16161a;
  --text-primary: #f5f5f7;
  --text-secondary: #86868b;   /* ~4.6:1 on --bg */
  --accent: #34d399;           /* emerald-400 — ~8:1 on --bg, safe for text + fills */

  /* Light mode */
  --bg: #fafafa;
  --surface: #ffffff;
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;   /* ~4.6:1 on --bg */
  --accent: #087f5b;           /* darker emerald — ~4.7:1 on white, AA-safe as text */
```
  Note the accent is a **different shade per mode** (bright on dark, deep on light) — using
  the same hex in both directions is the #1 cause of contrast failures in toggleable themes.
  Always verify against the pairing it actually sits on, not the value alone.

- Implementation: use `next-themes` for the toggle (class-based `dark` strategy, SSR-safe,
  no flash-of-wrong-theme). Tailwind config: `darkMode: 'class'`, then reference the CSS
  vars above via `bg-[var(--bg)]` etc. so components never hardcode a hex directly.

- Contrast floor still applies in both modes: body text ≥ 4.5:1, large text/UI ≥ 3:1 —
  check every new pairing before shipping, don't eyeball it.

## Theming
- Dark/light via `next-themes`, class-based strategy — never use `prefers-color-scheme` media
  queries directly in components, always reference the CSS vars in globals.css.
- ThemeProvider must wrap the app before any component using `dark:` variants is built.
- Every new component must be checked in both modes before considered done.

## UI primitives
- shadcn/ui is configured with **Radix UI** as the base (not Base UI) — more mature, better
  documented, matches the accessibility patterns already assumed throughout this project.
- Initialized with `--base radix --preset nova` (the default preset) — component styling is
  then overridden by our own CSS vars above, so don't hunt for a "matching" preset; nova is
  just the scaffold.
- `cn()` helper lives at `src/lib/utils.ts` (created by `shadcn init`) — use it for every
  conditional className rather than manual string concatenation.

## Non-negotiables
- All components must be accessible (keyboard nav, ARIA labels, contrast AA minimum)
- Every page needs proper metadata (title, description, OG tags)
- Images use next/image, never raw <img>
- Mobile-first responsive design, test at 375px, 768px, 1280px
- No inline styles — Tailwind utility classes only, use cn() helper for conditional classes
- Animations must respect prefers-reduced-motion
- Run `npm run lint` and `npm run typecheck` before considering any task done

## Folder conventions
- `/src/app` — routes
- `/src/components` — shared components used across sections (Navbar, ThemeProvider,
  ThemeToggle, NotificationProvider)
- `/src/components/ui` — shadcn primitives (don't hand-edit generated code style)
- `/src/components/sections` — page sections (Hero, Services, FeedbackForm, etc.)
- `/src/lib` — utilities, validation schemas
- `/src/content` — static content (copy, ventures list) as typed .ts files

## Security — the one thing that actually matters here
The feedback form is the only public write-endpoint. It must have:
- Zod validation server-side (not just client-side)
- A honeypot field, minimum — rate limiting if launch traffic looks meaningful
- No secrets in any `NEXT_PUBLIC_` variable

## Feedback delivery
Submissions POST to `/api/feedback` (Zod validation + honeypot + rate limit), forwarded to
a Google Apps Script Web App that appends a row to the team's Sheet. On success/error, call
`useNotification()` from `NotificationProvider` — a custom-built animated RK Delta modal, not
a generic toast library. Don't reintroduce sonner or another toast package for this.
Required env vars (see `.env.example`): `GOOGLE_SHEETS_WEBHOOK_URL`, `FEEDBACK_WEBHOOK_SECRET`
— both server-only, never exposed to the client.

## Commands
- `npm run dev` — start dev server
- `npm run lint` — ESLint
- `npm run typecheck` — tsc --noEmit
- `npm run build` — production build (must pass before merging)

## Before calling anything done
1. `npm run lint`
2. `npm run typecheck`
3. Click through the feature yourself at mobile + desktop width — that's your test suite for now

## Tools & MCP servers available to boost UI quality
- **shadcn/ui CLI** (`npx shadcn@latest add <component>`) — pull real accessible components
  instead of hand-rolling them
- **21st.dev** — browse for polished component patterns (hero sections, pricing, etc.) as reference
- **Aceternity UI / Magic UI** — free animated Tailwind snippets for hero backgrounds, spotlight effects
- **Context7 MCP** — pulls current Framer Motion/Next.js docs into context so APIs aren't hallucinated
- **Playwright MCP** — open the running dev site, screenshot sections, and self-verify layout/animation
  ```bash
  claude mcp add playwright npx '@playwright/mcp@latest'
  ```

## Explicitly deferred until there's a reason to need them
CI pipeline, Playwright/Vitest test suite, commitlint, coverage thresholds, visual regression.
Revisit if the team grows past one person or the site takes on real traffic/complexity.
