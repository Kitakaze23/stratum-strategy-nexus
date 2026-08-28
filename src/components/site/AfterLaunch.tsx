import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { trackFunnelClick, trackServiceClick } from "@/analytics/events";

import { Cta, Reveal, Section, SectionHead } from "./primitives";

const PROBLEMS = [
  {
    title: "Есть MVP, но нет роста",
    text: "Пользователи регистрируются, но не возвращаются. Нужно понять причины и определить дальнейшие шаги.",
  },
  {
    title: "Неясно, нужен ли продукт рынку",
    text: "Поможем оценить ценностное предложение, позиционирование и признаки Product-Market Fit — простыми словами: нужен ли продукт кому-то, кроме основателя.",
  },
  {
    title: "Неясно, что развивать дальше",
    text: "Определяем наиболее важные направления развития продукта и помогаем расставить приоритеты.",
  },
  {
    title: "Нужен независимый взгляд",
    text: "Объективно разбираем продукт и формируем практические рекомендации без вовлечения в разработку.",
  },
];

export function AfterLaunch() {
  const trackFlagship = () => {
    trackServiceClick("ai_product_review", "flagship");
    trackFunnelClick("ai_product_review", "flagship");
    trackFunnelClick("product_review", "flagship");
  };

  return (
    <Section id="after-launch" labelledBy="after-launch-title" trackId="product_review">
      <SectionHead
        id="after-launch-title"
        eyebrow="Product Review"
        title="Когда стоит привлекать независимого Product Advisor"
        description="Разработка MVP сегодня занимает недели. Сложности начинаются после запуска: появляются первые пользователи, а вместе с ними — вопросы о ценности продукта, удержании и дальнейшем развитии."
      />

      <div className="mt-16 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Flagship card — first on mobile, right column on desktop */}
        <Reveal className="order-1 lg:order-2 lg:col-span-7">
          <article className="rounded-[14px] bg-navy p-8 text-navy-foreground md:p-12">
            <p className="eyebrow text-navy-foreground/70">Флагманская услуга</p>
            <h3 className="mt-5 text-[1.75rem] font-semibold leading-[1.15] md:text-[2.25rem]">
              Product Review для AI-продуктов
            </h3>
            <p className="mt-6 text-lg leading-[1.6] text-navy-foreground/90">
              Построить приложение стало проще. Построить востребованный продукт — по-прежнему
              сложно.
            </p>
            <p className="mt-6 max-w-[560px] text-[1.0625rem] leading-[1.75] text-navy-foreground/75">
              Разбираем AI-приложения, SaaS, MVP и цифровые сервисы, чтобы понять, что мешает
              продукту расти, что стоит изменить и куда двигаться дальше.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Cta asChild>
                <Link to="/services/ai-product-review" onClick={trackFlagship}>
                  Разобрать продукт
                </Link>
              </Cta>
              <Link
                to="/services/ai-product-review"
                onClick={trackFlagship}
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-navy-foreground/80 hover:text-navy-foreground"
              >
                Подробнее об услуге
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        </Reveal>

        <div className="order-2 divide-y divide-border border-y border-border lg:order-1 lg:col-span-5">
          {PROBLEMS.map((problem, index) => (
            <Reveal key={problem.title} delay={index * 0.04}>
              <article className="py-7">
                <h3 className="text-lg font-semibold">{problem.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                  {problem.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
