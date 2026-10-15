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
    title: "Задать вопрос",
    duration: "",
    result: "Короткий ответ на конкретный вопрос и понимание, нужна ли более глубокая оценка.",
    price: "Бесплатно",
    cta: "Задать вопрос",
    ctaName: "format_ask_question",
    recommended: true,
  },
  {
    title: "Экспресс-консультация",
    duration: "60 минут",
    result: "Разбор одной ситуации: проекта, предложения подрядчика или идеи AI-решения, и рекомендации по следующему шагу.",
    price: "от 25 000 ₽",
    cta: "Записаться",
    ctaName: "format_express",
  },
  {
    title: "Стратегическая консультация",
    duration: "120 минут",
    result: "Обсуждение вариантов решения, допущений по бюджету и ключевых рисков с участием руководителей.",
    price: "от 45 000 ₽",
    cta: "Записаться",
    ctaName: "format_strategic",
  },
  {
    title: "Deep Dive",
    duration: "до 5 часов",
    result: "Глубокий разбор материалов проекта с письменными выводами и перечнем вопросов для дальнейшей проверки.",
    price: "от 80 000 ₽",
    cta: "Обсудить проект",
    ctaName: "format_deep_dive",
  },
  {
    title: "Критичный разбор продукта",
    duration: "Определяется после обсуждения",
    result: "Независимый критический разбор существующего цифрового решения: сильные стороны, проблемы и рекомендации.",
    price: "от 120 000 ₽",
    cta: "Обсудить проект",
    ctaName: "format_critical_review",
  },
];
