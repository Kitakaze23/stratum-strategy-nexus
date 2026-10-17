import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { trackContactClick, trackEvent } from "@/analytics/events";
import { useFormAnalytics } from "@/analytics/hooks";
import { CONTACTS } from "@/data/contacts";
import { useSection } from "@/content/useSiteContent";
import {
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
  const c = useSection(section);
  const analytics = useFormAnalytics("contact_form", { source: "contact_section" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationRequest>({
    resolver: zodResolver(consultationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: ConsultationRequest) => {
    const result = await submitConsultationRequest(values);
    if (!result.ok) {
      toast.error("Заявка не отправлена", { description: result.message });
      return;
    }
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
          <ul className="mt-12 grid border-t border-border sm:grid-cols-2">
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
              className="rounded-[4px] border border-border border-t-2 border-t-primary bg-card p-6 sm:p-8 md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field id="name" label="Имя" error={errors.name?.message}>
                  <input
                    id="name"
                    className={fieldClass}
                    placeholder="Алексей"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                    {...analytics.fieldProps("name", "text")}
                  />
                </Field>
                <Field id="company" label="Компания" error={errors.company?.message}>
                  <input
                    id="company"
                    className={fieldClass}
                    placeholder="Название компании"
                    aria-invalid={!!errors.company}
                    {...register("company")}
                    {...analytics.fieldProps("company", "text")}
                  />
                </Field>
                <Field
                  id="role"
                  label="Должность"
                  hint="необязательно"
                  error={errors.role?.message}
                >
                  <input
                    id="role"
                    className={fieldClass}
                    placeholder="CPO"
                    aria-invalid={!!errors.role}
                    {...register("role")}
                    {...analytics.fieldProps("role", "text")}
                  />
                </Field>
                <Field id="email" label="Email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    className={fieldClass}
                    placeholder="name@company.ru"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                    {...analytics.fieldProps("email", "email")}
                  />
                </Field>
                <Field
                  id="phone"
                  label="Телефон"
                  error={errors.phone?.message}
                  className="md:col-span-2"
                >
                  <input
                    id="phone"
                    type="tel"
                    className={fieldClass}
                    placeholder="+7 (900) 000-00-00"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                    {...analytics.fieldProps("phone", "tel")}
                  />
                </Field>
              </div>

              <div className="mt-6">
                <Field id="message" label="Описание задачи" error={errors.message?.message}>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-[4px] border border-input bg-background px-4 py-3 text-[0.9375rem] leading-[1.7] transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-destructive"
                    placeholder="Контекст, текущая ситуация и вопрос, который требует решения"
                    aria-invalid={!!errors.message}
                    {...register("message")}
                    {...analytics.fieldProps("message", "textarea")}
                  />
                </Field>
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
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium">
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
