import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { Analytics } from "../analytics/Analytics";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-[560px]">
        <p className="eyebrow">Ошибка 404</p>
        <h1 className="mt-5 text-3xl font-semibold leading-[1.15] md:text-[2.5rem]">
          Страница не найдена
        </h1>
        <p className="mt-5 text-[0.9375rem] leading-[1.75] text-muted-foreground">
          Запрошенная страница не существует или была перемещена. Вернитесь на главную или напишите
          напрямую — мы поможем найти нужную информацию.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex h-[52px] items-center justify-center rounded-[10px] bg-primary px-7 text-[0.9375rem] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover"
          >
            На главную
          </Link>
          <a
            href="/#contact"
            className="inline-flex h-[52px] items-center justify-center rounded-[10px] border border-primary bg-background px-7 text-[0.9375rem] font-medium text-primary transition-colors duration-200 hover:bg-accent"
          >
            Связаться
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-[560px]">
        <p className="eyebrow">Ошибка 500</p>
        <h1 className="mt-5 text-3xl font-semibold leading-[1.15] md:text-[2.5rem]">
          Страница не загрузилась
        </h1>
        <p className="mt-5 text-[0.9375rem] leading-[1.75] text-muted-foreground">
          Произошла техническая ошибка на нашей стороне. Попробуйте обновить страницу — если ошибка
          повторяется, свяжитесь с нами напрямую.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-[52px] items-center justify-center rounded-[10px] bg-primary px-7 text-[0.9375rem] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover"
          >
            Обновить
          </button>
          <a
            href="/"
            className="inline-flex h-[52px] items-center justify-center rounded-[10px] border border-primary bg-background px-7 text-[0.9375rem] font-medium text-primary transition-colors duration-200 hover:bg-accent"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stratum Consulting" },
      { property: "og:site_name", content: "Stratum Consulting" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
