import { Reveal, Section, SectionHead } from "./primitives";

const CARDS = [
  {
    title: "Продукт перестал расти",
    text: "Метрики перестали улучшаться, новые функции не дают ожидаемого эффекта, команда теряет уверенность в дальнейших шагах.",
  },
  {
    title: "Нет понимания потребностей пользователей",
    text: "Продукт развивается на основе внутренних предположений вместо подтверждённых пользовательских данных.",
  },
  {
    title: "Необходим независимый взгляд",
    text: "Команде нужен внешний эксперт, способный объективно оценить стратегию, процессы и качество принимаемых решений.",
  },
  {
    title: "Запуск нового продукта",
    text: "Важно проверить гипотезы, определить ценность продукта и избежать дорогостоящих ошибок на раннем этапе.",
  },
  {
    title: "Не удаётся использовать данные",
    text: "Компания собирает большой объём аналитики, но не превращает её в управленческие решения.",
  },
  {
    title: "Планируется внедрение AI",
    text: "Необходимо определить реальные бизнес-задачи, в которых искусственный интеллект способен создать ценность.",
  },
];

export function Challenges() {
  return (
    <Section id="challenges" tone="surface" labelledBy="challenges-title" trackId="business_challenges">
      <SectionHead
        id="challenges-title"
        eyebrow="Задачи"
        title="Задачи, с которыми к нам приходят"
        description="Компании редко обращаются за консультацией тогда, когда всё работает идеально. Обычно необходимость возникает в момент принятия важных продуктовых решений."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.05}>
            <article className="h-full rounded-[14px] border border-border bg-card p-8 shadow-card">
              <span aria-hidden="true" className="block h-px w-10 bg-primary" />
              <h3 className="mt-6 text-lg font-semibold">{card.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{card.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
