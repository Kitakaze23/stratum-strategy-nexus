import { Cta, Reveal } from "./primitives";
import { HeroFigure } from "./HeroFigure";

const TAGS = [
  "Product Discovery",
  "Enterprise Analytics",
  "Digital Transformation",
  "Artificial Intelligence",
  "Product Strategy",
  "Industrial Digitalization",
];

export function Hero() {
  return (
    <section id="top" className="border-b border-border pt-[76px]">
      <div className="container-page grid gap-16 py-24 md:py-[7.5rem] lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Независимая продуктовая экспертиза</p>
            <h1 className="mt-6 text-[2.125rem] font-semibold leading-[1.14] md:text-[3.125rem]">
              Независимая продуктовая экспертиза для компаний, создающих цифровые продукты
            </h1>
            <p className="mt-7 max-w-[600px] text-lg leading-[1.75] text-muted-foreground">
              Помогаю руководителям принимать обоснованные продуктовые решения, находить критические
              точки роста и снижать стоимость стратегических ошибок благодаря сочетанию Product
              Discovery, аналитики, AI и практического опыта работы с корпоративными цифровыми
              продуктами.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-10 flex flex-wrap gap-3">
            <Cta asChild>
              <a href="#contact">Записаться на консультацию</a>
            </Cta>
            <Cta asChild variant="secondary">
              <a href="#contact">Обсудить задачу</a>
            </Cta>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-6">
          <div className="rounded-[14px] border border-border bg-background p-6 md:p-10">
            <HeroFigure />
          </div>
        </Reveal>
      </div>

      <div className="container-page">
        <div className="border-t border-border py-12">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Направления экспертизы
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {TAGS.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-surface px-4 py-2 text-[0.8125rem] text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
