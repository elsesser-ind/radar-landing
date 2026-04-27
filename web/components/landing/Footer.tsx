import { Logo } from "../Logo";
import { CONTACTS } from "../../lib/bot";

export function Footer() {
  return (
    <footer className="relative bg-paper border-t border-line py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-10 sm:mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Logo variant="mark" size={36} />
              <span className="flex items-baseline gap-2">
                <span className="font-display italic text-2xl text-navy">Radar</span>
                <span className="text-[10px] uppercase-nav text-ink-soft">
                  by&nbsp;Elsesser&nbsp;&amp;&nbsp;Co.
                </span>
              </span>
            </div>
            <p className="text-ink-soft max-w-sm text-base leading-relaxed">
              Радар собственников для риелторов. Живёт в Telegram — первый звонок ваш.
              Продукт агентства Elsesser &amp; Co.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase-nav text-navy font-semibold mb-4 tracking-wider">
              Продукт
            </p>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <a href="#features" className="hover:text-accent transition-colors">
                  Возможности
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-accent transition-colors">
                  Эффект
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-accent transition-colors">
                  Как устроено
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-accent transition-colors">
                  Цены
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase-nav text-navy font-semibold mb-4 tracking-wider">
              Связаться
            </p>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <a
                  href={CONTACTS.telegram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors group"
                >
                  <TelegramIcon />
                  <span>
                    Telegram <span className="text-ink-soft/60">·</span>{" "}
                    <span className="text-navy group-hover:text-accent">
                      {CONTACTS.telegram.handle}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACTS.vk.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors group"
                >
                  <VkIcon />
                  <span>
                    ВКонтакте <span className="text-ink-soft/60">·</span>{" "}
                    <span className="text-navy group-hover:text-accent">timoelsser</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-ink-soft uppercase-nav tracking-wider">
            © Elsesser &amp; Co. · 2026
          </p>
          <div className="flex gap-6 text-xs text-ink-soft uppercase-nav tracking-wider">
            <a href="#" className="hover:text-accent transition-colors">
              Политика данных
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-accent">
      <path d="M17.8 7.3l-2.1 9.9c-.15.7-.58.87-1.17.54l-3.24-2.39-1.56 1.5c-.17.17-.32.32-.66.32l.23-3.3 5.99-5.42c.26-.23-.06-.36-.4-.13l-7.42 4.67-3.2-1c-.7-.22-.7-.7.14-1.03l12.52-4.83c.58-.22 1.09.13.87 1.03z" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-accent">
      <path d="M21.9 7.7c.2-.5 0-.9-.7-.9h-2.4c-.6 0-.9.3-1 .6 0 0-1.2 2.8-2.8 4.6-.5.6-.8.7-1 .7-.2 0-.3-.2-.3-.7V7.7c0-.6-.2-.9-.7-.9H9.2c-.4 0-.6.3-.6.5 0 .6.8.7.9 2.1v3.2c0 .7-.1.8-.4.8-.7 0-2.5-2.8-3.6-6-.2-.6-.4-.9-1.1-.9H2c-.6 0-.7.3-.7.6 0 .6.7 3.6 3.6 7.5 1.9 2.7 4.7 4.1 7.2 4.1 1.5 0 1.7-.3 1.7-.9v-2.1c0-.6.1-.7.6-.7.3 0 .9.2 2.2 1.5 1.5 1.5 1.8 2.2 2.6 2.2h2.4c.6 0 .9-.3.8-.9-.2-.8-1.3-2-2.3-2.9-.5-.5-1.1-1.1-1.3-1.4-.2-.4-.2-.6 0-1 0 0 2.4-3.4 2.7-4.6z" />
    </svg>
  );
}
