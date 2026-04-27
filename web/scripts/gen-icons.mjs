import sharp from "sharp";
import fs from "node:fs";

const SRC = process.argv[2] ?? "C:/Users/ok/Desktop/radar-logo.png";
const src = fs.readFileSync(SRC);

const RADIUS_RATIO = 0.2;

const targets = [
  { out: "public/favicon-16.png", size: 16 },
  { out: "public/favicon-32.png", size: 32 },
  { out: "public/icon-192.png", size: 192 },
  { out: "public/icon-512.png", size: 512 },
  { out: "public/apple-icon.png", size: 180 },
];

function maskFor(size) {
  const r = Math.round(size * RADIUS_RATIO);
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#000"/></svg>`,
  );
}

for (const t of targets) {
  await sharp(src)
    .resize(t.size, t.size, { fit: "cover" })
    .composite([{ input: maskFor(t.size), blend: "dest-in" }])
    .png({ compressionLevel: 9, palette: t.size <= 64 })
    .toFile(t.out);
  console.log(t.out, fs.statSync(t.out).size, "bytes");
}
