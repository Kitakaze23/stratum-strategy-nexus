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
