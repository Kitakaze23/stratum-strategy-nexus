import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { CONTACTS } from "./contacts";
import { Cta, Reveal, Section, SectionHead } from "./primitives";

const schema = z.object({
  name: z.string().min(2, "Укажите имя"),
  company: z.string().min(2, "Укажите компанию"),
  contact: z.string().min(5, "Укажите телефон, e-mail или Telegram"),
  format: z.string().min(1, "Выберите формат"),
  message: z.string().min(20, "Опишите задачу — не менее 20 символов"),
});

type FormValues = z.infer<typeof schema>;

const FORMAT_OPTIONS = [
  "Экспресс-консультация (30 минут)",
  "Стратегическая консультация (60 минут)",
  "Deep Dive (2 часа)",
  "Критичный разбор продукта",
];

const CHANNELS = [
  { icon: Phone, label: "Телефон", value: CONTACTS.phone, href: CONTACTS.phoneHref },
  { icon: Send, label: "Telegram", value: CONTACTS.telegram, href: CONTACTS.telegramHref },
  { icon: MessageCircle, label: "WhatsApp", value: CONTACTS.phone, href: CONTACTS.whatsappHref },
  { icon: Mail, label: "E-mail", value: CONTACTS.email, href: CONTACTS.emailHref },
];

const fieldClass =
  "h-[52px] w-full rounded-[10px] border border-input bg-background px-4 text-[0.9375rem] text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary";

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", contact: "", format: FORMAT_OPTIONS[0], message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const body = [
      `Имя: ${values.name}`,
      `Компания: ${values.company}`,
      `Контакт: ${values.contact}`,
      `Формат: ${values.format}`,
      "",
      values.message,
    ].join("\n");

    window.location.href = `${CONTACTS.emailHref}?subject=${encodeURIComponent(
      "Запрос консультации — Stratum Consulting",
    )}&body=${encodeURIComponent(body)}`;

    toast.success("Заявка подготовлена", {
      description: "Письмо открыто в почтовом клиенте. Также можно написать в Telegram или WhatsApp.",
    });
    reset();
  };

  return (
    <Section id="contact" labelledBy="contact-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHead
            id="contact-title"
            eyebrow="Консультация"
            title="Записаться на консультацию"
            description="Опишите задачу в нескольких предложениях. Мы подтвердим формат, продолжительность и удобное время."
          />
          <ul className="mt-12 space-y-4">
            {CHANNELS.map((channel) => (
              <li key={channel.label} className="border-t border-border pt-4">
                <a
                  href={channel.href}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 transition-colors duration-200 hover:text-primary"
                >
                  <channel.icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-[14px] border border-border bg-card p-8 shadow-card md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Имя и должность
                </label>
                <input
                  id="name"
                  className={`mt-2 ${fieldClass}`}
                  placeholder="Алексей, CPO"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium">
                  Компания
                </label>
                <input
                  id="company"
                  className={`mt-2 ${fieldClass}`}
                  placeholder="Название компании"
                  aria-invalid={!!errors.company}
                  {...register("company")}
                />
                {errors.company ? (
                  <p className="mt-2 text-sm text-destructive">{errors.company.message}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium">
                  Способ связи
                </label>
                <input
                  id="contact"
                  className={`mt-2 ${fieldClass}`}
                  placeholder="Телефон, e-mail или Telegram"
                  aria-invalid={!!errors.contact}
                  {...register("contact")}
                />
                {errors.contact ? (
                  <p className="mt-2 text-sm text-destructive">{errors.contact.message}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="format" className="block text-sm font-medium">
                  Формат
                </label>
                <select
                  id="format"
                  className={`mt-2 ${fieldClass}`}
                  aria-invalid={!!errors.format}
                  {...register("format")}
                >
                  {FORMAT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium">
                Задача
              </label>
              <textarea
                id="message"
                rows={5}
                className="mt-2 w-full rounded-[10px] border border-input bg-background px-4 py-3 text-[0.9375rem] leading-[1.7] transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary"
                placeholder="Контекст, текущая ситуация и вопрос, который требует решения"
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message ? (
                <p className="mt-2 text-sm text-destructive">{errors.message.message}</p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cta type="submit" disabled={isSubmitting}>
                Отправить запрос
              </Cta>
              <p className="text-sm text-muted-foreground">Ответ в течение одного рабочего дня.</p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
