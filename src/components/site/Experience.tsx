import { Reveal, Section, SectionHead } from "./primitives";

const ITEMS = [
  {
    title: "Digital Products",
    text: "Участие в развитии цифровых продуктов и аналитических сервисов для бизнеса.",
  },
  {
    title: "Enterprise Analytics",
    text: "Разработка инструментов аналитики и поддержки управленческих решений.",
  },
  {
    title: "Industrial Digitalization",
    text: "Опыт цифровой трансформации и реализации инженерных проектов.",
  },
  {
    title: "Artificial Intelligence",
    text: "Разработка концепций применения AI для бизнеса и промышленности.",
  },
  {
    title: "Innovation",
    text: "Работа над новыми цифровыми продуктами и исследованиями пользовательских потребностей.",
  },
];

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHead
        id="experience-title"
        eyebrow="Опыт"
        title="Практический опыт"
        description="Направления, в которых накоплен прикладной опыт работы с продуктами, данными и цифровыми программами."
      />

      <ol className="mt-16 border-l border-border pl-8 md:pl-12">
        {ITEMS.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <li className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(2rem+4.5px)] top-2 h-[9px] w-[9px] rounded-full bg-primary md:-left-[calc(3rem+4.5px)]"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 max-w-[620px] text-[0.9375rem] leading-[1.7] text-muted-foreground">
                {item.text}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
