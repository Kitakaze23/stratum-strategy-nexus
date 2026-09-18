export interface PricingFormat {
  title: string;
  duration: string;
  result: string;
  price: string;
  cta: string;
  recommended?: boolean;
  /** Stable analytics identifier for cta_click — never derived from visible text. */
  ctaName: string;
}

export const PRICING_NOTE_PREFIX = "Если вы не уверены, какой формат подходит для вашей ситуации, ";
export const PRICING_NOTE_LINK = "оставьте заявку";
export const PRICING_NOTE_SUFFIX = ". Мы обсудим задачу и определим объём необходимой оценки.";

export const PRICING_FORMATS: PricingFormat[] = [
  {
    title: "Оценка до разработки",
    duration: "5–7 рабочих дней",
    result: "Структурированная оценка идеи, ключевых гипотез, рисков и следующих шагов.",
    price: "от 60 000 ₽",
    cta: "Обсудить задачу",
    ctaName: "digital_review_predev",
  },
  {
    title: "Независимая оценка разработки",
    duration: "5–10 рабочих дней",
    result: "Оценка соответствия решения исходной задаче, выявленные проблемы и рекомендации перед запуском или следующим этапом работ.",
    price: "от 100 000 ₽",
    cta: "Проверить разработку",
    ctaName: "digital_review_vendor",
    recommended: true,
  },
  {
    title: "Digital Due Diligence",
    duration: "10–15 рабочих дней",
    result: "Независимая оценка цифрового проекта, подтверждённых фактов, неопределённостей и ключевых рисков перед инвестиционным решением.",
    price: "от 200 000 ₽",
    cta: "Обсудить проект",
    ctaName: "digital_due_diligence",
  },
];
