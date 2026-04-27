import { InteractiveChat } from "./InteractiveChat";
import { TelegramCTA, TelegramGlyph } from "./TelegramCTA";
import { HeroDecor } from "./HeroDecor";
import { CountUp } from "./CountUp";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper grain">
      <div className="absolute inset-0 bg-blueprint opacity-60 pointer-events-none" />
      <HeroDecor />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — the stake */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 h-8 px-3 mb-6 sm:mb-8 bg-accent/5 border border-accent/20 rounded-sm max-w-full">
              <TelegramGlyph size={14} />
              <span className="text-[10px] sm:text-[11px] uppercase-nav text-accent font-semibold tracking-wider truncate">
                Работает прямо в Telegram — без приложений
              </span>
            </div>

            <h1 className="font-display text-navy text-[34px] xs:text-[40px] sm:text-[54px] lg:text-[72px] leading-[1] tracking-tight text-balance">
              Звоните собственнику
              <br />
              <span className="italic text-accent">первым.</span>
              <br />
              Не тридцать шестым.
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-ink-soft leading-relaxed max-w-[580px] text-pretty">
              Пишете боту фамилию клиента и параметры квартиры — он сам ловит свежие
              объявления на Авито, ЦИАН, Яндекс.Недвижимости и Домклике, отсеивает
              агентов-перепостщиков и присылает карточку с кнопкой «позвонить».
              <br />
              <span className="text-navy font-medium">Всё внутри Telegram.</span>{" "}
              Учиться нечему.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 items-center">
              <TelegramCTA label="Начать работу" subLabel="Telegram или ВК" />
              <a
                href="#demo"
                className="inline-flex items-center justify-center h-14 px-6 sm:px-7 text-navy uppercase-nav text-xs sm:text-sm font-semibold border-b-2 border-navy hover:border-accent hover:text-accent transition-colors"
              >
                Посмотреть, как работает →
              </a>
            </div>

            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-line grid grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
              <Stat
                num={
                  <>
                    <CountUp to={14} /> сек
                  </>
                }
                label="от публикации до пуша"
              />
              <Stat
                num={
                  <>
                    ×<CountUp to={4} />
                  </>
                }
                label="площадки без дублей"
              />
              <Stat
                num={
                  <>
                    <CountUp to={85} />%+
                  </>
                }
                label="точность: собственник vs агент"
              />
            </div>
          </div>

          {/* Right — interactive bot chat */}
          <div className="lg:col-span-5 w-full">
            <InteractiveChat />
            <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-ink-soft text-center uppercase-nav tracking-wider">
              Настоящее демо — кликайте кнопки, как в живом Telegram
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ num, label }: { num: React.ReactNode; label: string }) {
  return (
    <div>
      <p className="font-display italic text-[22px] sm:text-3xl lg:text-4xl text-navy leading-none tabular-nums">
        {num}
      </p>
      <p className="mt-1.5 text-[10px] sm:text-[11px] uppercase-nav text-ink-soft tracking-wider leading-tight">
        {label}
      </p>
    </div>
  );
}
