import { Reveal, Section, SectionHead } from "./primitives";
import { ACHIEVEMENTS, BRIDGE_POINTS, INDUSTRIAL_HIGHLIGHTS } from "@/data/team";

export function Achievements() {
  return (
    <Section id="achievements" tone="surface" labelledBy="achievements-title">
      <SectionHead
        id="achievements-title"
        eyebrow="Практика"
        title="Практический опыт в цифрах"
        description="Не только консультируем — создавали и развивали продукты, которыми пользуются реальные компании."
      />

      <div className="mt-16 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((item, index) => (
          <Reveal key={item.figure + item.label} delay={index * 0.04}>
            <article className="h-full border-b border-border px-0 py-10 md:px-8 md:[&:nth-child(odd)]:pl-0 lg:px-10 lg:first:pl-0">
              <p className="text-[2.5rem] font-semibold leading-none tracking-tight text-primary md:text-[3rem]">
                {item.figure}
              </p>
              <p className="mt-5 text-base font-semibold leading-[1.4]">{item.label}</p>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-24">
        <SectionHead
          eyebrow="Промышленность и энергетика"
          title="Опыт сложных промышленных систем"
          description="Продуктовые решения в промышленности требуют другого уровня ответственности: длинного жизненного цикла, высокой стоимости ошибки и большого количества взаимосвязанных факторов."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {INDUSTRIAL_HIGHLIGHTS.map((item, index) => (
            <Reveal key={item.figure} delay={index * 0.05}>
              <article className="h-full rounded-[14px] border border-border bg-background p-8 md:p-10">
                <p className="text-[2rem] font-semibold leading-none tracking-tight text-primary md:text-[2.25rem]">
                  {item.figure}
                </p>
                <p className="mt-5 text-base font-semibold leading-[1.4]">{item.label}</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 border-t border-border pt-16">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold leading-[1.15] md:text-[2.25rem]">
              Почему этот опыт важен для Stratum
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-4 text-[1.0625rem] leading-[1.75] text-muted-foreground">
              <p>
                Мы понимаем цифровые продукты не только со стороны интерфейса или технологии.
              </p>
              <p>
                Опыт Stratum объединяет продуктовый подход, аналитику, AI и работу со сложными
                промышленными и корпоративными системами.
              </p>
              <p>Это позволяет оценивать продукт одновременно с точки зрения:</p>
            </div>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {BRIDGE_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[0.9375rem] leading-[1.6] text-foreground/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55rem] h-[7px] w-[7px] shrink-0 rounded-full bg-primary"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-[620px] text-[0.9375rem] leading-[1.75] text-foreground/85">
              Better Decisions. Better Products. Опыт создания продуктов позволяет нам оценивать
              решения не только как консультантам, но и как практикам.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
