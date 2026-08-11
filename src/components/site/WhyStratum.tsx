import { Reveal, Section, SectionHead } from "./primitives";

const BLOCKS = [
  {
    title: "Независимый взгляд",
    text: "Независимый взгляд без влияния внутренних процессов компании.",
  },
  {
    title: "Бизнес и технологии",
    text: "Опыт работы на стыке бизнеса, аналитики, цифровых продуктов и инженерных проектов.",
  },
  {
    title: "Практический опыт",
    text: "Практический опыт развития корпоративных цифровых продуктов и аналитических платформ.",
  },
  {
    title: "Фокус на решении",
    text: "Главная цель работы — помочь принять правильное управленческое решение.",
  },
  {
    title: "Multidisciplinary Expertise",
    text: "Сложные продукты требуют оценки с разных сторон. Мы объединяем продуктовую, аналитическую и юридическую экспертизу для более полного понимания рисков и возможностей.",
  },
  {
    title: "Практика вместо теории",
    text: "Мы работаем с задачами, которые сами проходили на практике: развитие цифровых продуктов, работа с большими пользовательскими базами, продуктовая аналитика, AI и цифровизация сложных промышленных систем.",
  },


];

export function WhyStratum() {
  return (
    <Section id="why" tone="navy" labelledBy="why-title">
      <SectionHead
        id="why-title"
        eyebrow="Почему Stratum"
        title="Почему компании обращаются в Stratum Consulting"
        tone="navy"
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {BLOCKS.map((block, index) => (
          <Reveal key={block.title} delay={index * 0.05}>
            <article className="h-full rounded-[14px] border border-navy-foreground/15 bg-navy-foreground/[0.04] p-8 md:p-10">
              <h3 className="text-xl font-semibold">{block.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.75] text-navy-foreground/75">{block.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
