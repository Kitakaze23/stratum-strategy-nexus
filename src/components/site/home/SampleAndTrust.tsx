import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Download, FileText, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { trackEvent } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";
import { CONTACTS } from "@/data/contacts";
import { submitSampleRequest } from "@/lib/consultation";

import { Cta } from "../primitives";
import { HomeSection, Lead, SectionTitle } from "./shared";

const sampleSchema = z.object({
  email: z.string().trim().email("Укажите корректный e-mail"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
  }),
  website: z.string().optional(),
});
type SampleValues = z.infer<typeof sampleSchema>;

/**
 * «Как выглядит результат экспресс-проверки» — the lead magnet.
 * With `fileUrl` set, the button downloads the PDF; until then
 * ([ССЫЛКА НА ПРИМЕР ОТЧЁТА]) it asks for an e-mail and we send the sample by hand.
 * Metrika goal: sample_report_download.
 */
export function SampleReport() {
  const c = useSection("homeSample");
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const openedAt = useRef(0);
  useEffect(() => {
    if (open) openedAt.current = Date.now();
  }, [open]);
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
    trackEvent("sample_report_download", { location: "sample", mode: "request" });
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

          {c.fileUrl ? (
            <Cta asChild variant="secondary" className="mt-10">
              <a
                href={c.fileUrl}
                download
                onClick={() =>
                  trackEvent("sample_report_download", { location: "sample", mode: "file" })
                }
              >
                <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                {c.cta}
              </a>
            </Cta>
          ) : sent ? (
            <p role="status" className="mt-10 flex gap-3 text-[1.0625rem] leading-[1.55]">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {c.successText}
            </p>
          ) : !open ? (
            <Cta type="button" variant="secondary" className="mt-10" onClick={() => setOpen(true)}>
              <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {c.cta}
            </Cta>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative mt-10 max-w-[520px]"
            >
              <p className="text-[0.9375rem] leading-[1.6] text-foreground/85">{c.requestNote}</p>
              <label htmlFor="sample-email" className="mt-5 block text-sm font-medium">
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
                  {isSubmitting ? "Отправляем…" : "Получить пример"}
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
              <label
                htmlFor="sample-consent"
                className="mt-5 flex gap-3 text-sm leading-[1.6] text-muted-foreground"
              >
                <input
                  id="sample-consent"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
                  aria-invalid={!!errors.consent}
                  {...register("consent")}
                />
                <span>
                  Согласен с{" "}
                  <Link to="/consent" className="text-primary underline-offset-4 hover:underline">
                    обработкой персональных данных
                  </Link>
                  .
                </span>
              </label>
              {errors.consent ? (
                <p role="alert" className="mt-2 text-sm text-destructive">
                  {errors.consent.message}
                </p>
              ) : null}
              {error ? (
                <p role="alert" className="mt-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-[4px] border border-border bg-background p-7 shadow-card">
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

/** «Почему нам можно доверять»: four lines, each answers one doubt. */
export function TrustBlock() {
  const c = useSection("homeTrust");
  return (
    <HomeSection id="trust" trackId="trust" labelledBy="trust-title">
      <SectionTitle id="trust-title" className="mt-0">
        {c.title}
      </SectionTitle>
      <ul className="mt-10 grid gap-x-10 border-b border-border sm:grid-cols-2">
        {c.items.map((item, i) => (
          <li
            key={i}
            className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 border-t border-border py-5 text-[1.0625rem] leading-[1.55]"
          >
            <ShieldCheck
              className="mt-0.5 h-5 w-5 text-signal"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
