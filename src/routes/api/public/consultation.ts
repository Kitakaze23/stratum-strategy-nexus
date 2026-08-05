import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";

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

        // Placeholder sink: replace with CRM / e-mail delivery when the backend is chosen.
        // Deliberately does not log personal data.
        console.info("consultation_request_received", { company: parsed.company.length > 0 });

        return Response.json({ ok: true });
      },
    },
  },
});
