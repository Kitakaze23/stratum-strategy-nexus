import { createFileRoute } from "@tanstack/react-router";

import { LegalBlock, LegalList, LegalPage } from "@/components/site/LegalPage";
import { CONTACTS } from "@/data/contacts";

const TITLE = "Политика конфиденциальности — Stratum Consulting";
const DESCRIPTION =
  "Политика конфиденциальности Stratum Consulting: какие персональные данные обрабатываются при обращении через сайт, на каких основаниях и как их удалить.";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "/" },
            { "@type": "ListItem", position: 2, name: "Политика конфиденциальности", item: "/privacy" },
          ],
        }),
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage eyebrow="Документы" title="Политика конфиденциальности" updated="1 января 2026 года">
      <p>
        Настоящая политика описывает порядок обработки и защиты персональных данных, которые
        предоставляются посетителями сайта Stratum Consulting (далее — Оператор) при заполнении формы
        обращения или направлении сообщения по указанным контактным данным.
      </p>

      <LegalBlock heading="1. Обрабатываемые данные">
        <LegalList
          items={[
            "имя;",
            "название компании и должность;",
            "адрес электронной почты;",
            "номер телефона;",
            "описание задачи и материалы, направленные по инициативе обратившегося.",
          ]}
        />
      </LegalBlock>

      <LegalBlock heading="2. Цели обработки">
        <p>
          Данные обрабатываются исключительно для обратной связи по обращению, согласования формата и
          времени консультации, подготовки к консультации и исполнения договорённостей.
        </p>
      </LegalBlock>

      <LegalBlock heading="3. Правовые основания">
        <p>
          Обработка осуществляется на основании согласия субъекта персональных данных,
          предоставляемого при отправке формы, а также в соответствии с Федеральным законом
          от 27.07.2006 № 152-ФЗ «О персональных данных».
        </p>
      </LegalBlock>

      <LegalBlock heading="4. Передача третьим лицам">
        <p>
          Персональные данные не передаются третьим лицам, за исключением случаев, прямо
          предусмотренных законодательством Российской Федерации. Материалы, полученные в рамках
          подготовки к консультации, используются только для этой цели.
        </p>
      </LegalBlock>

      <LegalBlock heading="5. Сроки хранения и удаление">
        <p>
          Данные хранятся до достижения целей обработки либо до отзыва согласия. Запрос на удаление
          или уточнение данных направляется на адрес{" "}
          <a href={CONTACTS.emailHref} className="text-primary underline-offset-4 hover:underline">
            {CONTACTS.email}
          </a>
          . Обращение рассматривается в срок, установленный законодательством.
        </p>
      </LegalBlock>

      <LegalBlock heading="6. Файлы cookie и аналитика">
        <p>
          Сайт не использует рекламные трекеры. Технические файлы cookie могут применяться для
          корректной работы страниц и обеспечения безопасности.
        </p>
      </LegalBlock>

      <LegalBlock heading="7. Меры защиты">
        <p>
          Оператор принимает организационные и технические меры для защиты данных от неправомерного
          доступа, изменения, распространения и уничтожения.
        </p>
      </LegalBlock>

      <LegalBlock heading="8. Контакты">
        <p>
          Телефон:{" "}
          <a href={CONTACTS.phoneHref} className="text-primary underline-offset-4 hover:underline">
            {CONTACTS.phone}
          </a>
          . Электронная почта:{" "}
          <a href={CONTACTS.emailHref} className="text-primary underline-offset-4 hover:underline">
            {CONTACTS.email}
          </a>
          .
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
