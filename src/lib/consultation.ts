import { z } from "zod";

/**
 * Consultation request: shared schema (client + server) and the submit call.
 *
 * Required: name, one way to reply (e-mail or phone) and consent.
 * Everything else is optional so the first contact stays short.
 */
const optionalText = (max: number) =>
  z.string().trim().max(max, "Слишком длинное значение").optional().or(z.literal(""));

export const consultationBaseSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100, "Слишком длинное значение"),
  company: optionalText(120),
  role: optionalText(120),
  email: z
    .string()
    .trim()
    .max(255, "Слишком длинное значение")
    .refine((v) => v === "" || z.string().email().safeParse(v).success, "Укажите корректный e-mail")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(40, "Слишком длинное значение")
    .refine(
      (v) => v === "" || v.replace(/\D/g, "").length >= 6 || /^@?[A-Za-z0-9_]{5,32}$/.test(v),
      "Укажите телефон или ник в Telegram",
    )
    .optional()
    .or(z.literal("")),
  message: optionalText(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
  }),
  /** Honeypot: hidden from people, bots tend to fill it. Must stay empty. */
  website: z.string().max(200).optional(),
  /** Milliseconds the form was open before submit (bot heuristics). */
  elapsedMs: z.number().int().nonnegative().optional(),
  /** Which form sent it: the express-check landing form or the general one. */
  kind: z.enum(["consultation", "express"]).optional(),
});

const requireContact = <T extends { email?: string | undefined; phone?: string | undefined }>(
  value: T,
  ctx: z.RefinementCtx,
) => {
  if (!value.email?.trim() && !value.phone?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["email"],
      message: "Укажите e-mail или телефон, чтобы мы могли ответить",
    });
  }
};

export const consultationSchema = consultationBaseSchema.superRefine(requireContact);

export type ConsultationRequest = z.infer<typeof consultationSchema>;

/** «Получить пример отчёта»: only a work e-mail and consent. */
export const sampleRequestSchema = z.object({
  kind: z.literal("sample"),
  email: z.string().trim().max(255).email("Укажите корректный e-mail"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
  }),
  website: z.string().max(200).optional(),
  elapsedMs: z.number().int().nonnegative().optional(),
});

export type SampleRequest = z.infer<typeof sampleRequestSchema>;

export async function submitSampleRequest(input: SampleRequest): Promise<SubmitResult> {
  const payload = sampleRequestSchema.parse(input);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.status === 429) {
      return { ok: false, message: "Слишком много запросов подряд. Попробуйте чуть позже." };
    }
    return response.ok ? { ok: true } : { ok: false, message: "Не удалось отправить запрос." };
  } catch {
    return { ok: false, message: "Нет соединения с сервером." };
  }
}

export interface SubmitResult {
  ok: boolean;
  message?: string;
}

const ENDPOINT = "/api/public/consultation";

export async function submitConsultationRequest(input: ConsultationRequest): Promise<SubmitResult> {
  const payload = consultationSchema.parse(input);

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, message: "Нет соединения с сервером." };
  }

  if (response.status === 429) {
    return { ok: false, message: "Слишком много заявок подряд. Попробуйте чуть позже." };
  }
  if (!response.ok) {
    return { ok: false, message: "Не удалось отправить заявку." };
  }

  return { ok: true };
}

/** Pre-filled e-mail with the request — the fallback when the form cannot be sent. */
export function consultationMailto(to: string, v: Partial<ConsultationRequest>): string {
  const lines = [
    `Имя: ${v.name ?? ""}`,
    v.company ? `Компания: ${v.company}` : "",
    v.email ? `E-mail: ${v.email}` : "",
    v.phone ? `Телефон: ${v.phone}` : "",
    "",
    v.message ?? "",
  ].filter((line, i, all) => line !== "" || (i > 0 && all[i - 1] !== ""));
  const subject = `Заявка с сайта${v.company ? ` — ${v.company}` : ""}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
