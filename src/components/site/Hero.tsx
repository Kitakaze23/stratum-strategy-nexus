import heroImage from "@/assets/hero-architecture.jpg";

import { Cta, Reveal } from "./primitives";

const FACTS = [
  { value: "15+ лет", label: "в продуктовой и цифровой трансформации" },
  { value: "40+", label: "продуктов и цифровых инициатив в работе" },
  { value: "Enterprise", label: "банки, промышленность, технологии" },
];

export function Hero() {
  return (
    <section id="top" className="border-b border-border pt-[76px]">
      <div className="container-page grid gap-16 py-24 md:py-[7.5rem] lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Независимое стратегическое консультирование</p>
            <h1 className="mt-6 text-[2.25rem] font-semibold leading-[1.12] md:text-[3.25rem]">
              Продуктовые решения, основанные на данных и опыте
            </h1>
            <p className="mt-7 max-w-[560px] text-lg leading-[1.75] text-muted-foreground">
              Stratum Consulting помогает руководителям принимать обоснованные решения о продуктах,
              цифровых инициативах и технологиях. Мы не разрабатываем и не внедряем — мы даём
              независимую оценку и структурируем выбор.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-10 flex flex-wrap gap-3">
            <Cta asChild>
              <a href="#contact">Записаться на консультацию</a>
            </Cta>
            <Cta asChild variant="secondary">
              <a href="#services">Направления работы</a>
            </Cta>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-6">
          <img
            src={heroImage}
            width={1600}
            height={1104}
            alt="Фасад современного делового центра"
            className="aspect-[4/3] w-full rounded-[14px] border border-border object-cover"
          />
        </Reveal>
      </div>

      <div className="container-page">
        <dl className="grid gap-10 border-t border-border py-14 sm:grid-cols-3">
          {FACTS.map((fact) => (
            <div key={fact.value}>
              <dt className="text-2xl font-semibold tracking-tight">{fact.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
