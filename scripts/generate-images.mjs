/**
 * Generates js/menu-images.js from local assets/menu files.
 * Run: node scripts/download-menu-images.mjs && node scripts/generate-images.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photoMap = JSON.parse(readFileSync(join(root, "assets/menu/photo-map.json"), "utf8"));
const manifest = JSON.parse(readFileSync(join(root, "assets/menu/manifest.json"), "utf8"));
const { photos: PHOTO_BY_KEY, reuseAliases: REUSE_ALIASES } = photoMap;
const keys = Object.keys(manifest);

let downloadMeta = {};
const metaPath = join(root, "assets/menu/download-meta.json");
if (existsSync(metaPath)) {
  downloadMeta = JSON.parse(readFileSync(metaPath, "utf8")).downloadMeta || {};
}

function loadKeyFolders() {
  const raw = readFileSync(join(root, "js/menu-data.js"), "utf8");
  const json = raw.replace(/^[\s\S]*?=\s*/, "").replace(/;\s*$/, "");
  const categories = JSON.parse(json);
  const map = {};
  for (const cat of categories) {
    for (const item of cat.items) map[item.imageKey] = cat.folder;
  }
  return map;
}

const keyFolders = loadKeyFolders();
const W = 640;
const H = 512;
const PLACEHOLDER = "assets/menu/_placeholder/default.jpg";

function resolvePhotoKey(key) {
  const alias = REUSE_ALIASES[key];
  return alias ? resolvePhotoKey(alias) : key;
}

function localPath(key) {
  const canonical = resolvePhotoKey(key);
  if (downloadMeta[canonical]?.path) return downloadMeta[canonical].path;
  const folder = keyFolders[canonical] || keyFolders[key] || "breakfast";
  return `assets/menu/${folder}/${canonical}.jpg`;
}

const IMAGE_MAP = {};
const updatedManifest = { ...manifest };

for (const key of keys) {
  const canonical = resolvePhotoKey(key);
  const path = localPath(key);
  const abs = join(root, path);
  const src = existsSync(abs) ? path : PLACEHOLDER;
  const meta = downloadMeta[canonical];

  IMAGE_MAP[key] = src;
  updatedManifest[key] = {
    ...updatedManifest[key],
    path,
    local: src,
    remote: meta?.url || updatedManifest[key]?.remote || null,
    photoId: PHOTO_BY_KEY[canonical] || null,
    canonicalKey: canonical,
    source: meta?.source || (existsSync(abs) ? "local-stock" : "fallback"),
    status: existsSync(abs) ? "local" : "missing-local",
  };
}

const js = `/**
 * Bagel Bazaar Monroe — menu image manifest (local assets)
 * Regenerate: node scripts/download-menu-images.mjs && node scripts/generate-images.mjs
 */
(function () {
  const W = ${W};
  const H = ${H};
  const PLACEHOLDER = "${PLACEHOLDER}";

  const IMAGE_MAP = ${JSON.stringify(IMAGE_MAP, null, 2)};

  function getMenuImage(imageKey) {
    return IMAGE_MAP[imageKey] || PLACEHOLDER;
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
    placeholder: PLACEHOLDER,
    map: IMAGE_MAP,
    get: getMenuImage,
    meta: getMenuImageMeta,
  };
})();
`;

writeFileSync(join(root, "js", "menu-images.js"), js, "utf8");
writeFileSync(join(root, "assets", "menu", "manifest.json"), JSON.stringify(updatedManifest, null, 2), "utf8");

const localCount = Object.values(IMAGE_MAP).filter((p) => p.startsWith("assets/menu/") && !p.includes("_placeholder")).length;
console.log(`menu-images.js: ${keys.length} keys, ${localCount} local asset paths`);
