import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";

import { CONTACTS, FOOTER_LINKS, LEGAL_LINKS, SERVICE_LINKS } from "@/data/contacts";

const CHANNELS = [
  { icon: Phone, label: "Телефон", value: CONTACTS.phone, href: CONTACTS.phoneHref },
  { icon: Send, label: "Telegram", value: CONTACTS.telegram, href: CONTACTS.telegramHref },
  { icon: MessageCircle, label: "WhatsApp", value: CONTACTS.phone, href: CONTACTS.whatsappHref },
  { icon: Mail, label: "E-mail", value: CONTACTS.email, href: CONTACTS.emailHref },
];

export function Footer() {
  return (
    <footer className="bg-navy py-16 text-navy-foreground md:py-20">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-base font-semibold tracking-tight">
              Stratum <span className="font-normal text-navy-foreground/70">Consulting</span>
            </p>
            <p className="mt-4 max-w-[420px] text-sm leading-[1.7] text-navy-foreground/70">
              Независимая команда экспертов в продуктовой, аналитической и правовой сферах: помогаем
              принимать обоснованные решения до того, как они становятся дорогостоящими ошибками.
            </p>

          </div>

          <nav aria-label="Услуги" className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-foreground/50">
              Направления
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-navy-foreground/75 transition-colors duration-200 hover:text-navy-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Навигация в подвале" className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-foreground/50">
              Навигация
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={`/${link.href}`}
                    className="text-navy-foreground/75 transition-colors duration-200 hover:text-navy-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-foreground/50">
              Документы
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-navy-foreground/75 transition-colors duration-200 hover:text-navy-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 border-t border-navy-foreground/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 transition-colors duration-200 hover:text-navy-foreground"
              >
                <channel.icon className="h-6 w-6 shrink-0 text-navy-foreground/60" strokeWidth={1.5} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.1em] text-navy-foreground/50">
                    {channel.label}
                  </span>
                  <span className="block truncate text-sm text-navy-foreground/85">{channel.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-navy-foreground/15 pt-8 text-xs text-navy-foreground/55">
          <p>© {new Date().getFullYear()} Stratum Consulting</p>
          <p>Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
