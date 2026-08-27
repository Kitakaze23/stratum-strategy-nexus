import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";

import { sendTemplateEmail } from "@/lib/email-templates/send-email";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  contact: z.string().trim().min(3).max(255),
  question: z.string().trim().min(10).max(2000),
  productUrl: z.string().trim().max(300).optional(),
});

export const Route = createFileRoute("/api/public/question")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = bodySchema.parse(await request.json());
        } catch {
          return Response.json({ ok: false, error: "invalid_payload" }, { status: 400 });
        }

        const submissionId = crypto.randomUUID();

        try {
          await sendTemplateEmail("question-request", "", {
            templateData: {
              name: parsed.name,
              contact: parsed.contact,
              question: parsed.question,
              productUrl: parsed.productUrl ?? "",
            },
            idempotencyKey: `question-request-${submissionId}`,
          });
        } catch (error) {
          console.error("question_request_send_failed", error);
          return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
