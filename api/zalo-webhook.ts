import type { IncomingMessage, ServerResponse } from "node:http";
import { matchesSecret, recordZaloPairing } from "../server/zalo-pairing.ts";

type WebhookRequest = IncomingMessage & { body?: unknown };
function reply(res: ServerResponse, status: number) {
  res.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify({ ok: status === 200 }));
}

async function readUpdate(req: WebhookRequest): Promise<unknown> {
  if (req.body && typeof req.body === "object") return req.body;
  let raw = typeof req.body === "string" ? req.body : "";
  if (!raw) {
    req.setEncoding("utf8");
    for await (const chunk of req) {
      raw += chunk;
      if (Buffer.byteLength(raw) > 8192) return;
    }
  }
  if (Buffer.byteLength(raw) > 8192) return;
  const update: unknown = JSON.parse(raw || "{}");
  if (!update || typeof update !== "object") return;
  return update;
}

export default async function zaloWebhook(req: WebhookRequest, res: ServerResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(res, 405);
  }
  const secret = process.env.ZALO_WEBHOOK_SECRET?.trim();
  if (!secret || !matchesSecret(req.headers["x-bot-api-secret-token"], secret)) return reply(res, 401);

  let update: unknown;
  try {
    update = await readUpdate(req);
  } catch {
    return reply(res, 400);
  }
  if (!update) return reply(res, 400);

  const code = process.env.ZALO_PAIRING_CODE?.trim();
  recordZaloPairing(update, code, secret, process.env.ZALO_GROUP_PAIRING_HASH);
  return reply(res, 200);
}
