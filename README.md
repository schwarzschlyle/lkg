# LKG Portfolio

Single-page marketing site for **Lyle Kenneth Geraldez — Full-Stack AI Systems Engineer**,
built from `website-spec.md` (v2). React 19 · Vite · TypeScript.

> Core message: *Anyone can generate an app; Lyle engineers ones that survive real users,
> real data, and real failure.* The site's own polish is the proof of skill.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over `src/` |
| `npm run typecheck` | Type-check without emitting |

## Configuration

Copy `.env.example` to `.env` and fill in what you have:

| Variable | Effect |
| --- | --- |
| `VITE_BOOKING_URL` | Embeds the Cal.com / Calendly scheduler inline in Contact. Unset → the dashed placeholder card renders instead. |
| `VITE_CONTACT_FORM_ENDPOINT` | Formspree / Web3Forms endpoint the fallback form posts to. Unset → the form renders but submission is held (no backend to post to). |

## Architecture

### Atomic design

```
src/components/
  atoms/       Button, Chip, Eyebrow, Lead, SectionHeading, Reveal,
               AccentText, GlowOrb, ScrollCue, CustomCursor, ScrollProgressBar
  molecules/   DifferentiatorCard (+ themed vizzes), MethodStep (+ line glyphs),
               ThemeRow, BlueprintDoc, PhaseStation, StackGroup, FormField,
               AssembledHeadline, SeamHairline, SectionIndex
  organisms/   Hero, TrustStrip, Problem, Differentiators, Depth, Deliverable,
               Phasing, Method, Stack, About, Contact, Navbar, MobileMenu,
               Footer, StickyCta
  templates/   Section, LightSection
```

`App.tsx` is the page: it composes the organisms in the order of the spec's
energy map (§1.5) and owns nothing but the mobile-menu open state.

### Styling: tokens + CSS Modules

`src/styles/tokens.css` is the **only** global theme hook. It declares the full
design system on `:root` (dark) and re-declares the same token names on
`.section--light` (warm bone). Everything else is a component-scoped
`*.module.css` that reads tokens.

The practical consequence: **no component contains a `.section--light .thing`
override**. Wrapping a section in `<LightSection>` flips the tokens for its
whole subtree, so a `Chip`, a `Button` or a `MethodStep` renders correctly in
either mode without knowing which one it is in. Derived tokens
(`--card-spotlight`, `--doc-surface`, `--node-glow`, `--rail-glow`, …) carry the
per-mode differences the raw palette can't.

`--accent` stays cool teal in both modes (the always-dark nav pill needs it);
`--accent-ink` is the accent that meets the *local* background, so content uses
that one.

### Motion

- One rAF-batched `scroll` + `resize` subscription (`src/lib/scrollBus.ts`)
  feeds every scroll-driven effect, instead of six independent listeners.
- Anything that updates per frame — the progress bar, the blueprint fan, the
  Depth connector, the rails — is written straight to the DOM through a ref.
  Only genuinely discrete state (which node is lit) goes through React.
- Reveal-on-scroll is a **keyframe animation**, not a transition, so it can
  never collide with a component's own `transition` in the cascade.
- `prefers-reduced-motion: reduce` replaces all motion with instant fades and
  disables the custom cursor, the tilt, the magnetic pull and the canvases
  (which then render a single static frame).

### Content

Every string lives in `src/content/` as typed data (`src/types/content.ts`).
Copy edits never require opening a component.

## Still to supply

- **`public/og.png`** — the Open Graph image referenced in `index.html`.
- **A real photo** — see the comment in `organisms/About/About.tsx`; drop the
  file in `public/` and swap the placeholder for the `<img>`.
- **Real social URLs** — `BRAND.linkedin` / `BRAND.github` in `src/content/site.ts`.
