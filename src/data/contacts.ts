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
  { href: "#approach", label: "Подход" },
  { href: "#expertise", label: "Экспертиза" },
  { href: "#experience", label: "Опыт" },
  { href: "#team", label: "Команда" },
  { href: "#principles", label: "Принципы работы" },
  { href: "#faq", label: "Частые вопросы" },
  { href: "#contact", label: "Контакты" },
] as const;

export const SERVICE_LINKS = [
  { to: "/services/investment-assessment", label: "Обоснование инвестиций" },
  { to: "/services/technical-specification", label: "Разработка ТЗ" },
  { to: "/services/product-audit", label: "Technology Due Diligence" },
  { to: "/services/ai-product-review", label: "Оценка AI-решения" },
  { to: "/services/dispute-expertise", label: "Экспертиза для спора" },
  { to: "/services/legal-support", label: "Legal & IP" },
] as const;

export const LEGAL_LINKS = [
  { to: "/privacy", label: "Политика конфиденциальности" },
  { to: "/consent", label: "Согласие на обработку персональных данных" },
] as const;
