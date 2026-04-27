"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Без Radar: 8 мин 40 сек — условно 100% ширины
// С Radar: 28 сек — 5.4% ширины
const WITHOUT_PCT = 100;
const WITH_PCT = 5.4;

export function TimeToCallChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <p className="text-[11px] uppercase-nav text-white/50 font-semibold mb-1 tracking-wider">Сценарий</p>
      <h3 className="font-display italic text-white text-[28px] leading-tight mb-7">
        От публикации
        <br />
        до первого звонка
      </h3>

      <div className="space-y-6">
        <Row
          label="Без Radar"
          labelColor="text-cta"
          time="8:40"
          desc="открыть 4 вкладки, проскроллить, скопировать номер, сравнить цены"
          pct={inView ? WITHOUT_PCT : 0}
          barColor="bg-cta"
          delay={0.1}
        />
        <Row
          label="С Radar"
          labelColor="text-accent"
          time="0:28"
          desc="пуш в Telegram → тап по кнопке «позвонить»"
          pct={inView ? WITH_PCT : 0}
          barColor="bg-accent"
          delay={0.8}
          highlighted
        />
      </div>

      <div className="mt-10 border-t border-white/10 pt-6">
        <p className="text-white/80 text-base leading-relaxed">
          За каждые 8 минут промедления собственнику звонит в среднем{" "}
          <span className="text-white font-semibold">6–9 других риелторов</span>.
          После первых трёх он перестаёт отвечать.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  labelColor,
  time,
  desc,
  pct,
  barColor,
  delay,
  highlighted,
}: {
  label: string;
  labelColor: string;
  time: string;
  desc: string;
  pct: number;
  barColor: string;
  delay: number;
  highlighted?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-baseline gap-3">
          <span className={`text-[11px] uppercase-nav font-bold tracking-wider ${labelColor}`}>
            {label}
          </span>
          {highlighted && (
            <span className="text-[10px] uppercase-nav text-accent bg-accent/10 px-2 py-0.5 rounded-sm border border-accent/30">
              × 18 быстрее
            </span>
          )}
        </div>
        <span className="font-display italic text-white text-3xl tabular-nums leading-none">
          {time}
        </span>
      </div>
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-2 text-xs text-white/50">{desc}</p>
    </div>
  );
}
