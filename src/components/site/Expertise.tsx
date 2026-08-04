import { Reveal, Section, SectionHead } from "./primitives";

const INDUSTRIES = [
  "Банки и финансовые организации",
  "Промышленные компании",
  "Технологические компании",
  "Ритейл и электронная коммерция",
  "Телеком и сервисные платформы",
  "Государственные цифровые сервисы",
];

const PRINCIPLES = [
  {
    title: "Независимость",
    text: "Мы не продаём разработку и не связаны с поставщиками решений. Рекомендация не зависит от последующего контракта.",
  },
  {
    title: "Объективность",
    text: "Выводы опираются на данные, интервью и проверяемые допущения, а не на отраслевые тренды.",
  },
  {
    title: "Практичность",
    text: "Результат — решения, которые можно принять на следующей неделе, а не стратегический документ на полку.",
  },
];

export function Expertise() {
  return (
    <Section id="expertise" tone="navy" labelledBy="expertise-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHead
            id="expertise-title"
            eyebrow="Экспертиза"
            title="Опыт в сложных организационных контекстах"
            description="Более 15 лет работы с продуктами, аналитикой и цифровыми программами в компаниях с распределённой ответственностью и высокой ценой ошибки."
            tone="navy"
          />
          <ul className="mt-12 space-y-3 text-[0.9375rem] text-navy-foreground/75">
            {INDUSTRIES.map((item) => (
              <li key={item} className="border-t border-navy-foreground/15 pt-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:pt-4">
          <div className="space-y-6">
            {PRINCIPLES.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="rounded-[14px] border border-navy-foreground/15 bg-navy-foreground/[0.04] p-8">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-navy-foreground/75">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
