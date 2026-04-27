"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CONTACTS } from "../../lib/bot";

interface Props {
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "lg";
  label?: string;
  subLabel?: string;
  className?: string;
}

/**
 * Главный CTA на лендинге. При клике открывает popover с двумя контактами —
 * Telegram и ВКонтакте. Тот же компонент используется везде (hero, pricing,
 * lead form, sticky header), поэтому все «Открыть бота» централизованы.
 */
export function TelegramCTA({
  variant = "primary",
  size = "lg",
  label = "Написать автору",
  subLabel,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне и по Escape
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const styles = {
    primary:
      "bg-cta hover:bg-cta-hover text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-navy hover:bg-accent text-white shadow-md",
    inverse: "bg-white hover:bg-paper-muted text-navy border-2 border-navy",
  }[variant];

  const sizing = size === "lg" ? "h-14 px-7 text-sm" : "h-11 px-5 text-xs";

  return (
    <div ref={wrapRef} className={clsx("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={clsx(
          "w-full inline-flex items-center justify-center gap-3 rounded-sm font-semibold uppercase-nav tracking-wider transition-all",
          sizing,
          styles,
        )}
      >
        <ChatGlyph />
        <span className="flex flex-col items-start leading-none text-left">
          <span>{label}</span>
          {subLabel && (
            <span className="text-[10px] font-normal opacity-70 mt-1 tracking-normal normal-case">
              {subLabel}
            </span>
          )}
        </span>
        <ChevronDown open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 mt-2 left-0 right-0 sm:right-auto sm:min-w-[260px] bg-white border border-line rounded-md shadow-xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-line">
              <p className="text-[10px] uppercase-nav text-ink-soft font-semibold tracking-wider">
                Связаться с автором
              </p>
            </div>
            <ContactRow
              href={CONTACTS.telegram.url}
              title="Telegram"
              handle={CONTACTS.telegram.handle}
              icon={<TelegramGlyph />}
              onClick={() => setOpen(false)}
            />
            <ContactRow
              href={CONTACTS.vk.url}
              title="ВКонтакте"
              handle={CONTACTS.vk.handle}
              icon={<VkGlyph />}
              onClick={() => setOpen(false)}
              divider
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactRow({
  href,
  title,
  handle,
  icon,
  onClick,
  divider,
}: {
  href: string;
  title: string;
  handle: string;
  icon: React.ReactNode;
  onClick: () => void;
  divider?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 px-4 py-3.5 hover:bg-paper transition-colors group",
        divider && "border-t border-line",
      )}
    >
      <span className="w-9 h-9 rounded-full bg-paper flex items-center justify-center text-navy group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
        {icon}
      </span>
      <span className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-navy">{title}</span>
        <span className="text-xs text-ink-soft truncate">{handle}</span>
      </span>
      <ArrowOut />
    </a>
  );
}

// ───── Glyphs ─────

export function TelegramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.8 7.3l-2.1 9.9c-.15.7-.58.87-1.17.54l-3.24-2.39-1.56 1.5c-.17.17-.32.32-.66.32l.23-3.3 5.99-5.42c.26-.23-.06-.36-.4-.13l-7.42 4.67-3.2-1c-.7-.22-.7-.7.14-1.03l12.52-4.83c.58-.22 1.09.13.87 1.03z" />
    </svg>
  );
}

function VkGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.9 7.7c.2-.5 0-.9-.7-.9h-2.4c-.6 0-.9.3-1 .6 0 0-1.2 2.8-2.8 4.6-.5.6-.8.7-1 .7-.2 0-.3-.2-.3-.7V7.7c0-.6-.2-.9-.7-.9H9.2c-.4 0-.6.3-.6.5 0 .6.8.7.9 2.1v3.2c0 .7-.1.8-.4.8-.7 0-2.5-2.8-3.6-6-.2-.6-.4-.9-1.1-.9H2c-.6 0-.7.3-.7.6 0 .6.7 3.6 3.6 7.5 1.9 2.7 4.7 4.1 7.2 4.1 1.5 0 1.7-.3 1.7-.9v-2.1c0-.6.1-.7.6-.7.3 0 .9.2 2.2 1.5 1.5 1.5 1.8 2.2 2.6 2.2h2.4c.6 0 .9-.3.8-.9-.2-.8-1.3-2-2.3-2.9-.5-.5-1.1-1.1-1.3-1.4-.2-.4-.2-.6 0-1 0 0 2.4-3.4 2.7-4.6z" />
    </svg>
  );
}

function ChatGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden
    >
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

function ArrowOut() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-ink-soft/40 group-hover:text-accent transition-colors ml-auto shrink-0" aria-hidden>
      <path d="M5 9l4-4M5 5h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
