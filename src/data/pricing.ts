export interface PricingFormat {
  title: string;
  duration: string;
  listLabel: string;
  items: string[];
  price: string;
  cta: string;
  recommended?: boolean;
  /** Stable analytics identifier for cta_click — never derived from visible text. */
  ctaName: string;
  /** Free entry point — opens the lightweight question form instead of the contact section. */
  entry?: boolean;
}

export const PRICING_NOTE_PREFIX = "Не уверены, какой формат вам подходит? ";
export const PRICING_NOTE_LINK = "Оставьте заявку";
export const PRICING_NOTE_SUFFIX = " — обсудим задачу и предложим оптимальный формат.";

export const PRICING_FORMATS: PricingFormat[] = [
  {
    title: "Экспресс",
    duration: "60 минут",
    listLabel: "Подходит для",
    items: [
      "конкретного вопроса или решения",
      "ситуации, которую нужно быстро разобрать",
      "второго мнения перед действием",
    ],
    price: "от 25 000 ₽",
    cta: "Обсудить задачу",
    ctaName: "discuss_task",
  },
  {
    title: "Стратегическая",
    duration: "120 минут",
    listLabel: "Подходит для",
    items: [
      "комплексной оценки проблемы",
      "разбора вариантов решения",
      "плана дальнейших действий",
    ],
    price: "от 45 000 ₽",
    cta: "Проверить стратегию",
    ctaName: "strategy_review",
    recommended: true,
  },
  {
    title: "Deep Dive",
    duration: "до 5 часов",
    listLabel: "Подходит для",
    items: [
      "глубокого разбора продукта",
      "оценки стратегии и рынка",
      "сложной продуктовой задачи",
    ],
    price: "от 80 000 ₽",
    cta: "Разобрать продукт",
    ctaName: "product_review",
  },
  {
    title: "Критичный разбор продукта",
    duration: "Бесплатно",
    listLabel: "Как это работает",
    items: [
      "вы описываете ситуацию или вопрос",
      "мы даём предварительное мнение",
      "подскажем, стоит ли разбирать задачу глубже",
    ],
    price: "Бесплатно",
    cta: "Задать вопрос →",
    ctaName: "ask_question",
    entry: true,
  },
];
