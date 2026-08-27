import { z } from "zod";

export const questionSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100, "Слишком длинное значение"),
  contact: z
    .string()
    .trim()
    .min(3, "Укажите e-mail, телефон или Telegram")
    .max(255, "Слишком длинное значение"),
  question: z
    .string()
    .trim()
    .min(10, "Опишите вопрос — не менее 10 символов")
    .max(2000, "Слишком длинное значение"),
  productUrl: z.string().trim().max(300, "Слишком длинная ссылка").optional().or(z.literal("")),
});

export type QuestionRequest = z.infer<typeof questionSchema>;

export interface SubmitResult {
  ok: boolean;
  message?: string;
}

const ENDPOINT = "/api/public/question";

export async function submitQuestion(input: QuestionRequest): Promise<SubmitResult> {
  const payload = questionSchema.parse(input);

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Не удалось отправить вопрос. Попробуйте ещё раз или напишите напрямую.",
    };
  }

  return { ok: true };
}
