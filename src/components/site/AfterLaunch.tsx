import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Reveal, Section, SectionHead } from "./primitives";

const CARDS = [
  {
    title: "Есть MVP, но нет роста",
    text: "Пользователи регистрируются, но не возвращаются. Необходимо понять причины и определить дальнейшие шаги.",
  },
  {
    title: "Неясно, нужен ли продукт рынку",
    text: "Помогаем оценить ценностное предложение, позиционирование и признаки Product-Market Fit.",
  },
  {
    title: "Неясно, что развивать дальше",
    text: "Определяем наиболее важные направления развития продукта и помогаем расставить приоритеты.",
  },
  {
    title: "Нужен независимый взгляд",
    text: "Проводим объективный Product Review и формируем практические рекомендации без вовлечения в разработку.",
  },
];

export function AfterLaunch() {
  return (
    <Section id="after-launch" labelledBy="after-launch-title" trackId="product_review">
      <SectionHead
        id="after-launch-title"
        eyebrow="После запуска"
        title="Создали продукт. Что дальше?"
        description="Сегодня разработка MVP занимает недели или даже дни. Настоящие сложности начинаются после запуска: появляются первые пользователи, возникают вопросы о ценности продукта, удержании аудитории и дальнейшем развитии."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
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

      <Reveal delay={0.08} className="mt-12">
        <Link
          to="/services/ai-product-review"
          className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-primary"
        >
          Product Review для AI-продуктов
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
