/** Debug: analyze match quality per item */
import { readFileSync, readdirSync } from "fs";

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

const raw = readFileSync("js/menu-data.js", "utf8");
const cats = JSON.parse(raw.replace(/^[\s\S]*?=\s*/, "").replace(/;\s*$/, ""));
const map = JSON.parse(readFileSync("js/menu-images.js", "utf8").match(/const IMAGE_MAP = (\{[\s\S]*?\});/)[1]);
const files = readdirSync("data");

const coffeeLike = /coffee|cappuccino|latte|frappe|espresso|box o joe/i;
const suspicious = [];

for (const cat of cats) {
  for (const it of cat.items) {
    const path = map[it.id] || "";
    const file = path.replace("data/", "");
    const fileNorm = norm(file);
    const nameNorm = norm(it.name);
    const isCoffeeItem = coffeeLike.test(it.name);
    const fileLooksCoffee = coffeeLike.test(file);
    if (!isCoffeeItem && fileLooksCoffee) {
      suspicious.push({ name: it.name, file, id: it.id });
    }
    if (fileNorm !== nameNorm && !nameNorm.includes(fileNorm) && !fileNorm.includes(nameNorm)) {
      const words = nameNorm.split(" ").filter((w) => w.length > 2);
      const hits = words.filter((w) => fileNorm.includes(w)).length;
      if (hits / words.length < 0.5 && !isCoffeeItem) {
        // loose check
      }
    }
  }
}

console.log("Non-coffee items with coffee-like filenames:", suspicious.length);
suspicious.forEach((s) => console.log(`  ${s.name} -> ${s.file}`));

const byPath = {};
for (const cat of cats) for (const it of cat.items) {
  const p = map[it.id];
  if (!byPath[p]) byPath[p] = [];
  byPath[p].push(it.name);
}
console.log("\nDuplicate paths:", Object.entries(byPath).filter(([, v]) => v.length > 1).length);
