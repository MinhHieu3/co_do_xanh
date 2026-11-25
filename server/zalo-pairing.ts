import { createCipheriv, createHash, randomBytes, timingSafeEqual } from "node:crypto";

type ZaloUpdate = {
  event_name?: string;
  message?: {
    text?: string;
    chat?: { id?: unknown; chat_type?: string };
  };
};

export function matchesSecret(received: string | string[] | undefined, expected: string) {
  if (typeof received !== "string") return false;
  const actual = Buffer.from(received);
  const secret = Buffer.from(expected);
  return actual.length === secret.length && timingSafeEqual(actual, secret);
}

function makeReceipt(chatId: string, secret: string) {
  const iv = randomBytes(12);
  const key = createHash("sha256").update("zalo-webhook-pairing").update(secret).digest();
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(chatId, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString("base64url");
}

export function recordZaloPairing(update: unknown, code: string | undefined, secret: string, groupCodeHash?: string) {
  if (!update || typeof update !== "object") return;
  const event = update as ZaloUpdate;
  const message = event.message;
  const id = message?.chat?.id;
  if (event.event_name !== "message.text.received" || typeof message?.text !== "string"
    || typeof id !== "string" || !/^[A-Za-z0-9._:-]{1,128}$/.test(id)) return;

  const text = message.text.trim();
  if (message.chat?.chat_type === "PRIVATE" && code && matchesSecret(text, code)) {
    console.info("ZALO_PAIRING_RECEIPT", makeReceipt(id, secret));
  }

  if (message.chat?.chat_type === "GROUP" && groupCodeHash) {
    // Group messages can include a mention before or after the pairing code.
    const groupCode = text.match(/\b(KETNOI-[A-Z0-9]{16})\b/i)?.[1].toUpperCase();
    if (groupCode && matchesSecret(createHash("sha256").update(groupCode).digest("hex"), groupCodeHash)) {
      console.info("ZALO_GROUP_PAIRING_RECEIPT", makeReceipt(id, secret));
    }
  }
}
