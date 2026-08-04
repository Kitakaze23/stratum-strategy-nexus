import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Cta } from "./primitives";
import { NAV_LINKS } from "./contacts";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-sm transition-colors duration-200 ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="container-page grid h-[76px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Stratum Consulting — на главную">
          <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center">
            <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
              <rect x="4" y="6" width="24" height="4" fill="currentColor" className="text-primary" />
              <rect x="4" y="14" width="18" height="4" fill="currentColor" className="text-primary opacity-70" />
              <rect x="4" y="22" width="12" height="4" fill="currentColor" className="text-primary opacity-40" />
            </svg>
          </span>
          <span className="truncate text-[0.9375rem] font-semibold tracking-tight">
            Stratum <span className="font-normal text-muted-foreground">Consulting</span>
          </span>
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Cta asChild className="h-11 px-5 text-sm">
            <a href="#contact">Записаться на консультацию</a>
          </Cta>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Мобильная навигация"
          className="border-t border-border bg-background lg:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[10px] px-2 py-3 text-base text-foreground transition-colors hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
            <Cta asChild className="mt-4 w-full">
              <a href="#contact" onClick={() => setOpen(false)}>
                Записаться на консультацию
              </a>
            </Cta>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
