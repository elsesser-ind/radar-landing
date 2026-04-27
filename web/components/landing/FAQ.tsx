"use client";

import { useState } from "react";
import clsx from "clsx";

const items: { q: string; a: string }[] = [
  {
    q: "А я не разбираюсь в нейросетях. Это для меня?",
    a: "Это для вас. Внутри Radar нет «чёрного ящика» — работают простые правила: смотрим количество объявлений с одного номера, ключевые слова в описании, отклонение цены от среднерыночной. Ваш главный агент сам поймёт логику за 10 минут, если захочет. От вас требуется только один навык — нажать кнопку «Позвонить».",
  },
  {
    q: "Откуда данные? Это законно?",
    a: "Radar собирает публично размещённые объявления через официального агрегатора ads-api.ru — тот же источник, с которым работают крупные CRM и федеральные проекты. Никаких парсеров вручную, никаких обходов защиты. Персональные данные собственника (кроме телефона из самого объявления) мы не храним и никому не передаём.",
  },
  {
    q: "У нас уже есть CRM. Зачем ещё Radar?",
    a: "CRM хранит ваши сделки и клиентов. Radar приносит сделки, которых у вас ещё нет. Это разные инструменты — они не конкурируют. На тарифе «Команда» поднимем автоматический экспорт в вашу CRM (amoCRM, Битрикс24, выгрузка таблицей) — без ручного переноса.",
  },
  {
    q: "Что если Radar ошибётся и пришлёт агента под видом собственника?",
    a: "Будет. Точность ~85%, не 100% — мы об этом честно говорим. Но: вы тратите максимум 30 секунд на проверку, прежде чем звонить — классификатор показывает уверенность в процентах и причину («5 объявлений с номера», «упоминается агентство N»). Проще, чем обзванивать 10 чужих перепостов.",
  },
  {
    q: "В нашем городе это будет работать?",
    a: "Классификатор и дедуп — универсальные, работают на любом городе России. Для подключения нового региона нам нужно 2–3 дня на настройку границ районов и ценовых коридоров. По запросу — подключим.",
  },
  {
    q: "Сколько времени на подключение моей команды?",
    a: "5 минут на человека. Вы присылаете телеграм-ники риелторов, мы даём доступ, каждый пишет боту /start. Следующий пуш приходит через минуту. Никакого обучения, курсов, сертификации.",
  },
  {
    q: "А если Telegram заблокируют или он не работает?",
    a: "Telegram — основная среда, но не единственная. Под нужды агентства Radar адаптируется под веб-версию: тот же классификатор, те же охоты, те же уведомления — просто в браузере, а на телефоне ставится как обычное приложение. Веб-версия сейчас в разработке и доступна по запросу для корпоративных клиентов. При блокировке Telegram продукт не остановится — переведём команду на веб-кабинет за 1 день.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper py-20 sm:py-28 lg:py-32">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-16">
          <p className="text-[11px] uppercase-nav text-accent font-semibold mb-4 tracking-wider">
            Вопросы, которые задают все
          </p>
          <h2 className="font-display text-navy text-[30px] xs:text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] text-balance">
            Скорее всего, у вас{" "}
            <span className="italic text-accent">один из этих.</span>
          </h2>
        </div>

        <div className="border-t border-line">
          {items.map((item, i) => {
            const active = open === i;
            return (
              <div key={i} className="border-b border-line">
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="w-full text-left py-5 sm:py-6 flex items-start justify-between gap-4 sm:gap-8 group"
                >
                  <span
                    className={clsx(
                      "font-display italic text-[19px] sm:text-[22px] lg:text-[26px] leading-tight transition-colors text-balance",
                      active ? "text-accent" : "text-navy group-hover:text-accent",
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={clsx(
                      "shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all",
                      active
                        ? "border-accent bg-accent text-white rotate-45"
                        : "border-navy text-navy group-hover:border-accent group-hover:text-accent",
                    )}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={clsx(
                    "overflow-hidden transition-[max-height,opacity] duration-500 ease-out",
                    active ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0",
                  )}
                >
                  <p className="text-ink-soft text-lg leading-relaxed max-w-[720px]">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
