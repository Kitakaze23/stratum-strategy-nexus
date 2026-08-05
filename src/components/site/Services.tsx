import { Reveal, Section, SectionHead } from "./primitives";

const SERVICES = [
  {
    title: "Product Discovery",
    text: "Проверка продуктовых гипотез, исследование пользователей и приоритизация направлений развития.",
    outcome:
      "Понимание реальных потребностей пользователей и приоритетных направлений развития продукта.",
  },
  {
    title: "Аудит цифрового продукта",
    text: "Независимая оценка продукта: ценностное предложение, процессы, метрики и качество решений.",
    outcome: "Список сильных и слабых сторон продукта с конкретными рекомендациями.",
  },
  {
    title: "Продуктовая аналитика",
    text: "Подходы к продуктовым и управленческим метрикам, модель данных и отчётность для решений.",
    outcome: "Понимание того, какие показатели действительно влияют на развитие продукта.",
  },
  {
    title: "Критичный разбор продукта",
    text: "Структурированный разбор продуктовой стратегии, приоритетов и уже принятых решений.",
    outcome:
      "Независимая профессиональная оценка продуктовых решений, стратегии и приоритетов.",
  },
];

export function Services() {
  return (
    <Section id="services" tone="surface" labelledBy="services-title">
      <SectionHead
        id="services-title"
        eyebrow="Услуги"
        title="Чем могу помочь"
        description="Каждый формат работы завершается конкретным результатом, который можно использовать при принятии решения."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <article className="flex h-full flex-col rounded-[14px] border border-border bg-card p-8 shadow-card">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{service.text}</p>
              <div className="mt-7 border-t border-border pt-6">
                <p className="text-xs uppercase tracking-[0.12em] text-primary">Результат</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.7]">{service.outcome}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
