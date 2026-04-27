"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Logo } from "../Logo";
import { TelegramCTA } from "./TelegramCTA";

const NAV_LINKS = [
  { href: "#impact", label: "Эффект" },
  { href: "#features", label: "Возможности" },
  { href: "#how", label: "Как устроено" },
  { href: "#pricing", label: "Цены" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Smart sticky header:
 *  - прозрачный в самом верху страницы (над Hero)
 *  - при прокрутке > 10 px получает фон paper/95 + тень
 *  - при движении вниз > 80 px — уезжает наверх (y = -100%)
 *  - при движении вверх — возвращается
 *  - на мобилке переключается в компактный режим + hamburger-меню
 */
export function StickyHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    const diff = latest - prev;

    setScrolled(latest > 10);

    if (menuOpen) return; // не прячем если меню открыто

    if (latest < 80) {
      setHidden(false);
      return;
    }
    if (diff > 6) {
      setHidden(true);
    } else if (diff < -6) {
      setHidden(false);
    }
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "bg-paper/95 backdrop-blur border-b border-line/80 shadow-sm"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="max-w-[1280px] mx-auto h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Logo variant="mark" size={32} />
          <span className="flex items-baseline gap-2">
            <span className="font-display italic text-xl sm:text-2xl text-navy leading-none">
              Radar
            </span>
            <span className="text-[10px] uppercase-nav text-ink-soft hidden lg:inline">
              by&nbsp;Elsesser&nbsp;&amp;&nbsp;Co.
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs uppercase-nav text-navy font-medium">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-underline hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block shrink-0">
          <TelegramCTA size="md" label="Написать автору" variant="secondary" />
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-navy -mr-2"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
        >
          <BurgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden bg-paper/98 backdrop-blur border-t border-line"
      >
        <nav className="px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base text-navy font-medium uppercase-nav border-b border-line last:border-0 hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-5">
            <TelegramCTA
              size="md"
              label="Написать автору"
              variant="primary"
              className="w-full"
            />
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.line
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={open ? { x1: 5, y1: 6, x2: 19, y2: 18, rotate: 0 } : { x1: 4, y1: 7, x2: 20, y2: 7 }}
        transition={{ duration: 0.22 }}
      />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.12 }}
      />
      <motion.line
        x1="4"
        y1="17"
        x2="20"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={open ? { x1: 5, y1: 18, x2: 19, y2: 6 } : { x1: 4, y1: 17, x2: 20, y2: 17 }}
        transition={{ duration: 0.22 }}
      />
    </svg>
  );
}
