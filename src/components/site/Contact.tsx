import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { trackContactClick, trackEvent } from "@/analytics/events";
import { useFormAnalytics } from "@/analytics/hooks";
import { CONTACTS } from "@/data/contacts";
import { useSection } from "@/content/useSiteContent";
import {
  consultationMailto,
  consultationSchema,
  submitConsultationRequest,
  type ConsultationRequest,
} from "@/lib/consultation";

import { Eyebrow, Lead, SectionTitle } from "./home/shared";
import { Cta, Section } from "./primitives";

const CHANNELS = [
  {
    icon: Send,
    label: "Написать в Telegram",
    value: CONTACTS.telegram,
    href: CONTACTS.telegramHref,
    channel: "telegram",
  },
  {
    icon: Mail,
    label: "Написать на Email",
    value: CONTACTS.email,
    href: CONTACTS.emailHref,
    channel: "email",
  },
  {
    icon: Phone,
    label: "Позвонить",
    value: CONTACTS.phone,
    href: CONTACTS.phoneHref,
    channel: "phone",
  },
  {
    icon: MessageCircle,
    label: "Написать в WhatsApp",
    value: CONTACTS.phone,
    href: CONTACTS.whatsappHref,
    channel: "whatsapp",
  },
] as const;

const CONTACT_REQUIRED = "Укажите e-mail или телефон, чтобы мы могли ответить";

/**
 * zod skips object-level refinements while other fields are invalid, so the
 * "e-mail or phone" rule is also checked here — all errors show at once.
 */
const baseResolver = zodResolver(consultationSchema) as Resolver<ConsultationRequest>;
const consultationResolver: Resolver<ConsultationRequest> = async (values, context, options) => {
  const result = await baseResolver(values, context, options);
  if (!values.email?.trim() && !values.phone?.trim() && !result.errors.email) {
    return {
      values: {},
      errors: { ...result.errors, email: { type: "custom", message: CONTACT_REQUIRED } },
    };
  }
  return result;
};

const fieldClass =
  "h-12 w-full rounded-[4px] border border-input bg-background px-4 text-[0.9375rem] text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-destructive";

/**
 * The site's single lead form. The home page passes its own copy section
 * (`homeContact`); article pages use the shared `contact` section.
 */
