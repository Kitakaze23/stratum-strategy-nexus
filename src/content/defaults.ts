import { FAQ_ITEMS } from "@/data/faq";
import { INSIGHTS } from "@/data/insights";
import { PORTFOLIO_CASES } from "@/data/portfolio";
import {
  PRICING_FORMATS,
  PRICING_NOTE_LINK,
  PRICING_NOTE_PREFIX,
  PRICING_NOTE_SUFFIX,
} from "@/data/pricing";
import { EXPERTS, UPCOMING_PRACTICES } from "@/data/team";

/**
 * Default (built-in) content for every editable section of the site.
 * The admin panel stores overrides per section key; overrides are shallow-merged
 * over these defaults, so a missing or broken row always falls back here.
 */
const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

export const SITE_DEFAULTS = {
  hero: {
    enabled: true,
    eyebrow: "Independent Digital Advisory",
    title: "Независимая оценка цифровых решений",
    subtitle:
      "Помогаем понять, что стоит разрабатывать, проверить результат работы подрядчика или оценить цифровой проект перед инвестициями.",
    slogan: "Better Decisions. Better Products.",
    ctaPrimary: "Обсудить задачу",
    ctaSecondary: "Получить независимую оценку",
  },
  services: {
    enabled: true,
    eyebrow: "Как помогаем",
    title: "В каких ситуациях мы полезны",
    description:
      "Независимая оценка нужна в момент, когда предстоит принять решение о деньгах, разработке или запуске цифрового решения.",
    situations: [
      {
        eyebrow: "До разработки",
        title: "Нужно ли это вообще разрабатывать?",
        text: "Помогаем оценить идею и понять, какое цифровое решение действительно имеет смысл создавать до начала существенных затрат на разработку.",
        checks: [
          "проблему и целевую аудиторию",
          "ценность предполагаемого решения",
          "существующие альтернативы",
          "ключевые продуктовые гипотезы",
          "состав первой версии",
          "основные риски",
        ],
        result: "Независимая оценка + конкретные рекомендации по следующим шагам.",
        cta: "Обсудить задачу",
      },
      {
        eyebrow: "В процессе разработки",
        title: "Подрядчик говорит, что всё готово. Так ли это?",
        text: "Независимо оцениваем результат разработки перед запуском, следующим этапом работ или новым платежом.",
        checks: [
          "соответствие исходной задаче",
          "реализованные сценарии",
          "ключевой функционал",
          "очевидные продуктовые и технологические риски",
          "готовность решения к следующему этапу",
        ],
        result:
          "Independent Review — независимая оценка результата разработки и перечень необходимых действий.",
        cta: "Проверить разработку",
      },
      {
        eyebrow: "Перед инвестициями",
        title: "Что на самом деле представляет собой цифровой проект?",
        text: "Помогаем инвестору или потенциальному покупателю независимо оценить цифровое решение до принятия инвестиционного решения.",
        checks: [
          "заявленную ценность",
          "текущее состояние разработки",
          "реализованное решение",
          "технологические и продуктовые риски",
          "roadmap",
          "потребность в дальнейших инвестициях",
          "ключевые вопросы, требующие подтверждения",
        ],
        result: "Digital Due Diligence — независимая оценка цифрового проекта и ключевых рисков.",
        cta: "Обсудить проект",
      },
    ],
    outputsTitle: "Не ещё одна консультация. Конкретный результат для принятия решения.",
    outputsText:
      "Мы не ограничиваемся обсуждением проблемы. Каждый проект заканчивается структурированным результатом, который можно использовать при принятии следующего решения.",
    outputs: [
      { title: "Факты", text: "Что удалось подтвердить, а что требует дополнительной проверки." },
      { title: "Риски", text: "Что может повлиять на стоимость, сроки, запуск или дальнейшие инвестиции." },
      {
        title: "Следующие шаги",
        text: "Что имеет смысл делать дальше, что изменить и какие действия пока не стоит предпринимать.",
      },
    ],
  },
  process: {
    enabled: true,
    eyebrow: "Процесс",
    title: "Как проходит работа",
    description: "От постановки задачи до независимого заключения.",
    steps: [
      { step: "01", title: "Знакомство", meta: "15–20 минут", text: "Уточняем ситуацию, участников и решение, которое предстоит принять." },
      { step: "02", title: "Формулирование задачи", meta: "", text: "Определяем, что именно необходимо проверить и какой результат нужен для принятия решения." },
      { step: "03", title: "Анализ", meta: "", text: "Изучаем предоставленные материалы, цифровое решение, данные и контекст." },
      { step: "04", title: "Независимая оценка", meta: "", text: "Проверяем ключевые гипотезы, решения, ограничения и риски." },
      { step: "05", title: "Результат", meta: "", text: "Передаём структурированное заключение и обсуждаем следующие шаги." },
    ],
  },
  portfolio: {
    enabled: true,
    eyebrow: "Опыт",
    title: "Реальный опыт",
    description:
      "Опыт принятия продуктовых, технологических и инвестиционно значимых решений в цифровых и промышленных проектах.",
    cases: clone(PORTFOLIO_CASES) as { id: string; client: string; domain: string; challenge: string; work: string; outcome: string; metrics: { value: string; label: string }[] }[],
  },
  team: {
    enabled: true,
    eyebrow: "Команда",
    title: "Команда экспертов",
    description:
      "Для решения сложных задач Stratum Consulting подключает экспертов с профильным опытом — от оценки цифровых решений до права и отраслевой экспертизы.",
    experts: EXPERTS.map((e) => ({
      name: e.name,
      role: e.role,
      descriptor: e.descriptor,
      expertiseTitle: e.primaryExpertise.title,
      expertiseText: e.primaryExpertise.text,
      photo: e.photo,
    })),
    cta: "Обсудить задачу",
    upcomingTitle: "Практика расширяется",
    practices: clone(UPCOMING_PRACTICES) as { title: string; tags: string[] }[],
  },
  insights: {
    enabled: true,
    eyebrow: "Статьи",
    title: "Экспертные материалы",
    description:
      "Практические материалы о выборе цифрового решения, проверке разработки, оценке AI и рисках до существенных затрат.",
    articles: clone(INSIGHTS) as Article[],
  },
  pricing: {
    enabled: true,
    eyebrow: "Форматы",
    title: "Форматы оценки",
    description:
      "Стоимость указана от базового объёма и зависит от сложности проекта и состава материалов.",
    formats: PRICING_FORMATS.map((f) => ({
      title: f.title,
      duration: f.duration,
      result: f.result,
      price: f.price,
      cta: f.cta,
      recommended: !!f.recommended,
    })),
    recommendedBadge: "Частая задача",
    notePrefix: PRICING_NOTE_PREFIX,
    noteLink: PRICING_NOTE_LINK,
    noteSuffix: PRICING_NOTE_SUFFIX,
  },
  faq: {
    enabled: true,
    eyebrow: "Вопросы",
    title: "Частые вопросы",
    description: "Если нужного вопроса нет в списке, его можно задать в форме ниже.",
    items: clone(FAQ_ITEMS),
  },
  contact: {
    enabled: true,
    eyebrow: "Контакты",
    title: "Обсудим задачу",
    description:
      "Опишите цифровое решение, разработку или проект, который необходимо оценить. Мы уточним задачу и предложим подходящий формат работы.",
    cta: "Обсудить задачу",
    note: "Ответ в течение одного рабочего дня.",
    successTitle: "Заявка отправлена",
    successText:
      "Спасибо за обращение. Мы свяжемся с вами в течение одного рабочего дня, чтобы уточнить детали и предложить подходящий формат работы.",
  },
};

export type ArticleBlock = { type: "h2" | "p" | "list"; text?: string; items?: string[] };
export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readingTime: string;
  blocks: ArticleBlock[];
};

export type SiteContent = typeof SITE_DEFAULTS;
export type SectionKey = keyof SiteContent;

export const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Первый экран",
  services: "Как помогаем",
  process: "Как проходит работа",
  portfolio: "Опыт (кейсы)",
  team: "Команда",
  insights: "Статьи",
  pricing: "Форматы и цены",
  faq: "Частые вопросы",
  contact: "Контакты и форма",
};

export const SECTION_ORDER = Object.keys(SECTION_LABELS) as SectionKey[];

export function mergeContent(rows: Record<string, unknown> | undefined): SiteContent {
  const out = clone(SITE_DEFAULTS);
  if (!rows) return out;
  for (const key of SECTION_ORDER) {
    const override = rows[key];
    if (override && typeof override === "object" && !Array.isArray(override)) {
      (out as Record<string, unknown>)[key] = { ...out[key], ...(override as object) };
    }
  }
  return out;
}
