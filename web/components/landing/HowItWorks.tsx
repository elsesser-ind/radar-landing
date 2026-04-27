import { TelegramCTA } from "./TelegramCTA";

const steps = [
  {
    n: "01",
    title: "Нажмите /start",
    body: "Откройте бота в Telegram, нажмите «Start». Бот поздоровается и спросит, по какому городу работаете. Это 5 секунд — ни установок, ни регистраций, ни СМС с кодами.",
    ctaBadge: "5 сек",
  },
  {
    n: "02",
    title: "Напишите одним предложением, кого ищете",
    body: "«Петровы — 2-к Машгородок до 18». Бот сам разбирает фразу: комнаты, район, бюджет, имя клиента. Если чего-то не хватает — переспросит. Можно завести 5, 10, 20 охот подряд.",
    ctaBadge: "1 минута",
  },
  {
    n: "03",
    title: "Получайте карточки с кнопкой «позвонить»",
    body: "Radar сам сканирует Авито, ЦИАН, Яндекс.Недвижимость и Домклик. Как только появляется подходящий собственник — прилетает карточка. Тап — звонок ушёл. Клиент счастлив, вы первый.",
    ctaBadge: "автомат",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-paper py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute left-8 top-0 bottom-0 w-px bg-line hidden lg:block" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14 sm:mb-20">
          <p className="text-[11px] uppercase-nav text-accent font-semibold mb-4 tracking-wider">
            За 3 шага
          </p>
          <h2 className="font-display text-navy text-[30px] xs:text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] text-balance">
            От «/start» до первого пуша —
            <br className="hidden sm:inline" />{" "}
            <span className="italic text-accent">меньше двух минут.</span>
          </h2>
        </div>

        <div className="space-y-12 sm:space-y-16 lg:space-y-24">
          {steps.map((s) => (
            <article
              key={s.n}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-2">
                <p className="font-display italic text-navy/20 text-[88px] sm:text-[110px] lg:text-[140px] leading-[0.85]">
                  {s.n}
                </p>
              </div>
              <div className="lg:col-span-7">
                <h3 className="font-display italic text-navy text-[26px] sm:text-[32px] lg:text-[40px] leading-tight text-balance">
                  {s.title}
                </h3>
                <p className="mt-4 sm:mt-5 text-ink-soft text-base sm:text-lg leading-relaxed text-pretty">
                  {s.body}
                </p>
              </div>
              <div className="lg:col-span-3 flex lg:justify-end">
                <div className="inline-flex items-center gap-2 h-8 px-3 bg-accent/5 border border-accent/30 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] uppercase-nav text-accent font-semibold tracking-wider">
                    {s.ctaBadge}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 flex justify-center">
          <TelegramCTA label="Начать прямо сейчас" />
        </div>
      </div>
    </section>
  );
}
