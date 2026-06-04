import { readFileSync } from "fs";
const h = readFileSync("_tmp_menu.html", "utf8");
console.log("len", h.length);
const imgs = [...h.matchAll(/src=["']([^"']+)["']/gi)]
  .map((m) => m[1])
  .filter((s) => !s.includes("blank.gif") && !s.includes("flags"));
console.log([...new Set(imgs)].join("\n"));
const usemap = h.includes("usemap") ? "has usemap" : "no usemap";
console.log(usemap);
const mapMatch = h.match(/<map[^>]+name=["']([^"']+)["']/i);
console.log("map", mapMatch?.[1]);
// find menuImages section
const idx = h.indexOf("menuImages");
if (idx > -1) console.log(h.slice(idx, idx + 2000));
