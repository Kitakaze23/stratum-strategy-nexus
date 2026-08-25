import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";

import { sendTemplateEmail } from "@/lib/email-templates/send-email";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(40),
  message: z.string().trim().min(20).max(2000),
  consent: z.literal(true),
});

export const Route = createFileRoute("/api/public/consultation")({
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
          await sendTemplateEmail("consultation-request", "", {
            templateData: {
              name: parsed.name,
              company: parsed.company,
              role: parsed.role ?? "",
              email: parsed.email,
              phone: parsed.phone,
              message: parsed.message,
            },
            idempotencyKey: `consultation-request-${submissionId}`,
            replyTo: parsed.email,
          });
        } catch (error) {
          console.error("consultation_request_send_failed", error);
          return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
