import { Check } from "lucide-react";

import { trackCtaClick, trackEvent } from "@/analytics/events";

import { Cta, Reveal, Section, SectionHead } from "./primitives";

const SITUATIONS = [
  {
    eyebrow: "До разработки",
    title: "Нужно ли это вообще разрабатывать?",
    text: "Помогаем оценить идею и понять, какое цифровое решение действительно имеет смысл создавать до начала существенных затрат на разработку.",
    checks: [
      "проблему и целевую аудиторию",
      "ценность предполагаемого решения",
      "существующие альтернативы",
      "ключевые продуктовые гипотезы",
      "состав первой версии",
      "основные риски",
    ],
    result: "Независимая оценка + конкретные рекомендации по следующим шагам.",
    cta: "Обсудить задачу",
    ctaName: "digital_review_predev",
    event: "digital_review_predev_click",
  },
  {
    eyebrow: "В процессе разработки",
    title: "Подрядчик говорит, что всё готово. Так ли это?",
    text: "Независимо оцениваем результат разработки перед запуском, следующим этапом работ или новым платежом.",
    checks: [
      "соответствие исходной задаче",
      "реализованные сценарии",
      "ключевой функционал",
      "очевидные продуктовые и технологические риски",
      "готовность решения к следующему этапу",
    ],
    result: "Independent Review — независимая оценка результата разработки и перечень необходимых действий.",
    cta: "Проверить разработку",
    ctaName: "digital_review_vendor",
    event: "digital_review_vendor_click",
  },
  {
    eyebrow: "Перед инвестициями",
    title: "Что на самом деле представляет собой цифровой проект?",
    text: "Помогаем инвестору или потенциальному покупателю независимо оценить цифровое решение до принятия инвестиционного решения.",
    checks: [
      "заявленную ценность",
      "текущее состояние разработки",
      "реализованное решение",
      "технологические и продуктовые риски",
      "roadmap",
      "потребность в дальнейших инвестициях",
      "ключевые вопросы, требующие подтверждения",
    ],
    result: "Digital Due Diligence — независимая оценка цифрового проекта и ключевых рисков.",
    cta: "Обсудить проект",
    ctaName: "digital_due_diligence",
    event: "digital_due_diligence_click",
  },
] as const;

const DECISION_OUTPUTS = [
  { title: "Факты", text: "Что удалось подтвердить, а что требует дополнительной проверки." },
  { title: "Риски", text: "Что может повлиять на стоимость, сроки, запуск или дальнейшие инвестиции." },
  { title: "Следующие шаги", text: "Что имеет смысл делать дальше, что изменить и какие действия пока не стоит предпринимать." },
] as const;

export function Services() {
  return (
    <Section id="services" tone="surface" labelledBy="services-title" trackId="services">
      <SectionHead
        id="services-title"
        eyebrow="Как помогаем"
        title="В каких ситуациях мы полезны"
        description="Независимая оценка нужна в момент, когда предстоит принять решение о деньгах, разработке или запуске цифрового решения."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {SITUATIONS.map((situation, index) => (
          <Reveal key={situation.eyebrow} delay={index * 0.05} className="h-full">
            <article className="flex h-full flex-col rounded-[14px] border border-border bg-card p-8 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{situation.eyebrow}</p>
              <h3 className="mt-5 text-xl font-semibold leading-[1.3]">{situation.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.7] text-muted-foreground">{situation.text}</p>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Что проверяем</p>
              <ul className="mt-4 space-y-3 text-[0.9375rem] leading-[1.55] text-muted-foreground">
                {situation.checks.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6 lg:mt-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Результат</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.65]">{situation.result}</p>
                <Cta asChild variant={index === 1 ? "primary" : "secondary"} className="mt-7 w-full px-4">
                  <a
                    href="#contact"
                    onClick={() => {
                      trackCtaClick(situation.ctaName, "services");
                      trackEvent(situation.event, { location: "services" });
                    }}
                  >
                    {situation.cta}
                  </a>
                </Cta>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 border-t border-border pt-16">
        <Reveal className="measure">
          <h3 className="text-2xl font-semibold leading-[1.25] md:text-[2rem]">
            Не ещё одна консультация. Конкретный результат для принятия решения.
          </h3>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            Мы не ограничиваемся обсуждением проблемы. Каждый проект заканчивается структурированным результатом, который можно использовать при принятии следующего решения.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {DECISION_OUTPUTS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="border-l-2 border-primary pl-6">
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
