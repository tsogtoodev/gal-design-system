# Gal app · UI kit

A click-thru recreation of the Gal product, based on the @disarto_max reference set. The UI kit demonstrates four core screens with shared primitive components.

## Files

| File | Contents |
|---|---|
| `index.html` | App shell — boots React + Babel, mounts `App` |
| `app.jsx` | Routing between screens + theme toggle |
| `primitives.jsx` | Button, Pill, Field, Toggle, Card, IconButton, MonoLabel, Segmented, Avatar |
| `Sidebar.jsx` | Collapsible left rail with mono nav |
| `screens/Dashboard.jsx` | KPI tiles, equalizer, activity log |
| `screens/Workflow.jsx` | Workflow editor — node graph with mono section labels |
| `screens/Competitors.jsx` | Competitor table + platform distribution + leaderboard |
| `screens/Settings.jsx` | Settings panel with side nav and form fields |

## Stack

- React 18 (UMD) + Babel standalone — no build step, all browser-side.
- Lucide icons via CDN.
- Inherits all tokens from `../../colors_and_type.css`.

## Caveats

- The reference was screenshots only — interaction details (hover, focused, drag) are best-guesses from static state.
- Avatars use [unavatar.io](https://unavatar.io)-style placeholders; replace with real photos for production.
- The workflow editor is a faked node graph — node positions are absolute, not draggable.
