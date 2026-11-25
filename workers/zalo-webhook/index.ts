import { matchesSecret, recordZaloPairing } from "../../server/zalo-pairing.ts";

type Env = {
  ZALO_WEBHOOK_SECRET: string;
  ZALO_PAIRING_CODE?: string;
  ZALO_GROUP_PAIRING_HASH?: string;
};

function respond(status: number, headers: Record<string, string> = {}) {
  return Response.json({ ok: status === 200 }, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export default {
  async fetch(request: Request, env: Env) {
    if (new URL(request.url).pathname !== "/api/zalo-webhook") return respond(404);
    if (request.method !== "POST") return respond(405, { Allow: "POST" });
    const secret = env.ZALO_WEBHOOK_SECRET?.trim();
    if (!secret || !matchesSecret(request.headers.get("x-bot-api-secret-token") ?? undefined, secret)) {
      return respond(401);
    }

    try {
      const raw = await request.text();
      if (Buffer.byteLength(raw) > 8192) return respond(413);
      recordZaloPairing(JSON.parse(raw || "{}"), env.ZALO_PAIRING_CODE?.trim(), secret, env.ZALO_GROUP_PAIRING_HASH);
    } catch {
      return respond(400);
    }
    return respond(200);
  },
};
