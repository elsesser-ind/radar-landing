import type { ReactNode } from "react";
import { CountUp } from "./CountUp";

const stats: {
  num: ReactNode;
  label: string;
}[] = [
  {
    num: (
      <>
        <CountUp to={14} />
        <span className="text-[0.55em]"> сек</span>
      </>
    ),
    label: "среднее время от публикации до пуша в ваш чат",
  },
  {
    num: (
      <>
        ×<CountUp to={4} />
      </>
    ),
    label: "площадки собираются в один поток без дублей",
  },
  {
    num: (
      <>
        <CountUp to={85} />
        <span className="text-[0.55em]">%</span>
      </>
    ),
    label: "точность определения собственника и агента на рынке",
  },
  {
    num: (
      <>
        <CountUp to={24} />
        /
        <CountUp to={7} />
      </>
    ),
    label: "Radar работает, даже когда вы спите",
  },
];

export function BigStats() {
  return (
    <section className="relative bg-navy text-white py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
        <p className="text-[11px] uppercase-nav text-accent font-semibold mb-6 sm:mb-8 tracking-wider text-center">
          Цифры, которые работают на вас
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-14 gap-x-2 sm:gap-x-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center lg:border-r lg:last:border-r-0 lg:border-white/10 px-2"
            >
              <p className="font-display italic text-[48px] xs:text-[56px] sm:text-[72px] lg:text-[88px] text-white leading-none tracking-tight tabular-nums">
                {s.num}
              </p>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/60 leading-relaxed max-w-[220px] mx-auto text-pretty">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
