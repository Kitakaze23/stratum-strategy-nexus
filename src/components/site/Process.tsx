import { Reveal, Section, SectionHead } from "./primitives";

const STEPS = [
  { step: "01", title: "Первичное знакомство", text: "15–20 минут" },
  { step: "02", title: "Формулирование задачи", text: "Определяем цели консультации и ожидаемый результат." },
  { step: "03", title: "Подготовка", text: "Изучение материалов и предварительный анализ." },
  { step: "04", title: "Консультация", text: "Структурированное обсуждение задачи с рекомендациями." },
  { step: "05", title: "Итоги", text: "Краткое письменное резюме и дальнейшие рекомендации." },
];

export function Process() {
  return (
    <Section id="process" tone="surface" labelledBy="process-title" trackId="process">
      <SectionHead
        id="process-title"
        eyebrow="Процесс"
        title="Как проходит работа"
        description="Пять последовательных шагов от первого разговора до письменного резюме."
      />

      <div className="relative mt-16">
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[5px] hidden h-px bg-border lg:block"
        />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.05}>
              <li className="relative">
                <span aria-hidden="true" className="block h-[11px] w-[11px] rounded-full bg-primary" />
                <p className="mt-6 text-sm font-semibold tabular-nums text-primary">{item.step}</p>
                <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
