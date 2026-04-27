"use client";

import { useEffect, useRef, useState } from "react";
import { TelegramChat, type ChatMessage, type QuickReply } from "./TelegramChat";
import { BOT_URL } from "../../lib/bot";

/**
 * Scripted branching dialog с автопечатью bot-сообщений.
 * Каждый Step — «что бот говорит» + «что пользователь может ответить»
 * (quick-reply чипы). Ведёт от start к одной из трёх веток,
 * у каждой в конце — CTA «открыть в Telegram».
 */

type BotMsg = Extract<ChatMessage, { from: "bot" }>;

interface Step {
  bot: BotMsg[];
  choices?: Omit<QuickReply, "onClick">[] & { label: string }[];
  nextStep?: Record<string, string>; // chip.label → step id
  isFinal?: boolean;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const FLOW: Record<string, Step> = {
  start: {
    bot: [
      {
        from: "bot",
        text: "Привет! Я Radar. Ловлю свежие объявления собственников на 4 площадках раньше конкурентов.",
        time: "сейчас",
      },
      {
        from: "bot",
        text: "С чего начнём? Можешь кликнуть по кнопке ниже, как в обычном боте.",
        time: "сейчас",
      },
    ],
    choices: [
      { label: "Заведи охоту", emoji: "🎯", kind: "primary" } as QuickReply,
      { label: "Покажи пуш", emoji: "🔔" } as QuickReply,
      { label: "Как отличаешь агентов?", emoji: "🤔" } as QuickReply,
    ],
    nextStep: {
      "Заведи охоту": "hunt_ask",
      "Покажи пуш": "push_intro",
      "Как отличаешь агентов?": "classify_explain",
    },
  },

  // ───── Ветка 1: создание охоты ─────
  hunt_ask: {
    bot: [
      {
        from: "bot",
        text: "«Охота» — это сохранённый поиск под одного клиента: параметры квартиры + его имя. Создал — забыл. Сам буду сканировать и присылать подходящее.",
        time: "сейчас",
      },
      {
        from: "bot",
        text: "Опиши клиента одной фразой — как обычно сказал бы коллеге. Или выбери пример:",
        time: "сейчас",
      },
    ],
    choices: [
      { label: "Петровы — 2к Машгородок до 18", kind: "primary" } as QuickReply,
      { label: "Сидорова — 1к Центр до 9" } as QuickReply,
    ],
    nextStep: {
      "Петровы — 2к Машгородок до 18": "hunt_confirm_petrovy",
      "Сидорова — 1к Центр до 9": "hunt_confirm_sidorova",
    },
  },

  hunt_confirm_petrovy: {
    bot: [
      {
        from: "bot",
        text: "Понял. Охота «Петровы»: 2-к, Машгородок, до 18 000 000 ₽, только собственники.",
        time: "сейчас",
      },
      {
        from: "bot",
        text: "Уточнишь этаж / площадь, или запустим как есть?",
        time: "сейчас",
      },
    ],
    choices: [
      { label: "Запускай как есть", kind: "primary" } as QuickReply,
      { label: "Этаж не выше 7" } as QuickReply,
    ],
    nextStep: {
      "Запускай как есть": "hunt_running",
      "Этаж не выше 7": "hunt_running_detail",
    },
  },

  hunt_confirm_sidorova: {
    bot: [
      {
        from: "bot",
        text: "Охота «Сидорова»: 1-к, Центральный, до 9 000 000 ₽, только собственники.",
        time: "сейчас",
      },
      { from: "bot", text: "Запускаю сканирование.", time: "сейчас" },
    ],
    choices: [{ label: "Окей, жду", kind: "primary" } as QuickReply],
    nextStep: { "Окей, жду": "hunt_running" },
  },

  hunt_running_detail: {
    bot: [
      {
        from: "bot",
        text: "Принято: этаж ≤ 7. Охота активна. Пришлю карточку, как появится подходящее.",
        time: "сейчас",
      },
    ],
    choices: [{ label: "Хорошо", kind: "primary" } as QuickReply],
    nextStep: { Хорошо: "hunt_push" },
  },

  hunt_running: {
    bot: [
      {
        from: "bot",
        text: "Охота активна. Сканирую 4 площадки каждые 30 секунд. Пришлю карточку, как появится подходящее.",
        time: "сейчас",
      },
    ],
    choices: [{ label: "Хорошо", kind: "primary" } as QuickReply],
    nextStep: { Хорошо: "hunt_push" },
  },

  hunt_push: {
    bot: [
      { from: "bot", text: "...", time: "через 4 минуты" },
      {
        from: "bot",
        time: "только что",
        card: {
          badge: { text: "🔥 4 мин назад", tone: "urgent" },
          price: "16 500 000 ₽",
          meta: "2-к · 54 м² · 4/9 · Машгородок",
          address: "ул. Ильмен-Тау, 8",
          extra: "Собственник · 92%",
        },
        actions: [
          { label: "Позвонить Елене", icon: "📞", kind: "primary" },
          { label: "Скип", kind: "secondary" },
        ],
      },
    ],
    choices: [
      { label: "Беру в работу", emoji: "✋", kind: "primary" } as QuickReply,
      { label: "Почему собственник 92%?", emoji: "🤔" } as QuickReply,
    ],
    nextStep: {
      "Беру в работу": "hunt_taken",
      "Почему собственник 92%?": "classify_detail",
    },
  },

  hunt_taken: {
    bot: [
      {
        from: "bot",
        text: "Зафиксировано на тебе. Номер в буфере — второй раз не пришлю. Удачи со звонком!",
        time: "сейчас",
      },
    ],
    choices: [{ label: "🚀 Открыть бота в Telegram" } as QuickReply],
    nextStep: { "🚀 Открыть бота в Telegram": "FINAL" },
    isFinal: true,
  },

  // ───── Ветка 2: пример пуша ─────
  push_intro: {
    bot: [
      {
        from: "bot",
        text: "Смотри. Вот реальный пуш, который только что прилетел бы в твой чат:",
        time: "сейчас",
      },
      {
        from: "bot",
        time: "только что",
        card: {
          badge: { text: "−12% к рынку", tone: "deal" },
          price: "14 800 000 ₽",
          meta: "2-к · 48 м² · 6/9 · Машгородок",
          address: "пр. Макеева, 21",
          extra: "Собственник · 81% · в 3 источниках",
        },
        actions: [
          { label: "Позвонить Дмитрию", icon: "📞", kind: "primary" },
          { label: "Клиенту", icon: "↗", kind: "secondary" },
        ],
      },
    ],
    choices: [
      { label: "Что значит −12% к рынку?", emoji: "💰" } as QuickReply,
      { label: "Что значит «в 3 источниках»?", emoji: "🔗" } as QuickReply,
      { label: "Завести охоту", emoji: "🎯", kind: "primary" } as QuickReply,
    ],
    nextStep: {
      "Что значит −12% к рынку?": "push_explain_price",
      "Что значит «в 3 источниках»?": "push_explain_dedup",
      "Завести охоту": "hunt_ask",
    },
  },

  push_explain_price: {
    bot: [
      {
        from: "bot",
        text: "Я смотрю среднюю цену за м² по району с учётом ремонта и этажа. Если квартира дешевле рыночной на 5% и больше — это сигнал: или собственник спешит, или недооценка. В обоих случаях — стоит звонить в первую очередь.",
        time: "сейчас",
      },
    ],
    choices: [
      { label: "Понятно. Что ещё?", kind: "primary" } as QuickReply,
      { label: "🚀 Попробовать в Telegram" } as QuickReply,
    ],
    nextStep: {
      "Понятно. Что ещё?": "start",
      "🚀 Попробовать в Telegram": "FINAL",
    },
  },

  push_explain_dedup: {
    bot: [
      {
        from: "bot",
        text: "Тот же собственник выставил объявление на Авито, ЦИАН и Яндекс.Недвижимости одновременно. Я склеил их в один кластер — ты не будешь звонить одному человеку трижды.",
        time: "сейчас",
      },
      {
        from: "bot",
        text: "Разброс цен между площадками тоже показываю — если на одной дешевле, можно упомянуть в разговоре с собственником.",
        time: "сейчас",
      },
    ],
    choices: [
      { label: "Круто, что ещё?", kind: "primary" } as QuickReply,
      { label: "🚀 Попробовать в Telegram" } as QuickReply,
    ],
    nextStep: {
      "Круто, что ещё?": "start",
      "🚀 Попробовать в Telegram": "FINAL",
    },
  },

  // ───── Ветка 3: классификатор ─────
  classify_explain: {
    bot: [
      {
        from: "bot",
        text: "Проверяю каждое объявление по 6 правилам:",
        time: "сейчас",
      },
      {
        from: "bot",
        text: "1. Сколько объявлений с этого номера (3+ → агент)\n2. Ключевые слова в описании («АН», «риелт», «агентство»)\n3. Маркеры собственника («от собственника», «без комиссии»)\n4. Отклонение цены от рынка\n5. Тип продавца из самого объявления\n6. История номера в базе",
        time: "сейчас",
      },
      {
        from: "bot",
        text: "Никакой «магии ИИ» — прозрачные правила, точность ~85%. Показываю % уверенности прямо на карточке.",
        time: "сейчас",
      },
    ],
    choices: [
      { label: "А если ошибёшься?", emoji: "❓" } as QuickReply,
      { label: "Покажи пуш", emoji: "🔔", kind: "primary" } as QuickReply,
    ],
    nextStep: {
      "А если ошибёшься?": "classify_mistake",
      "Покажи пуш": "push_intro",
    },
  },

  classify_detail: {
    bot: [
      {
        from: "bot",
        text: "Здесь 92% — потому что:\n\n✅ Тип: частное лицо\n✅ Этот номер в базе впервые\n✅ В описании: «от собственника, без комиссии»\n➖ Цена в рынке (нейтрально)\n\nПроверить за 2 секунды — показываю прозрачно.",
        time: "сейчас",
      },
    ],
    choices: [
      { label: "Беру в работу", emoji: "✋", kind: "primary" } as QuickReply,
      { label: "Сначала", emoji: "↻" } as QuickReply,
    ],
    nextStep: {
      "Беру в работу": "hunt_taken",
      Сначала: "start",
    },
  },

  classify_mistake: {
    bot: [
      {
        from: "bot",
        text: "Будет — точность 85%, не 100%. Но: ты тратишь 30 секунд на проверку (карточка показывает причины + уверенность в %), прежде чем звонить. Всё равно быстрее, чем обзванивать 10 перепостов.",
        time: "сейчас",
      },
    ],
    choices: [
      { label: "Окей, попробую", emoji: "🚀", kind: "primary" } as QuickReply,
      { label: "Ещё вопрос" } as QuickReply,
    ],
    nextStep: {
      "Окей, попробую": "FINAL",
      "Ещё вопрос": "start",
    },
  },
};

export function InteractiveChat() {
  const [stepId, setStepId] = useState("start");
  const [visible, setVisible] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [choicesReady, setChoicesReady] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (stepId === "FINAL") {
      // Открываем Telegram и сбрасываем диалог через короткую паузу
      window.open(BOT_URL, "_blank", "noopener,noreferrer");
      const id = setTimeout(() => {
        setVisible([]);
        setStepId("start");
      }, 400);
      return () => clearTimeout(id);
    }

    const step = FLOW[stepId];
    if (!step) return;
    cancelRef.current = false;
    setChoicesReady(false);

    (async () => {
      for (let i = 0; i < step.bot.length; i++) {
        setTyping(true);
        await sleep(i === 0 ? 600 : 900);
        if (cancelRef.current) return;
        setTyping(false);
        setVisible((prev) => [...prev, step.bot[i]]);
        await sleep(220);
      }
      if (!cancelRef.current) setChoicesReady(true);
    })();

    return () => {
      cancelRef.current = true;
    };
  }, [stepId]);

  function choose(label: string) {
    const step = FLOW[stepId];
    const next = step.nextStep?.[label];
    if (!next) return;

    setVisible((prev) => [...prev, { from: "user", text: label, time: "сейчас" }]);
    setChoicesReady(false);
    setStepId(next);
  }

  function reset() {
    cancelRef.current = true;
    setVisible([]);
    setChoicesReady(false);
    setTyping(false);
    setTimeout(() => setStepId("start"), 40);
  }

  const step = FLOW[stepId];
  const quickReplies: QuickReply[] | undefined =
    choicesReady && step?.choices
      ? step.choices.map((c) => ({
          ...c,
          onClick: () => choose(c.label),
        }))
      : undefined;

  return (
    <TelegramChat
      title="Radar"
      subtitle={stepId === "start" ? "bot · онлайн" : "bot · в диалоге"}
      messages={visible}
      typing={typing}
      quickReplies={quickReplies}
      onReset={reset}
      height="h-[540px] sm:h-[600px] lg:h-[640px]"
    />
  );
}
