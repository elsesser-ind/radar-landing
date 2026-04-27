---
name: Radar by Elsesser & Co.
description: Editorial B2B landing — boutique real-estate atelier meets Telegram-native product. Petrol + terracotta on warm paper, Playfair italic accents, blueprint grid.
colors:
  accent: "#00736c"
  accent-hover: "#005d57"
  cta: "#d97644"
  cta-hover: "#c4693d"
  navy: "#1a2447"
  ink: "#333333"
  ink-soft: "#666666"
  paper: "#fafaf8"
  paper-card: "#ffffff"
  paper-muted: "#f5f5f5"
  line: "#e0e0e0"
  line-soft: "#ececec"
  on-accent: "#ffffff"
  on-cta: "#ffffff"
  on-navy: "#ffffff"
typography:
  display-xl:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontSize: 72px
    fontWeight: "700"
    lineHeight: 1.0
    letterSpacing: -0.025em
    notes: Hero H1. One italic accent word in `accent` per headline.
  display-lg:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontSize: 54px
    fontWeight: "700"
    lineHeight: 1.05
    letterSpacing: -0.02em
  display-md:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontSize: 36px
    fontWeight: "600"
    lineHeight: 1.1
    letterSpacing: -0.015em
  display-sm:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontSize: 28px
    fontWeight: "600"
    lineHeight: 1.1
    letterSpacing: -0.01em
  display-stat:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontStyle: italic
    fontSize: 36px
    fontWeight: "500"
    lineHeight: 1.0
    notes: Big numbers (`14 сек`, `×4`, `85%+`). `tabular-nums`.
  body-lg:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: 20px
    fontWeight: "400"
    lineHeight: 1.55
  body-md:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.55
  body-sm:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.5
  label-nav:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: 13px
    fontWeight: "600"
    textTransform: uppercase
    letterSpacing: 0.5px
    notes: Nav links, eyebrow chips, CTA button labels, small captions.
  label-xs:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: 11px
    fontWeight: "600"
    textTransform: uppercase
    letterSpacing: 0.08em
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  none: 0
  notes: No `full` / pill radius on CTAs — keep edges sharp and editorial. `rounded-sm` (4px) is the default for buttons.
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  "2xl": 64px
  section-y: 96px
  container-max: 1280px
  container-px: 24px
breakpoints:
  xs: 380px
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  "2xl": 1536px
shadows:
  sm: 0 1px 2px rgba(0, 0, 0, 0.05)
  md: 0 2px 8px rgba(0, 0, 0, 0.08)
  lg: 0 4px 16px rgba(0, 0, 0, 0.12)
  xl: 0 8px 32px rgba(0, 0, 0, 0.16)
  card-hover: 0 8px 24px rgba(26, 36, 71, 0.12)
motion:
  duration-fast: 150ms
  duration-base: 300ms
  duration-slow: 500ms
  ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1)
  rise: opacity 0→1 + translateY 12px→0 over 400ms ease-out-expo
  reveal: scroll-triggered `whileInView` on framer-motion, 40–60px offset
textures:
  grain:
    blend: overlay
    opacity: 0.06
    notes: Subtle SVG fractal noise overlay, `::before` on hero and editorial sections. Never on cards or chat.
  blueprint:
    color: rgba(26, 36, 71, 0.04)
    grid: 48px × 48px
    notes: Navy grid lines on paper — only in Hero and big-stats sections.
  bg-chat:
    base: paper-muted
    accents: radial gradients of accent/5 and cta/4 — Telegram-style paisley.
