"use client";

import { useState } from "react";
import clsx from "clsx";
import { TelegramCTA } from "./TelegramCTA";

type Period = "monthly" | "yearly";

interface Tier {
  name: string;
  target: string;
  monthly: number;
  yearly: number; // цена/мес при оплате за год
  unit: string;
  features: string[];
  cta: string;
  variant: "primary" | "inverse";
  highlighted?: boolean;
}

// Себестоимость 2 928 ₽/риелтор (ads-api + LLM + сервер). Маржа ~75%.
const TIERS: Tier[] = [
  {
    name: "Одиночка",
    target:
      "Для частного риелтора, работающего один. Всё, чтобы параллельно вести 3–5 клиентов без потери свежих собственников.",
    monthly: 7_900,
    yearly: 6_500,
    unit: "₽ / месяц",
    features: [
      "до 3 активных охот",
      "100 пушей в день",
      "1 пользователь",
      "история цен — 30 дней",
      "поддержка в чате",
    ],
    cta: "Начать 14 дней",
    variant: "inverse",
  },
  {
    name: "Команда",
    target:
      "Для агентств с 3–15 риелторами. Общий доступ к рынку, командный режим «первый взял — остальные видят», полные истории и выгрузки.",
    monthly: 11_900,
    yearly: 9_900,
    unit: "₽ / риелтор / месяц",
    features: [
      "безлимит охот",
      "безлимит пушей",
      "групповой режим: первый взял — остальные видят",
      "история цен — 12 месяцев",
      "выгрузка таблицей, подключение к вашей CRM",
      "приоритетная поддержка",
      "настройка команды за 30 минут",
    ],
    cta: "Написать автору",
    variant: "primary",
    highlighted: true,
  },
];

const YEAR_SAVINGS_PCT = Math.round(
  (1 - TIERS[1].yearly / TIERS[1].monthly) * 100,
);

export function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <section id="pricing" className="relative bg-paper-muted py-20 sm:py-28 lg:py-32">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-14 mx-auto text-center">
          <p className="text-[11px] uppercase-nav text-accent font-semibold mb-4 tracking-wider">
            Простые тарифы
          </p>
          <h2 className="font-display text-navy text-[30px] xs:text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] text-balance">
            Окупается{" "}
            <span className="italic text-accent">с первой сделки</span>
            <br className="hidden sm:inline" />{" "}
            в первом месяце.
          </h2>
          <p className="mt-6 text-ink-soft text-lg">
            Средний комиссионный чек риелтора — 120 тыс. ₽.
            Закрыли одну дополнительную сделку — и Radar оплачен на год вперёд.
          </p>
        </div>

        {/* Period toggle */}
        <div className="flex justify-center mb-12">
          <PeriodToggle value={period} onChange={setPeriod} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-[900px] mx-auto">
          {TIERS.map((t) => (
            <TierCard key={t.name} tier={t} period={period} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-ink-soft">
          Первые 14 дней — бесплатно, без карты. Отмена в один клик. Всё в Telegram.
        </p>
      </div>
    </section>
  );
}

function PeriodToggle({
  value,
  onChange,
}: {
  value: Period;
  onChange: (p: Period) => void;
}) {
  return (
    <div className="inline-flex items-center bg-white border border-line rounded-full p-1 shadow-sm">
      <button
        onClick={() => onChange("monthly")}
        className={clsx(
          "relative h-10 px-5 sm:px-6 rounded-full text-sm font-semibold uppercase-nav tracking-wider transition-colors",
          value === "monthly" ? "bg-navy text-white" : "text-ink-soft hover:text-navy",
        )}
      >
        Помесячно
      </button>
      <button
        onClick={() => onChange("yearly")}
        className={clsx(
          "relative h-10 px-5 sm:px-6 rounded-full text-sm font-semibold uppercase-nav tracking-wider transition-colors flex items-center gap-2",
          value === "yearly" ? "bg-navy text-white" : "text-ink-soft hover:text-navy",
        )}
      >
        Год
        <span
          className={clsx(
            "inline-flex items-center h-5 px-1.5 rounded-sm text-[10px] font-bold tracking-normal normal-case transition-colors",
            value === "yearly" ? "bg-cta text-white" : "bg-cta/15 text-cta",
          )}
        >
          −{YEAR_SAVINGS_PCT}%
        </span>
      </button>
    </div>
  );
}

function TierCard({ tier, period }: { tier: Tier; period: Period }) {
  const displayed = period === "yearly" ? tier.yearly : tier.monthly;
  const strike = period === "yearly" ? tier.monthly : null;
  const yearlyTotal = tier.yearly * 12;

  return (
    <article
      className={clsx(
        "relative bg-white border rounded-xl p-8 flex flex-col transition-all",
        tier.highlighted
          ? "border-navy shadow-xl lg:scale-[1.03] lg:-translate-y-2 ring-1 ring-navy"
          : "border-line hover:border-accent/40 hover:shadow-md",
      )}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 h-7 px-3 bg-cta text-white text-[10px] uppercase-nav font-bold tracking-wider rounded-sm">
          Рекомендуем
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-display italic text-navy text-[34px] leading-none">
          {tier.name}
        </h3>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">{tier.target}</p>
      </div>

      <div className="mb-6 pb-6 border-b border-line">
        <div className="flex items-baseline gap-3">
          <p className="font-display italic text-navy text-[56px] leading-none tabular-nums">
            {displayed.toLocaleString("ru-RU")}
          </p>
          {strike && (
            <p className="font-display italic text-ink-soft/40 text-[22px] line-through leading-none tabular-nums">
              {strike.toLocaleString("ru-RU")}
            </p>
          )}
        </div>
        <p className="mt-1.5 text-sm text-ink-soft uppercase-nav tracking-wider">
          {tier.unit}
        </p>
        {period === "yearly" && (
          <p className="mt-2 text-[11px] text-accent uppercase-nav font-semibold tracking-wider">
            {yearlyTotal.toLocaleString("ru-RU")} ₽/год, экономия{" "}
            {((tier.monthly - tier.yearly) * 12).toLocaleString("ru-RU")} ₽
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-navy">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <TelegramCTA
        label={tier.cta}
        variant={tier.variant}
        size="md"
        className="w-full"
      />
    </article>
  );
}
