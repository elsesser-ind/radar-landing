import type { ReactNode } from "react";

const features: {
  title: string;
  lead: string;
  body: string;
  illustration: ReactNode;
}[] = [
  {
    title: "Понимает вас словами",
    lead: "Не надо учить команды и заполнять формы",
    body: "Пишете «заведи охоту для Петровых, 2к до 18, Машгородок» — бот сам разбирает параметры, уточняет этаж, если важно, и запускает поиск. Всё на русском, как обычный коллега.",
    illustration: <ChatBubblesViz />,
  },
  {
    title: "Отличает собственника от агента",
    lead: "85% точности — прозрачные правила, не «чёрный ящик»",
    body: "Смотрит на число объявлений с одного номера, ключевые слова («АН», «риелт»), отклонение цены от рынка. В пуш попадают только собственники — агенты-перепостщики отсеиваются автоматом.",
    illustration: <ClassifierViz />,
  },
  {
    title: "Склеивает дубли с 4 площадок",
    lead: "Один собственник — одна карточка в чате",
    body: "Авито, ЦИАН, Яндекс.Недвижимость, Домклик. Одно и то же объявление с разных площадок объединяется по координатам и адресу. Вы больше не звоните одному человеку трижды.",
    illustration: <DedupViz />,
  },
  {
    title: "Пуш в Telegram за секунды",
    lead: "Карточка с кнопкой «позвонить» — один тап и звонок уходит",
    body: "Не надо открывать приложения, копировать номера, переключаться между вкладками. Уведомление от Telegram само содержит все данные. Даже в лифте работает.",
    illustration: <PushViz />,
  },
  {
    title: "Ведёт охоты по каждому клиенту",
    lead: "«Петровы ждут 2к в Машгородке» — бот помнит и сканирует сам",
    body: "Охота — это сохранённый поиск под одного клиента: параметры квартиры + имя клиента. Создали — забыли. Radar сам раз в 30 секунд проверяет рынок и присылает подходящие объекты. История цен по каждому — бонус.",
    illustration: <HuntsViz />,
  },
  {
    title: "Работает в команде",
    lead: "Первый взял — остальные видят. Никто не звонит вторым.",
    body: "Подключаете всех риелторов в одну рабочую группу. Как только один нажал «беру» — карточка помечается, у коллег она с меткой «взято Алиной». Нет двойных звонков одному собственнику.",
    illustration: <TeamViz />,
  },
];

export function Features() {
  return (
    <section id="features" className="relative bg-paper py-20 sm:py-28 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase-nav text-accent font-semibold mb-4 tracking-wider">
              Что умеет бот
            </p>
            <h2 className="font-display text-navy text-[30px] xs:text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] text-balance">
              Шесть механик, которые
              <br className="hidden sm:inline" />{" "}
              <span className="italic text-accent">дают первую минуту.</span>
            </h2>
          </div>
          <p className="text-ink-soft max-w-sm text-base text-pretty">
            Ничего не надо устанавливать. Всё живёт в Telegram, рядом с чатами
            ваших клиентов. Запускается за 5 минут, работает — пока вы сами не закроете.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <article
              key={i}
              className="group relative bg-white border border-line rounded-xl p-8 hover:shadow-card-hover hover:border-accent/30 transition-all duration-base overflow-hidden"
            >
              <span className="absolute top-6 right-8 font-display italic text-[120px] text-navy/[0.03] leading-none select-none">
                0{i + 1}
              </span>
              <div className="relative">
                <div className="h-24 flex items-start">{f.illustration}</div>
                <h3 className="mt-2 text-navy font-display italic text-[24px] leading-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-accent text-[13px] uppercase-nav font-semibold tracking-wider">
                  {f.lead}
                </p>
                <p className="mt-4 text-ink-soft text-[15px] leading-relaxed">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Inline SVG illustrations ---

function ChatBubblesViz() {
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" fill="none">
      {/* user bubble */}
      <rect x="80" y="6" width="130" height="26" rx="13" fill="#00736c" />
      <text x="90" y="23" fill="white" fontSize="10" fontFamily="Inter">заведи охоту, 2к до 18</text>
      {/* bot bubble */}
      <rect x="8" y="42" width="160" height="32" rx="16" fill="white" stroke="#1a2447" strokeWidth="1.2" />
      <text x="18" y="56" fill="#1a2447" fontSize="10" fontFamily="Inter" fontWeight="600">Охота «Петровы» создана.</text>
      <text x="18" y="68" fill="#666" fontSize="9" fontFamily="Inter">уточню этаж?</text>
    </svg>
  );
}

function ClassifierViz() {
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" fill="none">
      <g opacity="0.35">
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={i} cx={20 + (i % 3) * 18} cy={24 + Math.floor(i / 3) * 18} r="5" fill="#666" />
        ))}
      </g>
      <text x="28" y="74" fill="#666" fontSize="9" fontFamily="Inter" letterSpacing="1">АГЕНТЫ</text>
      <path d="M 96 40 L 130 40 M 124 34 L 130 40 L 124 46" stroke="#00736c" strokeWidth="1.5" fill="none" />
      <g>
        <circle cx="160" cy="30" r="8" fill="#00736c" />
        <circle cx="182" cy="30" r="8" fill="#00736c" />
        <circle cx="172" cy="50" r="8" fill="#d97644" />
      </g>
      <text x="154" y="74" fill="#00736c" fontSize="9" fontFamily="Inter" letterSpacing="1" fontWeight="600">
        СОБСТВЕННИКИ
      </text>
    </svg>
  );
}

