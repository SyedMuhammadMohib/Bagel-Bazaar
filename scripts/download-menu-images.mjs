/**
 * Downloads menu photos into assets/menu/{folder}/{imageKey}.jpg
 * Run: node scripts/build-photo-map.mjs && node scripts/download-menu-images.mjs && node scripts/generate-images.mjs
 */
import { execSync } from "child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadCategories() {
  const raw = readFileSync(join(root, "js/menu-data.js"), "utf8");
  return JSON.parse(raw.replace(/^[\s\S]*?=\s*/, "").replace(/;\s*$/, ""));
}

function buildKeyFolders(categories) {
  const map = {};
  for (const cat of categories) {
    for (const item of cat.items) map[item.imageKey] = cat.folder;
  }
  return map;
}

function curlDownload(url, dest) {
  execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${url}" -o "${dest}"`, {
    stdio: "pipe",
  });
  const size = statSync(dest).size;
  if (size < 7500) throw new Error(`Download too small (${size}b): ${url}`);
}

async function poolMap(items, limit, fn) {
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
}

async function main() {
  const categories = loadCategories();
  const { photos, reuseAliases } = JSON.parse(readFileSync(join(root, "assets/menu/photo-map.json"), "utf8"));
  const keyFolders = buildKeyFolders(categories);
  const keys = Object.keys(photos);

  const downloadMeta = {};
  let downloaded = 0;
  let skipped = 0;

  await poolMap(keys, 8, async (key) => {
    const folder = keyFolders[key] || "breakfast";
    const dir = join(root, "assets/menu", folder);
    mkdirSync(dir, { recursive: true });
    const dest = join(dir, `${key}.jpg`);
    const relPath = `assets/menu/${folder}/${key}.jpg`.replace(/\\/g, "/");
    const url = photos[key];

    if (existsSync(dest) && statSync(dest).size > 7500) {
      skipped++;
      downloadMeta[key] = {
        path: relPath,
        source: url.includes("bagelbazaarmonroe.com") ? "bagel-bazaar-site" : "local-stock",
        bytes: statSync(dest).size,
        cached: true,
      };
      return;
    }

    try {
      curlDownload(url, dest);
      downloadMeta[key] = {
        path: relPath,
        source: url.includes("bagelbazaarmonroe.com") ? "bagel-bazaar-site" : "local-stock",
        bytes: statSync(dest).size,
        url,
      };
      downloaded++;
      process.stdout.write(".");
    } catch (err) {
      console.error(`\nFailed ${key}:`, err.message);
      downloadMeta[key] = { path: relPath, source: "error", error: err.message, url };
    }
  });

  const phDir = join(root, "assets/menu/_placeholder");
  mkdirSync(phDir, { recursive: true });
  const phDest = join(phDir, "default.jpg");
  if (!existsSync(phDest) || statSync(phDest).size < 8000) {
    curlDownload(photos["coffee-drip"] || photos["bagel-1"], phDest);
  }

  writeFileSync(
    join(root, "assets/menu/download-meta.json"),
    JSON.stringify({ downloadMeta, reuseAliases }, null, 2)
  );
  console.log(`\nDownloaded: ${downloaded}, cached: ${skipped}, total: ${keys.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
