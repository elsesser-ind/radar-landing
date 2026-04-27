import sharp from "sharp";
import fs from "node:fs";

const SRC = process.argv[2] ?? "/c/Users/ok/Desktop/radar-logo.png";
const src = fs.readFileSync(SRC);

const targets = [
  { out: "public/favicon-16.png", size: 16 },
  { out: "public/favicon-32.png", size: 32 },
  { out: "public/icon-192.png", size: 192 },
  { out: "public/icon-512.png", size: 512 },
  { out: "public/apple-icon.png", size: 180 },
];

for (const t of targets) {
  await sharp(src)
    .resize(t.size, t.size, { fit: "cover" })
    .png({ palette: t.size <= 64, compressionLevel: 9 })
    .toFile(t.out);
  console.log(t.out, fs.statSync(t.out).size, "bytes");
}
