import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { useSectionView } from "@/analytics/hooks";
import { cn } from "@/lib/utils";

/**
 * Home-page building blocks. Content is always rendered (no scroll-triggered
 * reveal), so every block is readable without JavaScript and for crawlers.
 */

type Tone = "light" | "surface" | "navy";

const TONES: Record<Tone, string> = {
  light: "bg-background",
  surface: "bg-surface",
  navy: "bg-navy text-navy-foreground",
};

export function HomeSection({
  id,
  trackId,
  labelledBy,
  tone = "light",
  className,
  children,
}: {
  id: string;
  trackId: string;
  labelledBy: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  const ref = useSectionView<HTMLElement>(trackId);
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-[76px] py-20 md:py-28", TONES[tone], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "navy" && "text-navy-foreground/70",
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-signal" />
      {children}
    </p>
  );
}

export function SectionTitle({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "mt-5 font-serif text-[1.875rem] font-medium leading-[1.15] md:text-[2.5rem] lg:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lead({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-6 text-[1.0625rem] leading-[1.7]",
        tone === "navy" ? "text-navy-foreground/75" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Text link with an arrow — the calm secondary action used across the page. */
export function ArrowLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[0.9375rem] font-medium", className)}>
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </span>
  );
}
