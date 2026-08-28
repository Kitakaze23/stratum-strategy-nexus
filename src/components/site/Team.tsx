import { Cta, Reveal, Section, SectionHead } from "./primitives";
import { ExpertPortrait } from "./ExpertPortrait";
import { EXPERTS, UPCOMING_PRACTICES } from "@/data/team";

export function Team() {
  return (
    <Section id="team" labelledBy="team-title" trackId="team">
      <SectionHead
        id="team-title"
        eyebrow="Команда"
        title="Команда экспертов"
        description="Для решения сложных задач Stratum Consulting подключает экспертов с профильным опытом — от продуктовой стратегии до права и отраслевой экспертизы."
      />

      <div className="mt-16 space-y-16">
        {EXPERTS.map((expert) => (
          <Reveal key={expert.slug}>
            <article className="grid gap-10 border-t border-border pt-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <ExpertPortrait src={expert.photo} name={expert.name} />
              </div>

              <div className="lg:col-span-8">
                <h3 className="text-2xl font-semibold md:text-[1.75rem]">{expert.name}</h3>
                <p className="mt-2 text-[0.9375rem] font-medium text-primary">{expert.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{expert.descriptor}</p>

                <div className="mt-8 border-l-2 border-primary pl-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    Ключевая специализация
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-[1.4]">
                    {expert.primaryExpertise.title}
                  </p>
                  <p className="mt-3 max-w-[640px] text-[0.9375rem] leading-[1.7] text-muted-foreground">
                    {expert.primaryExpertise.text}
                  </p>
                </div>

                <ul className="mt-8 flex flex-wrap gap-3">
                  {expert.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-surface px-4 py-2 text-[0.8125rem]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 max-w-[680px] space-y-4 text-[0.9375rem] leading-[1.75] text-muted-foreground">
                  {expert.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Опыт</p>
                  <ol className="mt-6 border-l border-border pl-7">
                    {expert.experience.map((item) => (
                      <li key={item.org} className="relative pb-8 last:pb-0">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[calc(1.75rem+4.5px)] top-2 h-[9px] w-[9px] rounded-full bg-primary"
                        />
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <h4 className="text-base font-semibold">{item.org}</h4>
                          <span className="text-[0.8125rem] tabular-nums text-muted-foreground">
                            {item.period}
                          </span>
                        </div>
                        <p className="mt-1 text-[0.9375rem] text-foreground/80">{item.role}</p>
                        <p className="mt-1 max-w-[560px] text-[0.9375rem] leading-[1.7] text-muted-foreground">
                          {item.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-10">
                  <Cta asChild>
                    <a href="#contact">Обсудить задачу</a>
                  </Cta>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.05} className="mt-16">
        <div className="border-t border-border pt-12">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Практика расширяется
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {UPCOMING_PRACTICES.map((practice) => (
              <div
                key={practice.title}
                className="rounded-[14px] border border-dashed border-border p-8"
              >
                <p className="text-base font-semibold">{practice.title}</p>
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">
                  {practice.tags.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
