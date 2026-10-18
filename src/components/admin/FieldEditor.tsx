import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";

const LABELS: Record<string, string> = {
  enabled: "Показывать раздел",
  eyebrow: "Надзаголовок",
  title: "Заголовок",
  subtitle: "Подзаголовок",
  description: "Описание",
  slogan: "Слоган",
  ctaPrimary: "Основная кнопка",
  ctaSecondary: "Вторая кнопка",
  cta: "Текст кнопки",
  situations: "Карточки ситуаций",
  text: "Текст",
  checks: "Состав работ",
  directions: "Короткие направления",
  stagesNote: "Пояснение об этапах",
  tzTitle: "Блок ТЗ: заголовок",
  tzItems: "Блок ТЗ: пункты",
  tzDisclaimer: "Блок ТЗ: оговорка",
  result: "Результат",
  outputsTitle: "Заголовок блока результата",
  outputsText: "Текст блока результата",
  outputs: "Пункты результата",
  steps: "Шаги",
  step: "Номер",
  meta: "Пометка (например, длительность)",
  cases: "Кейсы",
  client: "Клиент",
  domain: "Название",
  challenge: "Задача",
  work: "Что сделали",
  outcome: "Результат",
  metrics: "Цифры",
  value: "Значение",
  label: "Подпись",
  experts: "Эксперты",
  name: "Имя",
  role: "Должность",
  descriptor: "Подпись под должностью",
  expertiseTitle: "Ключевая специализация",
  expertiseText: "Описание специализации",
  upcomingTitle: "Заголовок блока «Практика расширяется»",
  practices: "Будущие направления",
  tags: "Метки",
  articles: "Статьи",
  slug: "Адрес статьи (латиницей, через дефис)",
  metaTitle: "Заголовок для поисковиков",
  metaDescription: "Описание для поисковиков",
  excerpt: "Анонс",
  readingTime: "Надпись над заголовком",
  blocks: "Содержание статьи",
  type: "Тип блока",
  items: "Пункты",
  formats: "Форматы",
  duration: "Срок",
  price: "Стоимость",
  recommended: "Выделить карточку",
  recommendedBadge: "Метка выделенной карточки",
  notePrefix: "Примечание — начало",
  noteLink: "Примечание — текст ссылки на форму",
  noteSuffix: "Примечание — окончание",
  q: "Вопрос",
  a: "Ответ",
  note: "Подпись у кнопки",
  successTitle: "Заголовок после отправки",
  successText: "Текст после отправки",
  heroNote: "Уточнение под первым экраном",
  mainEyebrow: "Главная услуга: надзаголовок",
  mainTitle: "Главная услуга: заголовок",
  mainEnglish: "Главная услуга: английское название",
  mainText: "Главная услуга: описание",
  mainSteps: "Главная услуга: этапы",
  mainOutcomesTitle: "Главная услуга: заголовок «Что получает клиент»",
  mainOutcomes: "Главная услуга: что получает клиент",
  mainResult: "Главная услуга: результат",
  mainCta: "Главная услуга: кнопка",
  audienceTitle: "Заголовок «Для кого»",
  audience: "Для кого",
  whenTitle: "Заголовок «Когда обращаться»",
  when: "Когда обращаться",
  aiEyebrow: "Блок AI: надзаголовок",
  aiTitle: "Блок AI: заголовок",
  aiText: "Блок AI: текст",
  aiAreas: "Блок AI: направления",
  otherEyebrow: "Другие услуги: надзаголовок",
  otherTitle: "Другие услуги: заголовок",
  otherServices: "Другие услуги",
  link: "Ссылка на страницу услуги",
  questionsTitle: "Заголовок блока с вопросами",
  questions: "Вопросы",
  tag: "Подходящая услуга",
  number: "Номер",
  english: "Английское название",
  lead: "Краткое описание",
  doTitle: "Заголовок «Что делает Stratum»",
  actions: "Что делает Stratum",
  resultTitle: "Заголовок «Результат»",
  areas: "Направления",
  subtitleRu: "Подпись",
  aiItems: "Блок AI: пункты",
  aiLink: "Блок AI: ссылка",
  aiCta: "Блок AI: текст ссылки",
  domains: "Направления опыта",
  industriesTitle: "Заголовок списка отраслей",
  industries: "Отрасли",
  footnote: "Примечание",
  pricingNote: "Примечание о стоимости",
  bio: "Абзацы о себе",
  teamTitle: "Команда: заголовок",
  teamText: "Команда: текст",
  specializations: "Специализации команды",
  results: "Результаты в цифрах",
  experienceTitle: "Опыт работы: заголовок",
  experience: "Опыт работы: компании",
  company: "Компания",
  period: "Период",
  linkLabel: "Текст ссылки на страницу услуги",
  stepsTitle: "Заголовок блока «Что будет после заявки»",
  offersTitle: "Полоса услуг: заголовок",
  offers: "Полоса услуг",
};

