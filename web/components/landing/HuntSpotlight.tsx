/**
 * Editorial-блок между PainSection и Features: коротко объясняем
 * ключевой термин продукта — «Охота» — прежде чем он всплывёт
 * в карточках фич и в ценах.
 */
export function HuntSpotlight() {
  return (
    <section className="relative bg-paper py-14 sm:py-20 lg:py-24 border-b border-line">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left — огромный «кавычка» + таг */}
          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase-nav text-accent font-semibold tracking-wider mb-4">
              Словарь продукта
            </p>
            <p className="font-display italic text-navy text-[54px] sm:text-[72px] lg:text-[90px] leading-[0.95] select-none">
              охота
            </p>
            <p className="mt-4 text-[11px] uppercase-nav text-ink-soft tracking-wider">
              / сущ. / женский род
            </p>
          </div>

          {/* Right — определение */}
          <div className="lg:col-span-8 lg:pt-3">
            <p className="font-display italic text-navy text-[22px] sm:text-[26px] lg:text-[30px] leading-snug text-balance">
              Сохранённый поиск на одного клиента.{" "}
              <span className="text-accent">Параметры квартиры плюс его имя.</span>
            </p>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-ink-soft leading-relaxed text-pretty">
              Пишете боту «Петровы — 2-к Машгородок до 18» — и забываете. Radar
              сам раз в 30 секунд сканирует рынок, отсеивает агентов, присылает
              только первый подходящий объект прямо в ваш Telegram. История цен
              по каждому клиенту копится автоматически.
            </p>
            <p className="mt-5 sm:mt-6 text-sm text-ink-soft">
              Один риелтор ведёт{" "}
              <span className="text-navy font-semibold">3–20 охот</span>{" "}
              параллельно — столько же, сколько и клиентов в работе.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
