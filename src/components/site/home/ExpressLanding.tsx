import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Check, CheckCircle2, FileText, Plus } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { trackContactClick, trackEvent, trackExpressCta } from "@/analytics/events";
import { useFormAnalytics, useSectionView } from "@/analytics/hooks";
import { useSection } from "@/content/useSiteContent";
import { CONTACTS } from "@/data/contacts";
import {
  consultationMailto,
  submitConsultationRequest,
  submitSampleRequest,
} from "@/lib/consultation";
import { cn } from "@/lib/utils";

import { Cta } from "../primitives";
import { ArrowLink, HomeSection, Lead, SectionTitle } from "./shared";

/**
 * Home page: one goal — a request for the express check («Отправить ТЗ на проверку»).
 * The same main button appears in the header, the hero, the result block and the
 * final form; everything else is a text link. Updated: Nov 2026.
 */

const FORM_ANCHOR = "#express-form";

function MainCta({
  label,
  location,
  className,
}: {
  label: string;
  location: "hero" | "result";
  className?: string;
}) {
  return (
    <Cta asChild className={className}>
      <a href={FORM_ANCHOR} onClick={() => trackExpressCta(location)}>
        {label}
      </a>
    </Cta>
  );
}

function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("border-b border-border", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 border-t border-border py-4 text-[1.0625rem] leading-[1.55]"
        >
          <Check className="mt-1 h-4 w-4 text-signal" strokeWidth={2.25} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------- Hero ---------------------------------- */

export function ExpressHero() {
  const ref = useSectionView<HTMLElement>("hero");
  const c = useSection("exHero");
  const result = useSection("exResult");
  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="border-b border-border pt-[76px]"
    >
      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="font-serif text-[2.125rem] font-medium leading-[1.1] text-balance sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            {c.title}
          </h1>
          <p className="mt-7 max-w-[600px] text-lg leading-[1.6] text-muted-foreground md:text-xl">
            {c.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <MainCta label={c.cta} location="hero" className="h-14 px-7 text-base" />
            <p className="flex items-baseline gap-3 text-[0.9375rem]">
              <span className="font-serif text-2xl text-primary tabular-nums">{c.price}</span>
              <span className="text-muted-foreground">{c.duration}</span>
            </p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{c.note}</p>
        </div>

        <aside
          aria-label="Как устроена экспресс-проверка"
          className="self-start border border-border border-t-2 border-t-primary bg-card p-7 lg:col-span-4 lg:col-start-9"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Вы присылаете
          </p>
          <ul className="mt-3 space-y-2 text-[0.9375rem]">
            <li className="flex gap-3">
              <FileText
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              ТЗ в любом виде
            </li>
            <li className="flex gap-3">
              <FileText
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              До трёх предложений подрядчиков
            </li>
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Через {c.duration} получаете
          </p>
          <ul className="mt-3 space-y-2 text-[0.9375rem]">
            {result.items.slice(0, 4).map((item, i) => (
              <li key={i} className="flex gap-3">
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-signal"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                <span>{(item.split(":")[0] ?? item).replace(/\.$/, "")}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

/* --------------------------------- Pains --------------------------------- */

export function ExpressPains() {
  const c = useSection("exPains");
  return (
    <HomeSection id="situations" trackId="situations" labelledBy="pains-title" tone="surface">
      <SectionTitle id="pains-title" className="mt-0 max-w-[760px]">
        {c.title}
      </SectionTitle>
      <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border sm:grid-cols-2">
        {c.items.map((item, i) => (
          <li key={i} className="bg-background p-7 text-[1.0625rem] leading-[1.55] md:p-8">
            {item}
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

/* -------------------------------- Result --------------------------------- */

export function ExpressResult() {
  const c = useSection("exResult");
  return (
    <HomeSection id="express" trackId="express_result" labelledBy="result-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionTitle id="result-title" className="mt-0">
            {c.title}
          </SectionTitle>
          <Lead>{c.subtitle}</Lead>
          <MainCta label={c.cta} location="result" className="mt-10" />
        </div>
        <div className="lg:col-span-7">
          <Bullets items={c.items} />
        </div>
      </div>
    </HomeSection>
  );
}

/* --------------------------- Sample (lead magnet) ------------------------ */

const sampleSchema = z.object({
  email: z.string().trim().email("Укажите корректный e-mail"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
  }),
  website: z.string().optional(),
});
type SampleValues = z.infer<typeof sampleSchema>;

export function ExpressSample() {
  const c = useSection("exSample");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SampleValues>({ resolver: zodResolver(sampleSchema), mode: "onBlur" });

  const onSubmit = async (v: SampleValues) => {
    setError(null);
    const r = await submitSampleRequest({
      kind: "sample",
      email: v.email,
      consent: true,
      website: v.website,
      elapsedMs: openedAt.current ? Date.now() - openedAt.current : undefined,
    });
    if (!r.ok) {
      setError(`${r.message ?? ""} Напишите нам на ${CONTACTS.email}.`);
      return;
    }
    trackEvent("sample_report_download", { location: "sample" });
    setSent(true);
  };

  return (
    <HomeSection id="sample" trackId="sample_report" labelledBy="sample-title" tone="surface">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionTitle id="sample-title" className="mt-0">
            {c.title}
          </SectionTitle>
          <Lead>{c.text}</Lead>

          {sent ? (
            <p role="status" className="mt-10 flex gap-3 text-[1.0625rem] leading-[1.55]">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {c.successText}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative mt-10 max-w-[520px]"
            >
              <label htmlFor="sample-email" className="block text-sm font-medium">
                Рабочая почта
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="sample-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.ru"
                  aria-invalid={!!errors.email}
                  className="h-12 min-w-0 flex-1 rounded-[4px] border border-input bg-background px-4 text-[0.9375rem] focus:border-primary aria-[invalid=true]:border-destructive"
                  {...register("email")}
                />
                <Cta type="submit" variant="secondary" disabled={isSubmitting}>
                  {isSubmitting ? "Отправляем…" : c.cta}
                </Cta>
              </div>
              {errors.email ? (
                <p role="alert" className="mt-2 text-sm text-destructive">
                  {errors.email.message}
                </p>
              ) : null}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="sample-website">Сайт</label>
                <input
                  id="sample-website"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>
              <Consent
                id="sample-consent"
                register={register("consent")}
                error={errors.consent?.message}
              />
              <p className="mt-3 text-sm text-muted-foreground">{c.formNote}</p>
              {error ? (
                <p role="alert" className="mt-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div
            aria-label="Что внутри отчёта"
            className="rounded-[4px] border border-border bg-background p-7 shadow-card"
          >
            <p className="flex items-center gap-3 text-sm font-semibold">
              <FileText className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
              Отчёт экспресс-проверки · пример
            </p>
            <ol className="mt-5 border-b border-border">
              {c.outline.map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 border-t border-border py-3 text-[0.9375rem]"
                >
                  <span aria-hidden="true" className="font-serif text-signal tabular-nums">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}

/* --------------------------------- Trust --------------------------------- */

export function ExpressTrust() {
  const c = useSection("exTrust");
  return (
    <HomeSection id="trust" trackId="trust" labelledBy="trust-title">
      <SectionTitle id="trust-title" className="mt-0">
        {c.title}
      </SectionTitle>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((item, i) => (
          <li key={i} className="border-t-2 border-signal pt-5">
            <p className="text-lg font-semibold leading-[1.35]">{item.title}</p>
            <p className="mt-2 text-[0.9375rem] leading-[1.6] text-muted-foreground">{item.text}</p>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

/* --------------------------------- Price --------------------------------- */

export function ExpressPrice() {
  const c = useSection("exPrice");
  return (
    <HomeSection id="price" trackId="price" labelledBy="price-title" tone="navy">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionTitle id="price-title" className="mt-0">
            {c.title}
          </SectionTitle>
          <p className="mt-5 text-[1.0625rem] text-navy-foreground/75">{c.product}</p>
        </div>
        <dl className="lg:col-span-8">
          {c.rows.map((row, i) => (
            <div
              key={i}
              className="grid gap-1 border-t border-navy-foreground/20 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
            >
              <dt className="text-sm text-navy-foreground/60">{row.term}</dt>
              <dd
                className={cn(
                  "text-[1.0625rem] leading-[1.55]",
                  i === 0 && "font-serif text-[2rem] leading-none tabular-nums",
                )}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </HomeSection>
  );
}

/* ------------------------------ Next steps -------------------------------- */

export function ExpressNext() {
  const c = useSection("exNext");
  return (
    <HomeSection id="next" trackId="next_steps" labelledBy="next-title">
      <SectionTitle id="next-title" className="mt-0">
        {c.title}
      </SectionTitle>
      <Lead>{c.subtitle}</Lead>
      <ul className="mt-12 border-b border-border">
        {c.items.map((item, i) => (
          <li key={i} className="border-t border-border">
            <Link
              to={item.link}
              onClick={() =>
                trackEvent("service_click", { service_name: item.link, location: "next_steps" })
              }
              className="group grid gap-3 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <span className="md:col-span-5">
                <span className="block text-lg font-semibold leading-[1.35] group-hover:text-primary">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{item.name}</span>
              </span>
              <span className="text-[0.9375rem] leading-[1.55] text-muted-foreground md:col-span-4">
                {item.when}
              </span>
              <span className="flex items-baseline justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:gap-1">
                <span className="text-[0.9375rem] font-medium tabular-nums">{item.price}</span>
                <ArrowLink className="text-sm text-primary">Подробнее</ArrowLink>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[0.9375rem] text-muted-foreground">{c.note}</p>
    </HomeSection>
  );
}

/* ---------------------------------- Team --------------------------------- */

function Photo({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(!src);
  return (
    <div className="aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-[4px] bg-surface">
      {failed ? null : (
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}

export function ExpressTeam() {
  const c = useSection("exTeam");
  return (
    <HomeSection id="team" trackId="team" labelledBy="team-title" tone="surface">
      <SectionTitle id="team-title" className="mt-0">
        {c.title}
      </SectionTitle>
      <Lead>{c.subtitle}</Lead>
      <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {c.people.map((p, i) => (
          <li key={i}>
            <Photo src={p.photo} name={p.name} />
            <h3 className="mt-6 text-xl font-semibold">{p.name}</h3>
            <p className="mt-1 text-[0.9375rem] font-medium text-primary">{p.role}</p>
            <ul className="mt-4 space-y-2 text-[0.9375rem] leading-[1.6] text-foreground/85">
              {p.points.map((pt, k) => (
                <li key={k}>{pt}</li>
              ))}
            </ul>
            {p.past?.length ? (
              <p className="mt-4 text-sm leading-[1.6] text-muted-foreground">
                <span className="font-semibold text-foreground">{p.pastTitle}:</span>{" "}
                {p.past.join(", ")}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-12 border-t border-border pt-6 text-[0.9375rem] leading-[1.6]">
        <span className="font-semibold">{c.projectsTitle}:</span>{" "}
        <span className="text-muted-foreground">{c.projectsText}</span>
      </p>
    </HomeSection>
  );
}

/* ----------------------------------- FAQ --------------------------------- */

export function ExpressFaq() {
  const c = useSection("exFaq");
  return (
    <HomeSection id="faq" trackId="faq" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionTitle id="faq-title" className="mt-0">
            {c.title}
          </SectionTitle>
        </div>
        <div className="border-b border-border lg:col-span-7 lg:col-start-6">
          {c.items.map((item, i) => (
            <details
              key={i}
              className="group border-t border-border"
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) {
                  trackEvent("faq_open", { question_index: i + 1 });
                }
              }}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold leading-[1.4] transition-colors duration-200 hover:text-primary [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="-mt-1 max-w-[640px] pb-7 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}

/* ------------------------------- Final form ------------------------------ */

const isEmail = (v: string) => z.string().email().safeParse(v).success;
const isPhoneOrHandle = (v: string) =>
  v.replace(/\D/g, "").length >= 6 || /^@?[A-Za-z0-9_]{5,32}$/.test(v);

const expressSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100, "Слишком длинное значение"),
  contact: z
    .string()
    .trim()
    .min(1, "Укажите почту или телефон, чтобы мы могли ответить")
    .max(255, "Слишком длинное значение")
    .refine((v) => isEmail(v) || isPhoneOrHandle(v), "Укажите корректную почту или телефон"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
  }),
  website: z.string().optional(),
});
type ExpressValues = z.infer<typeof expressSchema>;

const fieldClass =
  "h-12 w-full rounded-[4px] border border-input bg-background px-4 text-[0.9375rem] text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-destructive";

function Consent({
  id,
  register,
  error,
}: {
  id: string;
  register: ReturnType<ReturnType<typeof useForm>["register"]>;
  error?: string | undefined;
}) {
  return (
    <div className="mt-5">
      <label htmlFor={id} className="flex gap-3 text-sm leading-[1.6] text-muted-foreground">
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
          aria-invalid={!!error}
          {...register}
        />
        <span>
          Согласен с{" "}
          <Link to="/consent" className="text-primary underline-offset-4 hover:underline">
            обработкой персональных данных
          </Link>
          .
        </span>
      </label>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ExpressForm() {
  const c = useSection("exForm");
  const hero = useSection("exHero");
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState<{ name: string; email?: string; phone?: string } | null>(
    null,
  );
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, [sent]);
  const analytics = useFormAnalytics("express_form", { source: "express_form" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpressValues>({ resolver: zodResolver(expressSchema), mode: "onBlur" });

  const onSubmit = async (v: ExpressValues) => {
    const contact = v.contact.trim();
    const route = isEmail(contact) ? { email: contact } : { phone: contact };
    const result = await submitConsultationRequest({
      name: v.name,
      ...route,
      message: "",
      consent: true,
      kind: "express",
      website: v.website,
      elapsedMs: openedAt.current ? Date.now() - openedAt.current : undefined,
    });
    if (!result.ok) {
      setFailed({ name: v.name, ...route });
      trackEvent("contact_form_send_failed", { source: "express_form" });
      return;
    }
    setFailed(null);
    analytics.onSubmitSuccess();
    trackEvent("express_form_submit", { with_file: false });
    reset();
    setSent(true);
  };

  return (
    <HomeSection id="express-form" trackId="express_form" labelledBy="form-title" tone="surface">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionTitle id="form-title" className="mt-0">
            {c.title}
          </SectionTitle>
          <Lead>{c.subtitle}</Lead>
          <p className="mt-8 flex items-baseline gap-3">
            <span className="font-serif text-3xl text-primary tabular-nums">{hero.price}</span>
            <span className="text-muted-foreground">{hero.duration}</span>
          </p>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div
              role="status"
              className="flex h-full flex-col items-start justify-center rounded-[4px] border border-border border-t-2 border-t-primary bg-card p-8 md:p-12"
            >
              <CheckCircle2 className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-6 font-serif text-2xl font-medium">{c.successTitle}</h3>
              <p className="mt-4 max-w-[460px] text-[0.9375rem] leading-[1.7] text-muted-foreground">
                {c.successText}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative rounded-[4px] border border-border border-t-2 border-t-primary bg-card p-6 sm:p-8 md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field id="ex-name" label="Имя" error={errors.name?.message}>
                  <input
                    id="ex-name"
                    autoComplete="name"
                    className={fieldClass}
                    aria-invalid={!!errors.name}
                    {...register("name")}
                    {...analytics.fieldProps("name", "text")}
                  />
                </Field>
                <Field id="ex-contact" label="Почта или телефон" error={errors.contact?.message}>
                  <input
                    id="ex-contact"
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="name@company.ru или +7 900 000-00-00"
                    aria-invalid={!!errors.contact}
                    {...register("contact")}
                    {...analytics.fieldProps("contact", "text")}
                  />
                </Field>
              </div>

              <p className="mt-6 border-l-2 border-signal pl-4 text-sm leading-[1.6] text-muted-foreground">
                {c.fileNote}
              </p>

              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="ex-website">Сайт</label>
                <input id="ex-website" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              <Consent
                id="ex-consent"
                register={register("consent")}
                error={errors.consent?.message}
              />

              <Cta
                type="submit"
                disabled={isSubmitting}
                onClick={() => trackExpressCta("final")}
                className="mt-8 h-14 w-full px-7 text-base sm:w-auto"
              >
                {isSubmitting ? "Отправляем…" : c.cta}
              </Cta>

              {failed ? (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-destructive bg-surface px-5 py-4 text-[0.9375rem] leading-[1.6]"
                >
                  <p className="font-medium">Заявка не ушла — ничего не потеряно.</p>
                  <p className="mt-1 text-muted-foreground">
                    Отправьте её письмом: текст уже заполнен.
                  </p>
                  <a
                    href={consultationMailto(CONTACTS.email, {
                      ...failed,
                      message: "Заявка на экспресс-проверку ТЗ",
                    })}
                    onClick={() => trackContactClick("email", "express_fallback")}
                    className="mt-3 inline-block font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Отправить письмом
                  </a>
                </div>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </HomeSection>
  );
}
