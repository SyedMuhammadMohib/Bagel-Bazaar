# Bagel Bazaar Menu Image Assets

Central manifest: `manifest.json` (207 image keys)

## Folder structure

Replace remote placeholder URLs with local files using this naming convention:

```
assets/menu/{category}/{imageKey}.jpg
```

| Folder | Categories |
|--------|------------|
| `coffee/` | Coffee Bar |
| `bagels/` | Freshly Baked Bagels |
| `spreads/` | Spreads on a Bagel, Spreads to Go |
| `lox/` | Bagels w/ Lox, Lox to Go |
| `breakfast/` | Bakery, burritos, omelettes, pancakes, French toast, quesadillas |
| `salads/` | Salad bowls, deli salads |
| `sandwiches/` | Hot/cold specialty, salad sandwiches, vegetarian, paninis |
| `subs/` | Hot subs, hoagies |
| `wraps/` | Hot & cold wraps |
| `burgers/` | Burgers |
| `sides/` | Breakfast sides, hot dogs & sides |
| `beverages/` | Fresh & bottled beverages |

## Image reuse (allowed)

- `bagel-1` → Bagels (6), Bagels (13)
- `lox-slices` → all lox weight variants
- `chicken-tenders` → 3 and 5 piece
- `buffalo-wings` → 6 and 12 piece
- Size variants for teas, lemonades, Red Bull, Tropicana, chocolate milk

## Regenerate data

```bash
node scripts/generate-menu.mjs
node scripts/build-photo-map.mjs
node scripts/generate-images.mjs
```

Each menu item has a **unique** curated photo assignment in `photo-map.json` (207 distinct images). Size/quantity variants reuse the same image via `reuseAliases` only.

## Current status

All items use curated Unsplash placeholder URLs (`status: placeholder-remote` in manifest). Swap with client photography when available.
