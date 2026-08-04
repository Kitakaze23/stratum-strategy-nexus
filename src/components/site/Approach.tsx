import approachImage from "@/assets/approach-room.jpg";

import { Reveal, Section, SectionHead } from "./primitives";

const STEPS = [
  {
    step: "01",
    title: "Контекст",
    text: "Разбираем бизнес-ситуацию, ограничения и уже принятые решения. Без этого любая рекомендация умозрительна.",
  },
  {
    step: "02",
    title: "Диагностика",
    text: "Оцениваем продукт, данные, процессы и организационную модель по структурированным критериям.",
  },
  {
    step: "03",
    title: "Варианты",
    text: "Формулируем несколько сценариев с последствиями, стоимостью и рисками каждого из них.",
  },
  {
    step: "04",
    title: "Решение",
    text: "Фиксируем выбор, критерии успеха и порядок проверки результата в измеримых показателях.",
  },
];

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHead
            id="approach-title"
            eyebrow="Подход"
            title="Структурная работа вместо мнений"
            description="Мы придерживаемся одной последовательности независимо от отрасли и масштаба организации."
          />
          <ol className="mt-14 space-y-10">
            {STEPS.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05}>
                <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-t border-border pt-8">
                  <span className="text-sm font-semibold tabular-nums text-primary">{item.step}</span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6">
          <img
            src={approachImage}
            width={1200}
            height={912}
            loading="lazy"
            alt="Переговорная комната делового центра"
            className="h-full min-h-[320px] w-full rounded-[14px] border border-border object-cover"
          />
        </Reveal>
      </div>
    </Section>
  );
}
