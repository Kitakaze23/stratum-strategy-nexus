/**
 * Server-only: sends a notification to Telegram through a bot.
 *
 * Configure two server secrets (never commit them — the repository is public):
 *   TELEGRAM_BOT_TOKEN — token from @BotFather
 *   TELEGRAM_CHAT_ID   — chat id to notify; several ids may be separated by commas
 *   TELEGRAM_API_BASE  — optional, only for local testing
 *
 * If either is missing, notifications are silently skipped.
 */

const TIMEOUT_MS = 8000;

export function isTelegramConfigured(): boolean {
  return Boolean(process.env["TELEGRAM_BOT_TOKEN"] && process.env["TELEGRAM_CHAT_ID"]);
}

/** Escapes text for Telegram's HTML parse mode. */
export function tgEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Returns true if at least one chat received the message. Never throws. */
export async function notifyTelegram(html: string): Promise<boolean> {
  const token = process.env["TELEGRAM_BOT_TOKEN"];
  const chatIds = (process.env["TELEGRAM_CHAT_ID"] ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) return false;

  const results = await Promise.all(
    chatIds.map(async (chatId) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      try {
        const base = process.env["TELEGRAM_API_BASE"] ?? "https://api.telegram.org";
        const res = await fetch(`${base}/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: html,
            parse_mode: "HTML",
            link_preview_options: { is_disabled: true },
          }),
          signal: controller.signal,
        });
        if (!res.ok) {
          // log status only: the body may echo the message with personal data
          console.error("telegram_notify_failed", res.status);
          return false;
        }
        return true;
      } catch (error) {
        console.error("telegram_notify_error", error instanceof Error ? error.name : "unknown");
        return false;
      } finally {
        clearTimeout(timer);
      }
    }),
  );
  return results.some(Boolean);
}
