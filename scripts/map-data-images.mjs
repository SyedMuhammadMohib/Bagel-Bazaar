/**
 * Maps menu items to uploaded images in /data — one unique file per item.
 * Run: node scripts/map-data-images.mjs
 */
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "data");
const CACHE_VERSION = 3;

function loadCategories() {
  const raw = readFileSync(join(root, "js/menu-data.js"), "utf8");
  return JSON.parse(raw.replace(/^[\s\S]*?=\s*/, "").replace(/;\s*$/, ""));
}

function norm(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\//g, " ")
    .replace(/[''`]/g, "")
    .replace(/\.(jpg|jpeg|jfif|png|webp)$/i, "")
    .replace(/\(\s*(\d+)\s*oz\.?\s*\)/gi, " $1oz ")
    .replace(/\(\s*(\d+)\s*\)/g, " $1 ")
    .replace(/(\d+)\s*upon\s*(\d+)/gi, "$1 upon $2")
    .replace(/(\d+)\s*\/\s*(\d+)/g, "$1 upon $2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const STOP_WORDS = new Set(["the", "and", "with", "our", "for", "add", "lb"]);

/** Filename overrides where menu label differs from uploaded filename */
const MANUAL_ALIASES = {
  "single espresso": "SingleEspresso.jpg",
  "iced latte": "IcedLatte.jpg",
  "flavored iced latte": "FlavoredIcedLatte.jpg",
  "bagels 13": "Bagel (13).jpg",
  "bagel 13": "Bagel (13).jpg",
  "bagel w plain cream cheese": "bagel with plain cream cheese.jpg",
  "bagel w vegetable cream cheese": "Vegetable Cream Cheese.jpg",
  "bagel w lox spread": "bagel with lox spread.jpg",
  "the hammy omelette": "Omelette.jpg",
  "lox slices 1 4 lb": "Lox Slices (1 upon 4 lb.).jfif",
  "lox slices 1 2 lb": "Lox Slices (1 upon 2 lb).jfif",
  "lox slices 1 lb": "Lox Slices (1 lb.).jfif",
  "white tuna salad 1 4 lb": "White Tuna Salad (1 upon 4 lb).jfif",
  "low fat veggie tuna salad 1 4 lb": "Low Fat Veggie Tuna Salad( 1 upon 4 lb).jpg",
  "white chicken salad 1 4 lb": "White Chicken Salad( 1 upon 4 lb ).jpg",
  "cranberry walnut chicken salad 1 4 lb": "Cranberry Walnut Chicken Salad( 1 upon 4 lb ).jpg",
  "shrimp salad 1 4 lb": "Shrimp Salad ( 1 upon 4 lb ).jpg",
  "egg salad 1 4 lb": "Egg Salad (1 upon 4 lb).jpg",
  "whitefish salad 1 4 lb": "Whitefish Salad (1 upon 4 lb).jpg",
  "baked salmon salad 1 4 lb": "Baked Salmon Salad (1 upon 4 lb).jpg",
  "snapple 16 oz": "Snapple (16oz.).jfif",
  "arizona 20 oz": "Arizona (20oz.).jfif",
  "tropicana 12 oz": "Tropicana (12oz.).jfif",
  "tropicana 16 oz": "Tropicana (16oz.).jfif",
  "cream o land chocolate milk 16 oz": "Cream o Land Chocolate Milk (16oz).jfif",
  "starbucks frappuccino 13 oz": "Starbucks Frappuccino (13oz).jfif",
  "flavored iced coffee": "FlavoredIcedCoffee.jpg",
  "iced coffee": "IcedCoffee.jpg",
  "flavored hot cappuccino": "FlavoredHotCappuccino.jpg",
  "hot cappuccino": "Hot Cappuccino.jpg",
  "frozen frappe": "FrozenFrappe.jpg",
  "flavored frozen frappe": "Flavored Frozen Frappe.jpg",
  "flavored fresh brewed iced tea": "Flavored Fresh Brewed Iced Tea.jpg",
  "flavored fresh lemonade": "Flavored Fresh Lemonade.jpg",
  "coffee": "coffee.jpg",
  "double espresso": "Double Espresso.jpg",
  "bagel 1": "Bagel (1).jpg",
  "bagels 6": "Bagels (6).jpg",
  "diet red bull 8oz": "Diet Red Bull (8oz).jfif",
};

/** Same display name, different items — map by item id */
const ITEM_ID_FILES = {
  "bev-bang": "Bang 4.25.jfif",
  "bev-bang-alt": "Bang 4.49.jfif",
};

const files = readdirSync(dataDir).filter((f) => /\.(jpg|jpeg|jfif|png|webp)$/i.test(f));
const fileByNorm = new Map();
for (const f of files) {
  fileByNorm.set(norm(f), f);
}

function significantWords(name) {
  return norm(name)
    .split(" ")
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function resolveStrict(name, usedFiles) {
  const key = norm(name);

  if (MANUAL_ALIASES[key]) {
    const f = MANUAL_ALIASES[key];
    if (files.includes(f) && !usedFiles.has(f)) return f;
  }

  if (fileByNorm.has(key)) {
    const f = fileByNorm.get(key);
    if (!usedFiles.has(f)) return f;
  }

  const compact = key.replace(/\s/g, "");
  for (const [nk, f] of fileByNorm) {
    if (usedFiles.has(f)) continue;
    if (nk.replace(/\s/g, "") === compact) return f;
  }

  const words = significantWords(name);
  if (!words.length) return null;

  let best = null;
  let bestScore = 0;
  for (const f of files) {
    if (usedFiles.has(f)) continue;
    const fn = norm(f);
    const hits = words.filter((w) => fn.includes(w)).length;
    const score = hits / words.length;
    if (score > bestScore && score >= 0.85) {
      bestScore = score;
      best = f;
    }
  }
  return best;
}

const categories = loadCategories();
const itemsById = {};
const allItems = [];

for (const cat of categories) {
  for (const item of cat.items) {
    itemsById[item.id] = item;
    allItems.push(item);
  }
}

const usedFiles = new Set();
const mapping = {};
const report = {
  matched: [],
  unmatched: [],
  broken: [],
  duplicatesPrevented: [],
  unusedFiles: [],
};

for (const item of allItems) {
  let file = ITEM_ID_FILES[item.id] || resolveStrict(item.name, usedFiles);

  if (file && usedFiles.has(file)) {
    report.duplicatesPrevented.push({ itemId: item.id, name: item.name, file });
    file = resolveStrict(item.name, usedFiles);
  }

  if (!file) {
    report.unmatched.push({ itemId: item.id, name: item.name });
    continue;
  }

  usedFiles.add(file);
  const rel = `data/${file}`.replace(/\\/g, "/");
  const abs = join(root, rel);
  const bytes = existsSync(abs) ? statSync(abs).size : 0;
  const entry = { itemId: item.id, name: item.name, file, path: rel, bytes };

  if (bytes < 3000) {
    report.broken.push({ ...entry, reason: "file too small" });
  } else {
    report.matched.push(entry);
  }

  mapping[item.id] = rel;
}

for (const f of files) {
  if (!usedFiles.has(f) && f !== "BagelBazaarLogo.jfif") {
    report.unusedFiles.push(f);
  }
}

const PLACEHOLDER = mapping["bagel-1"] || "data/Bagel (1).jpg";
const W = 640;
const H = 512;

const IMAGE_MAP = {};
for (const item of allItems) {
  IMAGE_MAP[item.id] = mapping[item.id] || PLACEHOLDER;
}

const js = `/**
 * Bagel Bazaar Monroe — menu images from uploaded /data folder
 * Regenerate: node scripts/map-data-images.mjs
 */
(function () {
  const W = ${W};
  const H = ${H};
  const CACHE_VERSION = ${CACHE_VERSION};
  const PLACEHOLDER = "${PLACEHOLDER.replace(/\\/g, "/")}";

  const IMAGE_MAP = ${JSON.stringify(IMAGE_MAP, null, 2)};

  function encodeDataPath(path) {
    const slash = path.lastIndexOf("/");
    if (slash === -1) return encodeURIComponent(path);
    return path.slice(0, slash + 1) + encodeURIComponent(path.slice(slash + 1));
  }

  function getMenuImage(key) {
    const path = IMAGE_MAP[key] || PLACEHOLDER;
    return encodeDataPath(path) + "?v=" + CACHE_VERSION;
  }

  function getMenuImageMeta(imageKey) {
    return {
      src: getMenuImage(imageKey),
      width: W,
      height: H,
      loading: "lazy",
    };
  }

  window.MENU_IMAGES = {
    width: W,
    height: H,
    cacheVersion: CACHE_VERSION,
    placeholder: encodeDataPath(PLACEHOLDER) + "?v=" + CACHE_VERSION,
    map: IMAGE_MAP,
    get: getMenuImage,
    meta: getMenuImageMeta,
  };
})();
`;

writeFileSync(join(root, "js/menu-images.js"), js, "utf8");
writeFileSync(join(root, "assets/menu/data-image-report.json"), JSON.stringify(report, null, 2), "utf8");

const uniquePaths = new Set(Object.values(mapping));
console.log(`Matched: ${report.matched.length}/${allItems.length}`);
console.log(`Unique images: ${uniquePaths.size}`);
console.log(`Unmatched: ${report.unmatched.length}`);
console.log(`Broken: ${report.broken.length}`);
console.log(`Unused files: ${report.unusedFiles.length}`);
if (report.unmatched.length) {
  console.log("\nUnmatched items:");
  report.unmatched.forEach((u) => console.log(`  - ${u.name} (${u.itemId})`));
}
