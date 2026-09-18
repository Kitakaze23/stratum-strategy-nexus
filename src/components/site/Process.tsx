import { Reveal, Section, SectionHead } from "./primitives";

const STEPS = [
  { step: "01", title: "Знакомство", meta: "15–20 минут", text: "Уточняем ситуацию, участников и решение, которое предстоит принять." },
  { step: "02", title: "Формулирование задачи", text: "Определяем, что именно необходимо проверить и какой результат нужен для принятия решения." },
  { step: "03", title: "Анализ", text: "Изучаем предоставленные материалы, цифровое решение, данные и контекст." },
  { step: "04", title: "Независимая оценка", text: "Проверяем ключевые гипотезы, решения, ограничения и риски." },
  { step: "05", title: "Результат", text: "Передаём структурированное заключение и обсуждаем следующие шаги." },
];

export function Process() {
  return (
    <Section id="process" tone="surface" labelledBy="process-title" trackId="process">
      <SectionHead
        id="process-title"
        eyebrow="Процесс"
        title="Как проходит работа"
        description="От постановки задачи до независимого заключения."
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
                {"meta" in item ? <p className="mt-1 text-sm font-medium text-primary">{item.meta}</p> : null}
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
