import { Reveal, Section, SectionHead } from "./primitives";
import { ACHIEVEMENTS, INDUSTRIAL_HIGHLIGHTS } from "@/data/team";

export function Achievements() {
  return (
    <Section id="achievements" tone="surface" labelledBy="achievements-title" trackId="achievements">
      <SectionHead
        id="achievements-title"
        eyebrow="Масштаб"
        title="Проекты, где цена ошибки измеряется не часами разработки, а миллионами и миллиардами рублей"
        description="Мы работали с продуктами, у которых сотни тысяч пользователей, и с промышленными системами, где неверное решение стоит дороже всей разработки. Ниже — только те показатели, которые подтверждены данными проектов."
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

      <Reveal delay={0.05} className="mt-14">
        <div className="rounded-[14px] border border-dashed border-border bg-background p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Экономический эффект
          </p>
          <p className="mt-4 max-w-[720px] text-[1.0625rem] leading-[1.75] text-foreground/85">
            Денежный эффект продуктовых решений (ЧОД, выручка, предотвращённые потери) не
            публикуется: соответствующие данные закрыты условиями проектов. Готовы обсудить
            релевантный опыт в деталях на консультации.
          </p>
        </div>
      </Reveal>

      <div className="mt-24 border-t border-border pt-16">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="eyebrow">LNG · нефтегаз · промышленность</p>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.15] md:text-[2.25rem]">
              Опыт сложных промышленных систем
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="max-w-[620px] text-[1.0625rem] leading-[1.75] text-muted-foreground">
              Мы понимаем не только цифровые продукты и стартапы, но и среду, где решения имеют
              значительные финансовые и операционные последствия: длинный жизненный цикл, высокая
              стоимость ошибки, множество взаимосвязанных факторов.
            </p>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {INDUSTRIAL_HIGHLIGHTS.map((item) => (
                <li
                  key={item.figure}
                  className="grid gap-2 py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
                >
                  <p className="text-xl font-semibold leading-none tracking-tight text-primary">
                    {item.figure}
                  </p>
                  <div>
                    <p className="text-base font-semibold leading-[1.4]">{item.label}</p>
                    <p className="mt-2 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
