# Bagel Bazaar Monroe — Premium Multi-Page Website

Production-ready multi-page site for Bagel Bazaar Monroe, NJ — red & white brand system, GSAP motion, and a fully visual menu using uploaded photos from the `data/` folder.

## Quick start

```bash
npx serve .
```

Open `http://localhost:3000` → Welcome (`index.html`)

## Regenerate menu image mapping

When menu data or `data/` photos change:

```bash
node scripts/map-data-images.mjs
```

## Regenerate HTML pages (optional)

After editing `scripts/build-pages.mjs` or `scripts/page-shell.mjs`:

```bash
node scripts/build-pages.mjs
```

## Pages

| Page | File |
|------|------|
| Welcome | `index.html` |
| Menu | `menu.html` |
| About Us | `about.html` |
| Location | `location.html` |
| Contact Us | `contact.html` |
| Order Online | `order.html` |
| Other | `other.html` |
| Our App | `app.html` |
| Loyalty Program | `loyalty.html` |

## Structure

```
index.html … loyalty.html   — 9 static pages
css/styles.css              — Red/white design system
js/site-config.js           — Site constants & nav
js/core.js                  — Loader, nav, transitions, reveals
js/menu-data.js             — Full menu (219 items, 30 categories)
js/menu-images.js           — Image resolver → data/ folder
js/menu.js                  — Visual menu renderer
data/                       — Uploaded menu photos (by item name)
scripts/map-data-images.mjs — Maps menu items → data/ filenames
assets/logo/                — Official Bagel Bazaar logo
```

## Brand

- **Colors:** Red `#b91c1c` / `#dc2626` on white
- **Type:** Cormorant Garamond + Outfit
- **Motion:** GSAP 3 + ScrollTrigger, `prefers-reduced-motion` respected

## Live ordering

All Order buttons link to: `https://www.bagelbazaarmonroe.com/OrderOnline.tpl`
