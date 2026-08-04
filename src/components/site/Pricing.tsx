import { Check } from "lucide-react";

import { Cta, Reveal, Section, SectionHead } from "./primitives";

const FORMATS = [
  {
    title: "Экспресс-консультация",
    duration: "30 минут",
    price: "от 25 000 ₽",
    items: ["Один конкретный вопрос", "Оценка ситуации", "Направление дальнейших действий"],
  },
  {
    title: "Стратегическая консультация",
    duration: "60 минут",
    price: "от 45 000 ₽",
    items: ["Продуктовая или технологическая развилка", "Сценарии решения", "Краткое резюме после встречи"],
  },
  {
    title: "Deep Dive",
    duration: "2 часа",
    price: "от 80 000 ₽",
    items: ["Подготовка на материалах компании", "Разбор с командой", "Структурированные рекомендации"],
  },
  {
    title: "Критичный разбор продукта",
    duration: "Комплексный формат",
    price: "от 120 000 ₽",
    items: ["Диагностика продукта и метрик", "Оценка рисков и приоритетов", "План решений с критериями успеха"],
  },
];

export function Pricing() {
  return (
    <Section id="pricing" tone="surface" labelledBy="pricing-title">
      <SectionHead
        id="pricing-title"
        eyebrow="Форматы"
        title="Форматы работы и ориентиры стоимости"
        description="Итоговый объём и стоимость определяются бизнес-контекстом и задачами. Указанные значения — ориентир для планирования."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {FORMATS.map((format, index) => (
          <Reveal key={format.title} delay={index * 0.05}>
            <article className="flex h-full flex-col rounded-[14px] border border-border bg-card p-8 shadow-card">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{format.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{format.duration}</p>
                </div>
                <p className="shrink-0 text-[0.9375rem] font-semibold text-primary">{format.price}</p>
              </div>
              <ul className="mt-7 space-y-3 text-[0.9375rem] text-muted-foreground">
                {format.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12">
        <Cta asChild>
          <a href="#contact">Записаться на консультацию</a>
        </Cta>
      </Reveal>
    </Section>
  );
}
