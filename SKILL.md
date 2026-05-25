---
name: gal-design
description: Use this skill to generate well-branded interfaces and assets for Gal, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

The Gal design system is a refined, modern visual language for complex web applications — generous whitespace, mono uppercase labels, a single orange accent, and floating cards on a quiet diagonal-grid stage. It has two equally-weighted modes (light and dark), tightly scoped semantic colors, and a strong rule against ornament (no gradients on surfaces, no emoji, no hand-drawn SVGs).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Always start by linking the canonical token stylesheet:

```html
<link rel="stylesheet" href="path/to/colors_and_type.css">
```

Then wrap your composition in a `.gal-stage` element to get the diagonal-hairline background. Use `--accent` (orange `#F5642B`) for primary actions only, `--success` / `--danger` / `--warning` / `--info` for status, and the `.gal-pill` / `.gal-label` / `.mono-label` patterns documented in `colors_and_type.css` for the signature uppercase-mono treatment.

The `ui_kits/app/` folder contains pixel-faithful React recreations of the four core product surfaces (Dashboard, Workflow editor, Competitors, Settings). Treat its `primitives.jsx` as the canonical implementation of `Button`, `Pill`, `Field`, `Toggle`, `Card`, `Avatar`, `Segmented`, `Equalizer`, `Sparkline`, and `MonoLabel` — copy these patterns when building new screens rather than reinventing them.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
