# Gal — Design System

> A refined, modern design system for complex web applications.
> Generous whitespace, mono labels, an orange accent, and floating, isolated UI on a quiet grid.

---

## Source material

This system was reverse-engineered from a corpus of **26 dashboard mockups** by designer **Max Disarto (@disarto_max)** for fictional B2B SaaS products (Stacklane, Axiom, Lumenforge, etc.). No code or Figma file was provided — only the rendered screenshots in `uploads/`. As a result:

- Token values (colors, radii, shadows) are derived by inspection, not pulled from a token file.
- Component implementations are pixel-faithful recreations, not lifted from production code.
- The brand name "**Gal**" was given by the user; the visual language is the Disarto reference.

If you have access to the original Figma file or any production codebase, attaching it would let us tighten exact values and recover state variants we couldn't observe.

---

## What kind of product is this?

Gal is a system for **information-dense B2B SaaS products** — CRMs, analytics dashboards, deployment tools, automation builders, scheduling apps, AI-assisted workspaces. Every screen in the reference is built around the same pattern: one or two focused surfaces (a card, a modal, a panel) floating on a quiet, grid-textured stage, with mono labels and a single orange action.

The reference set covers a wide product range, all sharing the same vocabulary:
- **Stacklane** — AI-prompt-tracking CRM (workflows, prompts, competitors, leaderboards)
- **Axiom** — deployment platform (build logs, environments, domains)
- **Lumenforge** — project sharing & permissions
- Wealth tracker, subscription calendar, podcast player, event tickets, settings, plan picker, AI composer

A single design system serves all of them — that's what makes it a system.

---

## Index — what's in this folder

| File / folder | What's in it |
|---|---|
| `README.md` | This file — content fundamentals, visual foundations, iconography |
| `SKILL.md` | Agent-Skill entrypoint for Claude Code |
| `colors_and_type.css` | All CSS variables (color, type, spacing, radius, shadow) + base element styles |
| `fonts/` | Font sources (currently empty — see "Fonts" section, we link Google Fonts) |
| `assets/` | Logo, brand marks, generic placeholder imagery |
| `preview/` | Small HTML cards rendered in the Design System tab (one specimen per token cluster) |
| `ui_kits/app/` | The Gal app UI kit — a click-thru recreation of the core product surfaces |

---

## Content fundamentals

**Voice.** Quiet, confident, operational. The product is a tool, not a friend. Copy describes state plainly and lets numbers and structure carry the meaning.

**Person.** Mostly second-person imperative for actions ("Add asset", "Invite creators", "Change password"), neutral / third-person for descriptions ("User registered on the platform", "Best for mid-sized teams"). The product never refers to itself in the first person.

**Casing.**
- **Title Case** for primary titles and most button labels ("Customer preview", "Add subscriber", "Share project", "Edit Event").
- **Sentence case** for descriptive subcopy and long labels ("Best for individuals & small teams", "Change your sign-in password").
- **ALL CAPS** with letter-spacing for **mono metadata labels** — section dividers, breadcrumbs, table headers, status pills, key/value labels. This is the single most distinctive copy convention in the system. Examples: `WORKFLOWS / NEW USER MARKETING SIGNUP`, `LATEST FEEDBACK:`, `TRIGGER`, `USER ACTIVITY`, `PER USER/MONTH`, `CANCEL ANYTIME. NO LONG-TERM CONTRACT.`, `+16 DANIEL, MAYA AND 16 OTHERS ARE COMING`.

**Length.** Terse. Titles are 1–4 words. Subcopy is one short sentence. Tables prefer numbers and short categorical strings over prose. Empty space is intentional — copy never fills the card just because the card is there.

**Numerics & units.**
- Currency with `$` and no decimals for whole values (`$485,970`, `$300,000`) but two decimals for prices (`$4.99`, `$156.23`).
- Percentages with a sign (`+0.90%`, `−2.5`, `+6.4`), green for positive, red for negative.
- Durations as compact strings (`12m 27s`, `8m 57s`, `25m ago`, `9h ago by …`).
- Counts in `N / TOTAL` form for capacities (`2/5`, `18/250`, `2/7`, `810/3,100`).

