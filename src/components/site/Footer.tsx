import { CONTACTS, NAV_LINKS } from "./contacts";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-16">
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[0.9375rem] font-semibold tracking-tight">
            Stratum <span className="font-normal text-muted-foreground">Consulting</span>
          </p>
          <p className="mt-4 max-w-[380px] text-sm leading-[1.7] text-muted-foreground">
            Независимое стратегическое консультирование по продуктам, аналитике и цифровой
            трансформации.
          </p>
        </div>

        <nav aria-label="Навигация в подвале" className="lg:col-span-3">
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic lg:col-span-4">
          <ul className="space-y-3 text-sm">
            <li>
              <a href={CONTACTS.phoneHref} className="text-muted-foreground transition-colors hover:text-foreground">
                {CONTACTS.phone}
              </a>
            </li>
            <li>
              <a href={CONTACTS.telegramHref} className="text-muted-foreground transition-colors hover:text-foreground">
                Telegram {CONTACTS.telegram}
              </a>
            </li>
            <li>
              <a href={CONTACTS.whatsappHref} className="text-muted-foreground transition-colors hover:text-foreground">
                WhatsApp {CONTACTS.phone}
              </a>
            </li>
            <li>
              <a href={CONTACTS.emailHref} className="text-muted-foreground transition-colors hover:text-foreground">
                {CONTACTS.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="container-page mt-12 border-t border-border pt-8">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Stratum Consulting. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
