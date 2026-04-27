// Контакты автора продукта — сейчас коммуникация идёт через личку.
// При появлении публичного бота просто поменяется url в CONTACTS.telegram.
export const CONTACTS = {
  telegram: {
    url: "https://t.me/timonotdev",
    handle: "@timonotdev",
    label: "Telegram",
  },
  vk: {
    url: "https://vk.com/timoelsser",
    handle: "vk.com/timoelsser",
    label: "ВКонтакте",
  },
} as const;

// Обратная совместимость для старых импортов — удалить когда полностью перейдём.
export const BOT_URL = CONTACTS.telegram.url;
export const BOT_HANDLE = CONTACTS.telegram.handle;
