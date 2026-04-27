# prop-agent-web

Мобайл-ферст веб-версия **Radar by Elsesser & Co.** — инструмент для риелторов, показывает объявления собственников раньше конкурентов.

## Стек

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS** с токенами из `elsesserandco-website/css/variables.css`
- **TypeScript**
- **Playfair Display** (editorial serif) + **Inter** (body) через `next/font`
- Без сторонних UI-библиотек — все компоненты свои, в `components/`

## Запуск

```bash
# из корня prop-agent/
cd web
bun install
bun run dev         # http://localhost:3000
bun run typecheck   # tsc --noEmit
```

Маршруты прототипа:

- `/` — лендинг
- `/mobile` — мобильная лента (ограничена 440px для удобства в desktop-браузере)
- `/mobile/details/c-001` ... `c-006` — детали объекта
- `/desktop` — трёхколоночная консоль (полноценно выглядит от 1536px, правый пейн от 2xl = 1536px)

## Дизайн-система

Палитра, типографика и радиусы перенесены один-в-один из сайта агентства:

| Токен | Hex | Роль |
|---|---|---|
| `accent` | `#00736c` | Фирменный petrol — линки, owner, активный таб |
| `cta` | `#d97644` | Terracotta — **только главное действие** (позвонить, urgent-бейдж) |
| `navy` | `#1a2447` | Заголовки, dark-хедер, cmd-palette overlay |
| `paper` | `#fafaf8` | Тёплый off-white фон |
| `ink` / `ink-soft` | `#333` / `#666` | Текст |
| `line` | `#e0e0e0` | Разделители |

Playfair Display italic используется точечно: цены, имена клиентов, hero-цифры — как сигнатурный приём бренда. Everything else — Inter.

## Структура

```
web/
├── app/
│   ├── layout.tsx            # root, загрузка шрифтов
│   ├── globals.css           # CSS-переменные + tailwind + utilities
│   ├── page.tsx              # лендинг
│   ├── mobile/
│   │   ├── layout.tsx        # обёртка 440px
│   │   ├── page.tsx          # лента
│   │   └── details/[id]/
│   │       └── page.tsx      # детали объекта
│   └── desktop/
│       └── page.tsx          # 3-колоночная консоль
├── components/
│   ├── Badge.tsx             # urgent/deal/fresh/owner/agent
│   ├── BottomTabBar.tsx
│   ├── Button.tsx
│   ├── DesktopShell.tsx      # вся десктопная консоль (клиентский)
│   ├── Icon.tsx              # inline SVG набор
│   ├── ListingCard.tsx       # карточка объекта
│   ├── MobileTopBar.tsx
│   ├── SignalRow.tsx         # строка классификатора
│   └── Sparkline.tsx         # мини-график истории цены
├── lib/
│   ├── types.ts              # FeedItem, ApartmentCluster
│   └── mockData.ts           # 6 мок-карточек + охоты + stats
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Интеграция с backend (следующий шаг)

Сейчас всё на моках (`lib/mockData.ts`). Чтобы подключить реальные данные:

1. Вынести `src/api/data-layer.ts` в shared-пакет или поднять HTTP-обёртку (`/api/feed`, `/api/cluster/:id`).
2. Заменить `MOCK_FEED` на `fetch()` в server components (App Router позволяет).
3. Добавить Web Push (VAPID) + service worker — для PWA и уведомлений идентичных Telegram-ным.

## Что ещё не сделано (намеренно — прототип визуала)

- Охоты CRUD (есть только list в сайд-бар)
- Лиды/статусы
- Авторизация (планируется Telegram Login Widget)
- Swipe-жесты на карточках (мобайл)
- Service worker / offline