**Tone in microcopy.**
- Status verbs in present perfect / past: "Ready", "Published", "Active".
- Notifications are flat declarations: "This workflow has unpublished changes" + actions "Discard changes" / "Publish changes".
- No emoji. No exclamation marks. No first-person "we".
- Brand names of integrations (Mailchimp, ChatGPT, Claude, Figma, Slack, Adobe) appear verbatim with their own logo lock-ups.

**Specific phrases worth keeping:** "Add asset", "View insights", "Get embed code", "Investigate", "Migrate CRM", "Promt library" *(note: the reference contains the typo "Promt"; we standardize it as "Prompt library")*.

---

## Visual foundations

### Stage & background

Every artifact in the reference is presented as a **floating component on a quiet stage**. The stage is the most identifiable element of the system.

- **Light stage:** `#F4F4F4` warm-neutral with a faint **diagonal hairline pattern** (~1px grey lines, ~6–8% opacity, repeating at ~30px intervals, angled ~15°). Section gridlines (dashed, 1px, ~10% opacity) cross the stage at major breakpoints.
- **Dark stage:** `#0B0B0C` with the same diagonal hairline at ~4% white and dashed dividers at ~6% white.
- Cards sit on the stage with generous margins (~80–160px in screenshots). The composition is asymmetric — usually slightly right-of-center or framed within a single grid cell.

### Card surfaces

