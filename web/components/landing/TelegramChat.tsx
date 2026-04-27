"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Logo } from "../Logo";

/**
 * Мокап Telegram-интерфейса. Узнаваемая схема — header, ticks, inline-кнопки,
 * meta-timestamps — но цвета наши (bot-пузырёк paper, user-пузырёк accent).
 * Принимает список сообщений в едином формате.
 */

export type ChatMessage =
  | { from: "user"; text: string; time?: string }
  | { from: "bot"; text?: string; card?: CardContent; time?: string; actions?: InlineAction[] }
  | { from: "system"; text: string };

export interface CardContent {
  badge?: { text: string; tone: "urgent" | "deal" | "fresh" | "warn" };
  price: string;
  meta: string;
  address?: string;
  extra?: string;
}

export interface InlineAction {
  label: string;
  kind?: "primary" | "secondary";
  icon?: string;
  onClick?: () => void;
}

export interface QuickReply {
  label: string;
  emoji?: string;
  kind?: "primary" | "secondary";
  onClick: () => void;
}

interface Props {
  title?: string;
  subtitle?: string;
  messages: ChatMessage[];
  className?: string;
  height?: string;
  typing?: boolean;
  quickReplies?: QuickReply[];
  onReset?: () => void;
  /** Fallback placeholder когда нет ни quickReplies ни typing */
  inputPlaceholder?: string;
}

