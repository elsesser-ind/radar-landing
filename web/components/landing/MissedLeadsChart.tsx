"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Рынок: ~320 свежих «собственник» объявлений в неделю по региону.
// Без Radar: агент в среднем успевает первым на ~20% = 64 шт.
// С Radar: ~82% = 262 шт.
const MARKET = 320;
const WITHOUT_CAUGHT = 64;
const WITH_CAUGHT = 262;

export function MissedLeadsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const withoutPct = (WITHOUT_CAUGHT / MARKET) * 100;
  const withPct = (WITH_CAUGHT / MARKET) * 100;

  return (
    <div ref={ref}>
      <p className="text-[11px] uppercase-nav text-white/50 font-semibold mb-1 tracking-wider">
        Недельная воронка
      </p>
      <h3 className="font-display italic text-white text-[28px] leading-tight mb-7">
        Сколько «горячих» клиентов
        <br />
        достаётся именно вам
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <Column
          label="Без Radar"
          labelColor="text-cta"
          caught={WITHOUT_CAUGHT}
          pct={withoutPct}
          missed={MARKET - WITHOUT_CAUGHT}
          barColor="from-cta/80 to-cta"
          inView={inView}
          delay={0.15}
        />
        <Column
          label="С Radar"
          labelColor="text-accent"
          caught={WITH_CAUGHT}
          pct={withPct}
          missed={MARKET - WITH_CAUGHT}
          barColor="from-accent/80 to-accent"
          inView={inView}
          delay={0.6}
        />
      </div>

      <div className="mt-10 border-t border-white/10 pt-6">
        <p className="text-white/80 text-base leading-relaxed">
          Разница — <span className="text-white font-semibold">+198 клиентов в неделю</span>.
          При среднем чеке 120 тыс. ₽ и конверсии 4% — это{" "}
          <span className="text-accent font-semibold">≈ 950 тыс. ₽ дополнительной выручки</span>.
        </p>
      </div>
    </div>
  );
}

function Column({
  label,
  labelColor,
  caught,
  pct,
  missed,
  barColor,
  inView,
  delay,
}: {
  label: string;
  labelColor: string;
  caught: number;
  pct: number;
  missed: number;
  barColor: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <div>
      <div className="mb-2">
        <p className={`text-[11px] uppercase-nav font-bold tracking-wider ${labelColor} mb-1`}>
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-display italic text-white text-5xl tabular-nums leading-none">
            {caught}
          </span>
          <span className="text-white/50 text-sm">/ {MARKET}</span>
        </div>
      </div>

      {/* Vertical stacked column */}
      <div className="relative h-52 bg-white/5 rounded-md overflow-hidden flex flex-col-reverse border border-white/10">
        <motion.div
          className={`bg-gradient-to-t ${barColor}`}
          initial={{ height: 0 }}
          animate={{ height: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <p className="mt-3 text-xs text-white/50">
        потеряно: <span className="text-white/80 tabular-nums">{missed}</span> клиентов
      </p>
    </div>
  );
}