const HIDDEN = new Set(["photo", "id", "enabled", "ctaName"]);
const LONG = new Set(["pricingNote", "teamText", "bio", "when", "lead", "footnote", "heroNote", "description", "subtitle", "result", "challenge", "work", "outcome", "expertiseText", "excerpt", "metaDescription", "a", "successText", "outputsText"]);

type Json = unknown;

function blank(v: Json): Json {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") {
    const o: Record<string, Json> = {};
    for (const [k, val] of Object.entries(v)) o[k] = k === "type" ? val : blank(val);
    return o;
  }
  return "";
}

const inputCls =
  "w-full rounded-[8px] border border-input bg-background px-3 py-2 text-sm focus:border-primary";

export function FieldEditor({
  name,
  value,
  template,
  onChange,
}: {
  name: string;
  value: Json;
  template?: Json;
  onChange: (v: Json) => void;
}) {
  const label = LABELS[name] ?? name;

  if (name === "type" && typeof value === "string") {
    return (
      <label className="block">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <select className={`${inputCls} mt-1`} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="h2">Подзаголовок</option>
          <option value="p">Абзац</option>
          <option value="list">Список</option>
        </select>
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 text-sm">
        <Switch checked={value} onCheckedChange={onChange} />
        {label}
      </label>
    );
  }

  if (typeof value === "string" || typeof value === "number") {
    const str = String(value);
    const long = LONG.has(name) || str.length > 90;
    return (
      <label className="block">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {long ? (
          <textarea className={`${inputCls} mt-1 leading-[1.6]`} rows={Math.min(8, Math.max(3, Math.ceil(str.length / 90)))} value={str} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input className={`${inputCls} mt-1`} value={str} onChange={(e) => onChange(e.target.value)} />
        )}
      </label>
    );
  }

  if (Array.isArray(value)) {
    const tpl = value[0] ?? (Array.isArray(template) ? template[0] : undefined) ?? "";
    const move = (i: number, d: number) => {
      const next = [...value];
      const j = i + d;
      if (j < 0 || j >= next.length) return;
      [next[i], next[j]] = [next[j], next[i]];
      onChange(next);
    };
    return (
      <fieldset className="rounded-[10px] border border-border p-4">
        <legend className="px-1 text-sm font-semibold">{label}</legend>
        <div className="space-y-3">
          {value.map((item, i) => (
            <div key={i} className="flex gap-2 rounded-[8px] bg-surface p-3">
              <div className="min-w-0 flex-1">
                <FieldEditor
                  name={typeof item === "object" ? "" : name}
                  value={item}
                  template={tpl}
                  onChange={(v) => onChange(value.map((x, k) => (k === i ? v : x)))}
                />
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <IconBtn label="Выше" onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></IconBtn>
                <IconBtn label="Ниже" onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></IconBtn>
                <IconBtn label="Удалить" onClick={() => onChange(value.filter((_, k) => k !== i))}><Trash2 className="h-4 w-4 text-destructive" /></IconBtn>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...value, blank(tpl)])}
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          <Plus className="h-4 w-4" /> Добавить
        </button>
      </fieldset>
    );
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, Json>;
    const tplObj = (template && typeof template === "object" ? template : {}) as Record<string, Json>;
    const isBlock = typeof obj["type"] === "string";
    const keys = Object.keys(obj).filter((k) => !HIDDEN.has(k)).filter((k) => {
      if (!isBlock) return true;
      if (k === "text") return obj["type"] !== "list";
      if (k === "items") return obj["type"] === "list";
      return true;
    });
    const set = (k: string, v: Json) => {
      const next = { ...obj, [k]: v };
      if (k === "type") {
        if (v === "list" && !Array.isArray(next["items"])) next["items"] = [""];
        if (v !== "list" && typeof next["text"] !== "string") next["text"] = "";
      }
      onChange(next);
    };
    const body = (
      <div className="divide-y divide-border">
        {keys.map((k) => (
          <div key={k} className="py-4 first:pt-0 last:pb-0">
            <FieldEditor name={k} value={obj[k]} template={tplObj[k]} onChange={(v) => set(k, v)} />
          </div>
        ))}
      </div>
    );
    return name ? (
      <fieldset className="rounded-[10px] border border-border p-4">
        <legend className="px-1 text-sm font-semibold">{label}</legend>
        {body}
      </fieldset>
    ) : (
      body
    );
  }

  return null;
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-border bg-background hover:bg-accent">
      {children}
    </button>
  );
}
