export interface PricingFormat {
  title: string;
  duration: string;
  listLabel: string;
  items: string[];
  price: string;
  cta: string;
  recommended?: boolean;
  /** Free entry point — opens the lightweight question form instead of the contact section. */
  entry?: boolean;
}

export const PRICING_NOTE =
  "Если вы не уверены, какой формат подойдет именно вам, оставьте заявку. Мы обсудим задачу и подберем наиболее подходящий формат консультации.";

export const PRICING_FORMATS: PricingFormat[] = [
  {
    title: "Задать вопрос",
    duration: "Один конкретный вопрос по вашему продукту или ситуации.",
    listLabel: "Как это работает",
    items: [
      "вы описываете ситуацию или вопрос",
      "мы даём предварительное мнение",
      "подскажем, стоит ли разбирать задачу глубже",
    ],
    price: "Бесплатно",
    cta: "Задать вопрос →",
    entry: true,
  },
  {
    title: "Экспресс-консультация",
    duration: "30 минут",
    listLabel: "Подходит для",
    items: ["одного вопроса", "проверки гипотезы", "второго мнения"],
    price: "от 25 000 ₽",
    cta: "Обсудить задачу",
  },

  {
    title: "Стратегическая консультация",
    duration: "60 минут",
    listLabel: "Подходит для",
    items: ["Product Discovery", "аналитики", "стратегии развития продукта"],
    price: "от 45 000 ₽",
    cta: "Проверить стратегию",
    recommended: true,
  },
  {
    title: "Deep Dive",
    duration: "2 часа",
    listLabel: "Подходит для",
    items: ["сложных продуктов", "анализа нескольких сценариев", "подготовки рекомендаций"],
    price: "от 80 000 ₽",
    cta: "Разобрать продукт",
  },
  {
    title: "Критичный разбор продукта",
    duration: "Индивидуальный формат",
    listLabel: "Включает",
    items: ["анализ материалов", "консультацию", "письменные рекомендации"],
    price: "от 120 000 ₽",
    cta: "Оценить продукт",
  },
];
