# Portfolio — glass landing page

Open **`index.html`** in any modern browser (double-click it). No install, no build step, and no server is required.
Fonts load from Google Fonts when you're online; offline it falls back to the system fonts.

## Quick start

1. Edit your details in `assets/js/01-config.js`.
2. Update the content in `index.html` if you want custom copy or project names.
3. Adjust theme tokens in `assets/css/01-tokens.css` when you want new colours or brand styling.

## File structure

Everything is numbered in the order the browser loads it.

```
index.html                  page structure and content
assets/
├── css/
│   ├── 01-tokens.css       brand colours, fonts, spacing, easing
│   ├── 02-base.css         base reset, utility classes, focus states
│   ├── 03-glass.css        shared glass surfaces and blur styling
│   ├── 04-layout.css       page shell, nav, hero, section layout, footer
│   ├── 05-components.css   buttons, card, ring, panels, folding steps
│   ├── 06-animations.css   motion keyframes, reveal states, reduced-motion rules
│   └── 07-responsive.css   tablet and mobile overrides
└── js/
    ├── 01-config.js        personal details and shared site settings
    ├── 02-utils.js         small helpers and shared validation
    ├── 03-engine.js        single animation loop and pointer tracking
    ├── 04-content.js       fills the page from the config object
    ├── 05-reveal.js        intersection-based reveal animation
    ├── 06-headline.js      magnetic lettering and typeface switcher
    ├── 07-hero.js          tilt, spotlight, and drifting glows
    ├── 08-cursor.js        trailing glass cursor
    ├── 09-magnetic.js      magnetic buttons
    ├── 10-marquee.js       looping marquee type band
    ├── 11-projects.js      accordion-style project panels
    ├── 12-ring.js          draggable 3D skill ring
    ├── 13-fold.js          expandable process / workflow steps
    ├── 14-nav.js           progress bar, current section highlight, menu toggle
    ├── 15-theme.js         aura / sunset / ocean theme switcher with saved state
    └── 99-main.js          starts each module in the correct order
```

## Where to edit things

| I want to… | Go to |
| --- | --- |
| Change my name, email, city, and social links | `assets/js/01-config.js` |
| Update colours or fonts | `assets/css/01-tokens.css` |
| Adjust the glass blur | `--blur` in `assets/css/01-tokens.css` |
| Rewrite project copy or project names | `index.html` |
| Swap placeholder art for images | use `<img class="media" ...>` in `index.html` instead of the abstract CSS media blocks |

## Live Demo

https://prodevamit.github.io/Portfolio_3/

## Notes

- The sample project names and summaries are intentionally neutral and should be replaced with real case studies when available.
- Motion is reduced automatically when `prefers-reduced-motion` is enabled, while content remains accessible and readable.
- The site supports keyboard interaction, touch devices, and pointer-based effects without sacrificing content readability.
