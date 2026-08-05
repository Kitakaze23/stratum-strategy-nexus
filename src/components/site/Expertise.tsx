import { BarChart3, ClipboardCheck, Cpu, LineChart, Microscope, Search } from "lucide-react";

import { Reveal, Section, SectionHead } from "./primitives";

const AREAS = [
  {
    icon: Search,
    title: "Product Discovery",
    text: "Исследование пользователей, проверка гипотез, формирование продуктовой стратегии.",
  },
  {
    icon: ClipboardCheck,
    title: "Product Audit",
    text: "Комплексная независимая оценка цифрового продукта.",
  },
  {
    icon: BarChart3,
    title: "Enterprise Analytics",
    text: "Разработка подходов к продуктовой аналитике и управленческим метрикам.",
  },
  {
    icon: Cpu,
    title: "Artificial Intelligence",
    text: "Определение сценариев применения AI с реальной бизнес-ценностью.",
  },
  {
    icon: LineChart,
    title: "Digital Transformation",
    text: "Поддержка руководителей при развитии цифровых продуктов и сервисов.",
  },
  {
    icon: Microscope,
    title: "Critical Product Review",
    text: "Объективный разбор продукта, стратегии и текущих решений.",
  },
];

export function Expertise() {
  return (
    <Section id="expertise" labelledBy="expertise-title">
      <SectionHead
        id="expertise-title"
        eyebrow="Экспертиза"
        title="Экспертиза"
        description="Шесть направлений, вокруг которых строится работа с продуктовыми и цифровыми решениями."
      />

      <div className="mt-16 divide-y divide-border border-y border-border">
        {AREAS.map((area, index) => (
          <Reveal key={area.title} delay={index * 0.04}>
            <article className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-6 py-8 md:grid-cols-[auto_18rem_minmax(0,1fr)] md:items-center md:gap-10">
              <area.icon className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-lg font-semibold">{area.title}</h3>
              <p className="col-span-2 text-[0.9375rem] leading-[1.7] text-muted-foreground md:col-span-1">
                {area.text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