function DedupViz() {
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" fill="none">
      {[
        { x: 8, t: "AV" },
        { x: 52, t: "ЦН" },
        { x: 96, t: "ЯН" },
        { x: 140, t: "ДК" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="10" width="36" height="22" rx="3" fill="none" stroke="#00736c" strokeWidth="1.5" />
          <text x={s.x + 18} y="26" fill="#00736c" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">
            {s.t}
          </text>
          <line x1={s.x + 18} y1="34" x2="194" y2="58" stroke="#00736c" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        </g>
      ))}
      <circle cx="194" cy="58" r="14" fill="#00736c" />
      <text x="194" y="62" fill="white" fontSize="10" fontFamily="Inter" fontWeight="700" textAnchor="middle">
        ×1
      </text>
    </svg>
  );
}

function PushViz() {
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" fill="none">
      <rect x="40" y="10" width="60" height="64" rx="8" fill="white" stroke="#1a2447" strokeWidth="1.5" />
      <rect x="46" y="20" width="48" height="20" rx="3" fill="#fafaf8" stroke="#00736c" strokeWidth="1" />
      <rect x="50" y="24" width="20" height="3" rx="1.5" fill="#1a2447" />
      <rect x="50" y="30" width="34" height="2.5" rx="1.25" fill="#666" />
      <rect x="46" y="46" width="48" height="22" rx="3" fill="#d97644" />
      <text x="70" y="61" fill="white" fontSize="10" fontFamily="Inter" fontWeight="700" textAnchor="middle">
        📞 ЗВОНОК
      </text>
      <g stroke="#00736c" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M 114 20 L 126 20" />
        <path d="M 114 30 L 132 30" opacity="0.7" />
        <path d="M 114 40 L 122 40" opacity="0.4" />
      </g>
      <text x="150" y="44" fill="#00736c" fontSize="11" fontFamily="Inter" fontWeight="600">
        14 сек
      </text>
    </svg>
  );
}

function HuntsViz() {
  const hunts = [
    { name: "Петровы", y: 14 },
    { name: "Сидорова", y: 36 },
    { name: "Карапетян", y: 58 },
  ];
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" fill="none">
      {hunts.map((h, i) => (
        <g key={i}>
          <rect x="4" y={h.y} width="80" height="14" rx="2" fill="none" stroke="#1a2447" strokeWidth="1" />
          <text x="8" y={h.y + 10} fill="#1a2447" fontSize="9" fontFamily="Inter" fontWeight="600">
            {h.name}
          </text>
          <path d={`M 88 ${h.y + 7} L 126 ${h.y + 7}`} stroke="#00736c" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="134" cy={h.y + 7} r="5" fill={i === 0 ? "#d97644" : "#00736c"} />
          <text x="148" y={h.y + 11} fill="#1a2447" fontSize="9" fontFamily="Inter">
            матч
          </text>
        </g>
      ))}
    </svg>
  );
}

function TeamViz() {
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" fill="none">
      {/* agent avatars */}
      {[
        { x: 12, name: "А", taken: true, color: "#d97644" },
        { x: 62, name: "М", taken: false, color: "#00736c" },
        { x: 112, name: "С", taken: false, color: "#00736c" },
      ].map((a, i) => (
        <g key={i}>
          <circle cx={a.x + 16} cy="30" r="16" fill={a.taken ? a.color : "white"} stroke={a.color} strokeWidth="2" />
          <text
            x={a.x + 16}
            y="35"
            fill={a.taken ? "white" : a.color}
            fontSize="14"
            fontFamily="Inter"
            fontWeight="700"
            textAnchor="middle"
          >
            {a.name}
          </text>
          {a.taken && <text x={a.x + 16} y="60" fill="#d97644" fontSize="8" fontFamily="Inter" fontWeight="600" textAnchor="middle">ВЗЯЛА</text>}
        </g>
      ))}
      {/* building */}
      <rect x="172" y="18" width="34" height="44" fill="none" stroke="#1a2447" strokeWidth="1.5" rx="2" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={178 + (i % 2) * 12} cy={26 + Math.floor(i / 2) * 12} r="1.5" fill="#00736c" />
      ))}
    </svg>
  );
}
