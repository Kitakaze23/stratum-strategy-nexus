import * as React from 'react'
import { render } from '@react-email/render'
import { EmailAPIError, sendLovableEmail } from '@lovable.dev/email-js'
import { TEMPLATES } from './registry'

// Server-only: reads LOVABLE_API_KEY. Never import from client components.

// Configuration baked in at scaffold time
const SITE_NAME = "Stratum Strategic"
// SENDER_DOMAIN is the verified sender subdomain FQDN (e.g., "notify.example.com").
// It MUST match the subdomain delegated to Lovable's nameservers. NEVER use the root domain.
const SENDER_DOMAIN = "notify.stratum-consulting.ru"
// FROM_DOMAIN is the domain shown in the From: header (e.g., "example.com").
// Can be the root domain when display_from_root is enabled — this is cosmetic only.
const FROM_DOMAIN = "stratum-consulting.ru"

export type SendTemplateEmailResult =
  | { sent: true }
  | { sent: false; reason: 'recipient_suppressed' }

export interface SendTemplateEmailOptions {
  templateData?: Record<string, any>
  /** Dedupes retries of the same logical send; defaults to a random UUID (no dedupe). */
  idempotencyKey?: string
  replyTo?: string
}

/**
 * Renders a registered template and sends it through Lovable's managed email
 * API. Suppression, retries, and rate limits are enforced by Lovable
 * server-side. A suppressed recipient is an expected outcome
 * ({ sent: false }); any other failure throws — EmailAPIError exposes
 * .code and .status for branching.
 */
export async function sendTemplateEmail(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {}
): Promise<SendTemplateEmailResult> {
  const template = TEMPLATES[templateName]
  if (!template) {
    throw new Error(
      `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(', ')}`
    )
  }

  // Template-level `to` takes precedence — notification templates always
  // send to their fixed address.
  const recipient = template.to || to
  if (!recipient) {
    throw new Error('Recipient is required (the template defines no fixed recipient)')
  }

  const templateData = options.templateData ?? {}
  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  const apiKey = process.env['LOVABLE_API_KEY']

  // Provider selection: Lovable Managed Email when LOVABLE_API_KEY is present
  // (Lovable hosting/preview); otherwise SMTP (external Node.js hosting).
  if (!apiKey) {
    const smtpTo = process.env['SMTP_TO'] || recipient
    await sendViaSmtp({ to: smtpTo, subject, html, text })
    return { sent: true }
  }

  try {
    await sendLovableEmail(
      {
        to: recipient,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: 'transactional',
        label: templateName,
        idempotency_key: options.idempotencyKey || crypto.randomUUID(),
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      },
      { apiKey, sendUrl: process.env['LOVABLE_SEND_URL'] }
    )
  } catch (error) {
    if (error instanceof EmailAPIError && error.code === 'recipient_suppressed') {
      return { sent: false, reason: 'recipient_suppressed' }
    }
    throw error
  }

  return { sent: true }
}

// ---------------------------------------------------------------------------
// SMTP fallback (external Node.js hosting without LOVABLE_API_KEY)
// ---------------------------------------------------------------------------

interface SmtpMessage {
  to: string
  subject: string
  html: string
  text: string
}

/**
 * Sends via SMTP (STARTTLS) using env-provided credentials. Used only when
 * LOVABLE_API_KEY is absent (self-hosted production). Credentials are never
 * logged; SMTP errors are logged with secrets redacted, then rethrown so the
 * caller keeps its existing {"ok":false,"error":"send_failed"} behavior.
 */
async function sendViaSmtp(message: SmtpMessage): Promise<void> {
  const host = process.env['SMTP_HOST']
  const port = Number(process.env['SMTP_PORT'] || 587)
  const user = process.env['SMTP_USER']
  const pass = process.env['SMTP_PASSWORD']
  const from = process.env['SMTP_FROM'] || user

  if (!host || !user || !pass || !from) {
    throw new Error(
      'SMTP is not configured: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD and SMTP_FROM are required'
    )
  }

  const nodemailer = await import('nodemailer')
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS; otherwise STARTTLS
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: `${SITE_NAME} <${from}>`,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    })
  } catch (error) {
    // Redact credentials before logging.
    const redacted =
      error instanceof Error
        ? error.message.replaceAll(pass, '[redacted]').replaceAll(user, '[redacted]')
        : String(error)
    console.error('[email] SMTP send failed:', redacted, {
      host,
      port,
      from,
      to: message.to,
    })
    throw new Error(`SMTP send failed: ${redacted}`)
  }
}