- **Light:** `#FFFFFF` fill, 1px `rgba(15,15,15,0.06)` border, ~16px outer radius for primary cards / ~10–12px for nested.
- **Dark:** `#141416` fill, 1px `rgba(255,255,255,0.06)` border, same radii.
- **Outer shadow:** very subtle — `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)`. The shadow exists but never announces itself. Cards mostly read by their crisp edge against the textured stage.
- **Inner sub-cards** (e.g. customer preview's avatar block) drop the shadow entirely and rely on a slightly lighter inner fill or a 1px hairline divider.

### Color system

The palette is **monochrome neutrals + one accent (orange) + tightly scoped semantic colors**. There are no broad pastels and no gradients on surfaces.

| Role | Light | Dark | Notes |
|---|---|---|---|
| `--bg-stage` | `#F4F4F4` | `#0B0B0C` | Outer stage |
| `--bg-surface` | `#FFFFFF` | `#141416` | Cards |
| `--bg-surface-2` | `#F7F7F7` | `#1A1A1D` | Inset rows, table headers |
| `--fg-1` | `#0F0F10` | `#FAFAFA` | Primary text, headings, numerics |
| `--fg-2` | `#5A5A60` | `#A6A6AD` | Secondary text, descriptions |
| `--fg-3` | `#9A9AA1` | `#6B6B72` | Mono labels, table headers, faint metadata |
| `--fg-4` | `#C8C8CD` | `#3A3A40` | Disabled, divider text |
| `--border` | `rgba(15,15,15,0.08)` | `rgba(255,255,255,0.08)` | Card edge, dividers |
| `--border-strong` | `rgba(15,15,15,0.14)` | `rgba(255,255,255,0.14)` | Focused input, selected segment |
| **`--accent`** | `#F5642B` | `#F5642B` | **Brand orange — CTAs, focus rings, selection borders** |
| `--accent-hover` | `#E55321` | `#FF7A45` | Pressed/hover state |
| `--accent-soft` | `#FEEBE0` | `#3A1F12` | Soft fills behind orange icons |
| `--success` | `#16A34A` | `#22C55E` | Positive change, "Active", "Ready", checks |
| `--success-soft` | `#DCFCE7` | `#0F2E1E` | Status pill background |
| `--danger` | `#DC2626` | `#F87171` | Negative change, errors |
| `--danger-soft` | `#FEE2E2` | `#3A1414` | |
| `--warning` | `#D97706` | `#F59E0B` | Warnings, "3" caution badge |
| `--info` | `#2563EB` | `#60A5FA` | Info icon, links |
| `--info-soft` | `#DBEAFE` | `#0F2235` | |
| `--violet` | `#8B5CF6` | `#A78BFA` | "Monthly" categorical |
| `--rose` | `#F43F5E` | `#FB7185` | Categorical only |

**Status pills** are always `--{role}-soft` background + `--{role}` text. They are never filled with the saturated color.

**Categorical color** (e.g. competitor table, asset breakdown bar) draws from a small unsaturated set: orange, blue, rose, violet, amber, teal — never more than 5–6 in one chart, and each is a *tint*, not a primary.

### Typography

Two families, used with discipline.

1. **Sans (UI + display):** Inter — used for everything that isn't a label. Weights: 400 / 500 / 600 / 700. Numerals are tabular for tables (`font-variant-numeric: tabular-nums`).
2. **Mono (labels + technical):** JetBrains Mono — used **only** in ALL-CAPS with letter-spacing for: section dividers, breadcrumbs, table headers, status pill text, key/value field labels, axis labels, footer captions, monetary units like `PER USER/MONTH`, log timestamps.

**Type scale (semantic):**

| Token | Family | Size | Weight | Line | Tracking | Use |
|---|---|---|---|---|---|---|
| `--t-display` | Sans | 48px | 600 | 1.05 | -0.02em | Hero numerics ($485,970) |
| `--t-h1` | Sans | 28px | 600 | 1.15 | -0.01em | Page title |
| `--t-h2` | Sans | 22px | 600 | 1.2 | -0.005em | Card title |
| `--t-h3` | Sans | 18px | 600 | 1.25 | 0 | Subsection |
| `--t-body` | Sans | 14px | 400 | 1.45 | 0 | Body / item rows |
| `--t-body-strong` | Sans | 14px | 500 | 1.45 | 0 | Names, primary cell |
| `--t-small` | Sans | 13px | 400 | 1.4 | 0 | Subcopy |
| `--t-caption` | Sans | 12px | 400 | 1.35 | 0 | Helper / metadata |
| `--t-mono-label` | Mono | 11px | 500 | 1.2 | **0.12em**, **UPPERCASE** | The signature label |
| `--t-mono-small` | Mono | 10px | 500 | 1.2 | 0.1em, UPPERCASE | Footer attribution |
| `--t-mono-data` | Mono | 13px | 500 | 1.4 | 0 | Timestamps, IDs, file paths |

The mono-label is the system's strongest typographic signature. It is **never** used in sentence case and **never** in body sizes — only as a thin, spaced, all-caps grey label sitting above or next to content.

### Spacing & sizing

- 4-pt base scale: `2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 80`.
- Card inner padding is generous: **20–24px** typical, **24–32px** for primary cards.
- Row height in lists: **44–52px** (touch-friendly on mobile, comfortable on desktop).
- Form inputs: **40px** height, **12px** horizontal padding.
- Buttons: **36px** (default), **40px** (primary CTA), **28px** (chip / pill segmented).

### Radii

- `--r-pill` 999px — pill buttons, status badges, segmented controls.
- `--r-lg` 16px — primary cards.
- `--r-md` 10px — inputs, nested cards, kbd keys.
- `--r-sm` 6px — small chips and icon backgrounds.
- The reference uses pills aggressively — buttons, badges, even date-range selectors are pills.

### Shadows / elevation

Three levels, all very soft.

- `--elev-0` no shadow (flat against stage)
- `--elev-1` `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)` — default card
- `--elev-2` `0 2px 4px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.06)` — popovers, modals
- `--elev-focus` `0 0 0 3px rgba(245,100,43,0.18)` — focus ring (orange, soft)

In dark mode shadows are de-emphasized further (alphas halved) — the card distinguishes itself with its lighter fill.

### Borders & dividers

- Hairlines everywhere — 1px at low alpha. **Never** thicker borders except the orange selection state (1.5px `--accent`).
- Dashed dividers (1px, 6-on / 4-off) are used **inside** cards to separate metadata blocks (see Event card, Deployment card).
- Vertical pipe characters `|` and slash `/` are used as inline separators in mono labels (`BUSINESS / UPDATED DAILY`, `WORKFLOWS / NEW USER MARKETING SIGNUP`).

### Animation

The reference is static, but the implied motion language is **quiet and short**.

- **Duration:** 120ms (state) / 180ms (hover) / 220ms (panel) / 320ms (sheet/modal).
- **Easing:** `cubic-bezier(0.2, 0.7, 0.2, 1)` — gentle ease-out, no bounce.
- **Hover:** background-color shift to a 4–6% darker fill (light) or 6% lighter fill (dark). Icons in icon-buttons brighten from `--fg-2` to `--fg-1`.
- **Press:** no shrink. A momentary darker fill (8–10% darker) is enough.
- **Focus:** orange focus ring `--elev-focus`, never the browser default.
- **Entry:** modals fade + 4px translateY. No springs. No bounces.

### Imagery

- **Avatars** are circular, ~32–40px, often with a tinted background (peach, lilac, mint) behind a portrait photo. Tints are very pale.
- **Logo lockups** (Mailchimp, Robinhood, Slack, etc.) sit in **rounded square chips** with a soft brand-tinted background.
- **Full-bleed photography** (Event card, Deployment preview) is treated with a subtle dither/halftone texture — never a clean glossy photo. Color stays cool/warm but desaturated.
- Generic illustration: **none**. There are no hand-drawn or vector illustrations in the reference. When a hero needs imagery, it uses a real photo with the dither treatment.

### Layout rules

- Primary surfaces are **single-column with a fixed max width** of ~520–720px when standalone, or a sidebar + content shell when in the app.
- Sidebars are **260px** wide (expanded) or **64px** (collapsed icon rail). Tooltips appear next to the icon rail with an 8px gap.
- Content uses a **12-column grid** with a 24px gutter at >1280px, falling to 8 columns at desktop and a single column on mobile.
- Stat blocks (Total Uses, Unique Users…) are equal-width cards in a 2/3/4-up row with a vertical sparkline taking the right half.

### Use of transparency & blur

- Sparingly. Popovers in dark mode use a faint backdrop blur (8–12px) over the dim stage; light mode does not blur — it just elevates with a shadow.
- Selected pill in segmented control: pure white card on a `bg-surface-2` track (no blur).

### Cards: anatomy

A typical Gal card has up to three vertical zones, **separated by dashed hairline dividers**:

1. **Header** — title in sentence/title-case at `--t-h2`, optional action chip top-right.
2. **Hero / primary value** — large numeric, or status, or a single key visual.
3. **Detail block** — table, list, or key/value grid with mono labels.
4. **Footer toolbar** — small icon buttons left, a single CTA or link right.

Dashed dividers between zones are a recurring motif.

---

## Iconography

The reference uses **outline icons, 1.5–1.75px stroke, slightly rounded corners and end-caps**, consistent across the whole set. They sit at 16–20px and are colored `--fg-2` (idle), `--fg-1` (active/hovered), or a semantic color for status icons.

Icon set used in implementation: **Lucide** (`https://unpkg.com/lucide@latest`). Lucide is the closest free CDN match to the reference's stroke weight, rounded-cap style, and gridded geometry. It is a substitution — the original set is unattributed in the screenshots — but the visual match is very close.

**FLAG TO USER:** If your real product uses a custom icon set, please share it (SVG sprite, font, or directory) so we can swap Lucide out. The system is built so this is a one-line change in `colors_and_type.css` (`--icon-stroke`) and the import in `index.html`.

**Brand & integration logos** (Mailchimp, ChatGPT, Claude, Robinhood, Slack, Adobe, Figma, Bank of America, Airbnb, Coinbase, Salesforce, HubSpot, Zendesk, Folk, Monday, Attio, Apple, Netflix, Notion) appear with their **official lock-ups** in colored rounded-square chips. We don't redraw these — when needed, the UI kit references them by official URL or leaves a slot for the user to drop in.

**Emoji** are not used. **Unicode glyphs** are used sparingly as separators (`·`, `/`, `|`).

---

*Continue to `colors_and_type.css` for the actual token definitions, and `ui_kits/app/index.html` for a click-thru recreation of the product.*
