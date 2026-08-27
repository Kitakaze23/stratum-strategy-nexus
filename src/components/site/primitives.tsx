import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ---------------------------------- CTA ---------------------------------- */

const ctaVariants = cva(
  "inline-flex h-[52px] items-center justify-center gap-2 rounded-[10px] px-7 text-[0.9375rem] font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "border border-primary bg-background text-primary hover:bg-accent",
        ghostLight:
          "border border-navy-foreground/30 text-navy-foreground hover:border-navy-foreground/60 hover:bg-navy-foreground/5",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function Cta({
  className,
  variant,
  asChild,
  ...props
}: ComponentPropsWithoutRef<"button"> & VariantProps<typeof ctaVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(ctaVariants({ variant }), className)} {...props} />;
}

/* -------------------------------- Section -------------------------------- */

export function Section({
  id,
  tone = "light",
  className,
  children,
  labelledBy,
  trackId,
}: {
  id?: string;
  tone?: "light" | "surface" | "navy";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
  /** Stable analytics section id — fires `section_view` once per page view. */
  trackId?: string;
}) {
  const tones = {
    light: "bg-background",
    surface: "bg-surface",
    navy: "bg-navy text-navy-foreground",
  } as const;
  const ref = useSectionView<HTMLElement>(trackId);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-20 py-24 md:py-[7.5rem] lg:py-[8.75rem]", tones[tone], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/* --------------------------------- Reveal -------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ SectionHead ------------------------------ */

export function SectionHead({
  eyebrow,
  title,
  description,
  id,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  tone?: "light" | "navy";
}) {
  return (
    <Reveal className="measure">
      <p className={cn("eyebrow", tone === "navy" && "text-navy-foreground/70")}>{eyebrow}</p>
      <h2
        id={id}
        className="mt-5 text-3xl font-semibold leading-[1.15] md:text-[2.75rem]"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 text-lg leading-[1.75]",
            tone === "navy" ? "text-navy-foreground/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
