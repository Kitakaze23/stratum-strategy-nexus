import { BarChart3, Compass, Cpu, LineChart, Search, Users } from "lucide-react";

import { Reveal, Section, SectionHead } from "./primitives";

const SERVICES = [
  {
    icon: Compass,
    title: "Продуктовая стратегия",
    text: "Формирование продуктовой логики: позиционирование, приоритеты, метрики и границы ответственности команд.",
  },
  {
    icon: Search,
    title: "Product Discovery",
    text: "Структурная проверка гипотез до инвестиций: спрос, экономика, технологическая реализуемость.",
  },
  {
    icon: LineChart,
    title: "Цифровая трансформация",
    text: "Оценка зрелости процессов и построение последовательного плана изменений без избыточных инициатив.",
  },
  {
    icon: BarChart3,
    title: "Аналитика уровня предприятия",
    text: "Модель данных, управленческая отчётность и метрики, на которые можно опираться в решениях.",
  },
  {
    icon: Cpu,
    title: "Искусственный интеллект",
    text: "Объективная оценка применимости AI: где создаётся business value, а где технология избыточна.",
  },
  {
    icon: Users,
    title: "Executive advisory",
    text: "Регулярная работа с CEO, CPO и CTO как независимый внешний взгляд на продуктовые решения.",
  },
];

export function Services() {
  return (
    <Section id="services" tone="surface" labelledBy="services-title">
      <SectionHead
        id="services-title"
        eyebrow="Направления"
        title="Шесть направлений практики"
        description="Работа строится вокруг решений, которые принимает руководитель, а не вокруг объёма выполненных часов."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <article className="h-full rounded-[14px] border border-border bg-card p-8 shadow-card">
              <service.icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-6 text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{service.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
