export const CONTACTS = {
  phone: "+7 (925) 539-33-53",
  phoneHref: "tel:+79255393353",
  telegram: "@stratum_consulting",
  telegramHref: "https://t.me/stratum_consulting",
  whatsappHref: "https://wa.me/79255393353",
  email: "inbox@stratum-consulting.ru",
  emailHref: "mailto:inbox@stratum-consulting.ru",
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#approach", label: "Подход" },
  { href: "#expertise", label: "Экспертиза" },
  { href: "#contact", label: "Контакты" },
] as const;

export const FOOTER_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#sample", label: "Пример отчёта" },
  { href: "#approach", label: "Подход" },
  { href: "#expertise", label: "Экспертиза" },
  { href: "#experience", label: "Опыт команды" },
  { href: "#team", label: "Команда" },
  { href: "#contact", label: "Контакты" },
] as const;

export const SERVICE_LINKS = [
  { to: "/services/product-audit", label: "Аудит IT-проекта" },
  { to: "/services/independent-control", label: "Независимый контроль IT-проекта" },
  { to: "/services/investment-assessment", label: "Обоснование инвестиций" },
  { to: "/services/technical-specification", label: "Разработка ТЗ" },
  { to: "/services/dispute-expertise", label: "Экспертиза для спора" },
  { to: "/services/ai-product-review", label: "Оценка AI-решения" },
  { to: "/services/legal-support", label: "Права на результаты разработки" },
] as const;

/** Company details for the footer. Placeholders stay visible until the LLC is registered. */
export const REQUISITES = {
  name: "[Полное наименование ООО — заполнить]",
  inn: "[заполнить]",
  ogrn: "[заполнить]",
  address: "[Юридический адрес — заполнить]",
} as const;

export const LEGAL_LINKS = [
  { to: "/privacy", label: "Политика конфиденциальности" },
  { to: "/consent", label: "Согласие на обработку персональных данных" },
] as const;
