import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { consultationSchema, sampleRequestSchema } from "@/lib/consultation";
import { sendTemplateEmail } from "@/lib/email-templates/send-email";
import { notifyTelegram, tgEscape } from "@/lib/telegram-notify";

/** Submissions faster than this are treated as automated. */
const MIN_FILL_MS = 2500;

/** Simple per-IP limit: at most RATE_MAX requests per RATE_WINDOW_MS (per server instance). */
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    // keep memory bounded
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

const TITLES = {
  consultation: "Новая заявка с сайта",
  express: "Заявка на экспресс-проверку ТЗ",
  sample: "Запрос примера отчёта",
} as const;

function telegramMessage(
  d: { name: string; company?: string; email: string; phone?: string; message?: string },
  page: string,
  kind: keyof typeof TITLES = "consultation",
): string {
  const line = (label: string, value?: string) =>
    value?.trim() ? `<b>${label}:</b> ${tgEscape(value.trim())}` : "";
  return [
    `<b>${TITLES[kind]}</b>`,
    "",
    line("Имя", d.name),
    line("Компания", d.company),
    line("E-mail", d.email),
    line("Телефон / Telegram", d.phone),
    d.message?.trim() ? `\n<b>Задача:</b>\n${tgEscape(d.message.trim())}` : "",
    page ? `\n<i>Страница: ${tgEscape(page)}</i>` : "",
  ]
    .filter((l, i) => l !== "" || i === 1)
    .join("\n");
}

function pageFromReferer(request: Request): string {
  try {
    const ref = request.headers.get("referer");
    return ref ? new URL(ref).pathname : "";
  } catch {
    return "";
  }
}

export const Route = createFileRoute("/api/public/consultation")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (rateLimited(clientIp(request))) {
          return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "invalid_payload" }, { status: 400 });
        }

        // «Получить пример отчёта»: e-mail only, goes to the same inbox and bot.
        if ((body as { kind?: unknown })?.kind === "sample") {
          const sample = sampleRequestSchema.safeParse(body);
          if (!sample.success) {
            return Response.json({ ok: false, error: "invalid_payload" }, { status: 400 });
          }
          const v = sample.data;
          if (v.website || (v.elapsedMs !== undefined && v.elapsedMs < MIN_FILL_MS)) {
            return Response.json({ ok: true });
          }
          const id = crypto.randomUUID();
          const message = "Запрос примера отчёта экспресс-проверки. Отправить PDF на эту почту.";
          const [mail, telegram] = await Promise.allSettled([
            sendTemplateEmail("consultation-request", "", {
              templateData: {
                name: "Запрос примера отчёта",
                company: "",
                role: "",
                email: v.email,
                phone: "",
                message,
              },
              idempotencyKey: `sample-request-${id}`,
              replyTo: v.email,
            }),
            notifyTelegram(
              telegramMessage(
                { name: "—", email: v.email, message },
                pageFromReferer(request),
                "sample",
              ),
            ),
          ]);
          const ok =
            mail.status === "fulfilled" || (telegram.status === "fulfilled" && telegram.value);
          if (mail.status !== "fulfilled") console.error("sample_request_send_failed", mail.reason);
          return ok
            ? Response.json({ ok: true })
            : Response.json({ ok: false, error: "send_failed" }, { status: 502 });
        }

        let parsed;
        try {
          parsed = consultationSchema.parse(body);
        } catch {
          return Response.json({ ok: false, error: "invalid_payload" }, { status: 400 });
        }

        // Bots: honeypot filled or the form was "filled in" instantly.
        // Answer as if accepted so they get no signal to adapt.
        if (parsed.website || (parsed.elapsedMs !== undefined && parsed.elapsedMs < MIN_FILL_MS)) {
          return Response.json({ ok: true });
        }

        const submissionId = crypto.randomUUID();
        const email = parsed.email?.trim() ?? "";

        // E-mail and Telegram go out in parallel; each is a backup for the other.
        const [mail, telegram] = await Promise.allSettled([
          sendTemplateEmail("consultation-request", "", {
            templateData: {
              name: parsed.name,
              company: parsed.company ?? "",
              role: parsed.role ?? "",
              email,
              phone: parsed.phone ?? "",
              message:
                parsed.kind === "express"
                  ? `[Экспресс-проверка ТЗ] ${parsed.message ?? ""}`.trim()
                  : (parsed.message ?? ""),
            },
            idempotencyKey: `consultation-request-${submissionId}`,
            ...(email ? { replyTo: email } : {}),
          }),
          notifyTelegram(
            telegramMessage(
              {
                name: parsed.name,
                company: parsed.company ?? "",
                email,
                phone: parsed.phone ?? "",
                message: parsed.message ?? "",
              },
              pageFromReferer(request),
              parsed.kind === "express" ? "express" : "consultation",
            ),
          ),
        ]);

        const mailOk = mail.status === "fulfilled";
        const telegramOk = telegram.status === "fulfilled" && telegram.value;
        if (!mailOk) console.error("consultation_request_send_failed", mail.reason);
        if (!mailOk && !telegramOk) {
          return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
