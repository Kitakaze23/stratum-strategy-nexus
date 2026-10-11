import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { trackCtaClick } from "@/analytics/events";
import type { SectionKey } from "@/content/defaults";
import { useSiteContent } from "@/content/useSiteContent";

import { Cta } from "./primitives";
import { NAV_LINKS } from "./contacts";

const LINK_SECTION: Record<string, SectionKey> = {
  "#services": "services",
  "#portfolio": "portfolio",
  "#team": "team",
  "#insights": "insights",
  "#pricing": "pricing",
  "#contact": "contact",
};

function BrandLink({
  onHome,
  className,
  ariaLabel,
  children,
}: {
  onHome: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  if (onHome) {
    return (
      <a href="#top" className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link to="/" className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function SectionLink({
  href,
  onHome,
  className,
  onClick,
  children,
}: {
  href: string;
  onHome: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (onHome) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to="/" hash={href.slice(1)} hashScrollIntoView className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Header() {
  const content = useSiteContent();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const links = NAV_LINKS.filter((l) => {
    const key = LINK_SECTION[l.href];
    return !key || content[key].enabled !== false;
  });
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
          <BrandLink
            onHome={onHome}
            className="flex min-w-0 items-center gap-3"
            ariaLabel="Stratum Consulting — на главную"
          >
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
          </BrandLink>

          <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <SectionLink
                key={link.href}
                href={link.href}
                onHome={onHome}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </SectionLink>
            ))}
            <Cta asChild className="h-11 px-5 text-sm">
              {onHome ? (
                <a href="#contact" onClick={() => trackCtaClick("discuss_task", "header")}>
                  Обсудить задачу
                </a>
              ) : (
                <Link to="/" hash="contact" onClick={() => trackCtaClick("discuss_task", "header")}>
                  Обсудить задачу
                </Link>
              )}
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
              {links.map((link) => (
                <li key={link.href}>
                  <SectionLink
                    href={link.href}
                    onHome={onHome}
                    onClick={() => setOpen(false)}
                    className="block py-5 text-xl font-medium text-foreground"
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
            <Cta asChild className="mt-10 w-full">
              {onHome ? (
                <a
                  href="#contact"
                  onClick={() => {
                    trackCtaClick("discuss_task", "mobile_nav");
                    setOpen(false);
                  }}
                >
                  Обсудить задачу
                </a>
              ) : (
                <Link
                  to="/"
                  hash="contact"
                  onClick={() => {
                    trackCtaClick("discuss_task", "mobile_nav");
                    setOpen(false);
                  }}
                >
                  Обсудить задачу
                </Link>
              )}
            </Cta>
          </div>
        </nav>
      ) : null}
    </>
  );
}
