import vasiliyPhoto from "@/assets/experts/vasiliy-kolesnikov.png.asset.json";

export type Expert = {
  slug: string;
  name: string;
  role: string;
  descriptor: string;
  photo: string;
  primaryExpertise: {
    title: string;
    text: string;
  };
  tags: readonly string[];
  bio: readonly string[];
  experience: readonly {
    org: string;
    role: string;
    text: string;
    period: string;
  }[];
};

export const EXPERTS: readonly Expert[] = [
  {
    slug: "vasiliy-kolesnikov",
    name: "Василий Колесников",
    role: "Product Advisor",
    descriptor: "Основатель Stratum Consulting",
    photo: vasiliyPhoto.url,
    primaryExpertise: {
      title: "Product Review для AI и цифровых решений в промышленности и энергетике",
      text: "Независимая оценка цифровых и AI-продуктов: от проверки ценности и продуктовой стратегии до оценки возможностей масштабирования в сложных корпоративных и промышленных средах.",
    },
    tags: [],
    bio: [],
    experience: [],
  },
];

/** Направления, по которым практика будет расширяться новыми экспертами. */
export const UPCOMING_PRACTICES: readonly { title: string; tags: readonly string[] }[] = [
  { title: "Legal & IP", tags: ["Digital Law", "IP Protection"] },
  { title: "Enterprise Analytics", tags: ["Data Strategy", "Product Analytics"] },
];

export const ACHIEVEMENTS = [
  {
    figure: "680 000+",
    label: "активных пользователей",
    text: "Платформа для которой были разработанны продуктовые решения.",
  },
  {
    figure: "х2",
    label: "MAU продукта",
    text: "Результат нашей работы по развитию продукта, пользовательским сценариям и продуктовой аналитике.",
  },
  {
    figure: "28 человек",
    label: "кросс-функциональная продуктовая команда",
    text: "Помогли масштабировать команду, под задачи проекта, с 9 до 28 специалистов.",
  },
  {
    figure: "7 600+",
    label: "бизнесменов используют EAR",
    text: "Узкоспециализированный продукт для бизнеса, который мы вели от идеи до запуска.",
  },
  {
    figure: "100+",
    label: "единиц нового функционала выведено в production",
    text: "От исследования и проверки гипотез до реализации и запуска.",
  },
  {
    figure: "240+",
    label: "CustDev-исследований",
    text: "Систематическое проведение пользовательских исследований для проверки продуктовых гипотез.",
  },
] as const;

export const INDUSTRIAL_HIGHLIGHTS = [
  {
    figure: "10+ лет",
    label: "в промышленной цифровизации",
    text: "Опыт работы с цифровыми решениями для промышленной инфраструктуры, включая узкоспециализированные проекты в Арктике.",
  },
  {
    figure: "76%",
    label: "снижение аварийности",
    text: "Разработанные системы на основе данных и AI позволяют выявлять аварийные риски раньше традиционных методов.",
  },
  {
    figure: "Industrial AI",
    label: "цифровизация производственных объектов",
    text: "Опыт создания систем, на стыке науки и актуальных технологий.",
  },
] as const;

export const BRIDGE_POINTS = [
  "ценности для пользователя",
  "бизнес-модели",
  "продуктовой стратегии",
  "данных и аналитики",
  "технологических возможностей",
  "рисков масштабирования",
] as const;
