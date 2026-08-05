import { z } from "zod";

/**
 * Consultation request submission service.
 *
 * The transport lives behind this single function so a real backend
 * (CRM, e-mail provider, Lovable Cloud) can replace it without touching UI code.
 */
export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100, "Слишком длинное значение"),
  company: z.string().trim().min(2, "Укажите компанию").max(120, "Слишком длинное значение"),
  role: z.string().trim().max(120, "Слишком длинное значение").optional().or(z.literal("")),
  email: z.string().trim().email("Укажите корректный e-mail").max(255),
  phone: z.string().trim().min(6, "Укажите телефон").max(40, "Слишком длинное значение"),
  message: z.string().trim().min(20, "Опишите задачу — не менее 20 символов").max(2000),
  consent: z.literal(true, { message: "Необходимо согласие на обработку персональных данных" }),
});

export type ConsultationRequest = z.infer<typeof consultationSchema>;

export interface SubmitResult {
  ok: boolean;
  message?: string;
}

const ENDPOINT = "/api/public/consultation";

export async function submitConsultationRequest(input: ConsultationRequest): Promise<SubmitResult> {
  const payload = consultationSchema.parse(input);

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, message: "Не удалось отправить заявку. Попробуйте ещё раз или напишите напрямую." };
  }

  return { ok: true };
}
