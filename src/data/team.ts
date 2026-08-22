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
    role: "Founder & Product Advisor",
    descriptor: "Основатель Stratum Consulting",
    photo: "/experts/vasiliy-kolesnikov.jpg",
    primaryExpertise: {
      title: "Product Review для AI и цифровых решений в промышленности и энергетике",
      text: "Независимая оценка цифровых и AI-продуктов: от проверки ценности и продуктовой стратегии до оценки возможностей масштабирования в сложных корпоративных и промышленных средах.",
    },
    tags: ["Product Review", "AI & Digital Products", "Industrial & Energy"],
    bio: [
      "Василий Колесников — Product Advisor с опытом создания и развития цифровых продуктов для крупного бизнеса и промышленности.",
      "Работал с продуктами в банковской и промышленной среде, объединяя продуктовую стратегию, аналитику, AI и системный подход к сложным инженерным задачам.",
      "В настоящее время — Product Manager / Stream Lead в Сбербанке, где отвечает за развитие аналитической платформы для предпринимателей.",
      "Ранее более 10 лет работал в сфере промышленной цифровизации и геотехнического контроля в ЯМАЛ СПГ.",
      "В Stratum Consulting специализируется на независимой оценке AI и цифровых продуктов, Product Discovery и принятии стратегических продуктовых решений.",
    ],
    experience: [
      {
        org: "Сбербанк",
        role: "Product Manager / Stream Lead",
        text: "Развитие аналитической платформы для предпринимателей.",
        period: "2024 — настоящее время",
      },
      {
        org: "ЯМАЛ СПГ",
        role: "Руководитель направления / Product Owner",
        text: "Цифровизация геотехнического контроля и мониторинга критической инфраструктуры.",
        period: "2013 — 2024",
      },
    ],
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
