import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { SERVICES_CONTENT } from "@/data/services";

import { Cta, Reveal, Section, SectionHead } from "./primitives";

const FLAGSHIP = SERVICES_CONTENT[0]!;

const SERVICES = [
  {
    title: "Product Discovery",
    text: "Проверка продуктовых гипотез, исследование пользователей и приоритизация направлений развития.",
    outcome:
      "Понимание реальных потребностей пользователей и приоритетных направлений развития продукта.",
    path: "/services/product-discovery",
  },
  {
    title: "Аудит цифрового продукта",
    text: "Независимая оценка продукта: ценностное предложение, процессы, метрики и качество решений.",
    outcome: "Список сильных и слабых сторон продукта с конкретными рекомендациями.",
    path: "/services/product-audit",
  },
  {
    title: "Стратегия цифрового продукта",
    text: "Проверка позиционирования, приоритетов развития и логики уже принятых решений.",
    outcome: "Независимая профессиональная оценка продуктовой стратегии и приоритетов.",
    path: "/services/product-strategy",
  },
  {
    title: "Аудит MVP",
    text: "Разбор запущенного MVP: спрос, ценность, онбординг и причины отсутствия роста.",
    outcome: "Обоснованное решение о следующем шаге: продолжать, менять или остановиться.",
    path: "/services/mvp-review",
  },
] as const;

export function Services() {
  return (
    <Section id="services" tone="surface" labelledBy="services-title">
      <SectionHead
        id="services-title"
        eyebrow="Направления работы"
        title="Как снижаем неопределённость"
        description="Каждый формат работы завершается конкретным результатом, который можно использовать при принятии решения."
      />

      <Reveal className="mt-16">
        <article className="rounded-[14px] border border-primary/30 bg-card p-8 shadow-card md:p-12">
          <p className="text-xs uppercase tracking-[0.12em] text-primary">{FLAGSHIP.eyebrow}</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h3 className="text-2xl font-semibold leading-[1.2] md:text-[1.875rem]">
                {FLAGSHIP.title}
              </h3>
              <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted-foreground">
                {FLAGSHIP.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Cta asChild className="h-12 px-6">
                  <Link to={FLAGSHIP.path}>Оценить продукт</Link>
                </Cta>
              </div>
            </div>
            <div className="lg:col-span-6">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Что входит
              </p>
              <ul className="mt-5 grid gap-2 text-[0.9375rem] leading-[1.6] sm:grid-cols-2">
                {FLAGSHIP.deliverables.map((item) => (
                  <li key={item} className="border-l-2 border-border pl-3 text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <article className="flex h-full flex-col rounded-[14px] border border-border bg-card p-8 shadow-card">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{service.text}</p>
              <div className="mt-7 border-t border-border pt-6">
                <p className="text-xs uppercase tracking-[0.12em] text-primary">Результат</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.7]">{service.outcome}</p>
              </div>
              <Link
                to={service.path}
                className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-primary"
              >
                Подробнее
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
