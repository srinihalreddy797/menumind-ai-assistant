import type { ChatMessage } from "./types";

/**
 * Base URL of the existing MenuMind FastAPI backend.
 * Defaults to the local dev server; override with NEXT_PUBLIC_MENUMIND_API_URL
 * when deploying against a hosted backend.
 */
export const MENUMIND_API_URL =
  process.env.NEXT_PUBLIC_MENUMIND_API_URL ?? "http://localhost:8000";

type ChatApiResponse = Record<string, unknown>;

/**
 * Pull the assistant text out of the backend payload. The existing /chat
 * endpoint may name the field differently across versions, so we check the
 * common keys and fall back to stringifying the payload.
 */
function extractReply(data: ChatApiResponse): string {
  const keys = ["response", "reply", "answer", "message", "text", "output"];
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  if (typeof data === "string") return data;
  return "I received your message, but the response was empty.";
}

/**
 * Send a message to the existing MenuMind RAG assistant.
 * POST {MENUMIND_API_URL}/chat  ->  { message, history }
 *
 * `history` is included so the backend's conversation-history feature keeps
 * working; harmless if the endpoint ignores it.
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch(`${MENUMIND_API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history: history.map(({ role, content }) => ({ role, content })),
    }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`MenuMind API responded with ${res.status}`);
  }

  const data = (await res.json()) as ChatApiResponse;
  return extractReply(data);
}
