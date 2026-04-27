# Radar Landing

> Marketing landing page for **Radar by Elsesser & Co.** — an AI agent for realtors that surfaces owner listings (Avito, CIAN, Yandex.Realty, etc.) before competitors.

[Русская версия](./README.ru.md)

---

## Stack

- **Next.js 16** (App Router, React 19) — Turbopack build
- **TypeScript** strict mode
- **Tailwind CSS 3** with brand tokens
- **Framer Motion** for entrance animations
- **Playfair Display** (editorial serif) + **Inter** (body) via `next/font`
- No third-party UI library — every component lives under `web/components/`

## Quick start

```bash
cd web
bun install
bun run dev         # http://localhost:3000
bun run typecheck   # tsc --noEmit
bun run build       # production build
bun run start       # serve the production build
```

> The project is pinned to **Bun** as the JS runtime and package manager.

## Project layout

```
radar-landing/
├── README.md            # this file (English, primary)
├── README.ru.md         # Russian version
└── web/                 # Next.js app
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   └── page.tsx     # the landing route
    ├── components/
    │   ├── Logo.tsx
    │   └── landing/     # Hero, Features, Pricing, FAQ, etc.
    ├── lib/
    ├── public/
    ├── scripts/
    ├── tailwind.config.ts
    ├── next.config.mjs
    ├── tsconfig.json
    └── package.json
```

## Design system

Brand palette and typography are mirrored from the parent agency site (elsesserco). Playfair Display italic is used sparingly — prices, client names, hero numerals — as a signature brand cue. Everything else is Inter.

| Token             | Hex       | Role                                    |
| ----------------- | --------- | --------------------------------------- |
| `accent`          | `#00736c` | Brand petrol — links, active state      |
| `cta`             | `#d97644` | Terracotta — primary action only        |
| `navy`            | `#1a2447` | Headlines, dark headers                 |
| `paper`           | `#fafaf8` | Warm off-white background               |
| `ink` / `ink-soft`| `#333` / `#666` | Body text                          |
| `line`            | `#e0e0e0` | Dividers                                |

## License

Proprietary — Elsesser Ind.
