import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { trackCtaClick } from "@/analytics/events";

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-sm transition-shadow duration-200 ${
          scrolled ? "border-b border-border shadow-card" : "border-b border-transparent"
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

          <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
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
              <a href="#contact" onClick={() => trackCtaClick("discuss_task", "header")}>
                Обсудить задачу
              </a>
            </Cta>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-background text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Мобильная навигация"
          className="fixed inset-x-0 bottom-0 top-[76px] z-40 bg-background lg:hidden"
        >
          <div className="container-page flex h-full flex-col pt-10">
            <ul className="divide-y divide-border border-y border-border">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 text-xl font-medium text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Cta asChild className="mt-10 w-full">
              <a
                href="#contact"
                onClick={() => {
                  trackCtaClick("discuss_task", "mobile_nav");
                  setOpen(false);
                }}
              >
                Обсудить задачу
              </a>
            </Cta>
          </div>
        </nav>
      ) : null}
    </>
  );
}
