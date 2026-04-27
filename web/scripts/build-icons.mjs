// Рендерит SVG-мастера в PNG нужных размеров для Telegram BotFather и PWA.
// Использует sharp, который Next тянет как dependency для image-optimization.
//
// Запуск:  bun run icons   (или  node scripts/build-icons.mjs)
//
// Результат: public/bot-avatar-512.png  → загружаем в @BotFather /setuserpic
//            public/icon-192.png, icon-512.png  → PWA manifest
//            public/favicon-32.png              → fallback для древних браузеров

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = resolve(__dirname, "..", "public");

const targets = [
  { src: "bot-avatar.svg", out: "bot-avatar-512.png", size: 512 },
  { src: "bot-avatar.svg", out: "bot-avatar-1024.png", size: 1024 },
  { src: "bot-avatar.svg", out: "icon-512.png", size: 512 },
  { src: "bot-avatar.svg", out: "icon-192.png", size: 192 },
  { src: "favicon.svg", out: "favicon-32.png", size: 32 },
  { src: "favicon.svg", out: "favicon-16.png", size: 16 },
];

for (const t of targets) {
  const svg = readFileSync(resolve(pub, t.src));
  const png = await sharp(svg, { density: 384 })
    .resize(t.size, t.size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(resolve(pub, t.out), png);
  console.log(`✓ ${t.out} (${t.size}×${t.size})`);
}

console.log("\nДалее:\n  @BotFather → /setuserpic → загрузи public/bot-avatar-512.png");
