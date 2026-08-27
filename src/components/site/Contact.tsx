import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { trackContactClick } from "@/analytics/events";
import { useFormAnalytics } from "@/analytics/hooks";
import { CONTACTS } from "@/data/contacts";
import { consultationSchema, submitConsultationRequest, type ConsultationRequest } from "@/lib/consultation";

import { Cta, Reveal, Section, SectionHead } from "./primitives";

const CHANNELS = [
  { icon: Phone, label: "Телефон", value: CONTACTS.phone, href: CONTACTS.phoneHref, channel: "phone" },
  { icon: Send, label: "Telegram", value: CONTACTS.telegram, href: CONTACTS.telegramHref, channel: "telegram" },
  { icon: MessageCircle, label: "WhatsApp", value: CONTACTS.phone, href: CONTACTS.whatsappHref, channel: "whatsapp" },
  { icon: Mail, label: "E-mail", value: CONTACTS.email, href: CONTACTS.emailHref, channel: "email" },
] as const;

const fieldClass =
  "h-[52px] w-full rounded-[10px] border border-input bg-background px-4 text-[0.9375rem] text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-destructive";

export function Contact() {
  const [sent, setSent] = useState(false);
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
    reset();
    setSent(true);
  };

  return (
    <Section id="contact" labelledBy="contact-title" trackId="contact">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHead
            id="contact-title"
            eyebrow="Контакты"
            title="Обсудим вашу задачу"
            description="Опишите задачу, с которой вы столкнулись. После получения заявки мы свяжемся с вами, чтобы уточнить детали и предложить наиболее подходящий формат работы."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  onClick={() => trackContactClick(channel.channel, "contact")}
                  className="grid h-full grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-[14px] border border-border bg-card p-5 shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                >
                  <channel.icon className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.1em] text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="block truncate text-[0.9375rem]">{channel.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.08} className="lg:col-span-7">
          {sent ? (
            <div
              role="status"
              className="flex h-full flex-col items-start justify-center rounded-[14px] border border-border bg-card p-8 shadow-card md:p-12"
            >
              <CheckCircle2 className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-6 text-2xl font-semibold">Заявка отправлена</h3>
              <p className="mt-4 max-w-[460px] text-[0.9375rem] leading-[1.7] text-muted-foreground">
                Спасибо за обращение. Мы свяжемся с вами в течение одного рабочего дня, чтобы
                уточнить детали и предложить подходящий формат работы.

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
              className="rounded-[14px] border border-border bg-card p-8 shadow-card md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field id="name" label="Имя" error={errors.name?.message}>
                  <input id="name" className={fieldClass} placeholder="Алексей" aria-invalid={!!errors.name} {...register("name")} {...analytics.fieldProps("name", "text")} />
                </Field>
                <Field id="company" label="Компания" error={errors.company?.message}>
                  <input id="company" className={fieldClass} placeholder="Название компании" aria-invalid={!!errors.company} {...register("company")} {...analytics.fieldProps("company", "text")} />
                </Field>
                <Field id="role" label="Должность" hint="необязательно" error={errors.role?.message}>
                  <input id="role" className={fieldClass} placeholder="CPO" aria-invalid={!!errors.role} {...register("role")} {...analytics.fieldProps("role", "text")} />
                </Field>
                <Field id="email" label="Email" error={errors.email?.message}>
                  <input id="email" type="email" className={fieldClass} placeholder="name@company.ru" aria-invalid={!!errors.email} {...register("email")} {...analytics.fieldProps("email", "email")} />
                </Field>
                <Field id="phone" label="Телефон" error={errors.phone?.message} className="md:col-span-2">
                  <input id="phone" type="tel" className={fieldClass} placeholder="+7 (900) 000-00-00" aria-invalid={!!errors.phone} {...register("phone")} {...analytics.fieldProps("phone", "tel")} />
                </Field>
              </div>

              <div className="mt-6">
                <Field id="message" label="Описание задачи" error={errors.message?.message}>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-[10px] border border-input bg-background px-4 py-3 text-[0.9375rem] leading-[1.7] transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-destructive"
                    placeholder="Контекст, текущая ситуация и вопрос, который требует решения"
                    aria-invalid={!!errors.message}
                    {...register("message")} {...analytics.fieldProps("message", "textarea")}
                  />
                </Field>
              </div>

              <div className="mt-6">
                <label htmlFor="consent" className="flex gap-3 text-sm leading-[1.6] text-muted-foreground">
                  <input
                    id="consent"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
                    aria-invalid={!!errors.consent}
                    {...register("consent")} {...analytics.fieldProps("consent", "checkbox")}
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
                  {isSubmitting ? "Отправляем…" : "Отправить заявку"}
                </Cta>
                <p className="text-sm text-muted-foreground">Ответ в течение одного рабочего дня.</p>
              </div>
            </form>
          )}
        </Reveal>
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
