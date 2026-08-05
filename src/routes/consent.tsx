import { createFileRoute } from "@tanstack/react-router";

import { LegalBlock, LegalList, LegalPage } from "@/components/site/LegalPage";
import { CONTACTS } from "@/data/contacts";

const TITLE = "Согласие на обработку персональных данных — Stratum Consulting";
const DESCRIPTION =
  "Текст согласия на обработку персональных данных, предоставляемого при отправке заявки на консультацию Stratum Consulting.";

export const Route = createFileRoute("/consent")({
  component: ConsentPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/consent" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/consent" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Согласие на обработку персональных данных",
              item: "/consent",
            },
          ],
        }),
      },
    ],
  }),
});

function ConsentPage() {
  return (
    <LegalPage
      eyebrow="Документы"
      title="Согласие на обработку персональных данных"
      updated="1 января 2026 года"
    >
      <p>
        Отмечая соответствующее поле в форме обращения на сайте Stratum Consulting, посетитель
        (далее — Субъект) свободно, своей волей и в своём интересе даёт согласие на обработку своих
        персональных данных в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
        «О персональных данных».
      </p>

      <LegalBlock heading="1. Состав персональных данных">
        <LegalList
          items={[
            "имя;",
            "название компании и должность (при указании);",
            "адрес электронной почты;",
            "номер телефона;",
            "содержание обращения и приложенные материалы.",
          ]}
        />
      </LegalBlock>

      <LegalBlock heading="2. Цель обработки">
        <p>
          Рассмотрение обращения, обратная связь, согласование формата и времени консультации,
          подготовка к консультации и исполнение достигнутых договорённостей.
        </p>
      </LegalBlock>

      <LegalBlock heading="3. Перечень действий с данными">
        <p>
          Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение),
          использование, обезличивание, блокирование, удаление и уничтожение — как автоматизированным,
          так и неавтоматизированным способом.
        </p>
      </LegalBlock>

      <LegalBlock heading="4. Срок действия согласия">
        <p>
          Согласие действует до достижения целей обработки либо до момента его отзыва. Отзыв
          осуществляется путём направления письменного уведомления на адрес{" "}
          <a href={CONTACTS.emailHref} className="text-primary underline-offset-4 hover:underline">
            {CONTACTS.email}
          </a>
          . После получения отзыва обработка прекращается, а данные удаляются, если иное не
          предусмотрено законодательством.
        </p>
      </LegalBlock>

      <LegalBlock heading="5. Права субъекта">
        <p>
          Субъект вправе получать информацию об обработке своих персональных данных, требовать их
          уточнения, блокирования или уничтожения, а также обжаловать действия Оператора в
          уполномоченном органе по защите прав субъектов персональных данных.
        </p>
      </LegalBlock>

      <LegalBlock heading="6. Подтверждение">
        <p>
          Субъект подтверждает, что указанные им данные являются достоверными и предоставлены им
          самостоятельно, а также что он ознакомлен с политикой конфиденциальности Оператора.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
