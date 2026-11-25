import type { IncomingMessage, ServerResponse } from "node:http";
import { MAX_FORM_BYTES, submitForm, type Settings } from "../server/booking-forms.ts";

type FormRequest = IncomingMessage & { body?: unknown };

function reply(res: ServerResponse, status: number, body: object) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

async function readForm(req: FormRequest): Promise<unknown> {
  let body = req.body;
  if (body === undefined) {
    const chunks: Buffer[] = [];
    let size = 0;
    for await (const chunk of req) {
      const bytes = Buffer.from(chunk);
      size += bytes.length;
      if (size > MAX_FORM_BYTES) throw new Error("Form is too large");
      chunks.push(bytes);
    }
    body = Buffer.concat(chunks).toString("utf8");
  }
  if (typeof body === "string") {
    if (Buffer.byteLength(body) > MAX_FORM_BYTES) throw new Error("Form is too large");
    body = JSON.parse(body);
  }
  return body;
}

export async function handleForms(req: FormRequest, res: ServerResponse, env: Settings = process.env) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(res, 405, { success: false });
  }
  if (!req.headers["content-type"]?.toLowerCase().startsWith("application/json")) {
    return reply(res, 415, { success: false });
  }

  let input: unknown;
  try {
    input = await readForm(req);
  } catch {
    return reply(res, 400, { success: false });
  }

  const { status, body } = await submitForm(input, env);
  return reply(res, status, body);
}

export default function forms(req: FormRequest, res: ServerResponse) {
  return handleForms(req, res);
}
