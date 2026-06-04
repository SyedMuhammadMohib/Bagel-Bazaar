import { execSync } from "child_process";
import { statSync, unlinkSync, existsSync } from "fs";

const ids = [
  "1495474472287-4d71bcdd2085",
  "1553243968-186531870263",
  "1614707267037-70c928778961",
  "1528735602788-8d77bc9c1770",
  "1447933601403-0c6688de566e",
  "1578662996442-48f60103fc96",
  "1511920170038-c55303434147",
];

for (const id of ids) {
  const url = `https://images.unsplash.com/photo-${id}?w=640&h=512&q=80&auto=format&fit=crop`;
  const out = "_t.jpg";
  execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${url}" -o "${out}"`, {
    stdio: "pipe",
  });
  const size = statSync(out).size;
  console.log(id, size);
  unlinkSync(out);
}
