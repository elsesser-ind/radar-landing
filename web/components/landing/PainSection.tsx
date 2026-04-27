import { TimeToCallChart } from "./TimeToCallChart";
import { MissedLeadsChart } from "./MissedLeadsChart";
import { CountUp } from "./CountUp";

export function PainSection() {
  return (
    <section id="impact" className="relative bg-navy text-white overflow-hidden grain grain-dark">
      {/* Subtle grid on navy */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
        {/* Section header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <p className="text-[11px] uppercase-nav text-accent font-semibold mb-4 tracking-wider">
            Что стоит на кону
          </p>
          <h2 className="font-display text-[30px] xs:text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] tracking-tight text-balance">
            Сейчас вы не находите ¾ свежих собственников.{" "}
            <span className="italic text-accent">Вот цена.</span>
          </h2>
        </div>

        {/* Two charts side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <TimeToCallChart />
          <MissedLeadsChart />
        </div>

        {/* Bottom row: weekly totals */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          <BigNum tone="cta" label="часов ручного скролла 4 площадок в неделю">
            ~<CountUp to={15} />&nbsp;ч
          </BigNum>
          <BigNum tone="accent" label="часов, если Radar показывает карточки в чате">
            −<CountUp to={3} />&nbsp;ч
          </BigNum>
          <BigNum tone="cta" label="тёплых клиентов теряется в неделю">
            <CountUp to={48} />
          </BigNum>
          <BigNum tone="cta" label="тыс. ₽ упущенной выручки в месяц">
            ≈<CountUp to={950} />
          </BigNum>
        </div>
      </div>
    </section>
  );
}

function BigNum({
  children,
  label,
  tone,
}: {
  children: React.ReactNode;
  label: string;
  tone: "cta" | "accent";
}) {
  const color = tone === "cta" ? "text-cta" : "text-accent";
  return (
    <div>
      <p className={`font-display italic text-4xl sm:text-5xl ${color} leading-none tabular-nums`}>
        {children}
      </p>
      <p className="mt-2.5 text-xs text-white/60 uppercase-nav tracking-wider max-w-[180px]">
        {label}
      </p>
    </div>
  );
}