export function TelegramChat({
  title = "Radar",
  subtitle = "bot · онлайн",
  messages,
  className,
  height = "h-[620px]",
  typing = false,
  quickReplies,
  onReset,
  inputPlaceholder = "Сообщение…",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Автоскролл к концу при новых сообщениях / typing / chips
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, typing, quickReplies?.length]);

  return (
    <div
      className={clsx(
        "relative flex flex-col rounded-xl overflow-hidden border border-line bg-paper shadow-xl",
        height,
        className,
      )}
    >
      {/* Header */}
      <div className="shrink-0 h-14 px-4 flex items-center gap-3 bg-white border-b border-line">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-line flex items-center justify-center">
          <Logo variant="mark" size={34} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-navy text-sm leading-tight truncate">{title}</p>
          <p className="text-[11px] text-accent leading-tight flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
            {typing ? "печатает…" : subtitle}
          </p>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="text-ink-soft/70 hover:text-accent transition-colors text-xs uppercase-nav font-semibold tracking-wider"
            aria-label="Начать сначала"
            title="Начать сначала"
          >
            <ResetIcon />
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-chat px-3 sm:px-4 py-5 space-y-3">
        {messages.map((m, i) => (
          <MessageRow key={i} msg={m} />
        ))}
        {typing && <TypingBubble />}
      </div>

      {/* Quick replies or placeholder input */}
      {quickReplies && quickReplies.length > 0 ? (
        <div className="shrink-0 bg-white border-t border-line px-3 py-3 flex flex-wrap gap-2 justify-end">
          {quickReplies.map((qr, i) => (
            <button
              key={i}
              onClick={qr.onClick}
              className={clsx(
                "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-medium transition-all tap-none",
                "active:scale-[0.97]",
                qr.kind === "primary"
                  ? "bg-cta hover:bg-cta-hover text-white shadow-sm"
                  : "bg-paper hover:bg-accent/10 hover:border-accent text-navy border border-line",
              )}
            >
              {qr.emoji && <span>{qr.emoji}</span>}
              {qr.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="shrink-0 h-14 px-4 flex items-center gap-3 bg-white border-t border-line">
          <PaperclipIcon />
          <div className="flex-1 h-9 px-3 rounded-full bg-paper border border-line flex items-center text-sm text-ink-soft/60">
            {inputPlaceholder}
          </div>
          <SmileIcon />
          <MicIcon />
        </div>
      )}
    </div>
  );
}

function MessageRow({ msg }: { msg: ChatMessage }) {
  if (msg.from === "system") {
    return (
      <div className="flex justify-center">
        <span className="px-3 py-1 rounded-full bg-navy/70 text-white text-[10px] uppercase-nav tracking-wider">
          {msg.text}
        </span>
      </div>
    );
  }

  if (msg.from === "user") {
    return (
      <div className="flex justify-end animate-rise">
        <div className="max-w-[78%] px-3.5 py-2 rounded-2xl rounded-br-sm bg-accent text-white shadow-sm">
          <p className="text-[14px] leading-snug whitespace-pre-wrap">{msg.text}</p>
          <p className="mt-1 text-[10px] text-white/75 text-right flex items-center justify-end gap-1">
            <span>{msg.time ?? "сейчас"}</span>
            <ReadTickIcon />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-rise">
      <div className="max-w-[86%] space-y-1">
        {msg.card && <CardBubble card={msg.card} actions={msg.actions} time={msg.time} />}
        {msg.text && !msg.card && (
          <div className="inline-block px-3.5 py-2 rounded-2xl rounded-bl-sm bg-white border border-line shadow-sm">
            <p className="text-[14px] leading-snug text-navy whitespace-pre-wrap">{msg.text}</p>
            <p className="mt-1 text-[10px] text-ink-soft/60">{msg.time ?? "сейчас"}</p>
          </div>
        )}
        {msg.actions && !msg.card && <ActionGrid actions={msg.actions} />}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-white border border-line shadow-sm">
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-ink-soft/50 pulse-dot"
      style={{ animationDelay: delay }}
    />
  );
}

function CardBubble({
  card,
  actions,
  time,
}: {
  card: CardContent;
  actions?: InlineAction[];
  time?: string;
}) {
  const toneColors: Record<string, string> = {
    urgent: "bg-cta text-white",
    deal: "bg-navy text-white",
    fresh: "bg-accent text-white",
    warn: "bg-paper-muted text-ink-soft border border-line",
  };

  return (
    <div className="inline-block rounded-2xl rounded-bl-sm bg-white border border-line shadow-sm overflow-hidden min-w-[260px] max-w-[340px]">
      <div className="p-3.5">
        {card.badge && (
          <span
            className={clsx(
              "inline-block h-5 px-2 text-[10px] uppercase-nav font-bold rounded-sm mb-2",
              toneColors[card.badge.tone],
            )}
          >
            {card.badge.text}
          </span>
        )}
        <p className="font-display italic text-navy text-[26px] leading-none">{card.price}</p>
        <p className="mt-1.5 text-[12px] text-navy">{card.meta}</p>
        {card.address && <p className="mt-0.5 text-[11px] text-ink-soft">📍 {card.address}</p>}
        {card.extra && (
          <p className="mt-1 text-[11px] text-accent font-semibold uppercase-nav tracking-wider">
            {card.extra}
          </p>
        )}
      </div>
      {actions && actions.length > 0 && (
        <div
          className="grid gap-px bg-line"
          style={{ gridTemplateColumns: `repeat(${actions.length}, 1fr)` }}
        >
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.onClick}
              className={clsx(
                "h-10 text-xs font-semibold uppercase-nav tracking-wider transition-colors",
                a.kind === "primary"
                  ? "bg-cta hover:bg-cta-hover text-white"
                  : "bg-white hover:bg-paper text-navy hover:text-accent",
              )}
            >
              {a.icon && <span className="mr-1.5">{a.icon}</span>}
              {a.label}
            </button>
          ))}
        </div>
      )}
      <p className="px-3.5 pb-2 text-[10px] text-ink-soft/60">{time ?? "сейчас"}</p>
    </div>
  );
}

function ActionGrid({ actions }: { actions: InlineAction[] }) {
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {actions.map((a, i) => (
        <button
          key={i}
          onClick={a.onClick}
          className={clsx(
            "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-sm text-[11px] font-medium border transition-colors",
            a.kind === "primary"
              ? "bg-cta border-cta text-white"
              : "bg-white border-line text-navy hover:border-accent",
          )}
        >
          {a.icon && <span>{a.icon}</span>}
          {a.label}
        </button>
      ))}
    </div>
  );
}

// -- Inline SVG icons --

function ResetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ReadTickIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5l3 3 5-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5l3 3 5-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PaperclipIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-ink-soft/60">
      <path
        d="M21.4 11.1l-9.2 9.2a5.5 5.5 0 1 1-7.8-7.8l9.2-9.2a3.7 3.7 0 1 1 5.2 5.2l-9.2 9.2a1.8 1.8 0 1 1-2.6-2.6l8.5-8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SmileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-ink-soft/60">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent">
      <rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
