import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-[76px]">
        <article className="container-page max-w-[820px] py-20 md:py-28">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            На главную
          </Link>

          <p className="eyebrow mt-10">{eyebrow}</p>
          <h1 className="mt-5 text-3xl font-semibold leading-[1.15] md:text-[2.5rem]">{title}</h1>
          <p className="mt-5 text-sm text-muted-foreground">Редакция от {updated}</p>

          <div className="mt-12 space-y-10 text-[0.9375rem] leading-[1.75] text-muted-foreground">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function LegalBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="border-l-2 border-border pl-4">
          {item}
        </li>
      ))}
    </ul>
  );
}
