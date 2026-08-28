export const CONTACTS = {
  phone: "+7 (925) 539-33-53",
  phoneHref: "tel:+79255393353",
  telegram: "@kitakaze23",
  telegramHref: "https://t.me/kitakaze23",
  whatsappHref: "https://wa.me/79255393353",
  email: "stratum.cons@inbox.ru",
  emailHref: "mailto:stratum.cons@inbox.ru",
} as const;

export const NAV_LINKS = [
  { href: "#after-launch", label: "Product Review" },
  { href: "#portfolio", label: "Опыт" },
  { href: "#team", label: "Команда" },
  { href: "#insights", label: "Статьи" },
  { href: "#pricing", label: "Форматы" },
  { href: "#contact", label: "Контакты" },
] as const;

export const FOOTER_LINKS = [
  { href: "#portfolio", label: "Избранный опыт" },
  { href: "#team", label: "Команда экспертов" },
  { href: "#insights", label: "Статьи" },
  { href: "#pricing", label: "Стоимость" },
  { href: "#contact", label: "Контакты" },
] as const;

export const SERVICE_LINKS = [
  { to: "/services/ai-product-review", label: "Product Review для AI-продуктов" },
  { to: "/services/product-audit", label: "Аудит цифрового продукта" },
  { to: "/services/product-discovery", label: "Product Discovery" },
  { to: "/services/product-strategy", label: "Стратегия цифрового продукта" },
  { to: "/services/mvp-review", label: "Аудит MVP" },
  { to: "/services/legal-support", label: "Правовая поддержка цифровых продуктов" },
] as const;


export const LEGAL_LINKS = [
  { to: "/privacy", label: "Политика конфиденциальности" },
  { to: "/consent", label: "Согласие на обработку персональных данных" },
] as const;
