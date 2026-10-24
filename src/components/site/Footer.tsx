import { Link } from "@tanstack/react-router";

import { trackContactClick } from "@/analytics/events";
import { CONTACTS, FOOTER_LINKS, LEGAL_LINKS, SERVICE_LINKS } from "@/data/contacts";

const CHANNELS = [
  { label: "Телефон", value: CONTACTS.phone, href: CONTACTS.phoneHref, channel: "phone" },
  { label: "E-mail", value: CONTACTS.email, href: CONTACTS.emailHref, channel: "email" },
  { label: "Telegram", value: CONTACTS.telegram, href: CONTACTS.telegramHref, channel: "telegram" },
  { label: "WhatsApp", value: CONTACTS.phone, href: CONTACTS.whatsappHref, channel: "whatsapp" },
] as const;

const headingCls = "text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/50";
const linkCls =
  "text-navy-foreground/75 underline-offset-4 transition-colors duration-200 hover:text-navy-foreground hover:underline";

export function Footer() {
  return (
    <footer className="bg-navy py-16 text-navy-foreground md:py-20">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="Stratum Consulting — на главную"
            >
              <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
                <rect x="4" y="6" width="24" height="4" fill="currentColor" />
                <rect x="4" y="14" width="18" height="4" fill="currentColor" opacity="0.7" />
                <rect x="4" y="22" width="12" height="4" fill="currentColor" opacity="0.4" />
              </svg>
              <span className="text-base font-semibold tracking-tight">
                Stratum <span className="font-normal text-navy-foreground/70">Consulting</span>
              </span>
            </Link>
            <p className="mt-5">
              <span className="block font-serif text-lg leading-[1.4]">
                Надёжное основание для цифровых решений
              </span>
              <span
                lang="en"
                className="mt-1 block text-xs tracking-[0.04em] text-navy-foreground/55"
              >
                Solid ground for digital decisions
              </span>
            </p>
            <p className="mt-4 max-w-[360px] text-sm leading-[1.7] text-navy-foreground/65">
              Независимая консалтинговая компания. Помогаем обосновать инвестиции в цифровые решения
              и подготовить техническое задание до начала разработки.
            </p>
          </div>

          <nav aria-label="Разделы главной страницы" className="lg:col-span-2">
            <p className={headingCls}>Разделы</p>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={`/${link.href}`} className={linkCls}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/insights" className={linkCls}>
                  Статьи
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Страницы услуг" className="lg:col-span-3">
            <p className={headingCls}>Направления</p>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className={headingCls}>Контакты</p>
            <ul className="mt-5 space-y-4 text-sm">
              {CHANNELS.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    onClick={() => trackContactClick(channel.channel, "footer")}
                    className="group block"
                  >
                    <span className="block text-xs text-navy-foreground/50">{channel.label}</span>
                    <span className="mt-0.5 block break-words text-navy-foreground/85 underline-offset-4 group-hover:text-navy-foreground group-hover:underline">
                      {channel.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-navy-foreground/15 pt-8 text-xs text-navy-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Stratum Consulting. Все права защищены.</p>
          <ul aria-label="Юридическая информация" className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkCls}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