components:
  button-primary:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.on-cta}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.sm}"
    padding: 0 28px
    height: 56px
    shadow: "{shadows.md}"
    hover:
      backgroundColor: "{colors.cta-hover}"
      shadow: "{shadows.lg}"
      transform: translateY(-2px)
  button-secondary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.sm}"
    padding: 0 24px
    height: 56px
    shadow: "{shadows.md}"
    hover:
      backgroundColor: "{colors.accent}"
  button-inverse:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.navy}"
    border: 2px solid "{colors.navy}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.sm}"
    hover:
      backgroundColor: "{colors.paper-muted}"
  button-ghost-editorial:
    backgroundColor: transparent
    textColor: "{colors.navy}"
    borderBottom: 2px solid "{colors.navy}"
    typography: "{typography.label-nav}"
    height: 56px
    padding: 0 24px
    hover:
      textColor: "{colors.accent}"
      borderBottomColor: "{colors.accent}"
    notes: Editorial text-link-as-button. Preferred for secondary actions next to the terracotta primary.
  eyebrow-chip:
    backgroundColor: rgba(0, 115, 108, 0.05)
    border: 1px solid rgba(0, 115, 108, 0.20)
    textColor: "{colors.accent}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.sm}"
    height: 32px
    padding: 0 12px
    notes: Section tags (e.g. "Работает прямо в Telegram — без приложений").
  card:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    border: 1px solid "{colors.line}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    shadow: "{shadows.sm}"
    hover:
      shadow: "{shadows.card-hover}"
  card-flat:
    backgroundColor: "{colors.paper-muted}"
    border: 1px solid "{colors.line-soft}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    notes: Lower-emphasis panels inside sections.
  popover:
    backgroundColor: "{colors.paper-card}"
    border: 1px solid "{colors.line}"
    rounded: "{rounded.md}"
    shadow: "{shadows.xl}"
    minWidth: 260px
    notes: TelegramCTA popover, feedback menus. Animated rise 180ms ease-out-expo.
  nav-link:
    typography: "{typography.label-nav}"
    textColor: "{colors.ink}"
    hover:
      textColor: "{colors.accent}"
    active:
      underline: 2px solid "{colors.accent}"
    notes: Underline grows left→right, 300ms ease.
  hr-divider:
    borderColor: "{colors.line}"
    notes: Hair-line 1px separators; never use heavy rules.
  skeleton:
    backgroundColor: linear-gradient(90deg, #f0efec 0%, #f7f6f3 50%, #f0efec 100%)
    animation: shimmer 1.6s linear infinite
---

## Overview

Radar is a B2B product for Russian real-estate realtors — but the **landing
pitches as a quiet atelier, not a SaaS**. The voice is low, confident, almost
print-like: editorial italic Playfair headlines with one accented word per
title, warm off-white paper, thin blueprint grids, and a single terracotta
call-to-action that never competes with its surroundings.

Think *Monocle magazine meets Telegram bot*. The core visual move is
**petrol + terracotta on warm paper** — the petrol is Elsesser & Co.'s
house colour (professional, calm, trustworthy), terracotta is the one place
we raise our voice (the CTA), and everything else stays in navy / ink /
paper neutrals. The audience is agency owners and solo realtors in Russia,
so the feel needs to read as *курируемый продукт от коллеги*, not
*стартап с Product Hunt*.

## Colors

Five families — each with a specific job and almost no overlap.

- **accent (petrol `#00736c`)** — the Elsesser & Co. house mark. Used for
  hover/active states on navigation, small accent chips, active CTA
  popovers, italic emphasis words in Playfair headlines, and inline link
  hover. **Never** the primary button surface.
- **cta (terracotta `#d97644`)** — reserved for the primary CTA only
  (`TelegramCTA primary`). There is exactly **one** terracotta surface
  visible at any scroll position. This is a hard rule — the whole design
  economy depends on it.
- **navy (`#1a2447`)** — all display typography (`h1/h2/h3`), secondary
  button surface, and the blueprint grid tint. Headlines are navy by
  default; the italic accent word swaps to petrol.
- **ink / ink-soft (`#333` / `#666`)** — body copy and secondary meta.
  Body text is always `ink` on `paper`, meta labels and captions are
  `ink-soft`.
- **paper family (`paper` / `paper-card` / `paper-muted`)** — paper is
  the page base (#fafaf8 — deliberately warm, not #fff), paper-card is
  pure white for elevated cards/popovers, paper-muted is the silent grey
  for flat panels and chat backdrops.
- **line / line-soft** — 1px hair-lines only. Never heavier than 1px
  except the `border-b-2` under the ghost-editorial button.

**Semantic roles:** no dedicated error / success / warning tokens on the
landing — there are no forms. Errors surface in the Telegram bot, not here.

**Ratios:** `accent` ≈ 5% of ink real estate; `cta` ≈ 1% (buttons only);
`navy` ≈ 15% (headlines + a few button states); remainder is paper + ink.

## Typography

Two families, with deliberate contrast in temperament.

- **Playfair Display (serif, often italic)** — every headline, every big
  number in BigStats / Hero stats, every editorial stat in section openers.
  Italic is not a variant — it's a **signature**: one italic word
  per headline carries the meaning (`"Звоните собственнику *первым*"`,
  `"*Не* тридцать шестым"`). Weights 500–700.
- **Inter (sans)** — all body copy, meta, labels, and button text. Weights
  300–700. Buttons use Inter 600 uppercase with `letter-spacing: 0.5px`.

**Hierarchy cues:**

- Hero `h1` goes to `72px / line-height 1.0` on desktop and scales down
  to `34px` on mobile. Always `tracking-tight` (-0.025em).
- Body text is never larger than `body-lg (20px)`. Long reading is
  discouraged — the product is Telegram, not this page.
- All-caps labels (`uppercase-nav` utility) appear only on nav, eyebrow
  chips, captions, and button text. Minimum 11px, maximum 14px.

**Strict rules:**

- Never mix Inter-italic (it doesn't exist in our load). If italic is
  needed, it's Playfair.
- Never set body copy in Playfair. Playfair is for voice moments only.
- No text shadows, no drop-shadows on text, no underlines on body copy —
  underlines belong to nav-hover and the ghost-editorial button only.

## Layout

Container-first with generous vertical rhythm.

- **Container**: `max-w-[1280px]` centred, `px-4 sm:px-6` (16px mobile,
  24px tablet+).
- **Vertical rhythm**: hero pads `pt-28 pb-20` (mobile) → `pt-40 pb-28`
  (lg). Between sections: 96px vertical whitespace.
- **Grid**: 12-column on `lg+` (`grid-cols-12`), reflows to single column
  on mobile with `gap-10 lg:gap-14`. Hero is 7/5 split (copy left,
  interactive chat right).
- **Breakpoints** (Tailwind): xs 380, sm 640, md 768, lg 1024, xl 1280,
  2xl 1536. `xs` exists specifically to handle Russian long strings on
  small phones.
- **Negative space is load-bearing** — the design reads as a magazine,
  not a dashboard. Resist the urge to fill. If a section feels empty,
  that's usually correct.

**Overlays** that sit behind the hero grid:

1. `bg-blueprint` — 48px navy blueprint lines at `rgba(26,36,71,0.04)`,
   opacity 60%.
2. `grain` — SVG fractal-noise overlay, opacity 6%, blend `overlay`.
3. `HeroDecor` — parallax watermark "01" in Playfair.

Stack order matters — content sits on `z-10` above overlays.

## Elevation & Depth

Depth is expressed through **shadow + border**, not z-translation or blur.

- **sm (1px, 0.05)** — default for chips, small elevated items.
- **md (8px, 0.08)** — primary/secondary buttons at rest.
- **lg (16px, 0.12)** — primary button hover, hovered cards.
- **xl (32px, 0.16)** — popovers, modals.
- **card-hover** — a navy-tinted shadow (`rgba(26,36,71,0.12)`) reserved
  for feature-card hover. It's the only shadow with chroma.

Cards always carry a 1px `line` border in addition to a shadow — the
editorial look needs the hair-line to feel "set on paper" rather than
"floating above paper".

Never use `backdrop-filter: blur()`. The atmosphere comes from grain and
blueprint, not glass.

## Shapes

Sharp, editorial, restrained.

- **Corner radius scale**: `sm 4 / md 8 / lg 12 / xl 16`. No full-pill.
- **Default radius is `sm (4px)`** for buttons and chips. Editorial
  products are not Stripe-rounded.
- **Cards use `lg (12px)`**; popovers use `md (8px)`.
- **Icons are line-drawn**, stroke 1.5–1.7, round line caps. No filled
  glyphs except the Telegram paper-plane (brand-standard) and the VK mark.
- **Logo** is a cabinet-projection pair of buildings in white on petrol,
  geometric and slightly perspectival.

## Components

Build everything from these anchor components — don't invent local variants.

- **`button-primary` (TelegramCTA primary)** — terracotta, uppercase
  Inter 600, 56px tall, sharp 4px radius. Lifts -2px and shadow
  deepens on hover. At most **one** per viewport.
- **`button-secondary`** — navy surface, hover morphs to petrol.
  Use for second-rank CTAs (rare — usually we use ghost-editorial instead).
- **`button-ghost-editorial`** — underline-as-button: 56px tall, navy
  text + 2px navy bottom border, hover swaps both to petrol. This is
  the **preferred** secondary CTA next to the terracotta primary.
- **`eyebrow-chip`** — petrol-on-petrol-5% chip with petrol-20% border,
  uppercase 11px Inter 600. Labels what a section is about
  ("Работает прямо в Telegram — без приложений").
- **`card`** — white-on-paper, 1px line border, 12px radius, shadow-sm
  at rest → card-hover on hover. Hovers only if the card is interactive.
- **`card-flat`** — muted panel, 8px radius, no shadow. For lower-stakes
  content inside a section.
- **`popover` (TelegramCTA menu, feedback menus)** — white, 1px line
  border, 8px radius, shadow-xl, motion-rise in / out
  (duration 180ms, ease-out-expo).
- **`nav-link`** — Inter 600 uppercase with a 2px petrol underline that
  grows left→right on hover / `data-active`.
- **`skeleton`** — shimmer gradient on warm greys (`#f0efec → #f7f6f3`),
  1.6s linear infinite. Not a cool blue — warm to stay on-brand.

**States:**

- **Hover**: always via colour or shadow shift; motion ≤ 2px translate,
  duration 300ms base, ease-out-expo.
- **Focus**: keep the native ring — we do not override it on the
  landing.
- **Disabled**: not used on the landing (no forms).

## Do's and Don'ts

- **Do** keep exactly one terracotta CTA in a viewport. If the hero
  CTA is visible, the pricing CTA should render in the ghost-editorial
  variant — and vice versa.
- **Do** italicise one Playfair word per headline in `accent` (petrol).
  It's the brand's voice tell.
- **Do** set body copy in Inter on paper at `body-md (16px)` or
  `body-lg (20px)` — nothing larger, nothing smaller for long prose.
- **Do** use `bg-blueprint` + `grain` together on the hero and a single
  editorial section. Don't paint every section with them — the effect
  dies with repetition.
- **Do** pair `display-stat` italic Playfair numbers with uppercase Inter
  labels underneath (see Hero `Stat` component).
- **Don't** introduce a new accent colour. Petrol and terracotta are
  the whole accent palette; adding a third kills the magazine feel.
- **Don't** use `rounded-full` on CTAs or cards — pill buttons belong to
  a different aesthetic family.
- **Don't** place body text directly on `accent`, `cta`, or `navy`
  without switching the text token to `on-accent` / `on-cta` / `on-navy`
  (all white).
- **Don't** use drop shadows on text, text gradients, or neon glow
  effects. The page should read like ink on warm paper, not a pitch deck.
- **Don't** use `backdrop-blur` — our depth metaphor is shadow + border,
  not glass.
- **Don't** mix Playfair and Inter within a single sentence. If the
  sentence has an italic accent, that entire phrase (up to the next
  break) is Playfair — body stays Inter.