export function Contact({
  section = "contact",
  tone = "light",
}: {
  section?: "contact" | "homeContact";
  tone?: "light" | "surface";
}) {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState<ConsultationRequest | null>(null);
  const openedAt = useRef<number>(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, [sent]);
  const c = useSection(section);
  const analytics = useFormAnalytics("contact_form", { source: "contact_section" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationRequest>({
    resolver: consultationResolver,
    mode: "onBlur",
  });

  const onSubmit = async (values: ConsultationRequest) => {
    const result = await submitConsultationRequest({
      ...values,
      elapsedMs: openedAt.current ? Date.now() - openedAt.current : undefined,
    });
    if (!result.ok) {
      // keep what the visitor typed and offer a ready-made e-mail instead
      setFailed(values);
      trackEvent("contact_form_send_failed", { source: "contact_section" });
      toast.error("Заявка не отправлена", {
        description: `${result.message ?? ""} Отправьте её письмом или напишите в Telegram.`,
      });
      return;
    }
    setFailed(null);
    // fires only after the API confirms the submission — no field values sent
    analytics.onSubmitSuccess();
    trackEvent("contact_form_submit", { source: "contact_section" });
    reset();
    setSent(true);
  };

  return (
    <Section id="contact" tone={tone} labelledBy="contact-title" trackId="contact">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle id="contact-title">{c.title}</SectionTitle>
          {c.description ? <Lead>{c.description}</Lead> : null}
          {c.steps?.length ? (
            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {c.stepsTitle}
              </h3>
              <ol className="mt-4 border-b border-border">
                {c.steps.map((step, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2 border-t border-border py-3.5 text-[0.9375rem] leading-[1.55]"
                  >
                    <span aria-hidden="true" className="font-serif text-signal tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          <ul className="mt-10 grid border-t border-border sm:grid-cols-2">
            {CHANNELS.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  onClick={() => trackContactClick(channel.channel, "contact")}
                  className="group grid h-full grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-b border-border py-5 pr-4 transition-colors duration-200 hover:text-primary"
                >
                  <channel.icon
                    className="h-5 w-5 shrink-0 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-medium">{channel.label}</span>
                    <span className="block truncate text-[0.8125rem] text-muted-foreground">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
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
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 text-[0.9375rem] font-medium text-primary underline-offset-4 transition-colors hover:underline"
              >
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative rounded-[4px] border border-border border-t-2 border-t-primary bg-card p-6 sm:p-8 md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field id="name" label="Имя" error={errors.name?.message}>
                  <input
                    id="name"
                    autoComplete="name"
                    className={fieldClass}
                    placeholder="Алексей"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                    {...analytics.fieldProps("name", "text")}
                  />
                </Field>
                <Field
                  id="company"
                  label="Компания"
                  hint="необязательно"
                  error={errors.company?.message}
                >
                  <input
                    id="company"
                    autoComplete="organization"
                    className={fieldClass}
                    placeholder="Название компании"
                    aria-invalid={!!errors.company}
                    {...register("company")}
                    {...analytics.fieldProps("company", "text")}
                  />
                </Field>
              </div>

              <fieldset className="mt-6">
                <legend className="text-sm font-medium">
                  Как с вами связаться
                  <span className="ml-2 font-normal text-muted-foreground">
                    (достаточно одного)
                  </span>
                </legend>
                <div className="mt-2 grid gap-6 md:grid-cols-2">
                  <Field id="email" label="E-mail" srLabel error={errors.email?.message}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={fieldClass}
                      placeholder="name@company.ru"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                      {...analytics.fieldProps("email", "email")}
                    />
                  </Field>
                  <Field
                    id="phone"
                    label="Телефон или Telegram"
                    srLabel
                    error={errors.phone?.message}
                  >
                    <input
                      id="phone"
                      type="text"
                      autoComplete="tel"
                      className={fieldClass}
                      placeholder="+7 900 000-00-00 или @ник"
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                      {...analytics.fieldProps("phone", "tel")}
                    />
                  </Field>
                </div>
              </fieldset>

              <div className="mt-6">
                <Field
                  id="message"
                  label="Коротко о задаче"
                  hint="необязательно"
                  error={errors.message?.message}
                >
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-[4px] border border-input bg-background px-4 py-3 text-[0.9375rem] leading-[1.7] transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-destructive"
                    placeholder="Например: нужно ТЗ перед тендером на систему учёта"
                    aria-invalid={!!errors.message}
                    {...register("message")}
                    {...analytics.fieldProps("message", "textarea")}
                  />
                </Field>
              </div>

              {/* Honeypot for bots — hidden from people and assistive tech. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Сайт</label>
                <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="consent"
                  className="flex gap-3 text-sm leading-[1.6] text-muted-foreground"
                >
                  <input
                    id="consent"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
                    aria-invalid={!!errors.consent}
                    {...register("consent")}
                    {...analytics.fieldProps("consent", "checkbox")}
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
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Cta type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Отправляем…" : c.cta}
                </Cta>
                <p className="text-sm text-muted-foreground">{c.note}</p>
              </div>

              {failed ? (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-destructive bg-surface px-5 py-4 text-[0.9375rem] leading-[1.6]"
                >
                  <p className="font-medium">Заявка не ушла — ничего не потеряно.</p>
                  <p className="mt-1 text-muted-foreground">
                    Отправьте её письмом: текст уже заполнен. Или напишите нам в Telegram.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    <a
                      href={consultationMailto(CONTACTS.email, failed)}
                      onClick={() => trackContactClick("email", "contact_fallback")}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Отправить письмом
                    </a>
                    <a
                      href={CONTACTS.telegramHref}
                      onClick={() => trackContactClick("telegram", "contact_fallback")}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Написать в Telegram
                    </a>
                  </div>
                </div>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  hint,
  srLabel,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string | undefined;
  /** Smaller secondary label, used inside a fieldset that already has a legend. */
  srLabel?: boolean;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={
          srLabel ? "block text-[0.8125rem] text-muted-foreground" : "block text-sm font-medium"
        }
      >
        {label}
        {hint ? <span className="ml-2 font-normal text-muted-foreground">({hint})</span> : null}
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
